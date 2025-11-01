const bcrypt = require('bcryptjs');
const Admin = require('../Model/AdminModel');

const initAdmin = async () => {
  const username = process.env.ADMIN_DEFAULT_USERNAME;
  const password = process.env.ADMIN_DEFAULT_PASSWORD;

  if (!username || !password) {
    return;
  }

  const existingAdmin = await Admin.findOne({ username: username.toLowerCase() });
  if (existingAdmin) {
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await Admin.create({
    username: username.toLowerCase(),
    password: hashedPassword
  });

  console.log('Default admin user created');
};

module.exports = initAdmin;

