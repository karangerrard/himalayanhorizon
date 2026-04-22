import React from 'react';

interface Props {
  phone?: string;
  message?: string;
}

const WhatsAppBookingButton: React.FC<Props> = ({ phone = "+919999999999", message = "Hi! I’d like to book a stay at Himalayan Horizon from [date] to [date]." }) => {
  const handle = () => {
    const encoded = encodeURIComponent(message);
    const phoneClean = phone.replace(/\D/g, '');
    const url = `https://wa.me/${phoneClean}?text=${encoded}`;
    window.open(url, '_blank');
  };
  return (
    <button type="button" onClick={handle} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full shadow-md">
      Book via WhatsApp
    </button>
  );
}

export default WhatsAppBookingButton;
