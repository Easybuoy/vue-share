import mongoose from 'mongoose';
import md5 from 'md5';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  favourites: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'Post',
  },
});

// Create avatar for user
UserSchema.pre('save', function (next) {
  this.avatar = `http://gravatar.com/avatar/${md5(this.username)}?d=identicon`;
  next();
});

// Hash password
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err2, hash) => {
      if (err2) return err2;
      this.password = hash;
      next();
    });
  });
});

export default mongoose.model('User', UserSchema);
