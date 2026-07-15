import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Forward to FormSubmit.co — a free email forwarding service.
    // The first submission triggers a confirmation email to olaniyiaremu2003@gmail.com.
    // After confirmation, all future submissions are delivered automatically.
    const res = await fetch(
      "https://formsubmit.co/ajax/olaniyiaremu2003@gmail.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio contact from ${name}`,
          _template: "table",
        }),
      }
    );

    if (!res.ok) {
      throw new Error("FormSubmit request failed");
    }

    const data = await res.json();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
