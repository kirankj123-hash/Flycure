// Component style utilities
// This file contains reusable style combinations for components

export const componentStyles = {
  // Layout styles
  page: "min-h-screen bg-gray-50",
  container: "container mx-auto px-4",
  
  // Navigation styles
  navigation: "bg-blue-600 text-white p-4",
  navigationTitle: "text-2xl font-bold",
  
  // Card styles
  card: "bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow",
  cardTitle: "text-lg font-semibold mb-2 text-gray-900",
  cardDescription: "text-gray-600",
  
  // Feature card styles
  featureGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12",
  featureIcon: "w-8 h-8 text-blue-600",
  
  // Form styles
  formSection: "bg-white p-8 rounded-xl shadow-sm border",
  formTitle: "text-2xl font-semibold mb-6 text-center",
  
  // Button styles
  button: {
    primary: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors",
    secondary: "bg-gray-200 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors",
  },
  
  // Footer styles
  footer: "bg-gray-800 text-white p-8 mt-12",
  footerContent: "container mx-auto text-center",
  
  // Hero styles
  heroSection: "mb-8",
  heroCard: "rounded-xl bg-white p-6 md:p-8 shadow-sm",
  heroGrid: "grid grid-cols-1 md:grid-cols-2 gap-8 items-center",
  heroTitle: "text-3xl md:text-5xl font-bold",
  heroHighlight: "text-emerald-400",
  heroSubtitle: "text-gray-600 text-lg",
  heroStats: "text-gray-500",
  
  // Gradient placeholders
  gradientPlaceholder: {
    blue: "rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center",
    emerald: "rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center",
    blueAlt: "rounded-lg bg-gradient-to-br from-blue-600 to-emerald-400 flex items-center justify-center",
    emeraldAlt: "rounded-lg bg-gradient-to-br from-emerald-600 to-blue-400 flex items-center justify-center",
  },
  
  placeholderText: "text-white font-semibold",
} as const;

// Utility function to combine classes
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};