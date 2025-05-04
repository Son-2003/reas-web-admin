import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectUserInfo } from '@/containers/Auth/selector';
import { LoaderCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const StaffRoute: React.FC = () => {
  const userInfo = useSelector(selectUserInfo);
  const role = userInfo?.roleName;
  const [shouldCheckRole, setShouldCheckRole] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldCheckRole(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (shouldCheckRole && role && role !== 'ROLE_STAFF') {
      toast({
        title: 'Access denied',
        description: 'You do not have permission to access this page.',
        variant: 'destructive',
      });

      const redirectTimer = setTimeout(() => {
        setShouldRedirect(true);
      }, 500);

      return () => clearTimeout(redirectTimer);
    }
  }, [shouldCheckRole, role, toast]);

  if (!role && !shouldCheckRole) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    );
  }

  if (shouldRedirect) {
    return <Navigate to="/admin" />;
  }

  if (role === 'ROLE_STAFF') {
    return <Outlet />;
  }

  return null;
};

export default StaffRoute;
