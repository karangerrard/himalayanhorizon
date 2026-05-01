import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CultureSection from './components/CultureSection';
import RoomsSection from './components/RoomsSection';
import TravelSection from './components/DirectionsSection';
import AttractionsSection from './components/AttractionsSection';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import DirectionsSection from './components/DirectionsSection';

function App() {
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--hero-mobile',
      `url('${import.meta.env.BASE_URL}images/mobile_hero.avif')`
    );
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <RoomsSection />
      <DirectionsSection />
      <AttractionsSection />
      <Gallery />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;