/* ===========================================================================
   Módulos de Dirección distintos de la matrícula.
   =========================================================================== */
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  Cabecera, Tarjeta, Metrica, Tabla, Pil, PilEstado, Aviso, Persona, Lit,
  BarraProg, Campo, Selector, Check, Filtros, Filtro, Accion, Fichas, Vacio,
  Barras, Anillo, BarrasApiladas, Segmento, VerMas,
} from '../../componentes/ui.jsx';
import {
  IcMas, IcCheck, IcDer, IcCarnet, IcNota, IcImprimir, IcDescarga, IcFamilia,
  IcEscudoOk, IcPortapapeles, IcInfo, IcAlerta, IcUsuario, IcUsuarios, IcLibro,
  IcCalendario, IcReloj, IcMoneda, IcCaja, IcTablero, IcGrafico, IcEngrane,
  IcLapiz, IcOjo, IcTraslado, IcLista, IcCandado,
} from '../../componentes/Iconos.jsx';
import {
  IE, SALONES, DOCENTES, ESTUDIANTES, alumnosDe, PERIODOS, PERIODO_ACTUAL,
  ESCALA, COBROS, BECAS, COMUNICADOS, INDICADORES, RIESGO, CARGA_DOCENTE,
  PRORROGAS, INVENTARIO, UTILES, MESES, tipoDia, resumenCalendario, HORAS_NIVEL,
  MINIMO_HORAS, competencias, notasDe, asistenciaDe, literal, BLOQUES, DIAS_SEM,
  horarioDe, cssCurso, FACTORES,
} from '../../datos/institucion.js';
import { vacantes } from '../../datos/matricula.js';
import { PERMISOS as PERMISOS_FILAS } from '../../datos/navegacion.js';

/* =========================================================== M13 · tablero */
export function Tablero() {
  const I = INDICADORES;
  return (
    <>
      <Cabecera
        titulo={`Tablero de indicadores · ${PERIODO_ACTUAL.nom}`}
        desc={`${IE.nombre} · ${IE.distrito}, ${IE.provincia}. Datos al ${PERIODO_ACTUAL.rango.split('–')[1].trim()}.`}
      >
        <Accion a="/direccion/reportes" t="Reportes" ico={IcGrafico} />
        <Accion a="/direccion/tablero/exportar" t="Exportar" ico={IcDescarga} estilo="btn-1" />
      </Cabecera>

      <div className="rejilla r-4" style={{ marginBottom: 16 }}>
        <Metrica et="Estudiantes matriculados" val={I.matriculados} nota={`${I.retirados} retiro en el año`} icono={IcCarnet} a="/direccion/matricula" />
        <Metrica et="Asistencia del mes" val={I.asistencia} unidad=" %" nota="meta institucional 95 %" pct={I.asistencia} icono={IcCheck} a="/direccion/asistencia/reportes" />
        <Metrica et="Carga de notas" val={I.cargaNotas} unidad=" %" nota="cierra el 09/10" pct={I.cargaNotas} icono={IcNota} acento a="/direccion/supervision/panel" />
        <Metrica et="Estudiantes en riesgo" val={I.riesgo} nota="requieren acompañamiento" icono={IcAlerta} a="/direccion/evaluacion/mensual" />
      </div>

      <div className="rejilla r-23" style={{ marginBottom: 16 }}>
        <Tarjeta titulo="Matrícula por nivel" sub="65 estudiantes en 11 salones" acciones={<VerMas a="/direccion/institucion/salones" />}>
          <div style={{ display: 'flex', gap: 26, alignItems: 'center', flexWrap: 'wrap' }}>
            <Anillo pct={100} centro="65" sub="Total" tam={104} color="#1D3E69" />
            <div style={{ flex: 1, minWidth: 220 }}>
              {[['Inicial', 9, '#FFCC2A', true], ['Primaria', 36, '#3568AB', false], ['Secundaria', 20, '#12284A', false]].map(([n, v, c, o]) => (
                <div key={n} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', fontSize: 12.5, fontWeight: 600, marginBottom: 4 }}>
                    <span>{n}</span>
                    <span style={{ marginLeft: 'auto', color: 'var(--txt-3)' }}>{v} · {Math.round((v / 65) * 100)} %</span>
                  </div>
                  <div className="barra-prog"><i style={{ width: `${(v / 65) * 100}%`, background: c }} /></div>
                </div>
              ))}
            </div>
          </div>
        </Tarjeta>

        <Tarjeta titulo="Vacantes libres" sub="209 plazas en total">
          <Anillo pct={31} centro="144" sub="libres" tam={110} color="#12805C" />
          <div className="nota-pie" style={{ textAlign: 'center' }}>31 % de ocupación</div>
        </Tarjeta>
      </div>

      <div className="rejilla r-2" style={{ marginBottom: 16 }}>
        <Tarjeta titulo="Rendimiento por nivel" sub="Promedio del bimestre III">
          <Barras
            datos={[
              { t: 'Inicial', v: 16.2, c: '#FFCC2A' }, { t: '1.º-3.º', v: 14.8 },
              { t: '4.º-6.º', v: 15.3 }, { t: 'VI', v: 13.9 }, { t: 'VII', v: 14.4 },
            ]}
            max={20} etiqueta="Inicial se expresa en literal; aquí se muestra su equivalencia solo para comparar."
          />
        </Tarjeta>
        <Tarjeta titulo="Logro por competencia" sub="Distribución de los 65 estudiantes">
          <BarrasApiladas series={[
            { t: 'AD · destacado', v: 11, c: '#12805C' },
            { t: 'A · esperado', v: 34, c: '#3568AB' },
            { t: 'B · en proceso', v: 15, c: '#FFCC2A', oscuro: true },
            { t: 'C · en inicio', v: 5, c: '#B3261E' },
          ]} />
          <div style={{ marginTop: 18 }}>
            <Aviso t="alerta" titulo="5 estudiantes en C.">
              Concentrados en Matemática de Primaria y Comunicación del ciclo VI.
            </Aviso>
          </div>
        </Tarjeta>
      </div>

      <div className="rejilla r-2">
        <Tarjeta titulo="Estudiantes en riesgo académico" sub="Requieren acompañamiento antes del cierre" acciones={<VerMas a="/direccion/evaluacion/mensual" />} pegado>
          <Tabla
            cols={[
              { t: 'Estudiante', r: (f) => <Persona nom={f.alu} sub={f.salon} /> },
              { t: 'Motivo', r: (f) => <span className="tenue">{f.motivo}</span> },
              { t: 'Prom.', al: 'center', r: (f) => <span className="num" style={{ color: 'var(--riesgo)' }}>{f.nota.toFixed(1)}</span> },
            ]}
            filas={RIESGO}
          />
        </Tarjeta>
        <Tarjeta titulo="Carga de notas por docente" sub="Plazo: 09 de octubre" acciones={<VerMas a="/direccion/supervision/panel" />} pegado>
          <Tabla
            cols={[
              { t: 'Docente', r: (f) => <b>{f.doc}</b> },
              { t: 'Avance', r: (f) => <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}><BarraProg pct={(f.cargado / f.cursos) * 100} tono={f.cargado === f.cursos ? 'ok' : f.cargado / f.cursos < .5 ? 'riesgo' : 'alerta'} /><span className="tenue" style={{ fontSize: 11.5 }}>{f.cargado}/{f.cursos}</span></div> },
              { t: '', al: 'center', r: (f) => (f.cargado === f.cursos ? <Pil t="ok" hijo="Completo" /> : <Pil t="alerta" hijo="Pendiente" />) },
            ]}
            filas={CARGA_DOCENTE}
          />
        </Tarjeta>
      </div>
    </>
  );
}

/* =========================================================== M1 · calendarización */
export function CalConfig() {
  const r = resumenCalendario();
  return (
    <>
      <Cabecera titulo="Configuración del año escolar" desc="Define el periodo lectivo, las semanas de gestión y las horas mínimas por nivel. Todo lo demás del sistema parte de aquí." >
        <Accion a="/direccion/calendarizacion/calendario" t="Ver calendario" ico={IcCalendario} estilo="btn-1" />
      </Cabecera>
      <div className="rejilla r-32">
        <Tarjeta titulo="Parámetros del año">
          <div className="form">
            <Selector et="Año lectivo" v="2026" />
            <Campo et="Inicio de clases" v="02 de marzo de 2026" />
            <Campo et="Fin de clases" v="18 de diciembre de 2026" />
            <Selector et="Periodificación" v="Bimestral (4 periodos)" />
            <Check si>Incluir las semanas de gestión en el cómputo</Check>
            <Check si>Bloquear carga de notas fuera de plazo</Check>
          </div>
        </Tarjeta>
        <div>
          <div className="rejilla r-4" style={{ marginBottom: 16 }}>
            <Metrica et="Días lectivos" val={r.A} nota="tipo A" icono={IcCalendario} />
            <Metrica et="Semanas" val={r.semanas} nota="mínimo 36" icono={IcCalendario} acento />
            <Metrica et="Días de gestión" val={r.B} nota="tipo B" icono={IcPortapapeles} />
            <Metrica et="No laborables" val={r.C + r.F} nota="fines de semana y feriados" icono={IcInfo} />
          </div>
          <Tarjeta titulo="Horas por nivel" sub="Horas lectivas al año según los días tipo A" pegado>
            <Tabla
              cols={[
                { t: 'Nivel', r: (f) => <b>{f[0]}</b> },
                { t: 'Horas diarias', al: 'center', r: (f) => <span className="num">{f[1]}</span> },
                { t: 'Horas al año', al: 'center', r: (f) => <span className="num">{r.A * f[1]}</span> },
                { t: 'Mínimo exigido', al: 'center', r: (f) => <span className="tenue">{MINIMO_HORAS[f[0]]}</span> },
                { t: 'Resultado', al: 'center', r: (f) => (r.A * f[1] >= MINIMO_HORAS[f[0]] ? <Pil t="ok" hijo="Cumple" /> : <Pil t="riesgo" hijo="No cumple" />) },
              ]}
              filas={Object.entries(HORAS_NIVEL)}
            />
          </Tarjeta>
          <div style={{ marginTop: 15 }}>
            <Aviso t="oro" titulo="Inicial tiene el mínimo más bajo.">
              900 horas frente a 1100 de Primaria y 1200 de Secundaria, porque su jornada es de
              5 horas pedagógicas. El sistema lo verifica nivel por nivel, no en conjunto.
            </Aviso>
          </div>
        </div>
      </div>
    </>
  );
}

