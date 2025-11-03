import Header from "./components/header/header"
import {Routes , Route} from 'react-router'
import Register from "./components/register/register"
import Login from "./components/login/login"
import ConfirmEmailForReset from "./components/forgetPassword/confirmEmailForReset"
import NewPassword from "./components/forgetPassword/newPassword"
import ProtectedLayout from "./protectedLayout/protectedLayout"

function App(){
  return (
    <>
      <div className="px-3">
    <Routes>
      <Route element = {<ProtectedLayout/>} >
      <Route path="/" element = {<Header/>} />
      </Route>
      <Route path="/register" element = {<Register/>} />
      <Route path="/login" element = {<Login/>} />
      <Route path="/confirmEmail" element = {<ConfirmEmailForReset/>} />
      <Route path="/newPassword" element = {<NewPassword/>} />

    </Routes>
      </div>
    </>
  )
}

export default App