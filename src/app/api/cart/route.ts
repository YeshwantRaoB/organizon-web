import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from "firebase-admin/auth";
import { getDb, getCartsCollection } from '../../lib/mongo'; // Assuming mongo.ts is in lib
import { Cart } from '../../lib/types'; // Assuming types.ts is in lib
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG!)),
  });
}

// GET /api/cart - Fetch user's cart
export async function GET(req: NextRequest) {
  try {
    const authorization = req.headers.get('Authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authorization.split('Bearer ')[1];
    let decodedToken;
    try {
      decodedToken = await getAuth().verifyIdToken(idToken);
    } catch (error) {
      return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    const userId = decodedToken.uid;
    const cartsCollection = await getCartsCollection();
    const cart = await cartsCollection.findOne({ userId });

    return NextResponse.json({ cart: cart || { userId, items: [] } }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/cart - Save/Update user's cart
export async function POST(req: NextRequest) {
  try {
    const authorization = req.headers.get('Authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authorization.split('Bearer ')[1];
    let decodedToken;
    try {
      decodedToken = await getAuth().verifyIdToken(idToken);
    } catch (error) {
      return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    const userId = decodedToken.uid;
    const { items } = await req.json();

    if (!Array.isArray(items)) {
      return NextResponse.json({ message: 'Invalid cart items format' }, { status: 400 });
    }

    const cartsCollection = await getCartsCollection();
    const result = await cartsCollection.updateOne(
      { userId },
      { $set: { userId, items, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Cart saved successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error saving cart:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
