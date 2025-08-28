import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import SessionProvider from '@/lib/utils/SessionProvider';
import StoreProvider from '@/lib/utils/StoreProvider';
import Sidebar from '@/components/Layout/Sidebar';
import {ToastContainer} from 'react-toastify'

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
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