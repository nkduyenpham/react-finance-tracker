import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Sidebar from './components/layout/Sidebar';
import HeaderAfterLogin from './components/layout/HeaderAfterLogin';
import HeaderBeforeLogin from "./components/layout/HeaderBeforeLogin";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Setting from "./pages/Setting";
import Signup from "./pages/Signup"
import Homepage from "./pages/Homepage";
import { ToastContainer, toast } from 'react-toastify';
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
            <Route path="/" element={<AuthLayout><Homepage /></AuthLayout>} />
            <Route path="/signup" element={<AuthLayout><Signup /></AuthLayout>} />
            <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
            <Route path="/income" element={<MainLayout><Income /></MainLayout>} />
            <Route path="/expenses" element={<MainLayout><Expenses /></MainLayout>} />
            <Route path="/setting" element={<MainLayout><Setting /></MainLayout>} />
          </Routes>
      </Router>
    </>

  );
}
export default App;
