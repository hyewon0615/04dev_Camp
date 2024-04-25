import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password ,phoneNumber, username, role, passwordCheck } = await request.json();
    // 여기에 유효성 검사를 추가하면 좋을 수 있어요

    console.log({ email, password ,phoneNumber, username, role, passwordCheck});
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}