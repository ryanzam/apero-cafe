import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './pages/Index';
import { Toaster } from 'sonner';
import { Toaster as Sonner } from "./components/ui/sonner";


function App() {

  return (
    <>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
