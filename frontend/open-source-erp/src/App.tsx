import { RecoilRoot } from "recoil";
import "./App.css";
import { AuthProvider } from "./context/authProvider";
import { ThemeProvider } from "./context/useTheme";
import Router from "./router/router";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
