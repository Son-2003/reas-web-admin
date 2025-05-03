import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectUserInfo } from '@/containers/Auth/selector';
import { LoaderCircle } from 'lucide-react';

const AdminRoute: React.FC = () => {
  const userInfo = useSelector(selectUserInfo);
  const role = userInfo?.roleName;
  const [shouldCheckRole, setShouldCheckRole] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldCheckRole(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!role && !shouldCheckRole) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    );
  }

  if (role !== 'ROLE_ADMIN') {
    return <Navigate to="/admin" />;
  }

  return <Outlet />;
};

export default AdminRoute;
