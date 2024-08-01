import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Sidebar from './components/layout/Sidebar';
import HeaderAfterLogin from './components/layout/HeaderAfterLogin';
import HeaderBeforeLogin from "./components/layout/HeaderBeforeLogin";
import Dashboard from "./pages/Dashboard";
import Setting from "./pages/Setting";
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MainLayout({children}) {
  return (
    <div className="App">
    <div className='md:w-64 hidden md:block fixed'>
      <Sidebar />
    </div>
    <div className="md:ml-64">
      <HeaderAfterLogin />
      {children}
    </div>
  </div>
  )
}

// Auth layout with HeaderBeforeLogin
function AuthLayout({ children }) {
  return (
    <div className="App">
      <HeaderBeforeLogin />
      {children}
    </div>
  );
}

function App() {
  return (
    <>
    <ToastContainer />
      <Router>
          <Routes>
            <Route path="/" element={<AuthLayout><Signup /></AuthLayout>} />
            <Route path="/signin" element={<AuthLayout><Signin /></AuthLayout>} />
            <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
\            <Route path="/setting" element={<MainLayout><Setting /></MainLayout>} />
            {/* Optional: Redirect unknown routes to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
      </Router>
    </>

  );
}
export default App;
