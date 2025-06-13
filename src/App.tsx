import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './pages/Index';
import { Toaster } from 'sonner';
import { Toaster as Sonner } from "./components/ui/sonner";
import Menu from './pages/Menu';


function App() {

  return (
    <>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
