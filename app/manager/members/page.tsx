import { redirect } from 'next/navigation';

export default function MembersRedirect() {
  redirect('/manager/team');
}
