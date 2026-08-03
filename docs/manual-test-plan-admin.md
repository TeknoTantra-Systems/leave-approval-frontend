# Manual UI Test Plan — Admin Role (App Admin)

**Pre-requisites:**
- Backend server running on `http://localhost:5000`
- Frontend dev server running (`npm run dev`)
- Admin credentials: `admin@company.com` / `password123` (or seeded admin account)
- Test user credentials (non-admin) for access boundary tests
- Browser: Chrome/Edge/Firefox with DevTools open (Network tab to monitor API calls)

---

## Session 1: Login & Access Control

### 1.1 Login as Admin
1. Navigate to `http://localhost:5173/login`
2. Enter `admin@company.com`, password: `password123`, click **Sign In**
3. **Verify:** Redirected to `/dashboard/admin`, sidebar shows admin nav items, role badge says "App Admin"

### 1.2 Verify All Admin Routes Load
Navigate to each URL below — verify page loads without error:
- `/dashboard/admin` — Dashboard
- `/admin/users` — Users list
- `/admin/departments` — Departments
- `/admin/leave-types` — Leave Types
- `/admin/approval-matrix` — Approval Matrix
- `/admin/leave-requests` — Leave Requests
- `/admin/reports` — Reports
- `/notifications` — Notifications
- `/settings` — Settings
- `/profile` — Profile

### 1.3 Verify Blocked Routes
1. Open a new tab, navigate to each URL below while **logged in as admin**:
   - `/leave/apply`
   - `/leave/history`
   - `/leave/1` (any ID)
   - `/manager/approval`
   - `/hr/approval`
   - `/director/approval`
2. **Verify:** Each redirects to `/unauthorized` (403 page)

### 1.4 Verify Logged-Out Access
1. Click **Sign Out** (Settings > Sign Out, or clear localStorage token)
2. Try navigating to `/dashboard/admin` directly
3. **Verify:** Redirected to `/login`

---

## Session 2: Admin Dashboard

1. **Verify stat cards:** 4 primary cards (Total Employees, Managers, HR, Directors) plus 4 secondary cards should render with numeric values
2. **Verify loading state:** Refresh the page — spinner should appear briefly before data loads
3. **Verify hardcoded sections:** Department Summary, Approval Matrix Summary, Recent Notifications, Recent User Registrations tables are visible
4. **Verify "Recent Activity"** section shows activity list or "No recent activity" message
5. Click "View All" link — **verify** it navigates to `/admin/leave-requests`
6. **Error scenario:** Stop the backend server, refresh dashboard — **verify** page doesn't crash, shows default/zero values + toast error

---

## Session 3: Users — List & Search

1. Navigate to `/admin/users`
2. **Verify table columns:** Employee ID, Name, Department, Role, Manager, Status, Actions
3. **Verify pagination:** If > 8 users exist, pagination controls appear; click Next/Prev
4. **Verify search:**
   - Type existing user's name → table filters correctly
   - Type email → filters correctly
   - Type Employee ID → filters correctly
   - Type "xyz123nonexistent" → empty state shown
5. **Verify status badges:** Active users show green badge, inactive users show red badge
6. **Resize browser to < 1024px** — verify cards replace table
7. Click "View" on a user → navigates to `/admin/users/:id`
8. Click "Edit" on a user → navigates to `/admin/users/:id/edit`

---

## Session 4: Users — Create

1. Click "Add User" button → navigate to Create User page
2. **Verify department dropdown** is populated with existing departments
3. **Verify role options:** Employee, Manager, HR, Director — **Admin should NOT be listed**
4. **Fill all fields with valid data:**
   - Name: "Test User"
   - Email: `testuser@example.com`
   - Password: `Test@123`
   - Employee ID: `EMP-TEST-001`
   - Role: Employee
   - Department: select one
   - Phone: `9876543210` (optional)
   - Manager: (optional)
   - Join Date: select today
5. Click **Submit**
6. **Verify:** Toast "User created successfully", redirected to `/admin/users`, new user appears in list
7. **Test validation errors** (without submitting):
   - Clear Name → submit → "Name is required"
   - Enter invalid email `abc` → "Invalid email address"
   - Leave role empty → "Role is required"
   - Leave department empty → "Department is required"
   - Leave Employee ID empty → "Employee ID is required"
8. **Test API error:** Stop backend, submit form → verify toast "Failed to create user"

---

## Session 5: Users — Edit & Details

### Edit User
1. Navigate to `/admin/users`, click **Edit** on any user
2. **Verify** form pre-filled with existing data
3. Change name, click Submit → toast "User updated successfully"
4. Change role → saves correctly
5. Clear name → submit → "Name is required"
6. Enter invalid email → "Invalid email address"
7. Click Cancel → navigates back to users list without saving

### User Details
1. Navigate to `/admin/users`, click **View** on a user
2. **Verify** all info fields displayed correctly
3. Click **Edit** button → navigates to edit page
4. Go back to details page
5. Click **Deactivate** → status toggles, badge turns red, toast "User status updated"
6. Click **Activate** → status toggles back to active
7. Click **Delete** → ConfirmDialog appears
8. Click **Cancel** on dialog → user NOT deleted
9. Click **Delete** → confirm → toast "User deleted", navigated to users list

### Edge Cases
1. Navigate to `/admin/users/99999` (non-existent ID) → "User Not Found" state
2. Stop backend, refresh details → error state, no crash

---

## Session 6: Departments — CRUD

1. Navigate to `/admin/departments`
2. **Verify list** shows all departments with columns: Name, Head, Employees Count, Status, Actions
3. **Verify search:** Type department name → filters correctly
4. **Create department:**
   - Click "Add Department"
   - Enter name only → Submit → toast "Department created"
   - Create another with name + Head → both fields saved
