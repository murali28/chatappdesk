const nodemailer=require('nodemailer');

exports.sendEMailFunction = (url,) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:process.env.email,
            pass:process.env.pass
        },
    });
    const mailOptions = {
        from: process.env.email,
        to: 'murali28reddy@gmail.com',
        subject: 'Chat-app password reset link ',
        text: "Please go through the e-mail verification link provided in this mail:\n\n" + url
    };
    transporter.sendMail(mailOptions,(err,info) => {
       
        if (err){
        console.log("is it is invalid");
        
            console.log("error on sending mail", err)
        }
        else
            console.log('result of sending mail',info);
    });
    
}
