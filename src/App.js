import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRouter from "./config/ProtectedRouter";
import BeforeLoginRoute from "./config/BeforeLoginRoute";
import Dashboard from "./pages/Dashboard";
import Demo from "./pages/Demo";
import Social from "./pages/Social";
import ImagePointer from "./pages/ImagePointer";
import Code from "./pages/Code";
import Images from "./pages/Images";

function App() {
  return (
    <div>
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <BeforeLoginRoute>
                <SignUp />
              </BeforeLoginRoute>
            }
          />
          <Route
            path="/login"
            element={
              <BeforeLoginRoute>
                <Login />
              </BeforeLoginRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRouter>
                <Dashboard />
              </ProtectedRouter>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRouter>
                <Messages />
              </ProtectedRouter>
            }
          />
          <Route path="/demo" element={<Demo />} />
          <Route path="/social" element={<Social />} />
          <Route path="/image-pointer" element={<ImagePointer />} />
          <Route path="/code" element={<Code />} />
          <Route path="/images" element={<Images />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