5. **Test validation:** Click Add, leave name empty → toast "Department name is required"
6. **Edit:** Click Edit on a department → modal pre-filled → change name → save
7. **Delete:** Click Delete → ConfirmDialog → Cancel → department stays
   - Click Delete → Confirm → department deleted
8. **Resize to < 1024px** → verify card view
9. **API error:** Stop backend, try create/edit/delete → toast error

---

## Session 7: Leave Types — CRUD

1. Navigate to `/admin/leave-types`
2. **Verify list** with columns: Leave Type, Max Days, Paid, Carry Forward, Status, Actions
3. **Create leave type:**
   - Click "Add Leave Type"
   - Fill: select Type (e.g. "Annual"), Name auto-fills, enter Max Days: 15, Paid: checked, Carry Forward: unchecked
   - Submit → toast "Leave type created"
4. **Test validation:** Leave name/type empty → toast "Name and type are required"
5. **Edit:** Click Edit → modal pre-filled → change max days → save
6. **Delete:** Click Delete → Confirm → deleted
7. **Resize to < 1024px** → verify card view

---

## Session 8: Approval Matrix

1. Navigate to `/admin/approval-matrix`
2. **Verify** 3 default rows: <=3 days, <=10 days, no limit
3. **Verify** "How It Works" section with 3 paragraphs
4. Click **Edit Matrix** → inputs and checkboxes become editable
5. Modify max days and description on a row
6. Toggle approver checkboxes (Manager, HR, Director)
7. Click **Add Row** → new empty row appears
8. Click **Remove** on a row → row removed
9. Click **Save** → toast "Approval matrix updated", exits edit mode
10. Click **Edit Matrix** again → **Cancel** → changes revert, exits edit mode
11. Remove all rows → Save → edge case accepted
12. **Resize to < 1024px** → verify card view

---

## Session 9: Leave Requests — Read-Only

1. Navigate to `/admin/leave-requests`
2. **Verify** 4 stat cards: Total, Pending, Approved, Rejected
3. **Verify table** shows leave requests with columns
4. **Search by:** Request ID → filters correctly
5. **Search by:** Employee name → filters correctly
6. **Search by:** Employee ID → filters correctly
7. **Filter by department** → correct subset
8. **Filter by leave type** → correct subset
9. **Filter by status** (Approved, Rejected, Pending) → correct subset
10. **Combine filters** (e.g. department + status) → intersection
11. **Clear filters** → full list restored
12. **Verify stat cards update** as filters change
13. **Empty state:** Filter to something impossible → empty state "No leave requests found"
14. **Pagination** with > 8 results
15. **Resize to < 1024px** → verify card view

---

## Session 10: Reports

1. Navigate to `/admin/reports`
2. **Verify** 4 report cards: Monthly, Department, Employee, Leave Balance
3. Click **Export PDF** on Monthly Report → browser alert appears
4. Click **Export CSV** → alert appears
5. Click **Export Excel** → alert appears

---

## Session 11: Settings — Admin View

1. Navigate to `/settings`
2. **Verify sections:** Appearance, Notifications, Change Password, Language, System Settings
3. **Dark Mode:** Toggle → theme switches immediately
4. **Email Notifications:** Toggle → toast "Preference saved"
5. **Change Language:** Select different language → toast "Language preference saved"
6. **System Settings** — verify all fields visible: Company Name, Working Days, Reminder Interval, Escalation, Weekend, Default Leave Balance
7. **Change Password:**
   - Enter current + new + confirm → Submit → toast "Password change is not yet supported by the backend."
   - Short password (4 chars) → "Password must be at least 8 characters"
   - No uppercase → "Must contain at least one uppercase letter"
   - No lowercase → "Must contain at least one lowercase letter"
   - No digit → "Must contain at least one number"
   - Passwords don't match → "Passwords do not match"

### Sign Out Flow
1. Click "Sign Out" button → ConfirmDialog appears
2. Click Cancel → stays on page
3. Click Sign Out → Confirm → redirected to `/login`, cannot access admin routes

---

## Session 12: Profile

1. Navigate to `/profile`
2. **Verify** name, email, role badge "App Admin", department, join date displayed
3. **Verify** Leave Balance section shows 3 leave types with progress bars
4. Click **Settings** link → navigates to `/settings`
5. **Error scenario:** Stop backend → "Profile not available" state

---

## Session 13: Notifications

1. Navigate to `/notifications`
2. **Verify** list of notifications loads
3. **Verify** unread count displayed in page header
4. **Mark one as read:** Click mark-read icon → notification updates visually, count decrements
5. **Mark all as read:** Click "Mark All Read" → all marked, toast confirms, "Mark All Read" button disappears
6. **Delete one:** Click delete icon → notification removed, toast "Notification deleted"
7. **Search by title** → filters correctly
8. **Search by message** → filters correctly
9. **Filter by type** → correct subset
10. **Filter by read/unread** → correct subset
11. **Pagination** with > 8 notifications
12. **Mobile test:** Resize < 1024px → action buttons visible (no hover dependency)

---

## Session 14: Responsive & Navigation

### Sidebar
1. Click each of the 9 nav items → correct page loads each time
2. **Verify** active item is highlighted
3. Resize to < 768px → sidebar collapses, hamburger menu appears
4. Click hamburger → sidebar overlay opens
5. Click backdrop → sidebar closes

### Direct URL Access
1. Copy-paste `/admin/users` into URL bar while logged in → page loads
2. Copy-paste same URL while logged out → redirect to `/login`
3. Log in as a non-admin user (Employee), paste `/admin/users` → redirect to `/unauthorized`

### Responsive Check
1. Set viewport to 320px width → all pages render without horizontal scroll or clipped elements
