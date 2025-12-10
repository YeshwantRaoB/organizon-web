import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import dbConnect from '@/app/lib/mongoose';
import Address from '@/app/lib/models/address';
import AuditLog from '@/app/lib/models/auditLog';


export async function PUT(req: NextRequest, { params }: { params: Promise<{ addressId: string }> }) {
  const authorization = req.headers.get('Authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const idToken = authorization.split('Bearer ')[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const userId = decodedToken.uid;
    const { addressId } = await params;

    await dbConnect();

    const body = await req.json();
    const { fullName, phoneNumber, streetAddress, city, state, zipCode, country, isDefault, addressType } = body;

    if (isDefault) {
      await Address.updateMany({ userId }, { $set: { isDefault: false } });
    }

    const originalAddress = await Address.findOne({ _id: addressId, userId });

    if (!originalAddress) {
      return NextResponse.json({ message: 'Address not found' }, { status: 404 });
    }

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      { fullName, phoneNumber, streetAddress, city, state, zipCode, country, isDefault, addressType },
      { new: true }
    );

    await new AuditLog({
      userId,
      action: 'UPDATE_ADDRESS',
      addressId,
      before: originalAddress.toObject(),
      after: updatedAddress.toObject(),
    }).save();

    if (!updatedAddress) {
      return NextResponse.json({ message: 'Address not found' }, { status: 404 });
    }

    return NextResponse.json(updatedAddress, { status: 200 });
  } catch (error) {
    console.error('Error updating address:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ addressId: string }> }) {
  const authorization = req.headers.get('Authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const idToken = authorization.split('Bearer ')[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const userId = decodedToken.uid;
    const { addressId } = await params;

    await dbConnect();

    const deletedAddress = await Address.findOneAndDelete({ _id: addressId, userId });

    if (deletedAddress) {
      await new AuditLog({
        userId,
        action: 'DELETE_ADDRESS',
        addressId,
        before: deletedAddress.toObject(),
      }).save();
    }

    if (!deletedAddress) {
      return NextResponse.json({ message: 'Address not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Address deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting address:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
