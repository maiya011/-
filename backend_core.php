<?php
/**
 * Core Backend API - Naki Meishun (Production Ready)
 * Optimized for PHP 8.1+ & Hostinger
 */

ini_set('display_errors', 0);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

function getDB() {
    $host = 'localhost'; 
    $db   = 'u371052356_ffs'; 
    $user = 'u371052356_ffs';       
    $pass = 'Maiyan))((**1';    
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
        echo json_encode(['error' => 'Database connection failed', 'details' => $e->getMessage()]);
        exit;
    }
}

try {
    $action = $_GET['action'] ?? '';
    $db = getDB();
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);

    switch ($action) {
        case 'get_settings':
            $stmt = $db->query("SELECT setting_key, setting_value FROM site_settings");
            $rows = $stmt->fetchAll();
            $settings = [];
            foreach ($rows as $row) {
                $settings[$row['setting_key']] = $row['setting_value'];
            }
            // ברירת מחדל אם הטבלה ריקה
            if (empty($settings)) {
                $settings = [
                    'logo_url' => '',
                    'favicon_url' => 'https://cdn-icons-png.flaticon.com/512/2855/2855546.png'
                ];
            }
            echo json_encode($settings);
            break;

        case 'update_settings':
            if (!$input) throw new Exception('Invalid input');
            foreach ($input as $key => $value) {
                $stmt = $db->prepare("INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?");
                $stmt->execute([$key, $value, $value]);
            }
            echo json_encode(['success' => true]);
            break;

        case 'register':
            $username = trim($input['username'] ?? '');
            $email = trim($input['email'] ?? '');
            $password = $input['password'] ?? '';
            
            if (!$username || !$email || !$password) throw new Exception('כל השדות חובה', 400);
            
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $db->prepare("INSERT INTO users (username, email, password_hash, role_id) VALUES (?, ?, ?, 2)");
            $stmt->execute([$username, $email, $passwordHash]);
            
            echo json_encode(['success' => true, 'id' => (int)$db->lastInsertId()]);
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
            } else throw new Exception('אימייל או סיסמה שגויים', 401);
            break;

        case 'create_post':
            $userId = (int)($input['user_id'] ?? 0);
            $title = trim($input['title'] ?? '');
            $content = trim($input['content'] ?? '');
            if (!$userId || !$title || !$content) throw new Exception('נתונים חסרים ליצירת פוסט');
            $stmt = $db->prepare("INSERT INTO forum_posts (user_id, title, content, status) VALUES (?, ?, ?, 'pending')");
            $stmt->execute([$userId, $title, $content]);
            echo json_encode(['success' => true, 'id' => (int)$db->lastInsertId()]);
            break;

        case 'get_forum_posts':
            $isAdmin = ($_GET['role'] ?? '') === 'admin';
            $sql = "SELECT p.id, p.title, p.content, p.created_at as date, u.username as author, p.status 
                    FROM forum_posts p JOIN users u ON p.user_id = u.id 
                    WHERE p.deleted_at IS NULL";
            if (!$isAdmin) $sql .= " AND p.status = 'approved'";
            $sql .= " ORDER BY p.created_at DESC";
            $stmt = $db->query($sql);
            echo json_encode($stmt->fetchAll());
            break;

        case 'get_user_posts':
            $userId = (int)($_GET['user_id'] ?? 0);
            if (!$userId) throw new Exception('User ID required');
            $stmt = $db->prepare("SELECT id, title, content, status, created_at as date FROM forum_posts WHERE user_id = ? AND deleted_at IS NULL ORDER BY created_at DESC");
            $stmt->execute([$userId]);
            echo json_encode($stmt->fetchAll());
            break;

        case 'approve_post':
            $postId = (int)($input['post_id'] ?? 0);
            $stmt = $db->prepare("UPDATE forum_posts SET status = 'approved' WHERE id = ?");
            $stmt->execute([$postId]);
            echo json_encode(['success' => true]);
            break;

        case 'delete_post':
            $postId = (int)($input['post_id'] ?? 0);
            $stmt = $db->prepare("UPDATE forum_posts SET deleted_at = NOW() WHERE id = ?");
            $stmt->execute([$postId]);
            echo json_encode(['success' => true]);
            break;
            
        case 'get_articles':
            $search = $_GET['search'] ?? '';
            $query = "SELECT id, title, summary, content as fullContent, image_url as imageUrl, source_url as source, created_at as date FROM articles WHERE status = 'published'";
            if ($search) {
                $stmt = $db->prepare($query . " AND (title LIKE ? OR content LIKE ?) ORDER BY created_at DESC");
                $stmt->execute(["%$search%", "%$search%"]);
            } else {
                $stmt = $db->query($query . " ORDER BY created_at DESC");
            }
            echo json_encode($stmt->fetchAll());
            break;

        case 'send_contact':
            echo json_encode(['success' => true]);
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Action not found: ' . $action]);
            break;
    }
} catch (Exception $e) {
    http_response_code($e->getCode() >= 400 && $e->getCode() < 600 ? $e->getCode() : 500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>