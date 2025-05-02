// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "recipe-red": "#E63946", // vibrant tomato red
        "recipe-orange": "#F4A261", // warm orange like spices
        "recipe-yellow": "#FFD166", // butter/egg yolk yellow
        "recipe-green": "#2A9D8F", // herb green
        "recipe-brown": "#774936", // cinnamon/chocolate brown
        "recipe-cream": "#F8F9FA", // cream/flour color
        "recipe-beige": "#F1FAEE", // light beige for backgrounds
      },
      fontFamily: {
        title: ["Montserrat", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
      boxShadow: {
        "recipe-card":
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)",
      },
      backgroundImage: {
        "food-pattern": "url('/src/assets/food-pattern.png')",
      },
    },
  },
  plugins: [],
};
