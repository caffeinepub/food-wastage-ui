import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { FoodPostsProvider } from './state/FoodPostsProvider';
import AppShell from './components/layout/AppShell';
import HomePage from './pages/HomePage';
import AddFoodPage from './pages/AddFoodPage';
import NgoAlertPage from './pages/NgoAlertPage';
import HistoryPage from './pages/HistoryPage';
import TrackPage from './pages/TrackPage';

const rootRoute = createRootRoute({
  component: AppShell,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const addFoodRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/add-food',
  component: AddFoodPage,
});

const ngoAlertRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ngo-alert',
  component: NgoAlertPage,
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: HistoryPage,
});

const trackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/track',
  component: TrackPage,
});

const routeTree = rootRoute.addChildren([homeRoute, addFoodRoute, ngoAlertRoute, historyRoute, trackRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <FoodPostsProvider>
      <RouterProvider router={router} />
    </FoodPostsProvider>
  );
}
