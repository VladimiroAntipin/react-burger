export const Tokens = (() => {
    const tokens = {
      refreshToken: localStorage.getItem("refreshToken") || null,
      accessToken: localStorage.getItem("accessToken") || null,
    };
    console.log(tokens);
    return {
      get value() {
        return tokens;
      },
      set value(newValue: {
        refreshToken: string | null;
        accessToken: string | null;
      }) {
        tokens.refreshToken = newValue.refreshToken;
        tokens.accessToken = newValue.accessToken;
        localStorage.setItem("refreshToken", newValue.refreshToken || "");
        localStorage.setItem("accessToken", newValue.accessToken || "");
      },
      get refreshToken() {
        return tokens.refreshToken;
      },
      set refreshToken(newValue: string | null) {
        tokens.refreshToken = newValue;
        localStorage.setItem("refreshToken", newValue || "");
      },
  
      get accessToken() {
        return tokens.accessToken;
      },
      set accessToken(newValue: string | null) {
        tokens.accessToken = newValue;
        localStorage.setItem("accessToken", newValue || "");
      },
      delete() {
        tokens.refreshToken = null;
        tokens.accessToken = null;
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
      },
    };
  })();