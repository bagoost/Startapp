import {
  Route,
  Routes as RouterRoutes,
} from 'react-router-dom';

// Views
import {
  Error404View,
  LandingView,
} from '../views';

// Hooks
import { useScrollToTop } from '../hooks';

function Router() {
  useScrollToTop();

  return (
    <RouterRoutes>
      <Route
        element={<LandingView />}
        path="/"
      />
      <Route
        element={<Error404View />}
        path="*"
      />
    </RouterRoutes>
  );
}

export default Router;
