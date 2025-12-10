'use client';

import { Address } from '@/app/lib/types';

interface AddressListProps {
  addresses: Address[];
  onEdit: (address: Address) => void;
  onDelete: (addressId: string) => void;
}

export default function AddressList({ addresses, onEdit, onDelete }: AddressListProps) {
  return (
    <div>
      {Array.isArray(addresses) && addresses.map((address) => (
        <div key={address._id} className="border p-4 my-2 rounded-lg">
          <p>{address.fullName}</p>
          <p>{address.streetAddress}, {address.city}, {address.state} {address.zipCode}</p>
          <p>{address.country}</p>
          <p>{address.phoneNumber}</p>
          {address.isDefault && <span className="badge badge-primary">Default</span>}
          <div className="mt-2">
            <button onClick={() => onEdit(address)} className="btn btn-sm btn-secondary mr-2">Edit</button>
            <button onClick={() => onDelete(address._id)} className="btn btn-sm btn-danger">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
