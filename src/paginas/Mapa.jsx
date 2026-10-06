/* Mapa de rutas. Sirve para dos cosas: navegar rápido durante la
   exposición y, sobre todo, para copiar las URL una por una en
   html.to.design, que importa a Figma una dirección a la vez. */
import { Link } from 'react-router-dom';
import { EscudoSVG, IcDer, IcIzq, IcLista } from '../componentes/Iconos.jsx';

export const GRUPOS = [
  {
    g: 'Para la exposición · el recorrido de 5 minutos', destacado: true, rutas: [
      ['/', 'Entrada: los cuatro portales'],
      ['/direccion/matricula', '1. Proceso de matrícula y vacantes'],
      ['/direccion/matricula/nuevo', '2. Paso 1 · nivel y salón de Inicial'],
      ['/direccion/matricula/nuevo/estudiante', '3. Paso 2 · datos y validación de edad al 31/03'],
      ['/direccion/matricula/nuevo/apoderado', '4. Paso 3 · apoderado y personas autorizadas'],
      ['/direccion/matricula/nuevo/salud', '5. Paso 4 · ficha de salud (solo Inicial)'],
      ['/direccion/matricula/nuevo/documentos', '6. Paso 5 · documentos propios de Inicial'],
      ['/direccion/matricula/nuevo/cobros', '7. Paso 6 · conceptos de pago'],
      ['/direccion/matricula/nuevo/revision', '8. Paso 7 · revisión'],
      ['/direccion/matricula/listo', '9. Ficha única de matrícula generada'],
      ['/direccion/matricula/diferencias', '10. Qué cambia en el sistema según el nivel'],
      ['/inicial', '11. Portal del estudiante de Inicial'],
      ['/primaria', '12. Portal del estudiante de Primaria'],
    ],
  },
  {
    g: 'Inicial · portal del estudiante', rutas: [
      ['/inicial', 'Hoy'],
      ['/inicial/actividades', 'Lo que aprendo · las 5 áreas'],
      ['/inicial/actividades/numeros', 'Área: Números y formas'],
      ['/inicial/actividades/cuentos', 'Área: Cuentos y letras'],
      ['/inicial/actividades/descubro', 'Área: Descubro el mundo'],
      ['/inicial/actividades/amigos', 'Área: Yo y mis amigos'],
      ['/inicial/actividades/english', 'Área: English time'],
      ['/inicial/semana', 'Mi semana'],
      ['/inicial/estrellas', 'Mis estrellas y medallas'],
      ['/inicial/asistencia', 'Mis días'],
      ['/inicial/familia', 'Para mi familia · logro literal y nota de la docente'],
    ],
  },
  {
    g: 'Primaria · portal del estudiante', rutas: [
      ['/primaria', 'Mi día'],
      ['/primaria/cursos', 'Mis cursos'],
      ['/primaria/cursos/matematica', 'Curso: Matemática'],
      ['/primaria/cursos/comunicacion', 'Curso: Comunicación'],
      ['/primaria/cursos/ciencia', 'Curso: Ciencia y Tecnología'],
      ['/primaria/cursos/personal-social', 'Curso: Personal Social'],
      ['/primaria/cursos/ingles', 'Curso: Inglés'],
      ['/primaria/notas', 'Mis notas'],
      ['/primaria/horario', 'Mi horario'],
      ['/primaria/tareas', 'Mis tareas'],
      ['/primaria/logros', 'Mis logros'],
      ['/primaria/asistencia', 'Mi asistencia'],
      ['/primaria/comunicados', 'Avisos'],
    ],
  },
  {
    g: 'M5 · Matrícula (completo)', rutas: [
      ['/direccion/matricula', 'Proceso y vacantes'],
      ['/direccion/matricula/nuevo', 'Asistente · paso 1'],
      ['/direccion/matricula/nuevo/estudiante', 'Asistente · paso 2'],
      ['/direccion/matricula/nuevo/apoderado', 'Asistente · paso 3'],
      ['/direccion/matricula/nuevo/salud', 'Asistente · paso 4'],
      ['/direccion/matricula/nuevo/documentos', 'Asistente · paso 5'],
      ['/direccion/matricula/nuevo/cobros', 'Asistente · paso 6'],
      ['/direccion/matricula/nuevo/revision', 'Asistente · paso 7'],
      ['/direccion/matricula/listo', 'Ficha única generada'],
      ['/direccion/matricula/diferencias', 'Inicial vs Primaria vs Secundaria'],
      ['/direccion/matricula/MT-2026-063', 'Ficha de un matriculado de Inicial'],
      ['/direccion/matricula/MT-2026-069', 'Ficha de un matriculado de Primaria'],
      ['/direccion/matricula/traslados', 'Traslados y retiros'],
      ['/direccion/matricula/promocion', 'Promoción anual'],
    ],
  },
  {
    g: 'Dirección · M1 a M4', rutas: [
      ['/direccion/tablero', 'M13 · Tablero de indicadores'],
      ['/direccion/calendarizacion/configuracion', 'M1 · Configuración del año'],
      ['/direccion/calendarizacion/calendario', 'M1 · Calendario anual'],
      ['/direccion/calendarizacion/horas', 'M1 · Horas y verificación'],
      ['/direccion/calendarizacion/periodos', 'M1 · Periodos del año'],
      ['/direccion/institucion/salones', 'M2 · Niveles, grados y salones'],
      ['/direccion/institucion/salones/INI-3', 'M2 · Ficha del salón Inicial 3 años'],
      ['/direccion/institucion/ciclos', 'M2 · Ciclos institucionales'],
      ['/direccion/institucion/escala', 'M2 · Escala de calificación'],
      ['/direccion/cursos', 'M3 · Registro de cursos'],
      ['/direccion/cursos/asignacion', 'M3 · Asignación de docentes'],
      ['/direccion/usuarios', 'M4 · Registro de usuarios'],
      ['/direccion/usuarios/roles', 'M4 · Roles y permisos'],
    ],
  },
  {
    g: 'Dirección · M6 a M13', rutas: [
      ['/direccion/horarios', 'M6 · Horario escolar'],
      ['/direccion/planificacion', 'M6 · Planificación mensual'],
      ['/direccion/cobertura', 'M6 · Cobertura curricular'],
      ['/direccion/evaluacion/semanal', 'M7 · Evaluación semanal'],
      ['/direccion/evaluacion/mensual', 'M7 · Evaluación mensual'],
      ['/direccion/evaluacion/conclusiones', 'M7 · Conclusiones descriptivas'],
      ['/direccion/evaluacion/boletas', 'M7 · Boletas y consolidados'],
      ['/direccion/asistencia', 'M8 · Registro de asistencia'],
      ['/direccion/asistencia/justificaciones', 'M8 · Justificaciones'],
      ['/direccion/asistencia/incidencias', 'M8 · Incidencias de conducta'],
      ['/direccion/asistencia/reportes', 'M8 · Reportes de asistencia'],
      ['/direccion/supervision/plazos', 'M9 · Plazos de carga'],
      ['/direccion/supervision/panel', 'M9 · Panel de supervisión'],
      ['/direccion/supervision/prorrogas', 'M9 · Prórrogas'],
      ['/direccion/familia/academico', 'M10 · Consulta académica'],
      ['/direccion/familia/cuenta', 'M10 · Estado de cuenta'],
      ['/direccion/familia/comunicados', 'M10 · Comunicados'],
      ['/direccion/finanzas/cobros', 'M11 · Configuración de cobros'],
      ['/direccion/finanzas/becas', 'M11 · Becas y descuentos'],
      ['/direccion/finanzas/pagos', 'M11 · Pagos y morosidad'],
      ['/direccion/finanzas/devoluciones', 'M11 · Retiros y devoluciones'],
      ['/direccion/recursos/utiles', 'M12 · Lista de útiles'],
      ['/direccion/recursos/bienes', 'M12 · Inventario de bienes'],
      ['/direccion/reportes', 'M13 · Reportes y exportación'],
    ],
  },
  {
    g: 'Docente · lo que sí puede hacer', rutas: [
      ['/docente', 'Mi día'],
      ['/docente/horario', 'Mi horario'],
      ['/docente/mis-cursos', 'Mis cursos (solo lectura)'],
      ['/docente/planificacion', 'Planificación mensual'],
      ['/docente/cobertura', 'Mi cobertura curricular'],
      ['/docente/evaluacion/semanal', 'Evaluación semanal'],
      ['/docente/evaluacion/mensual', 'Evaluación mensual'],
      ['/docente/evaluacion/conclusiones', 'Conclusiones descriptivas'],
      ['/docente/asistencia', 'Tomar asistencia'],
      ['/docente/incidencias', 'Incidencias de conducta'],
      ['/docente/prorrogas', 'Mis prórrogas'],
      ['/docente/calendario', 'Calendario (consulta)'],
      ['/docente/reportes', 'Reportes de mis salones'],
      ['/docente/permisos', 'Qué puedo hacer'],
    ],
  },
  {
    g: 'Transversales', rutas: [
      ['/permisos', 'Matriz de permisos por rol'],
      ['/buscar', 'Búsqueda'],
      ['/mapa', 'Este mapa'],
    ],
  },
];

