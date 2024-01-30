'use client'
import * as React from "react";
// 1. import `NextUIProvider` component
import {NextUIProvider} from "@nextui-org/react";
import {useRouter} from 'next/navigation'
import { Toaster } from 'react-hot-toast';

function Providers({children}) {
  // 2. Wrap NextUIProvider at the root of your app
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
     <Toaster/>
      {children}
    </NextUIProvider>
  );
}

export default Providers