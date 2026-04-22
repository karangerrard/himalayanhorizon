import React, { useState } from 'react';
import WhatsAppBookingButton from './WhatsAppBookingButton';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { homestayInfo } from '../mock';

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
              <Mail size={28} style={{ color: 'var(--accent-text)' }} />
            </div>
            <div className="body-small" style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              Email
            </div>
            <div className="body-medium" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              {homestayInfo.contact.email}
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
              <form onSubmit={handleSubmit}>
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
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      placeholder="your@email.com"
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
                    <label style={labelStyle}>Number of Guests</label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      style={inputStyle}
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5+ Guests</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Check-in</label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Check-out</label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      style={inputStyle}
                    />
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
                    placeholder="Any special requirements or questions?"
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                  Send Inquiry
                </button>
                <div className="mt-4">
    <WhatsAppBookingButton />
  </div>
</form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;