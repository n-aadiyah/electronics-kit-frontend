import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import { HashRouter } from 'react-router-dom'; // ✅ Import HashRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <HashRouter> {/* ✅ Wrap App in HashRouter */}
        <App />
      </HashRouter>
    </CartProvider>
  </React.StrictMode>
);