export function CalAnual() {
  const r = resumenCalendario();
  return (
    <>
      <Cabecera titulo="Calendario anual 2026" desc="A · semana lectiva · B · semana de gestión · C · no laborable · F · feriado.">
        <Accion a="/direccion/calendarizacion/horas" t="Verificar horas" ico={IcEscudoOk} />
        <Accion a="/direccion/calendarizacion/calendario" t="Imprimir" ico={IcImprimir} />
      </Cabecera>
      <div className="leyenda" style={{ marginBottom: 14 }}>
        <span><i style={{ background: '#5285C4' }} />Lectivo ({r.A})</span>
        <span><i style={{ background: '#FFCC2A' }} />Gestión ({r.B})</span>
        <span><i style={{ background: '#EEF1F5' }} />No laborable ({r.C})</span>
        <span><i style={{ background: '#FBE9E7' }} />Feriado ({r.F})</span>
      </div>
      <Tarjeta pegado>
        <div className="cpo" style={{ padding: 17 }}>
          <div className="meses">
            {MESES.map((m, mi) => {
              const prim = new Date(2026, mi, 1);
              const dias = new Date(2026, mi + 1, 0).getDate();
              const off = (prim.getDay() + 6) % 7;
              const lect = Array.from({ length: dias }, (_, d) => tipoDia(new Date(2026, mi, d + 1, 12))).filter((t) => t === 'A').length;
              return (
                <Link key={m} to={`/direccion/calendarizacion/calendario/${mi + 1}`} className="mes-c">
                  <h4>{m}<span>{lect} días</span></h4>
                  <div className="mes-mini">
                    {Array.from({ length: off }, (_, i) => <i key={`o${i}`} style={{ background: 'transparent' }} />)}
                    {Array.from({ length: dias }, (_, d) => {
                      const t = tipoDia(new Date(2026, mi, d + 1, 12));
                      return <i key={d} className={t}>{d + 1}</i>;
                    })}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Tarjeta>
    </>
  );
}

export function CalHoras() {
  const r = resumenCalendario();
  return (
    <>
      <Cabecera titulo="Horas y verificación" desc="Comprueba que cada nivel alcance el mínimo de horas y de semanas que exige la norma." />
      <div className="rejilla r-3" style={{ marginBottom: 16 }}>
        {Object.entries(HORAS_NIVEL).map(([n, h]) => {
          const tot = r.A * h;
          const min = MINIMO_HORAS[n];
          const ok = tot >= min;
          return (
            <Tarjeta key={n} titulo={n} sub={`${h} horas pedagógicas diarias`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <Anillo pct={Math.min(100, (tot / min) * 100)} centro={tot} sub="horas" tam={96} color={ok ? '#12805C' : '#B3261E'} />
                <div>
                  <div style={{ fontSize: 12.5, color: 'var(--txt-2)' }}>Mínimo exigido</div>
                  <div style={{ fontSize: 19, fontWeight: 700 }}>{min} h</div>
                  <div style={{ marginTop: 9 }}>{ok ? <Pil t="ok" hijo={`Supera por ${tot - min} h`} /> : <Pil t="riesgo" hijo="No alcanza" />}</div>
                </div>
              </div>
            </Tarjeta>
          );
        })}
      </div>
      <Tarjeta titulo="Semanas lectivas" sub="La norma exige 36 semanas como mínimo">
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Anillo pct={Math.min(100, (r.semanas / 36) * 100)} centro={r.semanas} sub="semanas" tam={104} color="#1D3E69" />
          <div style={{ flex: 1 }}>
            <Aviso t={r.semanas >= 36 ? 'ok' : 'riesgo'} titulo={r.semanas >= 36 ? 'Cumple.' : 'No alcanza.'}>
              El calendario configurado produce {r.semanas} semanas lectivas y {r.A} días de clase.
            </Aviso>
          </div>
        </div>
      </Tarjeta>
    </>
  );
}

export function CalPeriodos() {
  return (
    <>
      <Cabecera titulo="Periodos del año" desc="Cada bimestre abre y cierra la carga de notas, la asistencia y las boletas.">
        <Accion a="/direccion/calendarizacion/periodos/nuevo" t="Nuevo periodo" ico={IcMas} estilo="btn-1" />
      </Cabecera>
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'Periodo', r: (p) => <b>{p.nom}</b> },
            { t: 'Rango', r: (p) => p.rango },
            { t: 'Meses', r: (p) => <span className="tenue">{p.meses}</span> },
            { t: 'Semanas', al: 'center', r: (p) => <span className="num">{p.semanas}</span> },
            { t: 'Estado', al: 'center', r: (p) => <PilEstado v={p.estado} /> },
            { t: '', al: 'right', r: (p) => <Link to={`/direccion/calendarizacion/periodos/${p.cod}`} className="btn btn-3 btn-s">Abrir<IcDer /></Link> },
          ]}
          filas={PERIODOS}
        />
      </Tarjeta>
    </>
  );
}

/* =========================================================== M2 · institución */
export function Salones() {
  const v = vacantes();
  return (
    <>
      <Cabecera titulo="Niveles, grados y salones" desc="El salón es la unidad de horario, asistencia y evaluación. En Secundaria la institución trabaja con aulas multigrado.">
        <Accion a="/direccion/institucion/salones/nuevo" t="Nuevo salón" ico={IcMas} estilo="btn-1" />
      </Cabecera>
      <Filtros>
        <Filtro et="Nivel" param="nivel" opciones={[{ v: 'todos', t: 'Todos los niveles' }, { v: 'ini', t: 'Inicial' }, { v: 'pri', t: 'Primaria' }, { v: 'sec', t: 'Secundaria' }]} porDefecto="todos" />
        <Filtro et="Ciclo" param="ciclo" opciones={[{ v: 'todos', t: 'Todos' }, { v: 'II', t: 'Ciclo II' }, { v: 'III', t: 'Ciclo III' }, { v: 'IV', t: 'Ciclo IV' }, { v: 'V', t: 'Ciclo V' }, { v: 'VI', t: 'Ciclo VI' }, { v: 'VII', t: 'Ciclo VII' }]} porDefecto="todos" />
      </Filtros>
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'Código', r: (s) => <Link to={`/direccion/institucion/salones/${s.cod}`} className="enl">{s.cod}</Link> },
            { t: 'Salón', r: (s) => <b>{s.nom}</b> },
            { t: 'Nivel', r: (s) => <Pil t={s.niv === 'Inicial' ? 'oro' : 'info'} hijo={s.niv} sin /> },
            { t: 'Ciclo', al: 'center', r: (s) => s.ciclo },
            { t: 'Grados', r: (s) => <span className="tenue">{s.grados.join(' · ')}</span> },
            { t: 'Aula', al: 'center', r: (s) => s.aula },
            { t: 'Áreas', al: 'center', r: (s) => <span className="num">{s.cursos.length}</span> },
            { t: 'Ocupación', r: (s) => <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}><BarraProg pct={s.pct} /><span className="tenue" style={{ fontSize: 11.5 }}>{s.alu}/{s.cap}</span></div> },
            { t: 'Tutor', r: (s) => <span className="tenue">{s.tutor.split(' ').slice(0, 2).join(' ')}</span> },
          ]}
          filas={v}
        />
      </Tarjeta>
      <div style={{ marginTop: 15 }}>
        <Aviso t="info" titulo="Aula multigrado.">
          EBR 1.º-2.º agrupa dos grados y EBR 3.º-5.º agrupa tres. El grado se guarda en cada
          estudiante porque de él dependen la promoción y la boleta; el salón manda en el horario.
        </Aviso>
      </div>
    </>
  );
}

