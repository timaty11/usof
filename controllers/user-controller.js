import User from '../models/User.js';
import encryptService from '../services/encrypt-service.js';
import tokenService from '../services/token-service.js';


class UserController {
    async getAllUsers (req, res, next) {
        try {
            const data = await User.getAllUsers();

            res.status(200);
            res.json({ message: "Got user list", user_list: data });
        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA USER CONTROLLERY 1 " + e);

            next(e);
        }
    }

    async getUserData (req, res, next) {
        try {
            const data = await User.getUserData("id", { ...req.body.id });

            res.status(200);
            res.json({ message: "Got user data: ", user_data: data });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA USER CONTROLLERY 2 " + e);

            next(e);
        }
    }

    async createNewUser (req, res, next) {
        try {
            // ADD VALIDATION FOR PASSWORD
            const { login, password, password_confirmation, full_name, email, role } = req.body;

            const encryptedPassword = await encryptService.hashPass(password);
            console.log(encryptedPassword);

            const id = uuidv4();

            const token = tokenService.generateToken({ id: id, login: login, password: encryptedPassword, email: email });
            await User.addUser(id, login, encryptedPassword, full_name, email, role, token);

            res.status(200);
            res.json({ message: "User created: ", user_data: {
                login: login,
                password: password,
                password_confirmation: password_confirmation,
                full_name: full_name,
                email: email,
                role: role 
            }});

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA USER CONTROLLERY 3 " + e);

            next(e);
        }
    }

    // NOT DONE
    async uploadUserAvatar (req, res, next) {
        try {
            res.status(400);
            res.json({ message: "POSHEL NAHYI NE GOTOVO ESHE" });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA USER CONTROLLERY 4 " + e);

            next(e);
        }
    }

    async updateUserData (req, res, next) {
        try {
            const { user_id } = req.params;

            await User.setMultipleColumnsUserData(req.body, user_id);

            res.status(200);
            res.json({ message: "User data has been updated!" });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA USER CONTROLLERY 5 " + e);

            next(e);
        }
    }

    async deleteUser (req, res, next) {
        try {
            const { user_id } = req.params;

            await User.deleteUser(user_id);

            res.status(200);
            res.json({ message: "User has been deleted!" });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA USER CONTROLLERY 6 " + e);

            next(e);
        }
    }

}

export default new UserController();