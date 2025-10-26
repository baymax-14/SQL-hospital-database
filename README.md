# Hospital Database Management System

A simple and efficient web-based hospital management system built with HTML, CSS, JavaScript, and SQL. This system provides a user-friendly interface for managing patients, doctors, appointments, billing, and hospital operations.

## Features

### 🏥 Core Functionality
- **Patient Management**: Add, view, edit, and delete patient records
- **Doctor Management**: Manage doctor profiles and specializations
- **Appointment Scheduling**: Book and manage patient appointments
- **Billing System**: Create bills, track payments, and manage financial records
- **Dashboard**: Real-time overview of hospital operations

### 📊 Key Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Data Validation**: Form validation and error handling
- **Real-time Updates**: Dashboard updates automatically
- **User-friendly Interface**: Clean and intuitive design
- **Sample Data**: Pre-loaded with sample data for testing

## File Structure

```
Hospital Database Management System/
├── index.html              # Main HTML interface
├── styles.css              # CSS styling
├── script.js               # JavaScript functionality
├── database_schema.sql     # Database schema and sample data
├── config.php              # Database configuration
├── api.php                 # Backend API endpoints
└── README.md               # This file
```

## Quick Start

### Option 1: Frontend Only (No Database)
1. Open `index.html` in your web browser
2. The system will work with sample data stored in JavaScript
3. All features are functional for demonstration purposes

### Option 2: With Database (Full Functionality)
1. Set up a MySQL database
2. Import `database_schema.sql` to create tables and sample data
3. Update `config.php` with your database credentials
4. Use a local server (XAMPP, WAMP, or similar) to run the PHP backend

## Database Setup

### MySQL Database Setup
1. Create a new database:
   ```sql
   CREATE DATABASE hospital_db;
   ```

2. Import the schema:
   ```bash
   mysql -u username -p hospital_db < database_schema.sql
   ```

3. Update database credentials in `config.php`

## Usage Guide

### Dashboard
- View real-time statistics
- Monitor hospital operations
- Quick overview of system status

### Patient Management
1. Navigate to "Patients" tab
2. Fill out the patient registration form
3. View all patients in the table below
4. Edit or delete patient records as needed

### Doctor Management
1. Go to "Doctors" tab
2. Add new doctors with their specialization
3. View doctor profiles and consultation fees

### Appointment Scheduling
1. Select "Appointments" tab
2. Choose patient and doctor from dropdowns
3. Set date and time
4. Add notes if needed
5. Schedule the appointment

### Billing System
1. Navigate to "Billing" tab
2. Select a patient
3. Add bill items (consultation, treatment, room, medicine)
4. Set quantities and prices
5. Create the bill
6. Track payment status

## Technical Details

### Database Schema
- **Patients**: Personal information and contact details
- **Doctors**: Professional information and specializations
- **Appointments**: Scheduling and status tracking
- **Treatments**: Available medical procedures
- **Billing**: Financial records and payment tracking
- **Rooms**: Hospital room management

### Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: PHP (optional)
- **Database**: MySQL
- **Styling**: Custom CSS with responsive design

## Customization

### Adding New Features
1. Update the database schema in `database_schema.sql`
2. Modify the HTML forms in `index.html`
3. Add JavaScript functions in `script.js`
4. Update CSS styles in `styles.css`

### Styling
- Modify `styles.css` to change colors, fonts, and layout
- The design uses CSS Grid and Flexbox for responsive layouts
- Color scheme can be easily customized

## Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Security Notes
- This is a demonstration system
- For production use, implement proper security measures
- Add input validation and sanitization
- Use HTTPS and secure authentication

## Troubleshooting

### Common Issues
1. **Database Connection**: Check database credentials in `config.php`
2. **JavaScript Errors**: Ensure all files are in the same directory
3. **Styling Issues**: Check if `styles.css` is properly linked
4. **Form Submission**: Verify JavaScript is enabled in browser

### Support
For issues or questions:
1. Check the browser console for JavaScript errors
2. Verify all files are present and properly linked
3. Ensure database connection is working (if using backend)

## Future Enhancements
- User authentication and role-based access
- Advanced reporting and analytics
- Email notifications
- Mobile app integration
- Advanced search and filtering
- Data export functionality

## License
This project is open source and available for educational and demonstration purposes.
