import React from 'react';
import './index.css';
import AuthContextProvider from './contexts/AuthContext';
import HandlerSwitcher from './HandlerSwitcher';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthContextProvider>
          <HandlerSwitcher />
        </AuthContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
