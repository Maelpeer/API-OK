const authService = require('../services/authService');
const userRepository = require('../repositories/userRespository');
const twilioService = require('../services/twilioService');

const registerUser = async (req, res) =>
{ 
    try
    {
        const user = await authService.registerUser(req.body.nombre, req.body.apellido, req.body.telefono, req.body.direccion, req.body.password, req.body.email);
        res.status(201).json(user);
    }
    catch (error)
    {
        res.status(400).json({ message: error.message });
    }
}
const authenticateUser = async (req, res) =>
{
    try
    {
        const token = await authService.authenticateUser(req.body.email, req.body.password);
        res.status(200).json({ token });
    }
    catch (error)
    {
        res.status(400).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params; 
    const { nombre, apellido, telefono, direccion, password, email } = req.body;

    try {
        const updatedUser = await authService.updateUser(id, nombre, apellido, telefono, direccion, password, email);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const sendNotification = async (req, res) => {
    const { id } = req.params; 
    const { message } = req.body; 

    try {
        const user = await userRepository.findUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const sms = await twilioService.sendSms(user.telefono, message);
        res.status(200).json({ message: 'Mensaje enviado exitosamente', sms });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    authenticateUser,
    updateUser,
    sendNotification,
}