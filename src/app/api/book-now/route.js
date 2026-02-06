import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, phone, service, date, time } = await req.json();

    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Studio <onboarding@resend.dev>",
      to: process.env.BOOKING_EMAIL,
      reply_to: email,
      subject: "📸 New Booking Request",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f7f7f7; padding:24px">
          <div style="max-width:520px; margin:auto; background:#ffffff; border-radius:14px; padding:24px; border:1px solid #e5e5e5">
            
            <h2 style="margin:0 0 16px; color:#151514;">
              New Booking Request
            </h2>

            <table style="width:100%; border-collapse:collapse; font-size:14px;">
              <tr>
                <td style="padding:8px 0; color:#555;"><b>Name</b></td>
                <td style="padding:8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0; color:#555;"><b>Email</b></td>
                <td style="padding:8px 0;">${email}</td>
              </tr>
              <tr>
                <td style="padding:8px 0; color:#555;"><b>Phone</b></td>
                <td style="padding:8px 0;">${phone}</td>
              </tr>
              <tr>
                <td style="padding:8px 0; color:#555;"><b>Service</b></td>
                <td style="padding:8px 0;">${service}</td>
              </tr>
              <tr>
                <td style="padding:8px 0; color:#555;"><b>Date</b></td>
                <td style="padding:8px 0;">${date}</td>
              </tr>
              <tr>
                <td style="padding:8px 0; color:#555;"><b>Time</b></td>
                <td style="padding:8px 0;">${time}</td>
              </tr>
            </table>

            <div style="margin-top:24px; padding-top:16px; border-top:1px solid #eee; font-size:12px; color:#888;">
              This booking request was sent from your website.
            </div>

          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Email failed" },
      { status: 500 }
    );
  }
}