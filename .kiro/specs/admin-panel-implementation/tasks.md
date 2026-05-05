# Implementation Plan: Admin Panel Implementation

## Overview

This implementation plan breaks down the Admin Panel feature into discrete coding tasks. The approach is incremental: build each tab component with its core functionality, add shared modals, implement Excel export, add testing, and finally integrate everything. Each task builds on previous work, ensuring no orphaned code.

The implementation follows the Buddy Design System's Neobrutalism aesthetic and uses React, TypeScript, Framer Motion, and ExcelJS. Testing uses fast-check for property-based tests and React Testing Library for unit tests.

## Tasks

- [ ] 1. Set up testing infrastructure and custom arbitraries
  - Install fast-check, jest-axe, and configure test environment
  - Create custom arbitraries for User, StudentProgress, Season, Notification
  - Create test utilities (renderWithProviders, mock data fixtures)
  - Set up test file structure (*.test.tsx, *.properties.test.tsx)
  - _Requirements: All testing requirements_

- [ ] 2. Implement MonitoringTab component
  - [ ] 2.1 Create MonitoringTab component with week selector and filters
    - Implement WeekSelector component (prev/next buttons, current week display)
    - Implement FilterBar component (search, season, curator, status, attendance filters)
    - Implement clear filters functionality
    - Add LocalStorage persistence for selected week
    - _Requirements: 1.1, 1.2, 1.8, 11.3, 11.4_
  
  - [ ]* 2.2 Write property tests for MonitoringTab filters
    - **Property 1: Week-based progress filtering**
    - **Property 2: Season-based progress filtering**
    - **Property 3: Student name search filtering**
    - **Property 4: Curator-based progress filtering**
    - **Property 5: Status-based progress filtering**
    - **Property 6: Attendance-based progress filtering**
    - **Property 7: Filter reset idempotence**
    - **Validates: Requirements 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8**
  
  - [ ] 2.3 Implement CuratorProgressCard with responsive layouts
    - Create desktop table layout with 7 columns (Student, Meeting, Goal, Problem, Solution, Status, Actions)
    - Create mobile card layout with stacked information
    - Implement pagination (5 curators per page)
    - Add edit button that opens EditProgressModal
    - Apply Buddy Design System styling (indigo color scheme)
    - _Requirements: 1.9, 1.10, 1.11, 1.12, 9.1, 9.2, 9.3_
  
  - [ ]* 2.4 Write property tests for MonitoringTab pagination and modal
    - **Property 8: Progress modal data pre-fill**
    - **Property 9: Curator pagination**
    - **Validates: Requirements 1.11, 1.12**
  
  - [ ]* 2.5 Write unit tests for MonitoringTab
    - Test week selector navigation
    - Test filter UI interactions
    - Test responsive layout switching
    - Test empty state rendering
    - _Requirements: 1.1, 1.9, 1.10_

- [ ] 3. Implement EditProgressModal component
  - [ ] 3.1 Create EditProgressModal with form fields
    - Implement modal overlay with blur backdrop
    - Create form with meeting date input, attendance toggle, goal textarea
    - Create status selector (4 buttons: Bajarilmoqda, Hal qilindi, Kutilmoqda, Bajarmadi)
    - Create problem and solution textareas
    - Implement save and cancel buttons
    - Add form validation (date format, text length limits)
    - Apply Buddy Design System styling
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 9.1, 9.2_
  
  - [ ]* 3.2 Write property tests for EditProgressModal
    - **Property 13: Date validation**
    - **Property 14: Attendance toggle round-trip**
    - **Property 15: Form input persistence**
    - **Property 16: Status selection**
    - **Property 17: Progress save persistence**
    - **Property 18: Progress cancel preservation**
    - **Validates: Requirements 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9**
  
  - [ ]* 3.3 Write unit tests for EditProgressModal
    - Test modal opening/closing
    - Test form validation errors
    - Test save and cancel actions
    - _Requirements: 2.1, 2.8, 2.9_

