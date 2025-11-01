const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../Model/AdminModel');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  path: '/'
};

const registerAdmin = async (req, res) => {
  const username = req.body.username?.trim();
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const normalizedUsername = username.toLowerCase();
    const existingAdmin = await Admin.findOne({ username: normalizedUsername });

    if (existingAdmin) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await Admin.create({
      username: normalizedUsername,
      password: hashedPassword
    });

    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.cookie('token', token, cookieOptions);

    return res.status(201).json({
      message: 'Admin account created successfully',
      username: admin.username
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create admin' });
  }
};

const loginAdmin = async (req, res) => {
  const username = req.body.username?.trim();
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const admin = await Admin.findOne({ username: username.toLowerCase() });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.cookie('token', token, cookieOptions);
    return res.status(200).json({ message: 'Login successful', username: admin.username });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to login' });
  }
};

const getCurrentAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    return res.status(200).json(admin);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to load admin profile' });
  }
};

const logoutAdmin = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/'
  });
  return res.status(200).json({ message: 'Logged out successfully' });
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new passwords are required' });
  }

  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    admin.password = hashed;
    await admin.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update password' });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getCurrentAdmin,
  logoutAdmin,
  changePassword
};