const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// ===== MIDDLEWARE =====
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'epic-games-clone-secret-key-2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Serve static files
app.use(express.static(path.join(__dirname)));

// ===== DATABASE =====
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'sai3606',
  database: 'epic_games_clone',
  waitForConnections: true,
  connectionLimit: 10
});

// Auto-create tables on startup
async function initDB() {
  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        display_name VARCHAR(16) NOT NULL,
        dob DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS otp_codes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        code VARCHAR(6) NOT NULL,
        expires_at DATETIME NOT NULL,
        used TINYINT(1) DEFAULT 0
      )
    `);
    console.log('Database tables ready.');
  } catch (err) {
    console.error('Database init error:', err.message);
  }
}

// ===== EMAIL TRANSPORTER =====
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sairajpatil3606t@gmail.com',
    pass: 'rwmr eaaj vyjr jero'
  }
});

// ===== EMAIL TEMPLATE =====
function otpEmailHTML(code) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin:0;padding:0;background-color:#121212;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#121212;padding:40px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#1a1a1e;border-radius:12px;overflow:hidden;">
            <!-- Logo -->
            <tr>
              <td align="center" style="padding:32px 40px 16px;">
                <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:1px;">EPIC GAMES</span>
              </td>
            </tr>
            <!-- Title -->
            <tr>
              <td style="padding:0 40px;">
                <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0 0 20px;">Email Verification</h1>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:0 40px;">
                <p style="color:#cccccc;font-size:14px;line-height:1.6;margin:0 0 8px;">Hi,</p>
                <p style="color:#cccccc;font-size:14px;line-height:1.6;margin:0 0 24px;">Your account is nearly set up. Please use the code below to verify your email address.</p>
              </td>
            </tr>
            <!-- OTP Code Box -->
            <tr>
              <td style="padding:0 40px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="background-color:#252530;border-radius:10px;padding:24px;">
                      <span style="color:#ffffff;font-size:36px;font-weight:800;letter-spacing:8px;">${code}</span>
                      <br>
                      <span style="color:#888888;font-size:12px;margin-top:8px;display:inline-block;">Code will expire in 10 minutes.</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Expired notice -->
            <tr>
              <td style="padding:16px 40px 8px;">
                <p style="color:#888888;font-size:13px;line-height:1.5;margin:0;">Code expired? Please <a href="#" style="color:#27b9ff;text-decoration:underline;">submit</a> again to get a new code.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 40px;">
                <p style="color:#888888;font-size:13px;line-height:1.5;margin:0;">If you're having issues with email verification or creating an account, please contact <a href="#" style="color:#27b9ff;text-decoration:underline;">player support</a>. If you did not make this request, you can ignore this email. No account will be created.</p>
              </td>
            </tr>
            <!-- Sign off -->
            <tr>
              <td style="padding:24px 40px 8px;">
                <p style="color:#cccccc;font-size:13px;margin:0;">Thank you,</p>
                <p style="color:#ffffff;font-size:13px;font-weight:700;margin:4px 0 0;">The Epic Games team</p>
              </td>
            </tr>
            <!-- Divider -->
            <tr>
              <td style="padding:24px 40px;">
                <hr style="border:none;border-top:1px solid #333;margin:0;">
              </td>
            </tr>
            <!-- Footer Logo -->
            <tr>
              <td align="center" style="padding:0 40px 8px;">
                <span style="color:#888;font-size:16px;font-weight:800;letter-spacing:1px;">Epic</span>
              </td>
            </tr>
            <!-- Footer text -->
            <tr>
              <td align="center" style="padding:0 40px 24px;">
                <p style="color:#666;font-size:10px;line-height:1.5;margin:0;">© 2026 Epic Games, Inc. All rights reserved. Epic, Epic Games, the Epic Games logo, Fortnite, Unreal, Unreal Engine and their respective logos are trademarks or registered trademarks of Epic Games, Inc. in the United States and elsewhere.</p>
                <p style="color:#666;font-size:10px;margin:8px 0 0;">Cary, NC 27518 | Privacy Policy | Terms of Service</p>
                <p style="color:#27b9ff;font-size:10px;margin:8px 0 0;">
                  <a href="#" style="color:#27b9ff;text-decoration:underline;margin:0 8px;">Account Settings</a>
                  <a href="#" style="color:#27b9ff;text-decoration:underline;margin:0 8px;">Email Preferences</a>
                  <a href="#" style="color:#27b9ff;text-decoration:underline;margin:0 8px;">Report Abuse</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}

// ===== DISPLAY NAME GENERATOR =====
const adjectives = [
  'Light', 'Shadow', 'Swift', 'Iron', 'Golden', 'Storm', 'Frost', 'Dark',
  'Silver', 'Brave', 'Mighty', 'Cosmic', 'Wild', 'Noble', 'Rapid', 'Lucky',
  'Epic', 'Keen', 'Bold', 'Fierce', 'Quiet', 'Bright', 'Cool', 'Sharp',
  'Mystic', 'Thunder', 'Crystal', 'Blazing', 'Pixel', 'Turbo', 'Hyper',
  'Neon', 'Stealth', 'Sonic', 'Crimson', 'Azure', 'Nova', 'Omega'
];
const nouns = [
  'Coyote', 'Falcon', 'Phoenix', 'Wolf', 'Dragon', 'Tiger', 'Hawk', 'Bear',
  'Eagle', 'Panther', 'Cobra', 'Raven', 'Shark', 'Viper', 'Lion', 'Fox',
  'Knight', 'Ninja', 'Ranger', 'Hunter', 'Rider', 'Ghost', 'Pilot', 'Scout',
  'Warrior', 'Ace', 'Blaze', 'Bolt', 'Jet', 'Fury', 'Spark', 'Striker',
  'Titan', 'Rebel', 'Legend', 'Storm', 'Maverick', 'Sage'
];

function generateDisplayName() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 99) + 1;
  const name = adj + noun + num;
  return name.substring(0, 16); // max 16 chars
}

// ===== HELPER: mask email =====
function maskEmail(email) {
  const [local, domain] = email.split('@');
  if (local.length <= 2) return local[0] + '***@' + domain;
  return local[0] + '***' + local[local.length - 1] + '@' + domain;
}

// ===== API ROUTES =====

// Check if email exists
app.post('/api/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    const [rows] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
    res.json({ exists: rows.length > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register user
app.post('/api/register', async (req, res) => {
  try {
    const { email, first_name, last_name, password, display_name, dob } = req.body;

    if (!email || !first_name || !last_name || !password || !display_name || !dob) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if email already exists
    const [existing] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    await pool.execute(
      'INSERT INTO users (email, first_name, last_name, password_hash, display_name, dob) VALUES (?, ?, ?, ?, ?, ?)',
      [email, first_name, last_name, password_hash, display_name, dob]
    );

    res.json({ success: true, message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login (verify password)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(404).json({ error: 'Account not found' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Incorrect password' });

    // Store in session
    req.session.userId = user.id;
    req.session.email = user.email;

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        display_name: user.display_name
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send OTP
app.post('/api/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });

    // Generate 6-digit code
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // Invalidate previous codes
    await pool.execute('UPDATE otp_codes SET used = 1 WHERE email = ? AND used = 0', [email]);

    // Store new code
    await pool.execute(
      'INSERT INTO otp_codes (email, code, expires_at) VALUES (?, ?, ?)',
      [email, code, expiresAt]
    );

    // Send email
    await transporter.sendMail({
      from: '"Epic Games" <sairajpatil3606t@gmail.com>',
      to: email,
      subject: 'Epic Games - Email Verification',
      html: otpEmailHTML(code)
    });

    res.json({ success: true, maskedEmail: maskEmail(email) });
  } catch (err) {
    console.error('Send OTP error:', err);
    res.status(500).json({ error: 'Failed to send verification email' });
  }
});

// Verify OTP
app.post('/api/verify-otp', async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ error: 'Email and code required' });

    const [rows] = await pool.execute(
      'SELECT * FROM otp_codes WHERE email = ? AND code = ? AND used = 0 AND expires_at > NOW() ORDER BY id DESC LIMIT 1',
      [email, code]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired code' });
    }

    // Mark as used
    await pool.execute('UPDATE otp_codes SET used = 1 WHERE id = ?', [rows[0].id]);

    // Get user info
    const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length > 0) {
      const user = users[0];
      req.session.userId = user.id;
      req.session.email = user.email;
      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          display_name: user.display_name
        }
      });
    } else {
      res.json({ success: true });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current user
app.get('/api/user', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
  try {
    const [rows] = await pool.execute('SELECT id, email, first_name, last_name, display_name FROM users WHERE id = ?', [req.session.userId]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ user: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Random display name
app.get('/api/random-name', (req, res) => {
  res.json({ name: generateDisplayName() });
});

// ===== START SERVER =====
app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  await initDB();
});
