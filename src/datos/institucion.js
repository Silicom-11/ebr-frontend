/* ===========================================================================
   Datos de la I.E.P. Continental Americano, levantados en la institución.
   Todo está quemado en el código: este prototipo no tiene backend.
   Los nombres de los estudiantes son ficticios — no se exponen datos de
   menores. Los docentes y la estructura académica sí son los reales.
   =========================================================================== */

export const IE = {
  nombre: 'I.E.P. Continental Americano',
  ruc: '10403343787',
  titular: 'Aquino Quiñones, Miguel Ángel',
  tipo: 'Persona natural con negocio',
  ciiu: '8521 — Enseñanza secundaria de formación general',
  fundacion: 2008,
  direccion: 'Av. Las Auroras, C.P. Ciudad Satélite',
  distrito: 'Pichanaki',
  provincia: 'Chanchamayo',
  region: 'Junín',
  ugel: 'UGEL Chanchamayo',
  anio: 2026,
  estudiantes: 65,
  docentes: 6,
  salones: 11,
};

/* --------------------------------------------------------------- cursos */
const BASE5 = ['Matemática', 'Comunicación', 'Ciencia y Tecnología', 'Personal Social', 'Inglés'];

export const CUR_VI = ['Álgebra', 'Aritmética', 'Arte y Cultura', 'Ciencias Sociales',
  'Ciencia y Tecnología', 'Comprensión Lectora', 'Computación', 'Comunicación', 'DPCC',
  'Educación Física', 'Gestión Empresarial', 'Inglés', 'Razonamiento Verbal', 'Tutoría'];

export const CUR_VII = ['Álgebra', 'Aritmética', 'Arte y Cultura', 'Ciencias Sociales',
  'Ciencia y Tecnología', 'Comprensión Lectora', 'Computación', 'Comunicación',
  'Educación Física', 'Gestión Empresarial', 'Inglés', 'Razonamiento Matemático',
  'Razonamiento Verbal', 'Religión', 'Trigonometría', 'Tutoría'];

/* --------------------------------------------------------------- salones
   Un salón puede agrupar más de un grado: en Secundaria la institución
   trabaja en aula multigrado. El salón es la unidad de horario, asistencia
   y evaluación; el grado vive dentro del salón porque de él dependen la
   promoción y la boleta.                                                   */
export const SALONES = [
  { cod: 'INI-3',   nom: 'Inicial 3 años', niv: 'Inicial',    ciclo: 'II',  grados: ['3 años'], cursos: BASE5, alu: 2,  tutor: 'María Reynalda Acuña Montalvan', aula: 'A-01' },
  { cod: 'INI-4',   nom: 'Inicial 4 años', niv: 'Inicial',    ciclo: 'II',  grados: ['4 años'], cursos: BASE5, alu: 2,  tutor: 'María Reynalda Acuña Montalvan', aula: 'A-02' },
  { cod: 'INI-5',   nom: 'Inicial 5 años', niv: 'Inicial',    ciclo: 'II',  grados: ['5 años'], cursos: BASE5, alu: 5,  tutor: 'María Reynalda Acuña Montalvan', aula: 'A-03' },
  { cod: 'PRI-1',   nom: '1.º Primaria',   niv: 'Primaria',   ciclo: 'III', grados: ['1.°'],    cursos: BASE5, alu: 8,  tutor: 'Gisela Escobar Cardenas',        aula: 'B-01' },
  { cod: 'PRI-2',   nom: '2.º Primaria',   niv: 'Primaria',   ciclo: 'III', grados: ['2.°'],    cursos: BASE5, alu: 6,  tutor: 'Gisela Escobar Cardenas',        aula: 'B-02' },
  { cod: 'PRI-3',   nom: '3.º Primaria',   niv: 'Primaria',   ciclo: 'IV',  grados: ['3.°'],    cursos: BASE5, alu: 9,  tutor: 'Marleny Mendoza Gamonal',        aula: 'B-03' },
  { cod: 'PRI-4',   nom: '4.º Primaria',   niv: 'Primaria',   ciclo: 'IV',  grados: ['4.°'],    cursos: BASE5, alu: 3,  tutor: 'Marleny Mendoza Gamonal',        aula: 'B-04' },
  { cod: 'PRI-5',   nom: '5.º Primaria',   niv: 'Primaria',   ciclo: 'V',   grados: ['5.°'],    cursos: [...BASE5, 'Razonamiento Matemático'], alu: 9, tutor: 'Andrea De La Cruz Lopez', aula: 'B-05' },
  { cod: 'PRI-6',   nom: '6.º Primaria',   niv: 'Primaria',   ciclo: 'V',   grados: ['6.°'],    cursos: [...BASE5, 'Razonamiento Matemático'], alu: 1, tutor: 'Andrea De La Cruz Lopez', aula: 'B-06' },
  { cod: 'SEC-VI',  nom: 'EBR 1.º-2.º',    niv: 'Secundaria', ciclo: 'VI',  grados: ['1.°', '2.°'],        cursos: CUR_VI,  alu: 9,  tutor: 'Marilyn Ramos Huatuco', aula: 'C-01' },
  { cod: 'SEC-VII', nom: 'EBR 3.º-5.º',    niv: 'Secundaria', ciclo: 'VII', grados: ['3.°', '4.°', '5.°'], cursos: CUR_VII, alu: 11, tutor: 'Marilyn Ramos Huatuco', aula: 'C-02' },
];

