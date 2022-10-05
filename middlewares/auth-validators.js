import emailValidator from 'email-validator';


class AuthValidators {

    loginFieldValidator(login) {

        if (!login) {
            return {
                message: "Login field is empty!",
                data: {
                    login: login,
                }
            }
        } else if (login.length < 5) {
            return {
                message: "Login too short!",
                data: {
                    login: login,
                }
            }
        } else if (!login) {
            //// TO DO ADD VALIDATION FOR FORBIDDEN SYMBOLS
            return {
                message: "Login contains forbidden symbols!",
                data: {
                    login: login,
                }
            }
        } else {
            return null;
        }

    }

    passwordFieldValidator(password) {

        if (!password) {
            return {
                message: "Password field is empty!",
                data: {
                    password: password,
                }
            };
        } else if (password.length < 8) {
            return {
                message: "Password too short!",
                data: {
                    password: password,
                }
            };
        } else if (!password) {
            //// TO DO ADD VALIDATION FOR FORBIDDEN SYMBOLS
            return {
                message: "Password contains forbidden symbols!",
                data: {
                    password: password,
                }
            };
        } else {
            return null;
        }

    }

    emailFieldValidator(email) {

        if (!emailValidator.validate(email)) {
            return {
                message: "Email validation failed!",
                data: {
                    email: email
                }
            };
        } else {
            return null;
        }
        
    }

}

export default new AuthValidators();