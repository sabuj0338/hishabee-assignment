import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoadingIndicator } from './common/LoadingIndicator';
import AppLayout from './layouts/app-layout';

const DashboardPage = lazy(() => import("./pages/dashboard"));
const AlbumPage = lazy(() => import("./pages/album"));

function App() {

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Routes>
        <Route path="/" element={<AppLayout><DashboardPage /></AppLayout>} />
        <Route path="/album" element={<AppLayout><AlbumPage /></AppLayout>} />
      </Routes>
    </Suspense>
  );
}

export default App