export function SalonFicha() {
  const { cod } = useParams();
  const s = SALONES.find((x) => x.cod === cod) || SALONES[0];
  const al = alumnosDe(s.cod);
  return (
    <>
      <Cabecera titulo={s.nom} desc={`${s.niv} · ciclo ${s.ciclo} · aula ${s.aula} · tutor ${s.tutor}`}>
        <Accion a="/direccion/institucion/salones" t="Volver" />
        <Accion a={`/direccion/horarios?salon=${s.cod}`} t="Ver horario" ico={IcReloj} />
      </Cabecera>
      <div className="rejilla r-4" style={{ marginBottom: 16 }}>
        <Metrica et="Estudiantes" val={s.alu} icono={IcUsuarios} />
        <Metrica et="Áreas o cursos" val={s.cursos.length} icono={IcLibro} />
        <Metrica et="Horas diarias" val={HORAS_NIVEL[s.niv]} icono={IcReloj} />
        <Metrica et="Grados" val={s.grados.length} nota={s.grados.join(' · ')} icono={IcCarnet} />
      </div>
      <div className="rejilla r-23">
        <Tarjeta titulo="Nómina" sub={`${al.length} estudiantes`} pegado>
          <Tabla
            cols={[
              { t: 'N.º', al: 'center', r: (_, i) => <span className="tenue">{i + 1}</span> },
              { t: 'Estudiante', r: (a) => <Persona nom={a.completo} sub={`Cód. ${a.cod}`} /> },
              { t: 'Grado', al: 'center', r: (a) => a.grado },
              { t: 'Sexo', al: 'center', r: (a) => a.sexo },
              { t: 'Estado', al: 'center', r: (a) => <PilEstado v={a.estado} /> },
            ]}
            filas={al}
          />
        </Tarjeta>
        <Tarjeta titulo="Áreas curriculares">
          {s.cursos.map((c) => (
            <div key={c} style={{ padding: '7px 0', borderBottom: '1px solid var(--borde)', fontSize: 13 }}>{c}</div>
          ))}
        </Tarjeta>
      </div>
    </>
  );
}

export function Ciclos() {
  const c = [
    { ciclo: 'II', niv: 'Inicial', grados: '3, 4 y 5 años', salones: 3, alu: 9 },
    { ciclo: 'III', niv: 'Primaria', grados: '1.º y 2.º', salones: 2, alu: 14 },
    { ciclo: 'IV', niv: 'Primaria', grados: '3.º y 4.º', salones: 2, alu: 12 },
    { ciclo: 'V', niv: 'Primaria', grados: '5.º y 6.º', salones: 2, alu: 10 },
    { ciclo: 'VI', niv: 'Secundaria', grados: '1.º y 2.º', salones: 1, alu: 9 },
    { ciclo: 'VII', niv: 'Secundaria', grados: '3.º, 4.º y 5.º', salones: 1, alu: 11 },
  ];
  return (
    <>
      <Cabecera titulo="Ciclos institucionales" desc="Los ciclos coinciden con los del CNEB. La institución trabaja del II al VII." />
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'Ciclo', r: (x) => <b>{x.ciclo}</b> },
            { t: 'Nivel', r: (x) => <Pil t={x.niv === 'Inicial' ? 'oro' : 'info'} hijo={x.niv} sin /> },
            { t: 'Grados', r: (x) => x.grados },
            { t: 'Salones', al: 'center', r: (x) => <span className="num">{x.salones}</span> },
            { t: 'Estudiantes', al: 'center', r: (x) => <span className="num">{x.alu}</span> },
          ]}
          filas={c}
        />
      </Tarjeta>
    </>
  );
}

export function Escala() {
  return (
    <>
      <Cabecera titulo="Escala de calificación" desc="Única para toda la institución. Inicial usa solo el literal; Primaria y Secundaria guardan además la nota numérica." />
      <div className="rejilla r-2">
        <Tarjeta titulo="Escala literal" pegado>
          <Tabla
            cols={[
              { t: 'Literal', al: 'center', r: (e) => <Lit v={e.lit} /> },
              { t: 'Denominación', r: (e) => <b>{e.nom}</b> },
              { t: 'Rango', al: 'center', r: (e) => <span className="num">{e.rango}</span> },
              { t: 'Descripción', r: (e) => <span className="tenue">{e.desc}</span> },
            ]}
            filas={ESCALA}
          />
        </Tarjeta>
        <div>
          <Tarjeta titulo="Reglas por nivel">
            <dl className="lista-def">
              <dt>Inicial</dt><dd>Solo literal. El sistema bloquea la nota numérica.</dd>
              <dt>Primaria</dt><dd>Literal con nota de respaldo de 0 a 20.</dd>
              <dt>Secundaria</dt><dd>Nota de 0 a 20 con equivalencia literal.</dd>
            </dl>
          </Tarjeta>
          <Tarjeta titulo="Ponderación del promedio mensual">
            <dl className="lista-def">
              <dt>Evaluación semanal</dt><dd>70 %</dd>
              <dt>Evaluación mensual</dt><dd>30 %</dd>
              <dt>Promedio bimestral</dt><dd>Media simple de los dos meses</dd>
            </dl>
            <div className="nota-pie">Parámetros fijados por el equipo; pendientes de confirmar con la Dirección.</div>
          </Tarjeta>
        </div>
      </div>
    </>
  );
}

/* =========================================================== M3 · cursos */
export function Cursos() {
  const filas = SALONES.flatMap((s) => s.cursos.map((c) => ({ salon: s, curso: c })));
  return (
    <>
      <Cabecera titulo="Registro de cursos" desc="El plan de estudios lo aprueba la Dirección. El docente trabaja sobre estos cursos; no los crea ni los elimina.">
        <Accion a="/direccion/cursos/nuevo" t="Nuevo curso" ico={IcMas} estilo="btn-1" />
      </Cabecera>
      <Filtros>
        <Filtro et="Nivel" param="nivel" opciones={[{ v: 'todos', t: 'Todos los niveles' }, { v: 'ini', t: 'Inicial' }, { v: 'pri', t: 'Primaria' }, { v: 'sec', t: 'Secundaria' }]} porDefecto="todos" />
        <Filtro et="Salón" param="salon" opciones={[{ v: 'todos', t: 'Todos los salones' }, ...SALONES.map((s) => ({ v: s.cod, t: s.nom }))]} porDefecto="todos" ancho={170} />
      </Filtros>
      <div className="rejilla r-3" style={{ marginBottom: 16 }}>
        <Metrica et="Áreas en Inicial" val="5" nota="iguales en los 3 salones" icono={IcLibro} acento />
        <Metrica et="Áreas en Primaria" val="5 – 6" nota="se suma Raz. Matemático en 5.º" icono={IcLibro} />
        <Metrica et="Cursos en Secundaria" val="14 – 16" nota="por especialidad" icono={IcLibro} />
      </div>
      <Tarjeta titulo={`${filas.length} cursos registrados`} pegado>
        <Tabla
          cols={[
            { t: 'Curso o área', r: (f) => <Link to={`/direccion/cursos/${encodeURIComponent(f.curso)}`} className="enl">{f.curso}</Link> },
            { t: 'Salón', r: (f) => f.salon.nom },
            { t: 'Nivel', r: (f) => <Pil t={f.salon.niv === 'Inicial' ? 'oro' : 'info'} hijo={f.salon.niv} sin /> },
            { t: 'Ciclo', al: 'center', r: (f) => f.salon.ciclo },
            { t: 'Docente', r: (f) => <span className="tenue">{f.salon.tutor.split(' ').slice(0, 2).join(' ')}</span> },
            { t: 'Competencias', al: 'center', r: (f) => <span className="num">{competencias(f.curso).length}</span> },
          ]}
          filas={filas.slice(0, 40)}
        />
      </Tarjeta>
    </>
  );
}

export function CursoFicha() {
  const { nom } = useParams();
  const curso = decodeURIComponent(nom || 'Matemática');
  const comps = competencias(curso);
  return (
    <>
      <Cabecera titulo={curso} desc="Ficha del curso: competencias del CNEB, factores de evaluación y salones donde se dicta.">
        <Accion a="/direccion/cursos" t="Volver" />
        <Accion a={`/direccion/cursos/${encodeURIComponent(curso)}/editar`} t="Editar" ico={IcLapiz} estilo="btn-1" />
      </Cabecera>
      <div className="rejilla r-23">
        <div>
          <Tarjeta titulo="Competencias" sub={`${comps.length} competencias del CNEB`} pegado>
            <Tabla
              cols={[
                { t: 'Cód.', al: 'center', r: (c) => <b>{c[0]}</b> },
                { t: 'Competencia', r: (c) => c[1] },
              ]}
              filas={comps}
            />
          </Tarjeta>
          <Tarjeta titulo="Factores de evaluación">
            {FACTORES.map((f) => <div key={f} style={{ padding: '7px 0', borderBottom: '1px solid var(--borde)', fontSize: 13 }}>{f}</div>)}
            <div className="nota-pie">En Inicial estos factores no se usan: la evaluación es por observación.</div>
          </Tarjeta>
        </div>
        <Tarjeta titulo="Se dicta en">
          {SALONES.filter((s) => s.cursos.includes(curso)).map((s) => (
            <Link key={s.cod} to={`/direccion/institucion/salones/${s.cod}`} style={{ display: 'block', padding: '9px 0', borderBottom: '1px solid var(--borde)' }}>
              <b style={{ fontSize: 13 }}>{s.nom}</b>
              <div style={{ fontSize: 11.5, color: 'var(--txt-3)' }}>{s.niv} · {s.alu} estudiantes</div>
            </Link>
          ))}
        </Tarjeta>
      </div>
    </>
  );
}

