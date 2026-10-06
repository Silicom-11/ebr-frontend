import { Link } from 'react-router-dom';
import { EscudoSVG, IcBuscar, IcIzq, IcDer } from '../componentes/Iconos.jsx';
import { ESTUDIANTES, SALONES, DOCENTES } from '../datos/institucion.js';

export default function Buscar() {
  const al = ESTUDIANTES.slice(0, 6);
  return (
    <div style={{ padding: '26px 30px 60px', maxWidth: 940, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <EscudoSVG size={38} />
        <h1 style={{ fontSize: 21, fontWeight: 700 }}>Búsqueda</h1>
        <Link to="/direccion/tablero" className="btn btn-2" style={{ marginLeft: 'auto' }}><IcIzq />Volver</Link>
      </div>

      <div className="buscador" style={{ width: '100%', padding: '13px 18px', fontSize: 15, marginBottom: 22 }}>
        <IcBuscar style={{ width: 18, height: 18 }} />Estudiante, curso, salón o docente
      </div>

      {[['Estudiantes', al.map((a) => [a.completo, `${a.nivel} · ${a.salon}`, `/direccion/matricula/MT-2026-0${63 + (ESTUDIANTES.indexOf(a) % 12)}`])],
        ['Salones', SALONES.slice(0, 5).map((s) => [s.nom, `${s.niv} · ciclo ${s.ciclo} · ${s.alu} estudiantes`, `/direccion/institucion/salones/${s.cod}`])],
        ['Docentes', DOCENTES.slice(0, 4).map((d) => [d.nom, d.esp, `/direccion/usuarios/${d.id}`])]].map(([t, filas]) => (
          <div key={t} className="mapa-g" style={{ marginBottom: 16 }}>
            <h3>{t}<em>{filas.length} resultados</em></h3>
            <ul>
              {filas.map(([n, s, r]) => (
                <li key={n}>
                  <Link to={r}>
                    <span style={{ fontWeight: 600, color: 'var(--txt)' }}>{n}</span>
                    <span>{s}</span>
                    <span className="ir"><IcDer /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
      ))}
    </div>
  );
}
