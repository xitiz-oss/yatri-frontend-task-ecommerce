import './globals.css';
import type { Metadata } from 'next';
import Head from 'next/head';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import SessionProvider from '@/lib/utils/SessionProvider';
import StoreProvider from '@/lib/utils/StoreProvider';
import Sidebar from '@/components/Layout/Sidebar';
import {ToastContainer} from 'react-toastify'


export const metadata: Metadata = {
  title: 'E-Store - Modern E-commerce App',
  description: 'A modern e-commerce application built with Next.js',
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <Head>
        <link href="https://fonts.cdnfonts.com/css/satoshi" rel="stylesheet" />
        <link rel="icon" type="image/png" href="/xitiz-profile.png?v=2"  />
      
      </Head>
      <body className="font-sa">
        <SessionProvider session={session}>
          <StoreProvider>
            <div className="flex h-screen bg-gray-50">
              <Sidebar />
              <main className="flex-1 lg:ml-0 h-screen overflow-auto">
                <div className="lg:hidden h-16"></div>
                {children}
              </main>
            </div>
            <ToastContainer
            />
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}