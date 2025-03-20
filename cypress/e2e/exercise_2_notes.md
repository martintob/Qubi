NOTES/BUGS/IDEAS:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. Security Issues:

Lack of Rate Limiting
There is no rate-limiting mechanism for authentication and other sensitive endpoints like /api/auth/login and /api/auth/register. This exposes the system to brute-force attacks, where attackers could guess user credentials or flood the system with requests.

Weak Password Management
Passwords are transmitted as plain text in the request bodies (e.g., "password": "string"). This creates a security risk as passwords should be securely hashed and salted before storage. Additionally, HTTPS should be enforced to ensure secure transmission of sensitive data.

Unauthorized Access Control
Role-based access control (RBAC) is not clearly defined for API endpoints. For example, the /api/auth/register endpoint should be restricted to admins only, but it is unclear whether this is enforced, potentially allowing unauthorized users to create accounts.

Lack of Input Validation
API requests, such as loginRequest and signUpRequest, do not appear to enforce proper input validation. This can lead to injection attacks or invalid data. Validation should ensure that email formats are correct and that passwords meet complexity requirements.

Lack of System Logs:
There are no logs being generated for system actions, which poses a significant security risk. Without logs, it becomes difficult to trace actions, monitor malicious activities, or identify issues within the system. Implementing logging for user actions, especially for sensitive operations, is essential for maintaining system security and accountability.

Unauthorized Data Deletion:
Any user, even those without admin privileges, has the ability to delete data. This is a critical security flaw, as unauthorized users should not be able to perform such actions. Additionally, there is no historical record or audit trail for deleted data, making it impossible to recover or track changes. A proper role-based access control (RBAC) system should be implemented to restrict deletion capabilities, and a record of all data deletions should be maintained for auditing purposes.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
2. Login Issues:

URL Structure:
The login page uses a fragment identifier in its URL (https://club-administration.qa.qubika.com/#/auth/login), which suggests the use of a Single Page Application (SPA) framework. This affects automation since there is no full page reload. It's recommended to use explicit waits to ensure elements load correctly during testing.

Error Messages Not Displayed:
When attempting to log in without providing a username or password, no error messages are displayed. Additionally, the "Autenticar" button remains visible even when the fields are incomplete.

UI Issues with Checkbox:
The "Recordarme" checkbox is displayed incorrectly as a black square instead of a tick mark.

Inconsistent Message:
The message "Por favor ingrese correo y contraseña" is inconsistent with the placeholder that indicates a username is valid.

Missing Register Option:
The login page does not have a "REGISTER" link, which can confuse users trying to create a new account.


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
3. Dashboard Issues:

Unclear UI Element:
There is a grey line at the bottom of the dashboard that serves no clear purpose, leading to confusion.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
4. Contribuciones (Contributions) Issues:

Page Navigation and Layout:
When switching pages within the "Contribuciones" section, the columns become misaligned. Also, the pagination system defaults to 16 pages, which seems arbitrary. A more standardized pagination, such as 10 pages per set, should be considered.

Missing Functionality for Adding Users:
The "Buscar y adicionar socios" feature does not work correctly. There's no way to add users, possibly due to missing permissions, but if that's the case, the add button should be removed.

Date Field Standardization:
The "Fecha de la Contribucion" should follow the standard behavior of clicking on the field to open a date modal for selection.

No Validation for Future Dates:
There's no validation preventing users from selecting future dates, which could lead to data integrity issues.

Input Field for "Monto a Pagar":
The "Monto a pagar" field allows input of non-numeric values, which should be restricted to only numeric inputs.

Incorrect Text on Delete Confirmation:
The delete confirmation text "Esta usted seguro que desea eliminar la contribución sugerida?" contains a typo ("sugerida" should be "sugerida").

UI Issues with Buttons:
The "NO" and "SI" buttons on the confirmation modal are not visually distinct, which can lead to confusion.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
5. Categorías (Categories) Issues:

Typographical Error:
"Tipos de Categorias" should have an accent on the "i" to be correctly written as "Tipos de Categorías."

Pagination Issue:
The pagination starts at 243 and goes up to 282, and the page arrows are not functioning properly. Additionally, the page numbers do not fit within the screen.

No Search Functionality:
There's no option to search for categories or subcategories, which can be problematic for users when navigating large lists.

Column Labeling:
The columns should be more clearly labeled to differentiate between "CATEGORIA" and "SUBCATEGORIA."

UI Breakage with Category Name Input:
There's no restriction on what can be entered in the category name field, which can lead to UI breakage when long or special characters are input.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

---(I could go on, but I believe the UI/UX and security issues are clear.)---