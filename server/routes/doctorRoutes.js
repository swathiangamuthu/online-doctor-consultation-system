// 3rd Party Imports
const express = require("express");
// Custom Imports
const authController = require("../controllers/authController");
const doctorController = require("../controllers/doctorController");
const multer = require("multer");


// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/certificates"); // Folder to store certificates
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

// DOCTOR CONTROLLER
router.get("/",doctorController.getAllDoctors);
router.get("/approved-doctors", doctorController.getAllApprovedDoctors);

router.use(authController.protect);

router.post("/signup", upload.single("certificate"),doctorController.doctorSignup);
router.get("/:id", doctorController.getDoctor);
router.put("/:id", doctorController.updateDoctor);
router.get("/appointments/:id", doctorController.doctorAppointments);
router.get("/booked-appointments/:id", doctorController.getBookAppointments);
router.post(
  "/change-appointment-status",
  doctorController.changeAppointmentStatus
);
router.post(
  "/check-booking-availability",
  doctorController.checkBookingAvailability
);

module.exports = router;