export function Asignacion() {
  return (
    <>
      <Cabecera titulo="Asignación de docentes" desc="Define qué docente dicta qué curso en qué salón. Es una decisión de carga laboral y solo la toma la Dirección.">
        <Accion a="/direccion/cursos/asignacion/nueva" t="Nueva asignación" ico={IcMas} estilo="btn-1" />
      </Cabecera>
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'Docente', r: (d) => <Persona nom={d.nom} sub={d.esp} a={`/direccion/usuarios/${d.id}`} /> },
            { t: 'Salones', r: (d) => <span className="tenue">{d.salones.join(' · ')}</span> },
            { t: 'Cursos', al: 'center', r: (d) => <span className="num">{d.cursos}</span> },
            { t: 'Carga', r: (d) => <BarraProg pct={(d.cursos / 15) * 100} /> },
            { t: 'Desde', al: 'center', r: (d) => <span className="tenue">{d.ingreso}</span> },
            { t: 'Estado', al: 'center', r: (d) => <PilEstado v={d.estado} /> },
          ]}
          filas={DOCENTES}
        />
      </Tarjeta>
      <div style={{ marginTop: 15 }}>
        <Aviso t="oro" titulo="Inicial funciona con una sola docente.">
          María Reynalda Acuña dicta las 5 áreas en los 3 salones de Inicial: 15 asignaciones.
          Es el modelo del nivel, no una sobrecarga.
        </Aviso>
      </div>
    </>
  );
}

/* =========================================================== M4 · usuarios */
export function Usuarios() {
  const u = [
    { id: 'U1', nom: IE.titular, rol: 'Dirección', corr: 'direccion@continentalamericano.edu.pe', est: 'Activo' },
    ...DOCENTES.map((d) => ({ id: d.id, nom: d.nom, rol: 'Docente', corr: `${d.corto.toLowerCase().replace(/ /g, '.')}@continentalamericano.edu.pe`, est: d.estado })),
    { id: 'U8', nom: 'Secretaría', rol: 'Personal administrativo', corr: 'secretaria@continentalamericano.edu.pe', est: 'Activo' },
  ];
  return (
    <>
      <Cabecera titulo="Registro de usuarios" desc="Quién entra al sistema y con qué rol. Las familias acceden con el código del estudiante.">
        <Accion a="/direccion/usuarios/nuevo" t="Nuevo usuario" ico={IcMas} estilo="btn-1" />
      </Cabecera>
      <div className="rejilla r-4" style={{ marginBottom: 16 }}>
        <Metrica et="Usuarios activos" val={u.length} icono={IcUsuarios} />
        <Metrica et="Docentes" val={DOCENTES.length} icono={IcPortapapeles} />
        <Metrica et="Accesos de familia" val="58" nota="de 65 estudiantes" pct={89} icono={IcFamilia} />
        <Metrica et="Sin actividad" val="3" nota="más de 60 días" icono={IcAlerta} />
      </div>
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'Usuario', r: (x) => <Persona nom={x.nom} sub={x.corr} a={`/direccion/usuarios/${x.id}`} /> },
            { t: 'Rol', r: (x) => <Pil t={x.rol === 'Dirección' ? 'oro' : 'info'} hijo={x.rol} sin /> },
            { t: 'Estado', al: 'center', r: (x) => <PilEstado v={x.est} /> },
            { t: '', al: 'right', r: (x) => <Link to={`/direccion/usuarios/${x.id}`} className="btn btn-3 btn-s">Abrir<IcDer /></Link> },
          ]}
          filas={u}
        />
      </Tarjeta>
    </>
  );
}

export function UsuarioFicha() {
  const { id } = useParams();
  const d = DOCENTES.find((x) => x.id === id) || DOCENTES[0];
  return (
    <>
      <Cabecera titulo={d.nom} desc={`${d.esp} · en la institución desde ${d.ingreso}`}>
        <Accion a="/direccion/usuarios" t="Volver" />
        <Accion a={`/direccion/usuarios/${d.id}/editar`} t="Editar" ico={IcLapiz} estilo="btn-1" />
      </Cabecera>
      <div className="rejilla r-23">
        <Tarjeta titulo="Datos del usuario">
          <div className="form dos">
            <Campo et="Documento" v={d.dni} />
            <Campo et="Especialidad" v={d.esp} />
            <Campo et="Apellidos y nombres" v={d.nom} full />
            <Campo et="Correo institucional" v={`${d.corto.toLowerCase().replace(/ /g, '.')}@continentalamericano.edu.pe`} full />
            <Selector et="Rol" v="Docente" />
            <Selector et="Estado" v={d.estado} />
          </div>
        </Tarjeta>
        <div>
          <Tarjeta titulo="Carga asignada">
            <dl className="lista-def">
              <dt>Salones</dt><dd>{d.salones.join(' · ')}</dd>
              <dt>Cursos</dt><dd>{d.cursos}</dd>
            </dl>
          </Tarjeta>
          <Tarjeta titulo="Permisos del rol">
            <Aviso t="info">
              El rol Docente no puede crear cursos, matricular ni ver información financiera.
              <div style={{ marginTop: 9 }}><Link to="/permisos" className="btn btn-2 btn-s">Ver la matriz completa</Link></div>
            </Aviso>
          </Tarjeta>
        </div>
      </div>
    </>
  );
}

export function RolesPermisos() {
  return <MatrizPermisos titulo="Roles y permisos" />;
}

