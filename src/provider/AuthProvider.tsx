import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import firebase from 'firebase/compat/app';
import { auth } from "../Config/Config";

type Props = {
    children?: React.ReactNode
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  //constant user pour l'utilisateur et setUser pour modifier l'utilisateur
  const [user, setUser] = useState<firebase.User | null>(null);

  //Hooks pour se connecté et se déconnecter(Changer d'utilisateur)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};