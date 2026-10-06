/* Pantalla de entrada. A propósito NO hay validación de usuario ni
   contraseña: si el acceso estuviera cerrado, html.to.design no podría
   alcanzar las rutas de los demás roles. El formulario se muestra como
   maqueta, y los cuatro portales se abren con un enlace directo. */
import { Link } from 'react-router-dom';
import { EscudoSVG, IcDer, IcEngrane, IcPortapapeles, IcLibro, IcEstrella, IcInfo, IcLista } from '../componentes/Iconos.jsx';
import { IE } from '../datos/institucion.js';

const PORTALES = [
  {
    cod: 'direccion', ruta: '/direccion/tablero', nom: 'Dirección',
    persona: 'Miguel Ángel Aquino Q.', ini: 'MA', ico: IcEngrane,
    desc: 'Los 13 módulos del sistema: calendarización, cursos, matrícula, evaluación, finanzas y tablero.',
    cuenta: '36 pantallas', tono: '#1D3E69', suave: '#E3ECF6',
  },
  {
    cod: 'docente', ruta: '/docente', nom: 'Docente',
    persona: 'Marleny Mendoza Gamonal', ini: 'MM', ico: IcPortapapeles,
    desc: 'Solo sus salones y sus cursos: planificación, evaluación por competencias, asistencia y conducta.',
    cuenta: '13 pantallas', tono: '#12805C', suave: '#E2F6EE',
  },
  {
    cod: 'primaria', ruta: '/primaria', nom: 'Estudiante de Primaria',
    persona: '3.º de Primaria · 8 años', ini: '3P', ico: IcLibro,
    desc: 'Portal del niño: sus cursos con avance, sus notas en estrellas, sus tareas y sus logros.',
    cuenta: '9 pantallas', tono: '#E8820E', suave: '#FDF0DC',
  },
  {
    cod: 'inicial', ruta: '/inicial', nom: 'Estudiante de Inicial',
    persona: '5 años', ini: '5A', ico: IcEstrella,
    desc: 'Portal para los más pequeños: imágenes grandes antes que texto, caritas y estrellas.',
    cuenta: '7 pantallas', tono: '#DC4C86', suave: '#FDE9F1',
  },
];

export default function Inicio() {
  return (
    <div className="entrada">
      <div className="ent-izq">
        <div className="ent-marca">
          <EscudoSVG size={62} />
          <div>
            <b>SIGAC</b>
            <span>Sistema Integrado de Gestión Académica</span>
          </div>
        </div>

        <h1>Un solo sistema para toda la escuela.</h1>
        <p className="lead">
          Prototipo de alta fidelidad del sistema académico de la {IE.nombre},
          de {IE.distrito}, {IE.provincia}. {IE.estudiantes} estudiantes,
          {' '}{IE.docentes} docentes y {IE.salones} salones desde Inicial hasta Secundaria.
        </p>

        <div className="ent-datos">
          <div><b>{IE.estudiantes}</b><span>Estudiantes</span></div>
          <div><b>{IE.salones}</b><span>Salones</span></div>
          <div><b>13</b><span>Módulos</span></div>
          <div><b>65+</b><span>Rutas</span></div>
        </div>

        <form className="ent-form" onSubmit={(e) => e.preventDefault()}>
          <div className="g">
            <label>Usuario</label>
            <div className="ctrl">docente.mmendoza</div>
          </div>
          <div className="g">
            <label>Contraseña</label>
            <div className="ctrl ph">••••••••••</div>
          </div>
          <Link to="/direccion/tablero" className="btn btn-1" style={{ justifyContent: 'center' }}>
            Entrar al sistema
          </Link>
          <p className="ent-nota">
            <IcInfo />
            El acceso está abierto en el prototipo: cada portal se abre con su propio
            enlace para que las pantallas puedan revisarse y exportarse una por una.
          </p>
        </form>
      </div>

      <div className="ent-der">
        <div className="ent-tit">
          <h2>Elija el portal que quiere revisar</h2>
          <p>Cada rol ve un sistema distinto. Lo que no le corresponde, no aparece en su menú.</p>
        </div>

        <div className="ent-portales">
          {PORTALES.map((p) => (
            <Link key={p.cod} to={p.ruta} className="portal" style={{ '--tono': p.tono, '--suave': p.suave }}>
              <span className="ic"><p.ico /></span>
              <span className="tx">
                <b>{p.nom}</b>
                <i>{p.persona}</i>
                <span>{p.desc}</span>
              </span>
              <span className="fin">
                <em>{p.cuenta}</em>
                <IcDer />
              </span>
            </Link>
          ))}
        </div>

        <div className="ent-pie">
          <Link to="/mapa" className="btn btn-2"><IcLista />Mapa completo de rutas</Link>
          <Link to="/permisos" className="btn btn-2"><IcInfo />Qué puede hacer cada rol</Link>
        </div>
      </div>
    </div>
  );
}
