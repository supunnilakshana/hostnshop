import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/presentation/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/app/admin/**/*.{js,ts,jsx,tsx,mdx}",
	
  ],
  theme: {
  	extend: {
		colors: {
			bg_secondary: "#CCB3FF", 
			bg_primary: "#8A4FFF", 
			accent: "#FFFFFF", // White for backgrounds
			grayLight: "#EDEDED", // Light gray for subtle highlights
			sidebarBg: "#F7F9FC", // Background of the sidebar
			cardBg: "#FFFFFF", // Background for cards
			textPrimary: "#1E293B", // Dark text for primary headings
			textSecondary: "#475569", // Lighter gray for secondary text
			link: "#2563EB", // Blue color for links
			btn_hover: "#7733ff",	
			bg_instock:' #66ff99' ,
			text_instock:'#004d1a',
			bg_lowstock:'#ff6666',
			text_lowstock:'#990000',
			bg_outofstock:'#b3b3b3',
			text_outofstock:'#1a1a1a',

		
		},


  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [],
} satisfies Config;
