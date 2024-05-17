import Login from "@/components/Login";
import UserRegistration from "@/components/Signup";

export default function Home({ searchParams: { user } }) {
  return <>{user === "register" ? <UserRegistration /> : <Login />}</>;
}
