// FlyCure Design System v3.0 - Token-Based Architecture
// Clean separation between design tokens and component styles

// =============================================
// DESIGN TOKENS
// =============================================

// Base design tokens
const tokens = {
  // Colors
  colors: {
    primary: 'bg-emerald-500 text-white',
    primaryText: 'text-emerald-600',
    primaryHover: 'hover:bg-emerald-600',
    secondary: 'bg-blue-600 text-white',
    secondaryHover: 'hover:bg-blue-700',
    accent: 'bg-emerald-50 text-emerald-700',
    muted: 'bg-gray-100 text-gray-600',
    destructive: 'bg-red-500 text-white',
    destructiveHover: 'hover:bg-red-600',
  },
  
  // Typography
  text: {
    xs: 'text-xs',
    sm: 'text-sm', 
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
  },
  
  // Font weights
  font: {
    semibold: 'font-semibold',
    medium: 'font-medium',
    bold: 'font-bold',
  },
  
  // Spacing
  spacing: {
    xs: 'p-1',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  },
  
  // Borders & Radius
  borders: {
    base: 'border border-gray-200',
    focus: 'focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
    rounded: 'rounded-md',
    destructive: 'border-destructive',
    focusDestructive: 'focus-visible:ring-destructive',
  },
  
  // Shadows
  shadows: {
    sm: 'shadow-sm',
    base: 'shadow',
    lg: 'shadow-lg',
  },
  
  // Transitions
  transitions: {
    base: 'transition-colors duration-200',
    fast: 'transition-all duration-150',
    shadow: 'transition-shadow',
  },
  
  // Layout & Grid
  layout: {
    screenMin: 'min-h-screen',
    flex1: 'flex-1',
    grid1: 'grid grid-cols-1',
    grid2: 'md:grid-cols-2',
    grid3: 'lg:grid-cols-3',
    grid4: 'lg:grid-cols-4',
    gap4: 'gap-4',
    body: 'min-h-screen bg-background font-sans antialiased',
  },
  
  // Background patterns
  backgrounds: {
    page: 'bg-gray-50',
    card: 'bg-white',
    primary: 'bg-emerald-500',
  },
  
  // Sizing
  sizing: {
    full: 'w-full',
    w8: 'w-8',
    h8: 'h-8',
    h48: 'h-48',
    h64: 'h-64',
  },
  
  // Responsive spacing
  responsive: {
    p4: 'p-4',
    p6: 'p-6',
    ml64: 'md:ml-64',
    mb2: 'mb-2',
    mb4: 'mb-4',
    mt8: 'mt-8',
  },
  
  // Visibility
  visibility: {
    mdHidden: 'md:hidden',
    srOnly: 'sr-only',
  },
  
  // Space utilities
  space: {
    y4: 'space-y-4',
    py8: 'py-8',
  }
} as const;

// =============================================
// COMPONENT-READY STYLES
// =============================================

