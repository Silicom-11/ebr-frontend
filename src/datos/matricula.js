/* ===========================================================================
   Matrícula. Este módulo es el centro de la demostración.

   La pregunta del docente fue: «si yo te digo que registres a un alumno de
   Inicial, ¿qué tendrías que mostrarme?». La respuesta es que la matrícula
   NO es un formulario genérico: el nivel cambia la regla de edad, los
   documentos que se exigen, la ficha de salud, quién puede recoger al niño
   y hasta cómo se le va a calificar después. Todo eso está aquí.
   =========================================================================== */
import { SALONES } from './institucion.js';

/* --------------------------------------------------------------- la regla
   Norma de matrícula: la edad se cuenta cumplida al 31 de marzo del año
   lectivo. Es la regla que decide en qué salón entra el niño y la que más
   consultas genera en Secretaría cada marzo.                                */
export const FECHA_CORTE = '2026-03-31';

export const REGLA_EDAD = [
  { salon: 'INI-3', nivel: 'Inicial',   grado: '3 años', edad: 3, desde: '2022-04-01', hasta: '2023-03-31' },
  { salon: 'INI-4', nivel: 'Inicial',   grado: '4 años', edad: 4, desde: '2021-04-01', hasta: '2022-03-31' },
  { salon: 'INI-5', nivel: 'Inicial',   grado: '5 años', edad: 5, desde: '2020-04-01', hasta: '2021-03-31' },
  { salon: 'PRI-1', nivel: 'Primaria',  grado: '1.°',    edad: 6, desde: '2019-04-01', hasta: '2020-03-31' },
  { salon: 'PRI-2', nivel: 'Primaria',  grado: '2.°',    edad: 7, desde: '2018-04-01', hasta: '2019-03-31' },
  { salon: 'PRI-3', nivel: 'Primaria',  grado: '3.°',    edad: 8, desde: '2017-04-01', hasta: '2018-03-31' },
];

/** Edad exacta cumplida a la fecha de corte, y el salón que le corresponde. */
export function evaluarEdad(nacimiento) {
  const n = new Date(`${nacimiento}T12:00:00`);
  const c = new Date(`${FECHA_CORTE}T12:00:00`);
  let anios = c.getFullYear() - n.getFullYear();
  let meses = c.getMonth() - n.getMonth();
  let dias = c.getDate() - n.getDate();
  if (dias < 0) { meses -= 1; dias += new Date(c.getFullYear(), c.getMonth(), 0).getDate(); }
  if (meses < 0) { anios -= 1; meses += 12; }
  const regla = REGLA_EDAD.find((r) => nacimiento >= r.desde && nacimiento <= r.hasta);
  return { anios, meses, dias, regla, cumple: Boolean(regla) };
}

/* --------------------------------------------------------- el caso de la demo
   Postulante de 3 años: es el caso que pidió el docente.                     */
export const POSTULANTE = {
  dni: '92 84 75 61',
  ape1: 'QUISPE',
  ape2: 'MENDOZA',
  nombres: 'Luana Mikaela',
  completo: 'QUISPE MENDOZA, Luana Mikaela',
  nacimiento: '2023-02-12',
  nacimientoTxt: '12 de febrero de 2023',
  sexo: 'Femenino',
  lengua: 'Castellano',
  pais: 'Perú',
  departamento: 'Junín',
  provincia: 'Chanchamayo',
  distrito: 'Pichanaki',
  direccion: 'Jr. Los Cedros 184, C.P. Ciudad Satélite',
  discapacidad: 'No registra',
  seguro: 'SIS — Seguro Integral de Salud',
  procedencia: 'Ingresa por primera vez al sistema educativo',
};

export const APODERADO = {
  dni: '45 71 20 38',
  completo: 'MENDOZA GAMONAL, Carmen Luz',
  parentesco: 'Madre',
  ocupacion: 'Comerciante',
  grado: 'Secundaria completa',
  telefono: '964 ••• 712',
  correo: 'c.mendoza•••@gmail.com',
  direccion: 'Jr. Los Cedros 184, C.P. Ciudad Satélite',
  vive: 'Sí, vive con la estudiante',
};

