'use client';

import { useState, useCallback } from 'react';
import { updateProfile, type User } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/app/hooks/useAuth';

export default function EditProfilePage() {
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const handleUserChange = useCallback((currentUser: User | null) => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
      setPhotoURL(currentUser.photoURL || '');
    } else {
      setDisplayName('');
      setPhotoURL('');
    }
  }, []);

  const { user, loading } = useAuth(handleUserChange);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateProfile(user, { displayName, photoURL });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Error updating profile.');
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display Name"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          placeholder="Photo URL"
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}
