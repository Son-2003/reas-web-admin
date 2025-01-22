import { ThemeProvider } from '@/components/theme-provider';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import router from './router/router';
import { Provider } from 'react-redux';
import AuthProvider from './components/auth/AuthProvider';
import { store } from './lib/redux/store';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <>
      <React.StrictMode>
        <Provider store={store}>
          <AuthProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <RouterProvider router={router} />
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </Provider>
      </React.StrictMode>
    </>
  );
}

export default App;