/* =========================================================== M6 · horarios */
export function Horarios() {
  const [sp] = useSearchParams();
  const cod = sp.get('salon') || 'PRI-3';
  const s = SALONES.find((x) => x.cod === cod) || SALONES[5];
  const h = horarioDe(s.cod);
  return (
    <>
      <Cabecera titulo="Horario escolar" desc="Lo construye la Dirección y se publica a todos los salones. El docente lo consulta, no lo edita.">
        <Accion a="/direccion/horarios/generar" t="Generar horario" ico={IcEngrane} />
        <Accion a="/direccion/horarios" t="Imprimir" ico={IcImprimir} estilo="btn-1" />
      </Cabecera>
      <Filtros>
        <Filtro et="Salón" param="salon" opciones={SALONES.map((x) => ({ v: x.cod, t: x.nom }))} porDefecto="PRI-3" ancho={170} />
      </Filtros>
      <Tarjeta titulo={s.nom} sub={`${HORAS_NIVEL[s.niv]} horas pedagógicas diarias · aula ${s.aula} · ${s.tutor}`}>
        <div className="tabla-env">
          <table className="horario">
            <thead>
              <tr><th style={{ width: 110 }}>Hora</th>{DIAS_SEM.map((d) => <th key={d}>{d}</th>)}</tr>
            </thead>
            <tbody>
              {BLOQUES.slice(0, HORAS_NIVEL[s.niv] + 1).map((b, i) => (
                <tr key={b}>
                  <td className="hora">{b}</td>
                  {DIAS_SEM.map((d, j) => {
                    const c = h[i][j];
                    return c.rec
                      ? <td key={d} className="b-rec">Recreo</td>
                      : <td key={d} className={cssCurso(c.curso)}><span className="cur">{c.curso}</span><span className="doc">{c.doc}</span></td>;
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

export function Planificacion() {
  const filas = SALONES.slice(0, 8).flatMap((s) => s.cursos.slice(0, 2).map((c) => ({
    s, c, mes: 'Setiembre', comp: competencias(c).length, sel: Math.max(1, competencias(c).length - 1),
    est: Math.random() > .3 ? 'Registrada' : 'Pendiente',
  })));
  return (
    <>
      <Cabecera titulo="Planificación mensual" desc="Cada docente declara qué competencias trabajará en el mes. De ahí sale la cobertura curricular." />
      <Filtros>
        <Filtro et="Mes" param="mes" opciones={MESES.map((m) => ({ v: m, t: m }))} porDefecto="Setiembre" />
        <Filtro et="Nivel" param="nivel" opciones={[{ v: 'todos', t: 'Todos' }, { v: 'ini', t: 'Inicial' }, { v: 'pri', t: 'Primaria' }, { v: 'sec', t: 'Secundaria' }]} porDefecto="todos" />
      </Filtros>
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'Salón', r: (f) => <b>{f.s.nom}</b> },
            { t: 'Área o curso', r: (f) => f.c },
            { t: 'Competencias del curso', al: 'center', r: (f) => <span className="num">{f.comp}</span> },
            { t: 'Seleccionadas', al: 'center', r: (f) => <span className="num" style={{ color: 'var(--az-700)' }}>{f.sel}</span> },
            { t: 'Estado', al: 'center', r: (f) => <Pil t={f.est === 'Registrada' ? 'ok' : 'alerta'} hijo={f.est} /> },
          ]}
          filas={filas}
        />
      </Tarjeta>
      <div style={{ marginTop: 15 }}>
        <Aviso t="info" titulo="No todas las competencias se trabajan cada mes.">
          Es lo normal: el docente selecciona las que entran en los temas del periodo. Las que no
          entran quedan «sin evaluar», y así aparecen en el reporte por competencia.
        </Aviso>
      </div>
    </>
  );
}

export function Cobertura() {
  const filas = SALONES.map((s) => ({
    s, trab: Math.round(60 + Math.random() * 35), comp: s.cursos.length * 3,
  }));
  return (
    <>
      <Cabecera titulo="Cobertura curricular" desc="Qué porcentaje de las competencias programadas se ha trabajado realmente." />
      <div className="rejilla r-3" style={{ marginBottom: 16 }}>
        <Metrica et="Cobertura institucional" val={INDICADORES.cobertura} unidad=" %" pct={INDICADORES.cobertura} icono={IcGrafico} acento />
        <Metrica et="Salones al día" val="7" unidad=" / 11" nota="por encima del 75 %" icono={IcCheck} />
        <Metrica et="Competencias sin trabajar" val="23" nota="en todo el bimestre" icono={IcAlerta} />
      </div>
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'Salón', r: (f) => <b>{f.s.nom}</b> },
            { t: 'Nivel', r: (f) => <Pil t={f.s.niv === 'Inicial' ? 'oro' : 'info'} hijo={f.s.niv} sin /> },
            { t: 'Competencias', al: 'center', r: (f) => <span className="num">{f.comp}</span> },
            { t: 'Cobertura', r: (f) => <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}><BarraProg pct={f.trab} tono={f.trab > 80 ? 'ok' : f.trab < 65 ? 'riesgo' : 'alerta'} /><span className="num" style={{ fontSize: 12 }}>{f.trab} %</span></div> },
          ]}
          filas={filas}
        />
      </Tarjeta>
    </>
  );
}

/* =========================================================== M7 · evaluación */
export function EvalSemanal() {
  const [sp] = useSearchParams();
  const cod = sp.get('salon') || 'PRI-3';
  const curso = sp.get('curso') || 'Matemática';
  const s = SALONES.find((x) => x.cod === cod) || SALONES[5];
  const comps = competencias(curso);
  const datos = notasDe(s.cod, curso);
  const esIni = s.niv === 'Inicial';
  return (
    <>
      <Cabecera titulo="Registro de evaluación semanal" desc="Se evalúa por competencia, no por examen. El docente marca solo las competencias que trabajó esa semana." />
      <Filtros acciones={<><Accion a="/direccion/evaluacion/semanal" t="Guardar" ico={IcCheck} estilo="btn-1" peq /></>}>
        <Filtro et="Salón" param="salon" opciones={SALONES.map((x) => ({ v: x.cod, t: x.nom }))} porDefecto="PRI-3" ancho={160} />
        <Filtro et="Área o curso" param="curso" opciones={s.cursos.map((c) => ({ v: c, t: c }))} porDefecto={s.cursos[0]} ancho={170} />
        <Filtro et="Semana" param="sem" opciones={[1, 2, 3, 4, 5].map((n) => ({ v: String(n), t: `Semana ${n}` }))} porDefecto="3" />
      </Filtros>

      {esIni && (
        <div style={{ marginBottom: 16 }}>
          <Aviso t="oro" titulo="Salón de Inicial.">
            El sistema oculta la nota numérica y solo admite el literal AD, A, B o C.
            Es la regla del nivel: en Inicial no se califica con número.
          </Aviso>
        </div>
      )}

      <Tarjeta titulo={`${s.nom} · ${curso}`} sub={`${datos.length} estudiantes · ${comps.length} competencias`} pegado>
        <div className="tabla-env">
          <table className="carga">
            <thead>
              <tr>
                <th className="izq" style={{ width: 40 }}>N.º</th>
                <th className="izq">Estudiante</th>
                {comps.map((c) => <th key={c[0]} title={c[1]}>{c[0]}</th>)}
                <th>{esIni ? 'Logro' : 'Prom.'}</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((d, i) => (
                <tr key={d.alu.id}>
                  <td className="izq tenue">{i + 1}</td>
                  <td className="izq"><b>{d.alu.completo}</b></td>
                  {d.notas.map((n, j) => (
                    <td key={j}>
                      {n === null
                        ? <span className="celda vac">—</span>
                        : <span className="celda">{esIni ? literal(n) : n}</span>}
                    </td>
                  ))}
                  <td>{d.prom ? <Lit v={d.lit} /> : <span className="tenue">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Tarjeta>
      <div style={{ marginTop: 15 }}>
        <Aviso t="info" titulo="Las celdas con guion son competencias no trabajadas.">
          No son ceros ni notas faltantes: el docente declaró en su planificación mensual que esa
          competencia no entra este periodo.
        </Aviso>
      </div>
    </>
  );
}

export function EvalMensual() {
  const datos = notasDe('PRI-3', 'Matemática');
  return (
    <>
      <Cabecera titulo="Evaluación mensual" desc="Consolida las semanas del mes. Ponderación: 70 % semanal y 30 % evaluación mensual." />
      <Filtros>
        <Filtro et="Salón" param="salon" opciones={SALONES.map((x) => ({ v: x.cod, t: x.nom }))} porDefecto="PRI-3" ancho={160} />
        <Filtro et="Mes" param="mes" opciones={MESES.map((m) => ({ v: m, t: m }))} porDefecto="Setiembre" />
      </Filtros>
      <Tarjeta titulo="3.º Primaria · Matemática · setiembre" pegado>
        <Tabla
          cols={[
            { t: 'Estudiante', r: (d) => <Persona nom={d.alu.completo} sub={`Cód. ${d.alu.cod}`} /> },
            { t: 'Semanal (70 %)', al: 'center', r: (d) => <span className="num">{d.prom}</span> },
            { t: 'Mensual (30 %)', al: 'center', r: (d) => <span className="num">{Math.max(6, d.prom - 1)}</span> },
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
  const datos = notasDe('INI-5', 'Comunicación');
  return (
    <>
      <Cabecera titulo="Conclusiones descriptivas" desc="Texto por competencia y estudiante. En Inicial sustituyen a la nota; en Primaria y Secundaria la acompañan." />
      <Filtros>
        <Filtro et="Salón" param="salon" opciones={SALONES.map((x) => ({ v: x.cod, t: x.nom }))} porDefecto="INI-5" ancho={160} />
        <Filtro et="Área" param="curso" opciones={[{ v: 'Comunicación', t: 'Comunicación' }, { v: 'Matemática', t: 'Matemática' }]} porDefecto="Comunicación" />
      </Filtros>
      <Tarjeta titulo="Inicial 5 años · Comunicación" sub="El literal se guarda junto con el texto">
        {datos.map((d) => (
          <div key={d.alu.id} style={{ borderBottom: '1px solid var(--borde)', padding: '13px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 7 }}>
              <Persona nom={d.alu.completo} />
              <span style={{ marginLeft: 'auto' }}><Lit v={d.lit} /></span>
            </div>
            <div className="form"><Campo et="" v="Narra experiencias con secuencia y amplía su vocabulario. Participa espontáneamente en las rutinas del aula." alto /></div>
          </div>
        ))}
      </Tarjeta>
    </>
  );
}

export function Boletas() {
  return (
    <>
      <Cabecera titulo="Boletas y consolidados" desc="Documento oficial con firma de Dirección. El docente ve la vista previa pero no la emite.">
        <Accion a="/direccion/evaluacion/boletas/generar" t="Generar del bimestre" ico={IcNota} estilo="btn-1" />
      </Cabecera>
      <div className="rejilla r-4" style={{ marginBottom: 16 }}>
        <Metrica et="Boletas generadas" val="0" unidad=" / 65" nota="el bimestre aún no cierra" icono={IcNota} />
        <Metrica et="Notas cargadas" val="83" unidad=" %" pct={83} icono={IcCheck} acento />
        <Metrica et="Conclusiones" val="71" unidad=" %" pct={71} icono={IcPortapapeles} />
        <Metrica et="Cierre" val="09/10" nota="plazo de carga" icono={IcCalendario} />
      </div>
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'Salón', r: (s) => <b>{s.nom}</b> },
            { t: 'Nivel', r: (s) => <Pil t={s.niv === 'Inicial' ? 'oro' : 'info'} hijo={s.niv} sin /> },
            { t: 'Estudiantes', al: 'center', r: (s) => <span className="num">{s.alu}</span> },
            { t: 'Formato', r: (s) => <span className="tenue">{s.niv === 'Inicial' ? 'Solo literal + conclusión' : 'Literal y nota numérica'}</span> },
            { t: '', al: 'right', r: (s) => <Link to={`/direccion/evaluacion/boletas/${s.cod}`} className="btn btn-2 btn-s"><IcOjo />Vista previa</Link> },
          ]}
          filas={SALONES}
        />
      </Tarjeta>
    </>
  );
}

/* =========================================================== M8 · asistencia */
export function Asistencia() {
  const [sp] = useSearchParams();
  const cod = sp.get('salon') || 'INI-5';
  const s = SALONES.find((x) => x.cod === cod) || SALONES[2];
  const al = alumnosDe(s.cod);
  return (
    <>
      <Cabecera titulo="Registro de asistencia" desc="Diario, en la primera hora. En Inicial lo toma la misma docente que dicta todas las áreas.">
        <Accion a="/direccion/asistencia" t="Guardar" ico={IcCheck} estilo="btn-1" />
      </Cabecera>
      <Filtros>
        <Filtro et="Salón" param="salon" opciones={SALONES.map((x) => ({ v: x.cod, t: x.nom }))} porDefecto="INI-5" ancho={160} />
        <Filtro et="Fecha" param="fecha" opciones={[{ v: '06-10', t: 'Martes 6 de octubre' }, { v: '05-10', t: 'Lunes 5 de octubre' }]} porDefecto="06-10" ancho={180} />
      </Filtros>
      <Tarjeta titulo={s.nom} sub={`${al.length} estudiantes · ${s.tutor}`} pegado>
        <Tabla
          cols={[
            { t: 'N.º', al: 'center', r: (_, i) => <span className="tenue">{i + 1}</span> },
            { t: 'Estudiante', r: (a) => <Persona nom={a.completo} sub={`Cód. ${a.cod}`} /> },
            { t: 'Asistió', al: 'center', r: (a, i) => <span className="celda" style={{ color: i === 1 ? 'var(--txt-3)' : 'var(--ok)' }}>{i === 1 ? '—' : '✓'}</span> },
            { t: 'Tardanza', al: 'center', r: () => <span className="celda vac">—</span> },
            { t: 'Falta', al: 'center', r: (a, i) => <span className="celda" style={{ color: i === 1 ? 'var(--riesgo)' : 'var(--txt-3)' }}>{i === 1 ? '✕' : '—'}</span> },
            { t: 'Justificada', al: 'center', r: (a, i) => (i === 1 ? <Pil t="alerta" hijo="Por registrar" /> : <span className="tenue">—</span>) },
          ]}
          filas={al}
        />
      </Tarjeta>
    </>
  );
}

export function Justificaciones() {
  const j = [
    { id: 'JU-21', fecha: '24/09/2026', alu: 'ESPINOZA HUAMÁN, Camila Rafaela', salon: 'INI-5', motivo: 'Constancia médica — fiebre', est: 'Aprobada' },
    { id: 'JU-20', fecha: '23/09/2026', alu: 'CÁRDENAS ROJAS, Mateo Sebastián', salon: 'PRI-3', motivo: 'Cita médica programada', est: 'Aprobada' },
    { id: 'JU-19', fecha: '18/09/2026', alu: 'HUARCAYA PARIONA, Renzo Fabián', salon: 'SEC-VI', motivo: 'Viaje familiar', est: 'Pendiente' },
  ];
  return (
    <>
      <Cabecera titulo="Justificaciones" desc="El docente registra la solicitud; la aprueba la Dirección. Es uno de los permisos que no se delegan." />
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'N.º', r: (x) => <Link to={`/direccion/asistencia/justificaciones/${x.id}`} className="enl">{x.id}</Link> },
            { t: 'Fecha', r: (x) => <span className="tenue">{x.fecha}</span> },
            { t: 'Estudiante', r: (x) => <Persona nom={x.alu} sub={x.salon} /> },
            { t: 'Motivo', r: (x) => x.motivo },
            { t: 'Estado', al: 'center', r: (x) => <PilEstado v={x.est} /> },
            { t: '', al: 'right', r: (x) => (x.est === 'Pendiente' ? <Link to={`/direccion/asistencia/justificaciones/${x.id}`} className="btn btn-1 btn-s">Revisar</Link> : <span className="tenue">—</span>) },
          ]}
          filas={j}
        />
      </Tarjeta>
    </>
  );
}

export function Incidencias() {
  const i = [
    { id: 'IC-14', fecha: '25/09/2026', alu: 'QUISPE ARANDA, Bruno Alessandro', salon: 'SEC-VI', tipo: 'Leve', hecho: 'Uso de celular en clase', doc: 'Marilyn Ramos' },
    { id: 'IC-13', fecha: '22/09/2026', alu: 'OSORIO VEGA, Leonardo Matías', salon: 'PRI-1', tipo: 'Leve', hecho: 'No trajo material de trabajo por tercera vez', doc: 'Gisela Escobar' },
    { id: 'IC-12', fecha: '15/09/2026', alu: 'MAMANI CHOQUE, Santiago Eduardo', salon: 'SEC-VII', tipo: 'Moderada', hecho: 'Discusión con un compañero en el recreo', doc: 'Marilyn Ramos' },
  ];
  return (
    <>
      <Cabecera titulo="Incidencias de conducta" desc="Las registra el docente sobre sus propios estudiantes.">
        <Accion a="/direccion/asistencia/incidencias/nueva" t="Registrar incidencia" ico={IcMas} estilo="btn-1" />
      </Cabecera>
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'N.º', r: (x) => <Link to={`/direccion/asistencia/incidencias/${x.id}`} className="enl">{x.id}</Link> },
            { t: 'Fecha', r: (x) => <span className="tenue">{x.fecha}</span> },
            { t: 'Estudiante', r: (x) => <Persona nom={x.alu} sub={x.salon} /> },
            { t: 'Tipo', al: 'center', r: (x) => <Pil t={x.tipo === 'Leve' ? 'alerta' : 'riesgo'} hijo={x.tipo} /> },
            { t: 'Hecho', r: (x) => <span className="tenue">{x.hecho}</span> },
            { t: 'Registró', r: (x) => <span className="tenue">{x.doc}</span> },
          ]}
          filas={i}
        />
      </Tarjeta>
      <div style={{ marginTop: 15 }}>
        <Aviso t="info" titulo="En Inicial no se registran incidencias de conducta.">
          A los 3, 4 y 5 años el sistema usa el registro de observación de la docente, no un parte disciplinario.
        </Aviso>
      </div>
    </>
  );
}

