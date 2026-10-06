/* ===========================================================================
   Portal del docente. Marleny Mendoza Gamonal · 3.º y 4.º de Primaria.

   Lo que aquí NO aparece es tan importante como lo que aparece: no hay
   registro de cursos, ni asignación de docentes, ni matrícula, ni boletas
   oficiales, ni finanzas. El docente trabaja sobre lo que la Dirección ya
   configuró, y únicamente sobre sus dos salones.
   =========================================================================== */
import { Link, useSearchParams } from 'react-router-dom';
import {
  Cabecera, Tarjeta, Metrica, Tabla, Pil, PilEstado, Aviso, Persona, Lit,
  BarraProg, Campo, Selector, Accion, Fichas, Anillo, VerMas, Filtros, Filtro,
  Ctx, CtxCaja, CtxLista, CtxPasos, Herramientas,
} from '../../componentes/ui.jsx';
import {
  IcCheck, IcDer, IcNota, IcPortapapeles, IcAlerta, IcLibro, IcCalendario,
  IcReloj, IcEscudoOk, IcGrafico, IcCandado, IcOjo, IcMas, IcInfo, IcImprimir,
} from '../../componentes/Iconos.jsx';
import {
  DOCENTE_ACTUAL, SALONES, alumnosDe, competencias, notasDe, asistenciaDe,
  literal, PERIODO_ACTUAL, BLOQUES, DIAS_SEM, horarioDe, cssCurso, HORAS_NIVEL,
  PRORROGAS, MESES, PERIODOS,
} from '../../datos/institucion.js';
import { MatrizPermisos } from '../direccion/Direccion.jsx';

const D = DOCENTE_ACTUAL;
const MIS = SALONES.filter((s) => D.salones.includes(s.cod));

