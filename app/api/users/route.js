
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/Users";
import {auth} from "@clerk/nextjs/server"
import { canPerformAction } from "@/lib/checkPermission";

//  Service functions (separate DB logic from handlers)
async function fetchUsersFromDB() {
  await connectDB();
  return User.find();
}

//  GET /api/users
export async function GET() {
  const users = await fetchUsersFromDB();
  return NextResponse.json(users);
}

// POST /api/users
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const existingUser = await User.findOne({ clerkId: body.clerkId });
    if (existingUser) {
      return NextResponse.json(existingUser, { status: 200 });
    }

    const newUser = new User(body);
    await newUser.save();

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH /api/users
export async function PATCH(req) {

  const body = await req.json();

  const { clerkId, data } = body;

  
  await connectDB();

  if (!clerkId) {
    return new Response(JSON.stringify({ error: "Unauthorised" }), { status: 401 });
  }

  const existingUser = await User.findOne({ clerkId: clerkId });

  if (!existingUser) {
    return NextResponse.json({ error: "No such User found" }, { status: 404 });
  }

  

  // Merge existing fields with new data
  const updatedUser = await User.findOneAndUpdate(
    { clerkId: clerkId },    // filter
    { $set: data },         // fields to update
    { new: true }           // return updated document
  );

  return NextResponse.json(updatedUser, { status: 200 });
}
