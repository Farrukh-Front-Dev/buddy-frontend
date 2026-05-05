# Requirements Document

## Introduction

The Admin Panel is a comprehensive administrative interface for the Buddy Platform that enables administrators to monitor student-curator progress, manage users, approve curator requests, control seasons, send notifications, and configure platform settings. This specification covers the implementation of six remaining tabs (MonitoringTab, UsersTab, RequestsTab, SeasonsTab, MessagesTab, SettingsTab) following the Buddy Design System's Neobrutalism aesthetic.

## Glossary

- **Admin_Panel**: The main administrative interface component that provides access to all administrative functions
- **Monitoring_Tab**: The interface for tracking weekly student-curator progress across all curators
- **Users_Tab**: The interface for managing all platform users (students, curators, admins)
- **Requests_Tab**: The interface for reviewing and approving pending curator applications
- **Seasons_Tab**: The interface for managing academic seasons (create, edit, delete, switch, export)
- **Messages_Tab**: The interface for sending platform-wide or targeted notifications to users
- **Settings_Tab**: The interface for configuring platform-wide settings (registration toggles, notifications)
- **User_Profile_Modal**: A shared modal component for displaying detailed user information
- **Edit_Progress_Modal**: A modal component for editing student weekly progress records
- **Student_Progress**: A record of a student's weekly activities including goals, problems, solutions, and attendance
- **Season**: An academic period with a start date, duration, and active status
- **Curator**: A mentor user who guides students through their learning journey
- **Student**: A learner user who receives guidance from curators
- **Buddy_Design_System**: The platform's Neobrutalism design language featuring bold borders, shadows, gradients, and color-coded sections
- **Excel_Export**: Functionality to export monitoring data to Excel spreadsheet format
- **Notification**: A message sent to users with type (info, success, warning, urgent) and target audience

## Requirements

### Requirement 1: Monitor Weekly Progress

**User Story:** As an admin, I want to monitor weekly progress for all curators and their students, so that I can track engagement and identify students who need support.

#### Acceptance Criteria

1. WHEN the admin navigates to the Monitoring Tab, THE Admin_Panel SHALL display a week selector with previous/next navigation buttons and current week display
2. WHEN the admin selects a different week, THE Monitoring_Tab SHALL load and display progress data for that specific week
3. WHEN the admin selects a season from the dropdown, THE Monitoring_Tab SHALL filter progress data to show only records from that season
4. WHEN the admin enters text in the search field, THE Monitoring_Tab SHALL filter displayed students by name matching the search query
5. WHEN the admin selects a curator filter, THE Monitoring_Tab SHALL display only progress records for that specific curator
6. WHEN the admin selects a status filter, THE Monitoring_Tab SHALL display only progress records matching that status (Bajarilmoqda, Hal qilindi, Kutilmoqda, Bajarmadi)
7. WHEN the admin selects an attendance filter, THE Monitoring_Tab SHALL display only progress records matching the attendance status (attended or not attended)
8. WHEN the admin clicks the clear filters button, THE Monitoring_Tab SHALL reset all filters to their default state
9. WHEN displaying curator cards on desktop, THE Monitoring_Tab SHALL show a table with columns for Student, Meeting, Goal, Problem, Solution, Status, and Actions
10. WHEN displaying curator cards on mobile, THE Monitoring_Tab SHALL show a card view with all progress information formatted for small screens
11. WHEN the admin clicks the edit button on a progress record, THE Admin_Panel SHALL open the Edit_Progress_Modal with pre-filled data
12. WHEN there are more than 5 curators with progress data, THE Monitoring_Tab SHALL paginate the display showing 5 curators per page
13. WHEN the admin clicks the Excel export button, THE Monitoring_Tab SHALL generate and download an Excel file containing all progress data for the selected season

### Requirement 2: Edit Student Progress

**User Story:** As an admin, I want to edit student progress records, so that I can correct errors or update information on behalf of curators.

#### Acceptance Criteria

