# Mine Sweeper

A modern React-based Minesweeper game with a unique coin collection mechanic. Built with React 19, Vite, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js (v20.14.0 or higher)
- npm

### Installation

Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 🏗️ Project Structure

```
mine-sweeper/
├── src/
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Application entry point
│   ├── app.types.ts               # TypeScript type definitions
│   ├── api/
│   │   └── fetch-board-game.ts    # API for fetching game board
│   ├── components/
│   │   ├── board-game/
│   │   │   ├── board-game.tsx     # Main game component
│   │   │   └── board-game.consts.ts
│   │   ├── board/
│   │   │   └── board.tsx          # Game board component
│   │   └── card/
│   │       ├── card.tsx           # Individual tile component
│   │       └── card.consts.ts
│   ├── utils/
│   │   ├── game-logic.ts          # Core game mechanics
│   │   ├── flag-logic.ts          # Flag placement logic
│   │   ├── utils.ts               # Utility functions
│   │   └── cn.ts                  # Class name utilities
│   └── index.css                  # Tailwind CSS imports
├── public/                        # Static assets
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
└── package.json                   # Project dependencies and scripts
```

## 🎯 Game Mechanics

### Tile States

- **Hidden**: Gray tile, not yet revealed
- **Revealed**: Light gray tile, shows number or empty
- **Flagged**: Yellow tile with flag emoji
- **Mine**: Red tile with bomb emoji (revealed on game over)

### Number Meanings

- **0**: No adjacent mines (safe to click adjacent tiles)
- **1-8**: Number of adjacent mines
- **Empty**: No adjacent mines, auto-reveals adjacent tiles

### Coin System

- Collect coins by revealing tiles that contain them
- Use "Cash Out" button to convert current coins to total earnings
- Coins are lost if you hit a mine before cashing out

## 🛠️ Technologies Used

- **React 19** - UI library with latest features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🎨 Features

- 🎮 Classic Minesweeper gameplay
- 🪙 Unique coin collection mechanic
- 💰 Cash out system for coin management
- 📱 Responsive design for all devices
- 🚩 Flag system for mine marking
- 🎯 Auto-reveal for empty areas

Happy gaming! 🎮💣
