# Design Document: Admin Panel Implementation

## Overview

The Admin Panel is a comprehensive administrative interface for the Buddy Platform built with React, TypeScript, and Framer Motion. It provides six main functional areas (tabs) for managing the platform: Monitoring, Users, Requests, Seasons, Messages, and Settings. The design follows the Buddy Design System's Neobrutalism aesthetic with bold borders, shadows, gradients, and color-coded sections.

The architecture emphasizes modularity, reusability, and maintainability by separating concerns into focused components. Shared components (User_Profile_Modal, Edit_Progress_Modal) are used across multiple tabs to ensure consistency. The design supports both desktop and mobile layouts with responsive breakpoints at 768px.

## Architecture

### Component Hierarchy

```
AdminPanel (main container)
├── AdminHeader (title, user info)
├── AdminNavigation (tab selector)
└── Tab Content (conditional rendering)
    ├── MonitoringTab
    │   ├── WeekSelector
    │   ├── SeasonSelector
    │   ├── FilterBar (search, curator, status, attendance)
    │   ├── CuratorProgressCard[] (paginated)
    │   │   └── StudentProgressTable/Cards
    │   └── ExcelExportButton
    ├── UsersTab
    │   ├── SearchBar
    │   ├── RoleFilterButtons
    │   ├── UserTable/Cards (paginated)
    │   └── UserActions
    ├── RequestsTab
    │   └── PendingCuratorGrid
    │       └── CuratorRequestCard[]
    ├── SeasonsTab
    │   ├── ActiveSeasonCard
    │   │   ├── SeasonInfo
    │   │   ├── DurationInput
    │   │   └── StartNewSeasonButton
    │   └── SeasonHistoryList
    │       └── SeasonHistoryItem[]
    ├── MessagesTab
    │   ├── SendMessageForm
    │   │   ├── TitleInput
    │   │   ├── TypeDropdown
    │   │   ├── TargetRoleDropdown
    │   │   ├── MessageTextarea
    │   │   └── SendButton
    │   └── MessageHistorySection
    │       └── MessageHistoryItem[]
    └── SettingsTab
        ├── RegistrationToggles
        ├── NotificationSettings
        └── SaveButton

Shared Modals (rendered at AdminPanel level)
├── UserProfileModal
│   ├── UserHeader (avatar, name, badges)
│   ├── UserInfo (email, field, bio)
│   ├── BuddyNetwork (curator/students)
│   ├── SkillsTags
│   ├── StatusManagement
│   ├── SocialLinks
│   └── DirectMessageForm
└── EditProgressModal
    ├── ProgressHeader (student, week)
    ├── MeetingDateInput
    ├── AttendanceToggle
    ├── GoalTextarea
    ├── StatusSelector
    ├── ProblemTextarea
    ├── SolutionTextarea
    └── ActionButtons (save, cancel)
```

### Data Flow

1. **Props-based data flow**: AdminPanel receives all data and callbacks as props from parent component
2. **State management**: Each tab manages its own local state (filters, pagination, form inputs)
3. **LocalStorage persistence**: Tab selection, monitoring week, and notification settings persist across sessions
4. **Modal state**: Modals are controlled by AdminPanel state to ensure proper overlay management
5. **Event callbacks**: All data mutations flow up through callback props (onUpdateProgress, onDeleteUser, etc.)

### Technology Stack

- **React 18+**: Component framework
- **TypeScript**: Type safety and developer experience
- **Framer Motion**: Animations and transitions
- **Recharts**: Charts in StatsTab (already implemented)
- **ExcelJS**: Excel file generation for exports
- **React Router**: Tab navigation via URL parameters
- **LocalStorage API**: Client-side persistence

## Components and Interfaces

### MonitoringTab Component

**Purpose**: Display and manage weekly student-curator progress across all curators.

**Props Interface**:
```typescript
interface MonitoringTabProps {
  allProgress: StudentProgress[];
  seasons: Season[];
  activeSeasonId: string;
  allUsers: UserData[];
  onUpdateProgress: (progressId: string, updates: Partial<StudentProgress>) => void;
}
```

**State**:
```typescript
{
  selectedWeek: number;           // Current week number (1-52)
  selectedSeasonId: string;       // Filter by season
  searchQuery: string;            // Filter by student name
  selectedCuratorId: string | null; // Filter by curator
  selectedStatus: string | null;  // Filter by status
  selectedAttendance: boolean | null; // Filter by attendance
  currentPage: number;            // Pagination (5 curators per page)
  editingProgress: StudentProgress | null; // Progress being edited
}
```

**Key Functions**:
- `filterProgress()`: Apply all active filters to progress data
- `groupByCurator()`: Group filtered progress by curator ID
- `handleWeekChange(delta: number)`: Navigate to previous/next week
- `handleExportExcel(seasonId: string)`: Generate Excel file with ExcelJS
- `clearFilters()`: Reset all filters to default state

**Responsive Behavior**:
- Desktop (≥768px): Table layout with 7 columns
- Mobile (<768px): Card layout with stacked information

### UsersTab Component

**Purpose**: Manage all platform users with search, filtering, and actions.

**Props Interface**:
```typescript
interface UsersTabProps {
  allUsers: UserData[];
  onDeleteUser: (userId: string) => void;
  onChangeRole: (userId: string, newRole: string) => void;
  onChangeStatus: (userId: string, newStatus: string) => void;
}
```

**State**:
```typescript
{
  searchQuery: string;            // Filter by name or username
  selectedRole: string;           // Filter by role (all, student, curator, admin)
  currentPage: number;            // Pagination (15 users per page)
  selectedUser: UserData | null;  // User for profile modal
}
```

