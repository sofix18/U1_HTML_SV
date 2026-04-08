# Documentación de Uso de IA - Proyecto SportClub

**Estudiante:** Sofia Veliz
**Fecha de inicio:** 24 de marzo de 2026
**Herramienta utilizada:** Gemini 3 Flash

## 1. Prompts utilizados:
* "Desarrollar una página de Login en HTML5 y CSS3."
* "Creación de estilos CSS aplicando el modelo de cajas (margin, padding, border)."
* "Agregar botón de volver y cambiar textos a español (Iniciar sesión)."
* "Crear estructuras para páginas de Registro y Recuperación de contraseña."

## 2. Resultado inicial generado por la IA:
La IA proporcionó una estructura base funcional con un formulario simple, centrado básico con Flexbox y un diseño de tarjeta (card) estándar.

## 3. Modificaciones y Mejoras Realizadas:

### HTML5 (Semántica y Estructura):
* **Mejora de Etiquetas:** Cambié los `<div>` genéricos por etiquetas semánticas `<main>` y `<section>`. Esto mejora la accesibilidad y el SEO.
* **Navegación:** Implementé un botón de "Volver" con rutas relativas para mejorar la experiencia de usuario (UX).
* **Localización:** Traduje toda la interfaz al español ("Iniciar sesión", "Ingresar", etc.) siguiendo los requerimientos del profesor.
* **Organización:** Reestructuré el proyecto en carpetas. Modifiqué las rutas para que el CSS se lea desde `css/style.css` y las imágenes desde `image/`.

### CSS3 (Diseño y Modelo de Cajas):
* **Reset de Caja:** Implementé el selector universal `*` con `box-sizing: border-box` para un control total de las dimensiones.
* **Identidad Visual:** Personalicé la paleta de colores usando el **Morado SportClub (#4B1D6E)** y el **Amarillo (#FDB813)** para los estados activos.
* **Centrado con Flexbox:** Perfeccioné el uso de `display: flex` en el body para un centrado absoluto en cualquier dispositivo.
* **Feedback Visual:** Añadí `transition: 0.3s` y efectos `:hover` en botones y enlaces para una navegación más fluida.

## 4. Resultados y Evidencia Visual:

Presento el proceso de validación con las rutas actualizadas a la carpeta `./docs/`:

**Paso 1: Corrección de rutas y visualización inicial**
Se corrigió la etiqueta `<img>` para que el logo sea visible vinculándolo a la carpeta `image/`.
![Error de ruta corregido](Captura1.png)

**Paso 2: Ajuste de dimensiones con CSS3**
Se limitó el tamaño del logo y se aplicó el centrado manual para evitar desbordamientos.
![Ajuste de escala del logo](Captura2.png)

**Paso 3: Interfaz Final y Nuevas Páginas**
Resultado final con el modelo de cajas aplicado, textos en español y navegación integrada.
![Login SportClub Final](Captura3.png)

## 5. Justificación Técnica:

1. **Orden Profesional:** Decidí separar el código en carpetas css/  image/ y mover la documentación a docs/. Esto facilita el escalamiento del proyecto.
2. **Diseño Responsivo:** Usé Flexbox para que el login sea "Mobile First", viéndose bien tanto en computadoras como en celulares.
3. **Control de Versiones:** Usé Git para mantener un historial de cambios. Además, aseguré la integridad de los datos usando el atributo require en todos los campos obligatorios del formulario.


# Estructura del Proyecto SportClub

## Archivos Actuales
- `login.html`: Interfaz de acceso (antes index.html).
- `register.html`: Formulario de nuevos usuarios.
- `recover.html`: Recuperación de cuenta.
- `css/style.css`: Estilos globales.
- `image/`: Carpeta de recursos visuales.

## Próximos Pasos
1. Crear `index.html` (Nueva Landing Page motivacional).
2. Implementar Dashboards por perfil (Usuario, Coach, Admin).