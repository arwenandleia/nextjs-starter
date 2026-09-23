"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { toast } from "sonner";

const RootErrorPage = ({ error }: { error: Error & { digest?: string } }) => {
  useEffect(() => {
    toast.error(error.message);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
    </div>
  );
};

export default RootErrorPage;
