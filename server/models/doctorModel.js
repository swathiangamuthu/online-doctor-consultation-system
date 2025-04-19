const mongoose = require("mongoose");
const validator = require("validator");

const reviewSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);


const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      required: [true, "Please tell us your Prefix!"],
    },
    fullName: {
      type: String,
      required: [true, "Please tell us your full name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: validator.isMobilePhone,
        message: "Please provide a valid phone number",
      },
      required: [true, "Please provide your phone number"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Please provide your address"],
    },
    specialization: {
      type: String,
      required: [true, "Please provide your specialization"],
    },
    experience: {
      type: String,
      required: [true, "Please provide your experience"],
    },
    feePerConsultation: {
      type: Number,
      required: [true, "Please provide your fee per consultation"],
    },
    fromTime: {
      type: String,
      required: [true, "Please provide your from time"],
    },
    toTime: {
      type: String,
      required: [true, "Please provide your to time"],
    },
    status: {
      type: String,
      default: "pending",
    },
    certificate: {
      type: String,
    },
    reviews: [reviewSchema],
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
