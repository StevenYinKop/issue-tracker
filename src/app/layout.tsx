import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavBar } from './components';
import './globals.css';
import './theme-config.css';


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Theme>
          <NavBar></NavBar>
          <main className='pl-5'>{children}</main>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  )
}
