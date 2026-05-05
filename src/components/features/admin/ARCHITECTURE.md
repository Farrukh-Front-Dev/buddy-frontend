# Admin Panel Architecture

## Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                        App.tsx                               │
│                           │                                  │
│                           ▼                                  │
│                    AdminPanel.tsx                            │
│              (Main Container & Router)                       │
└─────────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ AdminHeader  │  │   AdminNav   │  │   Tab Views  │
│              │  │              │  │              │
│ - Title      │  │ - Tabs       │  │ - StatsTab   │
│ - Desc       │  │ - Badges     │  │ - Monitoring │
│ - Icon       │  │ - Active     │  │ - Users      │
└──────────────┘  └──────────────┘  │ - Requests   │
                                    │ - Seasons    │
                                    │ - Messages   │
                                    │ - Settings   │
                                    └──────────────┘
```

## StatsTab Component Tree

```
StatsTab
├── StatsCard (x4)
│   ├── Icon
│   ├── Badge
│   └── Value
│
└── Charts Grid
    ├── WeeklyProgressChart
    │   └── AreaChart (Recharts)
    │
    ├── StatusDistributionChart
    │   └── BarChart (Recharts)
    │
    ├── AttendancePieChart
    │   └── PieChart (Recharts)
    │
    └── TopCuratorsChart
        └── Progress Bars
```

## Data Flow

```
App.tsx
  │
  ├─ Props ──────────────────────────┐
  │                                  │
  ▼                                  ▼
AdminPanel                      Tab Components
  │                                  │
  ├─ State (activeTab)              │
  ├─ Navigation Handler             │
  │                                  │
  └─ Pass Props ────────────────────┤
                                     │
                                     ▼
                              Child Components
                              (Charts, Cards, etc.)
```

## State Management

### Local State (AdminPanel)
- `activeTab`: Current active tab
- Synced with URL params
- Persisted to localStorage

### Props Flow
```
App.tsx Props
    │
    ├─ user: UserData
    ├─ allUsers: UserData[]
    ├─ allProgress: StudentProgress[]
    ├─ seasons: Season[]
    ├─ notifications: Notification[]
    ├─ handlers: Functions
    │
    ▼
AdminPanel
    │
    └─ Passes to Tab Components
```

## Styling Architecture

### Design System
- **Colors**: Indigo, Purple, Green, Orange themes
- **Spacing**: Consistent padding/margins
- **Typography**: Font weights and sizes
- **Borders**: Consistent border styles
- **Shadows**: Layered shadow system

### Responsive Breakpoints
```
Mobile:  < 640px   (sm)
Tablet:  640-1024px (md)
Desktop: > 1024px  (lg)
```

### Component Patterns
```css
Card Pattern:
- bg-white/5
- backdrop-blur-[12px]
- border border-white/10
- rounded-[10px]
- shadow-xl

Button Pattern:
- px-4 py-3
- rounded-xl
- font-black uppercase
- transition-all
```

## File Organization

```
admin/
│
├── Core Files
│   ├── AdminPanel.tsx      # Main container
│   ├── index.ts           # Exports
│   └── README.md          # Documentation
│
├── components/            # Reusable UI
│   ├── AdminHeader.tsx
│   ├── AdminNavigation.tsx
│   ├── StatsCard.tsx
│   └── charts/
│       ├── WeeklyProgressChart.tsx
│       ├── StatusDistributionChart.tsx
│       ├── AttendancePieChart.tsx
│       └── TopCuratorsChart.tsx
│
└── tabs/                 # Tab content
    ├── StatsTab.tsx      ✅ Complete
    ├── MonitoringTab.tsx 📝 TODO
    ├── UsersTab.tsx      📝 TODO
    ├── RequestsTab.tsx   📝 TODO
    ├── SeasonsTab.tsx    📝 TODO
    ├── MessagesTab.tsx   📝 TODO
    └── SettingsTab.tsx   📝 TODO
```

## Performance Considerations

### Code Splitting Opportunities
```tsx
// Future optimization
const MonitoringTab = lazy(() => import('./tabs/MonitoringTab'));
const UsersTab = lazy(() => import('./tabs/UsersTab'));
// etc...
```

### Memoization
- `useMemo` for expensive calculations
- `useCallback` for event handlers
- React.memo for pure components

### Bundle Size
- Main AdminPanel: ~5KB
- Each tab: ~3-10KB
- Charts library: ~50KB (shared)

## Testing Strategy

### Unit Tests
```
✓ AdminPanel routing
✓ AdminHeader rendering
✓ AdminNavigation tab switching
✓ StatsCard variants
✓ Chart data transformation
```

### Integration Tests
```
✓ Tab navigation flow
✓ Data prop passing
✓ State synchronization
```

### E2E Tests
```
✓ Admin login → Stats view
✓ Tab switching
✓ Data updates
```

## Future Enhancements

1. **Animation System**
   - Framer Motion for transitions
   - Page transition animations
   - Loading states

2. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

3. **Internationalization**
   - Multi-language support
   - RTL support

4. **Advanced Features**
   - Export functionality
   - Print views
   - Dark/Light theme toggle
   - Customizable dashboards
