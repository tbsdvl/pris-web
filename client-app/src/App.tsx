import './App.css';

import { RouterProvider } from '@tanstack/react-router'
import { router } from './router';
import { AppProvider } from './auth';

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;