**Key Functions**:
- `filterUsers()`: Apply search and role filters
- `handleDeleteUser(userId: string)`: Delete user with confirmation
- `handleViewProfile(user: UserData)`: Open User_Profile_Modal

**Responsive Behavior**:
- Desktop (≥768px): Table layout with 5 columns
- Mobile (<768px): Card layout with avatar, name, role, status

### RequestsTab Component

**Purpose**: Display and approve pending curator requests.

**Props Interface**:
```typescript
interface RequestsTabProps {
  allUsers: UserData[];
  onApproveUser: (userId: string) => void;
}
```

**State**:
```typescript
{
  selectedCurator: UserData | null; // Curator for profile modal
}
```

**Key Functions**:
- `getPendingCurators()`: Filter users where role=curator and isApproved=false
- `handleQuickApprove(userId: string)`: Approve curator without opening modal
- `handleViewProfile(user: UserData)`: Open User_Profile_Modal

**Layout**:
- Desktop: 3-column grid
- Mobile: Single column stack

### SeasonsTab Component

**Purpose**: Manage academic seasons (create, edit, delete, switch, export).

**Props Interface**:
```typescript
interface SeasonsTabProps {
  seasons: Season[];
  activeSeasonId: string;
  allProgress: StudentProgress[];
  onSwitchSeason: (seasonId: string) => void;
  onStartNewSeason: () => void;
  onUpdateSeason: (seasonId: string, updates: Partial<Season>) => void;
  onDeleteSeason: (seasonId: string) => void;
}
```

**State**:
```typescript
{
  editingDuration: number | null;     // Duration being edited
  deletingSeasonId: string | null;    // Season pending deletion
  showDeleteConfirmation: boolean;    // Delete confirmation modal
}
```

**Key Functions**:
- `getActiveSeason()`: Find season where isActive=true
- `handleStartNewSeason()`: Create new season with incremented number
- `handleUpdateDuration(seasonId: string, months: number)`: Update season duration
- `handleDeleteSeason(seasonId: string)`: Delete season with confirmation
- `handleExportSeason(seasonId: string)`: Export season data to Excel

**Validation**:
- Cannot delete the only remaining season
- Duration must be positive integer
- New season number = max(existing numbers) + 1

### MessagesTab Component

**Purpose**: Send notifications and view message history.

**Props Interface**:
```typescript
interface MessagesTabProps {
  notifications: Notification[];
  currentUser: UserData;
  onSendNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllRead: () => void;
}
```

**State**:
```typescript
{
  title: string;                  // Notification title
  type: 'info' | 'success' | 'warning' | 'urgent';
  targetRole: 'all' | 'student' | 'curator';
  message: string;                // Notification message
}
```

**Key Functions**:
- `handleSendMessage()`: Validate and send notification
- `handleMarkAsRead(id: string)`: Mark single notification as read
- `handleMarkAllRead()`: Mark all notifications as read
- `getSortedNotifications()`: Sort by timestamp descending

**Validation**:
- Title: Required, max 100 characters
- Message: Required, max 500 characters
- Type and targetRole: Required selections

### SettingsTab Component

**Purpose**: Configure platform-wide settings.

**Props Interface**:
```typescript
interface SettingsTabProps {
  isRegistrationOpen: boolean;
  isCuratorRegistrationOpen: boolean;
  onToggleRegistration: (isOpen: boolean) => void;
  onToggleCuratorRegistration: (isOpen: boolean) => void;
}
```

**State**:
```typescript
{
  studentRegistration: boolean;
  curatorRegistration: boolean;
  seasonNotifications: boolean;
  adminEmail: string;
}
```

**Key Functions**:
- `handleSaveSettings()`: Persist all settings to localStorage and backend
- `validateEmail(email: string)`: Validate admin email format

**LocalStorage Keys**:
- `buddy_admin_email`
- `buddy_season_notifications`

### UserProfileModal Component

**Purpose**: Display detailed user information with actions (shared across tabs).

**Props Interface**:
```typescript
interface UserProfileModalProps {
  user: UserData;
  allUsers: UserData[];
  isOpen: boolean;
  onClose: () => void;
  onApprove?: (userId: string) => void;
  onChangeStatus?: (userId: string, status: string) => void;
  onSendMessage?: (userId: string, message: string) => void;
}
```

**State**:
```typescript
{
  showMessageForm: boolean;       // Toggle direct message form
  messageText: string;            // Direct message content
}
```

**Key Functions**:
- `getAssignedCurator()`: Find curator by assignedCuratorId
- `getStartupCurator()`: Find curator by startupCuratorId
- `getAssignedStudents()`: Find students where assignedCuratorId matches user
- `handleSendDirectMessage()`: Send message to specific user

**Layout Sections**:
1. Header: Avatar, name, username, role badge, status badge
2. Basic Info: Email, field
3. Bio: Professional bio and field description
4. Buddy Network: Curator/students connections
5. Motivation: Quote section
6. Skills: Tag cloud
7. Status Management: Active/Inactive buttons (curators only)
8. Approve Button: For pending curators
9. Social Links: Clickable icons
10. Direct Message: Expandable form

### EditProgressModal Component

**Purpose**: Edit student weekly progress records.

**Props Interface**:
```typescript
interface EditProgressModalProps {
  progress: StudentProgress;
  isOpen: boolean;
  onClose: () => void;
  onSave: (progressId: string, updates: Partial<StudentProgress>) => void;
}
```

**State**:
```typescript
{
  meetingDay: string;             // ISO date string
  attended: boolean;
  weeklyGoal: string;
  status: 'Bajarilmoqda' | 'Hal qilindi' | 'Kutilmoqda' | 'Bajarmadi';
  difficulty: string;             // Problem description
  solution: string;
}
```

