# 🎨 Buddy Team - Modern Dizayn Sistema v2.0

Buddy Team platformasi uchun **premium, modern va professional** dizayn sistema. Mentorship, community va personal growth-ga fokuslanmış.

---

## � Dizayn Filosofiyasi

**Buddy Team** - bu o'quvchilar va kuratorlar orasidagi **do'stlik va o'zaro rivojlanish** platformasi. Dizayn bu qadriyatlarni aks ettirishi kerak:

- **Warm & Welcoming** - Oila kabi muhit
- **Clear & Intuitive** - Foydalanuvchi-markazli
- **Modern & Professional** - Zamonaviy texnologiya
- **Accessible & Inclusive** - Barcha uchun ochiq

---

## 🎨 Rang Palitirasi

### Primary Colors (Asosiy Ranglar)

```
🔵 Sapphire Blue (Asosiy)
  - Primary: #0F5FFF
  - Light: #4D8FFF
  - Dark: #0A3FCC
  - Pale: #E6F0FF

🟢 Emerald Green (Muvaffaqiyat)
  - Primary: #10B981
  - Light: #34D399
  - Dark: #059669
  - Pale: #ECFDF5

🔴 Rose Red (Xatolik/Attention)
  - Primary: #F43F5E
  - Light: #FB7185
  - Dark: #E11D48
  - Pale: #FFE4E6

🟡 Amber Gold (Ogohlantirish)
  - Primary: #F59E0B
  - Light: #FBBF24
  - Dark: #D97706
  - Pale: #FFFBEB

🟣 Purple Violet (Accent)
  - Primary: #8B5CF6
  - Light: #A78BFA
  - Dark: #7C3AED
  - Pale: #F3E8FF
```

### Neutral Colors (Neytral Ranglar)

```
Light Mode:
  - Background: #FFFFFF (White)
  - Surface: #F8FAFC (Slate-50)
  - Secondary: #F1F5F9 (Slate-100)
  - Border: #E2E8F0 (Slate-200)
  - Text Primary: #0F172A (Slate-900)
  - Text Secondary: #475569 (Slate-600)
  - Text Tertiary: #94A3B8 (Slate-400)

Dark Mode:
  - Background: #0F172A (Slate-900)
  - Surface: #1E293B (Slate-800)
  - Secondary: #334155 (Slate-700)
  - Border: #475569 (Slate-600)
  - Text Primary: #F1F5F9 (Slate-100)
  - Text Secondary: #CBD5E1 (Slate-300)
  - Text Tertiary: #94A3B8 (Slate-400)
```

### Gradient Combinations

```
🌅 Sunrise (Hero sections)
  from-blue-600 via-purple-500 to-pink-500

🌊 Ocean (Cards)
  from-blue-500 to-cyan-400

🌿 Forest (Success states)
  from-emerald-500 to-teal-400

🔥 Sunset (Highlights)
  from-orange-500 to-rose-500
```

---

## 📦 Core Components

### 1. GlassCard
Glassmorphism effekti bilan card component.

```tsx
import GlassCard from "@/components/GlassCard";

// Basic usage
<GlassCard className="p-6">
  <h3 className="text-xl font-bold">Card Title</h3>
  <p className="text-sm text-gray-600">Content here...</p>
</GlassCard>

// With hover effect
<GlassCard hover className="p-8">
  Interactive card
</GlassCard>

// With border accent
<GlassCard accent="indigo" className="p-6">
  Accent card
</GlassCard>
```

**Props:**
- `children`: ReactNode - Card ichidagi content
- `className?`: string - Qo'shimcha Tailwind classlar
- `hover?`: boolean - Hover effektini yoqish (default: false)
- `accent?`: "indigo" | "emerald" | "red" | "amber" - Border rangi
- `onClick?`: () => void - Click handler

---

### 2. PrimaryButton
Asosiy button component.

```tsx
import PrimaryButton from "@/components/PrimaryButton";

// Default (Indigo)
<PrimaryButton onClick={handleClick}>
  Click Me
</PrimaryButton>

// Different variants
<PrimaryButton variant="emerald" size="lg">
  Success Action
</PrimaryButton>

<PrimaryButton variant="outline" fullWidth>
  Outline Button
</PrimaryButton>

<PrimaryButton disabled>
  Disabled
</PrimaryButton>

// With icon
<PrimaryButton icon={<ArrowRight className="w-4 h-4" />}>
  Continue
</PrimaryButton>
```

