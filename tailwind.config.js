/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './node_modules/preline/preline.js',
    
  ],
  theme: {
    extend: {
      extend: {
        colors:{
          xAshGray: "#A9AF9Cff",
          xAlabaster: "#F1F3E9ff",
          xDarkSlateGray: "#344A41ff",
          xFlame: "#EA6136ff",
          xPlatinum: "#D1DAD5ff",
          xGunmetal: "#1B353Fff",
          xAppleGreen: "#7FB128ff",
          xavocado: "#577F24ff"
        },
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}