1. WHEN the Edit_Progress_Modal opens, THE Admin_Panel SHALL display the student name and week number in the modal header
2. WHEN the admin modifies the meeting date/time input, THE Edit_Progress_Modal SHALL accept and validate the new date/time value
3. WHEN the admin toggles the attendance button, THE Edit_Progress_Modal SHALL update the attendance status between attended and not attended
4. WHEN the admin enters text in the weekly goal textarea, THE Edit_Progress_Modal SHALL accept and store the goal text
5. WHEN the admin selects a status button, THE Edit_Progress_Modal SHALL update the progress status to the selected value (Bajarilmoqda, Hal qilindi, Kutilmoqda, Bajarmadi)
6. WHEN the admin enters text in the problem textarea, THE Edit_Progress_Modal SHALL accept and store the problem description
7. WHEN the admin enters text in the solution textarea, THE Edit_Progress_Modal SHALL accept and store the solution description
8. WHEN the admin clicks the save button, THE Admin_Panel SHALL persist the updated progress record and close the modal
9. WHEN the admin clicks the cancel button, THE Edit_Progress_Modal SHALL close without saving changes

### Requirement 3: Manage Platform Users

**User Story:** As an admin, I want to manage all platform users, so that I can view user details, change roles, update statuses, and remove users when necessary.

#### Acceptance Criteria

1. WHEN the admin navigates to the Users Tab, THE Admin_Panel SHALL display a search bar for filtering users by name or username
2. WHEN the admin enters text in the search bar, THE Users_Tab SHALL filter the displayed users to match the search query
3. WHEN the admin clicks a role filter button, THE Users_Tab SHALL display only users with that role (All, Student, Curator, Admin)
4. WHEN displaying users on desktop, THE Users_Tab SHALL show a table with columns for User (avatar, name, username), Status, Role, Field, and Actions
5. WHEN displaying users on mobile, THE Users_Tab SHALL show a card view with all user information formatted for small screens
6. WHEN the admin clicks on a user row or card, THE Admin_Panel SHALL open the User_Profile_Modal with complete user details
7. WHEN the admin clicks the delete button for a user, THE Admin_Panel SHALL remove that user from the platform after confirmation
8. WHEN there are more than 15 users, THE Users_Tab SHALL paginate the display showing 15 users per page

### Requirement 4: View User Profiles

**User Story:** As an admin, I want to view detailed user profiles, so that I can understand user backgrounds, skills, and network connections.

#### Acceptance Criteria

1. WHEN the User_Profile_Modal opens, THE Admin_Panel SHALL display a full-screen overlay with blur backdrop
2. WHEN displaying user information, THE User_Profile_Modal SHALL show the user's avatar with status badge, name, username, role, and status badges
3. WHEN the user has email and field information, THE User_Profile_Modal SHALL display these details
4. WHEN the user has a professional bio, THE User_Profile_Modal SHALL display the bio in a dedicated section
5. WHEN the user has a field description, THE User_Profile_Modal SHALL display the field description
6. WHEN the user is a student, THE User_Profile_Modal SHALL display the assigned curator and startup curator information
7. WHEN the user is a curator, THE User_Profile_Modal SHALL display a list of all assigned students
8. WHEN the user is an admin, THE User_Profile_Modal SHALL display a global access message
9. WHEN the user has a motivation quote, THE User_Profile_Modal SHALL display the quote in a dedicated section
10. WHEN the user has technical skills, THE User_Profile_Modal SHALL display the skills as tags
11. WHEN the user is a curator, THE User_Profile_Modal SHALL provide Active/Inactive status management buttons
12. WHEN the user is a pending curator, THE User_Profile_Modal SHALL display an approve curator button
13. WHEN the user has social links, THE User_Profile_Modal SHALL display clickable social media links
14. WHEN the admin clicks the send direct message button, THE User_Profile_Modal SHALL display a direct message form
15. WHEN the admin submits a direct message, THE Admin_Panel SHALL send the message to the specific user

### Requirement 5: Approve Curator Requests

**User Story:** As an admin, I want to review and approve pending curator requests, so that I can onboard qualified mentors to the platform.

#### Acceptance Criteria

