<img width="1914" height="905" alt="image" src="https://github.com/user-attachments/assets/7c5b4da0-25bb-4027-9d7b-3014328c0b98" />
# Tres en Línea RD

## Nombre del Desarrollador
Nicolas Zierow Fermin

## Descripción del Juego
Tres en Línea RD es una versión dominicana del clasico juego de Tic-Tac-Toe. El juego presenta una temática del béisbol dominicano, representando a los equipos Licey (X) y Águilas (O). Los jugadores se turnan para colocar sus marcas en un tablero de 3x3, con el objetivo de conseguir tres en línea horizontal, vertical o diagonalmente.

El juego incluye mensajes, un sistema de puntuación persistente que guarda automaticamente las victorias de cada equipo y los empates, y una interfaz visual inspirada en los colores de la bandera dominicana.

## Qué Aprendí
Durante el desarrollo de este proyecto aprendí:

- Cómo gestionar el estado en React usando hooks (useState, useEffect)
- Implementar lógica de juego compleja con detección de ganadores
- Trabajar con TypeScript para crear aplicaciones más seguras y mantenibles
- Usar LocalStorage (UFF) para persistir datos entre sesiones
- Diseñar interfaces responsivas con Tailwind CSS
- Organizar código en componentes reutilizables y funciones de utilidad
- Implementar animaciones y transiciones suaves para mejorar la experiencia de usuario
- Manejar eventos de usuario y actualizar la interfaz dinámicamente

## Qué Parte Fue Más Difícil
La parte más difícil del proyecto fue implementar la lógica de detección de ganador de manera eficiente. Tuve que:

1. Definir todas las combinaciones ganadoras posibles (8 en total: 3 horizontales, 3 verticales, 2 diagonales)
2. Verificar después de cada jugada si alguna de estas combinaciones se había completado
3. Sincronizar correctamente el estado del juego con la actualización de puntuaciones
4. Gestionar los efectos secundarios (useEffect) para guardar y cargar el estado sin crear bucles infinitos

## Características
- Tablero de juego interactivo 3x3
- Sistema de turnos alternados
- Detección automática de ganador o empate
- Contador de puntuaciones persistente
- Mensajes en español dominicano
- Diseño responsivo
- Animaciones suaves
- Tema visual con colores de la bandera dominicana
