/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "h-[calc(100%-4rem)]"
  ],
  theme: {
    extend: {
      keyframes: {
        moveRight: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        moveRight: "moveRight 0.8s infinite ease-in-out",
      },
    },
  },
  plugins: [],
}
