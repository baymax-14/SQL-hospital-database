// Hospital Database Management System - JavaScript

// Sample data storage (in a real application, this would connect to a database)
let patients = [
    { id: 1, firstName: 'John', lastName: 'Smith', dateOfBirth: '1985-03-15', gender: 'Male', phone: '555-0101', email: 'john.smith@email.com', address: '123 Main St, City', emergencyContact: '555-0100' },
    { id: 2, firstName: 'Sarah', lastName: 'Johnson', dateOfBirth: '1990-07-22', gender: 'Female', phone: '555-0102', email: 'sarah.j@email.com', address: '456 Oak Ave, City', emergencyContact: '555-0103' },
    { id: 3, firstName: 'Michael', lastName: 'Brown', dateOfBirth: '1978-11-08', gender: 'Male', phone: '555-0103', email: 'mike.brown@email.com', address: '789 Pine St, City', emergencyContact: '555-0104' }
];

let doctors = [
    { id: 1, firstName: 'Dr. Emily', lastName: 'Davis', specialization: 'Cardiology', phone: '555-0201', email: 'emily.davis@hospital.com', consultationFee: 150.00 },
    { id: 2, firstName: 'Dr. Robert', lastName: 'Wilson', specialization: 'Neurology', phone: '555-0202', email: 'robert.wilson@hospital.com', consultationFee: 200.00 },
    { id: 3, firstName: 'Dr. Lisa', lastName: 'Anderson', specialization: 'Pediatrics', phone: '555-0203', email: 'lisa.anderson@hospital.com', consultationFee: 120.00 }
];

let appointments = [
    { id: 1, patientId: 1, doctorId: 1, date: '2024-01-15', time: '10:00:00', status: 'Scheduled', notes: 'Regular checkup' },
    { id: 2, patientId: 2, doctorId: 2, date: '2024-01-15', time: '14:00:00', status: 'Scheduled', notes: 'Neurological examination' },
    { id: 3, patientId: 3, doctorId: 3, date: '2024-01-16', time: '09:30:00', status: 'Completed', notes: 'Child health checkup' }
];

let billing = [
    { id: 1, patientId: 1, date: '2024-01-15', totalAmount: 150.00, paymentStatus: 'Paid', paymentDate: '2024-01-15' },
    { id: 2, patientId: 2, date: '2024-01-15', totalAmount: 200.00, paymentStatus: 'Pending', paymentDate: null },
    { id: 3, patientId: 3, date: '2024-01-16', totalAmount: 120.00, paymentStatus: 'Paid', paymentDate: '2024-01-16' }
];

let rooms = [
    { id: 1, roomNumber: '101', type: 'General', capacity: 2, dailyRate: 100.00, status: 'Available' },
    { id: 2, roomNumber: '102', type: 'Private', capacity: 1, dailyRate: 200.00, status: 'Occupied' },
    { id: 3, roomNumber: '201', type: 'ICU', capacity: 1, dailyRate: 500.00, status: 'Available' },
    { id: 4, roomNumber: '301', type: 'Emergency', capacity: 1, dailyRate: 300.00, status: 'Available' }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateDashboard();
    loadPatientsTable();
    loadDoctorsTable();
    loadAppointmentsTable();
    loadBillingTable();
    populateSelectOptions();
    
    // Add form event listeners
    document.getElementById('patientForm').addEventListener('submit', handlePatientSubmit);
    document.getElementById('doctorForm').addEventListener('submit', handleDoctorSubmit);
    document.getElementById('appointmentForm').addEventListener('submit', handleAppointmentSubmit);
    document.getElementById('billingForm').addEventListener('submit', handleBillingSubmit);
});

// Navigation functionality
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Update dashboard when switching to it
    if (sectionId === 'dashboard') {
        updateDashboard();
    }
}

// Dashboard functions
function updateDashboard() {
    document.getElementById('totalPatients').textContent = patients.length;
    document.getElementById('activeAppointments').textContent = appointments.filter(apt => apt.status === 'Scheduled').length;
    document.getElementById('availableRooms').textContent = rooms.filter(room => room.status === 'Available').length;
    document.getElementById('pendingBills').textContent = billing.filter(bill => bill.paymentStatus === 'Pending').length;
}

// Patient management
function handlePatientSubmit(e) {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        gender: document.getElementById('gender').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        emergencyContact: document.getElementById('emergencyContact').value
    };
    
    // Add new patient
    const newPatient = {
        id: patients.length + 1,
        ...formData
    };
    
    patients.push(newPatient);
    loadPatientsTable();
    updateDashboard();
    showMessage('Patient added successfully!', 'success');
    
    // Clear form
    document.getElementById('patientForm').reset();
}

