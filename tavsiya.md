# 3D Shadow Components Guide

Bu faylda platformadagi 3D shadow stilini qo'llash uchun barcha reusable componentlar va classlar haqida ma'lumot berilgan.

## 📦 Components

### 1. Card3D
3D shadow effekti bilan card component.

```tsx
import Card3D from "@/app/components/Card3D";

// Basic usage
<Card3D className="p-8">
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card3D>

// With click handler
<Card3D onClick={() => console.log("clicked")} className="p-6">
  Content
</Card3D>

// Without hover effect
<Card3D hover={false} className="p-4">
  Static card
</Card3D>
```

**Props:**
- `children`: ReactNode - Card ichidagi content
- `className?`: string - Qo'shimcha Tailwind classlar
- `onClick?`: () => void - Click handler
- `hover?`: boolean - Hover effektini yoqish/o'chirish (default: true)

---

### 2. Button3D
3D shadow effekti bilan button component.

```tsx
import Button3D from "@/app/components/Button3D";

// Gradient button (default)
<Button3D onClick={() => console.log("clicked")}>
  Click Me
</Button3D>

// White button
<Button3D variant="white" fullWidth>
  White Button
</Button3D>

// Outline button
<Button3D variant="outline" className="px-6 py-3">
  Outline Button
</Button3D>

// Disabled button
<Button3D disabled>
  Disabled
</Button3D>
```

**Props:**
- `children`: ReactNode - Button ichidagi content
- `variant?`: "gradient" | "white" | "outline" - Button turi (default: "gradient")
- `fullWidth?`: boolean - To'liq kenglikda (default: false)
- `className?`: string - Qo'shimcha Tailwind classlar
- `disabled?`: boolean - Disabled holati
- `...props`: ButtonHTMLAttributes - Barcha HTML button attributelari

---

### 3. Icon3D
Gradient background bilan icon container.

```tsx
import Icon3D from "@/app/components/Icon3D";
import { Heart } from "lucide-react";

// Basic usage
<Icon3D gradient="cyan-blue">
  <Heart className="w-6 h-6 text-white" />
</Icon3D>

// Different gradients
<Icon3D gradient="pink-red" size="lg">
  <Heart className="w-8 h-8 text-white" />
</Icon3D>

<Icon3D gradient="purple-indigo" size="sm">
  <Mail className="w-5 h-5 text-white" />
</Icon3D>
```

**Props:**
- `children`: ReactNode - Icon (masalan, Lucide icon)
- `gradient?`: "cyan-blue" | "pink-red" | "purple-indigo" | "green-emerald" - Gradient turi (default: "cyan-blue")
- `size?`: "sm" | "md" | "lg" - Icon container hajmi (default: "md")
- `className?`: string - Qo'shimcha Tailwind classlar

---

## 🎨 CSS Classes

### Global 3D Shadow Classes

```css
/* Base 3D shadow - har qanday element uchun */
.shadow-3d

/* Card uchun - hover bilan translate */
.card-3d

/* Card uchun - hover bilan faqat shadow (translate yo'q) */
/* Fixed/sticky elementlar uchun (Navbar, dropdown, va h.k.) */
.card-3d-static

/* Button uchun - gradient background bilan */
.btn-3d

/* Legacy support - eski kod uchun */
.btn-gradient

/* Icon container uchun */
.icon-3d
```

### Qo'llanish misollari:

```tsx
// Direct class usage
<div className="shadow-3d rounded-2xl p-6 bg-white dark:bg-dark-bg">
  Content
</div>

// Card class (hover bilan translate)
<div className="card-3d rounded-3xl p-8">
  Card content
</div>

// Static card (hover bilan faqat shadow, translate yo'q)
// Navbar, dropdown, fixed elementlar uchun
<nav className="card-3d-static rounded-3xl">
  Navbar content
</nav>

// Button class
<button className="btn-3d rounded-2xl px-6 py-3">
  Click me
</button>
```

---

## 🎯 Dashboard Example

```tsx
import Card3D from "@/app/components/Card3D";
import Button3D from "@/app/components/Button3D";
import Icon3D from "@/app/components/Icon3D";
import { Briefcase, ArrowRight } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Action Card */}
      <Card3D className="p-8">
        <h3 className="text-2xl font-bold mb-4">Card Title</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Card description text here...
        </p>
        <Button3D fullWidth className="py-4 rounded-2xl text-lg">
          Action Button
          <ArrowRight className="w-5 h-5" />
        </Button3D>
      </Card3D>

      {/* Stats Card */}
      <Card3D className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Total Count
            </p>
            <p className="text-5xl font-bold text-gray-900 dark:text-white">
              42
            </p>
          </div>
          <Icon3D gradient="cyan-blue">
            <Briefcase className="w-6 h-6 text-white" />
          </Icon3D>
        </div>
        <button className="text-sm text-primary-600 hover:underline">
          View Details
        </button>
      </Card3D>
    </div>
  );
}
```

---

## 💡 Best Practices

1. **Card3D** - Barcha container va card elementlar uchun (hover bilan translate)
2. **card-3d-static** - Fixed/sticky elementlar uchun (Navbar, dropdown) - faqat shadow o'zgaradi
3. **Button3D** - Barcha asosiy buttonlar uchun
4. **Icon3D** - Gradient background kerak bo'lgan iconlar uchun
5. **shadow-3d class** - Oddiy elementlar uchun (input, select, va h.k.)

### ⚠️ Muhim:
- Navbar, dropdown, va boshqa fixed/sticky elementlar uchun `card-3d-static` ishlatilsin
- Bu horizontal scroll muammosini oldini oladi
- Regular cardlar uchun `card-3d` yoki `Card3D` component ishlatilsin

---

## 🔄 Migration Guide

Eski koddan yangi componentlarga o'tish:

```tsx
// ESKI ❌
<div className="bg-white dark:bg-dark-bg rounded-3xl p-8 border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
  Content
</div>

// YANGI ✅
<Card3D className="p-8">
  Content
</Card3D>

// =====================================

// ESKI ❌
<button className="w-full bg-linear-to-br from-[#38C9E6] to-[#43E8A0] text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
  Click
</button>

// YANGI ✅
<Button3D fullWidth className="py-4 rounded-2xl text-lg">
  Click
</Button3D>

// =====================================

// ESKI ❌
<div className="w-12 h-12 rounded-2xl bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center border-2 border-gray-900">
  <Icon className="w-6 h-6 text-white" />
</div>

// YANGI ✅
<Icon3D gradient="cyan-blue">
  <Icon className="w-6 h-6 text-white" />
</Icon3D>
```

---

## 📝 Notes

- Barcha componentlar dark mode ni qo'llab-quvvatlaydi
- Hover effektlari avtomatik qo'shiladi
- Border va shadow o'lchamlari bir xil (consistency)
- Transition animatsiyalari smooth (0.2s ease)



1. Global Background (Page level) - Eng quyuq
   └─ dark:bg-[#1E2A38] yoki dark:bg-gray-900

2. Content Container (Card level) - O'rtacha
   └─ dark:bg-dark-bg (#2A3442) ✅ 

3. Nested Elements (Inner cards) - Yorug'roq
   └─ dark:bg-dark-surface (#34495E)

4. Interactive Elements (Hover states) - Eng yorug'
   └─ dark:bg-gray-600


SpinerLoading va skelotonLoading lardan fodayaln ok 