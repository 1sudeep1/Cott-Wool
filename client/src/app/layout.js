import { Inter } from 'next/font/google'
import './globals.css'
import LayoutProvider from './components/layoutProvider'
// import { NextUIProvider } from '@nextui-org/react/dist'
import NextUIProviders from './providers'
import ReduxProvider from './redux/provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <LayoutProvider> */}
        <ReduxProvider>
          <NextUIProviders>
            {children}
          </NextUIProviders>
        </ReduxProvider>
        {/* </LayoutProvider> */}
      </body>
    </html>
  )
}
