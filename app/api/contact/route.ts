import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Content-Type must be application/json." },
        { status: 400 }
      );
    }
    const body = await request.json();
    const { name, email, message } = body;

    // Simple email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate input fields
    if (
      typeof name !== "string" ||
      name.trim().length === 0 ||
      typeof email !== "string" ||
      !emailRegex.test(email) ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid input. Please fill all fields with valid data." },
        { status: 400 }
      );
    }

    // If all validation passes, return success
    return NextResponse.json({ success: true, message: "Message received." });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON or server error." },
      { status: 400 }
    );
  }
}