**Props:**
- `children`: ReactNode - Button text
- `variant?`: "solid" | "outline" | "ghost" - Button turi (default: "solid")
- `color?`: "indigo" | "emerald" | "red" | "amber" - Rang (default: "indigo")
- `size?`: "sm" | "md" | "lg" - Hajmi (default: "md")
- `fullWidth?`: boolean - To'liq kenglik
- `disabled?`: boolean - Disabled holati
- `icon?`: ReactNode - Icon
- `loading?`: boolean - Loading holati
- `...props`: ButtonHTMLAttributes

---

### 3. Badge
Status va label uchun badge component.

```tsx
import Badge from "@/components/Badge";

// Status badges
<Badge status="active">Active</Badge>
<Badge status="pending">Pending</Badge>
<Badge status="inactive">Inactive</Badge>

// Color variants
<Badge color="indigo">Indigo</Badge>
<Badge color="emerald">Success</Badge>
<Badge color="red">Error</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

**Props:**
- `children`: ReactNode - Badge text
- `status?`: "active" | "pending" | "inactive" - Status turi
- `color?`: "indigo" | "emerald" | "red" | "amber" - Rang
- `size?`: "sm" | "md" | "lg" - Hajmi (default: "md")
- `icon?`: ReactNode - Icon

---

### 4. StatCard
Statistika ko'rsatish uchun card.

```tsx
import StatCard from "@/components/StatCard";
import { Users, TrendingUp } from "lucide-react";

<StatCard
  icon={<Users className="w-6 h-6" />}
  label="Total Students"
  value="124"
  change="+12%"
  trend="up"
  color="indigo"
/>

<StatCard
  icon={<TrendingUp className="w-6 h-6" />}
  label="Progress"
  value="78%"
  change="-5%"
  trend="down"
  color="emerald"
/>
```

**Props:**
- `icon`: ReactNode - Icon
- `label`: string - Label text
- `value`: string | number - Asosiy qiymat
- `change?`: string - O'zgarish miqdori
- `trend?`: "up" | "down" - Trend yo'nalishi
- `color?`: "indigo" | "emerald" | "red" | "amber" - Rang

---

### 5. InputField
Standart input component.

```tsx
import InputField from "@/components/InputField";

// Basic
<InputField
  label="Email"
  type="email"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// With error
<InputField
  label="Password"
  type="password"
  error="Password is required"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

// With icon
<InputField
  label="Search"
  icon={<Search className="w-4 h-4" />}
  placeholder="Search..."
/>
```

**Props:**
- `label?`: string - Label text
- `type?`: string - Input type (default: "text")
- `placeholder?`: string - Placeholder text
- `value?`: string - Input value
- `onChange?`: (e: ChangeEvent) => void - Change handler
- `error?`: string - Error message
- `icon?`: ReactNode - Icon
- `disabled?`: boolean - Disabled holati
- `...props`: InputHTMLAttributes

---

### 6. Modal
Modal dialog component.

```tsx
import Modal from "@/components/Modal";

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  size="md"
>
  <p className="text-gray-600 mb-6">Are you sure?</p>
  <div className="flex gap-3">
    <PrimaryButton variant="outline" onClick={handleClose}>
      Cancel
    </PrimaryButton>
    <PrimaryButton color="red" onClick={handleConfirm}>
      Delete
    </PrimaryButton>
  </div>
</Modal>
```

**Props:**
- `isOpen`: boolean - Modal ochiq/yopiq
- `onClose`: () => void - Close handler
- `title?`: string - Modal title
- `children`: ReactNode - Modal content
- `size?`: "sm" | "md" | "lg" - Modal hajmi (default: "md")
- `closeButton?`: boolean - Close button ko'rsatish (default: true)

---

## 🎯 Layout Components

### PageContainer
Sahifa uchun container.

```tsx
<PageContainer>
  <PageHeader title="Dashboard" subtitle="Welcome back" />
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Content */}
  </div>
</PageContainer>
```

### PageHeader
Sahifa header component.

```tsx
<PageHeader
  title="Students"
  subtitle="Manage all students"
  action={<PrimaryButton>Add Student</PrimaryButton>}
/>
```

### Grid Layouts
```tsx
// 2 column
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

// 3 column
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// 4 column
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

---

## 🎨 Utility Classes

### Spacing
```
p-4, p-6, p-8 - Padding
m-4, m-6, m-8 - Margin
gap-4, gap-6, gap-8 - Gap
```

