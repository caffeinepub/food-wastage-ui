import { Outlet } from '@tanstack/react-router';
import BottomNav from './BottomNav';
import { Heart } from 'lucide-react';

export default function AppShell() {
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'unknown-app';

  return (
    <div className="flex min-h-screen flex-col bg-sand">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-leaf px-6 shadow-lg">
        <div className="flex items-center gap-3">
          <img src="/assets/generated/app-logo.dim_512x512.png" alt="Logo" className="h-10 w-10 rounded-lg" />
          <h1 className="text-xl font-bold text-white">Food Wastage Solution</h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      <footer className="border-t border-earth-200 bg-white py-4 text-center text-sm text-earth-600">
        <p>
          © {new Date().getFullYear()} · Built with <Heart className="inline h-4 w-4 text-rose-500" /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-leaf hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      <BottomNav />
    </div>
  );
}
