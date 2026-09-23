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
