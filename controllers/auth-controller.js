import { v4 as uuidv4 } from 'uuid';

import User from '../models/User.js';
import tokenService from '../services/token-service.js';
import SendMailService from '../services/send-mail-service.js';
import encryptService from '../services/encrypt-service.js';
import ApiError from '../exceptions/api-execptions.js';


class AuthController {
    async AuthControllerRegister (req, res, next) {
        try {
            const sendMailService = new SendMailService();
            const { login, password, full_name, email } = req.body;
            
            const encryptedPassword = await encryptService.hashPass(password);
            console.log(encryptedPassword);

            const id = uuidv4();

            const token = tokenService.generateToken({ id: id, login: login, password: encryptedPassword, email: email });
            await User.addUser(id, login, encryptedPassword, full_name, email, "admin", token);

            sendMailService.sendEmailConfirm(email, full_name, token);

            res.status(201);
            res.json({ message: "USER CREATED, ACTIVATE EMAIL LINK SENT", id: id });
        } catch (e) {
            // THROW AN API ERROR
            console.log(e);

            next(e);
        }
    }

    async AuthControllerEmailConfirm (req, res, next) {
        try {
            const { token } = req.params;
            const tokenData = tokenService.tokenVerify(token);
            console.log(tokenData);

            await User.setUserData('email_activated', true, tokenData.id);
            
            res.status(201);
            res.json({ message: "EMAIL CONFIRMED SUCCESSFULLY!"});
        } catch (e) {
            // THROW AN API ERROR
            console.log(e);

            next(e);
        }
    }

    async AuthControllerLogin (req, res, next) {
        try {
            const { login, password } = req.body;            
            const data = await User.getUserData('login', login);

            console.log(await encryptService.hashedPassCompare(password, data['password']));

            if (!await encryptService.hashedPassCompare(password, data['password'])) {
                res.status(401);
                res.json({ message: "INCORRECT PASS"});

                // THROW AN API ERROR
                throw ApiError.InvalidData(res, "Entered password is incorrect!", {password: password});
            } else if (!data['email_activated']) {
                res.status(401);
                res.json({ message: "ACTIVATE EMAIL!"});

                // THROW AN API ERROR
                throw ApiError.InvalidData(res, "You haven't activated Your email!", {email: data.email});
            } else {
                // Update user online status
                await User.setUserData('online', true, data['id']);

                // Give user token
                res.status(200);
                res.json({ message: "Login success!", id: data['id']});
            }
            
        } catch (e) {
            // THROW AN API ERROR
            console.log(e);

            next(e);
        }
    }

    async AuthControllerLogout (req, res, next) {
        try {
            const { id } = req.body;

            // Update user online status
            await User.setUserData('online', false, id);

            res.status(200);
            res.json({ message: "Logged out, bye!", id: id});

        } catch (e) {
            // THROW AN API ERROR
            console.log(e);

            next(e);
        }
    }

    async AuthControllerPassReset (req, res, next) {
        try {
            const sendMail = new sendMailService();

            const { email } = req.body;
            const userData = await User.getUserData('email', email);

            const token = tokenService.generateToken({
                id: userData.id, 
                login: userData.login, 
                password: userData.password, 
                email: userData.email
            });

            sendMail.sendEmailPassChangeConfirm(email, userData.full_name, token);

            res.status(200);
            res.json({ message: "Sent password reset confirmation email", id: userData.id});

        } catch (e) {
            // THROW AN API ERROR
            console.log(e);

            next(e);
        }
    }

    async AuthControllerPassResetConfirm (req, res, next) {
        try {
            const { confirm_token } = req.params;
            console.log("PIZDEC1");
            console.log(confirm_token);

            res.status(200);
            res.send(
                `<div>
                    <form action="http://localhost:8080/api/auth/password-reset/${confirm_token}" method="POST">
                    <label">Type a new password to reset the old one</label>
                    <input type="password" name="reset_password" id="reset_password">
                    <input type="password" name="reset_confirm_password" id="reset_confirm_password">
                    <input type="submit" value="Change pass">
                    </form>
                </div>`
            );
            
        } catch (e) {
            // THROW AN API ERROR
            console.log(e);

            next(e);
        }
    }

    async AuthControllerPassResetApply (req, res, next) {
        try {
            const { confirm_token } = req.params;
            const tokenData = tokenService.tokenVerify(confirm_token);

            // ADD VALIDATIONS
            const { reset_password, reset_confirm_password } = req.body;
            const encryptedPassword = await encryptService.hashPass(reset_password);
            
            await User.setUserData('password', encryptedPassword, tokenData.id);
            
            res.status(200);
            res.json({ message: "PASS CHANGED SUCCESSFULLY!"});

        } catch (e) {
            // THROW AN API ERROR
            console.log(e);

            next(e);
        }
    }

}

export default new AuthController();
