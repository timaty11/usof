import AuthValidators from './auth-validators.js';
import ApiError from '../exceptions/api-execptions.js';

class AuthValidationController {
    registerValidation(req, res, next) {
        const { login, password, password_confirm, email } = req.body;
        let errors = [];

        const login_validation = AuthValidators.loginFieldValidator(login);
        const pass_validation = AuthValidators.passwordFieldValidator(password);
        const email_validation = AuthValidators.emailFieldValidator(email);

        if (password !== password_confirm) {
            errors.push({
                message: "Password and password confirm must match!",
                data: {
                    password_to_check: password,
                    actual_password: password_confirm
                }
            });
        }

        if (login_validation) {
            errors.push(login_validation);
        }
        
        if (pass_validation) {
            errors.push(pass_validation);
        }

        if (email_validation) {
            errors.push(email_validation);
        }

        if (errors.length > 0) {
            throw ApiError.InvalidData(res, "registration validation failed", errors);
        } else {
            next();
        }
    }

    loginValidation(req, res, next) {
        const { login, password } = req.body;
        const errors = [];

        const login_validation = AuthValidators.loginFieldValidator(login);
        const pass_validation = AuthValidators.passwordFieldValidator(password);

        if (login_validation) {
            errors.push(login_validation);
        }
        
        if (pass_validation) {
            errors.push(pass_validation);
        }

        if (errors.length > 0) {
            throw ApiError.InvalidData(res, "login validation failed", errors);
        } else {
            next();
        }
    }
}


export default new AuthValidationController();