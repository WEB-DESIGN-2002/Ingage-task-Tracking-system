import { redirect } from 'next/navigation';

export default function ManagerSettingsRedirect() {
  redirect('/manager/profile');
}