- [ ] 4. Implement Excel export functionality
  - [ ] 4.1 Create Excel export utility functions
    - Install and configure ExcelJS
    - Create exportSeasonToExcel function with column structure
    - Implement worksheet styling (header row, alternating rows)
    - Implement filename generation (buddy_season_{number}_{date}.xlsx)
    - Add error handling for export failures
    - _Requirements: 1.13, 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [ ]* 4.2 Write property tests for Excel export
    - **Property 10: Excel export completeness**
    - **Property 11: Excel export structure**
    - **Property 12: Excel filename format**
    - **Validates: Requirements 1.13, 10.2, 10.3, 10.4**
  
  - [ ]* 4.3 Write unit tests for Excel export
    - Test export with sample data
    - Test empty data handling
    - Test error scenarios
    - _Requirements: 10.5_

- [ ] 5. Checkpoint - Ensure MonitoringTab and Excel export work correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement UsersTab component
  - [ ] 6.1 Create UsersTab with search and role filters
    - Implement search bar for name/username filtering
    - Implement role filter buttons (All, Student, Curator, Admin)
    - Create desktop table layout with 5 columns (User, Status, Role, Field, Actions)
    - Create mobile card layout
    - Implement pagination (15 users per page)
    - Add delete user action with confirmation
    - Apply Buddy Design System styling (purple color scheme)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.7, 3.8, 9.1, 9.2, 9.3_
  
  - [ ]* 6.2 Write property tests for UsersTab
    - **Property 19: User search filtering**
    - **Property 20: Role-based user filtering**
    - **Property 21: User profile modal data completeness**
    - **Property 22: User deletion**
    - **Property 23: User pagination**
    - **Validates: Requirements 3.2, 3.3, 3.6, 3.7, 3.8**
  
  - [ ]* 6.3 Write unit tests for UsersTab
    - Test search functionality
    - Test role filter buttons
    - Test delete confirmation
    - Test responsive layouts
    - _Requirements: 3.1, 3.4, 3.5, 3.7_

- [ ] 7. Implement UserProfileModal component
  - [ ] 7.1 Create UserProfileModal with all sections
    - Implement modal overlay with full-screen layout
    - Create header section (avatar, name, username, role badge, status badge)
    - Create basic info section (email, field)
    - Create bio sections (professional bio, field description)
    - Create Buddy Network section (role-based: curator/students display)
    - Create motivation quote section
    - Create skills tags section
    - Create status management buttons (for curators)
    - Create approve button (for pending curators)
    - Create social links section
    - Create direct message form (expandable)
    - Apply Buddy Design System styling
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 4.11, 4.12, 4.13, 4.14, 4.15, 9.1, 9.2_
  
  - [ ]* 7.2 Write property tests for UserProfileModal
    - **Property 24: Conditional field rendering**
    - **Property 25: Student buddy network display**
    - **Property 26: Curator buddy network display**
    - **Property 27: Skills tag rendering**
    - **Property 28: Pending curator approval button**
    - **Property 29: Social links rendering**
    - **Property 30: Direct message targeting**
    - **Validates: Requirements 4.3, 4.4, 4.5, 4.6, 4.7, 4.9, 4.10, 4.12, 4.13, 4.15**
  
  - [ ]* 7.3 Write unit tests for UserProfileModal
    - Test modal opening/closing
    - Test role-based rendering (student vs curator vs admin)
    - Test direct message form
    - Test approve action
    - _Requirements: 4.1, 4.6, 4.7, 4.8, 4.14, 4.15_

- [ ] 8. Checkpoint - Ensure UsersTab and UserProfileModal work correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Implement RequestsTab component
  - [ ] 9.1 Create RequestsTab with curator request grid
    - Implement 3-column grid layout for desktop
    - Implement single-column layout for mobile
    - Create CuratorRequestCard component (avatar, name, username, field)
    - Add quick approve button on each card
    - Add click handler to open UserProfileModal
    - Implement empty state for no pending requests
    - Apply Buddy Design System styling (green color scheme)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 9.1, 9.2, 9.3_
  
  - [ ]* 9.2 Write property tests for RequestsTab
    - **Property 31: Pending curator filtering**
    - **Property 32: Quick approve action**
    - **Property 33: Curator card data completeness**
    - **Validates: Requirements 5.2, 5.3**
  
  - [ ]* 9.3 Write unit tests for RequestsTab
    - Test grid layout rendering
    - Test quick approve action
    - Test empty state
    - Test modal opening
    - _Requirements: 5.1, 5.4, 5.5_

