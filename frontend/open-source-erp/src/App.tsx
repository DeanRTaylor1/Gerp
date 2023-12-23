import './App.css'
import Layout from './Components/layout/Layout'
import { ThemeProvider } from './context/useTheme'
import Router from './router/router'

function App() {

  return (
    <ThemeProvider>
      <Layout>
        <Router />
      </Layout>
    </ThemeProvider>
  )
}

export default App
