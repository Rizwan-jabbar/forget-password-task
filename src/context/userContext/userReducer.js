export const initialState = {
    registerUsers: localStorage.getItem("registerUsers")
        ? JSON.parse(localStorage.getItem("registerUsers"))
        : [],
    currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null,
    error: { error: '' },
    success : null, 
    resetEmail: localStorage.getItem('resetEmail') ? JSON.parse(localStorage.getItem('resetEmail')) : null
};

export const userReducer = (state, action) => {
    switch (action.type) {
        case "REGISTER": {
            const error = {}
            const { name, email, password, confirmPassword } = action.payload;

            if (!name.trim()) error.name = 'name is required'
            if (!email.trim()) error.email = 'email is required'
            if (!password.trim()) error.password = 'password is required'
            if (password !== confirmPassword) error.confirmPassword = 'password must be same'

            // if(!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() ){
            //     return {
            //         ...state,
            //         error : 'all fields are required'
            //     }
            // }

            // if(password !== confirmPassword){
            //     return {
            //         ...state ,
            //         error : 'password must be same'
            //     }
            // }

            const existsEmail = state.registerUsers.find((user) => user.email === email)
            if (existsEmail) {
                error.existsEmail = "Email already exists!";
                return { ...state, error };
            }


            if (Object.keys(error).length > 0) {
                return {
                    ...state,
                    error,
                };
            }

            const updatedUsers = [...state.registerUsers, { name, email, password }];
            localStorage.setItem("registerUsers", JSON.stringify(updatedUsers));
            return {
                ...state,
                registerUsers: updatedUsers,
                error: {},
                success : 'account register successfully !'
            };

        }

        case "LOGIN": {
            const error = {}
            const { email, password } = action.payload

            if (!email.trim()) error.email = 'email is required'
            if (!password.trim()) error.password = 'password is required'

            if (Object.keys(error).length > 0) {
                return {
                    ...state,
                    error,
                };
            }

            const confirmLogin = state.registerUsers.find((user) => user.email === email && user.password === password)

            if (!confirmLogin) {
                return {
                    ...state,
                    error: { invalid: 'invalid credentials' }

                }
            }

            localStorage.setItem('currentUser', JSON.stringify(confirmLogin))

            return {
                ...state,
                currentUser: confirmLogin,
                error: {},
                success : 'user login successful'
            };


        }



        case 'CONFIRM_EMAIL': {
            const { email } = action.payload
            const checkEmail = state.registerUsers.find((user) => user.email === email)
            if (!checkEmail) {
                return {
                    ...state,
                    error: { invalidEmail: 'This email is not registered' }
                }
            }

            localStorage.setItem('resetEmail', JSON.stringify(checkEmail.email))
            return {
                ...state,
                resetEmail: checkEmail.email,
                error: {},
                success: "Email verified successfully!"
            }
        }



        case "UPDATE_PASSWORD": {
            const error = {}
            const { password, confirmPassword } = action.payload

            if (!password.trim()) error.password = 'new password is required'
            if (!confirmPassword.trim()) error.confirmPassword = 'confirm new password is required'

            if (password !== confirmPassword) error.confirmPassword = 'passwords must match';
            if (Object.keys(error).length > 0) return { ...state, error };


            const updatedUsers = state.registerUsers.map((user) => user.email === state.resetEmail ? { ...user, password } : user)

            localStorage.setItem('registerUsers', JSON.stringify(updatedUsers))
            localStorage.removeItem('resetEmail')

            return {
                ...state,
                registerUsers: updatedUsers,
                resetEmail: null,
                error: {},
                success : 'password updated successful'
            }

        }

        case 'CLEAR_SUCCESS':
  return { ...state, success: null }

  case "LOGOUT" : {
    localStorage.removeItem('currentUser')
    return {
        ...state,
        currentUser : null
    }

  }


        default:
            return state;
    }
};
