import AuthProvider from "./context/AuthContext"
import AppRouter from "./router"

function App() {
  // useAuth() - can't
 
  return (
    <AuthProvider>
      {/* Full application */}
      <AppRouter />
    </AuthProvider>
  )
}

export default App
