import { useReducer } from "react";
import { UserContext } from "./userContext";
import { initialState, userReducer } from "./userReducer";

export const UserProvider = ({children}) => {
    const [state , dispatch] = useReducer(userReducer , initialState)
    return (
        <UserContext.Provider value={{state , dispatch}}>
            {children}
        </UserContext.Provider>
    )
} 