**Key Functions**:
- `handleSave()`: Validate and save progress updates
- `handleCancel()`: Close modal without saving
- `resetForm()`: Reset form to original progress values

**Validation**:
- Meeting day: Valid date format
- Weekly goal: Max 500 characters
- Problem: Max 500 characters
- Solution: Max 500 characters

## Data Models

### StudentProgress

```typescript
interface StudentProgress {
  id: string;
  curatorId: string;
  seasonId: string;
  weekNumber: number;
  studentId: string;
  studentName: string;
  weeklyGoal: string;
  difficulty: string;        // Problem description
  solution: string;
  status: 'Bajarilmoqda' | 'Hal qilindi' | 'Kutilmoqda' | 'Bajarmadi';
  meetingDay: string;        // ISO date string
  attended: boolean;
}
```

### UserData

```typescript
interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: 'student' | 'curator' | 'admin';
  status: 'active' | 'inactive';
  field: string;
  longBio: string;
  fieldDescription: string;
  motivationQuote: string;
  skills: string[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    telegram?: string;
    website?: string;
  };
  assignedCuratorId?: string;
  startupCuratorId?: string;
  isApproved: boolean;
}
```

### Season

```typescript
interface Season {
  id: string;
  number: number;
  startDate: string;         // ISO date string
  isActive: boolean;
  durationInMonths: number;
}
```

### Notification

```typescript
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'urgent';
  timestamp: string;         // ISO date string
  isRead: boolean;
  targetRole: 'all' | 'student' | 'curator';
  targetUserId?: string;     // For direct messages
  sender: string;            // Sender name
}
```

### AdminPanelProps

```typescript
interface AdminPanelProps {
  user: UserData;
  allUsers: UserData[];
  allProgress: StudentProgress[];
  seasons: Season[];
  activeSeasonId: string;
  notifications: Notification[];
  isRegistrationOpen: boolean;
  isCuratorRegistrationOpen: boolean;
  isDataSaving: boolean;
  onDeleteUser: (userId: string) => void;
  onChangeRole: (userId: string, newRole: string) => void;
  onApproveUser: (userId: string) => void;
  onChangeStatus: (userId: string, newStatus: string) => void;
  onUpdateProgress: (progressId: string, updates: Partial<StudentProgress>) => void;
  onToggleRegistration: (isOpen: boolean) => void;
  onToggleCuratorRegistration: (isOpen: boolean) => void;
  onSwitchSeason: (seasonId: string) => void;
  onStartNewSeason: () => void;
  onUpdateSeason: (seasonId: string, updates: Partial<Season>) => void;
  onDeleteSeason: (seasonId: string) => void;
  onSendNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllRead: () => void;
}
```

## Design System Specifications

### Color Palette

**Background**:
- Main: `bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950`
- Cards: `bg-slate-900`
- Overlays: `bg-black/50` with `backdrop-blur-sm`

**Section Colors** (for tabs and cards):
- Monitoring: Indigo (`bg-indigo-500`, `border-indigo-400`)
- Users: Purple (`bg-purple-500`, `border-purple-400`)
- Requests: Green (`bg-green-500`, `border-green-400`)
- Seasons: Orange (`bg-orange-500`, `border-orange-400`)
- Messages: Teal (`bg-teal-500`, `border-teal-400`)
- Settings: Pink (`bg-pink-500`, `border-pink-400`)

**Status Colors**:
- Active: Green (`bg-green-500`)
- Inactive: Red (`bg-red-500`)
- Pending: Yellow (`bg-yellow-500`)
- Info: Blue (`bg-blue-500`)
- Success: Green (`bg-green-500`)
- Warning: Orange (`bg-orange-500`)
- Urgent: Red (`bg-red-500`)

### Typography

**Headings**:
- H1: `text-4xl font-bold tracking-tight`
- H2: `text-3xl font-bold tracking-tight`
- H3: `text-2xl font-bold tracking-tight`
- H4: `text-xl font-bold tracking-tight`

**Labels**:
- `text-xs font-bold uppercase tracking-wider`

**Body**:
- Regular: `text-base font-normal`
- Small: `text-sm font-normal`

### Spacing and Layout

**Border Radius**:
- XL: `rounded-3xl` (24px) - Main cards
- LG: `rounded-2xl` (16px) - Secondary cards
- MD: `rounded-xl` (12px) - Buttons, inputs

**Borders**:
- Width: `border-2`
- Style: Solid with color-specific classes

**Shadows**:
- Default: `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
- Hover: `shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`

**Padding**:
- Cards: `p-6` (24px)
- Buttons: `px-6 py-3` (24px horizontal, 12px vertical)
- Inputs: `px-4 py-2` (16px horizontal, 8px vertical)

### Animations

**Hover Effects**:
```typescript
whileHover={{
  scale: 1.02,
  x: 2,
  y: 2,
  boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)'
}}
```

**Tap Effects**:
```typescript
whileTap={{
  scale: 0.98
}}
```

**Modal Animations**:
```typescript
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.95 }}
transition={{ duration: 0.2 }}
```

**Page Transitions**:
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.3 }}
```

### Responsive Breakpoints

- Mobile: `< 768px`
- Desktop: `≥ 768px`

**Media Query Usage**:
```typescript
const isMobile = window.innerWidth < 768;
// or
className="hidden md:block" // Desktop only
className="block md:hidden" // Mobile only
```

## Excel Export Implementation

### ExcelJS Configuration

**Workbook Setup**:
```typescript
import ExcelJS from 'exceljs';

const workbook = new ExcelJS.Workbook();
workbook.creator = 'Buddy Platform Admin';
workbook.created = new Date();
```

**Worksheet Structure** (for monitoring export):

