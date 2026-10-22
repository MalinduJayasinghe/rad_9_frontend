import { createContext, useEffect, useState, type ReactNode } from "react"
import { getMyDetails } from "../service/auth"

type AuthContextTypes = {
  user: any
  setUser: any
  loading: boolean
}

export const AuthContext = createContext<AuthContextTypes | null>(null)

type AuthProviderTypes = {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderTypes) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCCESS_TOKEN")
    if (accessToken) {
      setLoading(true)
      getMyDetails()
        .then((res) => {
          if (res.data) {
            setUser(res.data)
          } else {
            setUser(null)
          }
        })
        .catch((error) => {
          console.error(error)
          setUser(null)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
      setUser(null)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
