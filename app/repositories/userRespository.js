const User = require('../../database/models/User');

const addUser = async (user) =>
{
    const newUser = await User.create(user);
    return newUser;
}

const findUserByEmail = async (email) =>
{
    const user = await User.findOne({ where: { email } });
    return user;
}
const getUsers = async () =>
{
    const users = await User.findAll();
    return users;
}

const updateUser = async (user) =>
{
    const updatedUser = await User.update(user, { where: { id: user.id } });
    return updatedUser;
}
const findUserById = async (id) =>
{
    const user = await User.findOne({ where: { id } });
    return user;
}


module.exports = {
    addUser,
    findUserByEmail,
    getUsers,
    updateUser,
    findUserById,
}
