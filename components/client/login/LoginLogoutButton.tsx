"use client";

import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/actions/login.actions";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "sonner";

const LoginLogoutButton = () => {
  const { data: session } = authClient.useSession();

  if (!session) {
    return (
      <Button variant="default">
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  const handleLogout = async () => {
    const response = await logoutUser();
    if (!response.success) {
      toast.error(response.message);
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LoginLogoutButton;