- [ ] 10. Implement SeasonsTab component
  - [ ] 10.1 Create SeasonsTab with active season card and history
    - Implement ActiveSeasonCard (season number, start date, duration input)
    - Add duration validation (positive integers only)
    - Implement "Start New Season" button with season creation logic
    - Create SeasonHistoryList component
    - Create SeasonHistoryItem with Excel export and delete buttons
    - Implement season switching (click to activate)
    - Add delete confirmation modal
    - Implement delete validation (prevent deleting last season)
    - Apply Buddy Design System styling (orange color scheme)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 9.1, 9.2, 9.3_
  
  - [ ]* 10.2 Write property tests for SeasonsTab
    - **Property 34: Duration validation**
    - **Property 35: New season creation**
    - **Property 36: Season history completeness**
    - **Property 37: Season deletion validation**
    - **Property 38: Active season switching**
    - **Validates: Requirements 6.2, 6.3, 6.4, 6.6, 6.7**
  
  - [ ]* 10.3 Write unit tests for SeasonsTab
    - Test active season display
    - Test duration input validation
    - Test new season creation
    - Test delete confirmation modal
    - Test season switching
    - _Requirements: 6.1, 6.3, 6.6, 6.7, 6.8_

- [ ] 11. Implement MessagesTab component
  - [ ] 11.1 Create MessagesTab with send form and history
    - Implement SendMessageForm (title input, type dropdown, target role dropdown, message textarea)
    - Add form validation (title max 100 chars, message max 500 chars)
    - Implement send button with notification creation
    - Create MessageHistorySection with sorted list (newest first)
    - Create MessageHistoryItem (type indicator, title, timestamp, message, target role, sender)
    - Add "mark as read" button for unread messages
    - Add "mark all as read" button
    - Apply Buddy Design System styling (teal color scheme)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 7.10, 7.11, 7.12, 9.1, 9.2, 9.3_
  
  - [ ]* 11.2 Write property tests for MessagesTab
    - **Property 39: Notification form input persistence**
    - **Property 40: Notification type selection**
    - **Property 41: Notification target role selection**
    - **Property 42: Notification creation and targeting**
    - **Property 43: Notification history sorting**
    - **Property 44: Notification display completeness**
    - **Property 45: Mark as read action**
    - **Property 46: Mark all as read action**
    - **Property 47: Unread notification button visibility**
    - **Validates: Requirements 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 7.10, 7.11, 7.12**
  
  - [ ]* 11.3 Write unit tests for MessagesTab
    - Test form validation
    - Test send notification
    - Test message history rendering
    - Test mark as read actions
    - _Requirements: 7.1, 7.6, 7.10, 7.12_

- [ ] 12. Checkpoint - Ensure RequestsTab, SeasonsTab, and MessagesTab work correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 13. Implement SettingsTab component
  - [ ] 13.1 Create SettingsTab with registration and notification settings
    - Implement registration toggle controls (student, curator)
    - Implement notification settings section (season notifications toggle, admin email input)
    - Add email validation
    - Implement save settings button with LocalStorage persistence
    - Apply Buddy Design System styling (pink color scheme)
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 9.1, 9.2, 9.3_
  
  - [ ]* 13.2 Write property tests for SettingsTab
    - **Property 48: Registration toggle state**
    - **Property 49: Email validation**
    - **Property 50: Settings persistence**
    - **Validates: Requirements 8.2, 8.3, 8.4, 8.5, 8.6**
  
  - [ ]* 13.3 Write unit tests for SettingsTab
    - Test toggle interactions
    - Test email validation
    - Test save settings
    - _Requirements: 8.1, 8.6_

- [ ] 14. Implement LocalStorage persistence utilities
  - [ ] 14.1 Create LocalStorage helper functions
    - Implement saveTab and loadTab functions
    - Implement saveMonitoringWeek and loadMonitoringWeek functions
    - Implement saveSettings and loadSettings functions
    - Add error handling for corrupted data
    - Create getCurrentWeekNumber utility
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_
  
  - [ ]* 14.2 Write property tests for LocalStorage persistence
    - **Property 51: Tab selection round-trip**
    - **Property 52: Monitoring week round-trip**
    - **Property 53: Settings persistence round-trip**
    - **Validates: Requirements 11.1, 11.2, 11.3, 11.4, 11.5**
  
  - [ ]* 14.3 Write unit tests for LocalStorage utilities
    - Test save and load functions
    - Test corrupted data handling
    - Test getCurrentWeekNumber
    - _Requirements: 11.1, 11.3, 11.5_