export const salon = (cod) => SALONES.find((s) => s.cod === cod) || SALONES[0];

/* --------------------------------------------------------------- docentes */
export const DOCENTES = [
  { id: 'D1', nom: 'Acuña Montalvan, María Reynalda', corto: 'María Acuña',   esp: 'Educación Inicial',  dni: '41 •• •• 72', salones: ['INI-3', 'INI-4', 'INI-5'], cursos: 15, estado: 'Activo', ingreso: '2014' },
  { id: 'D2', nom: 'Escobar Cardenas, Gisela',        corto: 'Gisela Escobar', esp: 'Educación Primaria', dni: '44 •• •• 18', salones: ['PRI-1', 'PRI-2'], cursos: 10, estado: 'Activo', ingreso: '2017' },
  { id: 'D3', nom: 'Mendoza Gamonal, Marleny',        corto: 'Marleny Mendoza', esp: 'Educación Primaria', dni: '42 •• •• 05', salones: ['PRI-3', 'PRI-4'], cursos: 10, estado: 'Activo', ingreso: '2016' },
  { id: 'D4', nom: 'De La Cruz Lopez, Andrea',        corto: 'Andrea De La Cruz', esp: 'Educación Primaria', dni: '46 •• •• 93', salones: ['PRI-5', 'PRI-6'], cursos: 10, estado: 'Activo', ingreso: '2019' },
  { id: 'D5', nom: 'Martinez Rosales, Josue',         corto: 'Josue Martinez', esp: 'Matemática',         dni: '43 •• •• 51', salones: ['PRI-5', 'PRI-6'], cursos: 2,  estado: 'Activo', ingreso: '2021' },
  { id: 'D6', nom: 'Ramos Huatuco, Marilyn',          corto: 'Marilyn Ramos',  esp: 'Matemática',         dni: '45 •• •• 27', salones: ['SEC-VI', 'SEC-VII'], cursos: 4, estado: 'Activo', ingreso: '2020' },
];

export const DOCENTE_ACTUAL = DOCENTES[2]; // Marleny Mendoza Gamonal · 3.º y 4.º de Primaria