### Typography
```
text-xs, text-sm, text-base, text-lg, text-xl, text-2xl
font-normal, font-medium, font-semibold, font-bold
text-gray-600, text-gray-900, text-indigo-600
```

### Borders & Shadows
```
border border-gray-200
rounded-lg, rounded-xl, rounded-2xl
shadow-sm, shadow-md, shadow-lg
```

### Hover Effects
```
hover:bg-gray-50
hover:shadow-md
hover:scale-105
transition-all duration-200
```

---

## 📱 Responsive Design

### Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Usage
```tsx
// Mobile first
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Items */}
</div>

// Hidden on mobile
<div className="hidden md:block">
  Desktop only
</div>
```

---

## 🌙 Dark Mode

Barcha componentlar dark mode ni qo'llab-quvvatlaydi:

```tsx
// Automatic dark mode support
<div className="bg-white dark:bg-[#1a1a1f]">
  <p className="text-gray-900 dark:text-gray-100">
    Content
  </p>
</div>
```

---

## 💡 Best Practices

1. **Consistency** - Barcha componentlarda bir xil spacing va sizing
2. **Accessibility** - ARIA labels va semantic HTML
3. **Performance** - Lazy loading va code splitting
4. **Mobile First** - Responsive design har doim mobile-dan boshlang
5. **Color Usage** - Rang faqat meaning uchun, accessibility uchun text ham qo'shing

### Component Usage Rules
- `GlassCard` - Barcha container va card elementlar uchun
- `PrimaryButton` - Barcha asosiy actionlar uchun
- `Badge` - Status va label ko'rsatish uchun
- `StatCard` - Statistika ko'rsatish uchun
- `InputField` - Barcha form inputlari uchun
- `Modal` - Confirmation va dialoglari uchun

---

## 🔄 Common Patterns

### Form Pattern
```tsx
<GlassCard className="p-8">
  <h2 className="text-2xl font-bold mb-6">Form Title</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <InputField label="Field 1" value={field1} onChange={...} />
    <InputField label="Field 2" value={field2} onChange={...} />
    <div className="flex gap-3 pt-4">
      <PrimaryButton variant="outline">Cancel</PrimaryButton>
      <PrimaryButton type="submit">Submit</PrimaryButton>
    </div>
  </form>
</GlassCard>
```

### List Pattern
```tsx
<GlassCard className="p-6">
  <h3 className="text-lg font-semibold mb-4">Items</h3>
  <div className="space-y-3">
    {items.map(item => (
      <div key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
        <span>{item.name}</span>
        <Badge status={item.status}>{item.status}</Badge>
      </div>
    ))}
  </div>
</GlassCard>
```

### Stats Pattern
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <StatCard icon={<Users />} label="Students" value="124" color="indigo" />
  <StatCard icon={<Award />} label="Curators" value="12" color="emerald" />
  <StatCard icon={<TrendingUp />} label="Progress" value="78%" color="amber" />
  <StatCard icon={<CheckCircle />} label="Completed" value="45" color="emerald" />
</div>
```

---

## 📝 Notes

- Barcha componentlar TypeScript bilan yozilgan
- Dark mode avtomatik qo'shiladi
- Accessibility (a11y) har doim prioritet
- Performance optimized (lazy loading, memoization)
- Mobile responsive by default 


---

## 📦 Core Components

### 1. 🎴 Card Component
Asosiy card component - barcha content uchun.

```tsx
<Card variant="default" hover>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Optional description</Card.Description>
  </Card.Header>
  <Card.Content>
    Content here...
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

**Variants:**
- `default` - Standart card (white/slate-800)
- `gradient` - Gradient background
- `outlined` - Border only
- `elevated` - Shadow bilan

**Props:**
- `hover?: boolean` - Hover effect (default: true)
- `className?: string` - Custom classes
- `onClick?: () => void` - Click handler

---

### 2. 🔘 Button Component
Barcha button turlari uchun.

```tsx
// Primary (Sapphire Blue)
<Button variant="primary" size="md">
  Primary Button
</Button>

// Secondary (Outline)
<Button variant="secondary" size="md">
  Secondary Button
</Button>

// Success (Emerald)
<Button variant="success" size="md">
  Success Button
</Button>

// Danger (Rose)
<Button variant="danger" size="md">
  Delete
</Button>

// Ghost (Transparent)
<Button variant="ghost" size="md">
  Ghost Button
</Button>

// With Icon
<Button icon={<Plus className="w-4 h-4" />}>
  Add New
</Button>

// Loading State
<Button loading>
  Processing...
</Button>

// Disabled
<Button disabled>
  Disabled
</Button>
```

