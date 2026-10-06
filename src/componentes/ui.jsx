/* ===========================================================================
   Piezas de interfaz. Regla del proyecto: nada guarda estado interno.
   Pestañas, filtros, selectores y modales son enlaces que cambian la URL,
   porque el prototipo se importa a Figma con html.to.design y esa
   herramienta solo puede traer lo que una URL devuelve.
   =========================================================================== */
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import {
  IcAbajo, IcCerrar, IcInfo, IcAlerta, IcCheck, IcLista, IcDer,
} from './Iconos.jsx';

/* --------------------------------------------------------------- cabecera */
export function Cabecera({ titulo, desc, children }) {
  return (
    <div className="cabecera">
      <div style={{ minWidth: 0 }}>
        <h1>{titulo}</h1>
        {desc && <p>{desc}</p>}
      </div>
      {children && <div className="acc no-imp">{children}</div>}
    </div>
  );
}

/* --------------------------------------------------------------- tarjeta */
export function Tarjeta({ titulo, sub, acciones, pie, pegado, children, ...r }) {
  return (
    <section className="tarjeta" {...r}>
      {(titulo || acciones) && (
        <div className="cab">
          {titulo && (
            <div style={{ minWidth: 0 }}>
              <h2>{titulo}</h2>
              {sub && <div className="sub">{sub}</div>}
            </div>
          )}
          {acciones && <div className="acc no-imp">{acciones}</div>}
        </div>
      )}
      <div className={pegado ? 'cpo pegado' : 'cpo'}>{children}</div>
      {pie && <div className="pie">{pie}</div>}
    </section>
  );
}

/* --------------------------------------------------------------- métrica */
export function Metrica({ et, val, unidad, nota, pct, tono = '', a, icono: Ico, acento }) {
  const cuerpo = (
    <>
      <div className="et">{Ico && <Ico />}{et}</div>
      <div className="val">{val}{unidad && <small>{unidad}</small>}</div>
      {nota && <div className="nota">{nota}</div>}
      {pct !== undefined && (
        <div className="barrita"><i style={{ width: `${Math.min(100, pct)}%`, background: tono || undefined }} /></div>
      )}
    </>
  );
  const cls = `metrica${acento ? ' acento' : ''}`;
  return a ? <Link to={a} className={cls}>{cuerpo}</Link> : <div className={cls}>{cuerpo}</div>;
}

/* --------------------------------------------------------------- píldoras */
export const Pil = ({ t, hijo, sin }) => (
  <span className={`pil pil-${t}${sin ? ' sin' : ''}`}>{hijo}</span>
);

export function PilEstado({ v }) {
  const m = {
    'Matriculado': 'ok', 'Activo': 'ok', 'Aprobada': 'ok', 'Operativo': 'ok', 'Vigente': 'ok',
    'En curso': 'info', 'Pendiente': 'alerta', 'En reparación': 'alerta', 'Parcial': 'alerta',
    'Retirado': 'riesgo', 'Rechazada': 'riesgo', 'Baja': 'riesgo', 'Vencido': 'riesgo',
    'Cerrado': 'neutro', 'No aplica': 'neutro', 'Trasladado': 'neutro',
  };
  return <Pil t={m[v] || 'neutro'} hijo={v} />;
}

export const Lit = ({ v }) => (
  <span className={`lit lit-${['AD', 'A', 'B', 'C'].includes(v) ? v : 'x'}`}>{v}</span>
);

/* --------------------------------------------------------------- avisos */
export function Aviso({ t = 'info', titulo, children }) {
  const Ico = t === 'riesgo' || t === 'alerta' ? IcAlerta : t === 'ok' ? IcCheck : IcInfo;
  return (
    <div className={`aviso aviso-${t}`}>
      <Ico />
      <div>{titulo && <b>{titulo} </b>}{children}</div>
    </div>
  );
}

/* --------------------------------------------------------------- vacío */
export const Vacio = ({ titulo, children }) => (
  <div className="vacio"><IcLista /><b>{titulo}</b>{children}</div>
);