/* --------------------------------------------------------------- personas */
const APELLIDOS = [
  'ACUÑA VILCAHUAMÁN', 'BALDEÓN QUISPE', 'CÁRDENAS ROJAS', 'CHÁVEZ MEZA',
  'DE LA CRUZ PONCE', 'ESPINOZA HUAMÁN', 'FERNÁNDEZ SALAZAR', 'GAMARRA LLACTA',
  'HUARCAYA PARIONA', 'INGA CASTILLO', 'JIMÉNEZ ORTIZ', 'LAZO MEDINA',
  'MAMANI CHOQUE', 'NÚÑEZ BARRIENTOS', 'OSORIO VEGA', 'PALOMINO RIVERA',
  'QUISPE ARANDA', 'RAMÍREZ SOLÍS', 'SÁNCHEZ TAIPE', 'VÁSQUEZ ÑAHUI',
  'ARANDA CÓRDOVA', 'BENITES ZEVALLOS', 'CAMPOS ILLATOPA', 'DÁVILA MORENO',
  'ECHEVARRÍA PUMA', 'FLORES SANTOS', 'GUTIÉRREZ CANCHO', 'HINOSTROZA LEÓN',
  'IPARRAGUIRRE SOTO', 'JARA VENTOCILLA', 'LLANOS CÁRDENAS', 'MEZA GUERRA',
];
const NOMBRES = [
  'Diego Alonso', 'Ariana Nicol', 'Mateo Sebastián', 'Luana Valentina',
  'Thiago André', 'Camila Rafaela', 'Joaquín Gabriel', 'Antonella Mía',
  'Renzo Fabián', 'Fabiana Luciana', 'Adriano Piero', 'Génesis Abigail',
  'Santiago Eduardo', 'Dayana Mariel', 'Leonardo Matías', 'Ximena Sofía',
  'Bruno Alessandro', 'Danna Victoria', 'Emiliano Jesús', 'Alessia Belén',
  'Gael Nicolás', 'Maite Alejandra', 'Iker Fernando', 'Zoe Isabella',
  'Dylan Rodrigo', 'Nahomi Esther', 'Patricio Daniel', 'Keyla Antonella',
  'Fabrizio Gael', 'Mía Catalina', 'Aarón Benjamín', 'Romina Paz',
];