export function ReportesAsistencia() {
  const [sp] = useSearchParams();
  const cod = sp.get('salon') || 'PRI-3';
  const datos = asistenciaDe(cod);
  const s = SALONES.find((x) => x.cod === cod) || SALONES[5];
  return (
    <>
      <Cabecera titulo="Reportes de asistencia" desc="Acumulado del mes por estudiante. La alerta salta por debajo del 85 %.">
        <Accion a="/direccion/asistencia/reportes/exportar" t="Exportar" ico={IcDescarga} estilo="btn-1" />
      </Cabecera>
      <Filtros>
        <Filtro et="Salón" param="salon" opciones={SALONES.map((x) => ({ v: x.cod, t: x.nom }))} porDefecto="PRI-3" ancho={160} />
        <Filtro et="Mes" param="mes" opciones={MESES.map((m) => ({ v: m, t: m }))} porDefecto="Setiembre" />
      </Filtros>
      <Tarjeta titulo={s.nom} sub="20 días lectivos en el mes" pegado>
        <Tabla
          cols={[
            { t: 'Estudiante', r: (d) => <Persona nom={d.alu.completo} /> },
            { t: 'Asistencias', al: 'center', r: (d) => <span className="num">{d.asis}</span> },
            { t: 'Faltas', al: 'center', r: (d) => <span className="num" style={{ color: d.falta ? 'var(--riesgo)' : undefined }}>{d.falta}</span> },
            { t: 'Tardanzas', al: 'center', r: (d) => <span className="num">{d.tarde}</span> },
            { t: 'Justificadas', al: 'center', r: (d) => <span className="num">{d.just}</span> },
            { t: '%', r: (d) => <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}><BarraProg pct={d.pct} tono={d.pct < 85 ? 'riesgo' : 'ok'} /><span className="num" style={{ fontSize: 12 }}>{d.pct}</span></div> },
          ]}
          filas={datos}
        />
      </Tarjeta>
    </>
  );
}

/* =========================================================== M9 · supervisión */
export function Plazos() {
  return (
    <>
      <Cabecera titulo="Plazos de carga" desc="Fechas límite para que el docente registre notas y conclusiones de cada periodo." />
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'Periodo', r: (p) => <b>{p.nom}</b> },
            { t: 'Rango', r: (p) => p.rango },
            { t: 'Cierre de notas', r: (p) => <span className="tenue">{p.cod === 'III' ? '09/10/2026' : p.cod === 'IV' ? '18/12/2026' : 'cerrado'}</span> },
            { t: 'Estado', al: 'center', r: (p) => <PilEstado v={p.estado} /> },
          ]}
          filas={PERIODOS}
        />
      </Tarjeta>
    </>
  );
}

export function PanelSupervision() {
  return (
    <>
      <Cabecera titulo="Panel de supervisión" desc="Avance de carga por docente, antes de que venza el plazo." />
      <div className="rejilla r-3" style={{ marginBottom: 16 }}>
        <Metrica et="Avance global" val={INDICADORES.cargaNotas} unidad=" %" pct={INDICADORES.cargaNotas} icono={IcNota} acento />
        <Metrica et="Docentes al día" val="3" unidad=" / 6" icono={IcCheck} />
        <Metrica et="Días para el cierre" val="3" nota="vence el 09/10" icono={IcCalendario} />
      </div>
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'Docente', r: (f) => <b>{f.doc}</b> },
            { t: 'Salones', al: 'center', r: (f) => <span className="num">{f.salones}</span> },
            { t: 'Cursos', al: 'center', r: (f) => <span className="num">{f.cursos}</span> },
            { t: 'Cargados', al: 'center', r: (f) => <span className="num">{f.cargado}</span> },
            { t: 'Avance', r: (f) => <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}><BarraProg pct={(f.cargado / f.cursos) * 100} tono={f.cargado === f.cursos ? 'ok' : f.cargado / f.cursos < .5 ? 'riesgo' : 'alerta'} /><span className="num" style={{ fontSize: 12 }}>{Math.round((f.cargado / f.cursos) * 100)} %</span></div> },
            { t: '', al: 'right', r: (f) => (f.cargado < f.cursos ? <Link to="/direccion/supervision/panel" className="btn btn-2 btn-s">Recordar</Link> : <Pil t="ok" hijo="Completo" />) },
          ]}
          filas={CARGA_DOCENTE}
        />
      </Tarjeta>
    </>
  );
}

