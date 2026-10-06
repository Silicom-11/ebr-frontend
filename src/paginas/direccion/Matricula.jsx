/* ===========================================================================
   M5 · Matrícula — el flujo que pidió el docente.
   Cada paso del asistente es una ruta propia: /nuevo, /nuevo/estudiante,
   /nuevo/apoderado, /nuevo/salud, /nuevo/documentos, /nuevo/cobros,
   /nuevo/revision y /listo.
   =========================================================================== */
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import {
  Cabecera, Tarjeta, Metrica, Tabla, Pil, PilEstado, Aviso, Persona,
  BarraProg, Campo, Selector, Check, Filtros, Filtro, Accion, Fichas, Lit,
} from '../../componentes/ui.jsx';
import {
  IcMas, IcCheck, IcDer, IcIzq, IcCarnet, IcNota, IcImprimir, IcDescarga,
  IcFamilia, IcEscudoOk, IcPortapapeles, IcInfo, IcTraslado, IcBuscar,
  IcLista, IcAlerta, EscudoSVG, IcUsuario, IcLibro,
} from '../../componentes/Iconos.jsx';
import {
  PASOS, POSTULANTE, APODERADO, AUTORIZADOS, SALUD, DOCUMENTOS, DIFERENCIAS,
  MATRICULAS, vacantes, evaluarEdad, REGLA_EDAD, FECHA_CORTE,
} from '../../datos/matricula.js';
import { IE, SALONES, ESTUDIANTES, alumno, COBROS } from '../../datos/institucion.js';

const R = '/direccion/matricula';

/* =========================================================== 1 · el proceso */
export function Proceso() {
  const v = vacantes();
  const ini = v.filter((s) => s.niv === 'Inicial');
  const resto = v.filter((s) => s.niv !== 'Inicial');

  return (
    <>
      <Cabecera
        titulo="Proceso de matrícula"
        desc={`Año lectivo ${IE.anio}. La matrícula se abre por nivel y el sistema valida la edad cumplida al 31 de marzo antes de asignar el salón.`}
      >
        <Accion a={`${R}/diferencias`} t="Qué cambia según el nivel" ico={IcInfo} />
        <Accion a={`${R}/nuevo`} t="Nueva matrícula" ico={IcMas} estilo="btn-1" />
      </Cabecera>

      <div className="rejilla r-4" style={{ marginBottom: 16 }}>
        <Metrica et="Matriculados" val="65" nota="de 209 vacantes" icono={IcCarnet} pct={31} a={`${R}?estado=todos`} />
        <Metrica et="Inicial" val="9" unidad=" / 39" nota="3, 4 y 5 años" icono={IcFamilia} pct={23} acento a={`${R}?nivel=Inicial`} />
        <Metrica et="Primaria" val="36" unidad=" / 120" nota="1.º a 6.º grado" icono={IcLibro} pct={30} a={`${R}?nivel=Primaria`} />
        <Metrica et="Observadas" val="1" nota="falta documento" icono={IcAlerta} a={`${R}?estado=observado`} />
      </div>

      <Tarjeta
        titulo="Vacantes por salón"
        sub="La capacidad de Inicial es menor por norma de ratio: 12 niños por aula en 3 y 4 años."
        acciones={<Accion a={`${R}/vacantes`} t="Ver detalle" peq />}
      >
        <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--txt-3)', letterSpacing: '.5px', textTransform: 'uppercase', marginBottom: 10 }}>
          Inicial · ratio reducido
        </div>
        <div className="vacantes" style={{ marginBottom: 20 }}>
          {ini.map((s) => (
            <Link key={s.cod} to={`${R}/nuevo?salon=${s.cod}`} className={`vac ini${s.libres <= 0 ? ' lleno' : ''}`}>
              <div className="niv">{s.niv} · ciclo {s.ciclo}</div>
              <b>{s.nom}</b>
              <div className="cifras"><span className="g">{s.libres}</span><span className="p">libres de {s.cap}</span></div>
              <BarraProg pct={s.pct} tono={s.pct > 85 ? 'riesgo' : ''} />
            </Link>
          ))}
        </div>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--txt-3)', letterSpacing: '.5px', textTransform: 'uppercase', marginBottom: 10 }}>
          Primaria y Secundaria
        </div>
        <div className="vacantes">
          {resto.map((s) => (
            <Link key={s.cod} to={`${R}/nuevo?salon=${s.cod}`} className={`vac${s.libres <= 0 ? ' lleno' : ''}`}>
              <div className="niv">{s.niv} · ciclo {s.ciclo}</div>
              <b>{s.nom}</b>
              <div className="cifras"><span className="g">{s.libres}</span><span className="p">libres de {s.cap}</span></div>
              <BarraProg pct={s.pct} tono={s.pct > 85 ? 'riesgo' : ''} />
            </Link>
          ))}
        </div>
      </Tarjeta>

      <Tarjeta
        titulo="Matrículas registradas"
        sub={`${MATRICULAS.length} de 65 · ordenadas por fecha de registro`}
        acciones={<><Accion a={`${R}?orden=nivel`} t="Agrupar por nivel" peq /><Accion a={`${R}/exportar`} t="Exportar" ico={IcDescarga} peq /></>}
        pegado
      >
        <Tabla
          cols={[
            { t: 'N.º de ficha', r: (f) => <Link to={`${R}/${f.id}`} className="enl">{f.id}</Link> },
            { t: 'Fecha', r: (f) => <span className="tenue">{f.fecha}</span> },
            { t: 'Estudiante', r: (f) => <Link to={`${R}/${f.id}`}><Persona nom={f.alu} sub={`${f.niv} · ${f.salon}`} /></Link> },
            { t: 'Salón', al: 'center', r: (f) => <Pil t={f.niv === 'Inicial' ? 'oro' : 'info'} hijo={f.salon} sin /> },
            { t: 'Tipo', al: 'center', r: (f) => <span className="tenue">{f.tipo}</span> },
            { t: 'Estado', al: 'center', r: (f) => <PilEstado v={f.estado} /> },
            { t: '', al: 'right', r: (f) => <Link to={`${R}/${f.id}`} className="btn btn-3 btn-s">Abrir<IcDer /></Link> },
          ]}
          filas={MATRICULAS}
        />
      </Tarjeta>
    </>
  );
}

