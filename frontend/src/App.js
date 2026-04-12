import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Sales from "./components/Sales";
import ProtectedRoute from "./protectedRoutes";

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        
        {/* Default route */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Sales Page */}
        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <Sales />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
