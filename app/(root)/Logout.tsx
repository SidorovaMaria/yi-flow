import { signOut } from "@/auth";
import { Button } from "@/components/ui/atoms/Button";
import { LogOut } from "lucide-react";

const Logout = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" className="base-medium w-fit bg-transparent px-4 py-3">
        <LogOut className="size-5 text-black dark:text-white" />
        <span className="text-dark300_light900 max-lg:hidden">Logout</span>
      </Button>
    </form>
  );
};

export default Logout;
