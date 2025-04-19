// controllers/emergencyController.js
const Doctor = require('../models/doctorModel');
const Emergency = require('../models/emegencymodel');
const User = require('../models/userModel');
const { sendEmergencyEmail } = require('../utils/email');

exports.reportEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.create(req.body);
    
    const user = await User.find();
       const doctor = await Doctor.find();
       
       user.map(async(user) => {
         if (user.role === 'admin') {
           await sendEmergencyEmail(user.email,emergency);
          }
        });
        
        doctor.map(async(doctor) => {
        
            await sendEmergencyEmail(doctor.email,emergency);
          
        })

        
        res.status(201).json(emergency);
    

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.GetreportEmergencyByUser = async (req, res) => {
  try {
    const emergency = await Emergency.find({userId:req.params.userId});
    res.status(201).json(emergency);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.GetAllreportEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.find();
    res.status(201).json(emergency);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.UpdateEmergencyStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Validate status values
    const validStatuses = ['Pending', 'In Progress', 'Resolved'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedEmergency = await Emergency.findByIdAndUpdate(
      id,
      { status },
      { new: true } // return the updated document
    );

    if (!updatedEmergency) {
      return res.status(404).json({ error: 'Emergency not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', data: updatedEmergency });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
