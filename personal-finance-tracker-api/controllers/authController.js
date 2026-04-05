const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');
const { sendResetEmail } = require('../utils/email');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return sendError(res, 'Please provide username, email and password', 400);
  try {
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) return sendError(res, 'Email is already registered', 409);
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return sendSuccess(res, { token, user: { id: result.insertId, username, email } }, 'Registration successful', 201);
  } catch (err) {
    console.error('Register error:', err.message);
    return sendError(res, 'Server error during registration');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return sendError(res, 'Please provide email and password', 400);
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return sendError(res, 'Invalid email or password', 401);
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendError(res, 'Invalid email or password', 401);
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return sendSuccess(res, { token, user: { id: user.id, username: user.username, email: user.email } }, 'Login successful');
  } catch (err) {
    console.error('Login error:', err.message);
    return sendError(res, 'Server error during login');
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return sendError(res, 'Email is required', 400);
  try {
    const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length === 0)
      return sendSuccess(res, {}, 'If that email exists, a reset link has been sent');
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    await db.query(
      'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE email = ?',
      [resetToken, expires, email]
    );
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;
    await sendResetEmail(email, resetLink);
    return sendSuccess(res, {}, 'If that email exists, a reset link has been sent');
  } catch (err) {
    console.error('Forgot password error — full details:', err);
    return sendError(res, `Server error: ${err.message}`);
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return sendError(res, 'Token and new password are required', 400);
  if (password.length < 6) return sendError(res, 'Password must be at least 6 characters', 400);
  try {
    const [rows] = await db.query(
      'SELECT id FROM users WHERE reset_token = ? AND reset_token_expires > NOW()',
      [token]
    );
    if (rows.length === 0) return sendError(res, 'Reset link is invalid or has expired', 400);
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?',
      [hashedPassword, rows[0].id]
    );
    return sendSuccess(res, {}, 'Password reset successfully. You can now log in.');
  } catch (err) {
    console.error('Reset password error:', err.message);
    return sendError(res, 'Server error resetting password');
  }
};

module.exports = { register, login, forgotPassword, resetPassword };
