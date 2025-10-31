import { createFileRoute } from '@tanstack/react-router'
import { HeaderComponent } from '../../core/components/header/HeaderComponent';
import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import type { ProfileModel } from '../../user/models/profile.model';
import { LoadingSpinnerComponent } from '../../core/components/loading-spinner/LoadingSpinnerComponent';
import { ButtonComponent } from '../../core/components/button/ButtonComponent';
import { useAuth } from '../../auth/hooks/useAuth';
import { useFetchData } from '../../core/hooks/useFetchData';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardComponent,
});

export function DashboardComponent() {
  const { accounts, inProgress } = useMsal();
  const { logout } = useAuth();
  const [profile, setProfile] = useState<ProfileModel>({ name: '' });
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const fetchIsAdminResult = useFetchData('/isAdmin');

  const handleLogout = async () => {
    await logout();
  }

  useEffect(() => {
    const account = accounts[0];
    if (account) {
      setProfile({ name: account.name } as ProfileModel);
      if (fetchIsAdminResult) {
        
      }
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