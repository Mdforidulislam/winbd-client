/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "barndColor": '#E4CA85',
        'DarkGreen': '#14805E',
        'LightGreen': '#36bc8b',
        'CustomRed': '#ff0000',
        'CustomRed2': '#D15454',
        'CustomYellow': '#FFDF1A',
        'GlobalGray': '#272528',
        'GlobalDarkGray': '#333333',
        "grayPlaceInput": "#292929",
        "inputLabel": "#E2E2E2",
        "bydefaultWhite": '#e2e2e2',
        "loginbg": '#111111',
        "loginfildBg": "#292929",
        "inputlartBg": '#242424',
        "alartColor": '#D15454',
        "notifyBlack": '#03120D',
        "HistoryRed": '#C25151',
      },
      fontFamily: {
        'bengali-serif': ['Noto Serif Bengali', 'serif'],
        'bengali': ['Noto Sans Bengali', 'sans-serif']
      },

     

    },
  },
  plugins: [],
};
