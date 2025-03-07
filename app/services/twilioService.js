const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = twilio(accountSid, authToken);

const sendSms = async (to, message) => {
    try {
        const sms = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER, 
            to: to, 
        });
        return sms;
    } catch (error) {
        throw new Error(`Error al enviar el mensaje: ${error.message}`);
    }
};

module.exports = {
    sendSms,
};
