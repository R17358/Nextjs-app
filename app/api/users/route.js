
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/Users";

//  Service functions (separate DB logic from handlers)
async function fetchUsersFromDB() {
  await connectDB();
  return User.find();
}

async function addUserToDB(data) {
  await connectDB();
  const user = new User(data);
  await user.save();
  return user;
}

//  GET /api/users
export async function GET() {
  const users = await fetchUsersFromDB();
  return NextResponse.json(users);
}

//  POST /api/users
export async function POST(req) {
  const data = await req.json();
  const user = await addUserToDB(data);
  return NextResponse.json(user, { status: 201 });
}