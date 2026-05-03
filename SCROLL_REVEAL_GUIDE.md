# 🎬 Scroll Reveal Animation Guide

Professional scroll reveal animations have been implemented across the homepage sections.

## 📦 What's Included

### 1. **Custom Hook** - `useScrollReveal`
Location: `src/hooks/useScrollReveal.ts`

A reusable React hook that uses Intersection Observer API for performance-optimized scroll detection.

```typescript
const ref = useScrollReveal({ 
  threshold: 0.2,      // Trigger when 20% visible
  delay: 0.1,          // Delay in seconds
  triggerOnce: true    // Animate only once
});
```

### 2. **CSS Animations** - `scroll-reveal.css`
Location: `src/styles/scroll-reveal.css`

Professional animation variants:
- `scroll-reveal-fade-up` - Fade in from bottom
- `scroll-reveal-fade-down` - Fade in from top
- `scroll-reveal-fade-left` - Fade in from right
- `scroll-reveal-fade-right` - Fade in from left
- `scroll-reveal-scale` - Scale up animation
- `scroll-reveal-zoom` - Zoom in animation
- `scroll-reveal-flip` - 3D flip animation
- `scroll-reveal-blur` - Blur to clear animation
- `scroll-reveal-stagger` - Sequential child animations

### 3. **Implementation**
Applied to all homepage sections:
- ✅ HeroSection
- ✅ AboutSection
- ✅ CTASection

## 🎯 How It Works

### Step 1: Import the hook
```typescript
import { useScrollReveal } from '../../../hooks/useScrollReveal';
```

### Step 2: Create refs with options
```typescript
const headingRef = useScrollReveal({ threshold: 0.2, delay: 0.1 });
const imageRef = useScrollReveal({ threshold: 0.2, delay: 0.2 });
```

### Step 3: Attach to elements
```tsx
<h1 
  ref={headingRef}
  className="scroll-reveal-fade-up"
>
  Your Content
</h1>
```

## 🎨 Animation Types

### Fade Up (Most Common)
```tsx
<div 
  ref={ref}
  className="scroll-reveal-fade-up"
>
  Content slides up and fades in
</div>
```

### Stagger (For Lists/Grids)
```tsx
<div 
  ref={ref}
  className="scroll-reveal-stagger"
>
  <div>Item 1 - appears first</div>
  <div>Item 2 - appears second</div>
  <div>Item 3 - appears third</div>
</div>
```

### Scale (For Images/Cards)
```tsx
<div 
  ref={ref}
  className="scroll-reveal-scale"
>
  Scales from 90% to 100%
</div>
```

## ⚙️ Configuration Options

```typescript
interface ScrollRevealOptions {
  threshold?: number;      // 0-1, how much visible before trigger
  rootMargin?: string;     // Margin around viewport
  triggerOnce?: boolean;   // Animate once or every time
  delay?: number;          // Delay in seconds
}
```

### Examples:

**Trigger early (before fully visible)**
```typescript
useScrollReveal({ threshold: 0.1 })
```

**Trigger late (when mostly visible)**
```typescript
useScrollReveal({ threshold: 0.5 })
```

**Staggered delays**
```typescript
const heading = useScrollReveal({ delay: 0.1 });
const subtitle = useScrollReveal({ delay: 0.2 });
const cta = useScrollReveal({ delay: 0.3 });
```

**Repeat animation**
```typescript
useScrollReveal({ triggerOnce: false })
```

## 🚀 Performance

✅ Uses Intersection Observer (native browser API)
✅ Hardware-accelerated CSS transforms
✅ `will-change` optimization
✅ Automatic cleanup on unmount
✅ No external dependencies (except React)

## 📱 Browser Support

- ✅ Chrome/Edge 51+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Best Practices

### 1. **Threshold Selection**
- Hero sections: `0.1-0.2` (trigger early)
- Content sections: `0.2-0.3` (balanced)
- Footer/CTA: `0.3-0.5` (trigger when visible)

### 2. **Delay Timing**
- Sequential elements: 0.1s increments
- Independent sections: 0.1-0.2s
- Avoid delays > 0.5s (feels sluggish)

### 3. **Animation Choice**
- Text content: `fade-up` or `fade-right`
- Images/Cards: `scale` or `zoom`
- Lists/Grids: `stagger`
- Hero sections: `fade-up` + `scale` combo

### 4. **Accessibility**
- Animations respect `prefers-reduced-motion`
- Can be disabled via CSS:
```css
@media (prefers-reduced-motion: reduce) {
  .scroll-reveal * {
    animation: none !important;
    transition: none !important;
  }
}
```

## 🔧 Customization

### Create Custom Animation

1. Add CSS class in `scroll-reveal.css`:
```css
.scroll-reveal-custom {
  opacity: 0;
  transform: rotate(-10deg) scale(0.8);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-reveal-custom.is-visible {
  opacity: 1;
  transform: rotate(0) scale(1);
}
```

2. Use in component:
```tsx
<div ref={useScrollReveal()} className="scroll-reveal-custom">
  Custom animation!
</div>
```

## 🐛 Troubleshooting

**Animation not triggering?**
- Check if CSS is imported in `src/index.tsx`
- Verify element has enough height to scroll
- Try lower threshold value (0.1)

**Animation too fast/slow?**
- Adjust `transition` duration in CSS
- Default is 0.8s, try 0.6s or 1s

**Multiple animations conflicting?**
- Use only one animation class per element
- For complex animations, combine in custom class

## 📚 Examples in Codebase

Check these files for implementation examples:
- `src/components/features/home/HeroSection.tsx`
- `src/components/features/home/AboutSection.tsx`
- `src/components/features/home/CTASection.tsx`

## 🎉 Result

Professional, smooth scroll reveal animations that:
- ✨ Enhance user experience
- 🎯 Guide user attention
- 💫 Add polish and professionalism
- ⚡ Maintain excellent performance

---

**Built with ❤️ for Buddy Team Platform**
