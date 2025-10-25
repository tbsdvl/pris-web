import './App.css';

import { RouterProvider } from '@tanstack/react-router'
import { router } from './router';
import { AppProvider } from './auth';

function InnerApp() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <InnerApp />
    </AppProvider>
  );
}

export default App;