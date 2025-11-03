import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/userContext/userContext"
import { ClipLoader } from "react-spinners"
import { useNavigate } from "react-router"

function NewPassword () {
    const [formData , setFormData] = useState({password : '' , confirmPassword : ""})
    const [showLoading , setShowLoading] = useState(false)
    const {state , dispatch} = useContext(UserContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name , value} = e.target
        setFormData(prev => (
            {
                ...prev ,
                 [name] : value
            }
        ))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        setShowLoading(true)

        setTimeout(() => {
           dispatch({ type: 'UPDATE_PASSWORD', payload: formData })
            setShowLoading(false)
        }, 2000);


    }

    useEffect(() => {
    if(state.success === 'password updated successful'){
        const timer = setTimeout(() => {
            navigate('/login');
            dispatch({ type: 'CLEAR_SUCCESS' });
        }, 2000);

        return () => clearTimeout(timer)
    }
}, [state.success, dispatch, navigate])


    return (
        <>
        
         <div className="flex items-center justify-center h-screen">
                <form action="" className="p-3 shadow-lg rounded-lg w-full md:w-1/3 " onSubmit={handleSubmit}>
                    <h3 className="my-3 uppercase font-bold">add new password</h3>
                    <div className="col flex flex-col gap-1 mb-3">
                        <label htmlFor="password"> new password</label>
                        <input type="password" value={formData.password} onChange={handleChange} className="border border-gray-500 focus:outline-none p-1 rounded-lg"
                            placeholder="password" name="password" id="password" />
                        {
                            state.error.password && (
                                <p className="text-red-500 text-[12px]">{state.error.password}</p>
                            )
                        }
                    </div>
                    <div className="col flex flex-col gap-1 mb-3">
                        <label htmlFor="confirmPassword">confirm new password</label>
                        <input type="password" value={formData.confirmPassword} onChange={handleChange} className="border border-gray-500 focus:outline-none p-1 rounded-lg"
                            placeholder="confirm password" name="confirmPassword" id="confirmPassword" />
                        {
                            state.error.confirmPassword && (
                                <p className="text-red-500 text-[12px]">{state.error.confirmPassword}</p>
                            )
                        }
                    </div>
                    <div className="">
                        
                         {
                            state.success && (
                                <p className="text-green-500 text-[14px] m-3">{state.success}</p>
                            )
                        }
                        <button type="submit" className="bg-green-600 whitespace-nowrap px-10 text-white py-1 rounded-lg uppercase flex items-center justify-center w-40">
                            {showLoading ? (
                                <div className="flex items-center gap-2">
                                    <ClipLoader size={20} color="#fff" />
                                    <span>updating.....</span>
                                </div>
                            ) : (
                                "update"
                            )}

                        </button>
                    </div>
                </form>
            </div>
        
        </>
    )
}

export default NewPassword