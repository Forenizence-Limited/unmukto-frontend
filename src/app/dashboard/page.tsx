"use client";
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/Loader';
import { useAuth } from '@/utils/hooks/useAuth';
import { DashboardView } from '@/components/dashboard/DashboardView';

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    router.push("/login");
    return <Loader />;
  }

  if (isAuthenticated && user?.roles[0].name != "ROLE_ADMIN") {
    router.push("/");
    return <Loader />;
  }

  return <DashboardView />;
}
