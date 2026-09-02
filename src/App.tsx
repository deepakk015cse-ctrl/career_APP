import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { ProfileSetupWizard } from './components/auth/ProfileSetupWizard';
import { AppShell } from './components/layout/AppShell';

const MainRouter: React.FC = () => {
  const { currentView } = useApp();

  switch (currentView) {
    case 'landing':
      return <LandingPage />;
    case 'login':
      return <LoginPage />;
    case 'signup':
      return <SignupPage />;
    case 'forgot_password':
      return <ForgotPasswordPage />;
    case 'profile_setup':
      return <ProfileSetupWizard />;
    case 'app':
    default:
      return <AppShell />;
  }
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}

