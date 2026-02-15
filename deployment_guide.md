
# Hostinger Deployment Guide for "Naki Me'Ishun"

This project is optimized for **Hostinger Shared Hosting** using PHP 8.1+ and MySQL.

## 1. Database Setup
1. Log in to **Hostinger hPanel**.
2. Navigate to **Databases** > **MySQL Databases**.
3. Create a new database and a user. Note down the **DB Name**, **Username**, and **Password**.
4. Go to **phpMyAdmin** for this database.
5. Click **Import** and upload the `db_schema.sql` file provided in this repository.

## 2. Server Configuration
1. Open the **File Manager** in hPanel.
2. Go to the `public_html` directory.
3. Upload all project files.
4. Locate the `backend_core.php` (or your consolidated database file).
5. Update the `getDB()` function with the credentials you created in step 1.

## 3. Security Headers (Recommended)
Add this to your `.htaccess` file in `public_html`:
```apache
<IfModule mod_headers.c>
    Header set Content-Security-Policy "upgrade-insecure-requests"
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

## 4. File Permissions
- Ensure the `uploads/` folder has **755** permissions so users can upload images/PDFs but not execute scripts.
- Ensure `config/` or sensitive files have **600** permissions.

## 5. SSL / HTTPS
- In hPanel, ensure **SSL** is active (Hostinger provides free Let's Encrypt).
- Force HTTPS via `.htaccess`:
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## Production Checklist
- [ ] Change all default passwords.
- [ ] Disable `display_errors` in `php.ini` (use error logging instead).
- [ ] Set up a Cron Job for database backups.
- [ ] Verify SMTP settings in the Contact form to ensure emails are sent.
