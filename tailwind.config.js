module.exports = {
  purge: [
    './pages/*.js',
    './components/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        2: '2 2 0%'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
