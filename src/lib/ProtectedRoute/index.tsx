"use client";

import React, { ComponentType } from "react";
import {
  ILoginUser,
  useGetLoginUserQuery,
} from "../Redux/features/auth/authApi";
import GlobalLoader from "@/components/Loaders/GlobalLoader";
import { redirect, useRouter } from "next/navigation";

interface Props {
  // Define any additional props that the HOC might need
}

const ProtectedRouteHOC = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  const ProtectedRoute: React.FC<P> = (props) => {
    const { data, isLoading, isError } = useGetLoginUserQuery({});
    const router = useRouter();

    const loginUser = data?.data as ILoginUser;

    if (isLoading) {
      return <GlobalLoader height="100vh" />;
    }

    if (!loginUser?.isActive || loginUser?.blocked || !loginUser?.id) {
      router.replace("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedRoute;
};

export default ProtectedRouteHOC;
