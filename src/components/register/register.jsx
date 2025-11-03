import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../context/userContext/userContext"
import { ClipLoader } from 'react-spinners'
import { useNavigate } from "react-router"

function Register() {

    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const { state, dispatch } = useContext(UserContext)
    const [showLoading, setShowLoading] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setShowLoading(true)
        setTimeout(() => {
            dispatch({ type: 'REGISTER', payload: formData })
            setShowLoading(false)
        }, 2000);

    }


useEffect(() => {
     if(state.success === 'account register successfully !'){
        const timer  = setTimeout(() => {
            navigate('/login')
            dispatch({type : 'CLEAR_SUCCESS'})
        }, 2000);
         return () => clearTimeout(timer)
     }
} , [state.success, dispatch, navigate])

    return (
        <>

            <div className="flex items-center justify-center h-screen">
                <form action="" className="p-3 shadow-lg rounded-lg w-full md:w-1/3 " onSubmit={handleSubmit}>
                    <h3 className="my-3 uppercase font-bold">register account</h3>
                    <div className="col flex flex-col gap-1 mb-3">
                        <label htmlFor="name">name</label>
                        <input
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            className="border border-gray-500 focus:outline-none p-1 rounded-lg"
                            placeholder="name" name="name" id="name" />

                        {
                            state.error.name && (
                                <p className="text-red-500 text-[12px]">{state.error.name}</p>
                            )
                        }
                    </div>
                    <div className="col flex flex-col gap-1 mb-3">
                        <label htmlFor="email">email</label>
                        <input type="email" value={formData.email} onChange={handleChange} className="border border-gray-500 focus:outline-none p-1 rounded-lg"
                            placeholder="email" name="email" id="email" />
                        {
                            state.error.email && (
                                <p className="text-red-500 text-[12px]">{state.error.email}</p>
                            )
                        }
                        {
                            state.error.existsEmail && (
                                <p className="text-red-500 text-[12px]">{state.error.existsEmail}</p>
                            )
                        }
                    </div>
                    <div className="col flex flex-col gap-1 mb-3">
                        <label htmlFor="password">password</label>
                        <input type="password" value={formData.password} onChange={handleChange} className="border border-gray-500 focus:outline-none p-1 rounded-lg"
                            placeholder="password" name="password" id="password" />
                        {
                            state.error.password && (
                                <p className="text-red-500 text-[12px]">{state.error.password}</p>
                            )
                        }
                    </div>
                    <div className="col flex flex-col gap-1 mb-3">
                        <label htmlFor="confirmPassword">confirm password</label>
                        <input type="password" value={formData.confirmPassword} onChange={handleChange} className="border border-gray-500 focus:outline-none p-1 rounded-lg"
                            placeholder="confirm password" name="confirmPassword" id="confirmPassword" />
                        {
                            state.error.confirmPassword && (
                                <p className="text-red-500 text-[12px]">{state.error.confirmPassword}</p>
                            )
                        }

                        {
                            state.success && (
                             <p className="text-green-500 text-[12px]">{state.success}</p>
                            )
                        }
                    </div>
                    <div className="">
                        <button type="submit" className="bg-green-600 px-10 text-white py-1 rounded-lg uppercase flex items-center justify-center w-40">
                            {showLoading ? (
                                <div className="flex items-center gap-2">
                                    <ClipLoader size={20} color="#fff" />
                                    <span>Registering...</span>
                                </div>
                            ) : (
                                "Register"
                            )}

                        </button>
                    </div>

                    <div className="">
                              <span className="text-blue-700 text-[13px] underline underline-offset-4 cursor-pointer" onClick={() => navigate('/login')}>have account ?</span>
                        </div>
                </form>
            </div>

        </>
    )
}

export default Register