import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from './App.jsx';

import './styles/app.css';
import './styles/matricula.css';
import './styles/ninos.css';
import './styles/ajustes.css';

/* Al cambiar de ruta la vista vuelve arriba: si no, al entrar a una
   pantalla desde el pie de otra se queda a media página. */
function AlInicio() {
  const { pathname } = useLocation();
  React.useLayoutEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AlInicio />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
