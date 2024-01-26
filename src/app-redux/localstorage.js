export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('th-app-auth-user');

    if (serializedState === null) {
      return undefined;
    }
    return {
      auth: {
        status: "idle",
        data:
          JSON.parse(serializedState),
      },
    };

  } catch (err) {
    return undefined;
  }
};
