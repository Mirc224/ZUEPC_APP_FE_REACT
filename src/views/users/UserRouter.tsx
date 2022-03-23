import { Outlet, Route, Routes } from "react-router"
import routes from "../../endpoints/routes.endpoints"
import UserDetail from "./UserDetail"
import Users from "./Users"

type Props = {}

const UserRoutes = (props: Props) => {
  const getPath = (path: string): string => {
    let index = path.indexOf('/', 1);
    if(index === -1) return '';
    return path.substring(index);
  }
  return (
      <Routes>
        <Route path={getPath(routes.users)} element={<Users/>} />
        <Route path={getPath(routes.userDetails)} element={<UserDetail/>} />
      </Routes>
  )
}

export default UserRoutes;