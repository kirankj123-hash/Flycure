/**
 * Design Tokens V2 - Atomic Design System
 * Single source of truth for all design decisions
 * Components should ONLY use these tokens, never hardcode values
 * 
 * Token Philosophy:
 * - Atomic: Each token represents one specific design decision
 * - Composable: Tokens combine to create component styles
 * - Semantic: Names describe purpose, not implementation
 * - Consistent: Same token = same visual result everywhere
 */

// ==================== COLOR TOKENS ====================
export const colorTokens = {
  // Brand Colors
  brand: {
    primary: 'emerald-500',
    primaryDark: 'emerald-600',
    primaryLight: 'emerald-400',
    secondary: 'blue-600',
    secondaryDark: 'blue-700',
    accent: 'amber-500',
  },
  
  // Background Colors
  background: {
    primary: 'bg-white',
    secondary: 'bg-gray-50',
    tertiary: 'bg-gray-100',
    dark: 'bg-gray-900',
    darkSecondary: 'bg-gray-800',
    darkTertiary: 'bg-gray-700',
    brand: 'bg-emerald-500',
    brandDark: 'bg-emerald-600',
  },
  
  // Text Colors
  text: {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    tertiary: 'text-gray-500',
    muted: 'text-gray-400',
    inverse: 'text-white',
    brand: 'text-emerald-600',
    brandDark: 'text-emerald-700',
    link: 'text-blue-600',
    linkHover: 'text-blue-700',
  },
  
  // Border Colors
  border: {
    light: 'border-gray-200',
    default: 'border-gray-300',
    dark: 'border-gray-700',
    darkSecondary: 'border-gray-800',
    brand: 'border-emerald-500',
  },
  
  // State Colors
  state: {
    success: 'text-green-600',
    successBg: 'bg-green-50',
    successBorder: 'border-green-200',
    error: 'text-red-600',
    errorBg: 'bg-red-50',
    errorBorder: 'border-red-200',
    warning: 'text-yellow-600',
    warningBg: 'bg-yellow-50',
    warningBorder: 'border-yellow-200',
    info: 'text-blue-600',
    infoBg: 'bg-blue-50',
    infoBorder: 'border-blue-200',
  },
} as const;

// ==================== SPACING TOKENS ====================
export const spacingTokens = {
  // Container Widths
  container: {
    sm: 'max-w-3xl mx-auto',
    md: 'max-w-5xl mx-auto',
    lg: 'max-w-7xl mx-auto',
    xl: 'max-w-full mx-auto',
    full: 'w-full',
  },
  
  // Padding Scales (all sides)
  padding: {
    none: 'p-0',
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
    '2xl': 'p-16',
  },
  
  // Padding X (horizontal)
  px: {
    none: 'px-0',
    xs: 'px-2',
    sm: 'px-4',
    md: 'px-6',
    lg: 'px-8',
    xl: 'px-12',
  },
  
  // Padding Y (vertical)
  py: {
    none: 'py-0',
    xs: 'py-2',
    sm: 'py-4',
    md: 'py-6',
    lg: 'py-8',
    xl: 'py-12',
    '2xl': 'py-16',
    '3xl': 'py-24',
  },
  
  // Padding Top
  pt: {
    none: 'pt-0',
    xs: 'pt-2',
    sm: 'pt-4',
    md: 'pt-8',
    lg: 'pt-12',
    xl: 'pt-16',
  },
  
  // Padding Bottom
  pb: {
    none: 'pb-0',
    xs: 'pb-2',
    sm: 'pb-4',
    md: 'pb-8',
    lg: 'pb-12',
  },
  
  // Section Spacing (common page section patterns)
  section: {
    sm: 'py-8 px-4',
    md: 'py-12 px-4',
    lg: 'py-16 px-6',
    xl: 'py-24 px-8',
  },
  
  // Gap (flexbox/grid spacing)
  gap: {
    none: 'gap-0',
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  },
  
  // Space Between (vertical spacing)
  spaceY: {
    none: 'space-y-0',
    xs: 'space-y-2',
    sm: 'space-y-4',
    md: 'space-y-6',
    lg: 'space-y-8',
  },
  
  // Space Between (horizontal spacing)
  spaceX: {
    none: 'space-x-0',
    xs: 'space-x-2',
    sm: 'space-x-4',
    md: 'space-x-6',
    lg: 'space-x-8',
  },
  
  // Margin
  margin: {
    auto: 'mx-auto',
    none: 'm-0',
    xs: 'm-2',
    sm: 'm-4',
    md: 'm-6',
    lg: 'm-8',
  },
  
  // Margin Top
  mt: {
    none: 'mt-0',
    xs: 'mt-2',
    sm: 'mt-4',
    md: 'mt-8',
    lg: 'mt-12',
    xl: 'mt-16',
  },
  
  // Margin Bottom
  mb: {
    none: 'mb-0',
    xs: 'mb-2',
    sm: 'mb-4',
    md: 'mb-8',
    lg: 'mb-12',
  },
} as const;

