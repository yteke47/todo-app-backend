import UserModel from "../models/UserModel.js";

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const potentialUser = await UserModel.exists({ email });

        if (potentialUser)
            return res.status(409).json({ error: 'User is already registered' });

        const user = new UserModel({
            email: email
        });
        user.setPassword(password);
        const savedUser = await user.save();
        return res.status(201).json(savedUser.toAuthJSON());
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.errors });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user || !user.validPassword(password)) {
            return res.status(401).json({ error: 'Wrong user credentials!' });
        }

        return res.status(200).json(user.toAuthJSON());
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.errors });
    }
};

export { register, login };