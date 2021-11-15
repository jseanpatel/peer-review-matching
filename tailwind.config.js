module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        base: '#2A84EE'
      },
      fontFamily: {
        base: ['Museo Sans Rounded']
      }
    }
  },
  variants: {
    extend: {
      colors: {
        base: '#2A84EE'
      }
    },
  plugins: [],
  }
}
