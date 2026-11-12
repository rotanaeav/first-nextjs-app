import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
const body = await request.json();
  const response = await fetch(`${process.env.API}/users/add`, {
    // method, body, header
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });
  const users = await response.json();
  console.log("data in server : ", users);

  return NextResponse.json(users);
}
