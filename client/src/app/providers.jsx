'use client'
import * as React from "react";
// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { usePathname, useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function Providers({ children }) {
  // 2. Wrap NextUIProvider at the root of your app
  const router = useRouter();
  const { userDetails, token } = useSelector(state => state.user)
  const pathName = usePathname()
  const unAuthenticatedRoute = ['/', '/login', '/register', '/search', '/about', '/features']
  const signInUpRoute=['/login', '/register']
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      if (!unAuthenticatedRoute.includes(pathName) && !pathName.startsWith('/product-details/')) {
        router.push('/login');
      }
    } else {
      if (pathName === '/admin' && userDetails.role !== "Admin") {
        router.push('/');
      }
    }
    setLoading(false);
  }, [token, pathName, router, userDetails]);

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>

    );
  }
  return (
    <NextUIProvider navigate={router.push}>
      <Toaster />
      {children}
    </NextUIProvider>
  );
}

export default Providers


