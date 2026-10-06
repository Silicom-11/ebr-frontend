/* ===========================================================================
   Rutas. Regla del proyecto: todo lo que se puede pulsar cambia la URL,
   incluidos los pasos del asistente y las vistas superpuestas. Es lo que
   permite que html.to.design importe cada pantalla a Figma por separado.
   =========================================================================== */
import { Routes, Route, Navigate } from 'react-router-dom';
import Armazon from './componentes/Armazon.jsx';

import Inicio from './paginas/Inicio.jsx';
import Mapa from './paginas/Mapa.jsx';
import Buscar from './paginas/Buscar.jsx';

import * as M from './paginas/direccion/Matricula.jsx';
import * as D from './paginas/direccion/Direccion.jsx';
import * as Doc from './paginas/docente/Docente.jsx';
import * as Pri from './paginas/Primaria.jsx';
import * as Ini from './paginas/Inicial.jsx';

export default function App() {
  return (
    <Routes>
      {/* ---------------------------------------------------- generales */}
      <Route path="/" element={<Inicio />} />
      <Route path="/mapa" element={<Mapa />} />
      <Route path="/buscar" element={<Buscar />} />
      <Route path="/permisos" element={<Armazon rol="direccion" />}>
        <Route index element={<D.MatrizPermisos />} />
      </Route>

      {/* ---------------------------------------------------- DIRECCIÓN */}
      <Route path="/direccion" element={<Armazon rol="direccion" />}>
        <Route index element={<Navigate to="/direccion/tablero" replace />} />
        <Route path="avisos" element={<D.Comunicados />} />

        {/* M1 */}
        <Route path="calendarizacion/configuracion" element={<D.CalConfig />} />
        <Route path="calendarizacion/calendario" element={<D.CalAnual />} />
        <Route path="calendarizacion/calendario/:mes" element={<D.CalAnual />} />
        <Route path="calendarizacion/horas" element={<D.CalHoras />} />
        <Route path="calendarizacion/periodos" element={<D.CalPeriodos />} />
        <Route path="calendarizacion/periodos/:cod" element={<D.CalPeriodos />} />

        {/* M2 */}
        <Route path="institucion/salones" element={<D.Salones />} />
        <Route path="institucion/salones/nuevo" element={<D.SalonFicha />} />
        <Route path="institucion/salones/:cod" element={<D.SalonFicha />} />
        <Route path="institucion/ciclos" element={<D.Ciclos />} />
        <Route path="institucion/escala" element={<D.Escala />} />

        {/* M3 */}
        <Route path="cursos" element={<D.Cursos />} />
        <Route path="cursos/asignacion" element={<D.Asignacion />} />
        <Route path="cursos/asignacion/nueva" element={<D.Asignacion />} />
        <Route path="cursos/nuevo" element={<D.CursoFicha />} />
        <Route path="cursos/:nom" element={<D.CursoFicha />} />
        <Route path="cursos/:nom/editar" element={<D.CursoFicha />} />

        {/* M4 */}
        <Route path="usuarios" element={<D.Usuarios />} />
        <Route path="usuarios/roles" element={<D.RolesPermisos />} />
        <Route path="usuarios/nuevo" element={<D.UsuarioFicha />} />
        <Route path="usuarios/:id" element={<D.UsuarioFicha />} />
        <Route path="usuarios/:id/editar" element={<D.UsuarioFicha />} />

        {/* M5 · matrícula */}
        <Route path="matricula" element={<M.Proceso />} />
        <Route path="matricula/vacantes" element={<M.Proceso />} />
        <Route path="matricula/exportar" element={<M.Proceso />} />
        <Route path="matricula/diferencias" element={<M.Diferencias />} />
        <Route path="matricula/listo" element={<M.Listo />} />
        <Route path="matricula/traslados" element={<M.Traslados />} />
        <Route path="matricula/traslados/nuevo" element={<M.Traslados />} />
        <Route path="matricula/traslados/:id" element={<M.Traslados />} />
        <Route path="matricula/promocion" element={<M.Promocion />} />
        <Route path="matricula/promocion/simular" element={<M.Promocion />} />
        <Route path="matricula/promocion/ejecutar" element={<M.Promocion />} />
        <Route path="matricula/nuevo" element={<M.AsistenteLayout />}>
          <Route index element={<M.PasoNivel />} />
          <Route path="estudiante" element={<M.PasoEstudiante />} />
          <Route path="apoderado" element={<M.PasoApoderado />} />
          <Route path="apoderado/agregar" element={<M.PasoApoderado />} />
          <Route path="salud" element={<M.PasoSalud />} />
          <Route path="documentos" element={<M.PasoDocumentos />} />
          <Route path="cobros" element={<M.PasoCobros />} />
          <Route path="revision" element={<M.PasoRevision />} />
        </Route>
        <Route path="matricula/:id" element={<M.Ficha />} />
        <Route path="matricula/:id/editar" element={<M.Ficha />} />
        <Route path="matricula/:id/academico" element={<M.Ficha />} />
        <Route path="matricula/:id/asistencia" element={<M.Ficha />} />
        <Route path="matricula/:id/cuenta" element={<M.Ficha />} />

        {/* M6 */}
        <Route path="horarios" element={<D.Horarios />} />
        <Route path="horarios/generar" element={<D.Horarios />} />
        <Route path="planificacion" element={<D.Planificacion />} />
        <Route path="cobertura" element={<D.Cobertura />} />

        {/* M7 */}
        <Route path="evaluacion/semanal" element={<D.EvalSemanal />} />
        <Route path="evaluacion/mensual" element={<D.EvalMensual />} />
        <Route path="evaluacion/conclusiones" element={<D.Conclusiones />} />
        <Route path="evaluacion/boletas" element={<D.Boletas />} />
        <Route path="evaluacion/boletas/generar" element={<D.Boletas />} />
        <Route path="evaluacion/boletas/:cod" element={<D.Boletas />} />

        {/* M8 */}
        <Route path="asistencia" element={<D.Asistencia />} />
        <Route path="asistencia/justificaciones" element={<D.Justificaciones />} />
        <Route path="asistencia/justificaciones/:id" element={<D.Justificaciones />} />
        <Route path="asistencia/incidencias" element={<D.Incidencias />} />
        <Route path="asistencia/incidencias/nueva" element={<D.Incidencias />} />
        <Route path="asistencia/incidencias/:id" element={<D.Incidencias />} />
        <Route path="asistencia/reportes" element={<D.ReportesAsistencia />} />
        <Route path="asistencia/reportes/exportar" element={<D.ReportesAsistencia />} />

        {/* M9 */}
        <Route path="supervision/plazos" element={<D.Plazos />} />
        <Route path="supervision/panel" element={<D.PanelSupervision />} />
        <Route path="supervision/prorrogas" element={<D.Prorrogas />} />
        <Route path="supervision/prorrogas/:id" element={<D.Prorrogas />} />

        {/* M10 */}
        <Route path="familia/academico" element={<D.FamiliaAcademico />} />
        <Route path="familia/asistencia" element={<D.FamiliaAsistencia />} />
        <Route path="familia/cuenta" element={<D.FamiliaCuenta />} />
        <Route path="familia/comunicados" element={<D.Comunicados />} />
        <Route path="familia/comunicados/nuevo" element={<D.Comunicados />} />
        <Route path="familia/comunicados/:id" element={<D.Comunicados />} />

        {/* M11 */}
        <Route path="finanzas/cobros" element={<D.Cobros />} />
        <Route path="finanzas/becas" element={<D.Becas />} />
        <Route path="finanzas/becas/nueva" element={<D.Becas />} />
        <Route path="finanzas/pagos" element={<D.Pagos />} />
        <Route path="finanzas/pagos/registrar" element={<D.Pagos />} />
        <Route path="finanzas/devoluciones" element={<D.Devoluciones />} />

        {/* M12 */}
        <Route path="recursos/utiles" element={<D.Utiles />} />
        <Route path="recursos/utiles/:niv" element={<D.Utiles />} />
        <Route path="recursos/bienes" element={<D.Bienes />} />
        <Route path="recursos/bienes/nuevo" element={<D.Bienes />} />

        {/* M13 */}
        <Route path="tablero" element={<D.Tablero />} />
        <Route path="tablero/exportar" element={<D.Tablero />} />
        <Route path="reportes" element={<D.Reportes />} />
        <Route path="reportes/:tipo" element={<D.Reportes />} />
      </Route>

      {/* ---------------------------------------------------- DOCENTE */}
      <Route path="/docente" element={<Armazon rol="docente" />}>
        <Route index element={<Doc.MiDia />} />
        <Route path="avisos" element={<Doc.MiDia />} />
        <Route path="horario" element={<Doc.Horario />} />
        <Route path="mis-cursos" element={<Doc.MisCursos />} />
        <Route path="planificacion" element={<Doc.Planificacion />} />
        <Route path="planificacion/:salon/:curso" element={<Doc.Planificacion />} />
        <Route path="cobertura" element={<Doc.Cobertura />} />
        <Route path="evaluacion/semanal" element={<Doc.EvalSemanal />} />
        <Route path="evaluacion/mensual" element={<Doc.EvalMensual />} />
        <Route path="evaluacion/conclusiones" element={<Doc.Conclusiones />} />
        <Route path="asistencia" element={<Doc.Asistencia />} />
        <Route path="incidencias" element={<Doc.Incidencias />} />
        <Route path="incidencias/nueva" element={<Doc.Incidencias />} />
        <Route path="prorrogas" element={<Doc.Prorrogas />} />
        <Route path="prorrogas/nueva" element={<Doc.Prorrogas />} />
        <Route path="calendario" element={<Doc.Calendario />} />
        <Route path="reportes" element={<Doc.Reportes />} />
        <Route path="permisos" element={<Doc.Permisos />} />
      </Route>

      {/* ---------------------------------------------------- PRIMARIA */}
      <Route path="/primaria" element={<Pri.LayoutPrimaria />}>
        <Route index element={<Pri.MiDia />} />
        <Route path="cursos" element={<Pri.Cursos />} />
        <Route path="cursos/:slug" element={<Pri.Curso />} />
        <Route path="notas" element={<Pri.Notas />} />
        <Route path="horario" element={<Pri.Horario />} />
        <Route path="tareas" element={<Pri.Tareas />} />
        <Route path="tareas/:slug" element={<Pri.Tareas />} />
        <Route path="logros" element={<Pri.Logros />} />
        <Route path="logros/:slug" element={<Pri.Logros />} />
        <Route path="asistencia" element={<Pri.AsistenciaPri />} />
        <Route path="asistencia/:dia" element={<Pri.AsistenciaPri />} />
        <Route path="comunicados" element={<Pri.Comunicados />} />
        <Route path="comunicados/:slug" element={<Pri.Comunicados />} />
      </Route>

      {/* ---------------------------------------------------- INICIAL */}
      <Route path="/inicial" element={<Ini.LayoutInicial />}>
        <Route index element={<Ini.Hoy />} />
        <Route path="animo/:estado" element={<Ini.Hoy />} />
        <Route path="actividades" element={<Ini.Actividades />} />
        <Route path="actividades/:slug" element={<Ini.Actividad />} />
        <Route path="semana" element={<Ini.Semana />} />
        <Route path="semana/:dia" element={<Ini.Semana />} />
        <Route path="estrellas" element={<Ini.Estrellas2 />} />
        <Route path="estrellas/:slug" element={<Ini.Estrellas2 />} />
        <Route path="asistencia" element={<Ini.Asistencia />} />
        <Route path="asistencia/:dia" element={<Ini.Asistencia />} />
        <Route path="familia" element={<Ini.ParaFamilia />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
