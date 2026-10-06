/* ===========================================================================
   Menú por rol y matriz de permisos.

   El reparto de permisos se corrigió tras la revisión: en una institución de
   65 estudiantes y 6 docentes, toda la gestión administrativa la lleva la
   Dirección. El docente NO crea cursos, no asigna carga, no matricula, no
   configura el calendario ni emite boletas oficiales: trabaja sobre lo que
   la Dirección ya dejó configurado, y solo sobre SUS salones.
   =========================================================================== */
import {
  IcCalendario, IcEdificio, IcLibro, IcUsuarios, IcCarnet, IcReloj, IcNota,
  IcCheck, IcEscudoOk, IcFamilia, IcMoneda, IcCaja, IcTablero, IcLista,
  IcCandado, IcPortapapeles, IcGrafico, IcTraslado, IcEngrane, IcCasa,
} from '../componentes/Iconos.jsx';

/* --------------------------------------------------------------- DIRECCIÓN */
export const MENU_DIRECCION = [
  {
    cod: 'M1', nom: 'Calendarización', icono: IcCalendario, items: [
      { ruta: '/direccion/calendarizacion/configuracion', nom: 'Configuración del año' },
      { ruta: '/direccion/calendarizacion/calendario', nom: 'Calendario anual' },
      { ruta: '/direccion/calendarizacion/horas', nom: 'Horas y verificación' },
      { ruta: '/direccion/calendarizacion/periodos', nom: 'Periodos del año' },
    ],
  },
  {
    cod: 'M2', nom: 'Configuración institucional', icono: IcEdificio, items: [
      { ruta: '/direccion/institucion/salones', nom: 'Niveles, grados y salones' },
      { ruta: '/direccion/institucion/ciclos', nom: 'Ciclos institucionales' },
      { ruta: '/direccion/institucion/escala', nom: 'Escala de calificación' },
    ],
  },
  {
    cod: 'M3', nom: 'Cursos', icono: IcLibro, items: [
      { ruta: '/direccion/cursos', nom: 'Registro de cursos' },
      { ruta: '/direccion/cursos/asignacion', nom: 'Asignación de docentes' },
    ],
  },
  {
    cod: 'M4', nom: 'Usuarios', icono: IcUsuarios, items: [
      { ruta: '/direccion/usuarios', nom: 'Registro de usuarios' },
      { ruta: '/direccion/usuarios/roles', nom: 'Roles y permisos' },
    ],
  },
  {
    cod: 'M5', nom: 'Matrícula', icono: IcCarnet, items: [
      { ruta: '/direccion/matricula', nom: 'Proceso de matrícula' },
      { ruta: '/direccion/matricula/traslados', nom: 'Traslados y retiros' },
      { ruta: '/direccion/matricula/promocion', nom: 'Promoción anual' },
    ],
  },
  {
    cod: 'M6', nom: 'Horarios y planificación', icono: IcReloj, items: [
      { ruta: '/direccion/horarios', nom: 'Horario escolar' },
      { ruta: '/direccion/planificacion', nom: 'Planificación mensual' },
      { ruta: '/direccion/cobertura', nom: 'Cobertura curricular' },
    ],
  },
  {
    cod: 'M7', nom: 'Evaluación y calificación', icono: IcNota, items: [
      { ruta: '/direccion/evaluacion/semanal', nom: 'Registro de evaluación semanal' },
      { ruta: '/direccion/evaluacion/mensual', nom: 'Evaluación mensual' },
      { ruta: '/direccion/evaluacion/conclusiones', nom: 'Conclusiones descriptivas' },
      { ruta: '/direccion/evaluacion/boletas', nom: 'Boletas y consolidados' },
    ],
  },
  {
    cod: 'M8', nom: 'Asistencia y conducta', icono: IcCheck, items: [
      { ruta: '/direccion/asistencia', nom: 'Registro de asistencia' },
      { ruta: '/direccion/asistencia/justificaciones', nom: 'Justificaciones' },
      { ruta: '/direccion/asistencia/incidencias', nom: 'Incidencias de conducta' },
      { ruta: '/direccion/asistencia/reportes', nom: 'Reportes de asistencia' },
    ],
  },
  {
    cod: 'M9', nom: 'Supervisión y prórrogas', icono: IcEscudoOk, items: [
      { ruta: '/direccion/supervision/plazos', nom: 'Plazos de carga' },
      { ruta: '/direccion/supervision/panel', nom: 'Panel de supervisión' },
      { ruta: '/direccion/supervision/prorrogas', nom: 'Prórrogas' },
    ],
  },
  {
    cod: 'M10', nom: 'Portal de la familia', icono: IcFamilia, items: [
      { ruta: '/direccion/familia/academico', nom: 'Consulta académica' },
      { ruta: '/direccion/familia/asistencia', nom: 'Asistencia y conducta' },
      { ruta: '/direccion/familia/cuenta', nom: 'Estado de cuenta' },
      { ruta: '/direccion/familia/comunicados', nom: 'Comunicados' },
    ],
  },
  {
    cod: 'M11', nom: 'Gestión financiera', icono: IcMoneda, items: [
      { ruta: '/direccion/finanzas/cobros', nom: 'Configuración de cobros' },
      { ruta: '/direccion/finanzas/becas', nom: 'Becas y descuentos' },
      { ruta: '/direccion/finanzas/pagos', nom: 'Pagos y morosidad' },
      { ruta: '/direccion/finanzas/devoluciones', nom: 'Retiros y devoluciones' },
    ],
  },
  {
    cod: 'M12', nom: 'Inventario y recursos', icono: IcCaja, items: [
      { ruta: '/direccion/recursos/utiles', nom: 'Lista de útiles' },
      { ruta: '/direccion/recursos/bienes', nom: 'Inventario de bienes' },
    ],
  },
  {
    cod: 'M13', nom: 'Reportes y tablero', icono: IcTablero, items: [
      { ruta: '/direccion/tablero', nom: 'Tablero de indicadores' },
      { ruta: '/direccion/reportes', nom: 'Reportes y exportación' },
    ],
  },
];

