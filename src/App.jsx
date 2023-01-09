import { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import Alert from './components/Alert';
import Home from './components/Home';
import AuthContext, { AuthProvider } from './context/AuthContext';
import Project from './pages/Project';
import Projects from './pages/Projects';

function PrivateRoute({ children, ..._ }) {
  const {
    user,
    loading,
    badge,
    message,
    type,
    title,
    setBadge,
    setTitle,
    setMessage,
    setType,
  } = useContext(AuthContext);

  return (
    <>
      {badge && (
        <Alert
          type={type}
          title={title}
          message={message}
          close={() => {
            setBadge(false);
          }}
        />
      )}
      {!user ? <Navigate to="/signin" /> : loading ? null : children}
    </>
  );
}

function App() {
  useEffect(() => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route
          exact
          path="/project/:slug"
          element={
            <PrivateRoute>
              <Project />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route path="/signin" element={<div>Sign In</div>} />
        <Route path="/signup" element={<div>Sign up</div>} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
