// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Add this safelist section
  safelist: [
    'text-blue-500',
    'text-purple-500',
    'text-pink-500',
    // Add other dynamic classes if you have them, e.g.:
    // 'text-blue-700', // For hover effects on titles
    // 'text-purple-700',
    // 'text-pink-600',
    // 'text-orange-500',
    // 'text-teal-600',
    // 'text-gray-900', // If you dynamically change text-gray-700 to text-gray-900 on hover
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}