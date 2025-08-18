# MWC Advocates - Design System & Consistency Guidelines

## Color Palette

### Primary Colors
- **Primary Green**: `#0c3110` (--primary-green)
  - Used for: Navigation text, borders, primary elements
  - Tailwind class: `text-primary-green`, `bg-primary-green`, `border-primary-green`

- **Gold/Yellow Accent**: `#fbbf24` (--yellow-accent)
  - Used for: Buttons, accents, highlights, icons
  - Tailwind classes: `text-yellow-400`, `bg-yellow-400`, `border-yellow-400`
  - Hover variant: `#f59e0b` (yellow-300, yellow-500)

### Secondary Colors
- **Text Dark**: `#1a1a1a` (--text-dark)
- **Text Light**: `#6b7280` (--text-light / gray-600)
- **Background**: White `#ffffff`
- **Card Background**: Slate-800 for dark cards `#1e293b`

## Typography

### Headings
- **H1**: `text-4xl md:text-5xl lg:text-6xl font-bold`
- **H2**: `text-3xl md:text-4xl font-bold`
- **H3**: `text-lg font-semibold`

### Body Text
- **Large**: `text-xl` or `text-lg`
- **Regular**: `text-base`
- **Small**: `text-sm`

## Button Styles

### Primary Buttons (Yellow/Gold)
```css
bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-lg font-semibold text-lg transition duration-300 shadow-lg
```

### Secondary Buttons (Outlined)
```css
border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 hover:text-black transition duration-300
```

### Dark Background Buttons (White)
```css
bg-white text-primary-green px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition duration-300
```

## Card Styles

### Welcome Section Cards (Dark)
```css
bg-slate-800 text-white p-6 rounded-lg
```
- Icons: Yellow background `bg-yellow-500` with dark text
- Headings: White text
- Body: Gray-300 text

### Service Cards (Transparent/Glass)
```css
bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300
```

### Testimonial Cards (White)
```css
bg-white p-8 rounded-2xl shadow-lg relative
```
- Stars: `text-yellow-400`
- Quote accent: `bg-yellow-400` rounded circle

## Layout Consistency

### Section Spacing
- Standard: `py-20`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### Grid Patterns
- 2-column: `grid grid-cols-1 lg:grid-cols-2 gap-16`
- 4-column services: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`
- 3-column testimonials: `grid grid-cols-1 md:grid-cols-3 gap-8`

## Animation Guidelines

### Minimal Animations Only
- **Fade in**: `fade-in-up` class for page elements
- **Hover effects**: Subtle `translateY(-1px)` or `translateY(-2px)`
- **Transitions**: `transition duration-300` for all interactive elements

### Avoid
- Complex animations
- Excessive transforms
- Gradient animations
- Pulse effects
- Float animations

## Accessibility

### Focus States
```css
focus:border-primary-green focus:ring-3 focus:ring-primary-green/10
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
    animation-duration: 0.01ms !important;
}
```

## Brand Guidelines

### Logo Usage
- Dark logo (`MWC_BLACK.svg`) on light backgrounds
- White logo (`MWC_WHITE.svg`) on dark backgrounds
- Always maintain aspect ratio
- Minimum size: 40px height

### Tone
- Professional and trustworthy
- Clean and premium aesthetic
- Avoid "overdone" or flashy elements
- Consistent spacing and alignment

## Implementation Checklist

- [ ] All buttons use consistent yellow/gold colors
- [ ] Text hierarchy follows established patterns
- [ ] Cards use appropriate background colors for context
- [ ] Icons use yellow accents on dark backgrounds
- [ ] Hover states are subtle and professional
- [ ] Spacing follows grid system
- [ ] Color contrast meets accessibility standards
- [ ] Mobile responsiveness maintained
