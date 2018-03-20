const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const { tokenSecret } = require('../../../secrets');

const initORMHelpers = (UserModel) => {
  UserModel.methods.toJSON = function () {
    const userObject = this.toObject();
    return _.omit(userObject, ['password', 'tokens']);
  };

  UserModel.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({ _id: user._id.toHexString(), access }, tokenSecret).toString();

    user.tokens.push({ access, token });

    return user.save()
      .then(() => token);
  };

  UserModel.methods.removeToken = function (token) {
    const user = this;

    return user.update({
      $pull: {
        tokens: { token },
      },
    });
  };

  UserModel.statics.findByToken = function (token) {
    const User = this;

    let decoded;
    try {
      decoded = jwt.verify(token, tokenSecret);
    } catch (e) {
      return Promise.reject(e);
    }

    return User.findOne({
      _id: decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth',
    });
  };

  UserModel.statics.findByCredentials = function (userCredentials) {
    const { password, emailAddress } = userCredentials;
    const User = this;

    return User.findOne({ emailAddress })
      .then((user) => {
        if (!user) return Promise.reject();

        return new Promise((resolve, reject) => {
          bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              resolve(user);
            } else {
              reject();
            }
          });
        });
      });
  };

  UserModel.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hashedPass) => {
          user.password = hashedPass;
          next();
        });
      });
    } else { next(); }
  });
};

module.exports = { initORMHelpers };
