import UserModel from "../models/UserModel.js";

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const potentialUser = await UserModel.findOne({ email });

        if (potentialUser) {
            res.status(409).json({ error: 'User is already registered' });
        } else {
            const user = new UserModel({
                email: email
            });
            user.setPassword(password);
            const savedUser = await user.save();
            res.status(201).json(savedUser.toAuthJSON());
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.errors });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await UserModel.findOne({ email });

        if (data && data.validPassword(password)) {
            res.status(200).json(data.toAuthJSON());
        } else {
            res.status(404).json({ error: 'Wrong user credentials!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.errors });
    }
};

export { register, login };