// ==================== TYPOGRAPHY TOKENS ====================
export const typographyTokens = {
  // Font Families
  family: {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono',
  },
  
  // Font Sizes
  size: {
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
  
  // Font Weights
  weight: {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
  
  // Heading Styles (pre-composed)
  heading: {
    h1: 'text-4xl md:text-5xl font-bold tracking-tight',
    h2: 'text-3xl md:text-4xl font-bold',
    h3: 'text-2xl md:text-3xl font-semibold',
    h4: 'text-xl md:text-2xl font-semibold',
    h5: 'text-lg md:text-xl font-medium',
    h6: 'text-base md:text-lg font-medium',
  },
  
  // Line Heights
  leading: {
    tight: 'leading-tight',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
  },
  
  // Text Alignment
  align: {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  },
} as const;

// ==================== LAYOUT TOKENS ====================
export const layoutTokens = {
  // Flexbox Layouts
  flex: {
    row: 'flex flex-row',
    col: 'flex flex-col',
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-center justify-start',
    end: 'flex items-center justify-end',
    wrap: 'flex flex-wrap',
  },
  
  // Grid Layouts
  grid: {
    cols1: 'grid grid-cols-1',
    cols2: 'grid grid-cols-1 md:grid-cols-2',
    cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    cols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    cols6: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  },
  
  // Positioning
  position: {
    relative: 'relative',
    absolute: 'absolute',
    fixed: 'fixed',
    sticky: 'sticky',
  },
  
  // Z-Index
  zIndex: {
    base: 'z-0',
    dropdown: 'z-10',
    sticky: 'z-20',
    fixed: 'z-30',
    modal: 'z-40',
    popover: 'z-50',
  },
  
  // Display
  display: {
    block: 'block',
    inline: 'inline',
    inlineBlock: 'inline-block',
    hidden: 'hidden',
    flex: 'flex',
    grid: 'grid',
  },
} as const;

// ==================== BORDER TOKENS ====================
export const borderTokens = {
  // Border Width
  width: {
    none: 'border-0',
    thin: 'border',
    thick: 'border-2',
    top: 'border-t',
    bottom: 'border-b',
    left: 'border-l',
    right: 'border-r',
  },
  
  // Border Radius
  radius: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  },
} as const;

// ==================== SHADOW TOKENS ====================
export const shadowTokens = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  base: 'shadow',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  inner: 'shadow-inner',
} as const;

// ==================== TRANSITION TOKENS ====================
export const transitionTokens = {
  none: 'transition-none',
  fast: 'transition-all duration-150',
  base: 'transition-all duration-300',
  slow: 'transition-all duration-500',
  colors: 'transition-colors duration-300',
  transform: 'transition-transform duration-300',
  shadow: 'transition-shadow duration-300',
  opacity: 'transition-opacity duration-300',
} as const;

