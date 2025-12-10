'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import AddressList from '@/app/components/AddressList';
import AddressForm from '@/app/components/AddressForm';
import { Address } from '@/app/lib/types';

export default function AddressesPage() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchAddresses = useCallback(async () => {
    if (!user) return;

    const cachedAddresses = localStorage.getItem('addresses');
    if (cachedAddresses) {
      setAddresses(JSON.parse(cachedAddresses));
    }

    const token = await user.getIdToken();
    const res = await fetch('/api/user/addresses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setAddresses(data);
      localStorage.setItem('addresses', JSON.stringify(data));
      setError(null);
    } else {
      setError('Failed to fetch addresses. Please try again later.');
      setAddresses([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user, fetchAddresses]);


  const handleAddAddress = () => {
    setSelectedAddress(null);
    setIsFormOpen(true);
  };

  const handleEditAddress = (address: Address) => {
    setSelectedAddress(address);
    setIsFormOpen(true);
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!user) return;
    const token = await user.getIdToken();
    await fetch(`/api/user/addresses/${addressId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchAddresses();
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    fetchAddresses();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Addresses</h1>
      <button onClick={handleAddAddress} className="btn btn-primary mb-4">Add New Address</button>
      {isFormOpen ? (
        <AddressForm address={selectedAddress} onClose={handleFormClose} />
      ) : (
        error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <AddressList addresses={addresses} onEdit={handleEditAddress} onDelete={handleDeleteAddress} />
        )
      )}
    </div>
  );
}
