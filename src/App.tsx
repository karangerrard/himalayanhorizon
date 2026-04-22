import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CultureSection from './components/CultureSection';
import RoomsSection from './components/RoomsSection';
import TravelSection from './components/TravelSection';
import AttractionsSection from './components/AttractionsSection';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <CultureSection />
      <RoomsSection />
      <TravelSection />
      <AttractionsSection />
      <Gallery />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;