/* =========================================================== asistente */
function BarraPasos({ actual }) {
  return (
    <nav className="pasos no-imp">
      {PASOS.map((p) => (
        <NavLink key={p.cod} to={p.ruta} end={p.cod === 'nivel'}
          className={`paso ${p.n < actual ? 'hecho' : ''} ${p.n === actual ? 'on' : ''}`}>
          <span className="n">{p.n < actual ? <IcCheck /> : p.n}</span>{p.t}
        </NavLink>
      ))}
    </nav>
  );
}

function Resumen({ paso }) {
  const e = evaluarEdad(POSTULANTE.nacimiento);
  return (
    <aside style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
      <div className="ficha-res">
        <h4>Ficha en curso</h4>
        <div className="fila"><span>Postulante</span><b>{paso >= 2 ? POSTULANTE.completo : 'Por registrar'}</b></div>
        <div className="fila"><span>Nacimiento</span><b>{paso >= 2 ? POSTULANTE.nacimientoTxt : '—'}</b></div>
        <div className="fila"><span>Edad al 31/03</span><b>{paso >= 2 ? `${e.anios} años ${e.meses} meses` : '—'}</b></div>
        <div className="fila"><span>Nivel</span><b>Inicial</b></div>
        <div className="fila"><span>Salón</span><b>{e.regla ? `${e.regla.grado} · ${e.regla.salon}` : '—'}</b></div>
        <div className="fila"><span>Apoderado</span><b>{paso >= 3 ? APODERADO.completo.split(',')[0] : '—'}</b></div>
        <div className="fila"><span>Ficha de salud</span><b>{paso >= 4 ? 'Registrada' : 'Pendiente'}</b></div>
        <div className="fila"><span>Documentos</span><b>{paso >= 5 ? '6 de 7' : '—'}</b></div>
      </div>

      <Tarjeta titulo="Por qué este salón">
        <div className="regla">
          <span className="em" aria-hidden>📅</span>
          <div>
            La edad se cuenta <b>cumplida al 31 de marzo</b> del año lectivo.
            Luana nació el 12/02/2023, así que al 31/03/2026 tiene <b>3 años y 1 mes</b>:
            le corresponde <b>Inicial 3 años</b>. El sistema no deja elegir otro salón.
          </div>
        </div>
      </Tarjeta>
    </aside>
  );
}

export function AsistenteLayout() {
  const loc = useLocation();
  const p = PASOS.find((x) => x.ruta === loc.pathname) || PASOS[0];
  return (
    <>
      <Cabecera
        titulo="Nueva matrícula · Inicial"
        desc="Registro de un estudiante que ingresa por primera vez al sistema educativo."
      >
        <Accion a={R} t="Cancelar" />
      </Cabecera>
      <BarraPasos actual={p.n} />
      <div className="rejilla r-23">
        <div><Outlet /></div>
        <Resumen paso={p.n} />
      </div>
    </>
  );
}

const PieNav = ({ atras, sig, sigT = 'Continuar', nota }) => (
  <div className="pie-pasos no-imp">
    {nota && <span style={{ fontSize: 12, color: 'var(--txt-3)' }}>{nota}</span>}
    <div className="der">
      {atras && <Link to={atras} className="btn btn-2"><IcIzq />Atrás</Link>}
      <Link to={sig} className="btn btn-1">{sigT}<IcDer /></Link>
    </div>
  </div>
);

