// app/api/role_update_by_admin/route.js

import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import User from "@/models/Users";
import { canPerformAction } from "@/lib/checkPermission";

export async function PATCH(req) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await req.json();
    const { targetUserId, updatedRole } = body;

    if (!targetUserId || !updatedRole) {
      return new Response(JSON.stringify({ error: "Target UserID or role is missing" }), { status: 400 });
    }

    await connectDB();

    const actor = await User.findOne({ clerkId: userId });
    if (!actor) {
      return new Response(JSON.stringify({ error: "Actor not found" }), { status: 404 });
    }

    const target = await User.findById(targetUserId);
    if (!target) {
      return new Response(JSON.stringify({ error: "Target user not found" }), { status: 404 });
    }

    // Permission check
    if (!canPerformAction(actor.role, "update", target.role)) {
      return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
    }

    // Update role
    target.role = updatedRole;
    await target.save();

    return new Response(
      JSON.stringify({ message: "Role updated successfully", user: target }),
      { status: 200 }
    );

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
