import { RecoilRoot } from 'recoil';
import './App.css';
import { AuthProvider } from './context/authProvider';
import { ThemeProvider } from './context/useTheme';
import Router from './router/router';
import { queryClient } from './hooks/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

setBasePath(
  'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.12.0/cdn/'
);

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
