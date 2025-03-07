const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require("../../database/models/User");
UserRepository = require('../repositories/userRespository');

const JWT_SECRET = process.env.JWT_SECRET;

const twilio = require('twilio');
 
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const registerUser  = async (nombre, apellido, telefono, direccion, password, email) => {
    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bycrypt.hash(password, 10);

    const user = await UserRepository.addUser({ nombre, apellido, telefono, direccion, password: hashedPassword, email });

    // try {
    //     const client = twilio(accountSid, authToken);
    //     const message = await client.messages.create({
    //         body: `¡Hola ${nombre}! Gracias por registrarte. Bienvenido a nuestro servicio.`,
    //         from: twilioPhoneNumber,
    //         to: `+52${telefono}`,  
    //     });

    //     console.log('Mensaje enviado:', message.sid);
    // } catch (error) {
    //     console.error('Error al enviar el mensaje:', error);
    //     throw new Error('Error al enviar el mensaje de bienvenida');
    // }

    return user;
};

const authenticateUser = async (email, password) =>
{
    const user = await UserRepository.findUserByEmail(email);
    if (!user)
    {
        throw new Error('User not found');
    }
    const isPasswordCorrect = await bycrypt.compare(password, user.password);
    if (!isPasswordCorrect)
    {
        throw new Error('Incorrect password');
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return token;
}

const updateUser = async (id, nombre, apellido, telefono, direccion, password, email) =>
{
    // Verificar si el usuario con el ID proporcionado existe
    const user = await UserRepository.findUserById(id);
    if (!user) {
        throw new Error('User not found');
    }

    // Verificar si el email está en uso por otro usuario
    const userWithSameEmail = await UserRepository.findUserByEmail(email);
    if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new Error('Email is already in use by another user');
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bycrypt.hash(password, 10);

    // Actualizar el usuario
    const updatedUser = await UserRepository.updateUser({
        id,
        nombre,
        apellido,
        telefono,
        direccion,
        password: hashedPassword,
        email,
    });

    return updatedUser;
};

module.exports = {
    registerUser,
    authenticateUser,
    updateUser,
}