import { useContext, useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import { UserContext } from "../../context/userContext/userContext"
import { useNavigate } from "react-router"

function ConfirmEmailForReset() {
    const [formData, setFormData] = useState({ email: '' })
    const [showLoading, setShowLoading] = useState(false)
    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        setShowLoading(true)
        setTimeout(() => {
            dispatch({ type: 'CONFIRM_EMAIL', payload: formData })
            setShowLoading(false)
        }, 2000);


    }


    useEffect(() => {
        if (state.success) {
          const timer =   setTimeout(() => {
                navigate('/newPassword');
                dispatch({ type: 'CLEAR_SUCCESS' });
            }, 2000);


            return () => clearInterval(timer)
        }
    }, [state.success])


    return (
        <>

            <div className="flex items-center justify-center h-screen">
                <form action="" className="p-3 shadow-lg rounded-lg w-full md:w-1/3 " onSubmit={handleSubmit}>
                    <h3 className="my-3 uppercase font-bold">enter your email</h3>
                    <div className="col flex flex-col gap-1 mb-3">
                        <label htmlFor="email">email</label>
                        <input type="email" value={formData.email} onChange={handleChange} className="border border-gray-500 focus:outline-none p-1 rounded-lg"
                            placeholder="email" name="email" id="email" />
                        {
                            state.success && (
                                <p className="text-green-500 text-[12px]">{state.success}</p>
                            )
                        }
                        {
                            state.error.invalidEmail && (
                                <p className="text-red-500 text-[12px]">{state.error.invalidEmail}</p>
                            )
                        }
                    </div>
                    <div className="">
                        <button type="submit" className="bg-green-600 px-10 whitespace-nowrap text-white py-1 rounded-lg uppercase flex items-center justify-center w-40">
                            {showLoading ? (
                                <div className="flex items-center gap-2">
                                    <ClipLoader size={20} color="#fff" />
                                    <span className="text-[10px]">checking......</span>
                                </div>
                            ) : (
                                "check email"
                            )}

                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}
export default ConfirmEmailForReset