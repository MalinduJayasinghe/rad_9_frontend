import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../service/auth"

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [coPassword, setCOPassword] = useState("")

  const handleRegister = async () => {
    if (!name || !email || !password || !coPassword) {
      return alert("Please fill all fields..!")
    }
    if (password !== coPassword) {
      return alert("Password not matched..!")
    }
    try {
      await register(name, email, password)
      navigate("/login")
    } catch (err) {
      console.error(err)
      alert("Registartion fail..!")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col gap-4 w-80">
        <h1>Register</h1>
        <input
          placeholder="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          placeholder="co-password"
          type="password"
          value={coPassword}
          onChange={(e) => setCOPassword(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          onClick={handleRegister}
        >
          Register
        </button>
        <p className="mt-4 text-gray-700 text-center">
          <span>Alrady have an account? </span>
          <button
            className="text-blue-600 font-semibold hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  )
}

export default Register
