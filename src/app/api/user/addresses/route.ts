import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import dbConnect from '@/app/lib/mongoose';
import Address from '@/app/lib/models/address';
import AuditLog from '@/app/lib/models/auditLog';


export async function GET(req: NextRequest) {
  const authorization = req.headers.get('Authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const idToken = authorization.split('Bearer ')[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

    await dbConnect();
    const addresses = await Address.find({ userId });
    return NextResponse.json(addresses, { status: 200 });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authorization = req.headers.get('Authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const idToken = authorization.split('Bearer ')[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

    await dbConnect();

    const body = await req.json();
    const { fullName, phoneNumber, streetAddress, city, state, zipCode, country, isDefault, addressType } = body;

    if (isDefault) {
      await Address.updateMany({ userId }, { $set: { isDefault: false } });
    }

    const newAddress = new Address({
      userId,
      fullName,
      phoneNumber,
      streetAddress,
      city,
      state,
      zipCode,
      country,
      isDefault,
      addressType,
    });

    await newAddress.save();

    await new AuditLog({
      userId,
      action: 'CREATE_ADDRESS',
      addressId: newAddress._id,
      after: newAddress.toObject(),
    }).save();

    return NextResponse.json(newAddress, { status: 201 });
  } catch (error) {
    console.error('Error creating address:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
