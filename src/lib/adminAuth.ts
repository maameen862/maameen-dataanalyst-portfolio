// NOTE: Hard-coded password is INSECURE — anyone can read it from the JS bundle.
// This is a localStorage-only admin gate as explicitly requested.
const ADMIN_PASSWORD = "Ameen@2607";
const SESSION_KEY = "portfolio:admin:session";

export const isAdminAuthed = () => {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "1";
};

export const tryAdminLogin = (pw: string) => {
  if (pw === ADMIN_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, "1");
    return true;
  }
  return false;
};

export const adminLogout = () => {
  sessionStorage.removeItem(SESSION_KEY);
};
