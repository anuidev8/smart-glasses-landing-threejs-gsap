<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Lumina Vision AR - Landing Page

Una experiencia web inmersiva en 3D que muestra la evolución de la visión humana y el futuro de las gafas inteligentes de realidad aumentada (AR).

**Ver Demo en AI Studio:** [https://ai.studio/apps/drive/1naAuiZWdpDTi3n24SHd6abl5_HuAwWdm](https://ai.studio/apps/drive/1naAuiZWdpDTi3n24SHd6abl5_HuAwWdm)

## 🚀 Tecnologías

Este proyecto utiliza un stack moderno para gráficos web de alto rendimiento:

*   **React 19**: Biblioteca de UI.
*   **Vite**: Entorno de desarrollo ultrarrápido.
*   **React Three Fiber (R3F)**: Renderizado 3D declarativo para React.
*   **GSAP (GreenSock)**: Animaciones de scroll complejas y líneas de tiempo.
*   **Tailwind CSS**: Estilizado rápido y responsivo.
*   **Lucide React**: Iconografía.

## 🛠️ Instalación y Ejecución Local

**Requisitos Previos:** Node.js instalado.

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Configurar variables de entorno (Opcional):**
    Crea un archivo `.env.local` si necesitas configurar claves de API (por ejemplo, para funciones de IA generativa si se implementan).
    ```env
    GEMINI_API_KEY=tu_api_key_aqui
    ```

3.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:3000` (o el puerto que indique la consola).

## 📂 Estructura del Proyecto

El proyecto ha sido refactorizado para seguir las mejores prácticas de arquitectura en React y R3F:

```
src/
├── components/
│   ├── scene/       # Componentes 3D (Experiencia, Modelos)
│   ├── ui/          # Componentes de Interfaz 2D (NavRail, Capas)
│   ├── HUD.tsx      # Interfaz Heads-Up Display
│   └── GlassesModel.tsx # Modelo 3D de las gafas
├── data/            # Datos estáticos (Textos, Imágenes)
├── hooks/           # Hooks personalizados (Animaciones, Lógica)
├── types.ts         # Definiciones de tipos TypeScript
├── App.tsx          # Componente principal y composición
└── index.tsx        # Punto de entrada
```

## ✨ Características Clave

*   **Narrativa Scroll-Driven**: La historia avanza a medida que el usuario hace scroll, viajando desde el año 1200 d.C. hasta el futuro.
*   **Modelo 3D Interactivo**: Las gafas reaccionan al scroll, cambiando de posición y rotación suavemente.
*   **HUD Dinámico**: La interfaz superpuesta cambia según la "época" (ej. bifocales en 1780, escáner AI en el presente).
*   **Optimización de Rendimiento**: Uso de `PerformanceMonitor` para ajustar la calidad gráfica dinámicamente según el dispositivo.

---

Desarrollado con ❤️ por [Tu Nombre/Usuario]
