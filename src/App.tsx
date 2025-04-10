import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { MainLayout } from '@/components/layouts/main-layout';
import { Dashboard } from '@/components/pages/dashboard';
import { Business } from '@/components/pages/business';
import { Personal } from '@/components/pages/personal';
import { Wealth } from '@/components/pages/wealth';
import { Cards } from '@/components/pages/cards';
import { Profile } from '@/components/pages/profile';
import { Auth } from '@/components/pages/auth';

const GOOGLE_CLIENT_ID = "178071250720-la74o66fk1v8cmqn27l55mtji7tr7k1n.apps.googleusercontent.com"; // Replace with your actual client ID

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!isAuthenticated) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <ThemeProvider defaultTheme="light" storageKey="finance-theme">
          <Auth onLogin={() => setIsAuthenticated(true)} />
          <Toaster />
        </ThemeProvider>
      </GoogleOAuthProvider>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'business':
        return <Business />;
      case 'personal':
        return <Personal />;
      case 'wealth':
        return <Wealth />;
      case 'cards':
        return <Cards />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="finance-theme">
      <MainLayout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderPage()}
      </MainLayout>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;