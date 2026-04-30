import React, { useState } from 'react';
import WhatsAppBookingButton from './WhatsAppBookingButton';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { homestayInfo } from '../data';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const getMinCheckoutDate = () => {
      if (!formData.checkIn) return '';
      const checkInDate = new Date(formData.checkIn);
      checkInDate.setDate(checkInDate.getDate() + 1); // Add 1 day
      return checkInDate.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
  const { name, value } = e.target;
  
  if (name === 'checkIn') {
    // If user changes check-in and current checkout is now invalid, reset it
    const newCheckIn = new Date(value);
    newCheckIn.setDate(newCheckIn.getDate() + 1);
    const currentCheckOut = new Date(formData.checkOut);
    
    if (formData.checkOut && newCheckIn > currentCheckOut) {
      setFormData({
        ...formData,
        [name]: value,
        checkOut: '' // Reset checkout if it's now earlier than check-in
      });
      return;
    }
  }
  
  setFormData({
    ...formData,
    [name]: value
  });
};

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '2',
        message: ''
      });
    }, 3000);
  };
  const whatsappNumber = homestayInfo.contact.whatsapp.replace(/\D/g, '');

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };
  
  const handleWhatsAppInquiry = (e) => {
  e.preventDefault();
  
  // Validate required fields
  if (!formData.name || !formData.phone || !formData.checkIn || !formData.checkOut || !formData.guests) {
    alert('Please fill in all required fields');
    return;
  }
  
  // Format the inquiry message
  const message = `Hello! I would like to make an inquiry about your homestay.

    *Guest Details:*
    Name: ${formData.name}
    Phone: ${formData.phone}
    Number of Guests: ${formData.guests}

    *Stay Dates:*
    Check-in: ${formData.checkIn || 'Not specified'}
    Check-out: ${formData.checkOut || 'Not specified'}

    *Special Requirements:*
    ${formData.message || 'No additional requirements'}

     Looking forward to hearing from you!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid var(--border-light)',
    borderRadius: '8px',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '1rem',
    transition: 'border-color 0.2s ease',
    background: 'var(--bg-card)'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--text-primary)'
  };

  return (
    <section
      id="contact"
      style={{
        padding: '4rem 1.5rem',
        background: 'var(--bg-section)'
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
            Contact Us
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Get in touch to plan your perfect mountain getaway
          </p>
        </div>

        {/* Contact Information Cards - Horizontal Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          <div className="product-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--accent-wash)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}
            >
              <Phone size={28} style={{ color: 'var(--accent-text)' }} />
            </div>
            <div className="body-small" style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              Phone
            </div>
            <div className="body-medium" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              {homestayInfo.contact.phone}
            </div>
          </div>

          {/* WhatsApp Card - REPLACES Email Card */}
          <div 
            onClick={handleWhatsAppClick}
            className="product-card" 
            style={{ 
              padding: '2rem', 
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(37, 211, 102, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#25d366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}
            >
              <MessageCircle size={28} style={{ color: 'white' }} />
            </div>
            <div className="body-small" style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              WhatsApp
            </div>
            <div className="body-medium" style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              {homestayInfo.contact.whatsapp}
            </div>
            <div className="body-small" style={{ color: 'var(--accent-text)', fontStyle: 'italic' }}>
              Click to chat on WhatsApp
            </div>
          </div>

          <div className="product-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--accent-wash)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}
            >
              <MapPin size={28} style={{ color: 'var(--accent-text)' }} />
            </div>
            <div className="body-small" style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              Address
            </div>
            <div className="body-medium" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              {homestayInfo.contact.address}
            </div>
          </div>
        </div>

        {/* Contact Form - Full Width */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="product-card" style={{ padding: '3rem' }}>
            <h3 className="heading-3" style={{ marginBottom: '2rem', textAlign: 'center' }}>
              Send Us an Inquiry
            </h3>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'var(--accent-wash)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                  }}
                >
                  <Send size={40} style={{ color: 'var(--accent-text)' }} />
                </div>
                <h3 className="heading-3" style={{ marginBottom: '0.75rem' }}>
                  Thank You!
                </h3>
                <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                  We've received your inquiry and will get back to you soon.
                </p>
              </div>
            ) : (
              <form>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Number of Guests *</label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      placeholder="Select number of guests"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5+ Guests</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Check-in *</label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                    <div className ="date-helper">
                      Click the arrow to select date
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Check-out *</label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      min={getMinCheckoutDate()}                     
                    />
                    <div className ="date-helper">
                      Click the arrow to select date
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    style={{ ...inputStyle, resize: 'vertical' }}
                    placeholder="(Optional) Any special requirements or questions?"
                  />
                </div>

                <button 
                  onClick={handleWhatsAppInquiry}
                  className="btn-primary" 
                  style={{ width: '100%' }}
                >
                  Send Inquiry on WhatsApp
              </button>
</form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;