export default function Mapa() {
  const total = new Set(GRUPOS.flatMap((g) => g.rutas.map((r) => r[0]))).size;
  return (
    <div style={{ padding: '26px 30px 60px', maxWidth: 1180, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <EscudoSVG size={42} />
        <div>
          <h1 style={{ fontSize: 23, fontWeight: 700, letterSpacing: '-.3px' }}>Mapa de rutas</h1>
          <p style={{ color: 'var(--txt-2)', fontSize: 13.5 }}>
            {total} direcciones distintas. Cada una es una pantalla que html.to.design puede importar a Figma por separado.
          </p>
        </div>
        <Link to="/" className="btn btn-2" style={{ marginLeft: 'auto' }}><IcIzq />Volver al inicio</Link>
      </div>

      <div className="aviso aviso-oro" style={{ margin: '18px 0 22px' }}>
        <IcLista />
        <div>
          <b>Cómo usarlo con html.to.design: </b>
          copie la URL de producción (la de Vercel) y añádale la ruta que quiera importar.
          Por ejemplo <code style={{ background: 'rgba(0,0,0,.06)', padding: '1px 6px', borderRadius: 4 }}>
            https://…vercel.app/direccion/matricula/nuevo/estudiante</code>.
          Ninguna pantalla está detrás de un inicio de sesión, así que todas se alcanzan directamente.
        </div>
      </div>

      <div className="mapa">
        {GRUPOS.map((g) => (
          <div key={g.g} className="mapa-g" style={g.destacado ? { boxShadow: '0 0 0 2px var(--oro)' } : undefined}>
            <h3>{g.g}<em>{g.rutas.length} rutas</em></h3>
            <ul>
              {g.rutas.map(([r, t]) => (
                <li key={r + t}>
                  <Link to={r}>
                    <code>{r}</code>
                    <span>{t}</span>
                    <span className="ir"><IcDer /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
