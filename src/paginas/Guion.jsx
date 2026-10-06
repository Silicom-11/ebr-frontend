/* Guion de la exposición. El docente dijo que había que demostrar cómo se
   registra a un estudiante de Inicial y qué datos propios de ese nivel
   maneja el sistema, con cinco minutos para hacerlo. Esta pantalla es el
   recorrido exacto: a dónde hacer clic y qué decir en cada paso. */
import { Link } from 'react-router-dom';
import { EscudoSVG, IcIzq, IcDer, IcReloj, IcAlerta, IcImprimir, IcInfo } from '../componentes/Iconos.jsx';

const PASOS = [
  {
    bloque: 'Apertura · 30 segundos',
    pasos: [
      {
        n: 1, ruta: '/', t: 'Entrada del sistema',
        dice: 'Este es el SIGAC para la I.E.P. Continental Americano. Son 65 estudiantes, 11 salones y cuatro perfiles distintos. Hoy vamos a entrar por Dirección, que es quien matricula.',
        ojo: 'Señale los cuatro portales y pulse Dirección. No se detenga aquí.',
      },
    ],
  },
  {
    bloque: 'El núcleo · 3 minutos · matricular a una niña de Inicial',
    pasos: [
      {
        n: 2, ruta: '/direccion/matricula', t: 'Proceso de matrícula',
        dice: 'Lo primero que mira Secretaría son las vacantes. Fíjese que Inicial va aparte: los salones de 3 y 4 años admiten 12 niños y el de 5 años, 15. En Primaria son 20. El ratio de Inicial es menor por norma.',
        ojo: 'Pulse «Nueva matrícula».',
      },
      {
        n: 3, ruta: '/direccion/matricula/nuevo', t: 'Paso 1 · nivel y salón',
        dice: 'Lo primero que se elige es el nivel, y eso ya cambia todo lo que viene después: Inicial va a pedir ficha de salud y personas autorizadas, que en Secundaria ni aparecen.',
        ojo: 'Lea la nota del ratio y pase al siguiente paso.',
      },
      {
        n: 4, ruta: '/direccion/matricula/nuevo/estudiante', t: 'Paso 2 · la validación de edad', clave: true,
        dice: 'Aquí está lo que define la matrícula de Inicial. La edad no se cuenta al día de hoy: se cuenta cumplida al 31 de marzo del año lectivo. Luana nació el 12 de febrero de 2023, así que al 31 de marzo de 2026 tiene 3 años y 1 mes, y le corresponde Inicial 3 años. El sistema calcula el rango de nacimiento de cada salón y no deja elegir otro.',
        ojo: 'Esta es la pantalla más importante de la exposición. Quédese en la tabla de rangos.',
      },
      {
        n: 5, ruta: '/direccion/matricula/nuevo/apoderado', t: 'Paso 3 · apoderado y recojo', clave: true,
        dice: 'En Inicial el apoderado firma presencialmente, y además hay que declarar quién puede recoger al niño: mínimo dos personas con DNI y parentesco. Este bloque existe en Inicial y en Primaria hasta cuarto grado. En Secundaria no aparece, porque el estudiante se retira solo.',
        ojo: 'Señale el aviso dorado del final.',
      },
      {
        n: 6, ruta: '/direccion/matricula/nuevo/salud', t: 'Paso 4 · ficha de salud', clave: true,
        dice: 'Esta ficha es exclusiva de Inicial. Un niño de 3 años no puede explicar qué le pasa, así que el sistema guarda grupo sanguíneo, alergias, medicación y contacto de emergencia. Y además control de esfínteres y alimentación, que la docente necesita para organizar la jornada.',
        ojo: 'La alerta roja de la alergia a penicilina es el detalle que se queda en la memoria.',
      },
      {
        n: 7, ruta: '/direccion/matricula/nuevo/documentos', t: 'Paso 5 · documentos',
        dice: 'Tres de los siete documentos solo se piden en Inicial: carné de vacunación, tarjeta de control CRED y la declaración de personas autorizadas. Están marcados en dorado.',
        ojo: 'Si va justo de tiempo, salte el paso 6 y vaya directo a la revisión.',
      },
      {
        n: 8, ruta: '/direccion/matricula/nuevo/revision', t: 'Paso 7 · revisión',
        dice: 'Antes de registrar, todo junto: estudiante, apoderado, salud y lo administrativo.',
        ojo: 'Pulse «Registrar matrícula».',
      },
      {
        n: 9, ruta: '/direccion/matricula/listo', t: 'Ficha única de matrícula', clave: true,
        dice: 'El sistema genera el código de estudiante, la ficha única, el cronograma de las diez pensiones y da de alta a la niña en el salón. Queda observada porque faltan las fotografías.',
        ojo: 'Señale los tres «siguiente paso» del final: pensiones, nómina y acceso de la familia.',
      },
    ],
  },
  {
    bloque: 'La respuesta a su pregunta · 1 minuto',
    pasos: [
      {
        n: 10, ruta: '/direccion/matricula/diferencias', t: 'Qué cambia según el nivel', clave: true,
        dice: 'Usted preguntó qué datos usamos para que el sistema maneje Inicial. Son once reglas, y siete se activan solo en Inicial: la edad al 31 de marzo, el carné CRED, la ficha de salud, la autonomía, las personas autorizadas, la calificación solo literal sin nota numérica, y la promoción automática, porque en Inicial no existe la repitencia.',
        ojo: 'Si solo pudiera mostrar una pantalla de toda la exposición, sería esta.',
      },
    ],
  },
  {
    bloque: 'Cierre · 1 minuto · a dónde llega ese dato',
    pasos: [
      {
        n: 11, ruta: '/inicial', t: 'Portal del estudiante de Inicial', clave: true,
        dice: 'Y así ve el sistema la niña que acabamos de matricular. A los 3 y 5 años no se lee, así que todo entra por imagen: las cinco áreas como actividades, el logro en estrellas y no en números.',
        ojo: 'Pulse «Para mi familia» para enseñar el literal AD/A/B/C y la nota de la docente.',
      },
      {
        n: 12, ruta: '/primaria', t: 'Portal de Primaria',
        dice: 'Cuando el mismo niño llega a Primaria ya lee, y el portal cambia: aparecen notas, tareas y horario. Es el mismo sistema adaptado al nivel.',
        ojo: 'Contraste rápido con la pantalla anterior. No se extienda.',
      },
    ],
  },
  {
    bloque: 'Por si pregunta · tenerlas listas',
    pasos: [
      {
        n: 13, ruta: '/direccion/institucion/salones', t: '«¿Y cómo tienen organizados los salones?»',
        dice: 'Once salones. En Secundaria son aulas multigrado: EBR 1.º-2.º y EBR 3.º-5.º. El salón manda en el horario, pero el grado se guarda en el estudiante porque de él dependen la promoción y la boleta.',
      },
      {
        n: 14, ruta: '/direccion/evaluacion/semanal', t: '«¿Cómo evalúa el docente?»',
        dice: 'Por competencia, no por examen. Y si elige un salón de Inicial, el sistema oculta la nota numérica y solo admite AD, A, B o C.',
        ojo: 'Cambie el filtro de salón a Inicial 5 años en vivo: se nota el cambio.',
      },
      {
        n: 15, ruta: '/direccion/calendarizacion/horas', t: '«¿Y las horas del año?»',
        dice: 'El sistema verifica nivel por nivel: Inicial necesita 900 horas, Primaria 1100 y Secundaria 1200, porque la jornada es de 5, 6 y 7 horas pedagógicas.',
      },
      {
        n: 16, ruta: '/permisos', t: '«¿El docente puede hacer todo esto?»',
        dice: 'No. El docente no crea cursos, no matricula, no emite boletas y no ve las pensiones. Trabaja sobre lo que Dirección ya configuró, y solo sobre sus salones.',
        ojo: 'Esta es la corrección que nos pidió en la clase anterior.',
      },
      {
        n: 17, ruta: '/docente', t: '«Enséñame la vista del docente»',
        dice: 'Su menú tiene seis bloques, no trece. Lo que no le corresponde, directamente no aparece.',
      },
    ],
  },
];

