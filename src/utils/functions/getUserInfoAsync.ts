const getUserInfoAsync = async () => {
  const url =
    import.meta.env.VITE_ENVIRONMENT == "development"
      ? `/user_profile/userinfo`
      : `https://playon-auth.runasp.net/user_profile/userinfo`;
  const response = await fetch(url, {
    credentials: "include",
  });
  if (response.status !== 200) {
    return { username: null, status: response.status } as {
      username: string | null;
      status: number;
    };
  }
  const { username } = (await response.json()) as { username: string | null };
  return { username, status: response.status } as {
    username: string | null;
    status: number;
  };
};
export default getUserInfoAsync;
