import { PropsWithChildren, useState } from 'react';
import { AuthContext } from './AuthContext';

export default function AuthProvider({ children }: PropsWithChildren) {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
