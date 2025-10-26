<?php
// API endpoints for Hospital Management System
require_once 'config.php';

// Get request method and endpoint
$method = $_SERVER['REQUEST_METHOD'];
$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);
$path = str_replace('/api.php', '', $path);

// Simple routing
switch ($method) {
    case 'GET':
        handleGet($path);
        break;
    case 'POST':
        handlePost($path);
        break;
    case 'PUT':
        handlePut($path);
        break;
    case 'DELETE':
        handleDelete($path);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

function handleGet($path) {
    global $pdo;
    
    switch ($path) {
        case '/patients':
            $stmt = $pdo->query("SELECT * FROM patients ORDER BY patient_id DESC");
            echo json_encode($stmt->fetchAll());
            break;
            
        case '/doctors':
            $stmt = $pdo->query("SELECT * FROM doctors ORDER BY doctor_id DESC");
            echo json_encode($stmt->fetchAll());
            break;
            
        case '/appointments':
            $stmt = $pdo->query("
                SELECT a.*, p.first_name as patient_first_name, p.last_name as patient_last_name,
                       d.first_name as doctor_first_name, d.last_name as doctor_last_name
                FROM appointments a
                LEFT JOIN patients p ON a.patient_id = p.patient_id
                LEFT JOIN doctors d ON a.doctor_id = d.doctor_id
                ORDER BY a.appointment_date DESC, a.appointment_time DESC
            ");
            echo json_encode($stmt->fetchAll());
            break;
            
        case '/billing':
            $stmt = $pdo->query("
                SELECT b.*, p.first_name as patient_first_name, p.last_name as patient_last_name
                FROM billing b
                LEFT JOIN patients p ON b.patient_id = p.patient_id
                ORDER BY b.bill_date DESC
            ");
            echo json_encode($stmt->fetchAll());
            break;
            
        case '/dashboard':
            $stats = [];
            
            // Total patients
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM patients");
            $stats['totalPatients'] = $stmt->fetch()['count'];
            
            // Active appointments
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM appointments WHERE status = 'Scheduled'");
            $stats['activeAppointments'] = $stmt->fetch()['count'];
            
            // Available rooms
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM rooms WHERE status = 'Available'");
            $stats['availableRooms'] = $stmt->fetch()['count'];
            
            // Pending bills
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM billing WHERE payment_status = 'Pending'");
            $stats['pendingBills'] = $stmt->fetch()['count'];
            
            echo json_encode($stats);
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
    }
}

function handlePost($path) {
    global $pdo;
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    switch ($path) {
        case '/patients':
            $stmt = $pdo->prepare("
                INSERT INTO patients (first_name, last_name, date_of_birth, gender, phone, email, address, emergency_contact)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $data['firstName'],
                $data['lastName'],
                $data['dateOfBirth'],
                $data['gender'],
                $data['phone'],
                $data['email'],
                $data['address'],
                $data['emergencyContact']
            ]);
            echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
            break;
            
        case '/doctors':
            $stmt = $pdo->prepare("
                INSERT INTO doctors (first_name, last_name, specialization, phone, email, consultation_fee)
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $data['firstName'],
                $data['lastName'],
                $data['specialization'],
                $data['phone'],
                $data['email'],
                $data['consultationFee']
            ]);
            echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
            break;
            
        case '/appointments':
            $stmt = $pdo->prepare("
                INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, notes)
                VALUES (?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $data['patientId'],
                $data['doctorId'],
                $data['date'],
                $data['time'],
                $data['notes']
            ]);
            echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
            break;
            
        case '/billing':
            $pdo->beginTransaction();
            try {
                // Insert billing record
                $stmt = $pdo->prepare("
                    INSERT INTO billing (patient_id, bill_date, total_amount, payment_status)
                    VALUES (?, ?, ?, 'Pending')
                ");
                $stmt->execute([$data['patientId'], $data['date'], $data['totalAmount']]);
                $billId = $pdo->lastInsertId();
                
                // Insert bill items
                if (isset($data['items']) && is_array($data['items'])) {
                    $stmt = $pdo->prepare("
                        INSERT INTO bill_items (bill_id, item_type, item_name, quantity, unit_price, total_price)
                        VALUES (?, ?, ?, ?, ?, ?)
                    ");
                    foreach ($data['items'] as $item) {
                        $stmt->execute([
                            $billId,
                            $item['itemType'],
                            $item['itemName'],
                            $item['quantity'],
                            $item['unitPrice'],
                            $item['totalPrice']
                        ]);
                    }
                }
                
                $pdo->commit();
                echo json_encode(['success' => true, 'id' => $billId]);
            } catch (Exception $e) {
                $pdo->rollback();
                http_response_code(500);
                echo json_encode(['error' => 'Failed to create bill']);
            }
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
    }
}

function handlePut($path) {
    global $pdo;
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    switch ($path) {
        case '/appointments':
            $stmt = $pdo->prepare("UPDATE appointments SET status = ? WHERE appointment_id = ?");
            $stmt->execute([$data['status'], $data['id']]);
            echo json_encode(['success' => true]);
            break;
            
        case '/billing':
            $stmt = $pdo->prepare("UPDATE billing SET payment_status = ?, payment_date = ? WHERE bill_id = ?");
            $paymentDate = $data['status'] === 'Paid' ? date('Y-m-d') : null;
            $stmt->execute([$data['status'], $paymentDate, $data['id']]);
            echo json_encode(['success' => true]);
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
    }
}

function handleDelete($path) {
    global $pdo;
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    switch ($path) {
        case '/patients':
            $stmt = $pdo->prepare("DELETE FROM patients WHERE patient_id = ?");
            $stmt->execute([$data['id']]);
            echo json_encode(['success' => true]);
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
    }
}
?>
