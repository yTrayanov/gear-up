const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  hashedPass: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  username: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  orders: [{
    type:mongoose.Schema.Types.ObjectId ,
    ref:'Order'
  }],
  cart: [{
    type:mongoose.Schema.Types.ObjectId ,
    ref:'Product'
  }],
  salt: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  roles: [{
    type: mongoose.Schema.Types.String
  }]
});

userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
  }
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
  try {
    let users = await User.find();
    if (users.length > 0) return;
    const salt = encryption.generateSalt();
    const hashedPass = encryption.generateHashedPassword(salt, 'admin');
    return User.create({
      username: 'Admin',
      email: 'admin@admin.com',
      salt,
      hashedPass,
      roles: ['Admin']
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = User;
