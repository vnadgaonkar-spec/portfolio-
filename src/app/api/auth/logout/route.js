// src/app/api/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({
    success: true,
    message: "Logged out",
  });

  res.cookies.set("admin_token", "", {
    httpOnly: true,
    expires: new Date(0), // 👈 this actually removes the cookie
    path: "/",
  });

  return res;
}
