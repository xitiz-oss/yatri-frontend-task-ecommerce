'use client';

import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc'; 

export default function SignInPage() {
  const [providers, setProviders] = useState<any>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const getAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    getAuthProviders();
  }, []);

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 absolute inset-0 z-99 bg-black/70">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back 👋</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue to your account
          </p>
        </div>

        {/* Provider Buttons */}
        <div className="space-y-4">
          {providers &&
            Object.values(providers).map((provider: any) => (
              <div key={provider.name}>
                <button
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                  className={`group relative w-full flex items-center justify-center gap-3 py-3 px-4 border text-sm font-medium rounded-lg shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                    provider.name === 'Google'
                      ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  <FcGoogle size={22} />
                  <span>Sign in with {provider.name}</span>
                </button>
              </div>
            ))}
        </div>

        
      </div>
    </div>
  );
}