function loadPatientsTable() {
    const tbody = document.getElementById('patientsTableBody');
    tbody.innerHTML = '';
    
    patients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.id}</td>
            <td>${patient.firstName} ${patient.lastName}</td>
            <td>${patient.phone}</td>
            <td>${patient.email || 'N/A'}</td>
            <td>
                <button onclick="editPatient(${patient.id})" style="background: #28a745; margin-right: 5px;">Edit</button>
                <button onclick="deletePatient(${patient.id})" style="background: #dc3545;">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Doctor management
function handleDoctorSubmit(e) {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById('docFirstName').value,
        lastName: document.getElementById('docLastName').value,
        specialization: document.getElementById('specialization').value,
        phone: document.getElementById('docPhone').value,
        email: document.getElementById('docEmail').value,
        consultationFee: parseFloat(document.getElementById('consultationFee').value)
    };
    
    const newDoctor = {
        id: doctors.length + 1,
        ...formData
    };
    
    doctors.push(newDoctor);
    loadDoctorsTable();
    populateSelectOptions();
    showMessage('Doctor added successfully!', 'success');
    
    document.getElementById('doctorForm').reset();
}

function loadDoctorsTable() {
    const tbody = document.getElementById('doctorsTableBody');
    tbody.innerHTML = '';
    
    doctors.forEach(doctor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doctor.id}</td>
            <td>${doctor.firstName} ${doctor.lastName}</td>
            <td>${doctor.specialization}</td>
            <td>${doctor.phone}</td>
            <td>$${doctor.consultationFee.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

// Appointment management
function handleAppointmentSubmit(e) {
    e.preventDefault();
    
    const formData = {
        patientId: parseInt(document.getElementById('appointmentPatient').value),
        doctorId: parseInt(document.getElementById('appointmentDoctor').value),
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        notes: document.getElementById('appointmentNotes').value
    };
    
    const newAppointment = {
        id: appointments.length + 1,
        ...formData,
        status: 'Scheduled'
    };
    
    appointments.push(newAppointment);
    loadAppointmentsTable();
    updateDashboard();
    showMessage('Appointment scheduled successfully!', 'success');
    
    document.getElementById('appointmentForm').reset();
}

function loadAppointmentsTable() {
    const tbody = document.getElementById('appointmentsTableBody');
    tbody.innerHTML = '';
    
    appointments.forEach(appointment => {
        const patient = patients.find(p => p.id === appointment.patientId);
        const doctor = doctors.find(d => d.id === appointment.doctorId);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.id}</td>
            <td>${patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown'}</td>
            <td>${doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Unknown'}</td>
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td><span class="status-${appointment.status.toLowerCase()}">${appointment.status}</span></td>
            <td>
                <button onclick="updateAppointmentStatus(${appointment.id}, 'Completed')" style="background: #28a745; margin-right: 5px;">Complete</button>
                <button onclick="updateAppointmentStatus(${appointment.id}, 'Cancelled')" style="background: #dc3545;">Cancel</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Billing management
function handleBillingSubmit(e) {
    e.preventDefault();
    
    const patientId = parseInt(document.getElementById('billPatient').value);
    const billDate = document.getElementById('billDate').value;
    
    // Calculate total from bill items
    const billItems = document.querySelectorAll('.bill-item');
    let totalAmount = 0;
    const items = [];
    
    billItems.forEach(item => {
        const itemType = item.querySelector('.item-type').value;
        const itemName = item.querySelector('.item-name').value;
        const quantity = parseInt(item.querySelector('.item-quantity').value) || 1;
        const unitPrice = parseFloat(item.querySelector('.item-price').value) || 0;
        const totalPrice = quantity * unitPrice;
        
        if (itemName && unitPrice > 0) {
            totalAmount += totalPrice;
            items.push({ itemType, itemName, quantity, unitPrice, totalPrice });
        }
    });
    
    if (totalAmount === 0) {
        showMessage('Please add at least one bill item with a valid price.', 'error');
        return;
    }
    
    const newBill = {
        id: billing.length + 1,
        patientId,
        date: billDate,
        totalAmount,
        paymentStatus: 'Pending',
        paymentDate: null,
        items
    };
    
    billing.push(newBill);
    loadBillingTable();
    updateDashboard();
    showMessage('Bill created successfully!', 'success');
    
    document.getElementById('billingForm').reset();
    // Reset bill items
    const billingItems = document.querySelector('.billing-items');
    billingItems.innerHTML = `
        <h4>Bill Items</h4>
        <div class="bill-item">
            <select class="item-type">
                <option value="Consultation">Consultation</option>
                <option value="Treatment">Treatment</option>
                <option value="Room">Room</option>
                <option value="Medicine">Medicine</option>
            </select>
            <input type="text" class="item-name" placeholder="Item Name">
            <input type="number" class="item-quantity" placeholder="Qty" value="1">
            <input type="number" class="item-price" placeholder="Price" step="0.01">
            <button type="button" onclick="removeBillItem(this)">Remove</button>
        </div>
    `;
}

function loadBillingTable() {
    const tbody = document.getElementById('billingTableBody');
    tbody.innerHTML = '';
    
    billing.forEach(bill => {
        const patient = patients.find(p => p.id === bill.patientId);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${bill.id}</td>
            <td>${patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown'}</td>
            <td>${bill.date}</td>
            <td>$${bill.totalAmount.toFixed(2)}</td>
            <td><span class="status-${bill.paymentStatus.toLowerCase()}">${bill.paymentStatus}</span></td>
            <td>
                <button onclick="updatePaymentStatus(${bill.id}, 'Paid')" style="background: #28a745; margin-right: 5px;">Mark Paid</button>
                <button onclick="viewBillDetails(${bill.id})" style="background: #17a2b8;">View Details</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Utility functions
function populateSelectOptions() {
    // Populate patient selects
    const patientSelects = document.querySelectorAll('#appointmentPatient, #billPatient');
    patientSelects.forEach(select => {
        select.innerHTML = '<option value="">Select Patient</option>';
        patients.forEach(patient => {
            const option = document.createElement('option');
            option.value = patient.id;
            option.textContent = `${patient.firstName} ${patient.lastName}`;
            select.appendChild(option);
        });
    });
    
    // Populate doctor selects
    const doctorSelect = document.getElementById('appointmentDoctor');
    doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
    doctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.id;
        option.textContent = `${doctor.firstName} ${doctor.lastName} - ${doctor.specialization}`;
        doctorSelect.appendChild(option);
    });
}

function addBillItem() {
    const billingItems = document.querySelector('.billing-items');
    const newItem = document.createElement('div');
    newItem.className = 'bill-item';
    newItem.innerHTML = `
        <select class="item-type">
            <option value="Consultation">Consultation</option>
            <option value="Treatment">Treatment</option>
            <option value="Room">Room</option>
            <option value="Medicine">Medicine</option>
        </select>
        <input type="text" class="item-name" placeholder="Item Name">
        <input type="number" class="item-quantity" placeholder="Qty" value="1">
        <input type="number" class="item-price" placeholder="Price" step="0.01">
        <button type="button" onclick="removeBillItem(this)">Remove</button>
    `;
    billingItems.appendChild(newItem);
}

function removeBillItem(button) {
    button.parentElement.remove();
}

function updateAppointmentStatus(appointmentId, status) {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
        appointment.status = status;
        loadAppointmentsTable();
        updateDashboard();
        showMessage(`Appointment ${status.toLowerCase()} successfully!`, 'success');
    }
}

function updatePaymentStatus(billId, status) {
    const bill = billing.find(b => b.id === billId);
    if (bill) {
        bill.paymentStatus = status;
        if (status === 'Paid') {
            bill.paymentDate = new Date().toISOString().split('T')[0];
        }
        loadBillingTable();
        updateDashboard();
        showMessage(`Payment status updated to ${status.toLowerCase()}!`, 'success');
    }
}

function viewBillDetails(billId) {
    const bill = billing.find(b => b.id === billId);
    if (bill) {
        let details = `Bill #${bill.id} Details:\n\n`;
        if (bill.items) {
            bill.items.forEach(item => {
                details += `${item.itemName} (${item.itemType}): $${item.unitPrice} x ${item.quantity} = $${item.totalPrice}\n`;
            });
        }
        details += `\nTotal Amount: $${bill.totalAmount}`;
        alert(details);
    }
}

function editPatient(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
        // In a real application, this would open an edit form
        showMessage(`Edit functionality for patient ${patient.firstName} ${patient.lastName} would open here.`, 'success');
    }
}

function deletePatient(patientId) {
    if (confirm('Are you sure you want to delete this patient?')) {
        patients = patients.filter(p => p.id !== patientId);
        loadPatientsTable();
        updateDashboard();
        populateSelectOptions();
        showMessage('Patient deleted successfully!', 'success');
    }
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert message at the top of the main content
    const main = document.querySelector('main');
    main.insertBefore(messageDiv, main.firstChild);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}