// ==================== INTERACTIVE STATE TOKENS ====================
export const stateTokens = {
  // Hover Effects
  hover: {
    scale: 'hover:scale-105',
    scaleDown: 'hover:scale-95',
    lift: 'hover:-translate-y-1',
    shadow: 'hover:shadow-lg',
    opacity: 'hover:opacity-80',
    brighten: 'hover:brightness-110',
  },
  
  // Focus States
  focus: {
    ring: 'focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
    ringDark: 'focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0',
    outline: 'focus:outline-none focus:ring-2 focus:ring-emerald-500',
    border: 'focus:border-emerald-500',
  },
  
  // Active States
  active: {
    scale: 'active:scale-95',
    brightness: 'active:brightness-90',
  },
  
  // Disabled States
  disabled: {
    opacity: 'disabled:opacity-50',
    cursor: 'disabled:cursor-not-allowed',
    grayscale: 'disabled:grayscale',
  },
} as const;

// ==================== COMBINED TOKENS OBJECT ====================
export const tokens = {
  colors: colorTokens,
  spacing: spacingTokens,
  typography: typographyTokens,
  layout: layoutTokens,
  borders: borderTokens,
  shadows: shadowTokens,
  transitions: transitionTokens,
  states: stateTokens,
} as const;

// ==================== COMPONENT PATTERNS ====================
// Pre-composed patterns for common component types
// These are the SINGLE SOURCE OF TRUTH for component styling
export const componentPatterns = {
  // Card Patterns
  card: {
    base: `${colorTokens.background.primary} ${borderTokens.radius.lg} ${shadowTokens.md} ${spacingTokens.padding.md} ${borderTokens.width.thin} ${colorTokens.border.light}`,
    interactive: `${transitionTokens.base} ${stateTokens.hover.lift} ${stateTokens.hover.shadow}`,
    flat: `${colorTokens.background.secondary} ${borderTokens.radius.md} ${spacingTokens.padding.sm}`,
    clickable: `group cursor-pointer ${transitionTokens.base} ${stateTokens.hover.scale}`,
    header: spacingTokens.mb.sm,
    title: `${typographyTokens.size.lg} ${typographyTokens.weight.semibold} ${spacingTokens.mb.xs} ${colorTokens.text.primary}`,
    description: colorTokens.text.secondary,
    icon: `w-8 h-8 ${colorTokens.text.brand}`,
  },
  
  // Button Patterns - Complete button system
  button: {
    // Base structure with all common properties
    base: `${spacingTokens.px.md} ${spacingTokens.py.sm} ${borderTokens.radius.md} ${typographyTokens.weight.medium} ${transitionTokens.colors} inline-flex items-center justify-center ${typographyTokens.size.sm} ${stateTokens.focus.outline} ${stateTokens.disabled.opacity} ${stateTokens.disabled.cursor}`,
    
    // Color variants
    primary: `${colorTokens.background.brand} ${colorTokens.text.inverse} hover:${colorTokens.background.brandDark} ${shadowTokens.sm}`,
    secondary: `${colorTokens.background.secondary} ${colorTokens.text.primary} hover:${colorTokens.background.tertiary} ${shadowTokens.sm}`,
    destructive: `${colorTokens.background.dark} ${colorTokens.text.inverse} hover:brightness-90 ${shadowTokens.sm}`,
    outline: `${colorTokens.background.primary} ${colorTokens.border.default} ${borderTokens.width.thin} hover:${colorTokens.background.secondary}`,
    ghost: `hover:${colorTokens.background.secondary} ${transitionTokens.colors}`,
    link: `${colorTokens.text.brand} underline-offset-4 hover:underline`,
    
    // Size variants
    sm: `h-8 ${borderTokens.radius.md} ${spacingTokens.px.sm} ${typographyTokens.size.xs}`,
    default: `h-9 ${spacingTokens.px.sm} ${spacingTokens.py.xs}`,
    lg: `h-10 ${borderTokens.radius.md} ${spacingTokens.px.lg}`,
    icon: 'h-9 w-9',
  },
  
  // Input Patterns - Complete form system
  input: {
    base: `${spacingTokens.container.full} ${spacingTokens.px.sm} ${spacingTokens.py.sm} ${borderTokens.radius.md} ${borderTokens.width.thin} ${colorTokens.border.default} ${stateTokens.focus.ring} ${transitionTokens.colors} ${colorTokens.background.primary} ${typographyTokens.size.base}`,
    error: `${colorTokens.state.errorBorder} ${stateTokens.focus.ringDark}`,
    label: `${typographyTokens.size.sm} ${typographyTokens.weight.medium} ${colorTokens.text.primary} ${spacingTokens.mb.xs}`,
    errorMessage: `${typographyTokens.size.sm} ${colorTokens.state.error} ${spacingTokens.mt.xs}`,
    field: spacingTokens.spaceY.xs,
  },
  
  // Form Patterns
  form: {
    container: `${spacingTokens.container.sm} ${spacingTokens.margin.auto} ${spacingTokens.spaceY.md}`,
    section: spacingTokens.spaceY.sm,
    buttonGroup: `${layoutTokens.flex.row} ${spacingTokens.gap.sm} ${spacingTokens.mt.md}`,
    optional: `${typographyTokens.size.sm} ${colorTokens.text.muted}`,
  },
  
  // Section Patterns
  section: {
    base: spacingTokens.section.lg,
    contained: `${spacingTokens.container.lg} ${spacingTokens.section.lg}`,
    hero: `${layoutTokens.position.relative} ${spacingTokens.section.xl} bg-gradient-to-br from-emerald-50 to-blue-50`,
    content: `${spacingTokens.container.lg} ${spacingTokens.margin.auto} ${spacingTokens.section.md}`,
    feature: `${spacingTokens.section.xl} ${colorTokens.background.secondary}`,
  },
  
  // Navigation Patterns - Complete nav system
  nav: {
    header: `${layoutTokens.position.fixed} top-0 ${spacingTokens.container.full} ${layoutTokens.zIndex.fixed} ${colorTokens.background.primary} ${shadowTokens.sm} ${borderTokens.width.bottom} ${colorTokens.border.light}`,
    container: `${spacingTokens.container.lg} ${spacingTokens.px.sm}`,
    content: `${layoutTokens.flex.between} h-16`,
    logo: `${layoutTokens.flex.start} ${spacingTokens.spaceX.xs}`,
    brand: `${typographyTokens.size['2xl']} ${typographyTokens.weight.bold} ${colorTokens.text.brand}`,
    links: `hidden md:flex items-center ${spacingTokens.spaceX.lg}`,
    link: `${colorTokens.text.secondary} hover:${colorTokens.text.link} ${typographyTokens.weight.medium} ${transitionTokens.colors}`,
    cta: `${spacingTokens.px.md} ${spacingTokens.py.sm}`,
    
    // Mobile nav
    mobile: {
      button: `md:hidden ${spacingTokens.padding.xs} ${borderTokens.radius.md} hover:${colorTokens.background.secondary}`,
      menu: `md:hidden ${layoutTokens.position.absolute} top-16 left-0 right-0 ${colorTokens.background.primary} ${borderTokens.width.bottom} ${shadowTokens.lg}`,
      link: `${colorTokens.text.secondary} hover:${colorTokens.text.primary} ${typographyTokens.weight.medium} ${spacingTokens.px.sm} ${spacingTokens.py.xs} ${transitionTokens.colors}`,
      cta: `${spacingTokens.container.full}`,
    },
    
    // Footer nav
    footer: {
      container: `${colorTokens.background.dark} ${colorTokens.text.inverse}`,
      inner: `${spacingTokens.container.lg} ${spacingTokens.section.md}`,
      grid: `${layoutTokens.grid.cols4} ${spacingTokens.gap.lg}`,
      section: spacingTokens.spaceY.sm,
      heading: `${typographyTokens.size.lg} ${typographyTokens.weight.semibold} ${colorTokens.text.inverse} ${spacingTokens.mb.sm}`,
      link: `${colorTokens.text.inverse} ${stateTokens.hover.opacity} ${transitionTokens.colors} ${typographyTokens.size.sm}`,
      bottom: `${spacingTokens.mt.lg} ${spacingTokens.pt.lg} ${borderTokens.width.top} border-gray-700 ${layoutTokens.flex.between} ${layoutTokens.flex.wrap} ${spacingTokens.gap.sm}`,
      copyright: `${typographyTokens.size.sm} ${colorTokens.text.inverse}`,
    },
  },
  
  // Hero Patterns
  hero: {
    container: `${layoutTokens.position.relative} ${spacingTokens.py['2xl']} ${spacingTokens.px.sm} bg-gradient-to-br from-emerald-50 to-blue-50`,
    content: `${spacingTokens.container.lg} ${spacingTokens.margin.auto} ${typographyTokens.align.center}`,
    title: `${typographyTokens.heading.h1} ${colorTokens.text.primary} ${spacingTokens.mb.md}`,
    subtitle: `${typographyTokens.size.xl} ${colorTokens.text.secondary} ${spacingTokens.mb.lg}`,
    description: `${typographyTokens.size.lg} ${colorTokens.text.secondary} ${spacingTokens.mb.lg} max-w-2xl ${spacingTokens.margin.auto}`,
    cta: `${layoutTokens.flex.center} ${spacingTokens.gap.sm} ${layoutTokens.flex.wrap}`,
    image: `${spacingTokens.mt.lg} ${borderTokens.radius.lg} ${shadowTokens['2xl']}`,
    // Deprecated - for backward compatibility
    card: spacingTokens.container.lg,
    highlight: colorTokens.text.brand,
  },
  
  // Layout Patterns
  layout: {
    page: `min-h-screen ${colorTokens.background.secondary}`,
    container: spacingTokens.container.lg,
    section: spacingTokens.section.md,
    grid: {
      two: `${layoutTokens.grid.cols2} ${spacingTokens.gap.lg}`,
      three: `${layoutTokens.grid.cols3} ${spacingTokens.gap.lg}`,
      four: `${layoutTokens.grid.cols4} ${spacingTokens.gap.md}`,
    },
    // Deprecated - for backward compatibility, use layout.page instead
    page_legacy: {
      root: `min-h-screen ${colorTokens.background.secondary}`,
      main: 'flex-1',
      section: `${spacingTokens.container.lg} ${spacingTokens.section.md}`,
      grid: `${layoutTokens.grid.cols3} ${spacingTokens.gap.md}`,
    },
    twoColumn: `${layoutTokens.grid.cols2} ${spacingTokens.gap.sm}`,
  },
  
  // List Patterns
  list: {
    vertical: spacingTokens.spaceY.sm,
    horizontal: `${spacingTokens.spaceX.sm} ${layoutTokens.flex.row}`,
    unordered: `list-disc list-inside ${spacingTokens.spaceY.xs}`,
    ordered: `list-decimal list-inside ${spacingTokens.spaceY.xs}`,
  },
  
  // Image Patterns
  image: {
    cover: 'object-cover',
    contain: 'object-contain',
    responsive: `${borderTokens.radius.lg} ${shadowTokens.md}`,
  },
} as const;

// ==================== TYPE EXPORTS ====================
export type DesignTokens = typeof tokens;
export type ComponentPatterns = typeof componentPatterns;
export type ColorTokens = typeof colorTokens;
export type SpacingTokens = typeof spacingTokens;