/* --------------------------------------------------------------- persona */
export function Persona({ nom, sub, oro, a }) {
  const ini = nom.replace(/,/g, '').split(' ').filter((w) => /^[A-ZÁÉÍÓÚÑ]/.test(w)).slice(0, 2)
    .map((w) => w[0]).join('') || nom.slice(0, 2).toUpperCase();
  const c = (
    <span className="persona">
      <span className={`av-ini${oro ? ' oro' : ''}`}>{ini}</span>
      <span style={{ minWidth: 0 }}><b>{nom}</b>{sub && <span>{sub}</span>}</span>
    </span>
  );
  return a ? <Link to={a} style={{ display: 'block' }}>{c}</Link> : c;
}

/* --------------------------------------------------------------- progreso */
export const BarraProg = ({ pct, tono }) => (
  <div className={`barra-prog ${tono || ''}`}><i style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} /></div>
);

/* --------------------------------------------------------------- tabla */
export function Tabla({ cols, filas, pie, vacio = 'Sin registros.' }) {
  if (!filas.length) return <Vacio titulo={vacio} />;
  return (
    <div className="tabla-env">
      <table className="tabla">
        <thead>
          <tr>{cols.map((c, i) => (
            <th key={i} style={{ textAlign: c.al || 'left', width: c.w }}>{c.t}</th>
          ))}</tr>
        </thead>
        <tbody>
          {filas.map((f, i) => (
            <tr key={i} className={f.__sel ? 'sel' : ''}>
              {cols.map((c, j) => (
                <td key={j} className={c.al === 'center' ? 'c' : c.al === 'right' ? 'd' : ''}>
                  {c.r(f, i)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {pie && <tfoot><tr>{pie.map((p, i) => <td key={i} className={i ? 'c' : ''}>{p}</td>)}</tr></tfoot>}
      </table>
    </div>
  );
}

/* --------------------------------------------------------------- pestañas */
export function Fichas({ items }) {
  return (
    <nav className="fichas no-imp">
      {items.map((i) => (
        <NavLink key={i.a} to={i.a} end={i.exacto}
          className={({ isActive }) => (isActive ? 'on' : '')}>{i.t}</NavLink>
      ))}
    </nav>
  );
}

export function Segmento({ param, opciones, porDefecto }) {
  const [sp] = useSearchParams();
  const act = sp.get(param) || porDefecto;
  return (
    <div className="segmento no-imp">
      {opciones.map((o) => {
        const n = new URLSearchParams(sp);
        n.set(param, o.v);
        return (
          <Link key={o.v} to={`?${n}`} className={act === o.v ? 'on' : ''}>{o.t}</Link>
        );
      })}
    </div>
  );
}

/* --------------------------------------------------------------- filtros
   Cada filtro es un enlace: al elegir una opción cambia la URL, que es
   justamente lo que html.to.design necesita para traerse la pantalla.   */
export function Filtro({ et, param, opciones, porDefecto, ancho }) {
  const [sp] = useSearchParams();
  const loc = useLocation();
  const act = sp.get(param) || porDefecto;
  const sel = opciones.find((o) => o.v === act) || opciones[0];
  const idx = opciones.indexOf(sel);
  const sig = opciones[(idx + 1) % opciones.length];
  const n = new URLSearchParams(sp);
  n.set(param, sig.v);
  return (
    <label className="campo">
      <span>{et}</span>
      <Link to={`${loc.pathname}?${n}`} className="falso-sel" style={{ minWidth: ancho }}>
        {sel.t}<IcAbajo />
      </Link>
    </label>
  );
}

export const Filtros = ({ children, acciones }) => (
  <div className="filtros no-imp">
    {children}
    {acciones && <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'flex-end' }}>{acciones}</div>}
  </div>
);

/* --------------------------------------------------------------- modal
   El modal es una ruta. Se cierra navegando a `volver`, nunca con estado. */
export function Modal({ titulo, sub, volver, ancho, estrecho, pie, children }) {
  return (
    <div className="velo">
      <div className={`modal${ancho ? ' ancho' : ''}${estrecho ? ' estrecho' : ''}`} role="dialog" aria-modal="true">
        <div className="cab">
          <div>
            <h3>{titulo}</h3>
            {sub && <p>{sub}</p>}
          </div>
          <Link to={volver} className="icono-btn x" aria-label="Cerrar"><IcCerrar /></Link>
        </div>
        <div className="cpo">{children}</div>
        {pie && <div className="pie">{pie}</div>}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- formulario
   Maqueta: los controles son estáticos porque el prototipo no persiste. */
export const Campo = ({ et, v, ph, ancho, ayuda, alto, full }) => (
  <div className={`g${full ? ' full' : ''}`} style={{ gridColumn: ancho }}>
    <label>{et}</label>
    <div className={`ctrl${v ? '' : ' ph'}${alto ? ' alto' : ''}`}>{v || ph}</div>
    {ayuda && <div className="ayuda">{ayuda}</div>}
  </div>
);

export const Selector = ({ et, v, ayuda, full }) => (
  <div className={`g${full ? ' full' : ''}`}>
    <label>{et}</label>
    <div className="ctrl">{v}<IcAbajo /></div>
    {ayuda && <div className="ayuda">{ayuda}</div>}
  </div>
);

export const Check = ({ si, children }) => (
  <div className="check"><i className={si ? 'si' : ''}>{si && <IcCheck />}</i>{children}</div>
);

/* --------------------------------------------------------------- gráficos
   SVG a mano: sin dependencias y con la paleta institucional. */
export function Barras({ datos, alto = 150, max, color = '#3568AB', etiqueta }) {
  const m = max || Math.max(...datos.map((d) => d.v), 1);
  const an = 100 / datos.length;
  return (
    <div>
      <svg viewBox={`0 0 100 ${alto}`} preserveAspectRatio="none" style={{ width: '100%', height: alto }}>
        {[0.25, 0.5, 0.75, 1].map((g) => (
          <line key={g} x1="0" x2="100" y1={alto - alto * g * 0.82} y2={alto - alto * g * 0.82}
            stroke="#E3ECF6" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        ))}
        {datos.map((d, i) => {
          const h = (d.v / m) * alto * 0.82;
          return (
            <rect key={i} x={i * an + an * 0.2} y={alto - h} width={an * 0.6} height={Math.max(h, 1)}
              rx="1.2" fill={d.c || color} />
          );
        })}
      </svg>
      <div style={{ display: 'flex', marginTop: 6 }}>
        {datos.map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 10.5, color: '#7A8BA1', fontWeight: 600 }}>
            {d.t}
          </div>
        ))}
      </div>
      {etiqueta && <div className="nota-pie">{etiqueta}</div>}
    </div>
  );
}

export function Anillo({ pct, tam = 92, grosor = 10, color = '#1D3E69', centro, sub }) {
  const r = (tam - grosor) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: tam, height: tam, flex: '0 0 auto' }}>
      <svg width={tam} height={tam} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={tam / 2} cy={tam / 2} r={r} fill="none" stroke="#E3ECF6" strokeWidth={grosor} />
        <circle cx={tam / 2} cy={tam / 2} r={r} fill="none" stroke={color} strokeWidth={grosor}
          strokeDasharray={`${(c * pct) / 100} ${c}`} strokeLinecap="round" />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
        textAlign: 'center', lineHeight: 1.15,
      }}>
        <div>
          <div style={{ fontSize: tam / 4.2, fontWeight: 800, letterSpacing: '-.5px' }}>{centro ?? `${pct}%`}</div>
          {sub && <div style={{ fontSize: 9.5, color: '#7A8BA1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.4px' }}>{sub}</div>}
        </div>
      </div>
    </div>
  );
}

export function BarrasApiladas({ series, leyenda }) {
  const tot = series.reduce((a, s) => a + s.v, 0) || 1;
  return (
    <div>
      <div style={{ display: 'flex', height: 26, borderRadius: 7, overflow: 'hidden', border: '1px solid #DFE7F0' }}>
        {series.map((s, i) => (
          <div key={i} title={`${s.t}: ${s.v}`} style={{
            width: `${(s.v / tot) * 100}%`, background: s.c,
            display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700,
            color: s.oscuro ? '#16283F' : '#fff',
          }}>{s.v > 0 && s.v}</div>
        ))}
      </div>
      {leyenda !== false && (
        <div className="leyenda" style={{ marginTop: 9 }}>
          {series.map((s, i) => <span key={i}><i style={{ background: s.c }} />{s.t}</span>)}
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- enlaces */
export const Accion = ({ a, t, ico: Ico, estilo = 'btn-2', peq }) => (
  <Link to={a} className={`btn ${estilo}${peq ? ' btn-s' : ''}`}>{Ico && <Ico />}{t}</Link>
);

export const VerMas = ({ a, t = 'Ver todo' }) => (
  <Link to={a} className="btn btn-3 btn-s">{t}<IcDer /></Link>
);
