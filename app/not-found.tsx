import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen absolute z-99 inset-0 flex items-center justify-center bg-black/90 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
          <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
          <p className="text-white">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#283841] text-white px-6 py-3 rounded-lg hover:bg-[#283841]/80 transition-colors"
          >
            <Home size={20} />
            Go Home
          </Link>
          
     
        </div>
      </div>
    </div>
  );
}