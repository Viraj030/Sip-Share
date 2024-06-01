// Footer.js

import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#1d000d', color: '#ffffff' }}>
      <p>&copy; {currentYear} Sip & Share. Crafted with &hearts; for Cocktail Connoisseurs.</p>
    </footer>
  );
};

export default Footer;
