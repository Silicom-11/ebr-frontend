/* Armazón de las vistas administrativas: barra lateral por módulos,
   barra superior con migas y selector de rol. El selector de rol es un
   enlace a otra ruta, no un desplegable con estado. */
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { MENUS, rolDe } from '../datos/navegacion.js';
import { IE } from '../datos/institucion.js';
import {
  EscudoSVG, IcBuscar, IcCampana, IcAbajo, IcCasa, IcSalir, IcInfo,
} from './Iconos.jsx';

function Migas({ menu, ruta }) {
  let mod = null; let item = null;
  menu.forEach((m) => m.items.forEach((i) => {
    if (ruta === i.ruta || (!i.exacto && ruta.startsWith(i.ruta + '/'))) { mod = m; item = i; }
  }));
  return (
    <div className="miga">
      <Link to="/">Inicio</Link>
      <span className="sep">/</span>
      {mod && <>
        <span>{mod.nom}</span>
        <span className="sep">/</span>
      </>}
      <b>{item ? item.nom : 'Panel'}</b>
    </div>
  );
}

export default function Armazon({ rol }) {
  const loc = useLocation();
  const menu = MENUS[rol];
  const r = rolDe(rol);
  const otro = rol === 'direccion' ? 'docente' : 'direccion';

  return (
    <div className="app">
      <aside className="lateral">
        <Link to="/" className="lat-marca">
          <EscudoSVG size={36} />
          <span>
            <b>SIGAC</b>
            <span>{IE.nombre} · {IE.anio}</span>
          </span>
        </Link>

        <div className="lat-rol">
          <div className="et">Sesión activa</div>
          <div className="quien">
            <span className="av">{r.ini}</span>
            <span style={{ minWidth: 0 }}>
              <b>{r.nom}</b>
              <span>{r.persona}</span>
            </span>
          </div>
        </div>

        <nav className="lat-nav">
          {menu.map((m) => (
            <div key={m.cod + m.nom}>
              <div className="lat-mod">{m.cod ? `${m.cod} · ${m.nom}` : m.nom}</div>
              {m.items.map((i) => (
                <NavLink key={i.ruta} to={i.ruta} end={i.exacto}
                  className={({ isActive }) => (isActive ? 'on' : '')}>
                  <m.icono />{i.nom}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="lat-pie">
          Prototipo de alta fidelidad · <Link to="/mapa">ver mapa de rutas</Link>
        </div>
      </aside>

      <div className="principal">
        <header className="barra">
          <div className="barra-in">
          <Migas menu={menu} ruta={loc.pathname} />
          <div className="der no-imp">
            <Link to="/buscar" className="buscador">
              <IcBuscar />Buscar estudiante, curso o salón<kbd>Ctrl K</kbd>
            </Link>
            <Link to={`/${rol}/avisos`} className="icono-btn" aria-label="Avisos">
              <IcCampana /><i className="punto" />
            </Link>
            <Link to="/permisos" className="icono-btn" aria-label="Permisos del rol"><IcInfo /></Link>
            <Link to={`/${otro}`} className="sel-rol">
              <span className="et">Ver como</span>{r.nom}<IcAbajo />
            </Link>
            <Link to="/" className="icono-btn" aria-label="Cambiar de rol"><IcSalir /></Link>
          </div>
          </div>
        </header>

        <main className="lienzo">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* Armazón de los portales de estudiante: sin barra lateral, pestañas
   grandes y tipografía redondeada. */
export function ArmazonNino({ nivel, alumno, menu, saludo }) {
  return (
    <div className={`nino${nivel === 'inicial' ? ' n-ini' : ''}`}>
      <header className="n-barra">
        <div className="n-barra-in">
          <EscudoSVG size={38} />
          <div className="marca">
            <b>SIGAC</b>
            <span>{IE.nombre}</span>
          </div>
          <div className="der">
            <div className="quien">
              <span className="n-cara">{saludo}</span>
              <span>
                <b>{alumno.nom.split(' ')[0]}</b>
                <span>{alumno.grado} · {alumno.nivel}</span>
              </span>
            </div>
            <Link to="/" className="salir">Salir</Link>
          </div>
        </div>
      </header>
      <nav className="n-menu">
        {menu.map((m) => (
          <NavLink key={m.a} to={m.a} end={m.exacto}
            className={({ isActive }) => (isActive ? 'on' : '')}>
            {m.ico && <m.ico />}{m.t}
          </NavLink>
        ))}
      </nav>
      <main className="n-lienzo">
        <Outlet />
      </main>
    </div>
  );
}
