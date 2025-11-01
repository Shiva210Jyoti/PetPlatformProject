import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Services from "./Components/Services/Services";
import Contact from "./Components/Contact/Contact";
import Pets from "./Components/Pets/Pets";
import AdoptForm from "./Components/AdoptForm/AdoptForm";
import AdminLogin from "./Components/AdminPanel/AdminLogin";
import "./App.css";
import InfoPage from './Components/Info/InfoPage';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Layout = ({ children }) => (
  <>
    <Navbar title="Pet's Paradise" />
    {children}
    <Footer title="Pet's Paradise" />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout>
              <Home description="Adopting a pet is more than just bringing home a furry companion — it’s a lifelong commitment to love, care, and protect. Before you make this meaningful decision, take the time to understand their needs, prepare your home, and ensure you’re ready to offer the time, attention, and compassion every animal deserves. A pet’s trust is a precious gift — make sure you’re ready to receive it." />
            </Layout>
          } 
        />
         <Route path="/InfoPage" element={<InfoPage />} />
        <Route 
          path="/services" 
          element={
            <Layout>
              <Services />
            </Layout>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <Layout>
              <Contact />
            </Layout>
          } 
        />
        <Route 
          path="/info" 
          element={
            <Layout>
              <InfoPage />
            </Layout>
          } 
        />
        <Route 
          path="/pets" 
          element={
            <Layout>
              <Pets />
            </Layout>
          } 
        />
        <Route 
          path="/adopt-form" 
          element={
            <Layout>
              <AdoptForm />
            </Layout>
          } 
        />
        <Route 
          path="/admin" 
          element={
          <Layout>
            <AdminLogin />
          </Layout>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