export function Prorrogas() {
  return (
    <>
      <Cabecera titulo="Prórrogas" desc="El docente la solicita con motivo; la aprueba o la rechaza la Dirección." />
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'N.º', r: (p) => <Link to={`/direccion/supervision/prorrogas/${p.id}`} className="enl">{p.id}</Link> },
            { t: 'Docente', r: (p) => <Persona nom={p.doc} sub={`${p.salon} · ${p.curso}`} /> },
            { t: 'Motivo', r: (p) => <span className="tenue">{p.motivo}</span> },
            { t: 'Solicitada', al: 'center', r: (p) => <span className="tenue">{p.pide}</span> },
            { t: 'Hasta', al: 'center', r: (p) => p.hasta },
            { t: 'Estado', al: 'center', r: (p) => <PilEstado v={p.estado} /> },
            { t: '', al: 'right', r: (p) => (p.estado === 'Pendiente' ? <Link to={`/direccion/supervision/prorrogas/${p.id}`} className="btn btn-1 btn-s">Resolver</Link> : <span className="tenue">—</span>) },
          ]}
          filas={PRORROGAS}
        />
      </Tarjeta>
    </>
  );
}

/* =========================================================== M10 · familia */
export function FamiliaAcademico() {
  const datos = notasDe('PRI-3', 'Matemática');
  return (
    <>
      <Cabecera titulo="Consulta académica" desc="Lo que la familia ve del estudiante. La Dirección puede abrir cualquier ficha; el apoderado, solo la de sus hijos." />
      <Filtros>
        <Filtro et="Estudiante" param="alu" opciones={datos.map((d) => ({ v: d.alu.id, t: d.alu.completo }))} porDefecto={datos[0].alu.id} ancho={240} />
      </Filtros>
      <div className="rejilla r-23">
        <Tarjeta titulo="Notas del bimestre III" pegado>
          <Tabla
            cols={[
              { t: 'Área', r: (c) => <b>{c}</b> },
              { t: 'Nota', al: 'center', r: (c, i) => <span className="num">{14 + (i % 4)}</span> },
              { t: 'Logro', al: 'center', r: (c, i) => <Lit v={literal(14 + (i % 4))} /> },
            ]}
            filas={SALONES[5].cursos}
          />
        </Tarjeta>
        <div>
          <Metrica et="Promedio" val="15.4" nota="logro esperado" icono={IcNota} />
          <div style={{ height: 14 }} />
          <Metrica et="Asistencia" val="95" unidad=" %" pct={95} icono={IcCheck} />
        </div>
      </div>
    </>
  );
}

export function FamiliaAsistencia() {
  return <ReportesAsistencia />;
}

export function FamiliaCuenta() {
  const f = ESTUDIANTES.slice(0, 10).map((e) => ({ e, deuda: e.deuda }));
  return (
    <>
      <Cabecera titulo="Estado de cuenta" desc="Matrícula y pensiones por estudiante. El docente no tiene acceso a esta información." />
      <div className="rejilla r-3" style={{ marginBottom: 16 }}>
        <Metrica et="Recaudado del mes" val="S/ 9 540" nota="53 de 65 pensiones" icono={IcMoneda} />
        <Metrica et="Morosidad" val={INDICADORES.moraPct} unidad=" %" nota={`S/ ${INDICADORES.moraMonto} pendientes`} pct={INDICADORES.moraPct} icono={IcAlerta} acento />
        <Metrica et="Al día" val="53" unidad=" / 65" pct={82} icono={IcCheck} />
      </div>
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'Estudiante', r: (x) => <Persona nom={x.e.completo} sub={x.e.salon} /> },
            { t: 'Matrícula', al: 'center', r: () => <Pil t="ok" hijo="Pagada" /> },
            { t: 'Pensiones', al: 'center', r: (x) => <span className="tenue">{x.deuda ? `${x.deuda / 180} pendiente(s)` : 'al día'}</span> },
            { t: 'Deuda', al: 'right', r: (x) => <span className="num" style={{ color: x.deuda ? 'var(--riesgo)' : 'var(--ok)' }}>S/ {x.deuda.toFixed(2)}</span> },
          ]}
          filas={f}
        />
      </Tarjeta>
    </>
  );
}

export function Comunicados() {
  return (
    <>
      <Cabecera titulo="Comunicados" desc="La comunicación oficial sale de Dirección. El docente no puede publicar.">
        <Accion a="/direccion/familia/comunicados/nuevo" t="Redactar comunicado" ico={IcMas} estilo="btn-1" />
      </Cabecera>
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'Fecha', r: (c) => <span className="tenue">{c.fecha}</span> },
            { t: 'Asunto', r: (c) => <Link to={`/direccion/familia/comunicados/${c.id}`} className="enl">{c.asunto}</Link> },
            { t: 'Dirigido a', r: (c) => <Pil t="info" hijo={c.destino} sin /> },
            { t: 'Apertura', r: (c) => <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}><BarraProg pct={(c.abiertos / c.total) * 100} tono="ok" /><span className="tenue" style={{ fontSize: 11.5 }}>{c.abiertos}/{c.total}</span></div> },
          ]}
          filas={COMUNICADOS}
        />
      </Tarjeta>
      <Tarjeta titulo="Comunicado seleccionado">
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.8px', textTransform: 'uppercase', color: 'var(--txt-3)', marginBottom: 9 }}>
          {COMUNICADOS[0].asunto}
        </div>
        <p style={{ fontSize: 14.5, lineHeight: 1.7 }}>{COMUNICADOS[0].cuerpo}</p>
        <div className="nota-pie">Publicado por Dirección el {COMUNICADOS[0].fecha} · {COMUNICADOS[0].abiertos} de {COMUNICADOS[0].total} familias lo han abierto</div>
      </Tarjeta>
    </>
  );
}

/* =========================================================== M11 · finanzas */
export function Cobros() {
  return (
    <>
      <Cabecera titulo="Configuración de cobros" desc="Define los conceptos y los montos que el módulo de matrícula aplica." />
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'Concepto', r: (c) => <b>{c.concepto}</b> },
            { t: 'Modalidad', r: (c) => c.mod },
            { t: 'Cuándo', r: (c) => <span className="tenue">{c.cuando}</span> },
            { t: 'Monto', al: 'right', r: (c) => (c.monto ? <span className="num">S/ {c.monto.toFixed(2)}</span> : <span className="tenue">—</span>) },
            { t: 'Estado', al: 'center', r: (c) => <PilEstado v={c.estado} /> },
          ]}
          filas={COBROS}
        />
      </Tarjeta>
      <div style={{ marginTop: 15 }}>
        <Aviso t="info" titulo="La institución no cobra cuota de ingreso.">
          Es un dato levantado en la visita; queda explícito para que nadie lo configure por error.
        </Aviso>
      </div>
    </>
  );
}

export function Becas() {
  return (
    <>
      <Cabecera titulo="Becas y descuentos" desc="Se aplican sobre la pensión mensual.">
        <Accion a="/direccion/finanzas/becas/nueva" t="Nuevo descuento" ico={IcMas} estilo="btn-1" />
      </Cabecera>
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'Tipo', r: (b) => <b>{b.tipo}</b> },
            { t: 'Descuento', al: 'center', r: (b) => <Pil t="ok" hijo={b.desc} sin /> },
            { t: 'Beneficiarios', al: 'center', r: (b) => <span className="num">{b.benef}</span> },
            { t: 'Base', r: (b) => <span className="tenue">{b.base}</span> },
          ]}
          filas={BECAS}
        />
      </Tarjeta>
    </>
  );
}

export function Pagos() {
  const f = ESTUDIANTES.slice(0, 14).map((e) => ({ e, deuda: e.deuda }));
  return (
    <>
      <Cabecera titulo="Pagos y morosidad" desc="Seguimiento de la pensión mes a mes.">
        <Accion a="/direccion/finanzas/pagos/registrar" t="Registrar pago" ico={IcMoneda} estilo="btn-1" />
      </Cabecera>
      <div className="rejilla r-4" style={{ marginBottom: 16 }}>
        <Metrica et="Recaudado del mes" val="S/ 9 540" icono={IcMoneda} />
        <Metrica et="Pendiente" val={`S/ ${INDICADORES.moraMonto}`} icono={IcAlerta} acento />
        <Metrica et="Morosidad" val={INDICADORES.moraPct} unidad=" %" pct={INDICADORES.moraPct} icono={IcGrafico} />
        <Metrica et="Estudiantes al día" val="53" unidad=" / 65" pct={82} icono={IcCheck} />
      </div>
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'Estudiante', r: (x) => <Persona nom={x.e.completo} sub={x.e.salon} /> },
            { t: 'Nivel', r: (x) => <Pil t={x.e.nivel === 'Inicial' ? 'oro' : 'info'} hijo={x.e.nivel} sin /> },
            { t: 'Cuotas pendientes', al: 'center', r: (x) => <span className="num">{x.deuda / 180 || 0}</span> },
            { t: 'Deuda', al: 'right', r: (x) => <span className="num" style={{ color: x.deuda ? 'var(--riesgo)' : 'var(--ok)' }}>S/ {x.deuda.toFixed(2)}</span> },
            { t: 'Estado', al: 'center', r: (x) => (x.deuda ? <Pil t="riesgo" hijo="Con deuda" /> : <Pil t="ok" hijo="Al día" />) },
          ]}
          filas={f}
        />
      </Tarjeta>
    </>
  );
}

