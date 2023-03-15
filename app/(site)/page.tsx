import { getCurrentUser } from "@/lib/session";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";

export default async function Home() {

  const user = await getCurrentUser();
  if (!user) {
    return (
      <>
        <h1>Hello world</h1>
        <LoginButton />
      </>
    );
  }
  else return (
    <>
      <h1>Hello world</h1>
      <LogoutButton />
      <div>
        Signed in as {user.name}
      </div>
    </>
  );  
}
