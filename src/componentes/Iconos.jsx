/* Iconos en línea, trazo de 1.7. Se dibujan con currentColor para que
   hereden el color del contexto. */
const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
const S = ({ children, ...r }) => (
  <svg viewBox="0 0 24 24" {...P} {...r}>{children}</svg>
);

export const IcCalendario = (p) => <S {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></S>;
export const IcEdificio = (p) => <S {...p}><path d="M4 21V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v15M15 21V10h3a2 2 0 0 1 2 2v9M4 21h17" /><path d="M8 8h3M8 12h3M8 16h3" /></S>;
export const IcLibro = (p) => <S {...p}><path d="M4 5a2 2 0 0 1 2-2h11v18H6a2 2 0 0 1-2-2z" /><path d="M17 3h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-1M8 8h5M8 12h5" /></S>;
export const IcUsuarios = (p) => <S {...p}><circle cx="9" cy="8" r="3.4" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M17 11a3 3 0 1 0-1.8-5.4M18 20a5.6 5.6 0 0 0-2.2-4.5" /></S>;
export const IcUsuario = (p) => <S {...p}><circle cx="12" cy="8" r="3.6" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0" /></S>;
export const IcCarnet = (p) => <S {...p}><rect x="2.5" y="5" width="19" height="14" rx="2" /><circle cx="8.5" cy="11" r="2.2" /><path d="M5 16.5c.6-1.6 2-2.3 3.5-2.3s2.9.7 3.5 2.3M15 10h4M15 13.5h3" /></S>;
export const IcReloj = (p) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5.2l3.2 2" /></S>;
export const IcNota = (p) => <S {...p}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8.5 13.5l2 2 4-4.5" /></S>;
export const IcCheck = (p) => <S {...p}><path d="M4.5 12.5 9.5 17.5 19.5 6.5" /></S>;
export const IcLista = (p) => <S {...p}><path d="M8 6h12M8 12h12M8 18h12M3.5 6h.01M3.5 12h.01M3.5 18h.01" /></S>;
export const IcEscudoOk = (p) => <S {...p}><path d="M12 3 20 6v6c0 4.6-3.3 7.9-8 9-4.7-1.1-8-4.4-8-9V6z" /><path d="M9 12.2l2.2 2.2L15.4 10" /></S>;
export const IcFamilia = (p) => <S {...p}><circle cx="7.5" cy="7" r="2.8" /><circle cx="16.5" cy="7" r="2.8" /><path d="M2.5 19a5 5 0 0 1 10 0M11.5 19a5 5 0 0 1 10 0" /></S>;
export const IcMoneda = (p) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M14.8 9.2a3.2 3.2 0 0 0-5.3 1.3c-.5 1.8.8 2.5 2.5 2.9s3 .9 2.6 2.6A3.2 3.2 0 0 1 9.2 17M12 6v2M12 16.2V18.4" /></S>;
export const IcCaja = (p) => <S {...p}><path d="m12 3 8.5 4.4v9.2L12 21l-8.5-4.4V7.4z" /><path d="M3.5 7.4 12 12l8.5-4.6M12 12v9" /></S>;
export const IcTablero = (p) => <S {...p}><rect x="3" y="3" width="7.5" height="8.5" rx="1.6" /><rect x="13.5" y="3" width="7.5" height="5.5" rx="1.6" /><rect x="13.5" y="11" width="7.5" height="10" rx="1.6" /><rect x="3" y="14" width="7.5" height="7" rx="1.6" /></S>;
export const IcGrafico = (p) => <S {...p}><path d="M4 20V4M4 20h16" /><path d="M8 20v-6M12.5 20V8M17 20v-9" /></S>;
export const IcDescarga = (p) => <S {...p}><path d="M12 3.5v11M7.8 10.5 12 14.7l4.2-4.2M4.5 17v2a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2" /></S>;
export const IcBuscar = (p) => <S {...p}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></S>;
export const IcCampana = (p) => <S {...p}><path d="M18 9a6 6 0 1 0-12 0c0 5-2 6.5-2 6.5h16S18 14 18 9zM13.8 19a2 2 0 0 1-3.6 0" /></S>;
export const IcEngrane = (p) => <S {...p}><circle cx="12" cy="12" r="3.1" /><path d="M19.6 14.6a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1v.2a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.8-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7h-.2a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3h.1A1.6 1.6 0 0 0 10 3.3v-.2a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8v.1a1.6 1.6 0 0 0 1.5 1h.2a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" /></S>;
export const IcDer = (p) => <S {...p}><path d="m9 5 7 7-7 7" /></S>;
export const IcIzq = (p) => <S {...p}><path d="m15 5-7 7 7 7" /></S>;
export const IcAbajo = (p) => <S {...p}><path d="m6 9.5 6 6 6-6" /></S>;
export const IcCerrar = (p) => <S {...p}><path d="m6 6 12 12M18 6 6 18" /></S>;
export const IcMas = (p) => <S {...p}><path d="M12 5v14M5 12h14" /></S>;
export const IcLapiz = (p) => <S {...p}><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7.5 18.5l-4 1 1-4z" /></S>;
export const IcOjo = (p) => <S {...p}><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" /><circle cx="12" cy="12" r="2.6" /></S>;
export const IcAlerta = (p) => <S {...p}><path d="M12 3.5 22 20H2z" /><path d="M12 9.5v4.2M12 17h.01" /></S>;
export const IcInfo = (p) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></S>;
export const IcCandado = (p) => <S {...p}><rect x="4.5" y="10" width="15" height="11" rx="2" /><path d="M8 10V7.5a4 4 0 0 1 8 0V10" /></S>;
export const IcSalir = (p) => <S {...p}><path d="M14.5 4.5h3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-3M10 16l4-4-4-4M14 12H4" /></S>;
export const IcCasa = (p) => <S {...p}><path d="m3.5 10.5 8.5-7 8.5 7V19a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" /><path d="M9.5 21v-7h5v7" /></S>;
export const IcEstrella = ({ llena, ...p }) => (
  <svg viewBox="0 0 24 24" fill={llena ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" {...p}>
    <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9z" />
  </svg>
);
export const IcMedalla = (p) => <S {...p}><circle cx="12" cy="9" r="5.5" /><path d="M8.5 13.8 7 21l5-2.6L17 21l-1.5-7.2" /></S>;
export const IcCohete = (p) => <S {...p}><path d="M12 3c3.5 2 5.5 5.5 5.5 9.5L19 18l-3.5-1.5h-7L5 18l1.5-5.5C6.5 8.5 8.5 5 12 3z" /><circle cx="12" cy="10" r="1.8" /><path d="M9.5 19.5c0 1.2 1 2.5 2.5 2.5s2.5-1.3 2.5-2.5" /></S>;
export const IcTraslado = (p) => <S {...p}><path d="M3 8h13l-3-3M21 16H8l3 3" /></S>;
export const IcPortapapeles = (p) => <S {...p}><rect x="5" y="4.5" width="14" height="16.5" rx="2" /><path d="M9 4.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 4.5v1H9z" /><path d="M9 11h6M9 15h4" /></S>;
export const IcImprimir = (p) => <S {...p}><path d="M7 9V3.5h10V9M7 18H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" /><rect x="7" y="14.5" width="10" height="6" rx="1" /></S>;
export const IcFiltro = (p) => <S {...p}><path d="M3.5 5.5h17l-6.5 7.5v6l-4 2v-8z" /></S>;

export const EscudoSVG = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 64 72" aria-label="Escudo institucional" className="escudo">
    <defs>
      <linearGradient id="esc-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#D7E3F1" />
      </linearGradient>
    </defs>
    <path d="M32 1 61 10v27c0 17-12.5 27.5-29 34C15.5 64.5 3 54 3 37V10z" fill="url(#esc-g)" stroke="#FFCC2A" strokeWidth="2.4" />
    <path d="M32 7 56 14v23c0 14-10.5 22.8-24 28.3C18.5 59.8 8 51 8 37V14z" fill="#1D3E69" />
    <path d="M20 42V26l12-7 12 7v16" stroke="#FFCC2A" strokeWidth="2.6" fill="none" strokeLinejoin="round" />
    <path d="M26 42V32h12v10" stroke="#FFFFFF" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
    <circle cx="32" cy="23.5" r="2.6" fill="#FFCC2A" />
  </svg>
);
