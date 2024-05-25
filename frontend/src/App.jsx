import { NextUIProvider } from '@nextui-org/react'
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Stats from './pages/Stats'
import AdminPanel from './pages/AdminPanel'
import { useUserStore } from './stores/user'
import Header from './components/Header'

function App() {
  const navigate = useNavigate()
  const { user } = useUserStore()

  if (!user){
    return (
      <NextUIProvider navigate={navigate}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </NextUIProvider>
    )
  }

  if (user.admin) {
    return (
      <NextUIProvider navigate={navigate}>
        <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<AdminPanel />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </div>
      </NextUIProvider>
    )
  }

  return (
    <NextUIProvider navigate={navigate}>
      <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </div>
    </NextUIProvider>
  )
}

export default App
