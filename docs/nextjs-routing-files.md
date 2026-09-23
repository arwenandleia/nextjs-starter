# NextJS Routing Files

- Add standard [NextJS Routing Files](https://nextjs.org/docs/app/getting-started/project-structure#routing-files) at the root/global level.

```bash
touch app/loading.tsx app/not-found.tsx app/error.tsx
```

## `app/loading.tsx`

```tsx
import { IconRotateClockwise } from "@tabler/icons-react";

export default function loading() {
  return (
    <div className="h-screen w-screen absolute top-0 left-0 z-50 bg-secondary opacity-10">
      <div className="flex h-full justify-center items-center ">
        <IconRotateClockwise className="animate-spin" size={64} />
      </div>
    </div>
  );
}
```

## `app/not-found.tsx`

```tsx
export default function notfound() {
  return (
    <div className="h-screen flex flex-col gap-y-8 items-center justify-center">
      <h2 className="text-xl">404 - Not Found</h2>
      <p className="text-3xl">
        The Page You were looking for could not be found
      </p>
    </div>
  );
}
```

## `app/error.tsx`

```tsx
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
```
