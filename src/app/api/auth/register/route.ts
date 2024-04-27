import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
export async function POST(request: Request) {
  try {
    const { email, password ,phoneNumber, username, role } = await request.json();

    console.log({ email, password ,phoneNumber, username, role});

    const hashedPassword = await hash(password, 10);

    const response =
      await sql`INSERT INTO users (email, password,phoneNumber,username, role ) VALUES (${email}, ${hashedPassword}, ${phoneNumber}, ${username}, ${role})`;
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}