Columns:
1. Student Name (width: 20)
2. Curator Name (width: 20)
3. Week Number (width: 12)
4. Meeting Date (width: 15)
5. Attendance (width: 12)
6. Weekly Goal (width: 40)
7. Problem (width: 40)
8. Solution (width: 40)
9. Status (width: 15)

**Styling**:
- Header row: Bold, background color, border
- Data rows: Alternating row colors for readability
- Text wrapping: Enabled for long text columns

**File Naming**:
- Format: `buddy_season_{seasonNumber}_{YYYY-MM-DD}.xlsx`
- Example: `buddy_season_3_2024-01-15.xlsx`

### Export Functions

```typescript
function exportSeasonToExcel(seasonId: string, progress: StudentProgress[], users: UserData[]) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(`Season ${seasonNumber}`);
  
  // Add headers
  worksheet.columns = [
    { header: 'Student Name', key: 'studentName', width: 20 },
    { header: 'Curator Name', key: 'curatorName', width: 20 },
    // ... other columns
  ];
  
  // Add data rows
  const filteredProgress = progress.filter(p => p.seasonId === seasonId);
  filteredProgress.forEach(p => {
    const curator = users.find(u => u.id === p.curatorId);
    worksheet.addRow({
      studentName: p.studentName,
      curatorName: curator?.name || 'Unknown',
      // ... other fields
    });
  });
  
  // Style header row
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4F46E5' } // Indigo
  };
  
  // Generate and download
  workbook.xlsx.writeBuffer().then(buffer => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `buddy_season_${seasonNumber}_${new Date().toISOString().split('T')[0]}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  });
}
```

## LocalStorage Persistence

### Storage Keys

- `buddy_admin_tab`: Current selected tab
- `buddy_monitoring_week`: Selected week in monitoring tab
- `buddy_admin_email`: Admin email for notifications
- `buddy_season_notifications`: Boolean for season notification preference

### Implementation

```typescript
// Save tab selection
const saveTab = (tab: string) => {
  localStorage.setItem('buddy_admin_tab', tab);
};

// Load tab selection
const loadTab = (): string => {
  return localStorage.getItem('buddy_admin_tab') || 'monitoring';
};

// Save monitoring week
const saveMonitoringWeek = (week: number) => {
  localStorage.setItem('buddy_monitoring_week', week.toString());
};

