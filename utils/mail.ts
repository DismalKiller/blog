const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: process.env.MAILER_SECURE,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
    }
});
const sendMail = async (email: string, subject: string, html: string) => {
    const mailOptions = {
        from: process.env.MAILER_USER,
        to: email,
        subject,
        html
    };
    await transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

export default sendMail;