import { Outlet } from '@tanstack/react-router';
import BottomNav from './BottomNav';

export default function AppShell() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-eco-green px-6 shadow-md">
        <div className="flex items-center gap-3">
          <img src="/assets/generated/app-logo.dim_512x512.png" alt="Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold text-white">Food Wastage Solution</h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}
