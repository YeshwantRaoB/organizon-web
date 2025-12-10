'use client';

import { useState } from 'react';
import { Address } from '@/app/lib/types';
import { useAuth } from '@/app/hooks/useAuth';
import { indiaStates, indiaStateCities } from '@/app/lib/indiaLocations';

interface AddressFormProps {
  address: Address | null;
  onClose: () => void;
}

export default function AddressForm({ address, onClose }: AddressFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState(
    address || {
      fullName: '',
      phoneNumber: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India',
      isDefault: false,
      addressType: 'Home',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Derive list of cities based on current state selection (case-insensitive match)
  const citiesForSelectedState = (() => {
    const stateValue = formData.state?.trim();
    if (!stateValue) return [] as string[];

    const matchedStateKey = Object.keys(indiaStateCities).find(
      (state) => state.toLowerCase() === stateValue.toLowerCase()
    );

    if (!matchedStateKey) return [] as string[];
    return indiaStateCities[matchedStateKey] || [];
  })();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const token = await user.getIdToken();
    const url = address ? `/api/user/addresses/${address._id}` : '/api/user/addresses';
    const method = address ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        required
        className="input input-bordered w-full"
      />
      <input
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        required
        className="input input-bordered w-full"
      />
      <input
        name="streetAddress"
        value={formData.streetAddress}
        onChange={handleChange}
        placeholder="Street Address"
        required
        className="input input-bordered w-full"
      />

      {/* State before City, both with autocomplete */}
      <input
        name="state"
        list="india-states"
        value={formData.state}
        onChange={handleChange}
        placeholder="State"
        required
        className="input input-bordered w-full"
      />
      <datalist id="india-states">
        {indiaStates.map((state) => (
          <option key={state} value={state} />
        ))}
      </datalist>

      <input
        name="city"
        list="india-cities"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        required
        className="input input-bordered w-full"
      />
      <datalist id="india-cities">
        {citiesForSelectedState.map((city) => (
          <option key={city} value={city} />
        ))}
      </datalist>
      <input name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Zip Code" required className="input input-bordered w-full" />
      <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" required className="input input-bordered w-full" />
      <select name="addressType" value={formData.addressType} onChange={handleChange} className="select select-bordered w-full">
        <option>Home</option>
        <option>Work</option>
        <option>Other</option>
      </select>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Set as default address</span>
          <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} className="checkbox" />
        </label>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="btn">Cancel</button>
        <button type="submit" className="btn btn-primary">Save Address</button>
      </div>
    </form>
  );
}
