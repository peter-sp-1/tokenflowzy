import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import "./App.css";
import Generator from "./components/Generator";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WalletContextProvider from "./solactions/WalletConnect";

function App() {
  return (
    <WalletContextProvider>
      <Router>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
            style: {
              background: '#1a1a1a',
              color: '#fff',
            },
          }}
        />
        <div className="min-h-screen bg-[#000000]">
          <Header />
          <Routes>
            <Route path="/" element={<Generator />} />
            <Route path="/waitlist" element={<Waitlist />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </WalletContextProvider>
  );
}

export default App;
