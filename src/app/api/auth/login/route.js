// app/api/admin/login/route.js
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import dbConnect from "../../../../lib/mongodb";
import Admin from "../../../../models/Admin.js";
import { loginSchema } from "../../../../lib/validators/loginSchema";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      console.error("❌ Zod validation error:", parsed.error.format());

      return NextResponse.json(
        {
          success: false,
          error: "Invalid input",
          details: parsed.error.errors,
        },
        { status: 400 }
      );
    }

    const { username, password } = parsed.data;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      console.error("❌ Admin not found:", username);

      return NextResponse.json(
        { success: false, error: "Admin not found" },
        { status: 404 }
      );
    }

    if (admin.password !== password) {
      console.error("❌ Wrong password for:", username);

      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = await new SignJWT({
      id: admin._id.toString(),
      role: "admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    console.log("✅ Admin logged in:", username);

    const res = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("🔥 Login server error:", error.message);
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Server error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
