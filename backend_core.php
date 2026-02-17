<?php
/**
 * Core Backend API - Naki Meishun
 */

// מניעת פליטת שגיאות כ-HTML ששובר את ה-JSON
ini_set('display_errors', 0);
error_reporting(E_ALL);

// הגדרת Header של JSON מיד בהתחלה
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

function getDB() {
    // פרטי התחברות
    $host = 'localhost'; 
    $db   = 'u371052356_ffs'; 
    $user = 'u371052356_ffs';       
    $pass = 'xxnv Maya))((**1';    
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    try {
        return new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
        ]);
    } catch (\PDOException $e) {
        http_response_code(500);
        // אנחנו מחזירים את השגיאה המדויקת מהשרת כדי להבין מה הבעיה
        echo json_encode([
            'error' => 'Database connection failed',
            'details' => $e->getMessage(),
            'hint' => 'Check if the DB user has permissions to the database in Hostinger hPanel.'
        ]);
        exit;
    }
}

try {
    $action = $_GET['action'] ?? '';
    
    // בכל פעולה פרט ל-ping אנחנו נדרשים ל-DB
    $db = getDB();

    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);

    switch ($action) {
        case 'ping':
            echo json_encode(['status' => 'online', 'database' => 'connected']);
            break;

        case 'register':
            $username = trim($input['username'] ?? '');
            $email = trim($input['email'] ?? '');
            $password = $input['password'] ?? '';
            
            if (!$username || !$email || strlen($password) < 6) {
                throw new Exception('נתונים חסרים או סיסמה קצרה מדי', 400);
            }

            $check = $db->prepare("SELECT id FROM users WHERE email = ? OR username = ?");
            $check->execute([$email, $username]);
            if ($check->fetch()) {
                throw new Exception('המשתמש או האימייל כבר קיימים', 400);
            }

            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $db->prepare("INSERT INTO users (username, email, password_hash, role_id) VALUES (?, ?, ?, 2)");
            $stmt->execute([$username, $email, $hash]);
            echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
            break;

        case 'login':
            $email = trim($input['email'] ?? '');
            $password = $input['password'] ?? '';
            
            $stmt = $db->prepare("SELECT id, username, password_hash, role_id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch();
            
            if ($user && password_verify($password, $user['password_hash'])) {
                echo json_encode([
                    'id' => (int)$user['id'],
                    'username' => $user['username'],
                    'role' => (int)$user['role_id'] === 1 ? 'admin' : 'user'
                ]);
            } else {
                throw new Exception('אימייל או סיסמה שגויים', 401);
            }
            break;

        case 'get_articles':
            $search = $_GET['search'] ?? '';
            if ($search) {
                $stmt = $db->prepare("SELECT id, title, summary, content as fullContent, created_at as date FROM articles WHERE status = 'published' AND (title LIKE ? OR content LIKE ?) ORDER BY created_at DESC");
                $stmt->execute(["%$search%", "%$search%"]);
            } else {
                $stmt = $db->query("SELECT id, title, summary, content as fullContent, created_at as date FROM articles WHERE status = 'published' ORDER BY created_at DESC");
            }
            echo json_encode($stmt->fetchAll());
            break;

        case 'get_forum_posts':
            $stmt = $db->query("SELECT p.id, p.title, p.content, p.created_at as date, u.username as author FROM forum_posts p JOIN users u ON p.user_id = u.id WHERE p.deleted_at IS NULL ORDER BY p.created_at DESC");
            echo json_encode($stmt->fetchAll());
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Action not found']);
            break;
    }
} catch (Exception $e) {
    http_response_code($e->getCode() >= 400 && $e->getCode() < 600 ? $e->getCode() : 500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>