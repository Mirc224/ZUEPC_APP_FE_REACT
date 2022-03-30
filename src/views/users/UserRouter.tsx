import { Outlet, Route, Routes } from "react-router"
import ROUTES from "../../endpoints/routes.endpoints"
import Missing from "../Missing"
import UserDetail from "./UserDetail"
import UserEdit from "./UserEdit"
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
        <Route path={getPath(ROUTES.users)} element={<Users/>} />
        <Route path={getPath(ROUTES.userDetails)} element={<UserDetail/>} />
        <Route path={getPath(ROUTES.userEdit)} element={<UserEdit/>} />
        <Route path='*' element={<Missing />} />
      </Routes>
  )
}

export default UserRoutes;