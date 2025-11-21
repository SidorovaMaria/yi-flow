import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Logout from "./Logout";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  console.log("Session in home page:", session);
  return (
    <div className="flex w-full flex-col">
      <Logout />
    </div>
  );
}
