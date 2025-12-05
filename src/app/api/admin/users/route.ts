import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "../../../lib/firebaseAdmin";

async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cookieToken = request.cookies.get("firebase_token")?.value;
  
  let token: string | undefined;
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split("Bearer ")[1];
  } else if (cookieToken) {
    token = cookieToken;
  }

  if (!token) {
    throw new Error("No token provided");
  }

  const decoded = await adminAuth.verifyIdToken(token);
  
  const isAdminClaim = Boolean(decoded.admin);
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
  const isAdminEmail = decoded.email ? adminEmails.includes(decoded.email) : false;
  
  if (!isAdminClaim && !isAdminEmail) {
    throw new Error("Forbidden: admin only");
  }
  
  return decoded;
}

export async function GET(request: NextRequest) {
  try {
    await verifyAdmin(request);

    // List all users from Firebase
    const listUsersResult = await adminAuth.listUsers(1000);
    
    const users = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "",
      photoURL: user.photoURL,
      createdAt: user.metadata.creationTime,
      lastSignIn: user.metadata.lastSignInTime,
      isAdmin: Boolean(user.customClaims?.admin),
    }));

    return NextResponse.json({ ok: true, users });
  } catch (error) {
    console.error("Users API error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Server error" },
      { status: error instanceof Error && error.message.includes("Forbidden") ? 403 : 500 }
    );
  }
}
