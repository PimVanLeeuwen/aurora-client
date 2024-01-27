import React from 'react';
import './index.css';
import AuthContextProvider from './contexts/AuthContext';
import HandlerSwitcher from './HandlerSwitcher';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <HandlerSwitcher />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
