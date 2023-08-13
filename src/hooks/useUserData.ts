import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from '../services/firebase';

const useUserData = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      setUser(user);
    });
  }, );
  return user;
};

export default useUserData;