// Load monitoring week
const loadMonitoringWeek = (): number => {
  const saved = localStorage.getItem('buddy_monitoring_week');
  return saved ? parseInt(saved, 10) : getCurrentWeekNumber();
};
```

### Helper Functions

```typescript
// Get current week number (1-52)
function getCurrentWeekNumber(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.ceil(diff / oneWeek);
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified several areas of redundancy:

1. **Input acceptance properties (2.4, 2.6, 2.7, 7.2, 7.5)**: Multiple criteria about accepting and storing text input can be combined into a single property about form input persistence.

2. **Filter properties (1.3, 1.4, 1.5, 1.6, 1.7, 3.2, 3.3)**: All filtering behaviors follow the same pattern - they should return only records matching the filter criteria. These can be consolidated.

3. **Modal opening properties (1.11, 3.6, 5.4)**: All follow the same pattern of opening a modal with correct data pre-filled.

4. **Pagination properties (1.12, 3.8)**: Both follow the same pagination pattern with different page sizes.

5. **Toggle properties (2.3, 8.2, 8.3, 8.5)**: All toggle behaviors follow the same pattern of state change.

6. **Conditional rendering properties (4.3, 4.4, 4.5, 4.9, 4.12, 4.13, 7.9, 7.11)**: Many properties about showing/hiding UI elements based on data presence can be combined.

7. **LocalStorage round-trip properties (11.1-11.5)**: All follow the same save-then-restore pattern.

8. **Responsive layout properties (12.1, 12.2, 12.3)**: Can be combined into a single property about viewport-based layout switching.

9. **Accessibility properties (13.1, 13.2, 13.5)**: Multiple properties about ARIA attributes can be consolidated.

The following properties represent the unique, non-redundant validation requirements:

### Monitoring and Progress Properties

**Property 1: Week-based progress filtering**
*For any* week number and progress dataset, filtering by that week should return only progress records where weekNumber equals the selected week.
**Validates: Requirements 1.2**

**Property 2: Season-based progress filtering**
*For any* season ID and progress dataset, filtering by that season should return only progress records where seasonId equals the selected season.
**Validates: Requirements 1.3**

**Property 3: Student name search filtering**
*For any* search query and progress dataset, filtering by student name should return only progress records where studentName contains the search query (case-insensitive).
**Validates: Requirements 1.4**

**Property 4: Curator-based progress filtering**
*For any* curator ID and progress dataset, filtering by that curator should return only progress records where curatorId equals the selected curator.
**Validates: Requirements 1.5**

**Property 5: Status-based progress filtering**
*For any* status value and progress dataset, filtering by that status should return only progress records where status equals the selected status.
**Validates: Requirements 1.6**

**Property 6: Attendance-based progress filtering**
*For any* attendance boolean and progress dataset, filtering by attendance should return only progress records where attended equals the selected attendance value.
**Validates: Requirements 1.7**

**Property 7: Filter reset idempotence**
*For any* filter state, clicking clear filters should reset all filters to default values, and clicking clear again should produce the same default state (idempotent operation).
**Validates: Requirements 1.8**

**Property 8: Progress modal data pre-fill**
*For any* progress record, opening the edit modal should display all progress fields (meetingDay, attended, weeklyGoal, status, difficulty, solution) with values matching the original record.
**Validates: Requirements 1.11**

**Property 9: Curator pagination**
*For any* number of curators N, if N > 5, then the monitoring tab should display exactly 5 curators on the first page, and ceil(N/5) total pages should be available.
**Validates: Requirements 1.12**

**Property 10: Excel export completeness**
*For any* season ID and progress dataset, exporting that season should generate an Excel file containing all progress records where seasonId equals the selected season, with no records missing.
**Validates: Requirements 1.13, 10.2**

**Property 11: Excel export structure**
*For any* exported Excel file, the worksheet should contain columns for Student Name, Curator Name, Week Number, Meeting Date, Attendance, Weekly Goal, Problem, Solution, and Status in that order.
**Validates: Requirements 10.3**

**Property 12: Excel filename format**
*For any* season export, the generated filename should match the pattern `buddy_season_{seasonNumber}_{YYYY-MM-DD}.xlsx` where the date is the export date.
**Validates: Requirements 10.4**

### Progress Editing Properties

**Property 13: Date validation**
*For any* date string input, the meeting date field should accept valid ISO date strings and reject invalid date formats.
**Validates: Requirements 2.2**

**Property 14: Attendance toggle round-trip**
*For any* initial attendance state, toggling attendance twice should return to the original state (toggle is its own inverse).
**Validates: Requirements 2.3**

**Property 15: Form input persistence**
*For any* text input in goal, problem, or solution fields, the entered text should be stored in component state and retrievable without modification.
**Validates: Requirements 2.4, 2.6, 2.7**

**Property 16: Status selection**
*For any* status value in ['Bajarilmoqda', 'Hal qilindi', 'Kutilmoqda', 'Bajarmadi'], selecting that status should update the progress status to the selected value.
**Validates: Requirements 2.5**

**Property 17: Progress save persistence**
*For any* progress record and updates, clicking save should persist all changes and the updated record should be retrievable with all modifications intact.
**Validates: Requirements 2.8**

**Property 18: Progress cancel preservation**
*For any* progress record and modifications, clicking cancel should close the modal without persisting changes, and the original record should remain unchanged.
**Validates: Requirements 2.9**

### User Management Properties

**Property 19: User search filtering**
*For any* search query and user dataset, filtering by name or username should return only users where name or username contains the search query (case-insensitive).
**Validates: Requirements 3.2**

**Property 20: Role-based user filtering**
*For any* role value in ['student', 'curator', 'admin', 'all'] and user dataset, filtering by that role should return only users where role equals the selected role (or all users if 'all' is selected).
**Validates: Requirements 3.3**

**Property 21: User profile modal data completeness**
*For any* user record, opening the profile modal should display all available user fields (avatar, name, username, email, role, status, field, bio, skills, social links) with values matching the original record.
**Validates: Requirements 3.6, 4.2**

**Property 22: User deletion**
*For any* user ID and user dataset, deleting that user should remove the user from the dataset, and subsequent queries should not return that user.
**Validates: Requirements 3.7**

**Property 23: User pagination**
*For any* number of users N, if N > 15, then the users tab should display exactly 15 users on the first page, and ceil(N/15) total pages should be available.
**Validates: Requirements 3.8**

### User Profile Properties

**Property 24: Conditional field rendering**
*For any* user record, the profile modal should display optional fields (email, field, bio, fieldDescription, motivationQuote) only when those fields have non-empty values.
**Validates: Requirements 4.3, 4.4, 4.5, 4.9**

**Property 25: Student buddy network display**
*For any* user with role='student', the profile modal should display assigned curator and startup curator information by looking up users where id matches assignedCuratorId and startupCuratorId.
**Validates: Requirements 4.6**

**Property 26: Curator buddy network display**
*For any* user with role='curator', the profile modal should display all students where assignedCuratorId equals the curator's id.
**Validates: Requirements 4.7**

**Property 27: Skills tag rendering**
*For any* user with skills array, the profile modal should display each skill as a separate tag, and the number of tags should equal the length of the skills array.
**Validates: Requirements 4.10**

**Property 28: Pending curator approval button**
*For any* user with role='curator' and isApproved=false, the profile modal should display an approve button, and clicking it should set isApproved=true.
**Validates: Requirements 4.12**

**Property 29: Social links rendering**
*For any* user with socialLinks object, the profile modal should display a clickable link for each non-empty social link property (github, linkedin, telegram, website).
**Validates: Requirements 4.13**

**Property 30: Direct message targeting**
*For any* user and message text, sending a direct message should create a notification with targetUserId equal to the user's id and targetRole=null.
**Validates: Requirements 4.15**

### Curator Request Properties

**Property 31: Pending curator filtering**
*For any* user dataset, the requests tab should display only users where role='curator' AND isApproved=false.
**Validates: Requirements 5.3**

**Property 32: Quick approve action**
*For any* pending curator, clicking quick approve should set isApproved=true and remove the user from the pending curators list.
**Validates: Requirements 5.3**

**Property 33: Curator card data completeness**
*For any* pending curator, the curator card should display avatar, name, username, and field with values matching the user record.
**Validates: Requirements 5.2**

### Season Management Properties

**Property 34: Duration validation**
*For any* duration input, the season duration field should accept positive integers and reject zero, negative numbers, and non-numeric values.
**Validates: Requirements 6.2**

**Property 35: New season creation**
*For any* existing season dataset, creating a new season should generate a season with number = max(existing season numbers) + 1 and isActive=true, and all other seasons should have isActive=false.
**Validates: Requirements 6.3**

**Property 36: Season history completeness**
*For any* season dataset, the season history list should display all seasons with their number, startDate, and isActive status, and the count of displayed seasons should equal the total number of seasons.
**Validates: Requirements 6.4**

**Property 37: Season deletion validation**
*For any* season dataset with count > 1, deleting a season should remove it from the dataset, but if count = 1, deletion should be prevented.
**Validates: Requirements 6.6**

**Property 38: Active season switching**
*For any* season ID and season dataset, switching to that season should set isActive=true for the selected season and isActive=false for all other seasons (exactly one active season).
**Validates: Requirements 6.7**

### Notification Properties

**Property 39: Notification form input persistence**
*For any* text input in title or message fields, the entered text should be stored in component state and retrievable without modification.
**Validates: Requirements 7.2, 7.5**

**Property 40: Notification type selection**
*For any* type value in ['info', 'success', 'warning', 'urgent'], selecting that type should update the notification type to the selected value.
**Validates: Requirements 7.3**

**Property 41: Notification target role selection**
*For any* role value in ['all', 'student', 'curator'], selecting that role should update the notification targetRole to the selected value.
**Validates: Requirements 7.4**

**Property 42: Notification creation and targeting**
*For any* notification with targetRole='student', all users where role='student' should receive the notification; for targetRole='curator', all users where role='curator' should receive it; for targetRole='all', all users should receive it.
**Validates: Requirements 7.6**

**Property 43: Notification history sorting**
*For any* notification dataset, the message history should display notifications in descending order by timestamp (newest first), meaning for any two adjacent notifications, the first should have a timestamp >= the second.
**Validates: Requirements 7.7**

**Property 44: Notification display completeness**
*For any* notification in history, the displayed message should include type indicator, title, timestamp, message content, targetRole, and sender with values matching the notification record.
**Validates: Requirements 7.8**

**Property 45: Mark as read action**
*For any* notification with isRead=false, clicking "mark as read" should update isRead=true for that notification.
**Validates: Requirements 7.10**

**Property 46: Mark all as read action**
*For any* notification dataset, clicking "mark all as read" should update isRead=true for all notifications in the dataset.
**Validates: Requirements 7.12**

**Property 47: Unread notification button visibility**
*For any* notification dataset, the "mark as read" button should be visible only for notifications where isRead=false, and the "mark all as read" button should be visible only when at least one notification has isRead=false.
**Validates: Requirements 7.9, 7.11**

### Settings Properties

**Property 48: Registration toggle state**
*For any* initial registration state (true/false), toggling student or curator registration should flip the boolean value, and toggling twice should return to the original state (idempotent).
**Validates: Requirements 8.2, 8.3, 8.5**

**Property 49: Email validation**
*For any* email string input, the admin email field should accept valid email formats (containing @ and domain) and reject invalid formats.
**Validates: Requirements 8.4**

**Property 50: Settings persistence**
*For any* settings changes (registration toggles, email, notifications), clicking save should persist all values, and they should be retrievable after page reload.
**Validates: Requirements 8.6**

### LocalStorage Properties

**Property 51: Tab selection round-trip**
*For any* tab identifier, selecting that tab should store it in localStorage under key 'buddy_admin_tab', and reloading the page should restore that tab as the active tab.
**Validates: Requirements 11.1, 11.2**

**Property 52: Monitoring week round-trip**
*For any* week number, selecting that week should store it in localStorage under key 'buddy_monitoring_week', and reloading the page should restore that week as the selected week.
**Validates: Requirements 11.3, 11.4**

**Property 53: Settings persistence round-trip**
*For any* notification settings (email, season notifications), saving settings should store them in localStorage, and reloading the page should restore those exact settings.
**Validates: Requirements 11.5**

### Responsive Design Properties

**Property 54: Viewport-based layout switching**
*For any* viewport width, if width < 768px, the admin panel should render mobile card layouts, and if width >= 768px, it should render desktop table layouts.
**Validates: Requirements 12.1, 12.2, 12.3**

**Property 55: Mobile modal scrollability**
*For any* modal content that exceeds viewport height on mobile (width < 768px), the modal should have overflow-y: scroll and fit within the viewport bounds.
**Validates: Requirements 12.5**

### Accessibility Properties

**Property 56: Interactive element ARIA labels**
*For any* interactive element (button, link, input), the element should have either an aria-label attribute or associated label element with non-empty text.
**Validates: Requirements 13.1, 13.2**

**Property 57: Modal focus management**
*For any* modal, opening the modal should move focus to an element inside the modal, and closing the modal should return focus to the element that triggered the modal.
**Validates: Requirements 13.3**

**Property 58: Dynamic content announcements**
*For any* dynamic content area (notifications, progress updates, user lists), the container should have an aria-live attribute to announce changes to screen readers.
**Validates: Requirements 13.5**

**Property 59: Keyboard navigation support**
*For any* interactive element, pressing Tab should move focus to the element, pressing Enter should activate it, and pressing Escape (for modals) should close the modal.
**Validates: Requirements 13.6**


## Error Handling

### Input Validation Errors

**Date Validation**:
- Invalid date formats in meeting date input should display error message: "Please enter a valid date"
- Future dates beyond reasonable range (>1 year) should display warning: "Date seems far in the future"

**Email Validation**:
- Invalid email format should display error: "Please enter a valid email address"
- Empty email when required should display error: "Email is required"

**Duration Validation**:
- Non-numeric duration input should display error: "Duration must be a number"
- Zero or negative duration should display error: "Duration must be positive"
- Duration > 24 months should display warning: "Duration seems unusually long"

**Text Length Validation**:
- Title > 100 characters should display error: "Title must be 100 characters or less"
- Message > 500 characters should display error: "Message must be 500 characters or less"
- Goal/Problem/Solution > 500 characters should display error: "Text must be 500 characters or less"

### Data Operation Errors

**Delete Operations**:
- Attempting to delete the last season should display error: "Cannot delete the only season"
- Failed user deletion should display error: "Failed to delete user. Please try again."
- Network errors during deletion should display error: "Network error. Please check your connection."

**Save Operations**:
- Failed progress save should display error: "Failed to save progress. Please try again."
- Failed settings save should display error: "Failed to save settings. Please try again."
- Network timeout should display error: "Request timed out. Please try again."

**Load Operations**:
- Failed data fetch should display error: "Failed to load data. Please refresh the page."
- Empty data sets should display friendly message: "No data available yet"
- Corrupted localStorage data should be cleared and display warning: "Settings were reset due to data corruption"

### Excel Export Errors

**Export Failures**:
- No data to export should display message: "No data available for export"
- ExcelJS library error should display error: "Failed to generate Excel file. Please try again."
- Browser download blocked should display error: "Download was blocked. Please check your browser settings."

### Modal Errors

**Modal State Errors**:
- Attempting to open modal with null data should log error and prevent modal opening
- Multiple modals open simultaneously should close previous modal before opening new one
- Focus trap failure should log warning but allow modal to function

### Network Errors

**API Call Failures**:
- 401 Unauthorized should redirect to login page
- 403 Forbidden should display error: "You don't have permission to perform this action"
- 404 Not Found should display error: "Resource not found"
- 500 Server Error should display error: "Server error. Please try again later."
- Network timeout (>30s) should display error: "Request timed out. Please check your connection."

### Error Display Strategy

**Toast Notifications**:
- Use toast notifications for non-blocking errors (save failures, network errors)
- Auto-dismiss after 5 seconds for info/success, 10 seconds for warnings/errors
- Allow manual dismissal with close button

**Inline Errors**:
- Display validation errors inline below the relevant input field
- Use red text and error icon for visibility
- Clear errors when user corrects the input

**Modal Errors**:
- Display critical errors in modal dialogs that require user acknowledgment
- Use for destructive actions (delete confirmations) and critical failures

**Error Logging**:
- Log all errors to console with context (component, action, data)
- Include timestamp and user ID for debugging
- Consider integration with error tracking service (Sentry, LogRocket)

## Testing Strategy

### Dual Testing Approach

The Admin Panel requires both **unit tests** and **property-based tests** for comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs
- Both are complementary and necessary

**Balance**: Avoid writing too many unit tests. Property-based tests handle covering lots of inputs. Unit tests should focus on specific examples, integration points, and edge cases.

### Property-Based Testing Configuration

**Library Selection**: Use **fast-check** for TypeScript/JavaScript property-based testing

**Configuration**:
- Minimum **100 iterations** per property test (due to randomization)
- Each property test must reference its design document property
- Tag format: `// Feature: admin-panel-implementation, Property {number}: {property_text}`

**Example Property Test**:
```typescript
import fc from 'fast-check';

// Feature: admin-panel-implementation, Property 1: Week-based progress filtering
test('filtering by week returns only matching records', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 1, max: 52 }), // week number
      fc.array(progressRecordArbitrary()), // progress dataset
      (weekNumber, progressData) => {
        const filtered = filterByWeek(progressData, weekNumber);
        return filtered.every(p => p.weekNumber === weekNumber);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Testing Strategy

**Component Testing**:
- Test component rendering with specific props
- Test user interactions (clicks, inputs, form submissions)
- Test conditional rendering based on props
- Test error states and edge cases

**Integration Testing**:
- Test tab navigation and state persistence
- Test modal opening/closing with data flow
- Test filter combinations and pagination
- Test Excel export with sample data

**Example Unit Test**:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { MonitoringTab } from './MonitoringTab';

test('displays week selector on render', () => {
  render(<MonitoringTab {...mockProps} />);
  expect(screen.getByText(/Week/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
});

test('clear filters resets all filter state', () => {
  const { getByRole, getByLabelText } = render(<MonitoringTab {...mockProps} />);
  
  // Set filters
  fireEvent.change(getByLabelText(/search/i), { target: { value: 'John' } });
  fireEvent.click(getByRole('button', { name: /status/i }));
  
  // Clear filters
  fireEvent.click(getByRole('button', { name: /clear filters/i }));
  
  // Verify reset
  expect(getByLabelText(/search/i)).toHaveValue('');
  expect(getByRole('button', { name: /status/i })).not.toHaveClass('active');
});
```

### Test Coverage Goals

**Component Coverage**:
- MonitoringTab: 90%+ coverage
- UsersTab: 90%+ coverage
- RequestsTab: 85%+ coverage
- SeasonsTab: 90%+ coverage
- MessagesTab: 90%+ coverage
- SettingsTab: 85%+ coverage
- UserProfileModal: 90%+ coverage
- EditProgressModal: 90%+ coverage

**Property Test Coverage**:
- All 59 correctness properties must have corresponding property tests
- Each property test must run minimum 100 iterations
- Property tests should use custom arbitraries for domain objects

### Custom Arbitraries for Property Testing

**User Arbitrary**:
```typescript
const userArbitrary = () => fc.record({
  id: fc.uuid(),
  name: fc.string({ minLength: 1, maxLength: 50 }),
  username: fc.string({ minLength: 3, maxLength: 20 }),
  email: fc.emailAddress(),
  avatar: fc.webUrl(),
  role: fc.constantFrom('student', 'curator', 'admin'),
  status: fc.constantFrom('active', 'inactive'),
  field: fc.string({ minLength: 1, maxLength: 50 }),
  longBio: fc.string({ maxLength: 500 }),
  fieldDescription: fc.string({ maxLength: 500 }),
  motivationQuote: fc.string({ maxLength: 200 }),
  skills: fc.array(fc.string({ minLength: 1, maxLength: 30 }), { maxLength: 10 }),
  socialLinks: fc.record({
    github: fc.option(fc.webUrl()),
    linkedin: fc.option(fc.webUrl()),
    telegram: fc.option(fc.string()),
    website: fc.option(fc.webUrl())
  }),
  assignedCuratorId: fc.option(fc.uuid()),
  startupCuratorId: fc.option(fc.uuid()),
  isApproved: fc.boolean()
});
```

**Progress Arbitrary**:
```typescript
const progressArbitrary = () => fc.record({
  id: fc.uuid(),
  curatorId: fc.uuid(),
  seasonId: fc.uuid(),
  weekNumber: fc.integer({ min: 1, max: 52 }),
  studentId: fc.uuid(),
  studentName: fc.string({ minLength: 1, maxLength: 50 }),
  weeklyGoal: fc.string({ maxLength: 500 }),
  difficulty: fc.string({ maxLength: 500 }),
  solution: fc.string({ maxLength: 500 }),
  status: fc.constantFrom('Bajarilmoqda', 'Hal qilindi', 'Kutilmoqda', 'Bajarmadi'),
  meetingDay: fc.date().map(d => d.toISOString()),
  attended: fc.boolean()
});
```

**Season Arbitrary**:
```typescript
const seasonArbitrary = () => fc.record({
  id: fc.uuid(),
  number: fc.integer({ min: 1, max: 20 }),
  startDate: fc.date().map(d => d.toISOString()),
  isActive: fc.boolean(),
  durationInMonths: fc.integer({ min: 1, max: 12 })
});
```

**Notification Arbitrary**:
```typescript
const notificationArbitrary = () => fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 100 }),
  message: fc.string({ minLength: 1, maxLength: 500 }),
  type: fc.constantFrom('info', 'success', 'warning', 'urgent'),
  timestamp: fc.date().map(d => d.toISOString()),
  isRead: fc.boolean(),
  targetRole: fc.constantFrom('all', 'student', 'curator'),
  targetUserId: fc.option(fc.uuid()),
  sender: fc.string({ minLength: 1, maxLength: 50 })
});
```

### Accessibility Testing

**Automated Testing**:
- Use **jest-axe** for automated accessibility testing
- Run axe checks on all rendered components
- Test keyboard navigation programmatically
- Verify ARIA attributes with testing-library queries

**Manual Testing Checklist**:
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation through all tabs
- Focus visibility and focus trap in modals
- Color contrast verification with tools
- Zoom testing (up to 200%)

**Example Accessibility Test**:
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('MonitoringTab has no accessibility violations', async () => {
  const { container } = render(<MonitoringTab {...mockProps} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('modal traps focus correctly', () => {
  const { getByRole } = render(<UserProfileModal {...mockProps} />);
  const modal = getByRole('dialog');
  
  // Tab through modal
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  // Verify focus stays within modal
  focusableElements[focusableElements.length - 1].focus();
  fireEvent.keyDown(document.activeElement, { key: 'Tab' });
  expect(document.activeElement).toBe(focusableElements[0]);
});
```

### Performance Testing

**Rendering Performance**:
- Test rendering time with large datasets (1000+ users, 5000+ progress records)
- Verify pagination prevents rendering all items at once
- Test filter performance with large datasets
- Measure Excel export time for large datasets

**Memory Testing**:
- Monitor memory usage during tab switching
- Verify modals are properly unmounted and cleaned up
- Test for memory leaks in long-running sessions
- Verify localStorage doesn't grow unbounded

### Test Execution

**Local Development**:
```bash
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm test -- --coverage     # Coverage report
npm test -- MonitoringTab  # Run specific test file
```

**CI/CD Pipeline**:
- Run all tests on every pull request
- Require 85%+ coverage for merge
- Run accessibility tests in CI
- Generate and publish coverage reports

### Test Organization

```
src/
├── components/
│   ├── features/
│   │   ├── admin/
│   │   │   ├── tabs/
│   │   │   │   ├── MonitoringTab.tsx
│   │   │   │   ├── MonitoringTab.test.tsx
│   │   │   │   ├── MonitoringTab.properties.test.tsx
│   │   │   │   ├── UsersTab.tsx
│   │   │   │   ├── UsersTab.test.tsx
│   │   │   │   ├── UsersTab.properties.test.tsx
│   │   │   │   └── ...
│   │   │   ├── modals/
│   │   │   │   ├── UserProfileModal.tsx
│   │   │   │   ├── UserProfileModal.test.tsx
│   │   │   │   ├── UserProfileModal.properties.test.tsx
│   │   │   │   └── ...
│   │   │   └── AdminPanel.tsx
│   │   │       ├── AdminPanel.test.tsx
│   │   │       └── AdminPanel.integration.test.tsx
├── test/
│   ├── arbitraries/
│   │   ├── user.arbitrary.ts
│   │   ├── progress.arbitrary.ts
│   │   ├── season.arbitrary.ts
│   │   └── notification.arbitrary.ts
│   ├── fixtures/
│   │   ├── mockUsers.ts
│   │   ├── mockProgress.ts
│   │   └── mockSeasons.ts
│   └── utils/
│       ├── renderWithProviders.tsx
│       └── testHelpers.ts
```

**File Naming Conventions**:
- `*.test.tsx`: Unit tests and integration tests
- `*.properties.test.tsx`: Property-based tests
- `*.arbitrary.ts`: Custom arbitraries for property testing
- `mock*.ts`: Mock data fixtures

### Continuous Testing

**Pre-commit Hooks**:
- Run linter and type checker
- Run tests for changed files
- Verify no accessibility violations in changed components

**Pull Request Checks**:
- All tests must pass
- Coverage must not decrease
- No new accessibility violations
- Performance benchmarks must not regress

**Monitoring**:
- Track test execution time trends
- Monitor flaky test rates
- Track coverage trends over time
- Alert on coverage drops