**Variants:** `primary`, `secondary`, `success`, `danger`, `warning`, `ghost`
**Sizes:** `sm`, `md`, `lg`, `xl`
**Props:**
- `icon?: ReactNode` - Icon
- `loading?: boolean` - Loading state
- `disabled?: boolean` - Disabled state
- `fullWidth?: boolean` - Full width
- `className?: string` - Custom classes

---

### 3. 🏷️ Badge Component
Status va label ko'rsatish uchun.

```tsx
// Status Badges
<Badge status="active">Active</Badge>
<Badge status="pending">Pending</Badge>
<Badge status="inactive">Inactive</Badge>
<Badge status="completed">Completed</Badge>

// Color Variants
<Badge color="blue">Blue</Badge>
<Badge color="emerald">Success</Badge>
<Badge color="rose">Error</Badge>
<Badge color="amber">Warning</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// With Icon
<Badge icon={<CheckCircle className="w-3 h-3" />}>
  Verified
</Badge>

// Dot Indicator
<Badge dot color="emerald">
  Online
</Badge>
```

**Props:**
- `status?: "active" | "pending" | "inactive" | "completed"`
- `color?: "blue" | "emerald" | "rose" | "amber" | "purple"`
- `size?: "sm" | "md" | "lg"`
- `icon?: ReactNode`
- `dot?: boolean` - Colored dot indicator

---

### 4. 📊 StatCard Component
Statistika va metrics ko'rsatish uchun.

```tsx
<StatCard
  icon={<Users className="w-6 h-6" />}
  label="Total Students"
  value="124"
  change="+12%"
  trend="up"
  color="blue"
/>

<StatCard
  icon={<TrendingUp className="w-6 h-6" />}
  label="Completion Rate"
  value="78%"
  change="-5%"
  trend="down"
  color="emerald"
/>

<StatCard
  icon={<Award className="w-6 h-6" />}
  label="Active Curators"
  value="12"
  color="purple"
/>
```

**Props:**
- `icon: ReactNode` - Icon
- `label: string` - Label text
- `value: string | number` - Main value
- `change?: string` - Change percentage
- `trend?: "up" | "down"` - Trend direction
- `color?: "blue" | "emerald" | "rose" | "amber" | "purple"`

---

### 5. 📝 InputField Component
Form input component.

```tsx
// Basic
<InputField
  label="Email"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// With Error
<InputField
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

// With Icon
<InputField
  label="Search"
  icon={<Search className="w-4 h-4" />}
  placeholder="Search students..."
/>

// Textarea
<InputField
  label="Bio"
  type="textarea"
  placeholder="Tell us about yourself..."
  rows={4}
/>

// Select
<InputField
  label="Role"
  type="select"
  options={[
    { value: "student", label: "Student" },
    { value: "curator", label: "Curator" }
  ]}
/>
```

**Props:**
- `label?: string` - Label text
- `type?: string` - Input type (default: "text")
- `placeholder?: string` - Placeholder
- `value?: string` - Input value
- `onChange?: (e) => void` - Change handler
- `error?: string` - Error message
- `icon?: ReactNode` - Icon
- `disabled?: boolean` - Disabled state
- `required?: boolean` - Required field

---

### 6. 🎯 Avatar Component
User avatar component.

```tsx
// Image Avatar
<Avatar
  src="https://..."
  alt="John Doe"
  size="md"
/>

// Initials Avatar
<Avatar
  initials="JD"
  color="blue"
  size="md"
/>

// With Status
<Avatar
  src="https://..."
  status="online"
  size="lg"
/>

// Group Avatars
<AvatarGroup>
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar src="..." />
  <Avatar initials="+5" />
</AvatarGroup>
```

**Props:**
- `src?: string` - Image URL
- `alt?: string` - Alt text
- `initials?: string` - Initials (if no image)
- `size?: "sm" | "md" | "lg" | "xl"`
- `color?: "blue" | "emerald" | "rose" | "amber" | "purple"`
- `status?: "online" | "offline" | "away"`

---

### 7. 🔔 Alert Component
Notification va alert component.

```tsx
// Success Alert
<Alert type="success" title="Success!">
  Your profile has been updated successfully.
</Alert>

// Error Alert
<Alert type="error" title="Error">
  Something went wrong. Please try again.
</Alert>

// Warning Alert
<Alert type="warning" title="Warning">
  This action cannot be undone.
</Alert>

// Info Alert
<Alert type="info" title="Info">
  New features are available.
</Alert>

// Dismissible
<Alert type="success" dismissible onDismiss={handleDismiss}>
  Message here...
</Alert>
```