export function Devoluciones() {
  const d = [
    { id: 'DV-03', fecha: '28/08/2026', alu: 'MEZA GUERRA, Romina Paz', motivo: 'Retiro por cambio de domicilio', monto: 180, est: 'Aprobada' },
    { id: 'DV-02', fecha: '02/07/2026', alu: 'LLANOS CÁRDENAS, Gael Nicolás', motivo: 'Traslado a otra institución', monto: 90, est: 'Aprobada' },
  ];
  return (
    <>
      <Cabecera titulo="Retiros y devoluciones" desc="Cuando un estudiante se retira, el sistema calcula el saldo a favor." />
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'N.º', r: (x) => <b>{x.id}</b> },
            { t: 'Fecha', r: (x) => <span className="tenue">{x.fecha}</span> },
            { t: 'Estudiante', r: (x) => <Persona nom={x.alu} /> },
            { t: 'Motivo', r: (x) => <span className="tenue">{x.motivo}</span> },
            { t: 'Monto', al: 'right', r: (x) => <span className="num">S/ {x.monto.toFixed(2)}</span> },
            { t: 'Estado', al: 'center', r: (x) => <PilEstado v={x.est} /> },
          ]}
          filas={d}
        />
      </Tarjeta>
    </>
  );
}

/* =========================================================== M12 · recursos */
export function Utiles() {
  return (
    <>
      <Cabecera titulo="Lista de útiles" desc="Por nivel. Se publica a las familias desde el portal." />
      <div className="rejilla r-3">
        {Object.entries(UTILES).map(([n, l]) => (
          <Tarjeta key={n} titulo={n} sub={`${l.length} elementos`} acciones={<Accion a={`/direccion/recursos/utiles/${n.toLowerCase()}`} t="Editar" peq />}>
            {l.map((x) => (
              <div key={x} style={{ padding: '7px 0', borderBottom: '1px solid var(--borde)', fontSize: 13 }}>{x}</div>
            ))}
          </Tarjeta>
        ))}
      </div>
    </>
  );
}

export function Bienes() {
  const total = INVENTARIO.reduce((a, b) => a + b.valor, 0);
  return (
    <>
      <Cabecera titulo="Inventario de bienes" desc="Patrimonio de la institución.">
        <Accion a="/direccion/recursos/bienes/nuevo" t="Registrar bien" ico={IcMas} estilo="btn-1" />
      </Cabecera>
      <div className="rejilla r-3" style={{ marginBottom: 16 }}>
        <Metrica et="Bienes registrados" val={INVENTARIO.length} icono={IcCaja} />
        <Metrica et="Valor estimado" val={`S/ ${total.toLocaleString('es-PE')}`} icono={IcMoneda} />
        <Metrica et="En reparación o baja" val="2" icono={IcAlerta} acento />
      </div>
      <Tarjeta pegado>
        <Tabla
          cols={[
            { t: 'Código', r: (b) => <b>{b.cod}</b> },
            { t: 'Bien', r: (b) => b.bien },
            { t: 'Ubicación', r: (b) => <span className="tenue">{b.area}</span> },
            { t: 'Cant.', al: 'center', r: (b) => <span className="num">{b.cant}</span> },
            { t: 'Valor', al: 'right', r: (b) => <span className="num">S/ {b.valor.toLocaleString('es-PE')}</span> },
            { t: 'Estado', al: 'center', r: (b) => <PilEstado v={b.estado} /> },
          ]}
          filas={INVENTARIO}
        />
      </Tarjeta>
    </>
  );
}

/* =========================================================== M13 · reportes */
export function Reportes() {
  const comps = competencias('Matemática');
  return (
    <>
      <Cabecera titulo="Reportes y exportación" desc="Rendimiento por curso, competencia, salón y periodo, y el archivo que exige el SIAGIE." />
      <Filtros>
        <Filtro et="Tipo de reporte" param="tipo" opciones={[{ v: 'comp', t: 'Rendimiento por competencia' }, { v: 'curso', t: 'Rendimiento por curso' }, { v: 'asis', t: 'Asistencia' }]} porDefecto="comp" ancho={200} />
        <Filtro et="Salón" param="salon" opciones={SALONES.map((x) => ({ v: x.cod, t: x.nom }))} porDefecto="SEC-VI" ancho={160} />
        <Filtro et="Bimestre" param="bim" opciones={PERIODOS.map((p) => ({ v: p.cod, t: p.nom }))} porDefecto="III" />
      </Filtros>
      <Tarjeta titulo="Rendimiento por competencia" sub="EBR 1.º-2.º · bimestre III" pegado>
        <Tabla
          cols={[
            { t: 'Cód.', r: (c) => <b>{c[0]}</b> },
            { t: 'Competencia', r: (c) => c[1] },
            { t: 'AD', al: 'center', r: (_, i) => <span className="num">{[1, 0, 0, 2][i]}</span> },
            { t: 'A', al: 'center', r: (_, i) => <span className="num">{[5, 4, 0, 4][i]}</span> },
            { t: 'B', al: 'center', r: (_, i) => <span className="num">{[3, 4, 0, 2][i]}</span> },
            { t: 'C', al: 'center', r: (_, i) => <span className="num">{[0, 1, 0, 1][i]}</span> },
            { t: 'Sin evaluar', al: 'center', r: (_, i) => <span className="num" style={{ color: i === 2 ? 'var(--alerta)' : undefined }}>{[0, 0, 9, 0][i]}</span> },
            { t: 'Promedio', al: 'center', r: (_, i) => (i === 2 ? <span className="tenue">—</span> : <span className="num" style={{ fontWeight: 800 }}>{[15.2, 13.8, 0, 15.9][i]}</span>) },
          ]}
          filas={comps}
        />
      </Tarjeta>
      <div style={{ marginTop: 15 }}>
        <Aviso t="info" titulo="C3 aparece sin evaluar en los nueve estudiantes.">
          No fue trabajada en los temas del bimestre. Es el mismo dato que muestra la cobertura
          curricular, visto desde el resultado.
        </Aviso>
      </div>
      <div className="rejilla r-3" style={{ marginTop: 16 }}>
        {[['SIAGIE · Notas', 'Notas del bimestre en el formato de carga del MINEDU.'],
          ['SIAGIE · Asistencia', 'Asistencia mensual por salón y estudiante.'],
          ['UGEL Chanchamayo', 'Consolidado institucional del periodo.']].map(([t, d]) => (
            <Tarjeta key={t} titulo={t}>
              <p style={{ fontSize: 13, color: 'var(--txt-2)', marginBottom: 13 }}>{d}</p>
              <Accion a={`/direccion/reportes/${t.split(' ')[0].toLowerCase()}`} t="Generar archivo" ico={IcDescarga} />
            </Tarjeta>
        ))}
      </div>
    </>
  );
}

/* =========================================================== matriz de permisos */
export function MatrizPermisos({ titulo = 'Qué puede hacer cada rol' }) {
  return (
    <>
      <Cabecera
        titulo={titulo}
        desc="En una institución de 65 estudiantes y 6 docentes, toda la gestión administrativa la lleva la Dirección. El docente trabaja sobre lo que ya está configurado, y solo sobre sus salones."
      />
      <div style={{ marginBottom: 16 }}>
        <Aviso t="oro" titulo="Corrección aplicada.">
          En la versión anterior el docente aparecía pudiendo crear cursos. No puede: el plan de
          estudios lo aprueba la Dirección.
        </Aviso>
      </div>
      <Tarjeta pegado>
        <div className="tabla-env">
          <table className="comparativa">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Mód.</th>
                <th>Acción</th>
                <th style={{ width: 90, textAlign: 'center' }}>Dirección</th>
                <th style={{ width: 90, textAlign: 'center' }}>Docente</th>
                <th style={{ width: '38%' }}>Por qué</th>
              </tr>
            </thead>
            <tbody>
              {PERMISOS_FILAS.map((p, i) => (
                <tr key={i}>
                  <td className="campo-n">{p.mod}</td>
                  <td><b style={{ fontWeight: 600 }}>{p.accion}</b></td>
                  <td style={{ textAlign: 'center' }}>{p.dir ? <Pil t="ok" hijo="Sí" sin /> : <Pil t="neutro" hijo="No" sin />}</td>
                  <td style={{ textAlign: 'center' }}>{p.doc ? <Pil t="ok" hijo="Sí" sin /> : <Pil t="riesgo" hijo="No" sin />}</td>
                  <td className="tenue">{p.nota}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Tarjeta>
    </>
  );
}
