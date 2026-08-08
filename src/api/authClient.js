const AUTH_TOKEN_KEY = "local_auth_token";

const getStoredToken = () => typeof window !== "undefined" ? window.localStorage.getItem(AUTH_TOKEN_KEY) : null;
const setStoredToken = (value) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(AUTH_TOKEN_KEY, value);
  }
};
const removeStoredToken = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

const auth = {
  loginViaEmailPassword: async (email, password) => {
    // Simple local stub: accept any credentials and store a token.
    setStoredToken("local-token");
    return { email };
  },

  loginWithProvider: (provider, returnTo = "/") => {
    setStoredToken("local-token");
    if (typeof window !== "undefined") {
      window.location.href = returnTo;
    }
  },

  resetPasswordRequest: async (email) => {
    // Stub: no backend call.
    return true;
  },

  resetPassword: async ({ resetToken, newPassword }) => {
    if (!resetToken) {
      throw new Error("Reset token missing");
    }
    return true;
  },

  register: async ({ email, password }) => {
    setStoredToken("local-token");
    return { email };
  },

  verifyOtp: async ({ email, otpCode }) => {
    setStoredToken("local-token");
    return { access_token: "local-token" };
  },

  setToken: (token) => {
    setStoredToken(token);
  },

  resendOtp: async (email) => {
    return true;
  },

  logout: (redirectUrl) => {
    removeStoredToken();
    if (redirectUrl && typeof window !== "undefined") {
      window.location.href = redirectUrl;
    }
  },

  redirectToLogin: (redirectUrl) => {
    if (typeof window !== "undefined") {
      window.location.href = redirectUrl;
    }
  },

  me: async () => {
    const token = getStoredToken();
    if (!token) {
      const error = new Error("Not authenticated");
      error.status = 401;
      throw error;
    }
    return { email: "user@example.com", name: "Local User" };
  }
};

export const authClient = { auth };
