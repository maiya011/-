
<?php
/**
 * Core Backend - Naki Meishun
 * התאמה לשרתי Hostinger Shared Hosting
 */

// הגדרת כותרות לתגובה בפורמט JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

function getDB() {
    // עליך לעדכן את הפרטים האלו מלוח הבקרה של הוסטינגר (MySQL Databases)
    $host = 'localhost'; 
    $db   = 'uXXXXXXXXX_smoke_free'; // שם בסיס הנתונים שיצרת
    $user = 'uXXXXXXXXX_user';       // שם המשתמש שיצרת
    $pass = 'your_password_here';    // הסיסמה שבחרת
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    try {
        return new PDO($dsn, $user, $pass, $options);
    } catch (\PDOException $e) {
        // בייצור כדאי לא להציג את השגיאה המלאה למשתמש
        http_response_code(500);
        echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
        exit;
    }
}

// דוגמה לקבלת נתונים (ניתן להרחיב לפי הצורך)
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action'])) {
    if ($_GET['action'] === 'ping') {
        echo json_encode(['status' => 'online', 'time' => date('Y-m-d H:i:s')]);
    }
}
?>
