# 🚀 Full-Stack Next.js + MongoDB + ShadCN UI Starter Guide

This guide will help you quickly set up a **full-stack app** with Next.js, MongoDB (Mongoose), and ShadCN UI (like Tailwind/Bootstrap).

---

## 1️⃣ Project Setup


# Create Next.js app
```
npx create-next-app@latest my-app
cd my-app

```
# Install dependencies

```
npm install mongoose
npm install shadcn-ui --save-dev

```

```
my-app/
 ├─ app/
 │   ├─ api/
 │   │   ├─ users/
 │   │   │   └─ route.js       // API routes for users
 │   │   ├─ products/
 │   │   │   └─ route.js
 │   │   └─ auth/
 │   │       └─ route.js
 │   ├─ dashboard/
 │   │   └─ page.jsx           // Example page
 │   ├─ page.jsx               // Home page
 │   └─ layout.jsx
 │
 ├─ lib/
 │   └─ db.js                  // MongoDB connection
 │
 ├─ models/
 │   └─ User.js                // Mongoose schema/model
 │
 ├─ .env.local                 // Environment variables
 └─ package.json

```

# but page.jsx is only needed inside app pages but if we create separate components folder they not need it


# lib/db.js: (cached connection)
```
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;

```

# models/User.js

```

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    age: Number,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);

```

# app/api/users/route.js

```

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

// 📌 Service functions (separate DB logic from handlers)
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

// 📌 GET /api/users
export async function GET() {
  const users = await fetchUsersFromDB();
  return NextResponse.json(users);
}

// 📌 POST /api/users
export async function POST(req) {
  const data = await req.json();
  const user = await addUserToDB(data);
  return NextResponse.json(user, { status: 201 });
}

```

# Frontend (app/page.jsx)

```

"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {users.map((user) => (
        <p key={user._id}>
          {user.name} - {user.email}
        </p>
      ))}
    </div>
  );
}

```

# if more backend routes

```

app/
 ├─ api/
 │   ├─ users/
 │   │   └─ route.js
 │   ├─ products/
 │   │   └─ route.js
 │   └─ auth/
 │       └─ route.js

```

# if your backend is going to be large, complex, or have heavy business logic, then it’s often better to make it separately in Express (or NestJS, Fastify, etc.)

# why Nextjs:

frontend pages and backend API routes in the same project
Server-Side Rendering (SSR) & Static Generation (SSG)

# clerk notes

```
'use client'
import { useUser } from '@clerk/nextjs'

export default function MyComponent() {
  const { user, isSignedIn, sessionId, getToken } = useUser()

  const callBackend = async () => {
    if (!isSignedIn) return
    // Get Clerk token
    const token = await getToken({ template: 'default' }) 
    // Call your backend with token
    const res = await fetch('/api/protected', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <button onClick={callBackend}>Call Backend</button>
  )
}

```

```
import { auth } from '@clerk/nextjs'

export async function GET(req) {
  const { userId } = auth() // Throws error if token invalid
  return new Response(JSON.stringify({ message: `Hello user ${userId}` }))
}


```

```bash


