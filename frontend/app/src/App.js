import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Full from "./pages/Full";
import Normal from "./pages/Normal";
import Short from "./pages/Short";
import Login from "./pages/authentication/Login";
import Home from "./pages/Home";
import AuthGuard from "./security/AuthGuard";
import RoleGuard from "./security/RoleGuard";
import Admin from "./pages/admin/Admin";
import Asso from "./pages/asso/Asso";
import Recherche from "./pages/Search";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/full" element={<Full />} />
        <Route path="/normal" element={<Normal />} />
        <Route path="/short" element={<Short />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recherche" element={<Recherche />} />
        <Route path="/" 
          element={
            <AuthGuard>
              <Home/>
            </AuthGuard>
          }
        />
        <Route path="/admin" 
          element={
            <RoleGuard allowedRoles={["ROLE_ADMIN"]}>
              <Admin/>
            </RoleGuard>
          }
        />
        <Route path="/asso" 
          element={
            <RoleGuard allowedRoles={["ROLE_ADMIN", "ROLE_ASSO"]}>
              <Asso/>
            </RoleGuard>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
