import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectUserInfo } from '@/containers/Auth/selector';
import { LoaderCircle } from 'lucide-react';

const AdminRoute: React.FC = () => {
  const userInfo = useSelector(selectUserInfo);
  const role = userInfo?.roleName;
  const [shouldCheckRole, setShouldCheckRole] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldCheckRole(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (shouldCheckRole && role && role !== 'ROLE_ADMIN') {
      const redirectTimer = setTimeout(() => {
        setShouldRedirect(true);
      }, 500);

      return () => clearTimeout(redirectTimer);
    }
  }, [shouldCheckRole, role]);

  if (!role && !shouldCheckRole) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    );
  }

  if (shouldRedirect) {
    return <Navigate to="/admin/users-management" />;
  }

  if (role === 'ROLE_ADMIN') {
    return <Outlet />;
  }

  return null;
};

export default AdminRoute;