/* Propio de Inicial: quién está autorizado a recoger al niño. En Secundaria
   el estudiante se retira solo y este bloque no aparece. */
export const AUTORIZADOS = [
  { nom: 'MENDOZA GAMONAL, Carmen Luz', par: 'Madre', dni: '45 71 20 38', tel: '964 ••• 712', principal: true },
  { nom: 'QUISPE ROJAS, Edwin Raúl', par: 'Padre', dni: '43 92 55 10', tel: '951 ••• 408', principal: false },
  { nom: 'GAMONAL VEGA, Rosa Elena', par: 'Abuela materna', dni: '20 44 81 76', tel: '968 ••• 233', principal: false },
];

/* Propio de Inicial: ficha de salud. Sin esto la docente no puede responder
   ante una emergencia, y en Inicial el niño no sabe explicar qué le pasa. */
export const SALUD = {
  grupo: 'O+',
  alergias: 'Penicilina — reacción cutánea',
  condiciones: 'Ninguna registrada',
  medicacion: 'No recibe medicación permanente',
  cred: 'Control CRED al día — última visita 14/01/2026',
  vacunas: 'Esquema completo para la edad (carné adjunto)',
  esfinteres: 'Control diurno logrado',
  alimentacion: 'Sin restricciones. Trae lonchera.',
  emergencia: 'GAMONAL VEGA, Rosa Elena — 968 ••• 233',
  centro: 'Centro de Salud Pichanaki',
};

/* --------------------------------------------------------------- documentos */
export const DOCUMENTOS = {
  Inicial: [
    { d: 'Partida de nacimiento o DNI del menor', ok: true, nota: 'Original y copia simple', obl: true },
    { d: 'DNI del padre, madre o apoderado', ok: true, nota: 'Copia simple', obl: true },
    { d: 'Carné de vacunación', ok: true, nota: 'Exclusivo de Inicial', obl: true, soloIni: true },
    { d: 'Tarjeta de control CRED', ok: true, nota: 'Exclusivo de Inicial', obl: true, soloIni: true },
    { d: 'Ficha de salud y alergias firmada', ok: true, nota: 'Exclusivo de Inicial', obl: true, soloIni: true },
    { d: 'Dos fotografías tamaño carné', ok: false, nota: 'Pendiente de entrega', obl: false },
    { d: 'Declaración de personas autorizadas', ok: true, nota: 'Exclusivo de Inicial y Primaria', obl: true, soloIni: true },
  ],
  Primaria: [
    { d: 'DNI del menor', ok: true, nota: 'Copia simple', obl: true },
    { d: 'DNI del padre, madre o apoderado', ok: true, nota: 'Copia simple', obl: true },
    { d: 'Certificado de estudios del año anterior', ok: true, nota: 'O constancia de matrícula SIAGIE', obl: true },
    { d: 'Ficha única de matrícula del plantel de origen', ok: true, nota: 'Solo si viene por traslado', obl: false },
    { d: 'Dos fotografías tamaño carné', ok: true, nota: '', obl: false },
    { d: 'Declaración de personas autorizadas', ok: true, nota: 'Hasta 4.º grado', obl: true },
  ],
  Secundaria: [
    { d: 'DNI del menor', ok: true, nota: 'Copia simple', obl: true },
    { d: 'DNI del padre, madre o apoderado', ok: true, nota: 'Copia simple', obl: true },
    { d: 'Certificado de estudios del año anterior', ok: true, nota: 'Obligatorio', obl: true },
    { d: 'Constancia de no adeudo del plantel de origen', ok: true, nota: 'Solo por traslado', obl: false },
    { d: 'Dos fotografías tamaño carné', ok: true, nota: '', obl: false },
  ],
};