// Compose tokens into component styles
export const styles = {
  // Button system using tokens
  button: {
    // Base button structure
    base: `inline-flex items-center justify-center whitespace-nowrap ${tokens.borders.rounded} ${tokens.text.sm} font-medium ${tokens.transitions.base} focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`,
    
    // Color variants using tokens
    primary: `${tokens.colors.primary} ${tokens.colors.primaryHover}`,
    secondary: 'bg-blue-600 text-white hover:bg-blue-700',
    destructive: `${tokens.colors.destructive} ${tokens.colors.destructiveHover} ${tokens.shadows.sm}`,
    outline: `${tokens.borders.base} bg-background hover:bg-accent hover:text-accent-foreground`,
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: `${tokens.colors.primaryText} underline-offset-4 hover:underline`,
    
    // Size variants using tokens
    sm: `h-8 ${tokens.borders.rounded} px-3 ${tokens.text.xs}`,
    default: `h-9 px-4 py-2`,
    lg: `h-10 ${tokens.borders.rounded} px-8`,
    icon: 'h-9 w-9',
  },

  // Form system using tokens
  form: {
    field: 'space-y-2',
    label: `text-sm font-medium text-gray-700`,
    input: `flex h-11 md:h-12 w-full rounded-lg border border-gray-300 bg-background px-4 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600`,
    textarea: `flex min-h-[60px] w-full ${tokens.borders.rounded} ${tokens.borders.base} bg-transparent px-3 py-2 ${tokens.text.sm} ${tokens.shadows.sm} ${tokens.borders.focus} placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
    error: `${tokens.text.sm} text-destructive`,
    required: 'text-destructive ml-1',
    optional: `text-muted-foreground ${tokens.text.xs} ml-1`,
  },

  // Consultation Form
  consultationForm: {
    section: 'bg-gray-50 py-16 md:py-24 px-4',
    container: 'w-full max-w-lg mx-auto text-center p-6 md:p-8 space-y-6 bg-white rounded-2xl shadow-lg',
    title: 'text-2xl md:text-4xl font-bold text-black',
    subtitle: 'text-sm text-gray-600',
    stepTitle: 'text-base font-semibold text-gray-800',
    form: 'space-y-6 text-left',
    button: 'w-full md:w-auto px-8 py-3 rounded-full text-base font-semibold',
  },

  // Navigation styles
  nav: {
    header: 'sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b transition-colors duration-300',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    content: 'h-20 flex items-center justify-between',
    logoContainer: 'flex items-center',
    brand: 'font-bold text-xl text-black',
    desktopNav: 'hidden md:flex items-center space-x-6 text-sm text-text-secondary',
    
    // Desktop Dropdown
    dropdown: {
      group: 'group relative',
      button: 'flex items-center font-medium hover:text-fly-blue transition focus:outline-none',
      icon: 'w-4 h-4 ml-1',
      menu: 'dropdown-menu absolute pt-4 left-1/2 -translate-x-1/2 min-w-[300px] bg-white rounded-xl  text-left opacity-0 invisible transition-all duration-200 transform-gpu translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0',
      item: 'submenu-item flex items-start p-4 space-x-3 text-text-primary transition hover:bg-surface',
      itemIcon: 'text-fly-blue flex-shrink-0 w-5 h-5',
      itemContent: 'flex flex-col',
      itemTitle: 'font-semibold',
      itemDescription: 'text-xs text-text-secondary',
    },



    // Utilities
    utilities: 'hidden md:flex items-center space-x-4',
    utilityLink: 'text-sm font-medium hover:text-fly-blue transition',
    langCurrency: 'text-xs text-text-secondary flex items-center space-x-2',
    langCurrencyItem: 'cursor-pointer hover:text-fly-blue',
    cta: 'text-sm font-semibold bg-blue-800 text-white px-4 py-2 rounded-full shadow-md hover:bg-fly-blue-hover hover:shadow-lg transition',

    // Mobile
    mobile: {
      drawer: 'fixed top-0 right-0 w-64 h-full bg-white shadow-2xl z-50 p-6 md:hidden transition-transform duration-300 ease-out translate-x-full',
      drawerActive: 'translate-x-0',
      backdrop: 'fixed inset-0 bg-black/40 z-40 md:hidden',
      drawerHeader: 'flex justify-between items-center mb-8',
      drawerTitle: 'font-bold text-lg text-black',
      closeButton: 'text-text-secondary',
      menuIcon: 'w-6 h-6',
      nav: 'space-y-6 text-base',
      accordionHeader: 'font-bold text-text-primary mb-2 cursor-pointer flex justify-between items-center',
      accordionIcon: 'w-4 h-4 inline ml-1 transition-transform',
      accordionContent: 'pl-3 space-y-2 text-text-secondary',
      accordionLink: 'block hover:text-fly-blue',
      divider: 'border-hairline my-4',
      utilityContainer: 'flex flex-col space-y-4',
      utilityLink: 'block text-base font-semibold text-text-primary hover:text-fly-blue',
      cta: 'block text-lg font-semibold text-white px-4 py-2 rounded-full bg-fly-blue shadow-md hover:shadow-lg transition mt-8 text-center',
    },
  },
  section: {
    title: 'text-4xl text-center font-bold tracking-tight mb-4',
    subtitle: 'text-xl text-center text-text-secondary mb-12 max-w-2xl mx-auto',
  },
    hero: {
    container: 'bg-white py-14 md:py-24 px-4 text-center',
    content: 'max-w-4xl mx-auto',
    title: 'text-5xl md:text-[56px] leading-[1.1] font-extrabold tracking-tight text-text-primary mb-6',
    subtitle: 'text-xl text-text-secondary mb-10 max-w-xl mx-auto',
    actions: 'flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4',
    primaryAction: 'text-lg font-semibold text-white px-8 py-4 rounded-full bg-blue-800 shadow-lg hover:shadow-xl hover:bg-fly-blue-hover transition w-full sm:w-auto',
    secondaryAction: 'text-lg font-semibold text-text-secondary border border-text-secondary px-8 py-4 rounded-full hover:text-fly-blue hover:border-fly-blue transition w-full sm:w-auto',
    secondaryActionIcon: 'w-5 h-5 transition-transform group-hover:translate-x-1',
    features: 'flex flex-wrap justify-center gap-x-6 gap-y-2 pt-6',
    featureItem: 'flex items-center gap-2 text-sm text-gray-700',
    featureIcon: 'w-4 h-4 text-emerald-500',
  },

  // Footer styles
  footer: {
    container: 'bg-gray-900 text-white',
    inner: 'max-w-7xl mx-auto px-4 py-12',
    grid: 'grid grid-cols-1 md:grid-cols-4 gap-8',
    section: 'space-y-4',
    heading: 'text-lg font-semibold text-white mb-4',
    linksList: 'space-y-2',
    link: 'text-gray-300 hover:text-white transition-colors',
    address: 'text-gray-300 space-y-1',
    newsletter: 'space-y-4',
    newsletterForm: 'flex space-x-2',
    newsletterInput: 'flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
    bottomBar: 'border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0',
    copyright: 'text-gray-400 text-center md:text-left',
    socialLinks: 'flex space-x-4',
    socialIcon: 'w-5 h-5',
  },

  // Enquiry Form styles
  enquiryForm: {
    container: 'max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6',
    fieldContainer: 'space-y-2',
    label: 'text-sm font-medium text-gray-700',
    requiredIndicator: 'text-red-500 ml-1',
    optionalIndicator: 'text-gray-400 text-xs ml-1',
    select: 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
    errorText: 'text-sm text-red-600 mt-1',
  },

  // Layout patterns
  layout: {
    page: 'min-h-screen bg-background',
    main: 'flex-1', 
    section: 'max-w-7xl mx-auto px-4 py-8',
    twoColumn: 'grid grid-cols-1 md:grid-cols-2 gap-4',
    heroGrid: 'grid grid-cols-2 gap-4',
  },

  // Common patterns
  image: {
    hero: 'rounded-lg shadow-md',
    heroMd: 'w-full h-48',
    heroLg: 'w-full h-64', 
  },

  // Spacing utilities (only the ones actually used)
  space: {
    y1: 'space-y-1',
    y2: 'space-y-2',
    y4: 'space-y-4', 
    py8: 'py-8',
  },

  // Page layouts
  page: {
    
    root: `${tokens.layout.screenMin} ${tokens.backgrounds.page}`,
    main: `${tokens.layout.flex1} ${tokens.responsive.ml64} ${tokens.responsive.p4}`,
    section: `${tokens.responsive.mt8} ${tokens.backgrounds.card} ${tokens.responsive.p6} ${tokens.borders.rounded} ${tokens.shadows.sm}`,
    grid: `${tokens.layout.grid1} ${tokens.layout.grid2} ${tokens.layout.grid3} ${tokens.layout.gap4}`,
    stepsGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8',
  },

  // Feature Grid Section
  featureGrid: {
    container: 'bg-gray-50 py-16 md:py-24 px-4',
    title: 'text-3xl md:text-4xl font-bold text-center mb-12',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto',
  },

  // Card components
  card: {
    base: 'flex flex-col p-8 bg-white rounded-xl shadow-sm transition-shadow hover:shadow-lg h-full',
    alignCenter: 'text-center items-center',
    alignLeft: 'text-left items-start',
    bordered: 'border-t-4 border-blue-600',
    header: 'mb-4',
    stepIconContainer: 'w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-6',
    stepIcon: 'w-8 h-8 text-blue-600',
    title: 'text-xl font-bold text-gray-900',
    description: 'text-base text-gray-600 mt-2 flex-grow',
    highlightedText: 'text-emerald-600 text-sm font-semibold mt-4',
    icon: 'w-8 h-8 text-gray-500',
    link: 'mt-auto pt-4 flex items-center gap-1 text-blue-600 font-medium hover:underline',
    bottomLink: 'text-sm text-gray-600 hover:text-gray-900 mt-4',
    linkIcon: 'w-4 h-4 transition-transform group-hover:translate-x-1',
  },

  // Step Card component
  stepCard: {
    base: 'flex flex-col items-center text-center space-y-4',
    stepCircle: 'w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl mx-auto',
    arrowIcon: 'text-blue-600 w-8 h-8 transform rotate-90 lg:rotate-0',
    title: 'font-bold text-gray-900 text-base mt-4',
    description: 'text-sm text-gray-600',
  },

  // Pillars of Care Section
  pillarsOfCare: {
    container: 'bg-white py-16 md:py-24 px-4',
    header: 'text-center max-w-3xl mx-auto mb-12 md:mb-16',
    title: 'text-3xl md:text-4xl font-bold text-gray-900',
    subtitle: 'text-base md:text-lg text-gray-600 mt-4',
    list: 'flex flex-col gap-10 md:gap-12 max-w-2xl mx-auto',
    item: 'flex flex-col items-center text-center',
    icon: 'w-8 h-8 text-blue-600 mb-4',
    content: 'flex flex-col',
    itemTitle: 'text-xl md:text-2xl font-bold text-gray-900',
    stepNumber: '',
    itemDescription: 'text-sm md:text-base text-gray-600 mt-2',
  },

  // Testimonial Slider
  testimonialSlider: {
    container: 'bg-gray-50 py-16 md:py-24 px-4',
    title: 'text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12',
    content: 'relative w-full max-w-3xl mx-auto flex flex-col items-center justify-center space-y-6',
    quote: 'text-lg md:text-2xl text-gray-700 leading-relaxed text-center font-normal',
    authorContainer: 'text-center pt-4',
    author: 'text-base font-semibold text-gray-900',
    location: 'text-sm text-gray-500 mt-1',
    navigation: 'flex items-center justify-center gap-3 pt-6',
    navButton: 'p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50',
    navIcon: 'w-5 h-5 text-gray-600',
  },

  // FAQ / Accordion Section
  faq: {
    container: 'w-full max-w-3xl mx-auto',
    title: 'text-3xl font-bold text-center mb-8 md:text-4xl md:mb-12',
    list: 'space-y-4',
    item: 'border-b border-gray-200 py-4',
    trigger: 'w-full flex justify-between items-center text-left',
    questionText: 'text-base md:text-lg font-semibold text-gray-900',
    icon: 'w-5 h-5 text-blue-600 flex-shrink-0 ml-4',
    content: 'pt-4',
    answerText: 'text-sm md:text-base text-gray-600 leading-relaxed',
    ctaContainer: 'text-center mt-8',
    ctaButton: 'inline-flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100',
  },

  // Journey Section
  journey: {
    container: 'bg-white py-16 md:py-24 px-4',
    title: 'text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16',
    stepsContainer: 'grid grid-cols-1 justify-items-center gap-y-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:gap-x-8 lg:items-start',
    list: 'grid grid-cols-1 md:grid-cols-3 gap-10',
    card: 'bg-white rounded-xl shadow-lg p-6 text-center',
    step: 'text-4xl font-bold text-fly-blue mb-3 block',
    description: 'text-text-secondary',
  },

  // Hero grid specific styles  
  heroGrid: {
    container: `${tokens.layout.grid1} ${tokens.layout.gap4}`,
    column: `${tokens.space.y4}`,
    columnWithPadding: `${tokens.space.y4} ${tokens.space.py8}`,
    imageLarge: `${tokens.sizing.full} ${tokens.sizing.h64}`,
    imageSmall: `${tokens.sizing.full} ${tokens.sizing.h48}`,
  },

  // Accessibility
  a11y: {
    srOnly: `${tokens.visibility.srOnly}`,
  },

  // About Page
  aboutPage: {
    container: 'bg-gray-50 py-16 md:py-24 px-4',
    content: 'max-w-3xl mx-auto',
    title: 'text-4xl md:text-5xl font-bold text-gray-900 mb-8',
    paragraph: 'text-base md:text-lg text-gray-700 leading-relaxed mb-6',
  },

  // Vision & Mission Section
  visionMission: {
    container: 'bg-gray-50 pb-16 md:pb-24 px-4',
    grid: 'grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto',
  },

  // Core Values Section
  coreValues: {
    container: 'bg-white py-16 md:py-24 px-4',
    header: 'text-center max-w-3xl mx-auto mb-12',
    title: 'text-3xl md:text-4xl font-bold text-gray-900',
    subtitle: 'text-base md:text-lg text-gray-600 mt-2',
    grid: 'flex flex-wrap justify-center gap-8 max-w-5xl mx-auto',
    card: 'bg-gray-50 rounded-xl p-6 w-full sm:w-64 md:w-72',
    cardIcon: 'w-8 h-8 text-blue-600',
    cardTitle: 'text-lg font-bold text-gray-900',
    cardDescription: 'text-sm text-gray-600 mt-1',
  },

  // Leadership Section
  leadership: {
    container: 'bg-gray-50 py-16 md:py-24 px-4',
    header: 'text-center max-w-3xl mx-auto mb-12',
    title: 'text-3xl md:text-4xl font-bold text-gray-900',
    subtitle: 'text-base md:text-lg text-gray-600 mt-2',
    grid: 'grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto',
  },

  // Profile Card
  profileCard: {
    container: 'flex flex-col items-center text-center space-y-4',
    avatar: 'w-28 h-28',
    name: 'text-lg font-bold text-gray-900',
    title: 'text-sm font-medium text-blue-600',
    description: 'text-sm text-gray-600 mt-2',
    socialLink: 'flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mt-4',
    socialIcon: 'w-5 h-5',
  },

  // Avatar
  avatar: {
    base: 'relative flex h-full w-full items-center justify-center rounded-full bg-white shadow-md',
    initials: 'text-3xl font-semibold text-blue-600',
  },

  // Accredited Partners Section
  accreditedPartners: {
    container: 'bg-white py-16 md:py-24 px-4',
    header: 'text-center max-w-3xl mx-auto mb-12',
    title: 'text-3xl md:text-4xl font-bold text-gray-900',
    subtitle: 'text-base md:text-lg text-gray-600 mt-2',
    grid: 'flex flex-wrap justify-center items-center gap-8',
    partner: 'bg-gray-50 px-6 py-3 rounded-md text-gray-500 font-medium',
  },

  // Our Journey Section
  ourJourney: {
    container: 'bg-white pt-0 pb-16 md:pb-24 px-4',
    header: 'text-center max-w-3xl mx-auto mb-16',
    title: 'text-3xl md:text-4xl font-bold text-gray-900',
    subtitle: 'text-base md:text-lg text-gray-600 mt-2',
    timeline: 'relative flex flex-col md:flex-row justify-center items-start gap-8 md:gap-0 max-w-5xl mx-auto',
    milestone: 'relative flex-1 flex flex-col items-center text-center px-4',
    dot: 'w-3 h-3 bg-blue-600 rounded-full mb-3',
    year: 'text-lg font-bold text-gray-900',
    description: 'text-sm text-gray-600 mt-1',
    line: 'hidden md:block absolute top-1.5 left-0 right-0 w-full h-0.5 bg-gray-200 -z-10',
  },

  // Detailed Journey Section
  detailedJourney: {
    container: 'bg-gray-50 py-16 md:py-24 px-4',
    grid: 'grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto',
  },

  // Patient Trust Section
  patientTrust: {
    container: 'bg-white py-16 md:py-24 px-4',
    header: 'text-center max-w-3xl mx-auto mb-12',
    title: 'text-3xl md:text-4xl font-bold text-gray-900',
    subtitle: 'text-base md:text-lg text-gray-600 mt-2',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto',
    card: 'bg-gray-50 p-6 rounded-lg',
    cardTitle: 'text-lg font-bold text-gray-900',
    cardDescription: 'text-sm text-gray-600 mt-2',
  },
} as const;

// =============================================
// UTILITY & TYPES
// =============================================

// =============================================
// UTILITY FUNCTIONS & EXPORTS
// =============================================

export function combineTokens(...tokenClasses: (string | undefined | null | false)[]): string {
  return tokenClasses.filter(Boolean).join(' ');
}

// Export tokens for direct use when needed
export { tokens };

export type StyleTokens = typeof styles;
export type ComponentStyles = keyof typeof styles;
export type DesignTokens = typeof tokens;