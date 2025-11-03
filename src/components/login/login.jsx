import { useContext, useState , useEffect } from "react";
import { UserContext } from "../../context/userContext/userContext";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router";
function Login () {
    const [formData , setFormData] = useState({email : '' , password : ''})
    const {state , dispatch} = useContext(UserContext)
    const [showLoading , setShowLoading] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name , value} = e.target;

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
            dispatch({type :"LOGIN" , payload : formData})
            setShowLoading(false)
        }, 2000);

    } 


     useEffect(() => {
        if(state.success === 'user login successful'){
            const timer = setTimeout(() => {
                navigate('/');
                dispatch({ type: 'CLEAR_SUCCESS' });
            }, 2000);
    
            return () => clearTimeout(timer)
        }
    }, [state.success, dispatch, navigate])

  return (
    <>

      <div className="flex items-center justify-center h-screen">
                <form action="" className="p-3 shadow-lg rounded-lg w-full md:w-1/3 " onSubmit={handleSubmit}>
                    <h3 className="my-3 uppercase font-bold">login your account</h3>
                    <div className="col flex flex-col gap-1 mb-3">
                        <label htmlFor="email">email</label>
                        <input type="email" value={formData.email} onChange={handleChange} className="border border-gray-500 focus:outline-none p-1 rounded-lg"
                            placeholder="email" name="email" id="email" />
                        {
                            state.error.email && (
                                <p className="text-red-500 text-[12px]">{state.error.email}</p>
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
                    <div className="">
                        
                         {
                            state.error.invalid && (
                                <p className="text-red-500 text-[14px] m-3">{state.error.invalid}</p>
                            )
                        }

                        {
                            state.success && (
                            <p className="text-green-500 text-[14px] m-3">{state.success}</p>

                            )
                        }
                        <button type="submit" className="bg-green-600 px-10 text-white py-1 rounded-lg uppercase flex items-center justify-center w-40">
                            {showLoading ? (
                                <div className="flex items-center gap-2">
                                    <ClipLoader size={20} color="#fff" />
                                    <span>loging...</span>
                                </div>
                            ) : (
                                "login"
                            )}

                        </button>
                        <div className="">
                            <span className="text-blue-700 text-[13px] underline underline-offset-4 cursor-pointer" onClick={() => navigate('/confirmEmail')}>forget pass</span>
                        </div>
                        <div className="">
                              <span className="text-blue-700 text-[13px] underline underline-offset-4 cursor-pointer" onClick={() => navigate('/register')}>not registered</span>
                        </div>
                    </div>
                </form>
            </div>
    
    </>
  )
}

export default Login