import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Home, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BottomNav() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-earth-200 bg-white shadow-2xl">
      <div className="mx-auto flex max-w-md items-center justify-around">
        <Button
          variant="ghost"
          className={`flex flex-1 flex-col items-center gap-1 rounded-none py-4 transition-colors ${
            isActive('/') ? 'text-leaf' : 'text-earth-600 hover:text-earth-900'
          }`}
          onClick={() => navigate({ to: '/' })}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs font-medium">Home</span>
        </Button>

        <Button
          variant="ghost"
          className={`flex flex-1 flex-col items-center gap-1 rounded-none py-4 transition-colors ${
            isActive('/history') ? 'text-leaf' : 'text-earth-600 hover:text-earth-900'
          }`}
          onClick={() => navigate({ to: '/history' })}
        >
          <History className="h-6 w-6" />
          <span className="text-xs font-medium">History</span>
        </Button>
      </div>
    </nav>
  );
}
