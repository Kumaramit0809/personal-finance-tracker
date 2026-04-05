const db = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

// GET /api/users/profile
const getProfile = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, username, email, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (rows.length === 0) {
      return sendError(res, 'User not found', 404);
    }

    return sendSuccess(res, { user: rows[0] }, 'Profile fetched successfully');
  } catch (err) {
    console.error('Get profile error:', err.message);
    return sendError(res, 'Server error fetching profile');
  }
};

module.exports = { getProfile };
