<?php
/**
 * Core Backend API - Naki Meishun (Production Ready)
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

function createSlug($string) {
    return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $string)));
}

try {
    $action = $_GET['action'] ?? '';
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
            if (!$username || !$email || strlen($password) < 6) throw new Exception('נתונים חסרים', 400);
            $check = $db->prepare("SELECT id FROM users WHERE email = ? OR username = ?");
            $check->execute([$email, $username]);
            if ($check->fetch()) throw new Exception('המשתמש כבר קיים', 400);
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $db->prepare("INSERT INTO users (username, email, password_hash, role_id) VALUES (?, ?, ?, 2)");
            $stmt->execute([$username, $email, $hash]);
            echo json_encode(['success' => true, 'id' => (int)$db->lastInsertId()]);
            break;

        case 'login':
            $email = trim($input['email'] ?? '');
            $password = $input['password'] ?? '';
            $stmt = $db->prepare("SELECT id, username, password_hash, role_id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch();
            if ($user && password_verify($password, $user['password_hash'])) {
                echo json_encode(['id' => (int)$user['id'], 'username' => $user['username'], 'role' => (int)$user['role_id'] === 1 ? 'admin' : 'user']);
            } else throw new Exception('פרטים שגויים', 401);
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

        case 'create_article':
            $title = trim($input['title'] ?? '');
            $summary = trim($input['summary'] ?? '');
            $content = trim($input['content'] ?? '');
            $imageUrl = trim($input['image_url'] ?? '');
            $sourceUrl = trim($input['source_url'] ?? '');
            $slug = createSlug($title) . '-' . time();
            $stmt = $db->prepare("INSERT INTO articles (title, slug, summary, content, image_url, source_url, status) VALUES (?, ?, ?, ?, ?, ?, 'published')");
            $stmt->execute([$title, $slug, $summary, $content, $imageUrl, $sourceUrl]);
            echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
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
            $stmt = $db->prepare("SELECT id, title, content, status, created_at as date FROM forum_posts WHERE user_id = ? AND deleted_at IS NULL ORDER BY created_at DESC");
            $stmt->execute([$userId]);
            echo json_encode($stmt->fetchAll());
            break;

        case 'create_post':
            $userId = (int)($input['user_id'] ?? 0);
            $title = trim($input['title'] ?? '');
            $content = trim($input['content'] ?? '');
            $stmt = $db->prepare("INSERT INTO forum_posts (user_id, title, content, status) VALUES (?, ?, ?, 'pending')");
            $stmt->execute([$userId, $title, $content]);
            echo json_encode(['success' => true, 'id' => (int)$db->lastInsertId()]);
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

        case 'send_contact':
            $name = trim($input['name'] ?? '');
            $email = trim($input['email'] ?? '');
            $subject = trim($input['subject'] ?? '');
            $message = trim($input['message'] ?? '');

            if (!$name || !$email || !$message) {
                throw new Exception('נא למלא את כל שדות החובה', 400);
            }

            // הכנת המייל
            $to = "admin@naki-meishun.org.il";
            $email_subject = "פנייה חדשה מהאתר: $subject";
            $email_body = "קיבלת פנייה חדשה בטופס צור קשר:\n\n";
            $email_body .= "שם: $name\n";
            $email_body .= "אימייל: $email\n";
            $email_body .= "נושא: $subject\n\n";
            $email_body .= "הודעה:\n$message\n";
            
            $headers = "From: webmaster@naki-meishun.org.il\r\n";
            $headers .= "Reply-To: $email\r\n";
            $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

            // שליחת המייל (בשרתי Hostinger פונקציית mail בדרך כלל פעילה כברירת מחדל)
            // הערה: בסביבת פיתוח מקומית זה עלול להיכשל ללא שרת SMTP מוגדר
            $mail_sent = mail($to, $email_subject, $email_body, $headers);

            if ($mail_sent) {
                echo json_encode(['success' => true, 'message' => 'ההודעה נשלחה בהצלחה']);
            } else {
                // אם המייל נכשל, ננסה לפחות לשמור בבסיס הנתונים כגיבוי (אופציונלי)
                throw new Exception('שגיאה בשליחת המייל במערכת', 500);
            }
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Action not found']);
            break;
    }
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>