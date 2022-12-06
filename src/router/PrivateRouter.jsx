import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRouter = () => {
  const { loginInformation } = useSelector((state) => state.loginInfo)

  console.log(loginInformation);
  return (
    <div>
      {loginInformation ? <Outlet /> : <Navigate to="/"/>}
    </div>
  )
}

export default PrivateRouter