import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Register from "../pages/Register"
import Login from "../pages/Login"
import Home from "../pages/Home"
import useAuth from "../hooks/useAuth"
import type { ReactNode } from "react"

type RequireAuthTypes = {
  children: ReactNode
  roles?: string[]
}

const RequireAuth = ({ children, roles }: RequireAuthTypes) => {
  const { user, loading } = useAuth()

  if (loading)
    return (
      <div
        className="flex items-center justify-center h-scre
en bg-gray-100"
      >
        <div
          className="w-16 h-16 border-4 border-blue-500 bo
rder-dashed rounded-full animate-spin"
        ></div>
      </div>
    )

  if (!user) return <Navigate to={"/login"} replace />

  if (roles && !roles.some((role) => user?.roles.includes(role)))
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-2">Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    )

  return <>{children}</>
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Only Protected (after login, can access) */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        {/* ADMIN only */}
        <Route
          path="/home-admin"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <Home />
            </RequireAuth>
          }
        />

        {/* ADMIN, WRITTER only */}
        <Route
          path="/home-admin-wr"
          element={
            <RequireAuth roles={["ADMIN", "WRITTER"]}>
              <Home />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
