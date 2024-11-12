/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,scss}"],
  theme: {
    extend: {},
    screens: {
      mobile: { max: "562px", min: "320px" },
      "tablet-s": { max: "823px", min: "562px" },
      tablet: { max: "1200px", min: "823px" },
      "laptop-l": { max: "1535px", min: "1200px" },
      "4k-3": { max: "2027px", min: "1535px" },
      sub2: { min: "1535px" },
      sub1: { max: "2700px", min: "1535px" },
      "4k-2": { max: "2474px", min: "2027px" },
      "4k": { max: "3069px", min: "2474px" },
      "8k-2": { max: "3614px", min: "3069px" },
      "8k": { max: "4000px", min: "3614px" },
    },
  },
  plugins: [],
};
