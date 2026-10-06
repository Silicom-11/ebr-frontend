/* ===========================================================================
   Portal del estudiante de Primaria (6 a 11 años).

   Aquí el niño ya lee, así que la pantalla puede sostener más información:
   avance por curso, notas con su equivalencia literal, tareas y horario.
   Sigue siendo redondeada y con color, pero con la estructura de una
   aplicación real, no de un juego.
   =========================================================================== */
import { Link, useParams } from 'react-router-dom';
import { ArmazonNino } from '../componentes/Armazon.jsx';
import {
  IcEstrella, IcIzq, IcCasa, IcLibro, IcCalendario, IcCheck, IcMedalla,
  IcNota, IcPortapapeles, IcCampana,
} from '../componentes/Iconos.jsx';
import { ALU_PRIMARIA, IE, literal } from '../datos/institucion.js';

export const MENU_PRIMARIA = [
  { a: '/primaria', t: 'Mi día', exacto: true, ico: IcCasa },
  { a: '/primaria/cursos', t: 'Mis cursos', ico: IcLibro },
  { a: '/primaria/notas', t: 'Mis notas', ico: IcNota },
  { a: '/primaria/horario', t: 'Mi horario', ico: IcCalendario },
  { a: '/primaria/tareas', t: 'Mis tareas', ico: IcPortapapeles },
  { a: '/primaria/logros', t: 'Mis logros', ico: IcMedalla },
  { a: '/primaria/asistencia', t: 'Mi asistencia', ico: IcCheck },
  { a: '/primaria/comunicados', t: 'Avisos', ico: IcCampana },
];

export function LayoutPrimaria() {
  return <ArmazonNino nivel="primaria" alumno={{ nom: 'Mateo', grado: '3.º grado', nivel: 'Primaria' }} menu={MENU_PRIMARIA} saludo="🦊" />;
}

export const CURSOS = [
  { slug: 'matematica', em: '🔢', nom: 'Matemática',           c: 'azul',    nota: 16, avance: 78, prof: 'Marleny Mendoza' },
  { slug: 'comunicacion', em: '📖', nom: 'Comunicación',        c: 'naranja', nota: 18, avance: 85, prof: 'Marleny Mendoza' },
  { slug: 'ciencia', em: '🔬', nom: 'Ciencia y Tecnología',     c: 'verde',   nota: 15, avance: 72, prof: 'Marleny Mendoza' },
  { slug: 'personal-social', em: '🌎', nom: 'Personal Social',  c: 'morado',  nota: 17, avance: 80, prof: 'Marleny Mendoza' },
  { slug: 'ingles', em: '🇬🇧', nom: 'Inglés',                   c: 'cian',    nota: 13, avance: 65, prof: 'Marleny Mendoza' },
];

const Estrellas = ({ nota, tam = 19 }) => {
  const n = nota >= 18 ? 5 : nota >= 16 ? 4 : nota >= 14 ? 3 : nota >= 11 ? 2 : 1;
  return (
    <div className="estrellas">
      {Array.from({ length: 5 }, (_, i) => (
        <IcEstrella key={i} llena={i < n} style={{ color: i < n ? '#FFCC2A' : '#CFDEEF', width: tam, height: tam }} />
      ))}
    </div>
  );
};

const TarjetaCurso = ({ c }) => (
  <Link to={`/primaria/cursos/${c.slug}`} className="n-curso">
    <span className={`nota lit-${literal(c.nota)}`}>{c.nota}</span>
    <span className={`ic c-${c.c}`} aria-hidden>{c.em}</span>
    <h3>{c.nom}</h3>
    <div className="prof">{c.prof}</div>
    <Estrellas nota={c.nota} />
    <div className="avance">
      <div className="et"><span>Avance del bimestre</span><span>{c.avance} %</span></div>
      <div className="pista"><i className={`f-${c.c}`} style={{ width: `${c.avance}%` }} /></div>
    </div>
  </Link>
);

