import './App.css'
import { AuthProvider } from './context/authProvider'
import { ThemeProvider } from './context/useTheme'
import Router from './router/router'

function App() {

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider >
  )
}

export default App
