import express,{ Request, Response } from 'express';
const router = express.Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
import RequestInt from './email.interface';


var transporter = nodemailer.createTransport({
    host: 'secure.emailsrvr.com',
    port: 465,
    auth: {
        user: process.env.user_email,
        pass: process.env.user_password
    }
});

router.post('/', async(request: Request, response: Response) => {
    
    const mailInfo: RequestInt = request.body;
    console.log(request.body)
    var mailOptions = {
        from: process.env.user_email,
        to: mailInfo.to,
        subject: mailInfo.subject,
        text: mailInfo.text ?? `Your verification number is ${Math.floor(100000 + Math.random() * 900000)}`
    };
    
    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            console.log(error);
            response.status(500).send(error)
        } else {
            console.log('Email sent: ' + info.response);
            response.sendStatus(200);
        }
    });
})

module.exports = router;
