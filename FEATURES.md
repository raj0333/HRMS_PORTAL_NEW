# HRMS Portal - Complete Features Guide

## Sidebar Navigation with Dropdown Submenus

### Main Menu Items (All Fully Functional)

#### 1. **Dashboard**
- Direct link to main dashboard
- Shows statistics, recent activities, upcoming holidays

#### 2. **Onboarding** (Dropdown Menu)
- Pre-Onboarding
  - Add candidate profiles
  - Send offer letters
  - Accept/Reject offers
  - Manage documents
  - Track BGV status
  - Auto-generate Employee IDs
  
- Orientation
  - Track induction sessions
  - Monitor completion status
  
- Asset Setup
  - Allocate IT assets
  - Track asset status
  - Document management
  
- Department Introduction
  - Team introductions
  - Reporting manager assignment
  
- Training & System Access
  - Track training sessions
  - Monitor completion
  
- Probation Period Monitoring
  - Track employee performance
  - Regular check-ins
  - Manager feedback
  
- Confirmation Process
  - Performance reviews
  - Confirmation approval
  - Final salary confirmation

#### 3. **Employees** (Dropdown Menu) - NEW!
- **Employee List** - View all employees with search/filter
- **Add Employee** - Opens form to add new employees
  - Full name, email, phone
  - Department, position
  - Join date, salary
  - Full CRUD operations (Create, Read, Update, Delete)

#### 4. **Attendance**
- View attendance records
- Check-in/check-out tracking
- Working hours calculation
- Status tracking (Present/Absent/Half-day/Holiday)

#### 5. **Leave Management** (Dropdown Menu) - NEW!
- **All Leave Requests** - View all leave requests
- **Apply Leave** - Opens form to apply for leave
  - Select leave type (Casual, Sick, Earned, Maternity, Paternity)
  - Choose start and end dates
  - Auto-calculation of days
  - Add reason for leave
  - Status tracking (Pending/Approved/Rejected)
  - Approve/Reject functionality

#### 6. **Payroll** (Dropdown Menu) - NEW!
- **Payroll Records** - View salary records
- **Process Payroll** - Process employee salaries
  - Salary components (Base, Allowances, Deductions, Bonuses)
  - Status tracking (Pending/Processed/Paid)
  - Payslip download
  - Statistics (Total payroll, averages)

#### 7. **Departments** (Dropdown Menu) - NEW!
- **All Departments** - View all departments
- **Add Department** - Opens form to add departments
  - Department name and description
  - Department head assignment
  - Budget allocation
  - Location management
  - Employee count tracking
  - Full CRUD operations

#### 8. **Personal Information**
- User profile management
- Update personal details
- Manage address information
- Save functionality

#### 9. **Working Hours**
- Track daily working hours
- Monthly statistics

#### 10. **Feedback**
- Submit feedback
- View feedback history

---

## Key Features

### Authentication
- Sign In with email/password
- User Registration
- Forgot Password Recovery
- Demo credentials available

### User Interface
- **Dark/Light Mode Toggle** - Top right corner
- **Custom Scrollbar** - Thin, transparent design
- **Responsive Design** - Mobile, tablet, desktop
- **Smooth Animations** - Sidebar transitions, hover effects
- **Gradient Buttons** - Red theme throughout
- **Status Badges** - Color-coded indicators
- **Search & Filter** - Employee and request filtering
- **Modal Dialogs** - Interactive forms

### Navigation Features
- **Dropdown Submenus** - All major sections have submenus
- **Quick Access** - Direct links from sidebar
- **Active Page Highlighting** - Current page highlighted in sidebar
- **Mobile Menu** - Hamburger menu for mobile devices
- **Auto-close on Mobile** - Menu closes after selection

### Form Features
- **Add Employee Modal** - Full form with validation
- **Apply Leave Modal** - Date picker, auto-calculation
- **Edit/Delete Functionality** - Update or remove records
- **Form Reset** - Clear fields between actions

---

## Demo Credentials

```
Super Admin:
Email: admin@hrms.com
Password: admin123

HR Manager:
Email: hr@hrms.com
Password: hr123

Employee:
Email: emp@hrms.com
Password: emp123
```

---

## How to Use the New Features

### Adding an Employee
1. Click "Employees" in sidebar (dropdown appears)
2. Click "Add Employee"
3. Form opens automatically
4. Fill in all employee details
5. Click "Add Employee" button
6. Employee added to list

### Applying for Leave
1. Click "Leave Management" in sidebar (dropdown appears)
2. Click "Apply Leave"
3. Form opens automatically
4. Select leave type
5. Choose start and end dates
6. Days automatically calculated
7. Add reason
8. Click "Submit Leave Request"

### Adding a Department
1. Click "Departments" in sidebar (dropdown appears)
2. Click "Add Department"
3. Form opens automatically
4. Fill department details
5. Click "Add Department" button
6. Department added to list

---

## Technical Details

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom dark mode
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Responsive**: Mobile-first design

---

## Build Information

- Development: `npm run dev`
- Production Build: `npm run build`
- Preview: `npm run preview`
- Type Check: `npm run typecheck`
- Lint: `npm run lint`

Build Status: ✓ All modules successfully compiled
Total Size: ~79KB gzipped
