import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = await fetch(`${process.env.API}/auth/login`, {
    // method, body, header
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });
  const userData = await response.json();
  console.log("data in server : ", userData);
  const cookie = cookies();
  (await cookie).set("dummy-refresh-token", userData.refreshToken, {
    httpOnly: true,
  });

  return NextResponse.json(userData);
}
