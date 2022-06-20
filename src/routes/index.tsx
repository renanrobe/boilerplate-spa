import { Switch, Route, Redirect } from "react-router-dom"

import { RouteWithSidebar } from "../components/RouteWithBars"
import Login from "../containers/login/index"
import Home from "../containers/home/index"
import { UserList } from "../containers/user/list"
import { UserRegister } from "../containers/user/register"
import NotFound from "../containers/notFound"
import storageService from "../services/storage.service"
import LoginLayoutRoute from "../containers/loginLayoutRoute"
import ForgotPassword from "../containers/forgotPassword"
import RecoverPassword from "../containers/recoverPassword"

const Routes = () => {
  return (
    <Switch>
      <LoginLayoutRoute exact path="/Login" component={Login} />
      <LoginLayoutRoute
        exact
        path="/ForgotPassword"
        component={ForgotPassword}
      />
      <LoginLayoutRoute
        exact
        path="/RecoverPassword/:token"
        component={RecoverPassword}
      />

      <Route exact path="/404" component={NotFound} />

      <PrivateRouteWithSidebar exact path="/" component={Home} />
      <PrivateRouteWithSidebar path="/Home" component={Home} />

      <PrivateRouteWithSidebar exact path="/User" component={UserList} />
      <PrivateRouteWithSidebar
        exact
        path="/User/add"
        component={UserRegister}
      />
      <PrivateRouteWithSidebar
        exact
        path="/User/edit/:id"
        component={UserRegister}
      />

      <Redirect to="/404" />
    </Switch>
  )
}

const PrivateRouteWithSidebar = ({ ...rest }) => {
  let auth = storageService.getAccessToken()
  // Voltar return auth ? (
  return auth ? (
    <RouteWithSidebar exact component={rest.component} {...rest} />
  ) : (
    <Redirect
      to={{
        pathname: "/Login",
        state: { from: location }
      }}
    />
  )
}

export default Routes
