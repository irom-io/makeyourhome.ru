const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport('smtps://makeyourhome.ru%40gmail.com:myhAdmin@smtp.gmail.com');

module.exports = (mailInfo) => {
    var mailOptions = {
        from: '"Makeyourhome.ru" <makeyourhome.ru@gmail.com>',
        to: mailInfo.to, // list of receivers
        subject: mailInfo.subject,
        html: mailInfo.body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
};