/* --------------------------------------------------------------- DOCENTE */
export const MENU_DOCENTE = [
  {
    cod: '', nom: 'Mi trabajo', icono: IcCasa, items: [
      { ruta: '/docente', nom: 'Mi día', exacto: true },
      { ruta: '/docente/horario', nom: 'Mi horario' },
      { ruta: '/docente/mis-cursos', nom: 'Mis cursos' },
    ],
  },
  {
    cod: 'M6', nom: 'Planificación', icono: IcPortapapeles, items: [
      { ruta: '/docente/planificacion', nom: 'Planificación mensual' },
      { ruta: '/docente/cobertura', nom: 'Mi cobertura curricular' },
    ],
  },
  {
    cod: 'M7', nom: 'Evaluación', icono: IcNota, items: [
      { ruta: '/docente/evaluacion/semanal', nom: 'Evaluación semanal' },
      { ruta: '/docente/evaluacion/mensual', nom: 'Evaluación mensual' },
      { ruta: '/docente/evaluacion/conclusiones', nom: 'Conclusiones descriptivas' },
    ],
  },
  {
    cod: 'M8', nom: 'Asistencia y conducta', icono: IcCheck, items: [
      { ruta: '/docente/asistencia', nom: 'Tomar asistencia' },
      { ruta: '/docente/incidencias', nom: 'Incidencias de conducta' },
    ],
  },
  {
    cod: 'M9', nom: 'Plazos', icono: IcEscudoOk, items: [
      { ruta: '/docente/prorrogas', nom: 'Mis prórrogas' },
    ],
  },
  {
    cod: 'M13', nom: 'Consulta', icono: IcGrafico, items: [
      { ruta: '/docente/calendario', nom: 'Calendario del año' },
      { ruta: '/docente/reportes', nom: 'Reportes de mis salones' },
      { ruta: '/docente/permisos', nom: 'Qué puedo hacer' },
    ],
  },
];

/* --------------------------------------------------------------- permisos
   Esta tabla es la que corrige el error detectado: el docente aparecía
   pudiendo crear cursos. No puede.                                         */
