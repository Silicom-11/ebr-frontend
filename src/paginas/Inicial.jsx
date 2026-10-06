/* ===========================================================================
   Portal del estudiante de Inicial (3 a 5 años).

   Criterio de diseño: a esta edad no se lee. Todo entra por la imagen —
   icono grande, color y carita— y el texto está para el adulto que
   acompaña. No hay notas numéricas porque en Inicial no existen: el logro
   se muestra en estrellas, y la equivalencia literal (AD, A, B, C) queda
   en la pantalla dirigida a la familia.
   =========================================================================== */
import { Link, Outlet, useParams } from 'react-router-dom';
import { ArmazonNino } from '../componentes/Armazon.jsx';
import { IcEstrella, IcIzq, IcCasa, IcLibro, IcCalendario, IcFamilia, IcCheck, IcMedalla } from '../componentes/Iconos.jsx';
import { ALU_INICIAL, IE } from '../datos/institucion.js';

const A = ALU_INICIAL;

export const MENU_INICIAL = [
  { a: '/inicial', t: 'Hoy', exacto: true, ico: IcCasa },
  { a: '/inicial/actividades', t: 'Lo que aprendo', ico: IcLibro },
  { a: '/inicial/semana', t: 'Mi semana', ico: IcCalendario },
  { a: '/inicial/estrellas', t: 'Mis estrellas', ico: IcEstrella },
  { a: '/inicial/asistencia', t: 'Mis días', ico: IcCheck },
  { a: '/inicial/familia', t: 'Para mi familia', ico: IcFamilia },
];

export function LayoutInicial() {
  return <ArmazonNino nivel="inicial" alumno={{ ...A, nom: 'Camila', grado: '5 años' }} menu={MENU_INICIAL} saludo="🐣" />;
}

/* ------------------------------------------------------------- áreas */
export const AREAS = [
  { slug: 'numeros',   em: '🔢', nom: 'Números y formas',  area: 'Matemática',          c: 'azul',    estrellas: 3, lit: 'A',  hoy: 'Contamos hasta 10 con tapitas de colores.' },
  { slug: 'cuentos',   em: '📚', nom: 'Cuentos y letras',  area: 'Comunicación',        c: 'naranja', estrellas: 3, lit: 'AD', hoy: 'Escuchamos el cuento del zorro y la gallina.' },
  { slug: 'descubro',  em: '🌱', nom: 'Descubro el mundo', area: 'Ciencia y Tecnología', c: 'verde',   estrellas: 2, lit: 'A',  hoy: 'Sembramos frijolitos en algodón.' },
  { slug: 'amigos',    em: '🧩', nom: 'Yo y mis amigos',   area: 'Personal Social',      c: 'morado',  estrellas: 3, lit: 'A',  hoy: 'Aprendimos a guardar los juguetes juntos.' },
  { slug: 'english',   em: '🌎', nom: 'English time',      area: 'Inglés',               c: 'cian',    estrellas: 2, lit: 'B',  hoy: 'Colors: red, blue and yellow.' },
];

const Estrellas = ({ n, max = 3, tam }) => (
  <div className="ini-estrellas">
    {Array.from({ length: max }, (_, i) => (
      <IcEstrella key={i} llena={i < n} style={{ color: i < n ? '#FFCC2A' : '#CFDEEF', width: tam, height: tam }} />
    ))}
  </div>
);

/* ------------------------------------------------------------- hoy */
export function Hoy() {
  return (
    <>
      <div className="n-saludo">
        <div className="gran-cara" aria-hidden>🐣</div>
        <div>
          <h1>¡Hola, Camila!</h1>
          <p>Hoy fue un buen día. Ganaste <b>3 estrellas</b>.</p>
        </div>
        <div className="hoy">
          <span>Hoy</span>
          <b>Martes 6</b>
          <span>Octubre</span>
        </div>
      </div>

      <div className="n-aviso sol" style={{ marginBottom: 20 }}>
        <span className="em" aria-hidden>☀️</span>
        <div>Hoy tocó <b>Números y formas</b>, <b>Cuentos</b> y <b>jugar en el patio</b>.</div>
      </div>

      <h2 style={{ fontSize: 19, fontWeight: 900, color: 'var(--az-900)', marginBottom: 14 }}>¿Cómo me fue hoy?</h2>
      <div className="n-caritas" style={{ marginBottom: 24 }}>
        {[
          { em: '😀', t: 'Muy contenta', si: true },
          { em: '🙂', t: 'Contenta' },
          { em: '😐', t: 'Más o menos' },
          { em: '😴', t: 'Con sueño' },
          { em: '😢', t: 'Triste' },
        ].map((c) => (
          <Link key={c.t} to={`/inicial/animo/${c.t.toLowerCase().replace(/ /g, '-')}`} className={`n-carita${c.si ? ' si' : ''}`}>
            <div className="em" aria-hidden>{c.em}</div>
            <b>{c.t}</b>
          </Link>
        ))}
      </div>

      <h2 style={{ fontSize: 19, fontWeight: 900, color: 'var(--az-900)', marginBottom: 14 }}>Lo que hice hoy</h2>
      <div className="ini-rejilla">
        {AREAS.slice(0, 3).map((a) => (
          <Link key={a.slug} to={`/inicial/actividades/${a.slug}`} className={`ini-boton c-${a.c}`}>
            <span className="em" aria-hidden>{a.em}</span>
            <b>{a.nom}</b>
            <Estrellas n={a.estrellas} tam={24} />
          </Link>
        ))}
      </div>

      <div className="n-pie">
        <b>Para la familia:</b> esta pantalla es la que ve la niña. La información completa
        —logro por competencia, asistencia y la nota de la docente— está en
        {' '}<Link to="/inicial/familia" style={{ color: 'var(--az-700)', fontWeight: 800 }}>Para mi familia</Link>.
      </div>
    </>
  );
}

