-- Hospital Database Management System
-- Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS hospital_db;
USE hospital_db;

-- 1. Patients table
CREATE TABLE patients (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100),
    address TEXT,
    emergency_contact VARCHAR(15),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Doctors table
CREATE TABLE doctors (
    doctor_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100),
    consultation_fee DECIMAL(10,2) NOT NULL,
    available_days VARCHAR(20) DEFAULT 'Monday-Friday',
    available_time VARCHAR(20) DEFAULT '9:00-17:00'
);

-- 3. Rooms table
CREATE TABLE rooms (
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    room_number VARCHAR(10) NOT NULL UNIQUE,
    room_type ENUM('General', 'Private', 'ICU', 'Emergency') NOT NULL,
    capacity INT DEFAULT 1,
    daily_rate DECIMAL(10,2) NOT NULL,
    status ENUM('Available', 'Occupied', 'Maintenance') DEFAULT 'Available'
);

-- 4. Appointments table
CREATE TABLE appointments (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('Scheduled', 'Completed', 'Cancelled', 'No Show') DEFAULT 'Scheduled',
    notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

-- 5. Treatments table
CREATE TABLE treatments (
    treatment_id INT PRIMARY KEY AUTO_INCREMENT,
    treatment_name VARCHAR(100) NOT NULL,
    description TEXT,
    cost DECIMAL(10,2) NOT NULL,
    duration_minutes INT DEFAULT 30
);

-- 6. Patient treatments table (many-to-many relationship)
CREATE TABLE patient_treatments (
    patient_treatment_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    treatment_id INT NOT NULL,
    doctor_id INT NOT NULL,
    treatment_date DATE NOT NULL,
    notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (treatment_id) REFERENCES treatments(treatment_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

-- 7. Billing table
CREATE TABLE billing (
    bill_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    bill_date DATE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('Pending', 'Paid', 'Partial') DEFAULT 'Pending',
    payment_date DATE,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);

-- 8. Bill items table
CREATE TABLE bill_items (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    bill_id INT NOT NULL,
    item_type ENUM('Consultation', 'Treatment', 'Room', 'Medicine') NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    quantity INT DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (bill_id) REFERENCES billing(bill_id)
);

-- Insert sample data with Indian names and details
INSERT INTO patients (first_name, last_name, date_of_birth, gender, phone, email, address) VALUES
('Rajesh', 'Kumar', '1985-03-15', 'Male', '+91-98765-43210', 'rajesh.kumar@gmail.com', '123 MG Road, Mumbai, Maharashtra'),
('Priya', 'Sharma', '1990-07-22', 'Female', '+91-98765-43211', 'priya.sharma@gmail.com', '456 Koramangala, Bangalore, Karnataka'),
('Amit', 'Patel', '1978-11-08', 'Male', '+91-98765-43212', 'amit.patel@gmail.com', '789 Sector 17, Chandigarh, Punjab'),
('Sunita', 'Singh', '1982-05-20', 'Female', '+91-98765-43213', 'sunita.singh@gmail.com', '321 Park Street, Kolkata, West Bengal'),
('Vikram', 'Reddy', '1988-09-12', 'Male', '+91-98765-43214', 'vikram.reddy@gmail.com', '654 Banjara Hills, Hyderabad, Telangana');

INSERT INTO doctors (first_name, last_name, specialization, phone, email, consultation_fee) VALUES
('Dr. Anjali', 'Gupta', 'Cardiology', '+91-98765-52001', 'anjali.gupta@hospital.com', 800.00),
('Dr. Rajesh', 'Verma', 'Neurology', '+91-98765-52002', 'rajesh.verma@hospital.com', 1000.00),
('Dr. Priya', 'Jain', 'Pediatrics', '+91-98765-52003', 'priya.jain@hospital.com', 600.00),
('Dr. Suresh', 'Malhotra', 'Orthopedics', '+91-98765-52004', 'suresh.malhotra@hospital.com', 900.00),
('Dr. Meera', 'Agarwal', 'Gynecology', '+91-98765-52005', 'meera.agarwal@hospital.com', 700.00);

INSERT INTO rooms (room_number, room_type, capacity, daily_rate) VALUES
('101', 'General', 2, 2000.00),
('102', 'Private', 1, 4000.00),
('201', 'ICU', 1, 10000.00),
('301', 'Emergency', 1, 6000.00),
('401', 'VIP', 1, 8000.00);

INSERT INTO treatments (treatment_name, description, cost, duration_minutes) VALUES
('Blood Test', 'Complete blood count and analysis', 500.00, 15),
('X-Ray', 'Chest X-ray examination', 800.00, 30),
('MRI Scan', 'Magnetic resonance imaging', 8000.00, 60),
('CT Scan', 'Computed tomography scan', 5000.00, 45),
('ECG', 'Electrocardiogram', 300.00, 10),
('Ultrasound', 'Ultrasound examination', 1200.00, 30),
('Physical Therapy', 'Rehabilitation session', 800.00, 45);

INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time) VALUES
(1, 1, '2024-01-15', '10:00:00'),
(2, 2, '2024-01-15', '14:00:00'),
(3, 3, '2024-01-16', '09:30:00'),
(4, 4, '2024-01-16', '11:00:00'),
(5, 5, '2024-01-17', '15:30:00');