1. WHEN the admin navigates to the Requests Tab, THE Admin_Panel SHALL display a grid of pending curator cards in 3 columns on desktop
2. WHEN displaying a curator card, THE Requests_Tab SHALL show the candidate's avatar, name, username, and field
3. WHEN the admin clicks the quick approve button on a card, THE Admin_Panel SHALL approve the curator and remove them from the pending list
4. WHEN the admin clicks on a curator card, THE Admin_Panel SHALL open the User_Profile_Modal with the candidate's full profile
5. WHEN there are no pending curator requests, THE Requests_Tab SHALL display an empty state message

### Requirement 6: Manage Academic Seasons

**User Story:** As an admin, I want to manage academic seasons, so that I can organize the platform's timeline and track progress across different periods.

#### Acceptance Criteria

1. WHEN the admin navigates to the Seasons Tab, THE Admin_Panel SHALL display the active season card prominently with season number, start date, and duration
2. WHEN the admin modifies the duration input in the active season card, THE Seasons_Tab SHALL accept and validate the new duration value
3. WHEN the admin clicks the "Start New Season" button, THE Admin_Panel SHALL create a new season and set it as active
4. WHEN displaying season history, THE Seasons_Tab SHALL show all seasons with number, start date, and active status
5. WHEN the admin clicks the Excel export button for a season, THE Seasons_Tab SHALL generate and download an Excel file containing all progress data for that season
6. WHEN there is more than one season and the admin clicks the delete button, THE Admin_Panel SHALL remove that season after confirmation
7. WHEN the admin clicks on a season in the history list, THE Admin_Panel SHALL switch the active season to the selected season
8. WHEN the admin attempts to delete a season, THE Admin_Panel SHALL display a delete confirmation modal

### Requirement 7: Send Platform Notifications

**User Story:** As an admin, I want to send notifications to users, so that I can communicate important information to specific groups or all users.

#### Acceptance Criteria

1. WHEN the admin navigates to the Messages Tab, THE Admin_Panel SHALL display a send message form with title input, type dropdown, target role dropdown, and message textarea
2. WHEN the admin enters a title, THE Messages_Tab SHALL accept and store the notification title
3. WHEN the admin selects a notification type, THE Messages_Tab SHALL accept the type value (info, success, warning, urgent)
4. WHEN the admin selects a target role, THE Messages_Tab SHALL accept the role value (all, student, curator)
5. WHEN the admin enters message text, THE Messages_Tab SHALL accept and store the message content
6. WHEN the admin clicks the send button, THE Admin_Panel SHALL create and send the notification to all users matching the target role
7. WHEN displaying message history, THE Messages_Tab SHALL show all notifications sorted by date with newest first
8. WHEN displaying a message in history, THE Messages_Tab SHALL show type indicator, title, timestamp, message content, target role, and sender
9. WHEN a message is unread, THE Messages_Tab SHALL display a "mark as read" button
10. WHEN the admin clicks "mark as read" on a message, THE Admin_Panel SHALL update the message status to read
11. WHEN there are unread messages, THE Messages_Tab SHALL display a "mark all as read" button
12. WHEN the admin clicks "mark all as read", THE Admin_Panel SHALL update all messages to read status

### Requirement 8: Configure Platform Settings

**User Story:** As an admin, I want to configure platform settings, so that I can control registration availability and notification preferences.

#### Acceptance Criteria

1. WHEN the admin navigates to the Settings Tab, THE Admin_Panel SHALL display registration toggle controls for student and curator registration
2. WHEN the admin toggles student registration, THE Settings_Tab SHALL update the platform's student registration availability
3. WHEN the admin toggles curator registration, THE Settings_Tab SHALL update the platform's curator registration availability
4. WHEN the admin enters an admin email address, THE Settings_Tab SHALL accept and validate the email format
5. WHEN the admin toggles season start notifications, THE Settings_Tab SHALL update the notification preference
6. WHEN the admin clicks the save settings button, THE Admin_Panel SHALL persist all settings changes

### Requirement 9: Apply Buddy Design System

**User Story:** As a developer, I want all admin panel components to follow the Buddy Design System, so that the interface maintains visual consistency with the platform.

#### Acceptance Criteria

