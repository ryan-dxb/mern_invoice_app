import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import validator from "validator";
import { USER } from "../constants";

const { schema } = mongoose;

const userSchema = new schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      validator: [validator.isAlphanumeric, "Please provide a valid username"],
    },
    firstName: {
      type: String,
      trim: true,
      validator: [validator.isAlpha, "Please provide a valid first name"],
    },
    lastName: {
      type: String,
      trim: true,
      validator: [validator.isAlpha, "Please provide a valid last name"],
    },
    password: {
      type: String,
      select: false,
      validator: [
        validator.isStrongPassword,
        "Please provide a valid password",
      ],
    },
    passwordConfirm: {
      type: String,
      select: false,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      enum: ["email", "google", "facebook"],
      default: "email",
    },
    googleId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    avatar: {
      type: String,
    },
    businessName: {
      type: String,
      trim: true,
    },

    phoneNumber: {
      type: String,
      trim: true,
      validator: [
        validator.isMobilePhone,
        "Please provide a valid phone number",
      ],
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    // state: {
    //     type: String,
    //     trim: true,
    // },
    // zipCode: {
    //     type: String,
    //     trim: true,
    // },
    country: {
      type: String,
      trim: true,
    },
    passwordChangedAt: Date,

    roles: {
      type: [String],
      default: [USER],
    },
    active: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.roles.length === 0) {
    this.roles.push(USER);
    next();
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
