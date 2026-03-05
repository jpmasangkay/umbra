# Glassmorphism Card System Guide

## Overview

This weather app features a complete glassmorphism card system with:
- **Backdrop Blur**: 10px frosted glass effect for depth
- **Gradient Borders**: Smooth animated color transitions
- **Hover Effects**: Lift animation and enhanced glow
- **Dark Mode Support**: Optimized for both light and dark themes

## Features

### 1. Backdrop Blur Effect
The cards use CSS `backdrop-filter: blur(10px)` to create a frosted glass appearance, allowing the background to show through with a blurred effect.

```css
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

### 2. Gradient Borders
Cards feature animated gradient borders that transition smoothly using CSS animations:

```css
.glass-card-gradient {
  background: linear-gradient(rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)) padding-box,
              linear-gradient(135deg, rgba(100, 200, 255, 0.4), rgba(150, 100, 255, 0.3), rgba(100, 200, 255, 0.2)) border-box;
  border: 1.5px solid transparent;
}
```

The gradient uses a multi-color palette:
- Blue to Purple: `rgba(100, 200, 255, 0.4)` → `rgba(150, 100, 255, 0.3)`
- Back to Blue: `rgba(100, 200, 255, 0.2)`

### 3. Hover Effects
On hover, cards:
- Lift up slightly: `transform: translateY(-2px)`
- Enhance the glow with increased box shadow
- Brighten the gradient border
- All transitions use smooth cubic-bezier timing

```css
.glass-card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

### 4. Pulsing Glow Animation
Cards have a subtle continuous pulsing glow:

```css
@keyframes glow-pulse {
  0%, 100% {
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.05);
  }
  50% {
    box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.1);
  }
}
```

## Usage

### Basic Card Usage

```tsx
import Card from './components/cards/Card'

// Glassmorphic card with gradient border (default)
<Card 
  title="Weather Information"
  glassmorphic={true}
>
  <p>Your content here</p>
</Card>

// Standard card (traditional design)
<Card 
  title="Information"
  glassmorphic={false}
>
  <p>Your content here</p>
</Card>
```

### Props

- **`title`** (string, required): The card heading
- **`children`** (React.ReactNode, required): Card content
- **`glassmorphic`** (boolean, optional, default: `true`): Enable glassmorphism style
- **`childrenClassName`** (string, optional): Additional classes for content wrapper
- **`className`** (string, optional): Additional classes for card container

## Color Scheme

### Light Mode
- Background: `rgba(255, 255, 255, 0.08)`
- Border: `rgba(255, 255, 255, 0.15)`
- Gradient: Blue → Purple → Blue
  - `rgba(100, 200, 255, 0.4)`
  - `rgba(150, 100, 255, 0.3)`
  - `rgba(100, 200, 255, 0.2)`

### Dark Mode
- Background: `rgba(30, 30, 46, 0.7)`
- Border: `rgba(255, 255, 255, 0.08)`
- Gradient: Blue → Purple → Blue (adjusted opacity)
  - `rgba(100, 150, 255, 0.3)`
  - `rgba(150, 100, 255, 0.25)`
  - `rgba(100, 150, 255, 0.15)`

## CSS Classes

### Core Classes
- **`.glass-card`**: Base glassmorphic styling (optional, inherited through Card component)
- **`.glass-card-gradient`**: Applies gradient border effect
- **`.glass-card-hover`**: Adds smooth hover animations

### Usage in Custom Components

```tsx
// Create a custom glassmorphic element
<div className="glass-card-gradient glass-card-hover rounded-2xl p-6">
  <h3>Custom Glass Card</h3>
</div>
```

## Animation Details

### Fade-in Animation
All card content fades in over 2 seconds:
```css
animation: fade-in 2s ease-out forwards;
```

### Glow Pulse
Cards pulse with a 3-second cycle:
```css
animation: glow-pulse 3s ease-in-out infinite;
```

### Hover Lift
Smooth 0.3s transition with cubic-bezier easing:
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

## Dark Mode Support

The design automatically adapts to dark mode using the `.dark` class:

```css
.dark .glass-card-gradient {
  background: linear-gradient(...dark values...);
}

.dark .glass-card-hover:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

## Performance Considerations

1. **Backdrop Filter**: GPU-accelerated in modern browsers
2. **Animations**: Use `will-change` for heavy animations (automatic in hover state)
3. **Transform**: Uses `transform: translateY()` which is GPU-friendly
4. **Border Gradients**: Uses `border-box` technique for performance

## Browser Support

- Modern Chrome/Edge: Full support
- Firefox: Full support (requires `-webkit-` prefix for backdrop-filter)
- Safari: Full support with `-webkit-` prefix
- Mobile: Excellent support on iOS Safari and Chrome Mobile

## Customization

### Change Gradient Colors
Edit the gradient values in `src/index.css`:

```css
.glass-card-gradient {
  background: linear-gradient(...padding-box...),
              linear-gradient(135deg, 
                rgba(YOUR_COLOR_1, 0.4), 
                rgba(YOUR_COLOR_2, 0.3), 
                rgba(YOUR_COLOR_3, 0.2)) border-box;
}
```

### Adjust Blur Amount
Modify the `backdrop-filter` value:

```css
.glass-card {
  backdrop-filter: blur(15px); /* Increase for more blur */
}
```

### Change Animation Speed
Adjust the animation duration in the keyframes:

```css
.glass-card-gradient {
  animation: glow-pulse 5s ease-in-out infinite; /* Change 3s to desired duration */
}
```

## Access the Showcase

Click the ✨ button in the header to view the interactive glassmorphism showcase with all card variants and effects.

---

**Version**: 1.0.0  
**Last Updated**: 2026  
**Framework**: React + Tailwind CSS + TypeScript
