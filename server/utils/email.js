// utils/emailTemplates/newArticleTemplate.js
const nodemailer = require('nodemailer');

const newArticleTemplate = (article) => {
  return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; border: 1px solid #eee;">
        
        <div style="background: linear-gradient(to right, #4facfe, #00f2fe); padding: 20px; color: #fff; text-align: center;">
          <h1 style="margin: 0;">📰 New Article Alert</h1>
          <p style="margin: 5px 0 0;">A fresh article just dropped. Check it out!</p>
        </div>
  
        <div style="padding: 30px;">
          <h2 style="color: #333;">${article.title}</h2>
          <p style="color: #666; font-size: 15px; line-height: 1.6;">
            ${article.content.substring(0, 250)}...
          </p>
  
          <div style="margin: 20px 0;">
            <span style="font-weight: bold; color: #444;">👤 Author:</span> ${article.author} <br />
            <span style="font-weight: bold; color: #444;">📅 Published:</span> ${new Date(article.date).toDateString()}
          </div>
  
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/articles" style="background-color: #00c897; color: white; padding: 12px 24px; border-radius: 30px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              🔍 Read Full Article
            </a>
          </div>
        </div>
  
        <div style="background-color: #f7f9fc; padding: 20px; text-align: center; font-size: 12px; color: #999;">
          You’re receiving this email because you subscribed to updates from <strong>Your Website</strong>.<br/>
          Want to unsubscribe? <a href="https://yourwebsite.com/unsubscribe" style="color: #00aaff;">Click here</a>.
        </div>
      </div>
    `;
};



const emegencyTemplate = (emergency) => {
  const { type, location, notes, status, createdAt } = emergency;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  return `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border: 1px solid #eee;">
        
        <div style="background: #ff4d4f; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">🚨 Emergency Reported</h2>
          <p style="margin: 5px 0 0; font-size: 14px;">Immediate attention may be required</p>
        </div>
  
        <div style="padding: 20px 30px;">
          <h3 style="margin-top: 0;">Details:</h3>
          <ul style="list-style: none; padding: 0; font-size: 15px; color: #444;">
            <li><strong>Type:</strong> ${type}</li>
            <li><strong>Status:</strong> ${status}</li>
            <li><strong>Location:</strong> ${location}</li>
            <li><strong>Notes:</strong> ${notes || 'N/A'}</li>
            <li><strong>Reported On:</strong> ${new Date(createdAt).toLocaleString()}</li>
          </ul>
  
          <div style="margin: 25px 0; text-align: center;">
            <a href="${mapUrl}" target="_blank" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 30px; display: inline-block; font-weight: bold;">
              📍 View Location on Google Maps
            </a>
          </div>
        </div>
  
        <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 13px; color: #888;">
          This is an automated message. Please do not reply.
        </div>
  
      </div>
    `;
};




// emailTemplates/userBookingConfirmation.js

const userBookingConfirmation = ({ userName, doctorName, date, time }) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f0f9ff;">
      <h2 style="color: #007BFF;">Your Appointment is Confirmed ✅</h2>
      <p>Hi <strong>${userName}</strong>,</p>
      <p>Your appointment with <strong>Dr. ${doctorName}</strong> is successfully booked.</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p style="margin-top: 20px;">Please be on time. We look forward to seeing you!</p>
      <br/>
      <p>Warm regards,<br/>Team HealthCare</p>
    </div>
  `;
};


// emailTemplates/notifyDoctor.js

const notifyDoctor = ({ doctorName, userName, date, time }) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #fff8e1;">
      <h2 style="color: #ff6f00;">New Appointment Booked 🩺</h2>
      <p>Hello Dr. <strong>${doctorName}</strong>,</p>
      <p>A new appointment has been booked by <strong>${userName}</strong>.</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p style="margin-top: 20px;">Please check your portal for more details.</p>
      <br/>
      <p>Thanks,<br/>Appointment System</p>
    </div>
  `;
};











const sendNewArticleLaunchEmail = async (recipientEmail, article) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      }

    })

    const emailcontent = newArticleTemplate(article)

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: 'A New Article Just Dropped!',
      html: emailcontent
    })


    await transporter.verify()

    console.log(process.env.EMAIL, " email has been sent", recipientEmail);

  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}


const sendEmergencyEmail = async (recipientEmail, emegency) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      }

    })

    const emailcontent = emegencyTemplate(emegency)

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: '🚨 New Emergency Reported  Immediate Attention Required',
      html: emailcontent
    })


    await transporter.verify()

    console.log(process.env.EMAIL, " email has been sent", recipientEmail);

  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}


const sendAppoinmentConfirmationEmail = async (recipientEmail, data) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      }

    })
    
    const emailcontent = userBookingConfirmation(data)

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: 'Your Appointment is Confirmed!',
      html: emailcontent
    })


    await transporter.verify()

    console.log(process.env.EMAIL, " email has been sent", recipientEmail);

  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}


const sendAppoinmentIntoDoctorEmail = async (recipientEmail, data) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      }

    })
  
    const emailcontent = notifyDoctor(data)

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: '🚨 New Appointment Booked  Immediate Attention Required',
      html: emailcontent
    })


    await transporter.verify()

    console.log(process.env.EMAIL, " email has been sent", recipientEmail);

  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}


module.exports = {
  sendNewArticleLaunchEmail,
  sendEmergencyEmail,
  sendAppoinmentConfirmationEmail,
  sendAppoinmentIntoDoctorEmail
}