/* ------------------------------------------------- en qué se diferencia Inicial
   Esta tabla es la respuesta directa a «¿qué datos has utilizado para que el
   sistema maneje Inicial?». Cada fila marcada es un campo o una regla que el
   sistema aplica solo cuando el nivel es Inicial.                             */
export const DIFERENCIAS = [
  { campo: 'Regla de edad', soloIni: false,
    ini: '3, 4 o 5 años cumplidos al 31 de marzo. La edad decide el salón, no el grado anterior.',
    pri: '6 años cumplidos al 31 de marzo para 1.º; de 2.º en adelante, por promoción.',
    sec: 'Por promoción del grado anterior o certificado de estudios.' },
  { campo: 'Carné de vacunación y control CRED', soloIni: true,
    ini: 'Obligatorio. Se registra la fecha del último control.', pri: 'No se exige.', sec: 'No se exige.' },
  { campo: 'Ficha de salud y alergias', soloIni: true,
    ini: 'Obligatoria: grupo sanguíneo, alergias, medicación y contacto de emergencia.',
    pri: 'Opcional, solo si hay condición declarada.', sec: 'Opcional.' },
  { campo: 'Autonomía y hábitos', soloIni: true,
    ini: 'Control de esfínteres, alimentación y siesta. La docente lo necesita para organizar la jornada.',
    pri: 'No aplica.', sec: 'No aplica.' },
  { campo: 'Personas autorizadas para el recojo', soloIni: true,
    ini: 'Obligatorio, mínimo dos personas con DNI y parentesco.',
    pri: 'Obligatorio hasta 4.º grado.', sec: 'No aplica: el estudiante se retira solo.' },
  { campo: 'Estructura curricular', soloIni: false,
    ini: '5 áreas, una sola docente para todas.',
    pri: '5 áreas; desde 5.º se suma Razonamiento Matemático.',
    sec: '14 cursos en el ciclo VI y 16 en el VII, con docentes por especialidad.' },
  { campo: 'Jornada', soloIni: false,
    ini: '5 horas pedagógicas diarias · mínimo 900 horas al año.',
    pri: '6 horas pedagógicas diarias · mínimo 1100 horas al año.',
    sec: '7 horas pedagógicas diarias · mínimo 1200 horas al año.' },
  { campo: 'Calificación', soloIni: true,
    ini: 'Solo literal AD, A, B, C. El sistema bloquea la nota numérica y el promedio.',
    pri: 'Literal con nota numérica de respaldo (0 a 20).',
    sec: 'Nota numérica de 0 a 20 con equivalencia literal.' },
  { campo: 'Tareas y exámenes', soloIni: true,
    ini: 'No se registran. La evaluación es por observación en aula.',
    pri: 'Tarea, trabajo en aula y cuaderno.',
    sec: 'Nota 1, PC 1, tarea y examen final.' },
  { campo: 'Promoción de grado', soloIni: true,
    ini: 'Automática: en Inicial no hay repitencia. El sistema no ofrece la opción.',
    pri: 'Según logro; puede repetir desde 2.º grado.',
    sec: 'Según logro y recuperación.' },
  { campo: 'Conclusiones descriptivas', soloIni: false,
    ini: 'Obligatorias por competencia; sustituyen a la nota.',
    pri: 'Obligatorias por competencia.',
    sec: 'Obligatorias solo al cierre del año.' },
];

/* --------------------------------------------------------------- vacantes */
export const CAPACIDAD = {
  'INI-3': 12, 'INI-4': 12, 'INI-5': 15, 'PRI-1': 20, 'PRI-2': 20, 'PRI-3': 20,
  'PRI-4': 20, 'PRI-5': 20, 'PRI-6': 20, 'SEC-VI': 25, 'SEC-VII': 25,
};

export const vacantes = () => SALONES.map((s) => ({
  ...s, cap: CAPACIDAD[s.cod], libres: CAPACIDAD[s.cod] - s.alu,
  pct: Math.round((s.alu / CAPACIDAD[s.cod]) * 100),
}));