/* ------------------------------------------------------------- actividades */
export function Actividades() {
  return (
    <>
      <h1 style={{ fontSize: 26, fontWeight: 900, color: 'var(--az-900)', marginBottom: 6 }}>Lo que aprendo</h1>
      <p style={{ fontSize: 15, color: 'var(--txt-2)', fontWeight: 600, marginBottom: 20 }}>
        Toca una para ver lo que hicimos.
      </p>
      <div className="ini-rejilla">
        {AREAS.map((a) => (
          <Link key={a.slug} to={`/inicial/actividades/${a.slug}`} className={`ini-boton c-${a.c}`}>
            <span className="em" aria-hidden>{a.em}</span>
            <b>{a.nom}</b>
            <span>{a.area}</span>
            <Estrellas n={a.estrellas} tam={22} />
          </Link>
        ))}
      </div>

      <div className="n-pie">
        <b>Las cinco áreas de Inicial.</b> En este nivel no hay cursos separados ni docentes por
        especialidad: la misma profesora, María Reynalda Acuña, trabaja las cinco áreas con el
        grupo. Por eso el portal del niño las muestra como actividades y no como una lista de cursos.
      </div>
    </>
  );
}

export function Actividad() {
  const { slug } = useParams();
  const a = AREAS.find((x) => x.slug === slug) || AREAS[0];
  return (
    <>
      <Link to="/inicial/actividades" className="n-volver"><IcIzq />Volver</Link>

      <div className={`n-saludo`} style={{ marginBottom: 20 }}>
        <div className="gran-cara" style={{ background: 'none', boxShadow: 'none', fontSize: 52 }} aria-hidden>{a.em}</div>
        <div>
          <h1>{a.nom}</h1>
          <p>{a.area} · con la profesora María</p>
        </div>
        <div className="hoy">
          <span>Mis estrellas</span>
          <Estrellas n={a.estrellas} tam={26} />
        </div>
      </div>

      <div className="n-aviso az" style={{ marginBottom: 20 }}>
        <span className="em" aria-hidden>📝</span>
        <div>Hoy: <b>{a.hoy}</b></div>
      </div>

      <div className="n-rejilla n-2">
        <div className="n-caja">
          <h2>Lo que ya sé hacer</h2>
          {['Cuento del 1 al 10', 'Reconozco el círculo y el cuadrado', 'Agrupo por color'].map((t, i) => (
            <div key={t} className={`n-tarea${i < 2 ? ' lista' : ''}`} style={{ marginBottom: 9 }}>
              <span className="caja">{i < 2 && <IcCheck />}</span>
              <b>{t}</b>
            </div>
          ))}
        </div>
        <div className="n-caja">
          <h2>Lo que estoy aprendiendo</h2>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt-2)', lineHeight: 1.6 }}>
            Estoy practicando a <b>ordenar del más pequeño al más grande</b>.
            La profesora dice que ya casi lo logro.
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 34 }} aria-hidden>💪</span>
            <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--k-verde)' }}>¡Ya casi!</span>
          </div>
        </div>
      </div>

      <div className="n-pie">
        <b>Equivalencia para la familia:</b> en el registro oficial esta área está en
        {' '}<b>{a.lit}</b>{' '}
        {a.lit === 'AD' ? '(logro destacado)' : a.lit === 'A' ? '(logro esperado)' : '(en proceso)'}.
        En Inicial el sistema no guarda nota numérica: solo el literal y la conclusión descriptiva.
      </div>
    </>
  );
}

