import { redirect } from 'next/navigation';
import { AdminRoutes } from '../config';

export default function Page() {
  redirect(AdminRoutes.Dashboard);
}
