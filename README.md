# Proyecto 12 Memory & Trivia Cultural Quiz - React SPA

Developed with React + Vite. SPA composed by two interactive games: memoty game with emojis and a trivial quiz with questions from an external API.
---

## Demo
https://spa-memory-culturequiz-react.vercel.app/

---
## 🛠️ Technologies
- React
- Vite
- React Router DOM v6
- CSS Modules

---

## 📁 Project structure
```
src/
├── pages/
│   ├── Home.jsx
│   ├── MemoryPage.jsx
│   ├── QuizPage.jsx
│   └── QuizGamePage.jsx
├── components/
│   ├── MemoryBoard.jsx
│   ├── MemoryCard.jsx
│   ├── QuizQuestion.jsx
│   ├── QuizAnswers.jsx
│   └── QuizResult.jsx
├── customHooks/
│   ├── useMemory.js
│   └── useQuiz.js
├── reducers/
│   ├── memoryReducer.js
│   └── quizReducer.js
└── data/
    └── memoryData.js
```
---

## Games
### 🃏 Memory Game
- Table of 12 cards (6 pairs of emojis)
- Chronometer starts with the first turned card
- Score system (+1 matched / -1 not matched)
- Modal with score, time and best score stored on ```localStorage```

---

### 🎨 Trivial Cultural Quiz
- Selection of difficulty: Easy/ Medium / Hard
- 5 questions per game with 4 options for answers
- Timer of 15 seconds per question 
- Visual feedback: green: (correct) / red (incorrect)
- Screen with results with an emoji and a dynamic message according to the score

---

### ✅ Project requirements covered

| Requirements | Implementation |
| ------------ | -------------- |
Responsive | Media questies in all components
Good practices with HTML/CSS | Correct semantics, CSS variables, BEM 
Minimum of 3 states with lógic | ```useReducer``` Memory and Quiz with multiple states
Minimum of useEffect | Examples fetch, timer, timout, localStorage
API request | Open Trivia DB (```opentdb.com```) with ```&lang=es```
React Router with parameter | ```/cultural-quiz/:difficulty``` read with ```useParams()```

---

### 🔌 API

It is used Open Trivia DB - free, without API key

``` https://opentdb.com/api.php?amount=5&type=multiple&difficulty=easy&lang=es ```
> ⚠️ Questions are in English if there is not enough translations available in Spanish for the difficulty selected. (Most of them are in English).

⚙️ Instalation and use

```
# Clonar el repositorio
git clone https://github.com/Ren-mayday/proyecto-12-spa-memory-culturequiz

# Instalar dependencias
npm install

# Arrancar en desarrollo
npm run dev

# Build para producción
npm run build
```

---

## 📌 Routes

| Route | Component | Description |
| ----- | --------- | ----------- |
|`/`|`Home`| Selection's game screen |
|`/memory`|`MemoryPage` | Memory game |
|`/cultural-quiz`| `QuizPage` | Selection of difficulty |
| `/cultural-quiz/:difficulty` | `QuizGamePage` | Game quiz |

---

### 👩🏽‍💻 Author
Developed by Rencel for RockTehCode Course