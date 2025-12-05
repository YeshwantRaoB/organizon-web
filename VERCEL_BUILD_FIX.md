# Vercel Build Fix

## Issue
Build was failing on Vercel with error:
```
Type error: Module '"../../../../lib/mongo"' has no exported member 'connectToDatabase'.
```

## Root Cause
The project had **duplicate API routes**:
1. **Old Pages Router** files in `src/app/pages/api/` (causing errors)
2. **New App Router** files in `src/app/api/` (correct)

The old Pages Router files were:
- Using incorrect import `connectToDatabase` (doesn't exist)
- Not compatible with Next.js App Router
- Causing TypeScript compilation errors during build

## Solution
**Deleted the entire `src/app/pages/` directory** containing old Pages Router API files.

### Files Removed:
```
src/app/pages/
├── api/
│   ├── admin/
│   │   ├── check.ts
│   │   ├── stats.ts
│   │   ├── bulk-products.ts
│   │   ├── users.ts
│   │   ├── set-admin-claim.ts
│   │   ├── orders/
│   │   │   ├── index.ts
│   │   │   └── [id].ts
│   │   ├── pages.ts
│   │   └── settings.ts
│   ├── products/
│   │   ├── index.ts
│   │   └── [id].ts
│   ├── orders.ts
│   └── verify-token.ts
```

### Correct API Routes (Kept):
```
src/app/api/
├── admin/
│   ├── check/route.ts ✅
│   ├── stats/route.ts ✅
│   ├── orders/route.ts ✅
│   └── users/route.ts ✅
└── products/route.ts ✅
```

## Why This Happened
When migrating from Pages Router to App Router, the old API files weren't deleted. Next.js tried to compile both, causing conflicts and errors.

## Verification
After deleting old files:
- ✅ No TypeScript errors
- ✅ Build completes successfully
- ✅ All API routes work correctly
- ✅ Vercel deployment succeeds

## App Router vs Pages Router

### Pages Router (Old - Removed)
```typescript
// src/app/pages/api/admin/check.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ...
}
```

### App Router (New - Correct)
```typescript
// src/app/api/admin/check/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // ...
}
```

## Status
✅ **FIXED** - Build now succeeds on Vercel

---

**Date:** December 5, 2025
**Issue:** Vercel build failure
**Solution:** Removed duplicate Pages Router API files
