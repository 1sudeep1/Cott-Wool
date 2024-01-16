'use client'
import * as React from "react";
// 1. import `NextUIProvider` component
import {NextUIProvider} from "@nextui-org/react";
import Header from "./components/header/page";
import Footer from "./components/footer/page";


function Providers({children}) {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <NextUIProvider>
     <Header />
      {children}
      <Footer />
    </NextUIProvider>
  );
}

export default Providers