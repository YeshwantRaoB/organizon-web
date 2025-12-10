import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from "firebase-admin/auth";
import dbConnect from '../../lib/mongoose';
import Cart from '../../lib/models/cart';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Initialize Firebase Admin if not already initialized

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
    await dbConnect();
    const cart = await Cart.findOne({ userId });

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

    await dbConnect();
    const result = await Cart.updateOne(
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
