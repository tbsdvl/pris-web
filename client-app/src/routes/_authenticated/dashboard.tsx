import { createFileRoute } from '@tanstack/react-router'
import { HeaderComponent } from '../../core/components/header/HeaderComponent';
import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import type { ProfileModel } from '../../models/profile.model';
import { LoadingSpinnerComponent } from '../../core/components/loading-spinner/LoadingSpinnerComponent';
import { ButtonComponent } from '../../core/components/button/ButtonComponent';
import { useAuth } from '../../auth/hooks/useAuth';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardComponent,
});

export function DashboardComponent() {
  const { accounts, inProgress } = useMsal();
  const { logout } = useAuth();
  const [profile, setProfile] = useState<ProfileModel>({ name: '' });

  const handleLogout = async () => {
    await logout();
  }

  useEffect(() => {
    const account = accounts[0];
    if (account) {
      setProfile({ name: account.name } as ProfileModel);
    }
  }, [accounts]);

  if (inProgress === 'login') {
    return <LoadingSpinnerComponent />;
  }

  return (
    <>
      <HeaderComponent title={'Dashboard'} />
      <h2>Welcome, {profile.name}</h2>
      <ButtonComponent id={'logout'} title={'Logout'} cb={handleLogout} />
    </>
  );
}