- [ ] 15. Implement responsive design and animations
  - [ ] 15.1 Add responsive breakpoints and mobile layouts
    - Implement viewport detection utility
    - Add responsive classes to all tab components
    - Ensure table-to-card conversion on mobile
    - Test all components at 768px breakpoint
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_
  
  - [ ] 15.2 Add Framer Motion animations
    - Implement hover effects (translate, shadow reduction)
    - Implement modal animations (fade in/out, scale)
    - Implement page transition animations
    - Apply animations to all interactive elements
    - _Requirements: 9.4_
  
  - [ ]* 15.3 Write property tests for responsive design
    - **Property 54: Viewport-based layout switching**
    - **Property 55: Mobile modal scrollability**
    - **Validates: Requirements 12.1, 12.2, 12.3, 12.5**
  
  - [ ]* 15.4 Write unit tests for responsive behavior
    - Test viewport detection
    - Test layout switching
    - Test mobile navigation
    - _Requirements: 12.1, 12.2, 12.4_

- [ ] 16. Implement accessibility features
  - [ ] 16.1 Add ARIA labels and keyboard navigation
    - Add aria-label to all interactive elements
    - Associate labels with form inputs
    - Implement focus trap in modals
    - Add aria-live regions for dynamic content
    - Implement keyboard navigation (Tab, Enter, Escape)
    - Test with jest-axe for violations
    - _Requirements: 13.1, 13.2, 13.3, 13.5, 13.6_
  
  - [ ]* 16.2 Write property tests for accessibility
    - **Property 56: Interactive element ARIA labels**
    - **Property 57: Modal focus management**
    - **Property 58: Dynamic content announcements**
    - **Property 59: Keyboard navigation support**
    - **Validates: Requirements 13.1, 13.2, 13.3, 13.5, 13.6**
  
  - [ ]* 16.3 Write accessibility tests with jest-axe
    - Test all tab components for violations
    - Test modals for violations
    - Test keyboard navigation
    - Test focus management
    - _Requirements: 13.1, 13.2, 13.3, 13.6_

- [ ] 17. Integrate all tabs into AdminPanel component
  - [ ] 17.1 Update AdminPanel with tab routing and state management
    - Implement tab selection with LocalStorage persistence
    - Add conditional rendering for all 6 tabs
    - Wire up all callback props to tab components
    - Implement modal state management (UserProfileModal, EditProgressModal)
    - Ensure proper modal overlay stacking
    - Test tab switching and data flow
    - _Requirements: 11.1, 11.2_
  
  - [ ]* 17.2 Write integration tests for AdminPanel
    - Test tab navigation
    - Test data flow between tabs and modals
    - Test LocalStorage persistence across tabs
    - Test modal opening from different tabs
    - _Requirements: 11.1, 11.2_

- [ ] 18. Implement error handling and validation
  - [ ] 18.1 Add error handling to all components
    - Implement toast notification system for errors
    - Add inline validation errors for form inputs
    - Add error boundaries for component failures
    - Implement network error handling
    - Add error logging to console
    - _Requirements: All error handling requirements_
  
  - [ ]* 18.2 Write unit tests for error scenarios
    - Test validation errors
    - Test network errors
    - Test delete operation errors
    - Test Excel export errors
    - _Requirements: All error handling requirements_

- [ ] 19. Final checkpoint - Run full test suite and verify all features
  - Ensure all tests pass (unit + property tests)
  - Verify 85%+ code coverage
  - Run accessibility tests with jest-axe
  - Test all tabs manually in browser
  - Test responsive behavior at different viewport sizes
  - Test keyboard navigation through all features
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 20. Performance optimization and cleanup
  - [ ] 20.1 Optimize rendering performance
    - Add React.memo to expensive components
    - Implement useMemo for filtered data
    - Optimize pagination to prevent rendering all items
    - Test with large datasets (1000+ users, 5000+ progress records)
    - _Requirements: Performance testing requirements_
  
  - [ ]* 20.2 Write performance tests
    - Test rendering time with large datasets
    - Test filter performance
    - Test Excel export time
    - Monitor memory usage
    - _Requirements: Performance testing requirements_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties (100 iterations each)
- Unit tests validate specific examples and edge cases
- All components follow the Buddy Design System's Neobrutalism aesthetic
- Responsive design ensures mobile and desktop compatibility
- Accessibility features ensure WCAG compliance
