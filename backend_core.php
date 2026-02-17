
<?php
/**
 * Core Backend API - Naki Meishun
 * התאמה מלאה לשרתי Hostinger - ניהול משתמשים ופורום
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

function getDB() {
    // פרטי גישה למסד הנתונים ב-Hostinger (יש לעדכן לפי ה-hPanel)
    $host = 'localhost'; 
    $db   = 'uXXXXXXXXX_smoke_free'; 
    $user = 'uXXXXXXXXX_user';       
    $pass = 'your_password_here';    
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    try {
        return new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed']);
        exit;
    }
}

$action = $_GET['action'] ?? '';
$db = getDB();

// קבלת נתוני JSON מהבקשה
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

switch ($action) {
    case 'get_articles':
        $stmt = $db->query("SELECT id, title, summary, content as fullContent, created_at as date FROM articles WHERE status = 'published' ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll());
        break;

    case 'get_forum_posts':
        $stmt = $db->query("SELECT p.id, p.title, p.content, p.created_at as date, u.username as author FROM forum_posts p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC");
        echo json_encode($stmt->fetchAll());
        break;

    case 'register':
        $username = $input['username'] ?? '';
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';
        
        if (!$username || !$email || !$password) {
            http_response_code(400);
            echo json_encode(['error' => 'נא למלא את כל השדות']);
            exit;
        }

        $hash = password_hash($password, PASSWORD_DEFAULT);
        try {
            $stmt = $db->prepare("INSERT INTO users (username, email, password_hash, role_id) VALUES (?, ?, ?, 2)");
            $stmt->execute([$username, $email, $hash]);
            echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
        } catch (PDOException $e) {
            http_response_code(400);
            echo json_encode(['error' => 'שם משתמש או אימייל כבר קיימים']);
        }
        break;

    case 'login':
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';
        
        $stmt = $db->prepare("SELECT id, username, password_hash, role_id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password_hash'])) {
            echo json_encode([
                'id' => $user['id'],
                'username' => $user['username'],
                'role' => $user['role_id'] == 1 ? 'admin' : 'user'
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'פרטי התחברות שגויים']);
        }
        break;

    case 'create_post':
        $userId = $input['user_id'] ?? 0;
        $title = $input['title'] ?? '';
        $content = $input['content'] ?? '';
        
        if ($userId > 0 && $title && $content) {
            $stmt = $db->prepare("INSERT INTO forum_posts (user_id, title, content) VALUES (?, ?, ?)");
            $stmt->execute([$userId, $title, $content]);
            echo json_encode(['success' => true]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'נתונים חסרים']);
        }
        break;

    default:
        echo json_encode(['status' => 'API is active']);
        break;
}
?>
