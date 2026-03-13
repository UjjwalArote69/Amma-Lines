import { BrowserRouter as Router, Routes, Route } from "react-router"
import LandingPage from "./pages/Landing/LandingPage"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import About from "./pages/About/About"
import Projects from "./pages/Projects/Projects"
import Contact from "./pages/Contact/Contact"
import Services from "./pages/Services/Services"
import ShipCursor from "./components/layout/ShipCursor"
import Preloader from "./components/layout/Preloader"

const App = () => {
  return (
    <>
      <ShipCursor/>
      <Preloader/>

      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/services" element={<Services/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App