export default function Guion() {
  return (
    <div className="guion">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
        <EscudoSVG size={42} />
        <div>
          <h1 style={{ fontSize: 23, fontWeight: 700, letterSpacing: '-.3px' }}>Guion de la exposición</h1>
          <p style={{ color: 'var(--txt-2)', fontSize: 13.5 }}>
            Cinco minutos. Doce clics en orden, más cinco pantallas de reserva por si pregunta.
          </p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <Link to="/mapa" className="btn btn-2">Mapa de rutas</Link>
          <Link to="/" className="btn btn-2"><IcIzq />Inicio</Link>
        </div>
      </div>

      <div className="aviso aviso-oro" style={{ margin: '16px 0 10px' }}>
        <IcReloj />
        <div>
          <b>Regla de oro: </b>
          no abra el menú lateral a explorar. Los pasos 4, 6 y 10 son los que responden
          literalmente a lo que pidió el profesor; si se queda sin tiempo, sacrifique
          los pasos 7, 8 y 12 antes que esos tres.
        </div>
      </div>

      {PASOS.map((b) => (
        <div key={b.bloque}>
          <div className="guion-tiempo">{b.bloque}</div>
          {b.pasos.map((p) => (
            <Link key={p.n} to={p.ruta} className={`guion-paso${p.clave ? ' clave' : ''}`}>
              <span className="n">{p.n}</span>
              <span style={{ minWidth: 0 }}>
                <h3>{p.t}{p.clave && <span className="eti-ini">clave</span>}</h3>
                <code>{p.ruta}</code>
                <div className="dice">{p.dice}</div>
                {p.ojo && <div className="ojo">{p.ojo}</div>}
              </span>
            </Link>
          ))}
        </div>
      ))}

      <div className="aviso aviso-info" style={{ marginTop: 22 }}>
        <IcInfo />
        <div>
          <b>Si pregunta por lo que no está terminado: </b>
          los trece módulos están navegables, pero el que está desarrollado a fondo es
          matrícula, que es lo que pidió para esta entrega. Evaluación, asistencia y
          finanzas muestran la pantalla real con datos, sin el flujo completo de varios pasos.
          Decirlo es mejor que esperar a que lo note.
        </div>
      </div>
    </div>
  );
}
