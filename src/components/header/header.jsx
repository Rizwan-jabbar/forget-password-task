import { useContext } from "react"
import { UserContext } from "../../context/userContext/userContext"

function Header () {
    const {state , dispatch} = useContext(UserContext)
    return (
        <>

        <header className="bg-gray-200 py-3 pl-3 flex justify-between px-10">
            <h2 className="text-[20px] uppercase font-bold">students app</h2>
            <button onClick={() => dispatch({type : "LOGOUT"})}>
                logout
            </button>
        </header>

        <div className="text-center text-[25px] my-5">
            <h3>welcome <span className="font-bold">{state.currentUser?.name} !</span></h3>
        </div>
        
        </>
    )
}

export default Header