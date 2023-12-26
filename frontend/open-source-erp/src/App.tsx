import { RecoilRoot } from "recoil";
import "./App.css";
import { AuthProvider } from "./context/authProvider";
import { ThemeProvider } from "./context/useTheme";
import Router from "./router/router";
import { queryClient } from "./hooks/queryClient";
import { QueryClientProvider } from '@tanstack/react-query';

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;

