import { useFetchUserQuery, Users, useUpdateUserMutation } from "@lib/graphql";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import styled from "styled-components";

const DebugContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const DebugContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.space[3]}px;

  & strong {
    line-height: 1;
    font-weight: ${(props) => props.theme.fontWeights[3]};
    margin-bottom: 0.5rem;
  }

  & iframe {
    outline: 0;
    border: 0;
    background-color: ${(props) => props.theme.colors.gray[100]};
    padding: ${(props) => props.theme.space[2]}px;
    border-radius: 4px;
    min-height: 300px;
  }
`;

const Profile = ({ id }: { id: string }) => {
  const { data, isLoading, isFetching, error } = useFetchUserQuery(
    { id },
    {
      select: (data) => data.users_by_pk,
      notifyOnChangeProps: ["data"],
    }
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <pre children={JSON.stringify({ isFetching, data, error }, null, 2)} />
      {!isLoading && data && <EditProfile profile={data} />}
    </div>
  );
};

const EditProfile = ({ profile }: { profile: Users }) => {
  const [name, setName] = useState(profile.name ?? "");
  const { isLoading, mutate, isSuccess } = useUpdateUserMutation();
  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleClick = () => {
    mutate(
      { id: profile.id, name },
      {
        onSuccess: (data, variables) => {
          queryClient.setQueryData(["UpdateUser", { id: variables.id }], data);
        },
        onSettled: () => {
          queryClient.invalidateQueries("FetchUser");
        },
      }
    );
  };

  return (
    <div>
      <input type="text" value={name} onChange={(e) => handleChange(e)} />
      <button onClick={() => handleClick()}>Update Profile</button>
      <pre
        children={JSON.stringify(
          {
            name,
            isLoading,
            isSuccess,
          },
          null,
          2
        )}
      />
    </div>
  );
};

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return (
      <div>
        <h1>Access Denied</h1>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  // If session exists, display content
  return (
    <div>
      <h1>Profile</h1>
      <button onClick={() => signOut()}>Log out</button>
      <Profile id={session.id} />
      <DebugContainer>
        <DebugContent>
          <strong>JWT</strong>
          <iframe src="/api/debug/jwt" />
        </DebugContent>
        <DebugContent>
          <strong>Session</strong>
          <iframe src="/api/debug/session" />
        </DebugContent>
      </DebugContainer>
    </div>
  );
};

export default ProfilePage;
