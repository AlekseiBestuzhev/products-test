type Tokens = {
  accessToken: string;
  refreshToken: string;
};

const KEY = "auth_tokens";

let storage: Storage = (() => {
  if (localStorage.getItem(KEY)) {
    return localStorage;
  } else {
    return sessionStorage;
  }
})();

export const tokenStorage = {
  setRemember(remember: boolean) {
    storage = remember ? localStorage : sessionStorage;
  },

  set(tokens: Tokens) {
    storage.setItem(KEY, JSON.stringify(tokens));
  },

  get(): Tokens | null {
    const raw = storage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  },

  clear() {
    localStorage.removeItem(KEY);
    sessionStorage.removeItem(KEY);
  },
};