/* ------------------------------------------------------------- mi día */
export function MiDia() {
  const prom = (CURSOS.reduce((a, c) => a + c.nota, 0) / CURSOS.length).toFixed(1);
  return (
    <>
      <div className="n-saludo">
        <div className="gran-cara" aria-hidden>🦊</div>
        <div>
          <h1>¡Hola, Mateo!</h1>
          <p>Tu promedio del bimestre es <b>{prom}</b>. Vas en <b>logro esperado</b>.</p>
        </div>
        <div className="hoy">
          <span>Hoy</span>
          <b>Martes 6</b>
          <span>Octubre</span>
        </div>
      </div>

      <div className="n-rejilla n-23" style={{ marginBottom: 18 }}>
        <div className="n-caja">
          <h2><IcCalendario />Hoy toca<Link to="/primaria/horario" className="pico">Ver mi horario</Link></h2>
          <div className="n-horario" style={{ gridTemplateColumns: '1fr' }}>
            <div className="col hoy">
              {[['🔢', 'Matemática', '07:45'], ['📖', 'Comunicación', '08:30'], ['☕', 'Recreo', '10:00'],
                ['🔬', 'Ciencia y Tecnología', '10:20'], ['🇬🇧', 'Inglés', '11:05']].map(([e, t, h]) => (
                <div key={t} className={`blo ${t === 'Recreo' ? 'rec' : `c-${CURSOS.find((c) => c.nom === t)?.c || 'azul'}`}`}>
                  <span className="em" aria-hidden>{e}</span>
                  <span>{t}<br /><span style={{ fontWeight: 600, opacity: .7, fontSize: 11 }}>{h}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
          <div className="n-aviso sol">
            <span className="em" aria-hidden>📌</span>
            <div>Mañana entregas la <b>maqueta del sistema solar</b> de Ciencia.</div>
          </div>
          <div className="n-caja">
            <h2><IcMedalla />Mi racha</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 44 }} aria-hidden>🔥</span>
              <div>
                <div style={{ fontSize: 27, fontWeight: 900, color: 'var(--az-900)', lineHeight: 1 }}>12 días</div>
                <div style={{ fontSize: 13, color: 'var(--txt-2)', fontWeight: 700 }}>sin faltar ni llegar tarde</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: 19, fontWeight: 900, color: 'var(--az-900)', marginBottom: 14 }}>Mis cursos</h2>
      <div className="n-rejilla n-3">
        {CURSOS.map((c) => <TarjetaCurso key={c.slug} c={c} />)}
      </div>
    </>
  );
}

/* ------------------------------------------------------------- cursos */
export function Cursos() {
  return (
    <>
      <h1 style={{ fontSize: 25, fontWeight: 900, color: 'var(--az-900)', marginBottom: 6 }}>Mis cursos</h1>
      <p style={{ fontSize: 14.5, color: 'var(--txt-2)', fontWeight: 600, marginBottom: 20 }}>
        Tercero de Primaria lleva 5 áreas. Desde 5.º grado se suma Razonamiento Matemático.
      </p>
      <div className="n-rejilla n-3">
        {CURSOS.map((c) => <TarjetaCurso key={c.slug} c={c} />)}
      </div>
      <div className="n-pie">
        <b>Para la familia:</b> el avance del bimestre sale de la cobertura curricular que registra
        la docente. Si un curso se queda atrás, la Dirección lo ve en su tablero antes de que termine el periodo.
      </div>
    </>
  );
}

