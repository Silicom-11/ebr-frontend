# SIGAC · frontend de alta fidelidad

Prototipo navegable del **Sistema Integrado de Gestión Académica** de la
**I.E.P. Continental Americano** (Pichanaki, Chanchamayo, Junín).
Curso de Herramientas de Prototipado · UTP · 2026.
Aquino Carhuas, Marc Andreessen — Cataño Mendoza, Maciel Daniela.

React + Vite + React Router. **No hay backend**: todos los datos están
quemados en `src/datos/`.

---

## Las dos reglas que gobiernan este proyecto

**1. Todo lo que se puede pulsar cambia la URL.**
Pestañas, filtros, pasos del asistente, filas de tabla y vistas superpuestas
son enlaces, no estado interno. Es lo que permite importar cada pantalla a
Figma con **html.to.design**, que trabaja sobre una dirección a la vez.

**2. No hay inicio de sesión que bloquee nada.**
El formulario de la portada es una maqueta. Los cuatro portales se alcanzan
directamente por su ruta, porque si estuvieran detrás de una validación
html.to.design no podría llegar a ellos.

---

## Arrancar en local

```bash
npm install
npm run dev
```

Queda en <http://127.0.0.1:5180>.

---

## Subirlo a GitHub y desplegarlo en Vercel

```bash
git init
git add .
git commit -m "SIGAC: prototipo de alta fidelidad"
git branch -M main
git remote add origin https://github.com/USUARIO/sigac-ebr-frontend.git
git push -u origin main
```

En Vercel: **Add New → Project → Import** el repositorio.
Detecta Vite solo; el `vercel.json` ya trae la reescritura que hace falta
para que las rutas profundas funcionen al recargar.

| Ajuste | Valor |
|---|---|
| Framework | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |

---

## Usarlo con html.to.design

Una vez desplegado, la URL de producción queda así:

```
https://sigac-ebr-frontend.vercel.app
```

Para traer una pantalla a Figma se pega esa dirección **más la ruta**:

```
https://sigac-ebr-frontend.vercel.app/direccion/matricula/nuevo/estudiante
```

La lista completa de rutas está dentro del propio prototipo, en
**`/mapa`**, lista para copiar y pegar una por una.

---

## El recorrido de la exposición

El profesor pidió ver cómo se registra a un estudiante de **Inicial** y qué
datos propios de ese nivel maneja el sistema. Ese es el recorrido:

| # | Ruta | Qué se muestra |
|---|---|---|
| 1 | `/` | Los cuatro portales |
| 2 | `/direccion/matricula` | Vacantes por salón · Inicial con ratio reducido |
| 3 | `/direccion/matricula/nuevo` | Paso 1 · el nivel decide lo que viene después |
| 4 | `/direccion/matricula/nuevo/estudiante` | Paso 2 · **validación de edad al 31 de marzo** |
| 5 | `/direccion/matricula/nuevo/apoderado` | Paso 3 · personas autorizadas para el recojo |
| 6 | `/direccion/matricula/nuevo/salud` | Paso 4 · **ficha de salud, solo Inicial** |
| 7 | `/direccion/matricula/nuevo/documentos` | Paso 5 · carné CRED y vacunas |
| 8 | `/direccion/matricula/nuevo/cobros` | Paso 6 · matrícula y pensión |
| 9 | `/direccion/matricula/nuevo/revision` | Paso 7 · revisión |
| 10 | `/direccion/matricula/listo` | Ficha única de matrícula generada |
| 11 | `/direccion/matricula/diferencias` | **Qué cambia según el nivel** (la respuesta a su pregunta) |
| 12 | `/inicial` | Portal del estudiante de Inicial |
| 13 | `/primaria` | Portal del estudiante de Primaria |

---

## Qué hace distinto a Inicial

Siete reglas del sistema se activan **solo** cuando el nivel es Inicial:

- Edad cumplida al 31 de marzo decide el salón (3, 4 o 5 años).
- Carné de vacunación y tarjeta de control CRED, obligatorios.
- Ficha de salud: grupo sanguíneo, alergias, medicación y contacto de emergencia.
- Autonomía: control de esfínteres, alimentación y siesta.
- Personas autorizadas para el recojo, mínimo dos.
- Calificación **solo literal** (AD, A, B, C): el sistema bloquea la nota numérica.
- Promoción automática: en Inicial no existe la repitencia.

Más dos parámetros que cambian por nivel: la jornada (5 h en Inicial, 6 en
Primaria, 7 en Secundaria) y el mínimo anual de horas (900 / 1100 / 1200).

---

## Permisos del docente

Se corrigió un error de la versión anterior: el docente aparecía pudiendo
crear cursos. **No puede.** La matriz completa está en `/permisos`.

| El docente SÍ puede | El docente NO puede |
|---|---|
| Consultar el calendario | Configurar la calendarización |
| Ver la ficha de sus cursos | Crear o eliminar cursos |
| Registrar su planificación mensual | Construir el horario escolar |
| Evaluar por competencias (sus salones) | Matricular, trasladar o retirar |
| Escribir conclusiones descriptivas | Emitir boletas oficiales |
| Tomar asistencia y registrar conducta | Aprobar justificaciones |
| Solicitar una prórroga | Aprobar prórrogas |
| Ver reportes de sus salones | Ver pensiones y morosidad |

---

## Estructura

```
src/
  datos/          institucion.js · matricula.js · navegacion.js
  componentes/    Armazon.jsx · ui.jsx · Iconos.jsx
  paginas/
    Inicio.jsx · Mapa.jsx · Buscar.jsx
    Inicial.jsx · Primaria.jsx
    direccion/    Matricula.jsx · Direccion.jsx
    docente/      Docente.jsx
  styles/         app.css · matricula.css · ninos.css
```

Colores institucionales: azul **#1D3E69** como base y dorado **#FFCC2A**
solo como acento. El reparto sale del test A/B de color: el dorado destaca
pero cansa la vista, y sobre blanco alcanza 1,51:1, que incumple WCAG.

---

Los nombres de los estudiantes son ficticios. Los docentes, los salones y
la estructura académica corresponden a datos reales levantados en la institución.
