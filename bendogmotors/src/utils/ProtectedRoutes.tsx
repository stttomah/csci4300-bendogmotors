"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const authToken = Cookies.get("authToken");

    if (!authToken) {
      router.push("/"); // redirect to login if no token found
    } else {
      setIsChecking(false); // allow access
    }
  }, [router]);

  if (isChecking) {
    return <div>Loading...</div>; // loading indication
  }

  return <>{children}</>;
};

export default ProtectedRoutes;