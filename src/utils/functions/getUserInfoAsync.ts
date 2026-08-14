const getUserInfoAsync = async () => {
  const response = await fetch("/userinfo", { credentials: "include" });
  if (response.status !== 200) {
    return { username: null, status: response.status } as {
      username: string | null;
      status: number;
    };
  }
  const username = await response.json();
  return { username, status: response.status } as {
    username: string | null;
    status: number;
  };
};
export default getUserInfoAsync;
