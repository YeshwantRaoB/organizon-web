// pages/api/admin/users.ts
import type { NextApiResponse } from "next";
import type { NextApiRequestWithCookies } from "../../../lib/apiAuth";
import { requireAdmin } from "../../../lib/apiAuth";
import { adminAuth } from "../../../lib/firebaseAdmin";

export default async function handler(req: NextApiRequestWithCookies, res: NextApiResponse) {
  try {
    await requireAdmin(req);

    if (req.method === "GET") {
      // List all users with pagination
      const maxResults = Math.min(1000, Number(req.query.limit) || 100);
      const pageToken = req.query.pageToken as string | undefined;

      const listUsersResult = await adminAuth.listUsers(maxResults, pageToken);
      
      const users = listUsersResult.users.map(user => ({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        disabled: user.disabled,
        emailVerified: user.emailVerified,
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
        customClaims: user.customClaims || {},
      }));

      return res.status(200).json({
        ok: true,
        users,
        pageToken: listUsersResult.pageToken,
      });
    }

    if (req.method === "POST") {
      // Set admin claim for a user
      const { uid, isAdmin } = req.body;

      if (!uid) {
        return res.status(400).json({ ok: false, error: "UID is required" });
      }

      await adminAuth.setCustomUserClaims(uid, { admin: isAdmin === true });

      return res.status(200).json({
        ok: true,
        message: `Admin claim ${isAdmin ? 'granted' : 'revoked'} for user ${uid}`,
      });
    }

    if (req.method === "DELETE") {
      // Disable/delete a user
      const { uid } = req.query;

      if (!uid || typeof uid !== "string") {
        return res.status(400).json({ ok: false, error: "UID is required" });
      }

      await adminAuth.deleteUser(uid);

      return res.status(200).json({
        ok: true,
        message: `User ${uid} deleted`,
      });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (error) {
    console.error("Admin users API error:", error);
    if (error instanceof Error) {
      return res.status(500).json({ ok: false, error: error.message });
    }
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}
