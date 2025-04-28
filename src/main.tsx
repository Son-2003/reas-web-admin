import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './polyfill.ts';
import App from './App.tsx';
import '@/utils/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
