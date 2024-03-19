const User = require('../modals/userModel')

const signupUser = async (req, res) => {
    let { username,password } = req.body;

    try {
      const newUser = await User.create(username,password);
      res.status(200).json({"msg":"Success"});
    } catch (error) {
        console.error('Error signing up user:', error);
      res.status(400).json({ error: 'An error occurred while signing up user' });
    }
};

module.exports={signupUser};