export function Curso() {
  const { slug } = useParams();
  const c = CURSOS.find((x) => x.slug === slug) || CURSOS[0];
  const comps = [
    { t: 'Resuelve problemas de cantidad', n: 17 },
    { t: 'Resuelve problemas de regularidad y cambio', n: 15 },
    { t: 'Resuelve problemas de forma y movimiento', n: null },
    { t: 'Resuelve problemas de gestión de datos', n: 16 },
  ];
  return (
    <>
      <Link to="/primaria/cursos" className="n-volver"><IcIzq />Volver a mis cursos</Link>

      <div className="n-saludo" style={{ marginBottom: 18 }}>
        <div className="gran-cara" style={{ background: 'none', boxShadow: 'none', fontSize: 48 }} aria-hidden>{c.em}</div>
        <div>
          <h1>{c.nom}</h1>
          <p>Profesora {c.prof} · bimestre III</p>
        </div>
        <div className="hoy">
          <span>Mi nota</span>
          <b style={{ fontSize: 26 }}>{c.nota}</b>
          <span>{literal(c.nota) === 'AD' ? 'Destacado' : literal(c.nota) === 'A' ? 'Esperado' : 'En proceso'}</span>
        </div>
      </div>

      <div className="n-rejilla n-23">
        <div className="n-caja">
          <h2><IcNota />Mis competencias</h2>
          {comps.map((x) => (
            <div key={x.t} className="ini-fila" style={{ marginBottom: 10, padding: '14px 18px' }}>
              <span className="txt" style={{ flex: 1 }}>
                <b style={{ fontSize: 15 }}>{x.t}</b>
                <span>{x.n ? `Nota ${x.n} · ${literal(x.n) === 'AD' ? 'logro destacado' : literal(x.n) === 'A' ? 'logro esperado' : 'en proceso'}` : 'Todavía no la hemos trabajado'}</span>
              </span>
              <span className="der">
                {x.n ? <span className={`lit lit-${literal(x.n)}`} style={{ fontSize: 15, height: 30, minWidth: 36 }}>{literal(x.n)}</span>
                  : <span className="lit lit-x" style={{ fontSize: 15, height: 30, minWidth: 36 }}>—</span>}
              </span>
            </div>
          ))}
          <div className="nota-pie" style={{ fontSize: 12.5 }}>
            La tercera competencia aparece sin evaluar porque no entró en los temas de este bimestre.
            Es el mismo dato que la docente ve en su cobertura curricular.
          </div>
        </div>

        <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
          <div className="n-caja">
            <h2>Mi avance</h2>
            <div style={{ fontSize: 34, fontWeight: 900, color: 'var(--az-900)', lineHeight: 1 }}>{c.avance} %</div>
            <div className="avance" style={{ marginTop: 10 }}>
              <div className="pista" style={{ height: 12 }}><i className={`f-${c.c}`} style={{ width: `${c.avance}%` }} /></div>
            </div>
            <div style={{ marginTop: 12 }}><Estrellas nota={c.nota} tam={24} /></div>
          </div>
          <div className="n-aviso az">
            <span className="em" aria-hidden>📘</span>
            <div>Lo que viene: <b>fracciones</b> y repaso de multiplicación.</div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------- notas */
export function Notas() {
  const prom = (CURSOS.reduce((a, c) => a + c.nota, 0) / CURSOS.length).toFixed(1);
  return (
    <>
      <div className="n-saludo">
        <div className="gran-cara" aria-hidden>🎯</div>
        <div>
          <h1>Mis notas</h1>
          <p>Bimestre III · promedio <b>{prom}</b></p>
        </div>
        <div className="hoy">
          <span>Logro</span>
          <b>A</b>
          <span>Esperado</span>
        </div>
      </div>

      <div className="n-caja">
        <h2><IcNota />Bimestre por bimestre</h2>
        <table className="tabla" style={{ fontSize: 13.5 }}>
          <thead>
            <tr>
              <th>Curso</th>
              <th className="c" style={{ width: 70 }}>I</th>
              <th className="c" style={{ width: 70 }}>II</th>
              <th className="c" style={{ width: 70 }}>III</th>
              <th className="c" style={{ width: 70 }}>IV</th>
              <th className="c" style={{ width: 90 }}>Logro</th>
            </tr>
          </thead>
          <tbody>
            {CURSOS.map((c, i) => {
              const b1 = c.nota - 2 + (i % 2);
              const b2 = c.nota - 1;
              return (
                <tr key={c.slug}>
                  <td><b>{c.em} {c.nom}</b></td>
                  <td className="c num">{b1}</td>
                  <td className="c num">{b2}</td>
                  <td className="c num" style={{ fontWeight: 800, color: 'var(--az-800)' }}>{c.nota}</td>
                  <td className="c tenue">—</td>
                  <td className="c"><span className={`lit lit-${literal(c.nota)}`}>{literal(c.nota)}</span></td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>Promedio</td>
              <td className="c">14.2</td>
              <td className="c">14.8</td>
              <td className="c">{prom}</td>
              <td className="c">—</td>
              <td className="c"><span className="lit lit-A">A</span></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="n-aviso ok" style={{ marginTop: 18 }}>
        <span className="em" aria-hidden>📈</span>
        <div>Subiste <b>1,2 puntos</b> respecto al bimestre anterior. ¡Sigue así!</div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------- horario */
export function Horario() {
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const plan = {
    Lunes: ['matematica', 'comunicacion', 'recreo', 'personal-social', 'ciencia', 'ingles'],
    Martes: ['matematica', 'comunicacion', 'recreo', 'ciencia', 'ingles', 'personal-social'],
    Miércoles: ['comunicacion', 'matematica', 'recreo', 'ciencia', 'personal-social', 'ingles'],
    Jueves: ['ingles', 'matematica', 'recreo', 'comunicacion', 'ciencia', 'personal-social'],
    Viernes: ['personal-social', 'ciencia', 'recreo', 'matematica', 'comunicacion', 'ingles'],
  };
  return (
    <>
      <h1 style={{ fontSize: 25, fontWeight: 900, color: 'var(--az-900)', marginBottom: 6 }}>Mi horario</h1>
      <p style={{ fontSize: 14.5, color: 'var(--txt-2)', fontWeight: 600, marginBottom: 20 }}>
        De lunes a viernes, de 7:45 a 12:35. Son 6 horas pedagógicas al día.
      </p>

      <div className="n-horario">
        {dias.map((d) => (
          <div key={d} className={`col${d === 'Martes' ? ' hoy' : ''}`}>
            <h4>{d}</h4>
            {plan[d].map((s, i) => {
              if (s === 'recreo') return <div key={i} className="blo rec">Recreo</div>;
              const c = CURSOS.find((x) => x.slug === s);
              return (
                <Link key={i} to={`/primaria/cursos/${c.slug}`} className={`blo c-${c.c}`}>
                  <span className="em" aria-hidden>{c.em}</span>
                  <span>{c.nom}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      <div className="n-pie">
        <b>Para la familia:</b> el horario lo construye la Dirección en el módulo M6 y se publica
        a todos los salones a la vez. El docente no puede modificarlo: si necesita un cambio, lo solicita.
      </div>
    </>
  );
}

/* ------------------------------------------------------------- tareas */
export function Tareas() {
  const t = [
    { t: 'Maqueta del sistema solar', c: 'ciencia', cuando: 'Mañana', lista: false },
    { t: 'Ficha de fracciones, páginas 24 y 25', c: 'matematica', cuando: 'Jueves', lista: false },
    { t: 'Leer el cuento "El zorro y las uvas"', c: 'comunicacion', cuando: 'Viernes', lista: false },
    { t: 'Vocabulary: animals (10 palabras)', c: 'ingles', cuando: 'Entregada', lista: true },
    { t: 'Mapa del Perú con sus regiones', c: 'personal-social', cuando: 'Entregada', lista: true },
  ];
  const faltan = t.filter((x) => !x.lista).length;
  return (
    <>
      <div className="n-saludo">
        <div className="gran-cara" aria-hidden>📒</div>
        <div>
          <h1>Mis tareas</h1>
          <p>Te faltan <b>{faltan} tareas</b> por entregar.</p>
        </div>
        <div className="hoy">
          <span>Entregadas</span>
          <b>{t.length - faltan} / {t.length}</b>
        </div>
      </div>

      <div className="n-tareas">
        {t.map((x) => {
          const c = CURSOS.find((y) => y.slug === x.c);
          return (
            <Link key={x.t} to={`/primaria/tareas/${x.c}`} className={`n-tarea${x.lista ? ' lista' : ''}`}>
              <span className="caja">{x.lista && <IcCheck />}</span>
              <span style={{ fontSize: 22 }} aria-hidden>{c.em}</span>
              <span style={{ minWidth: 0 }}>
                <b>{x.t}</b>
                <span>{c.nom}</span>
              </span>
              <span className="cuando" style={{ color: x.lista ? 'var(--k-verde)' : x.cuando === 'Mañana' ? 'var(--riesgo)' : 'var(--txt-2)' }}>
                {x.cuando}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="n-pie">
        <b>Nota de diseño:</b> en Inicial esta pantalla no existe. En ese nivel no se registran
        tareas ni exámenes porque la evaluación es por observación en aula.
      </div>
    </>
  );
}

/* ------------------------------------------------------------- logros */
export function Logros() {
  const m = [
    { em: '📚', t: 'Lector del mes', g: true, c: 'c-naranja' },
    { em: '🎯', t: 'Puntualidad perfecta', g: true, c: 'c-azul' },
    { em: '🔬', t: 'Pequeño científico', g: true, c: 'c-verde' },
    { em: '🤝', t: 'Buen compañero', g: true, c: 'c-morado' },
    { em: '✍️', t: 'Mejor caligrafía', g: true, c: 'c-rosa' },
    { em: '🧮', t: 'As de las tablas', g: false, c: 'c-azul' },
    { em: '🌎', t: 'English star', g: false, c: 'c-cian' },
    { em: '🏅', t: 'Cuadro de honor', g: false, c: 'c-naranja' },
  ];
  return (
    <>
      <div className="n-saludo">
        <div className="gran-cara" aria-hidden>🏆</div>
        <div>
          <h1>Mis logros</h1>
          <p>Tienes <b>{m.filter((x) => x.g).length} de {m.length}</b> insignias este año.</p>
        </div>
        <div className="hoy"><span>Racha</span><b>12 días</b></div>
      </div>

      <div className="n-caja">
        <h2><IcMedalla />Insignias</h2>
        <div className="n-medallas">
          {m.map((x) => (
            <Link key={x.t} to={`/primaria/logros/${x.t.toLowerCase().replace(/ /g, '-')}`} className={`n-medalla${x.g ? '' : ' gris'}`}>
              <span className={`disco ${x.c}`} aria-hidden>{x.em}</span>
              <b>{x.t}</b>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------- asistencia */
export function AsistenciaPri() {
  const dias = Array.from({ length: 20 }, (_, i) => {
    const n = [1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 28][i];
    const est = i === 9 ? 'tarde' : i === 16 ? 'falta' : 'ok';
    return { n, est };
  });
  return (
    <>
      <div className="n-saludo">
        <div className="gran-cara" aria-hidden>📅</div>
        <div>
          <h1>Mi asistencia</h1>
          <p>Viniste <b>19 de 20 días</b> en setiembre.</p>
        </div>
        <div className="hoy"><span>Asistencia</span><b>95 %</b></div>
      </div>

      <div className="n-caja">
        <h2><IcCalendario />Setiembre</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 9 }}>
          {dias.map((d) => (
            <Link key={d.n} to={`/primaria/asistencia/${d.n}`}
              style={{
                aspectRatio: 1, borderRadius: 14, display: 'grid', placeItems: 'center',
                border: '2px solid var(--borde)', background: d.est === 'ok' ? 'var(--k-verde-s)' : d.est === 'tarde' ? '#FDF0DC' : 'var(--riesgo-suave)',
                fontWeight: 900, fontSize: 15,
                color: d.est === 'ok' ? 'var(--k-verde)' : d.est === 'tarde' ? 'var(--k-naranja)' : 'var(--riesgo)',
              }}>
              <div style={{ textAlign: 'center', lineHeight: 1.1 }}>
                <div style={{ fontSize: 19 }} aria-hidden>{d.est === 'ok' ? '✓' : d.est === 'tarde' ? '⏰' : '✕'}</div>
                <div style={{ fontSize: 11, color: 'var(--txt-3)' }}>{d.n}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="leyenda" style={{ marginTop: 14, fontWeight: 700 }}>
          <span><i style={{ background: 'var(--k-verde)' }} />Asistí</span>
          <span><i style={{ background: 'var(--k-naranja)' }} />Llegué tarde</span>
          <span><i style={{ background: 'var(--riesgo)' }} />Falté</span>
        </div>
      </div>

      <div className="n-aviso ok" style={{ marginTop: 18 }}>
        <span className="em" aria-hidden>👍</span>
        <div>Tu falta del 23 está <b>justificada</b>: tu mamá presentó la constancia médica.</div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------- avisos */
export function Comunicados() {
  const c = [
    { em: '📋', t: 'Entrega de boletas del bimestre III', d: '21 de setiembre', txt: 'Sábado 10 de octubre, de 9:00 a 12:00, en el aula con la profesora Marleny.' },
    { em: '🔬', t: 'Feria de ciencias', d: '14 de setiembre', txt: 'Trae tu maqueta del sistema solar el jueves. Materiales: tecnopor, témperas y palitos.' },
    { em: '🥇', t: 'Olimpiada de matemática', d: '02 de setiembre', txt: 'Los alumnos de 3.º a 6.º pueden inscribirse hasta el viernes con su profesora.' },
  ];
  return (
    <>
      <h1 style={{ fontSize: 25, fontWeight: 900, color: 'var(--az-900)', marginBottom: 6 }}>Avisos</h1>
      <p style={{ fontSize: 14.5, color: 'var(--txt-2)', fontWeight: 600, marginBottom: 20 }}>
        Lo que la escuela le manda a tu familia.
      </p>
      {c.map((x) => (
        <Link key={x.t} to={`/primaria/comunicados/${x.t.toLowerCase().replace(/[^a-z]+/g, '-')}`} className="ini-fila">
          <span className="em" aria-hidden>{x.em}</span>
          <span className="txt">
            <b>{x.t}</b>
            <span>{x.txt}</span>
          </span>
          <span className="der" style={{ fontSize: 12.5, color: 'var(--txt-3)', fontWeight: 800 }}>{x.d}</span>
        </Link>
      ))}
      <div className="n-pie">
        Publicados por Dirección desde el módulo M10. El docente no puede emitir comunicados
        oficiales: los redacta y los publica la Dirección. · {IE.nombre}
      </div>
    </>
  );
}
