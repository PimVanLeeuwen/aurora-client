import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import HandlerSwitcher from './HandlerSwitcher';
import ErrorBoundary from './ErrorBoundary';
import { client } from './api';

export default function App() {
  client.setConfig({
    baseUrl: '/api',
  });

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
