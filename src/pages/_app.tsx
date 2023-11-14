import '@/styles/globals.css'
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'
import { Auth, UserContext } from '@/context/UserContext';

export default function App({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState<Auth>({
    user: null,
    token: null,
  });
  const isAuthenticated = !!auth.user;

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setAuth({
        user: null,
        token: storedToken,
      });
    }
  }, []);
  
  console.log(auth);

  return (
    <UserContext.Provider value={{
      user: auth.user,
      token: auth.token,
      setAuth: (auth: Auth) => {
        setAuth(auth);
      },
      isAuthenticated,
      logout: () => {
        setAuth({ user: null, token: null });
        localStorage.removeItem('token');
      },
    }}>
    <div className="flex h-screen w-screen text-gray-800 dark:text-gray-200">
      <Component {...pageProps} />
    </div>
    </UserContext.Provider>
  ) 
}
