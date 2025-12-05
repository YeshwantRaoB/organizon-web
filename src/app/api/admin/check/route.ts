import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "../../../lib/firebaseAdmin";

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header or cookie
    const authHeader = request.headers.get("authorization");
    const cookieToken = request.cookies.get("firebase_token")?.value;
    
    let token: string | undefined;
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split("Bearer ")[1];
    } else if (cookieToken) {
      token = cookieToken;
    }

    if (!token) {
      return NextResponse.json({ isAdmin: false, error: "No token provided" }, { status: 401 });
    }

    // Verify the token
    const decoded = await adminAuth.verifyIdToken(token);
    
    // Check if user has admin claim
    const isAdminClaim = Boolean(decoded.admin);
    
    // Fallback to email whitelist
    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
    const isAdminEmail = decoded.email ? adminEmails.includes(decoded.email) : false;
    
    const isAdmin = isAdminClaim || isAdminEmail;

    return NextResponse.json({ 
      isAdmin, 
      uid: decoded.uid, 
      email: decoded.email 
    });
  } catch (error) {
    console.error("Admin check error:", error);
    return NextResponse.json({ isAdmin: false, error: "Invalid token" }, { status: 403 });
  }
}