/* generador reproducible: el prototipo debe verse idéntico en cada carga */
function azar(semilla) {
  let s = semilla >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

let _n = 0;
export const ESTUDIANTES = SALONES.flatMap((s) => {
  const r = azar(s.cod.split('').reduce((a, c) => a + c.charCodeAt(0), 7) * 31);
  return Array.from({ length: s.alu }, (_, i) => {
    const ap = APELLIDOS[_n % APELLIDOS.length];
    const no = NOMBRES[(_n * 7 + 3) % NOMBRES.length];
    _n += 1;
    const grado = s.grados[Math.floor(r() * s.grados.length)];
    return {
      id: `${s.cod}-${String(i + 1).padStart(2, '0')}`,
      cod: `2026${String(1000 + _n).slice(1)}`,
      ape: ap,
      nom: no,
      completo: `${ap}, ${no}`,
      corto: `${no.split(' ')[0]} ${ap.split(' ')[0].charAt(0)}${ap.split(' ')[0].slice(1).toLowerCase()}`,
      salon: s.cod,
      nivel: s.niv,
      grado,
      sexo: /a$|a |ia|na|la$/i.test(no.split(' ')[0]) ? 'F' : 'M',
      edad: s.niv === 'Inicial' ? 3 + SALONES.indexOf(s) : s.niv === 'Primaria' ? 5 + Number(grado[0]) : 11 + Number(grado[0]),
      estado: r() > 0.97 ? 'Retirado' : 'Matriculado',
      apoderado: `${APELLIDOS[(_n * 3) % APELLIDOS.length].split(' ')[0]}, ${['Rosa Elena', 'Juan Carlos', 'Marisol', 'Edwin Raúl', 'Carmen Luz', 'Percy Iván'][_n % 6]}`,
      deuda: Math.floor(r() * 4) === 0 ? 180 * (1 + Math.floor(r() * 2)) : 0,
    };
  });
});

export const alumnosDe = (cod) => ESTUDIANTES.filter((e) => e.salon === cod);
export const alumno = (id) => ESTUDIANTES.find((e) => e.id === id) || ESTUDIANTES[0];

/* el estudiante que se muestra en cada portal de niño */
export const ALU_PRIMARIA = alumnosDe('PRI-3')[2];
export const ALU_INICIAL = alumnosDe('INI-5')[1];

/* --------------------------------------------------------------- CNEB */
export const COMPETENCIAS = {
  'Matemática': [
    ['C1', 'Resuelve problemas de cantidad'],
    ['C2', 'Resuelve problemas de regularidad, equivalencia y cambio'],
    ['C3', 'Resuelve problemas de forma, movimiento y localización'],
    ['C4', 'Resuelve problemas de gestión de datos e incertidumbre'],
  ],
  'Comunicación': [
    ['C1', 'Se comunica oralmente en su lengua materna'],
    ['C2', 'Lee diversos tipos de textos escritos'],
    ['C3', 'Escribe diversos tipos de textos'],
  ],
  'Ciencia y Tecnología': [
    ['C1', 'Indaga mediante métodos científicos'],
    ['C2', 'Explica el mundo físico basándose en conocimientos científicos'],
    ['C3', 'Diseña y construye soluciones tecnológicas'],
  ],
  'Personal Social': [
    ['C1', 'Construye su identidad'],
    ['C2', 'Convive y participa democráticamente'],
    ['C3', 'Construye interpretaciones históricas'],
    ['C4', 'Gestiona responsablemente el espacio y el ambiente'],
  ],
  'Inglés': [
    ['C1', 'Se comunica oralmente en inglés como lengua extranjera'],
    ['C2', 'Lee diversos tipos de textos en inglés'],
    ['C3', 'Escribe diversos tipos de textos en inglés'],
  ],
};
export const competencias = (curso) => COMPETENCIAS[curso] || COMPETENCIAS['Matemática'];

export const FACTORES = ['Trabajo en aula', 'Tarea', 'Cuaderno'];

export const ESCALA = [
  { lit: 'AD', nom: 'Logro destacado', rango: '18 – 20', desc: 'Evidencia un nivel superior a lo esperado.' },
  { lit: 'A',  nom: 'Logro esperado',  rango: '14 – 17', desc: 'Evidencia el nivel esperado al término del periodo.' },
  { lit: 'B',  nom: 'En proceso',      rango: '11 – 13', desc: 'Está próximo al nivel esperado; requiere acompañamiento.' },
  { lit: 'C',  nom: 'En inicio',       rango: '00 – 10', desc: 'Muestra un progreso mínimo; requiere mayor tiempo.' },
];
export const literal = (n) => (n >= 18 ? 'AD' : n >= 14 ? 'A' : n >= 11 ? 'B' : 'C');

/* --------------------------------------------------------------- periodos */
export const PERIODOS = [
  { cod: 'I',   nom: 'Bimestre I',   rango: '02 mar – 08 may', meses: 'Marzo · Abril',        estado: 'Cerrado',   semanas: 9 },
  { cod: 'II',  nom: 'Bimestre II',  rango: '11 may – 17 jul', meses: 'Mayo · Junio',         estado: 'Cerrado',   semanas: 10 },
  { cod: 'III', nom: 'Bimestre III', rango: '03 ago – 09 oct', meses: 'Agosto · Setiembre',   estado: 'En curso',  semanas: 10 },
  { cod: 'IV',  nom: 'Bimestre IV',  rango: '12 oct – 18 dic', meses: 'Octubre · Noviembre',  estado: 'Pendiente', semanas: 10 },
];
export const PERIODO_ACTUAL = PERIODOS[2];

/* --------------------------------------------------------------- calendario
   Tipos de día de la herramienta del MINEDU:
   A = semana lectiva · B = semana de gestión · C = fin de semana o feriado  */
export const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const FERIADOS = {
  '2026-01-01': 'Año nuevo', '2026-04-02': 'Jueves santo', '2026-04-03': 'Viernes santo',
  '2026-05-01': 'Día del trabajo', '2026-06-29': 'San Pedro y San Pablo',
  '2026-07-28': 'Fiestas patrias', '2026-07-29': 'Fiestas patrias',
  '2026-08-30': 'Santa Rosa de Lima', '2026-10-08': 'Combate de Angamos',
  '2026-11-01': 'Todos los santos', '2026-12-08': 'Inmaculada Concepción',
  '2026-12-25': 'Navidad',
};

export const INICIO_ANIO = '2026-03-02';
export const FIN_ANIO = '2026-12-18';

export function tipoDia(f) {
  const d = f.getDay();
  const iso = f.toISOString().slice(0, 10);
  if (FERIADOS[iso]) return 'F';
  if (d === 0 || d === 6) return 'C';
  if (iso < INICIO_ANIO || iso > FIN_ANIO) return 'C';
  // semanas de gestión: la primera quincena de marzo arranca con gestión
  if (iso >= '2026-03-02' && iso <= '2026-03-06') return 'B';
  if (iso >= '2026-07-20' && iso <= '2026-07-31') return 'B';
  if (iso >= '2026-12-14' && iso <= '2026-12-18') return 'B';
  return 'A';
}

export const HORAS_NIVEL = { Inicial: 5, Primaria: 6, Secundaria: 7 };
export const MINIMO_HORAS = { Inicial: 900, Primaria: 1100, Secundaria: 1200 };

export function resumenCalendario() {
  const r = { A: 0, B: 0, C: 0, F: 0 };
  const d = new Date('2026-01-01T12:00:00');
  while (d.getFullYear() === 2026) {
    r[tipoDia(d)] += 1;
    d.setDate(d.getDate() + 1);
  }
  const semanas = Math.round(r.A / 5);
  return {
    ...r,
    semanas,
    horas: Object.fromEntries(Object.entries(HORAS_NIVEL).map(([k, v]) => [k, r.A * v])),
  };
}

/* --------------------------------------------------------------- horario */
export const BLOQUES = ['07:45 – 08:30', '08:30 – 09:15', '09:15 – 10:00', '10:00 – 10:20',
  '10:20 – 11:05', '11:05 – 11:50', '11:50 – 12:35'];
export const DIAS_SEM = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const CLASE_CSS = {
  'Matemática': 'b-mat', 'Álgebra': 'b-mat', 'Aritmética': 'b-mat', 'Trigonometría': 'b-mat',
  'Razonamiento Matemático': 'b-mat', 'Comunicación': 'b-com', 'Comprensión Lectora': 'b-com',
  'Razonamiento Verbal': 'b-com', 'Ciencia y Tecnología': 'b-cyt', 'Personal Social': 'b-ps',
  'Ciencias Sociales': 'b-ps', 'DPCC': 'b-ps', 'Inglés': 'b-ing',
};
export const cssCurso = (c) => CLASE_CSS[c] || '';

export function horarioDe(cod) {
  const s = salon(cod);
  const r = azar(cod.split('').reduce((a, c) => a + c.charCodeAt(0), 11) * 17);
  return BLOQUES.map((b, i) =>
    DIAS_SEM.map(() => (i === 3 ? { curso: 'Recreo', rec: true } : {
      curso: s.cursos[Math.floor(r() * s.cursos.length)],
      doc: s.tutor.split(' ').slice(0, 2).join(' '),
    })));
}

/* --------------------------------------------------------------- notas */
export function notasDe(salonCod, curso, periodo = 'III') {
  const sem = (salonCod + curso + periodo).split('').reduce((a, c) => a + c.charCodeAt(0), 3);
  const r = azar(sem * 13);
  const comps = competencias(curso);
  return alumnosDe(salonCod).map((a) => {
    const base = 10 + Math.floor(r() * 10);
    const notas = comps.map((_, i) => {
      if (curso === 'Matemática' && i === 2) return null; // C3 sin trabajar este bimestre
      return Math.max(6, Math.min(20, base + Math.floor(r() * 7) - 3));
    });
    const val = notas.filter((n) => n !== null);
    const prom = val.length ? Math.round(val.reduce((x, y) => x + y, 0) / val.length) : null;
    return { alu: a, notas, prom, lit: prom ? literal(prom) : '—' };
  });
}

export function asistenciaDe(salonCod) {
  const r = azar(salonCod.split('').reduce((a, c) => a + c.charCodeAt(0), 5) * 23);
  return alumnosDe(salonCod).map((a) => {
    const f = Math.floor(r() * 4);
    const t = Math.floor(r() * 5);
    const j = Math.min(f, Math.floor(r() * 3));
    return { alu: a, asis: 20 - f, falta: f, tarde: t, just: j, pct: Math.round(((20 - f) / 20) * 100) };
  });
}

/* --------------------------------------------------------------- finanzas */
export const COBROS = [
  { concepto: 'Matrícula', monto: 250, mod: 'Pago único', cuando: 'Al inicio del año lectivo', estado: 'Vigente' },
  { concepto: 'Pensión',   monto: 180, mod: '10 cuotas',  cuando: 'Del 5 de marzo al 5 de diciembre', estado: 'Vigente' },
  { concepto: 'Cuota de ingreso', monto: 0, mod: 'No se cobra', cuando: 'La institución no aplica este concepto', estado: 'No aplica' },
];

export const BECAS = [
  { tipo: 'Hermanos (2.º hijo)', desc: '10 %', benef: 7,  base: 'Acuerdo de Dirección' },
  { tipo: 'Hermanos (3.º hijo)', desc: '15 %', benef: 2,  base: 'Acuerdo de Dirección' },
  { tipo: 'Pago adelantado del año', desc: '5 %', benef: 4, base: 'Acuerdo de Dirección' },
  { tipo: 'Hijo de personal',    desc: '50 %', benef: 3,  base: 'Acuerdo de Dirección' },
];

/* --------------------------------------------------------------- comunicados */
export const COMUNICADOS = [
  { id: 'CM-014', fecha: '21/09/2026', asunto: 'Entrega de boletas del bimestre III', destino: 'Toda la comunidad', leido: true, abiertos: 62, total: 65,
    cuerpo: 'Estimados padres de familia: la entrega de boletas del tercer bimestre se realizará el sábado 10 de octubre, de 9:00 a 12:00, en cada salón con el docente tutor. Agradecemos su puntual asistencia.' },
  { id: 'CM-013', fecha: '14/09/2026', asunto: 'Feria de ciencias: lista de materiales', destino: 'Secundaria', leido: true, abiertos: 19, total: 20,
    cuerpo: 'Se adjunta la lista de materiales para la feria de ciencias del 26 de setiembre. Cada equipo presentará un proyecto por competencia indagadora.' },
  { id: 'CM-012', fecha: '02/09/2026', asunto: 'Cronograma de evaluaciones mensuales', destino: 'EBR 1.º-2.º', leido: false, abiertos: 7, total: 9,
    cuerpo: 'El cronograma de evaluaciones mensuales de setiembre queda publicado en el portal. Las fechas por curso están en el horario del salón.' },
  { id: 'CM-011', fecha: '25/08/2026', asunto: 'Recordatorio de pensión de agosto', destino: 'Apoderado (individual)', leido: true, abiertos: 1, total: 1,
    cuerpo: 'Le recordamos que la pensión del mes de agosto registra saldo pendiente. Puede regularizarla en Secretaría de lunes a viernes.' },
];

/* --------------------------------------------------------------- tablero */
export const INDICADORES = {
  matriculados: 65,
  retirados: 1,
  asistencia: 94.2,
  riesgo: 7,
  cargaNotas: 83,
  moraPct: 18,
  moraMonto: 3240,
  cobertura: 78,
};

export const RIESGO = [
  { alu: 'CÁRDENAS ROJAS, Mateo Sebastián', salon: 'PRI-3', motivo: 'Dos cursos en C', nota: 9.4 },
  { alu: 'HUARCAYA PARIONA, Renzo Fabián',  salon: 'SEC-VI', motivo: 'Asistencia 78 %', nota: 11.2 },
  { alu: 'LAZO MEDINA, Génesis Abigail',    salon: 'PRI-5', motivo: 'Matemática en C', nota: 10.1 },
  { alu: 'MAMANI CHOQUE, Santiago Eduardo', salon: 'SEC-VII', motivo: 'Tres cursos en B', nota: 11.8 },
  { alu: 'OSORIO VEGA, Leonardo Matías',    salon: 'PRI-1', motivo: 'Asistencia 81 %', nota: 12.0 },
  { alu: 'QUISPE ARANDA, Bruno Alessandro', salon: 'SEC-VI', motivo: 'Comunicación en C', nota: 10.6 },
  { alu: 'VÁSQUEZ ÑAHUI, Alessia Belén',    salon: 'PRI-4', motivo: 'Dos cursos en C', nota: 9.9 },
];

export const CARGA_DOCENTE = [
  { doc: 'María Acuña',       salones: 3, cursos: 15, cargado: 15, plazo: '09/10/2026' },
  { doc: 'Gisela Escobar',    salones: 2, cursos: 10, cargado: 10, plazo: '09/10/2026' },
  { doc: 'Marleny Mendoza',   salones: 2, cursos: 10, cargado: 7,  plazo: '09/10/2026' },
  { doc: 'Andrea De La Cruz', salones: 2, cursos: 12, cargado: 9,  plazo: '09/10/2026' },
  { doc: 'Josue Martinez',    salones: 2, cursos: 2,  cargado: 2,  plazo: '09/10/2026' },
  { doc: 'Marilyn Ramos',     salones: 2, cursos: 4,  cargado: 1,  plazo: '09/10/2026' },
];

export const PRORROGAS = [
  { id: 'PR-07', doc: 'Marilyn Ramos',   salon: 'SEC-VII', curso: 'Trigonometría', motivo: 'Licencia por salud del 21 al 25 de setiembre', pide: '28/09/2026', hasta: '14/10/2026', estado: 'Pendiente' },
  { id: 'PR-06', doc: 'Andrea De La Cruz', salon: 'PRI-5', curso: 'Ciencia y Tecnología', motivo: 'Feria de ciencias desplazó dos sesiones', pide: '25/09/2026', hasta: '13/10/2026', estado: 'Aprobada' },
  { id: 'PR-05', doc: 'Marleny Mendoza', salon: 'PRI-3',  curso: 'Matemática', motivo: 'Capacitación UGEL del 14 al 16 de setiembre', pide: '18/09/2026', hasta: '12/10/2026', estado: 'Aprobada' },
  { id: 'PR-04', doc: 'Gisela Escobar',  salon: 'PRI-2',  curso: 'Inglés', motivo: 'Solicitud fuera de plazo', pide: '12/09/2026', hasta: '—', estado: 'Rechazada' },
];

export const INVENTARIO = [
  { cod: 'BN-001', bien: 'Proyector multimedia Epson', area: 'Aula C-01', cant: 2, estado: 'Operativo', valor: 2400 },
  { cod: 'BN-002', bien: 'Computadora de escritorio',  area: 'Sala de cómputo', cant: 12, estado: 'Operativo', valor: 18000 },
  { cod: 'BN-003', bien: 'Pizarra acrílica 2.40 m',    area: 'Todas las aulas', cant: 11, estado: 'Operativo', valor: 3300 },
  { cod: 'BN-004', bien: 'Mesa trapezoidal de Inicial', area: 'Aulas A-01 a A-03', cant: 18, estado: 'Operativo', valor: 2700 },
  { cod: 'BN-005', bien: 'Impresora multifuncional',   area: 'Secretaría', cant: 1, estado: 'En reparación', valor: 1200 },
  { cod: 'BN-006', bien: 'Equipo de sonido portátil',  area: 'Patio', cant: 1, estado: 'Operativo', valor: 900 },
  { cod: 'BN-007', bien: 'Kit de laboratorio escolar', area: 'Aula C-02', cant: 3, estado: 'Baja', valor: 0 },
];

export const UTILES = {
  Inicial: ['Cuaderno cuadriculado doble raya (2)', 'Colores gruesos x 12', 'Plastilina x 6', 'Goma en barra', 'Mandil de trabajo'],
  Primaria: ['Cuaderno cuadriculado 80 h (5)', 'Cuaderno rayado 80 h (3)', 'Colores x 12', 'Regla de 30 cm', 'Diccionario escolar'],
  Secundaria: ['Cuaderno cuadriculado 100 h (6)', 'Folder manila A4 (4)', 'Juego de escuadras', 'Calculadora científica', 'Memoria USB 16 GB'],
};
