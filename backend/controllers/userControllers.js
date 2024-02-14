import nodemailer from 'nodemailer'
import cryptoRandomString from 'crypto-random-string'
import registrationSchema from '../model/registrationModal.js'
import dotenv from 'dotenv'
import fs from 'fs'
import { dirname,join } from 'path';
import { fileURLToPath } from 'url';

dotenv.config()

const userControllers = {
    sentOtpToEmail: async (req, res) => {
        try {

            const getedName = req?.body?.name
            const getEmail = req?.body?.email
            // console.log(email);
            const email = getEmail
            const name = getedName

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.NODEMAILER_PASS,
                },
            });

            const otp = cryptoRandomString({ length: 6, type: 'numeric' });
            req.session.otp = otp;

            const mailOptions = {
                from: 'athul5abuolikkal@gmail.com',
                to: email,
                subject: 'OTP Verification',
                text: `Dear ${name},

                Thank you for using our service! To proceed with your verification, please use the following One-Time Password (OTP):
                
                OTP: ${otp}
                
                Please enter the provided OTP within 60 seconds to complete your verification process. Please note that this OTP is valid for a limited time and should be kept confidential.
                
                If you did not request this OTP, please ignore this email. Do not share the OTP with anyone, as it is a security measure to protect your account.
                
                If you have any questions or need assistance, please feel free to contact our support team at registeryourexam@gmail.com.
                
                Thank you for choosing our service!`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('error happned on sending email', error);
                    res.json({ status: false })
                } else {
                    console.log('email is sent to:' + mailOptions.to, info.response);
                    res.json({ status: true, otp: otp })
                }
            })

        } catch (err) {
            console.log(err);
        }
    },

    verifyOtp: async (req, res) => {
        try {
            const { otp } = req.body;
            const sentOtp = req.session.otp;
            if (otp === sentOtp) {
                res.json({ status: true });
            } else {
                res.json({ status: false });
            }

        } catch (err) {
            console.log(err);
        }
    },

    registerExam: async (req, res) => {
        try {
            const { name, email, state, city, subject, time } = req?.body
            const isAlreadyHave = await registrationSchema.findOne({ email: email, dateAndTime: time })
            console.log(isAlreadyHave, ':is already have');
            if (isAlreadyHave) {
                res.json({ status: false, message: `Cant register ${time} you already have an exam` })
            } else {
                const registerexam = await registrationSchema.create({ name: name, email: email, subject: subject, dateAndTime: time, state: state, city: city })
                console.log(registerexam, ':exam registered');
                res.json({ status: true, message: 'successfully registered your test....' })
            }
        } catch (err) {
            console.log(err, ':error on registration ');
        }
    },

    confirmTestByEmail: async (req, res) => {
        try {
            const { email, name, state, city, subject, time } = req?.body
            //csv data
            const csvData = `Date and Time,State,City,Subject\n${time},${state},${city},${subject}`;

            // Create a unique filename
            const __dirname = dirname(fileURLToPath(import.meta.url));
            console.log(__dirname);
            const filename = 'test_confirmation.csv';
            const filePath = join(__dirname, filename);
           
           
            // Write CSV data to a file
            fs.writeFileSync(filePath, csvData);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.NODEMAILER_PASS,

                },
            });
            const mailOptions = {
                from: 'athul5abuolikkal@gmail.com',
                to: email,
                subject: 'Test Confirmation Mail',
                text: `Dear ${name},
                
                We are pleased to inform you that your test has been confirmed. Please find the details below:

                 Date and Time: ${time}
                 State: ${state}
                 City: ${city}
                 Subject: ${subject}
                 `,
                attachments: [{
                    filename: filename,
                    path: filePath
                }]
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('error happned on sending email', error);
                    res.json({ status: false })
                } else {
                    console.log('email is sent to:' + mailOptions.to, info.response);
                    res.json({ status: true, })
                }
            })


        } catch (err) {
            console.log(err);
        }
    }

}

export default userControllers