/* ------------------------------------------------------------- mi día */
export function MiDia() {
  const hoy = [
    { h: '07:45', c: 'Matemática', s: 'PRI-3', done: true },
    { h: '08:30', c: 'Comunicación', s: 'PRI-3', done: true },
    { h: '09:15', c: 'Matemática', s: 'PRI-4', done: false },
    { h: '10:20', c: 'Ciencia y Tecnología', s: 'PRI-3', done: false },
    { h: '11:05', c: 'Personal Social', s: 'PRI-4', done: false },
  ];
  return (
    <>
      <Cabecera titulo={`Buen día, ${D.corto.split(' ')[0]}`} desc={`${PERIODO_ACTUAL.nom} · martes 6 de octubre. Tiene 3 cursos pendientes de cargar antes del 09/10.`}>
        <Accion a="/docente/evaluacion/semanal" t="Cargar notas" ico={IcNota} estilo="btn-1" />
      </Cabecera>

      <div className="rejilla r-4" style={{ marginBottom: 16 }}>
        <Metrica et="Mis salones" val={MIS.length} nota={MIS.map((s) => s.nom).join(' · ')} icono={IcLibro} a="/docente/mis-cursos" />
        <Metrica et="Mis estudiantes" val={MIS.reduce((a, s) => a + s.alu, 0)} icono={IcPortapapeles} />
        <Metrica et="Carga de notas" val="70" unidad=" %" nota="7 de 10 cursos" pct={70} icono={IcNota} acento a="/docente/evaluacion/semanal" />
        <Metrica et="Días para el cierre" val="3" nota="vence el 09/10" icono={IcAlerta} a="/docente/prorrogas" />
      </div>

      <div className="rejilla r-23">
        <Tarjeta titulo="Mi jornada de hoy" sub="5 horas pedagógicas" acciones={<VerMas a="/docente/horario" t="Ver mi horario" />} pegado>
          <Tabla
            cols={[
              { t: 'Hora', r: (x) => <b>{x.h}</b> },
              { t: 'Curso', r: (x) => x.c },
              { t: 'Salón', al: 'center', r: (x) => <Pil t="info" hijo={x.s} sin /> },
              { t: 'Asistencia', al: 'center', r: (x) => (x.done ? <Pil t="ok" hijo="Tomada" /> : <Link to="/docente/asistencia" className="btn btn-2 btn-s">Tomar</Link>) },
            ]}
            filas={hoy}
          />
        </Tarjeta>

        <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
          <Tarjeta titulo="Pendientes">
            {[['Evaluación semanal · PRI-4 Inglés', '/docente/evaluacion/semanal'],
              ['Conclusiones · PRI-3 Comunicación', '/docente/evaluacion/conclusiones'],
              ['Planificación de octubre', '/docente/planificacion']].map(([t, a]) => (
                <Link key={t} to={a} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 0', borderBottom: '1px solid var(--borde)', fontSize: 13 }}>
                  <IcAlerta style={{ width: 15, height: 15, color: 'var(--alerta)' }} />{t}
                  <IcDer style={{ width: 14, height: 14, marginLeft: 'auto', color: 'var(--txt-3)' }} />
                </Link>
            ))}
          </Tarjeta>
          <Aviso t="info" titulo="¿Falta algo en su menú?">
            Cursos, matrícula, boletas y finanzas son de Dirección.
            <div style={{ marginTop: 9 }}><Link to="/docente/permisos" className="btn btn-2 btn-s">Ver qué puedo hacer</Link></div>
          </Aviso>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------- mis cursos */
export function MisCursos() {
  const filas = MIS.flatMap((s) => s.cursos.map((c) => ({ s, c })));
  return (
    <>
      <Cabecera titulo="Mis cursos" desc="Solo lectura. El plan de estudios lo aprueba la Dirección; aquí se consulta la ficha y se entra a evaluar." />
      <div className="rejilla r-4" style={{ marginBottom: 16 }}>
        <Metrica et="Mis salones" val="2" nota="3.º y 4.º de Primaria" icono={IcLibro} />
        <Metrica et="Mis cursos" val={filas.length} nota="5 áreas por salón" icono={IcPortapapeles} />
        <Metrica et="Mis estudiantes" val="12" nota="9 + 3" icono={IcCheck} />
        <Metrica et="Cursos al día" val="7" unidad={` / ${filas.length}`} pct={70} icono={IcNota} acento />
      </div>

      <div style={{ marginBottom: 16 }}>
        <Aviso t="alerta" titulo="No puede crear ni eliminar cursos.">
          Este módulo es de consulta. Si falta un curso o la asignación está mal, se solicita a Dirección.
        </Aviso>
      </div>
      <Tarjeta titulo={`${filas.length} cursos asignados`} sub="Pulse Evaluar para entrar al registro por competencias" pegado>
        <Tabla
          cols={[
            { t: 'Curso', r: (f) => <b>{f.c}</b> },
            { t: 'Salón', r: (f) => f.s.nom },
            { t: 'Estudiantes', al: 'center', r: (f) => <span className="num">{f.s.alu}</span> },
            { t: 'Competencias', al: 'center', r: (f) => <span className="num">{competencias(f.c).length}</span> },
            { t: 'Carga', al: 'center', r: (_, i) => (i < 7 ? <Pil t="ok" hijo="Al día" /> : <Pil t="alerta" hijo="Pendiente" />) },
            { t: '', al: 'right', r: (f) => <Link to={`/docente/evaluacion/semanal?salon=${f.s.cod}&curso=${encodeURIComponent(f.c)}`} className="btn btn-2 btn-s">Evaluar<IcDer /></Link> },
          ]}
          filas={filas}
        />
      </Tarjeta>
    </>
  );
}

/* ------------------------------------------------------------- horario */
export function Horario() {
  const s = MIS[0];
  const h = horarioDe(s.cod);
  return (
    <>
      <Cabecera titulo="Mi horario" desc="Lo construye la Dirección. Si necesita un cambio, se solicita; no se edita aquí.">
        <Accion a="/docente/horario" t="Imprimir" ico={IcImprimir} />
      </Cabecera>
      <Filtros>
        <Filtro et="Salón" param="salon" opciones={MIS.map((x) => ({ v: x.cod, t: x.nom }))} porDefecto={MIS[0].cod} ancho={160} />
      </Filtros>
      <Tarjeta titulo={s.nom} sub={`${HORAS_NIVEL[s.niv]} horas pedagógicas · aula ${s.aula}`}>
        <div className="tabla-env">
          <table className="horario">
            <thead><tr><th style={{ width: 110 }}>Hora</th>{DIAS_SEM.map((d) => <th key={d}>{d}</th>)}</tr></thead>
            <tbody>
              {BLOQUES.slice(0, HORAS_NIVEL[s.niv] + 1).map((b, i) => (
                <tr key={b}>
                  <td className="hora">{b}</td>
                  {DIAS_SEM.map((d, j) => {
                    const c = h[i][j];
                    return c.rec ? <td key={d} className="b-rec">Recreo</td>
                      : <td key={d} className={cssCurso(c.curso)}><span className="cur">{c.curso}</span></td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Tarjeta>
    </>
  );
}

/* ------------------------------------------------------------- planificación */
export function Planificacion() {
  const filas = MIS.flatMap((s) => s.cursos.map((c) => ({
    s, c, comp: competencias(c).length, sel: competencias(c).length - 1,
  })));
  return (
    <>
      <Cabecera titulo="Planificación mensual" desc="Declare qué competencias va a trabajar este mes en cada curso. De aquí sale su cobertura curricular.">
        <Accion a="/docente/planificacion" t="Guardar" ico={IcCheck} estilo="btn-1" />
      </Cabecera>
      <Filtros>
        <Filtro et="Mes" param="mes" opciones={MESES.map((m) => ({ v: m, t: m }))} porDefecto="Octubre" />
      </Filtros>
      <Tarjeta titulo="Octubre 2026" sub="Marque las competencias que entran en los temas del mes" pegado>
        <Tabla
          cols={[
            { t: 'Salón', r: (f) => <b>{f.s.nom}</b> },
            { t: 'Curso', r: (f) => f.c },
            { t: 'Competencias', al: 'center', r: (f) => <span className="num">{f.comp}</span> },
            { t: 'Seleccionadas', al: 'center', r: (f) => <span className="num" style={{ color: 'var(--az-700)' }}>{f.sel}</span> },
            { t: '', al: 'right', r: (f) => <Link to={`/docente/planificacion/${f.s.cod}/${encodeURIComponent(f.c)}`} className="btn btn-2 btn-s">Seleccionar</Link> },
          ]}
          filas={filas}
        />
      </Tarjeta>
    </>
  );
}

export function Cobertura() {
  return (
    <>
      <Cabecera titulo="Mi cobertura curricular" desc="Cuánto de lo planificado se ha trabajado realmente en sus cursos." />
      <div className="rejilla r-2">
        {MIS.map((s) => (
          <Tarjeta key={s.cod} titulo={s.nom} sub={`${s.cursos.length} áreas`}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <Anillo pct={s.cod === 'PRI-3' ? 78 : 64} tam={96} color={s.cod === 'PRI-3' ? '#3568AB' : '#B36A00'} />
              <div style={{ flex: 1 }}>
                {s.cursos.map((c, i) => (
                  <div key={c} style={{ marginBottom: 9 }}>
                    <div style={{ display: 'flex', fontSize: 12, marginBottom: 3 }}>
                      <span>{c}</span><span style={{ marginLeft: 'auto', color: 'var(--txt-3)' }}>{[85, 72, 60, 90, 55, 70][i]} %</span>
                    </div>
                    <BarraProg pct={[85, 72, 60, 90, 55, 70][i]} tono={[85, 72, 60, 90, 55, 70][i] < 65 ? 'riesgo' : ''} />
                  </div>
                ))}
              </div>
            </div>
          </Tarjeta>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------- evaluación */
export function EvalSemanal() {
  const [sp] = useSearchParams();
  const cod = sp.get('salon') || MIS[0].cod;
  const s = MIS.find((x) => x.cod === cod) || MIS[0];
  const curso = sp.get('curso') ? decodeURIComponent(sp.get('curso')) : s.cursos[0];
  const comps = competencias(curso);
  const datos = notasDe(s.cod, curso);
  return (
    <>
      <Cabecera titulo="Evaluación semanal" desc="Por competencia. Marque solo las que trabajó esta semana; las demás quedan sin evaluar.">
        <Accion a="/docente/evaluacion/semanal" t="Guardar" ico={IcCheck} estilo="btn-1" />
      </Cabecera>
      <Filtros>
        <Filtro et="Salón" param="salon" opciones={MIS.map((x) => ({ v: x.cod, t: x.nom }))} porDefecto={MIS[0].cod} ancho={160} />
        <Filtro et="Curso" param="curso" opciones={s.cursos.map((c) => ({ v: c, t: c }))} porDefecto={s.cursos[0]} ancho={170} />
        <Filtro et="Semana" param="sem" opciones={[1, 2, 3, 4].map((n) => ({ v: String(n), t: `Semana ${n}` }))} porDefecto="2" />
      </Filtros>
      <Tarjeta titulo={`${s.nom} · ${curso}`} sub={`${datos.length} estudiantes · ${comps.length} competencias`} pegado>
        <div className="tabla-env">
          <table className="carga">
            <thead>
              <tr>
                <th className="izq" style={{ width: 40 }}>N.º</th>
                <th className="izq">Estudiante</th>
                {comps.map((c) => <th key={c[0]} title={c[1]}>{c[0]}</th>)}
                <th>Prom.</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((d, i) => (
                <tr key={d.alu.id}>
                  <td className="izq tenue">{i + 1}</td>
                  <td className="izq"><b>{d.alu.completo}</b></td>
                  {d.notas.map((n, j) => (
                    <td key={j}>{n === null ? <span className="celda vac">—</span> : <span className="celda">{n}</span>}</td>
                  ))}
                  <td>{d.prom ? <Lit v={d.lit} /> : <span className="tenue">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Tarjeta>
    </>
  );
}

export function EvalMensual() {
  const datos = notasDe(MIS[0].cod, 'Matemática');
  return (
    <>
      <Cabecera titulo="Evaluación mensual" desc="Consolida sus semanas. Ponderación 70 / 30 definida por la Dirección.">
        <Accion a="/docente/evaluacion/mensual" t="Guardar" ico={IcCheck} estilo="btn-1" />
      </Cabecera>

      <div className="rejilla r-4" style={{ marginBottom: 16 }}>
        <Metrica et="Promedio del salón" val="15.1" nota="logro esperado" icono={IcNota} />
        <Metrica et="En AD" val="2" unidad=" / 9" icono={IcCheck} />
        <Metrica et="En C" val="1" unidad=" / 9" nota="requiere acompañamiento" icono={IcAlerta} acento />
        <Metrica et="Cargado" val="9" unidad=" / 9" pct={100} icono={IcCheck} />
      </div>

      <Tarjeta titulo={`${MIS[0].nom} · Matemática · setiembre`} sub="70 % evaluación semanal · 30 % evaluación mensual" pegado>
        <Tabla
          cols={[
            { t: 'Estudiante', r: (d) => <Persona nom={d.alu.completo} /> },
            { t: 'Semanal (70 %)', al: 'center', r: (d) => <span className="num">{d.prom}</span> },
            { t: 'Mensual (30 %)', al: 'center', r: (d) => <span className="celda">{Math.max(6, d.prom - 1)}</span> },
            { t: 'Promedio', al: 'center', r: (d) => <span className="num" style={{ fontWeight: 800 }}>{Math.round(d.prom * .7 + Math.max(6, d.prom - 1) * .3)}</span> },
            { t: 'Logro', al: 'center', r: (d) => <Lit v={d.lit} /> },
          ]}
          filas={datos}
        />
      </Tarjeta>
    </>
  );
}

export function Conclusiones() {
  const datos = notasDe(MIS[0].cod, 'Comunicación');
  return (
    <>
      <Cabecera titulo="Conclusiones descriptivas" desc="Un texto por estudiante y competencia. Acompañan a la nota en la boleta." />
      <Tarjeta titulo={`${MIS[0].nom} · Comunicación`}>
        {datos.slice(0, 5).map((d) => (
          <div key={d.alu.id} style={{ borderBottom: '1px solid var(--borde)', padding: '13px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 7 }}>
              <Persona nom={d.alu.completo} />
              <span style={{ marginLeft: 'auto' }}><Lit v={d.lit} /></span>
            </div>
            <div className="form"><Campo et="" v="Lee textos breves y explica de qué tratan. Necesita reforzar la escritura de oraciones completas." alto /></div>
          </div>
        ))}
      </Tarjeta>
      <div style={{ marginTop: 15 }}>
        <Aviso t="alerta" titulo="La boleta la emite Dirección.">
          Usted escribe las conclusiones y carga las notas; el documento oficial con firma
          lo genera la Dirección al cerrar el bimestre.
        </Aviso>
      </div>
    </>
  );
}

/* ------------------------------------------------------------- asistencia */
export function Asistencia() {
  const [sp] = useSearchParams();
  const cod = sp.get('salon') || MIS[0].cod;
  const s = MIS.find((x) => x.cod === cod) || MIS[0];
  const al = alumnosDe(s.cod);
  return (
    <>
      <Cabecera titulo="Tomar asistencia" desc="De sus salones y del día de hoy. No puede editar días anteriores sin autorización.">
        <Accion a="/docente/asistencia" t="Guardar" ico={IcCheck} estilo="btn-1" />
      </Cabecera>
      <Filtros>
        <Filtro et="Salón" param="salon" opciones={MIS.map((x) => ({ v: x.cod, t: x.nom }))} porDefecto={MIS[0].cod} ancho={160} />
      </Filtros>
      <Tarjeta titulo={`${s.nom} · martes 6 de octubre`} sub={`${al.length} estudiantes`} pegado>
        <Tabla
          cols={[
            { t: 'N.º', al: 'center', r: (_, i) => <span className="tenue">{i + 1}</span> },
            { t: 'Estudiante', r: (a) => <Persona nom={a.completo} /> },
            { t: 'Presente', al: 'center', r: (a, i) => <span className="celda" style={{ color: i === 2 ? 'var(--txt-3)' : 'var(--ok)' }}>{i === 2 ? '—' : '✓'}</span> },
            { t: 'Tardanza', al: 'center', r: () => <span className="celda vac">—</span> },
            { t: 'Falta', al: 'center', r: (a, i) => <span className="celda" style={{ color: i === 2 ? 'var(--riesgo)' : 'var(--txt-3)' }}>{i === 2 ? '✕' : '—'}</span> },
          ]}
          filas={al}
        />
      </Tarjeta>
    </>
  );
}

export function Incidencias() {
  return (
    <>
      <Cabecera titulo="Incidencias de conducta" desc="Solo de sus estudiantes.">
        <Accion a="/docente/incidencias/nueva" t="Registrar" ico={IcMas} estilo="btn-1" />
      </Cabecera>

      <div className="rejilla r-3" style={{ marginBottom: 16 }}>
        <Metrica et="Registradas este mes" val="2" nota="ambas leves" icono={IcPortapapeles} />
        <Metrica et="Estudiantes implicados" val="2" unidad=" / 12" icono={IcAlerta} />
        <Metrica et="Casos derivados" val="0" nota="ninguno requirió a Dirección" icono={IcCheck} acento />
      </div>

      <div className="rejilla r-23">
        <Tarjeta titulo="Mis registros" sub="3.º y 4.º de Primaria" pegado>
        <Tabla
          cols={[
            { t: 'Fecha', r: (x) => <span className="tenue">{x.f}</span> },
            { t: 'Estudiante', r: (x) => <Persona nom={x.a} sub={x.s} /> },
            { t: 'Tipo', al: 'center', r: (x) => <Pil t="alerta" hijo={x.t} /> },
            { t: 'Hecho', r: (x) => <span className="tenue">{x.h}</span> },
          ]}
          filas={[
            { f: '22/09/2026', a: 'CÁRDENAS ROJAS, Mateo Sebastián', s: 'PRI-3', t: 'Leve', h: 'No trajo el material de trabajo' },
            { f: '15/09/2026', a: 'CHÁVEZ MEZA, Luana Valentina', s: 'PRI-4', t: 'Leve', h: 'Conversación reiterada en clase' },
          ]}
        />
      </Tarjeta>
        <Ctx>
          <CtxCaja titulo="Qué registrar y qué no" ico={IcInfo}>
            <p>Se registra el <b>hecho observable</b>, no una valoración de la persona.
            «No trajo el material» es un hecho; «es desordenado» no lo es.</p>
            <p>Una incidencia moderada o grave notifica a Dirección automáticamente.</p>
          </CtxCaja>
          <CtxCaja titulo="En Inicial no aplica" ico={IcCandado}>
            <p>A los 3, 4 y 5 años el sistema usa el registro de observación de la docente,
            no un parte disciplinario.</p>
          </CtxCaja>
        </Ctx>
      </div>
    </>
  );
}

/* ------------------------------------------------------------- prórrogas */
export function Prorrogas() {
  const mias = PRORROGAS.filter((p) => p.doc === D.corto);
  return (
    <>
      <Cabecera titulo="Mis prórrogas" desc="Si no llega al plazo de carga, solicite una prórroga con el motivo. La resuelve la Dirección.">
        <Accion a="/docente/prorrogas/nueva" t="Solicitar prórroga" ico={IcMas} estilo="btn-1" />
      </Cabecera>
      <div style={{ marginBottom: 16 }}>
        <Aviso t="alerta" titulo="Usted solicita, Dirección aprueba.">
          Es la única acción del flujo de prórrogas que le corresponde al docente.
        </Aviso>
      </div>
      <div className="rejilla r-23">
        <Tarjeta titulo="Mis solicitudes" sub="Historial del año" pegado>
        <Tabla
          cols={[
            { t: 'N.º', r: (p) => <b>{p.id}</b> },
            { t: 'Curso', r: (p) => `${p.salon} · ${p.curso}` },
            { t: 'Motivo', r: (p) => <span className="tenue">{p.motivo}</span> },
            { t: 'Solicitada', al: 'center', r: (p) => <span className="tenue">{p.pide}</span> },
            { t: 'Nuevo plazo', al: 'center', r: (p) => p.hasta },
            { t: 'Estado', al: 'center', r: (p) => <PilEstado v={p.estado} /> },
          ]}
          filas={mias.length ? mias : PRORROGAS.slice(2, 3)}
          vacio="Sin prórrogas solicitadas."
        />
      </Tarjeta>
        <Ctx>
          <CtxCaja titulo="Cuándo pedirla" ico={IcInfo}>
            <p>Cuando un hecho <b>externo y verificable</b> le impidió cubrir las sesiones:
            licencia por salud, capacitación de la UGEL o una actividad institucional que
            desplazó clases.</p>
            <p>Pedirla <b>antes</b> del vencimiento. Después del 09/10 ya no es prórroga.</p>
          </CtxCaja>
          <CtxCaja titulo="Qué pasa si se aprueba" ico={IcCheck}>
            <CtxPasos pasos={[
              'Dirección reabre únicamente ese curso y ese salón.',
              'Usted carga las notas dentro del nuevo plazo.',
              'El sistema vuelve a bloquear al vencer la prórroga.',
            ]} />
          </CtxCaja>
        </Ctx>
      </div>
    </>
  );
}

/* ------------------------------------------------------------- consulta */
export function Calendario() {
  return (
    <>
      <Cabecera titulo="Calendario del año" desc="Solo consulta. La calendarización la configura la Dirección." />

      <div className="rejilla r-4" style={{ marginBottom: 16 }}>
        <Metrica et="Días lectivos del año" val="195" icono={IcCalendario} />
        <Metrica et="Mi jornada" val="6" unidad=" h" nota="Primaria · 1100 h al año" icono={IcReloj} />
        <Metrica et="Periodo en curso" val="III" nota="cierra el 09/10" icono={IcCalendario} acento />
        <Metrica et="Semanas restantes" val="10" nota="hasta fin de año" icono={IcCheck} />
      </div>

      <div className="rejilla r-23">
        <Tarjeta titulo="Periodos del año" sub="Fechas que gobiernan su carga de notas" pegado>
        <Tabla
          cols={[
            { t: 'Periodo', r: (p) => <b>{p.nom}</b> },
            { t: 'Rango', r: (p) => p.rango },
            { t: 'Semanas', al: 'center', r: (p) => <span className="num">{p.semanas}</span> },
            { t: 'Estado', al: 'center', r: (p) => <PilEstado v={p.estado} /> },
          ]}
          filas={PERIODOS}
        />
      </Tarjeta>
        <Ctx>
          <CtxCaja titulo="Vista de solo lectura" ico={IcCandado}>
            <p>Puede consultar los días lectivos para planificar sus sesiones, pero
            <b> no modificar el calendario</b>: la calendarización afecta a toda la
            institución y la configura la Dirección.</p>
          </CtxCaja>
          <CtxCaja titulo="Qué saca de aquí" ico={IcInfo}>
            <CtxPasos pasos={[
              'Cuántas sesiones reales tiene para cubrir sus competencias del mes.',
              'Qué semanas son de gestión y no cuentan como lectivas.',
              'Cuándo cierra el periodo, que es su fecha límite de carga.',
            ]} />
          </CtxCaja>
        </Ctx>
      </div>
    </>
  );
}


export function Reportes() {
  const datos = asistenciaDe(MIS[0].cod);
  return (
    <>
      <Cabecera titulo="Reportes de mis salones" desc="Solo de sus dos salones. El tablero institucional es de Dirección." />
      <div className="rejilla r-3" style={{ marginBottom: 16 }}>
        <Metrica et="Promedio PRI-3" val="15.1" nota="logro esperado" icono={IcNota} />
        <Metrica et="Promedio PRI-4" val="14.6" nota="logro esperado" icono={IcNota} />
        <Metrica et="Asistencia media" val="94" unidad=" %" pct={94} icono={IcCheck} />
      </div>
      <Tarjeta titulo={`Asistencia · ${MIS[0].nom}`} pegado>
        <Tabla
          cols={[
            { t: 'Estudiante', r: (d) => <Persona nom={d.alu.completo} /> },
            { t: 'Asistencias', al: 'center', r: (d) => <span className="num">{d.asis}</span> },
            { t: 'Faltas', al: 'center', r: (d) => <span className="num">{d.falta}</span> },
            { t: '%', r: (d) => <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}><BarraProg pct={d.pct} tono={d.pct < 85 ? 'riesgo' : 'ok'} /><span className="num" style={{ fontSize: 12 }}>{d.pct}</span></div> },
          ]}
          filas={datos}
        />
      </Tarjeta>
    </>
  );
}

export function Permisos() {
  return <MatrizPermisos titulo="Qué puedo hacer" />;
}
