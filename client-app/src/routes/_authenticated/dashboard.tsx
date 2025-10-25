import { createFileRoute } from '@tanstack/react-router'
import { HeaderComponent } from '../../components/header/HeaderComponent';
import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import type { ProfileModel } from '../../models/profile.model';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardComponent,
});

function DashboardComponent() {
  const { accounts } = useMsal();
  const [profile, setProfile] = useState<ProfileModel>({ name: '' });

  useEffect(() => {
    const account = accounts[0];
    if (account) {
      setProfile({ name: account.name } as ProfileModel);
    }
  }, [accounts]);

  return (
    <>
      <HeaderComponent title={'Dashboard'} />
      <h2>Welcome, {profile.name}</h2>
    </>
  );
}