**Props:**
- `type: "success" | "error" | "warning" | "info"`
- `title?: string` - Alert title
- `children: ReactNode` - Alert message
- `dismissible?: boolean` - Show close button
- `onDismiss?: () => void` - Dismiss handler

---

### 8. 🎪 Modal Component
Dialog/Modal component.

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  size="md"
>
  <Modal.Body>
    <p>Are you sure you want to proceed?</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleConfirm}>
      Confirm
    </Button>
  </Modal.Footer>
</Modal>
```

**Props:**
- `isOpen: boolean` - Modal state
- `onClose: () => void` - Close handler
- `title?: string` - Modal title
- `size?: "sm" | "md" | "lg" | "xl"`
- `closeButton?: boolean` - Show close button (default: true)

---

### 9. 📋 Table Component
Data table component.

```tsx
<Table
  columns={[
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email" },
    { key: "status", label: "Status", render: (value) => <Badge status={value} /> },
    { key: "actions", label: "Actions", render: (_, row) => (
      <Button size="sm" variant="ghost">Edit</Button>
    )}
  ]}
  data={students}
  loading={isLoading}
  pagination={{ page: 1, pageSize: 10, total: 100 }}
  onPageChange={handlePageChange}
/>
```

**Props:**
- `columns: Column[]` - Column definitions
- `data: any[]` - Table data
- `loading?: boolean` - Loading state
- `pagination?: Pagination` - Pagination config
- `onPageChange?: (page) => void` - Page change handler
- `onSort?: (key) => void` - Sort handler

---

### 10. 🎨 Tabs Component
Tab navigation component.

```tsx
<Tabs defaultValue="overview" className="w-full">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="progress">Progress</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  
  <Tabs.Content value="overview">
    <Card>Overview content...</Card>
  </Tabs.Content>
  
  <Tabs.Content value="progress">
    <Card>Progress content...</Card>
  </Tabs.Content>
  
  <Tabs.Content value="settings">
    <Card>Settings content...</Card>
  </Tabs.Content>
</Tabs>
```

**Props:**
- `defaultValue: string` - Default active tab
- `value?: string` - Controlled value
- `onChange?: (value) => void` - Change handler

---

## 🎯 Layout Patterns

### Page Layout
```tsx
<div className="min-h-screen bg-slate-50 dark:bg-slate-900">
  <Navbar />
  
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <PageHeader
      title="Dashboard"
      subtitle="Welcome back"
      action={<Button>Add New</Button>}
    />
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard ... />
      <StatCard ... />
      <StatCard ... />
      <StatCard ... />
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <Table ... />
      </Card>
      <Card>
        <RecentActivity />
      </Card>
    </div>
  </main>
  
  <Footer />
</div>
```

### Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id} hover>
      <Card.Header>
        <Card.Title>{item.title}</Card.Title>
      </Card.Header>
      <Card.Content>
        {item.content}
      </Card.Content>
      <Card.Footer>
        <Button size="sm">View</Button>
      </Card.Footer>
    </Card>
  ))}
</div>
```

### Form Layout
```tsx
<Card className="max-w-2xl">
  <Card.Header>
    <Card.Title>Edit Profile</Card.Title>
  </Card.Header>
  <Card.Content>
    <form className="space-y-6">
      <InputField label="Full Name" />
      <InputField label="Email" type="email" />
      <InputField label="Bio" type="textarea" rows={4} />
      
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Field" />
        <InputField label="Role" type="select" />
      </div>
    </form>
  </Card.Content>
  <Card.Footer className="flex justify-end gap-3">
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary">Save</Button>
  </Card.Footer>
</Card>
```

---

## 🎨 Spacing System

```
xs: 4px (0.25rem)
sm: 8px (0.5rem)
md: 16px (1rem)
lg: 24px (1.5rem)
xl: 32px (2rem)
2xl: 48px (3rem)
3xl: 64px (4rem)
```

### Usage
```tsx
// Padding
className="p-4 md:p-6 lg:p-8"

// Margin
className="m-4 md:m-6"

// Gap
className="gap-4 md:gap-6"

// Space between
className="space-y-4 md:space-y-6"
```

---

## 📱 Responsive Breakpoints

```
Mobile: < 640px (sm)
Tablet: 640px - 1024px (md, lg)
Desktop: > 1024px (xl, 2xl)
```

