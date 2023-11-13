/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
      colors:{
        background: '#F0F0F7',
        primarylighter: '#9871F5',
        primarylight: '#916BEA',
        primary: '#8257E5',
        primarydark: '#774DD6',
        primarydarker: '#6842C2',
        secundary: '#04D361',
        secundarydark: '#04BF58',
        titleinprimary: '#FFFFFF',
        textinprimary: '#D4C2FF',
        texttitle: '#32264D',
        textcomplement: '#9C98A6',
        textbase: '#6A6180',
        lineinwhite: '#E6E6F0',
        inputbackground:'#F8F8FC',
        buttontext: '#FFFFFF',
        boxbase: '#FFFFFF',
        boxfooter: '#FAFAFC',
      }, 
    },
  },
  plugins: [],
};
