import { signIn, signOut, useSession } from "next-auth/react";

const IndexPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Auth</h1>
      <button onClick={() => (!session ? signIn() : signOut())}>
        {!session ? "Sign in" : "Log out"}
      </button>
    </div>
  );
};

export default IndexPage;