/* --------------------------------------------------------------- pasos */
export const PASOS = [
  { n: 1, cod: 'nivel',      t: 'Nivel y salón',        ruta: '/direccion/matricula/nuevo' },
  { n: 2, cod: 'estudiante', t: 'Datos del estudiante', ruta: '/direccion/matricula/nuevo/estudiante' },
  { n: 3, cod: 'apoderado',  t: 'Apoderado y recojo',   ruta: '/direccion/matricula/nuevo/apoderado' },
  { n: 4, cod: 'salud',      t: 'Ficha de salud',       ruta: '/direccion/matricula/nuevo/salud' },
  { n: 5, cod: 'documentos', t: 'Documentos',           ruta: '/direccion/matricula/nuevo/documentos' },
  { n: 6, cod: 'cobros',     t: 'Conceptos de pago',    ruta: '/direccion/matricula/nuevo/cobros' },
  { n: 7, cod: 'revision',   t: 'Revisión y registro',  ruta: '/direccion/matricula/nuevo/revision' },
];

/* --------------------------------------------------------------- histórico */
export const MATRICULAS = [
  { id: 'MT-2026-063', fecha: '02/03/2026', alu: 'ACUÑA VILCAHUAMÁN, Diego Alonso', salon: 'INI-3', niv: 'Inicial', tipo: 'Nuevo', estado: 'Matriculado' },
  { id: 'MT-2026-064', fecha: '02/03/2026', alu: 'BALDEÓN QUISPE, Ariana Nicol', salon: 'INI-3', niv: 'Inicial', tipo: 'Nuevo', estado: 'Matriculado' },
  { id: 'MT-2026-065', fecha: '03/03/2026', alu: 'CÁRDENAS ROJAS, Mateo Sebastián', salon: 'INI-4', niv: 'Inicial', tipo: 'Continuador', estado: 'Matriculado' },
  { id: 'MT-2026-066', fecha: '03/03/2026', alu: 'CHÁVEZ MEZA, Luana Valentina', salon: 'INI-4', niv: 'Inicial', tipo: 'Continuador', estado: 'Matriculado' },
  { id: 'MT-2026-067', fecha: '04/03/2026', alu: 'DE LA CRUZ PONCE, Thiago André', salon: 'INI-5', niv: 'Inicial', tipo: 'Continuador', estado: 'Matriculado' },
  { id: 'MT-2026-068', fecha: '04/03/2026', alu: 'ESPINOZA HUAMÁN, Camila Rafaela', salon: 'INI-5', niv: 'Inicial', tipo: 'Nuevo', estado: 'Matriculado' },
  { id: 'MT-2026-069', fecha: '05/03/2026', alu: 'FERNÁNDEZ SALAZAR, Joaquín Gabriel', salon: 'PRI-1', niv: 'Primaria', tipo: 'Continuador', estado: 'Matriculado' },
  { id: 'MT-2026-070', fecha: '05/03/2026', alu: 'GAMARRA LLACTA, Antonella Mía', salon: 'PRI-1', niv: 'Primaria', tipo: 'Traslado', estado: 'Matriculado' },
  { id: 'MT-2026-071', fecha: '06/03/2026', alu: 'HUARCAYA PARIONA, Renzo Fabián', salon: 'PRI-2', niv: 'Primaria', tipo: 'Continuador', estado: 'Matriculado' },
  { id: 'MT-2026-072', fecha: '09/03/2026', alu: 'INGA CASTILLO, Fabiana Luciana', salon: 'SEC-VI', niv: 'Secundaria', tipo: 'Traslado', estado: 'Matriculado' },
  { id: 'MT-2026-073', fecha: '11/03/2026', alu: 'JIMÉNEZ ORTIZ, Adriano Piero', salon: 'SEC-VII', niv: 'Secundaria', tipo: 'Continuador', estado: 'Matriculado' },
  { id: 'MT-2026-074', fecha: '18/03/2026', alu: 'LAZO MEDINA, Génesis Abigail', salon: 'PRI-5', niv: 'Primaria', tipo: 'Nuevo', estado: 'Observado' },
];