export const PERMISOS = [
  { mod: 'M1', accion: 'Configurar el calendario y los periodos del año', dir: true, doc: false,
    nota: 'La calendarización es un acto de Dirección: define días lectivos, horas y periodos para toda la institución.' },
  { mod: 'M1', accion: 'Consultar el calendario y los días lectivos', dir: true, doc: true,
    nota: 'El docente lo consulta para planificar; no lo modifica.' },
  { mod: 'M2', accion: 'Crear niveles, grados y salones', dir: true, doc: false, nota: 'Estructura institucional.' },
  { mod: 'M2', accion: 'Definir la escala de calificación', dir: true, doc: false, nota: 'Debe ser única para toda la institución.' },
  { mod: 'M3', accion: 'Crear o eliminar cursos', dir: true, doc: false,
    nota: 'El plan de estudios lo aprueba la Dirección. El docente trabaja sobre los cursos que ya existen.' },
  { mod: 'M3', accion: 'Asignar docentes a un curso', dir: true, doc: false, nota: 'Es una decisión de carga laboral.' },
  { mod: 'M3', accion: 'Ver la ficha de sus cursos', dir: true, doc: true, nota: 'Solo lectura, y solo los cursos que tiene asignados.' },
  { mod: 'M4', accion: 'Crear usuarios y asignar roles', dir: true, doc: false, nota: 'Control de acceso al sistema.' },
  { mod: 'M5', accion: 'Matricular, trasladar o retirar estudiantes', dir: true, doc: false,
    nota: 'La matrícula tiene efectos legales y arancelarios; la lleva Dirección con Secretaría.' },
  { mod: 'M5', accion: 'Ejecutar la promoción anual', dir: true, doc: false, nota: 'Cierra el año académico de toda la institución.' },
  { mod: 'M6', accion: 'Construir el horario escolar', dir: true, doc: false, nota: 'Afecta a todos los salones y docentes.' },
  { mod: 'M6', accion: 'Registrar la planificación mensual de sus cursos', dir: true, doc: true,
    nota: 'Es el trabajo propio del docente: qué competencias trabaja cada mes.' },
  { mod: 'M7', accion: 'Registrar la evaluación semanal por competencias', dir: true, doc: true, nota: 'Solo de sus cursos y salones.' },
  { mod: 'M7', accion: 'Registrar la evaluación mensual', dir: true, doc: true, nota: 'Solo de sus cursos y salones.' },
  { mod: 'M7', accion: 'Escribir conclusiones descriptivas', dir: true, doc: true, nota: 'Solo de sus estudiantes.' },
  { mod: 'M7', accion: 'Emitir boletas y consolidados oficiales', dir: true, doc: false,
    nota: 'La boleta es un documento oficial con firma de Dirección. El docente ve una vista previa, no la emite.' },
  { mod: 'M8', accion: 'Tomar asistencia de sus salones', dir: true, doc: true, nota: 'Diaria, en su primera hora.' },
  { mod: 'M8', accion: 'Registrar incidencias de conducta', dir: true, doc: true, nota: 'Solo de sus estudiantes.' },
  { mod: 'M8', accion: 'Aprobar justificaciones de inasistencia', dir: true, doc: false,
    nota: 'El docente registra la solicitud; quien la aprueba es Dirección.' },
  { mod: 'M9', accion: 'Fijar los plazos de carga de notas', dir: true, doc: false, nota: 'Regla institucional.' },
  { mod: 'M9', accion: 'Solicitar una prórroga de carga', dir: false, doc: true, nota: 'Es el docente quien la pide, con motivo.' },
  { mod: 'M9', accion: 'Aprobar o rechazar una prórroga', dir: true, doc: false, nota: 'Decide Dirección.' },
  { mod: 'M10', accion: 'Publicar comunicados a las familias', dir: true, doc: false, nota: 'La comunicación oficial sale de Dirección.' },
  { mod: 'M11', accion: 'Ver pagos, pensiones y morosidad', dir: true, doc: false,
    nota: 'Dato económico de la familia: el docente no tiene por qué verlo.' },
  { mod: 'M12', accion: 'Administrar el inventario de bienes', dir: true, doc: false, nota: 'Patrimonio institucional.' },
  { mod: 'M13', accion: 'Ver el tablero de toda la institución', dir: true, doc: false, nota: 'El docente ve solo sus salones.' },
  { mod: 'M13', accion: 'Ver reportes de sus propios salones', dir: true, doc: true, nota: 'Rendimiento por competencia de sus cursos.' },
];

/* --------------------------------------------------------------- roles */
export const ROLES = [
  { cod: 'direccion', nom: 'Dirección', persona: 'Miguel Ángel Aquino Q.', ini: 'MA', ruta: '/direccion/tablero',
    desc: 'Acceso total: los 13 módulos del sistema.', icono: IcEngrane, color: 'az' },
  { cod: 'docente', nom: 'Docente', persona: 'Marleny Mendoza Gamonal', ini: 'MM', ruta: '/docente',
    desc: 'Solo sus salones y sus cursos. No configura ni administra.', icono: IcPortapapeles, color: 'verde' },
  { cod: 'primaria', nom: 'Estudiante de Primaria', persona: '3.º de Primaria', ini: '3P', ruta: '/primaria',
    desc: 'Portal del niño: sus cursos, sus notas y sus logros.', icono: IcLibro, color: 'naranja' },
  { cod: 'inicial', nom: 'Estudiante de Inicial', persona: '5 años', ini: '5A', ruta: '/inicial',
    desc: 'Portal para los más pequeños: imágenes antes que texto.', icono: IcCasa, color: 'rosa' },
];

export const MENUS = { direccion: MENU_DIRECCION, docente: MENU_DOCENTE };
export const rolDe = (cod) => ROLES.find((r) => r.cod === cod) || ROLES[0];