### Mobile First Approach
```tsx
// Default (mobile)
className="text-sm p-4"

// Tablet and up
className="md:text-base md:p-6"

// Desktop and up
className="lg:text-lg lg:p-8"
```

---

## 🌙 Dark Mode

Barcha componentlar dark mode ni qo'llab-quvvatlaydi:

```tsx
// Automatic dark mode
<div className="bg-white dark:bg-slate-800">
  <p className="text-slate-900 dark:text-slate-100">
    Content
  </p>
</div>

// Using dark: prefix
className="bg-slate-50 dark:bg-slate-900"
className="text-slate-900 dark:text-slate-100"
className="border-slate-200 dark:border-slate-700"
```

---

## ✨ Animation & Transitions

### Hover Effects
```tsx
// Scale
className="hover:scale-105 transition-transform"

// Shadow
className="hover:shadow-lg transition-shadow"

// Color
className="hover:bg-blue-600 transition-colors"

// Combined
className="hover:scale-105 hover:shadow-lg transition-all"
```

### Loading States
```tsx
// Spinner
<div className="animate-spin">
  <Loader className="w-6 h-6" />
</div>

// Pulse
<div className="animate-pulse">
  <div className="h-4 bg-slate-200 rounded" />
</div>

// Skeleton
<Skeleton className="h-12 w-full rounded" />
```

### Transitions
```tsx
// Fade In
className="animate-in fade-in duration-300"

// Slide In
className="animate-in slide-in-from-left duration-300"

// Zoom In
className="animate-in zoom-in-95 duration-300"
```

---

## 🎯 Component Usage Examples

### Dashboard Overview
```tsx
<div className="space-y-8">
  {/* Stats */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatCard icon={<Users />} label="Students" value="124" color="blue" />
    <StatCard icon={<Award />} label="Curators" value="12" color="emerald" />
    <StatCard icon={<TrendingUp />} label="Progress" value="78%" color="purple" />
    <StatCard icon={<CheckCircle />} label="Completed" value="45" color="emerald" />
  </div>

  {/* Main Content */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <Card className="lg:col-span-2">
      <Card.Header>
        <Card.Title>Recent Activity</Card.Title>
      </Card.Header>
      <Card.Content>
        <Table columns={columns} data={data} />
      </Card.Content>
    </Card>

    <Card>
      <Card.Header>
        <Card.Title>Quick Actions</Card.Title>
      </Card.Header>
      <Card.Content className="space-y-3">
        <Button fullWidth>Add Student</Button>
        <Button fullWidth variant="secondary">View Reports</Button>
        <Button fullWidth variant="secondary">Settings</Button>
      </Card.Content>
    </Card>
  </div>
</div>
```

### Student Profile Card
```tsx
<Card hover>
  <Card.Content className="p-6">
    <div className="flex items-start gap-4">
      <Avatar src={student.avatar} size="lg" status="online" />
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold">{student.name}</h3>
          <Badge status={student.status} />
        </div>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          {student.bio}
        </p>
        
        <div className="flex gap-2">
          <Button size="sm">View Profile</Button>
          <Button size="sm" variant="secondary">Message</Button>
        </div>
      </div>
    </div>
  </Card.Content>
</Card>
```

---

## 💡 Best Practices

1. **Consistency** - Barcha componentlarda bir xil spacing va sizing
2. **Accessibility** - ARIA labels, semantic HTML, keyboard navigation
3. **Performance** - Lazy loading, code splitting, memoization
4. **Mobile First** - Responsive design har doim mobile-dan boshlang
5. **Color Usage** - Rang faqat meaning uchun, accessibility uchun text ham qo'shing
6. **Whitespace** - Yetarli whitespace uchun breathing room
7. **Typography** - Clear hierarchy va readable font sizes
8. **Feedback** - Loading, error, success states har doim ko'rsatilsin

---

## 🔄 Migration Checklist

- [ ] Barcha componentlar yangi design-ga o'tkazildi
- [ ] Dark mode test qilindi
- [ ] Mobile responsive test qilindi
- [ ] Accessibility test qilindi
- [ ] Performance optimized
- [ ] Documentation updated
- [ ] Team trained

---

## 📚 Resources

- **Tailwind CSS**: https://tailwindcss.com
- **Lucide Icons**: https://lucide.dev
- **Radix UI**: https://radix-ui.com
- **Headless UI**: https://headlessui.com

---

**Version**: 2.0
**Last Updated**: 2025
**Status**: Active