/* ------------------------------------------------------------- semana */
export function Semana() {
  const dias = [
    { d: 'Lunes', act: [['🔢', 'Números'], ['🎨', 'Pintamos'], ['🍎', 'Lonchera']] },
    { d: 'Martes', act: [['📚', 'Cuento'], ['🔢', 'Números'], ['🤸', 'Patio']], hoy: true },
    { d: 'Miércoles', act: [['🌱', 'Plantas'], ['🧩', 'Amigos'], ['🍎', 'Lonchera']] },
    { d: 'Jueves', act: [['🌎', 'English'], ['📚', 'Cuento'], ['🎵', 'Canciones']] },
    { d: 'Viernes', act: [['🎨', 'Arte'], ['🤸', 'Patio'], ['⭐', 'Estrellas']] },
  ];
  return (
    <>
      <h1 style={{ fontSize: 26, fontWeight: 900, color: 'var(--az-900)', marginBottom: 6 }}>Mi semana</h1>
      <p style={{ fontSize: 15, color: 'var(--txt-2)', fontWeight: 600, marginBottom: 20 }}>
        Lo que hacemos cada día. Vengo de lunes a viernes, de 8:00 a 12:30.
      </p>

      <div className="ini-semana">
        {dias.map((x) => (
          <Link key={x.d} to={`/inicial/semana/${x.d.toLowerCase()}`} className={`ini-dia${x.hoy ? ' hoy' : ''}`}>
            <h4>{x.d}</h4>
            {x.act.map(([e, t]) => (
              <div key={t}>
                <div className="act" aria-hidden>{e}</div>
                <span className="et">{t}</span>
              </div>
            ))}
          </Link>
        ))}
      </div>

      <div className="n-pie">
        <b>5 horas pedagógicas diarias.</b> Es la jornada que corresponde a Inicial;
        en Primaria son 6 y en Secundaria 7. El sistema usa ese dato para calcular las
        900 horas mínimas del año que exige la norma para este nivel.
      </div>
    </>
  );
}

