'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/app/lib/firebaseClient';

export function useAuth(onUserChange?: (user: User | null) => void) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
      if (onUserChange) {
        onUserChange(nextUser);
      }
    });

    return () => unsubscribe();
  }, [onUserChange]);

  return { user, loading };
}
