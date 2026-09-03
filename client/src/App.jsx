import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { AdminPage } from "./pages/AdminPage";
import { CitizenPage } from "./pages/CitizenPage";
import { LoginPage } from "./pages/LoginPage";
import { clearSession, persistSession, restoreSession } from "./session";
import { applyTheme, persistTheme, restoreTheme } from "./theme";

export default function App() {
  const [session, setSession] = useState(restoreSession);
  const [theme, setTheme] = useState(restoreTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function handleThemeToggle() {
    const nextTheme = theme === "light" ? "dark" : "light";
    persistTheme(nextTheme);
    setTheme(nextTheme);
  }

  function handleLogin(nextSession) {
    persistSession(nextSession);
    setSession(nextSession);
  }

  function handleLogout() {
    clearSession();
    setSession(null);
  }

  return (
    <>
      <Header user={session?.user} onLogout={handleLogout} theme={theme} onThemeToggle={handleThemeToggle} />
      {!session && <LoginPage onLogin={handleLogin} />}
      {session?.user.role === "citizen" && <CitizenPage user={session.user} />}
      {session?.user.role === "admin" && <AdminPage user={session.user} />}
    </>
  );
}