/* ------------------------------------------------------------- estrellas */
export function Estrellas2() {
  const medallas = [
    { em: '📚', t: 'Escucho cuentos', g: true, c: 'c-naranja' },
    { em: '🤝', t: 'Comparto', g: true, c: 'c-morado' },
    { em: '🧹', t: 'Ordeno mis cosas', g: true, c: 'c-verde' },
    { em: '🔢', t: 'Cuento hasta 10', g: true, c: 'c-azul' },
    { em: '🎨', t: 'Pinto bonito', g: true, c: 'c-rosa' },
    { em: '🌎', t: 'Digo colores en inglés', g: false, c: 'c-cian' },
    { em: '✂️', t: 'Recorto solita', g: false, c: 'c-naranja' },
    { em: '👟', t: 'Me amarro los pasadores', g: false, c: 'c-verde' },
  ];
  const ganadas = medallas.filter((m) => m.g).length;
  return (
    <>
      <div className="n-saludo">
        <div className="gran-cara" aria-hidden>⭐</div>
        <div>
          <h1>Mis estrellas</h1>
          <p>Tienes <b>{ganadas} de {medallas.length}</b> medallas. ¡Vas muy bien!</p>
        </div>
        <div className="hoy">
          <span>Esta semana</span>
          <b>13 ⭐</b>
        </div>
      </div>

      <div className="n-caja" style={{ marginBottom: 18 }}>
        <h2><IcMedalla />Mis medallas</h2>
        <div className="n-medallas">
          {medallas.map((m) => (
            <Link key={m.t} to={`/inicial/estrellas/${m.t.toLowerCase().replace(/ /g, '-')}`} className={`n-medalla${m.g ? '' : ' gris'}`}>
              <span className={`disco ${m.c}`} aria-hidden>{m.em}</span>
              <b>{m.t}</b>
            </Link>
          ))}
        </div>
      </div>

      <div className="n-caja">
        <h2><IcEstrella llena />Mis estrellas de la semana</h2>
        {AREAS.map((a) => (
          <div key={a.slug} className="ini-fila" style={{ marginBottom: 10 }}>
            <span className="em" aria-hidden>{a.em}</span>
            <span className="txt">
              <b>{a.nom}</b>
              <span>{a.area}</span>
            </span>
            <span className="der"><Estrellas n={a.estrellas} tam={26} /></span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------- asistencia */
export function Asistencia() {
  const dias = [
    ['L', 1, 'si'], ['M', 2, 'si'], ['M', 3, 'si'], ['J', 4, 'si'], ['V', 5, 'si'],
    ['L', 8, 'si'], ['M', 9, 'si'], ['M', 10, 'no'], ['J', 11, 'si'], ['V', 12, 'si'],
    ['L', 15, 'si'], ['M', 16, 'si'], ['M', 17, 'si'], ['J', 18, 'si'], ['V', 19, 'si'],
    ['L', 22, 'si'], ['M', 23, 'si'], ['M', 24, 'si'], ['J', 25, 'si'], ['V', 28, 'si'],
  ];
  const vine = dias.filter((d) => d[2] === 'si').length;
  return (
    <>
      <div className="n-saludo">
        <div className="gran-cara" aria-hidden>📅</div>
        <div>
          <h1>Mis días</h1>
          <p>Viniste <b>{vine} de {dias.length} días</b> este mes.</p>
        </div>
        <div className="hoy">
          <span>Asistencia</span>
          <b>{Math.round((vine / dias.length) * 100)} %</b>
        </div>
      </div>

      <div className="n-caja">
        <h2><IcCalendario />Setiembre</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 11 }}>
          {dias.map(([d, n, v], i) => (
            <Link key={i} to={`/inicial/asistencia/${n}`} className="ini-dia" style={{ padding: '14px 8px' }}>
              <h4>{d} {n}</h4>
              <div className="act" aria-hidden>{v === 'si' ? '😀' : '🤒'}</div>
              <span className="et">{v === 'si' ? 'Vine' : 'Falté'}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="n-aviso ok" style={{ marginTop: 18 }}>
        <span className="em" aria-hidden>👏</span>
        <div>El 10 faltaste porque estabas enfermita. Tu mamá ya avisó, así que está justificado.</div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------- familia */
export function ParaFamilia() {
  return (
    <>
      <h1 style={{ fontSize: 26, fontWeight: 900, color: 'var(--az-900)', marginBottom: 6 }}>Para mi familia</h1>
      <p style={{ fontSize: 15, color: 'var(--txt-2)', fontWeight: 600, marginBottom: 20 }}>
        Esta pantalla es para el adulto. Aquí está el registro oficial del bimestre III.
      </p>

      <div className="n-rejilla n-23" style={{ marginBottom: 18 }}>
        <div className="n-caja">
          <h2><IcLibro />Logro por área</h2>
          <table className="tabla" style={{ fontSize: 13.5 }}>
            <thead>
              <tr>
                <th>Área curricular</th>
                <th style={{ textAlign: 'center', width: 90 }}>Logro</th>
                <th style={{ width: '45%' }}>Conclusión de la docente</th>
              </tr>
            </thead>
            <tbody>
              {AREAS.map((a) => (
                <tr key={a.slug}>
                  <td><b>{a.area}</b></td>
                  <td className="c"><span className={`lit lit-${a.lit}`}>{a.lit}</span></td>
                  <td style={{ fontSize: 12.5, color: 'var(--txt-2)' }}>
                    {a.lit === 'AD' ? 'Supera lo esperado para su edad: narra con secuencia y amplía vocabulario.'
                      : a.lit === 'A' ? 'Logra lo esperado para su edad con apoyo puntual de la docente.'
                        : 'Está en proceso: reconoce con ayuda y necesita más práctica.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="nota-pie" style={{ fontSize: 12.5 }}>
            En Inicial no se registra nota numérica. El sistema solo admite AD, A, B o C
            acompañado de la conclusión descriptiva, que es lo que exige el CNEB para este nivel.
          </div>
        </div>

        <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
          <div className="n-caja">
            <h2>Datos del aula</h2>
            <dl className="lista-def" style={{ fontSize: 13 }}>
              <dt>Salón</dt><dd>Inicial 5 años · A-03</dd>
              <dt>Docente</dt><dd>María Reynalda Acuña</dd>
              <dt>Niños en el aula</dt><dd>5</dd>
              <dt>Jornada</dt><dd>8:00 a 12:30</dd>
              <dt>Asistencia</dt><dd>95 %</dd>
            </dl>
          </div>
          <div className="n-aviso sol">
            <span className="em" aria-hidden>📣</span>
            <div>
              <b>Entrega de boletas:</b> sábado 10 de octubre, 9:00 a 12:00, en el aula A-03.
            </div>
          </div>
        </div>
      </div>

      <div className="n-caja">
        <h2><IcFamilia />Nota de la docente</h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--txt)', fontWeight: 600 }}>
          Camila se ha integrado muy bien al grupo. Participa en las rutinas, comparte los materiales
          y ya narra lo que hizo el día anterior con secuencia. En psicomotricidad conviene reforzar el
          recorte con tijera, que todavía le cuesta. Agradeceré practicar en casa, 10 minutos al día,
          con papel grueso.
        </p>
        <div style={{ marginTop: 16, fontSize: 13, color: 'var(--txt-3)', fontWeight: 700 }}>
          María Reynalda Acuña Montalvan · docente de Inicial · {IE.nombre}
        </div>
      </div>
    </>
  );
}
