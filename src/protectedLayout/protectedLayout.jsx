import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext/userContext"
import { Outlet, useNavigate } from "react-router"

function ProtectedLayout () {

    const {state} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {

        if(!state.currentUser){
            navigate('/login')
        }
    } , [state.currentUser])
        return (
        <>

        <Outlet/>
        
        </>
    )
}

export default ProtectedLayout