1. THE Admin_Panel SHALL use the background gradient `bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950`
2. WHEN rendering cards, THE Admin_Panel SHALL apply `bg-slate-900` background with 2px borders and 4px shadow offset
3. WHEN rendering different sections, THE Admin_Panel SHALL apply color-coded styling (Indigo, Purple, Green, Orange, Teal, Pink, Red)
4. WHEN a user hovers over interactive elements, THE Admin_Panel SHALL apply `translate(2px, 2px)` transform with shadow reduction
5. WHEN rendering icons, THE Admin_Panel SHALL apply gradient backgrounds to all icons
6. WHEN rendering cards and containers, THE Admin_Panel SHALL use rounded corners of 24px (xl), 16px (lg), or 12px (md)
7. WHEN rendering labels and headings, THE Admin_Panel SHALL use bold, uppercase text with letter spacing

### Requirement 10: Export Data to Excel

**User Story:** As an admin, I want to export monitoring data to Excel, so that I can analyze progress offline and share reports with stakeholders.

#### Acceptance Criteria

1. WHEN the admin clicks an Excel export button, THE Admin_Panel SHALL generate an Excel workbook using the ExcelJS library
2. WHEN generating the Excel file, THE Admin_Panel SHALL include all progress records for the selected season
3. WHEN generating the Excel file, THE Admin_Panel SHALL format columns for Student Name, Curator Name, Week Number, Meeting Date, Attendance, Goal, Problem, Solution, and Status
4. WHEN the Excel file is generated, THE Admin_Panel SHALL trigger a browser download with a descriptive filename including the season number and export date
5. WHEN there is no data to export, THE Admin_Panel SHALL display an appropriate message instead of generating an empty file

### Requirement 11: Persist User Preferences

**User Story:** As an admin, I want my tab selection and filter preferences to persist, so that I can resume my work without reconfiguring the interface.

#### Acceptance Criteria

1. WHEN the admin selects a tab, THE Admin_Panel SHALL store the selected tab identifier in localStorage
2. WHEN the admin returns to the Admin Panel, THE Admin_Panel SHALL restore the previously selected tab from localStorage
3. WHEN the admin changes the monitoring week, THE Monitoring_Tab SHALL store the selected week in localStorage
4. WHEN the admin returns to the Monitoring Tab, THE Monitoring_Tab SHALL restore the previously selected week from localStorage
5. WHEN the admin configures notification settings, THE Settings_Tab SHALL store the preferences in localStorage

### Requirement 12: Ensure Responsive Design

**User Story:** As an admin using a mobile device, I want the admin panel to adapt to my screen size, so that I can perform administrative tasks on any device.

#### Acceptance Criteria

1. WHEN the viewport width is less than 768px, THE Admin_Panel SHALL switch to mobile layout with card-based views
2. WHEN the viewport width is 768px or greater, THE Admin_Panel SHALL display desktop layout with table-based views
3. WHEN displaying tables on mobile, THE Admin_Panel SHALL convert table rows to cards with all information visible
4. WHEN displaying the navigation on mobile, THE Admin_Panel SHALL use a mobile-optimized navigation component
5. WHEN displaying modals on mobile, THE Admin_Panel SHALL ensure modals are scrollable and fit within the viewport

### Requirement 13: Ensure Accessibility Compliance

**User Story:** As a developer, I want the admin panel to be accessible, so that administrators with disabilities can use all features effectively.

#### Acceptance Criteria

1. WHEN rendering interactive elements, THE Admin_Panel SHALL provide appropriate ARIA labels and roles
2. WHEN rendering form inputs, THE Admin_Panel SHALL associate labels with inputs using proper HTML semantics
3. WHEN rendering modals, THE Admin_Panel SHALL trap focus within the modal and return focus on close
4. WHEN rendering buttons and links, THE Admin_Panel SHALL ensure sufficient color contrast ratios (WCAG AA minimum)
5. WHEN rendering dynamic content updates, THE Admin_Panel SHALL announce changes to screen readers using ARIA live regions
6. WHEN rendering keyboard-interactive elements, THE Admin_Panel SHALL support standard keyboard navigation (Tab, Enter, Escape)