/* --------------------------------------------------- paso 1 · nivel y salón */
export function PasoNivel() {
  const v = vacantes().filter((s) => s.niv === 'Inicial');
  return (
    <>
      <Tarjeta titulo="1 · Nivel y salón" sub="El nivel define qué datos pedirá el sistema a continuación.">
        <div className="form dos">
          <Selector et="Año lectivo" v="2026" />
          <Selector et="Nivel educativo" v="Inicial" ayuda="Inicial exige ficha de salud y personas autorizadas." />
          <Selector et="Modalidad" v="EBR — Educación Básica Regular" />
          <Selector et="Tipo de ingreso" v="Nuevo · primera vez en el sistema educativo" />
        </div>

        <div style={{ marginTop: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt-2)', display: 'block', marginBottom: 9 }}>
            Salón · se confirma tras validar la edad
          </label>
          <div className="vacantes">
            {v.map((s) => (
              <div key={s.cod} className={`vac ini${s.cod === 'INI-3' ? '' : ''}`}
                style={s.cod === 'INI-3' ? { borderColor: 'var(--az-700)', boxShadow: '0 0 0 2px var(--az-100)' } : { opacity: .55 }}>
                <div className="niv">{s.grados[0]} · aula {s.aula}</div>
                <b>{s.nom}</b>
                <div className="cifras"><span className="g">{s.libres}</span><span className="p">libres de {s.cap}</span></div>
                <BarraProg pct={s.pct} />
                {s.cod === 'INI-3' && <div style={{ marginTop: 9 }}><Pil t="ok" hijo="Le corresponde" /></div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <Aviso t="oro" titulo="Ratio de Inicial.">
            Los salones de 3 y 4 años admiten como máximo 12 niños y el de 5 años, 15.
            Es menor que en Primaria porque la atención es individual. El sistema bloquea
            la matrícula cuando el aula llega al tope.
          </Aviso>
        </div>
      </Tarjeta>
      <PieNav sig={`${R}/nuevo/estudiante`} nota="Paso 1 de 7" />
    </>
  );
}

/* ---------------------------------------- paso 2 · estudiante y edad */
export function PasoEstudiante() {
  const e = evaluarEdad(POSTULANTE.nacimiento);
  return (
    <>
      <Tarjeta titulo="2 · Datos del estudiante" sub="Los campos marcados se validan contra el padrón del RENIEC.">
        <div className="form dos">
          <Selector et="Documento de identidad" v="DNI" />
          <Campo et="Número de documento" v={POSTULANTE.dni} ayuda="Validado contra RENIEC" />
          <Campo et="Apellido paterno" v={POSTULANTE.ape1} />
          <Campo et="Apellido materno" v={POSTULANTE.ape2} />
          <Campo et="Nombres" v={POSTULANTE.nombres} full />
          <Campo et="Fecha de nacimiento" v={POSTULANTE.nacimientoTxt} />
          <Selector et="Sexo" v={POSTULANTE.sexo} />
          <Selector et="Lengua materna" v={POSTULANTE.lengua} />
          <Selector et="Discapacidad o NEE" v={POSTULANTE.discapacidad} ayuda="Si registra, se deriva al SAANEE." />
          <Campo et="Dirección" v={POSTULANTE.direccion} full />
          <Selector et="Distrito" v={POSTULANTE.distrito} />
          <Selector et="Procedencia" v={POSTULANTE.procedencia} />
        </div>
      </Tarjeta>

      <Tarjeta
        titulo="Validación de edad"
        sub={`Regla de matrícula: edad cumplida al ${new Date(FECHA_CORTE + 'T12:00:00').toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })}`}
      >
        <div className="calculo-edad" style={{ marginBottom: 15 }}>
          <div>
            <div className="et">Fecha de nacimiento</div>
            <div className="v">12/02/2023</div>
          </div>
          <div>
            <div className="et">Fecha de corte</div>
            <div className="v">31/03/2026</div>
          </div>
          <div className="ok">
            <div className="et">Edad cumplida</div>
            <div className="v">{e.anios} a · {e.meses} m</div>
          </div>
          <div className="ok">
            <div className="et">Salón que corresponde</div>
            <div className="v">Inicial 3 años</div>
          </div>
        </div>

        <table className="comparativa">
          <thead>
            <tr><th>Salón</th><th>Edad exigida</th><th>Nacidos entre</th><th style={{ width: 120 }}>Resultado</th></tr>
          </thead>
          <tbody>
            {REGLA_EDAD.slice(0, 4).map((r) => {
              const le = r.salon === e.regla?.salon;
              return (
                <tr key={r.salon} className={le ? 'solo-ini' : ''}>
                  <td className="campo-n">{r.nivel} {r.grado}</td>
                  <td>{r.edad} años cumplidos</td>
                  <td className="tenue">{r.desde.split('-').reverse().join('/')} — {r.hasta.split('-').reverse().join('/')}</td>
                  <td>{le ? <Pil t="ok" hijo="Le corresponde" /> : <span style={{ color: 'var(--txt-3)', fontSize: 12 }}>No aplica</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="nota-pie">
          Si la fecha de nacimiento cayera fuera de todos los rangos, el sistema no permite continuar
          y deriva el caso a Dirección. Es el control que evita matricular a un niño en un aula que no le toca.
        </div>
      </Tarjeta>

      <PieNav atras={`${R}/nuevo`} sig={`${R}/nuevo/apoderado`} nota="Paso 2 de 7" />
    </>
  );
}

/* ---------------------------------------- paso 3 · apoderado y recojo */
export function PasoApoderado() {
  return (
    <>
      <Tarjeta titulo="3 · Apoderado" sub="En Inicial el apoderado es obligatorio y debe firmar presencialmente.">
        <div className="form dos">
          <Campo et="DNI del apoderado" v={APODERADO.dni} />
          <Selector et="Parentesco" v={APODERADO.parentesco} />
          <Campo et="Apellidos y nombres" v={APODERADO.completo} full />
          <Campo et="Teléfono" v={APODERADO.telefono} />
          <Campo et="Correo electrónico" v={APODERADO.correo} />
          <Selector et="Ocupación" v={APODERADO.ocupacion} />
          <Selector et="Grado de instrucción" v={APODERADO.grado} />
          <Campo et="Dirección" v={APODERADO.direccion} full />
          <div className="g full">
            <Check si>Vive con la estudiante</Check>
            <Check si>Autoriza el uso de imagen en actividades de la institución</Check>
            <Check si>Acepta recibir comunicados por el portal de la familia</Check>
          </div>
        </div>
      </Tarjeta>

      <Tarjeta
        titulo="Personas autorizadas para el recojo"
        sub="Obligatorio en Inicial. Nadie que no esté en esta lista puede retirar a la niña."
        acciones={<Accion a={`${R}/nuevo/apoderado/agregar`} t="Agregar persona" ico={IcMas} peq />}
        pegado
      >
        <Tabla
          cols={[
            { t: 'Persona', r: (a) => <Persona nom={a.nom} sub={a.par} oro={a.principal} /> },
            { t: 'DNI', r: (a) => <span className="tenue">{a.dni}</span> },
            { t: 'Teléfono', r: (a) => a.tel },
            { t: 'Condición', al: 'center', r: (a) => (a.principal ? <Pil t="oro" hijo="Principal" /> : <Pil t="neutro" hijo="Autorizada" />) },
            { t: '', al: 'right', r: () => <Link to={`${R}/nuevo/apoderado`} className="btn btn-3 btn-s">Quitar</Link> },
          ]}
          filas={AUTORIZADOS}
        />
      </Tarjeta>

      <div style={{ marginTop: 15 }}>
        <Aviso t="oro" titulo="Este bloque solo existe en Inicial y Primaria.">
          En Secundaria el estudiante se retira solo y el sistema ni siquiera muestra esta sección.
          Es uno de los campos que cambian según el nivel.
        </Aviso>
      </div>

      <PieNav atras={`${R}/nuevo/estudiante`} sig={`${R}/nuevo/salud`} nota="Paso 3 de 7" />
    </>
  );
}

/* ---------------------------------------- paso 4 · ficha de salud */
export function PasoSalud() {
  return (
    <>
      <Tarjeta titulo="4 · Ficha de salud" sub="Exclusiva de Inicial. El niño de 3 años no puede explicar qué le pasa: la ficha lo hace por él.">
        <div className="form dos">
          <Selector et="Grupo sanguíneo" v={SALUD.grupo} />
          <Selector et="Seguro de salud" v={POSTULANTE.seguro} />
          <Campo et="Alergias" v={SALUD.alergias} full ayuda="Se muestra en el panel de la docente y en la ficha de emergencia del aula." />
          <Campo et="Condiciones médicas" v={SALUD.condiciones} />
          <Campo et="Medicación permanente" v={SALUD.medicacion} />
          <Campo et="Centro de salud de referencia" v={SALUD.centro} />
          <Campo et="Contacto de emergencia" v={SALUD.emergencia} />
        </div>
      </Tarjeta>

      <Tarjeta titulo="Controles y autonomía" sub="Datos que la docente necesita para organizar la jornada.">
        <div className="form dos">
          <Campo et="Control CRED" v={SALUD.cred} />
          <Campo et="Esquema de vacunación" v={SALUD.vacunas} />
          <Selector et="Control de esfínteres" v={SALUD.esfinteres} ayuda="Determina el apoyo que necesita durante la jornada." />
          <Campo et="Alimentación" v={SALUD.alimentacion} />
          <div className="g full">
            <Check si>Duerme siesta en la jornada</Check>
            <Check>Requiere apoyo para el aseo</Check>
            <Check si>Autoriza atención de primeros auxilios en la institución</Check>
          </div>
        </div>
      </Tarjeta>

      <div style={{ marginTop: 15 }}>
        <Aviso t="riesgo" titulo="Alergia registrada.">
          La alergia a la penicilina quedará visible en la ficha del aula de la docente
          María Reynalda Acuña y en la pantalla de emergencia del salón INI-3.
        </Aviso>
      </div>

      <PieNav atras={`${R}/nuevo/apoderado`} sig={`${R}/nuevo/documentos`} nota="Paso 4 de 7" />
    </>
  );
}

/* ---------------------------------------- paso 5 · documentos */
export function PasoDocumentos() {
  const d = DOCUMENTOS.Inicial;
  const ok = d.filter((x) => x.ok).length;
  return (
    <>
      <Tarjeta
        titulo="5 · Documentos"
        sub={`${ok} de ${d.length} entregados. Los marcados en dorado solo se piden en Inicial.`}
      >
        <div className="doc-lista">
          {d.map((x) => (
            <div key={x.d} className={`doc-item ${x.ok ? 'ok' : 'falta'}`}>
              <span className="ico">{x.ok ? <IcCheck /> : <IcAlerta />}</span>
              <span style={{ minWidth: 0 }}>
                <b>{x.d}{x.soloIni && <span className="eti-ini">solo Inicial</span>}</b>
                <span>{x.nota}{x.obl ? ' · obligatorio' : ' · opcional'}</span>
              </span>
              <span className="est">
                {x.ok ? <Pil t="ok" hijo="Entregado" /> : <Pil t="alerta" hijo="Pendiente" />}
              </span>
            </div>
          ))}
        </div>
        <div className="nota-pie">
          El carné de vacunación y la tarjeta CRED no se piden en Primaria ni en Secundaria.
          Son requisito propio del nivel Inicial.
        </div>
      </Tarjeta>

      <div style={{ marginTop: 15 }}>
        <Aviso t="alerta" titulo="Falta un documento opcional.">
          Las dos fotografías tamaño carné quedan pendientes. La matrícula puede registrarse
          igual: el sistema la marca como <b>observada</b> y genera un recordatorio a los 15 días.
        </Aviso>
      </div>

      <PieNav atras={`${R}/nuevo/salud`} sig={`${R}/nuevo/cobros`} nota="Paso 5 de 7" />
    </>
  );
}

/* ---------------------------------------- paso 6 · cobros */
export function PasoCobros() {
  return (
    <>
      <Tarjeta titulo="6 · Conceptos de pago" sub="Los montos vienen de la configuración de cobros del módulo M11.">
        <Tabla
          cols={[
            { t: 'Concepto', r: (c) => <b>{c.concepto}</b> },
            { t: 'Modalidad', r: (c) => <span className="tenue">{c.mod}</span> },
            { t: 'Cuándo', r: (c) => <span className="tenue">{c.cuando}</span> },
            { t: 'Monto', al: 'right', r: (c) => (c.monto ? <span className="num">S/ {c.monto.toFixed(2)}</span> : <span className="tenue">—</span>) },
          ]}
          filas={COBROS}
          pie={['Total a pagar en la matrícula', '', '', 'S/ 430.00']}
        />
        <div style={{ marginTop: 16 }} className="form dos">
          <Selector et="Descuento aplicable" v="Ninguno" ayuda="La familia no registra hermanos en la institución." />
          <Selector et="Forma de pago" v="Efectivo en Secretaría" />
        </div>
      </Tarjeta>

      <div style={{ marginTop: 15 }}>
        <Aviso t="info" titulo="Pensión.">
          La pensión de S/ 180.00 se programa en 10 cuotas, del 5 de marzo al 5 de diciembre.
          El primer vencimiento queda registrado automáticamente al cerrar la matrícula.
        </Aviso>
      </div>

      <PieNav atras={`${R}/nuevo/documentos`} sig={`${R}/nuevo/revision`} nota="Paso 6 de 7" />
    </>
  );
}

/* ---------------------------------------- paso 7 · revisión */
export function PasoRevision() {
  const e = evaluarEdad(POSTULANTE.nacimiento);
  const bloque = (t, pares) => (
    <div style={{ marginBottom: 18 }}>
      <h4 style={{ fontSize: 12, fontWeight: 700, color: 'var(--az-800)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 9 }}>{t}</h4>
      <dl className="lista-def">
        {pares.map(([k, v]) => <div key={k} style={{ display: 'contents' }}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
    </div>
  );
  return (
    <>
      <Tarjeta titulo="7 · Revisión" sub="Confirme los datos antes de generar la ficha única de matrícula.">
        {bloque('Estudiante', [
          ['DNI', POSTULANTE.dni],
          ['Apellidos y nombres', POSTULANTE.completo],
          ['Nacimiento', `${POSTULANTE.nacimientoTxt} · ${e.anios} años ${e.meses} meses al 31/03`],
          ['Sexo', POSTULANTE.sexo],
          ['Nivel y salón', `Inicial · 3 años (INI-3) · aula A-01`],
          ['Docente tutora', 'María Reynalda Acuña Montalvan'],
        ])}
        {bloque('Apoderado', [
          ['Apoderado', `${APODERADO.completo} · ${APODERADO.parentesco}`],
          ['Teléfono', APODERADO.telefono],
          ['Autorizados para el recojo', `${AUTORIZADOS.length} personas registradas`],
        ])}
        {bloque('Salud', [
          ['Grupo sanguíneo', SALUD.grupo],
          ['Alergias', SALUD.alergias],
          ['Control CRED', 'Al día'],
          ['Emergencia', SALUD.emergencia],
        ])}
        {bloque('Administrativo', [
          ['Documentos', '6 de 7 entregados · faltan las fotografías'],
          ['Matrícula', 'S/ 250.00'],
          ['Pensión', 'S/ 180.00 × 10 cuotas'],
          ['Total hoy', 'S/ 430.00'],
        ])}

        <Aviso t="ok" titulo="Todo listo.">
          Al registrar, el sistema genera el código de estudiante, la ficha única de matrícula,
          el cronograma de pensiones y da de alta a la niña en el salón INI-3.
        </Aviso>
      </Tarjeta>

      <div className="pie-pasos no-imp">
        <div className="der">
          <Link to={`${R}/nuevo/cobros`} className="btn btn-2"><IcIzq />Atrás</Link>
          <Link to={`${R}/listo`} className="btn btn-1"><IcCheck />Registrar matrícula</Link>
        </div>
      </div>
    </>
  );
}

/* ---------------------------------------- constancia */
export function Listo() {
  const e = evaluarEdad(POSTULANTE.nacimiento);
  return (
    <>
      <Cabecera titulo="Matrícula registrada" desc="Ficha única de matrícula generada. Queda observada hasta que se entreguen las fotografías.">
        <Accion a={`${R}`} t="Volver al proceso" />
        <Accion a={`${R}/listo`} t="Imprimir" ico={IcImprimir} estilo="btn-1" />
      </Cabecera>

      <div style={{ marginBottom: 16 }}>
        <Aviso t="ok" titulo="Registro conforme.">
          Se creó el código de estudiante <b>2026-0066</b> y se asignó la vacante en el salón INI-3.
        </Aviso>
      </div>

      <div className="constancia">
        <div className="sello">Matriculada</div>
        <div className="enc">
          <EscudoSVG size={48} />
          <div>
            <b>{IE.nombre}</b>
            <span>{IE.direccion} · {IE.distrito}, {IE.provincia} — {IE.region}</span>
            <span>RUC {IE.ruc} · {IE.ugel}</span>
          </div>
        </div>
        <h3>Ficha única de matrícula {IE.anio}</h3>

        <dl className="lista-def" style={{ fontSize: 13 }}>
          <dt>Código de estudiante</dt><dd>2026-0066</dd>
          <dt>N.º de ficha</dt><dd>MT-2026-075</dd>
          <dt>Apellidos y nombres</dt><dd>{POSTULANTE.completo}</dd>
          <dt>Documento</dt><dd>DNI {POSTULANTE.dni}</dd>
          <dt>Fecha de nacimiento</dt><dd>{POSTULANTE.nacimientoTxt}</dd>
          <dt>Edad al 31 de marzo</dt><dd>{e.anios} años y {e.meses} meses</dd>
          <dt>Nivel</dt><dd>Inicial — EBR</dd>
          <dt>Ciclo y grado</dt><dd>Ciclo II · 3 años</dd>
          <dt>Salón</dt><dd>INI-3 · aula A-01</dd>
          <dt>Docente tutora</dt><dd>María Reynalda Acuña Montalvan</dd>
          <dt>Jornada</dt><dd>5 horas pedagógicas diarias</dd>
          <dt>Apoderado</dt><dd>{APODERADO.completo} ({APODERADO.parentesco})</dd>
          <dt>Autorizados al recojo</dt><dd>{AUTORIZADOS.map((a) => a.nom.split(',')[0]).join(' · ')}</dd>
          <dt>Observación</dt><dd>Pendiente: dos fotografías tamaño carné</dd>
        </dl>

        <div className="firmas">
          <div>Dirección<br /><b>{IE.titular}</b></div>
          <div>Apoderado<br /><b>{APODERADO.completo}</b></div>
        </div>
      </div>

      <div className="rejilla r-3" style={{ marginTop: 18 }}>
        <Metrica et="Siguiente paso" val="Pensiones" nota="10 cuotas programadas" icono={IcNota} a="/direccion/finanzas/pagos" />
        <Metrica et="Siguiente paso" val="Nómina" nota="INI-3 pasa de 2 a 3 niños" icono={IcFamilia} a="/direccion/institucion/salones" />
        <Metrica et="Siguiente paso" val="Portal" nota="Acceso de la familia creado" icono={IcUsuario} a="/direccion/usuarios" />
      </div>
    </>
  );
}

/* =========================================================== diferencias */
export function Diferencias() {
  return (
    <>
      <Cabecera
        titulo="Qué cambia en el sistema según el nivel"
        desc="La matrícula no es un formulario único. Estos son los campos y las reglas que el sistema aplica distinto en Inicial, en Primaria y en Secundaria."
      >
        <Accion a={`${R}/nuevo`} t="Ver el flujo de Inicial" ico={IcDer} estilo="btn-1" />
      </Cabecera>

      <div style={{ marginBottom: 16 }}>
        <Aviso t="oro" titulo="Las filas resaltadas son exclusivas de Inicial.">
          Siete de las once reglas solo se activan cuando el nivel de la matrícula es Inicial.
        </Aviso>
      </div>

      <Tarjeta pegado>
        <div className="tabla-env">
          <table className="comparativa">
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Campo o regla</th>
                <th style={{ width: '28%' }}>Inicial</th>
                <th style={{ width: '26%' }}>Primaria</th>
                <th style={{ width: '26%' }}>Secundaria</th>
              </tr>
            </thead>
            <tbody>
              {DIFERENCIAS.map((d) => (
                <tr key={d.campo} className={d.soloIni ? 'solo-ini' : ''}>
                  <td className="campo-n">{d.campo}{d.soloIni && <span className="eti-ini">solo Inicial</span>}</td>
                  <td>{d.ini}</td>
                  <td className="tenue">{d.pri}</td>
                  <td className="tenue">{d.sec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Tarjeta>

      <div className="rejilla r-3" style={{ marginTop: 16 }}>
        <Tarjeta titulo="Inicial" sub="9 estudiantes · 3 salones">
          <dl className="lista-def">
            <dt>Ciclo</dt><dd>II</dd>
            <dt>Áreas</dt><dd>5</dd>
            <dt>Docentes</dt><dd>1 para los tres salones</dd>
            <dt>Horas diarias</dt><dd>5</dd>
            <dt>Mínimo anual</dt><dd>900 horas</dd>
            <dt>Calificación</dt><dd>Solo literal</dd>
            <dt>Repitencia</dt><dd>No existe</dd>
          </dl>
        </Tarjeta>
        <Tarjeta titulo="Primaria" sub="36 estudiantes · 6 salones">
          <dl className="lista-def">
            <dt>Ciclos</dt><dd>III, IV y V</dd>
            <dt>Áreas</dt><dd>5, y 6 desde 5.º grado</dd>
            <dt>Docentes</dt><dd>3 tutoras + 1 de especialidad</dd>
            <dt>Horas diarias</dt><dd>6</dd>
            <dt>Mínimo anual</dt><dd>1100 horas</dd>
            <dt>Calificación</dt><dd>Literal con nota de respaldo</dd>
            <dt>Repitencia</dt><dd>Desde 2.º grado</dd>
          </dl>
        </Tarjeta>
        <Tarjeta titulo="Secundaria" sub="20 estudiantes · 2 salones multigrado">
          <dl className="lista-def">
            <dt>Ciclos</dt><dd>VI y VII</dd>
            <dt>Cursos</dt><dd>14 y 16</dd>
            <dt>Docentes</dt><dd>Por especialidad</dd>
            <dt>Horas diarias</dt><dd>7</dd>
            <dt>Mínimo anual</dt><dd>1200 horas</dd>
            <dt>Calificación</dt><dd>Nota de 0 a 20</dd>
            <dt>Aula</dt><dd>Multigrado</dd>
          </dl>
        </Tarjeta>
      </div>
    </>
  );
}

/* =========================================================== ficha */
export function Ficha() {
  const { id } = useParams();
  const m = MATRICULAS.find((x) => x.id === id) || MATRICULAS[0];
  const esIni = m.niv === 'Inicial';
  const s = SALONES.find((x) => x.cod === m.salon) || SALONES[0];
  return (
    <>
      <Cabecera titulo={m.alu} desc={`Ficha ${m.id} · matriculado el ${m.fecha} · ${m.niv} ${m.salon}`}>
        <Accion a={R} t="Volver" ico={IcIzq} />
        <Accion a={`${R}/${m.id}/editar`} t="Editar" ico={IcPortapapeles} />
        <Accion a={`${R}/listo`} t="Imprimir ficha" ico={IcImprimir} estilo="btn-1" />
      </Cabecera>

      <Fichas items={[
        { a: `${R}/${m.id}`, t: 'Datos generales', exacto: true },
        { a: `${R}/${m.id}/academico`, t: 'Académico' },
        { a: `${R}/${m.id}/asistencia`, t: 'Asistencia' },
        { a: `${R}/${m.id}/cuenta`, t: 'Estado de cuenta' },
      ]} />

      <div className="rejilla r-23">
        <div>
          <Tarjeta titulo="Datos del estudiante">
            <dl className="lista-def">
              <dt>Código</dt><dd>2026-{m.id.slice(-4)}</dd>
              <dt>Nivel y salón</dt><dd>{m.niv} · {s.nom} ({m.salon})</dd>
              <dt>Ciclo</dt><dd>{s.ciclo}</dd>
              <dt>Tutora</dt><dd>{s.tutor}</dd>
              <dt>Tipo de ingreso</dt><dd>{m.tipo}</dd>
              <dt>Estado</dt><dd><PilEstado v={m.estado} /></dd>
            </dl>
          </Tarjeta>

          {esIni && (
            <Tarjeta titulo="Ficha de salud" sub="Visible solo en Inicial">
              <dl className="lista-def">
                <dt>Grupo sanguíneo</dt><dd>{SALUD.grupo}</dd>
                <dt>Alergias</dt><dd style={{ color: 'var(--riesgo)' }}>{SALUD.alergias}</dd>
                <dt>Control CRED</dt><dd>{SALUD.cred}</dd>
                <dt>Emergencia</dt><dd>{SALUD.emergencia}</dd>
              </dl>
            </Tarjeta>
          )}

          <Tarjeta titulo={esIni ? 'Autorizados para el recojo' : 'Apoderado'} pegado>
            <Tabla
              cols={[
                { t: 'Persona', r: (a) => <Persona nom={a.nom} sub={a.par} oro={a.principal} /> },
                { t: 'DNI', r: (a) => <span className="tenue">{a.dni}</span> },
                { t: 'Teléfono', r: (a) => a.tel },
              ]}
              filas={esIni ? AUTORIZADOS : AUTORIZADOS.slice(0, 1)}
            />
          </Tarjeta>
        </div>

        <aside style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
          <Metrica et="Promedio del bimestre" val={esIni ? 'A' : '15.4'} nota={esIni ? 'Logro esperado · sin nota numérica' : 'Logro esperado'} icono={IcNota} />
          <Metrica et="Asistencia" val="95" unidad=" %" nota="1 falta justificada" pct={95} icono={IcCheck} />
          <Metrica et="Estado de cuenta" val="S/ 0" nota="Sin deuda pendiente" icono={IcEscudoOk} />
          {esIni && (
            <Tarjeta titulo="Nota del nivel">
              <Aviso t="oro" titulo="Inicial no lleva nota numérica.">
                El sistema bloquea la escala de 0 a 20 y solo admite AD, A, B o C por competencia,
                acompañada de la conclusión descriptiva de la docente.
              </Aviso>
            </Tarjeta>
          )}
        </aside>
      </div>
    </>
  );
}

/* =========================================================== traslados */
export function Traslados() {
  const movs = [
    { id: 'TR-09', fecha: '14/09/2026', alu: 'INGA CASTILLO, Fabiana Luciana', tipo: 'Traslado de entrada', origen: 'I.E. 31512 Pichanaki', salon: 'SEC-VI', estado: 'Aprobada' },
    { id: 'TR-08', fecha: '28/08/2026', alu: 'MEZA GUERRA, Romina Paz', tipo: 'Retiro', origen: 'Cambio de domicilio familiar', salon: 'PRI-4', estado: 'Aprobada' },
    { id: 'TR-07', fecha: '12/08/2026', alu: 'GAMARRA LLACTA, Antonella Mía', tipo: 'Traslado de entrada', origen: 'I.E.P. San Juan Bautista', salon: 'PRI-1', estado: 'Aprobada' },
    { id: 'TR-06', fecha: '02/07/2026', alu: 'LLANOS CÁRDENAS, Gael Nicolás', tipo: 'Traslado de salida', origen: 'Se traslada a Satipo', salon: 'PRI-2', estado: 'Aprobada' },
  ];
  return (
    <>
      <Cabecera titulo="Traslados y retiros" desc="Movimientos de estudiantes durante el año lectivo. Cada uno libera o consume una vacante.">
        <Accion a={`${R}/traslados/nuevo`} t="Registrar movimiento" ico={IcTraslado} estilo="btn-1" />
      </Cabecera>

      <div className="rejilla r-4" style={{ marginBottom: 16 }}>
        <Metrica et="Traslados de entrada" val="2" nota="en el año" icono={IcTraslado} />
        <Metrica et="Traslados de salida" val="1" nota="en el año" icono={IcTraslado} />
        <Metrica et="Retiros" val="1" nota="por cambio de domicilio" icono={IcAlerta} />
        <Metrica et="Vacantes liberadas" val="2" nota="disponibles" icono={IcCarnet} />
      </div>

      <Tarjeta titulo="Movimientos registrados" pegado>
        <Tabla
          cols={[
            { t: 'N.º', r: (f) => <Link to={`${R}/traslados/${f.id}`} className="enl">{f.id}</Link> },
            { t: 'Fecha', r: (f) => <span className="tenue">{f.fecha}</span> },
            { t: 'Estudiante', r: (f) => <Persona nom={f.alu} sub={f.salon} /> },
            { t: 'Tipo', r: (f) => <Pil t={f.tipo.includes('entrada') ? 'ok' : f.tipo === 'Retiro' ? 'riesgo' : 'alerta'} hijo={f.tipo} /> },
            { t: 'Detalle', r: (f) => <span className="tenue">{f.origen}</span> },
            { t: 'Estado', al: 'center', r: (f) => <PilEstado v={f.estado} /> },
          ]}
          filas={movs}
        />
      </Tarjeta>

      <div style={{ marginTop: 15 }}>
        <Aviso t="info" titulo="Inicial no genera traslados de salida por repitencia.">
          Como en Inicial no hay repitencia, la única salida posible es por cambio de domicilio o retiro voluntario.
        </Aviso>
      </div>
    </>
  );
}

/* =========================================================== promoción */
export function Promocion() {
  const res = SALONES.map((s) => ({
    s, prom: s.niv === 'Inicial' ? s.alu : Math.max(0, s.alu - (s.cod === 'PRI-3' ? 1 : 0)),
    rep: s.niv === 'Inicial' ? 0 : (s.cod === 'PRI-3' ? 1 : 0),
  }));
  return (
    <>
      <Cabecera titulo="Promoción anual" desc="Cierre del año lectivo. Mueve a cada estudiante al grado siguiente según su logro.">
        <Accion a={`${R}/promocion/simular`} t="Simular promoción" ico={IcEscudoOk} />
        <Accion a={`${R}/promocion/ejecutar`} t="Ejecutar" ico={IcCheck} estilo="btn-1" />
      </Cabecera>

      <div style={{ marginBottom: 16 }}>
        <Aviso t="oro" titulo="En Inicial la promoción es automática.">
          El sistema no ofrece la opción de repitencia para los salones de 3, 4 y 5 años:
          todos pasan al grado siguiente. En Primaria la repitencia se habilita desde 2.º grado.
        </Aviso>
      </div>

      <Tarjeta titulo="Simulación por salón" sub="Bimestre III cerrado · proyección al cierre del año" pegado>
        <Tabla
          cols={[
            { t: 'Salón', r: (f) => <b>{f.s.nom}</b> },
            { t: 'Nivel', r: (f) => <Pil t={f.s.niv === 'Inicial' ? 'oro' : 'info'} hijo={f.s.niv} sin /> },
            { t: 'Matriculados', al: 'center', r: (f) => <span className="num">{f.s.alu}</span> },
            { t: 'Promovidos', al: 'center', r: (f) => <span className="num" style={{ color: 'var(--ok)' }}>{f.prom}</span> },
            { t: 'Repiten', al: 'center', r: (f) => (f.s.niv === 'Inicial' ? <span className="tenue">No aplica</span> : <span className="num" style={{ color: f.rep ? 'var(--riesgo)' : undefined }}>{f.rep}</span>) },
            { t: 'Pasa a', r: (f) => <span className="tenue">{siguiente(f.s)}</span> },
          ]}
          filas={res}
        />
      </Tarjeta>
    </>
  );
}
function siguiente(s) {
  const o = ['INI-3', 'INI-4', 'INI-5', 'PRI-1', 'PRI-2', 'PRI-3', 'PRI-4', 'PRI-5', 'PRI-6', 'SEC-VI', 'SEC-VII'];
  const i = o.indexOf(s.cod);
  if (s.cod === 'SEC-VII') return 'Egresa de la EBR';
  if (s.cod === 'SEC-VI') return 'EBR 3.º-5.º';
  const n = SALONES.find((x) => x.cod === o[i + 1]);
  return n ? n.nom : '—';
}
