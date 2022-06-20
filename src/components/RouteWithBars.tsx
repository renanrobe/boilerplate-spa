import { useState, useEffect } from "react"
import { SideNav } from "./SideNav"
import { TopBar } from "./TopBar"
import { Route } from "react-router"
import storageService from "../services/storage.service"
import { Redirect } from "react-router-dom"

export const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false)
  const menu = storageService.getSideNavMenus()

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Voltar {storageService.checkRouteByMenu(rest.path) ? ( */}
      {storageService.checkRouteByMenu(rest.path) ? (
        <div className="d-flex overflow-hidden" id="wrapper">
          <SideNav />
          <div id="page-content-wrapper">
            <TopBar />
            <div className="container-fluid overflow-auto px-4 py-3">
              <Route {...rest}>
                <Component />
              </Route>
            </div>
          </div>
        </div>
      ) : (
        <Redirect
          to={{
            pathname: "/404",
            state: { from: location }
          }}
        />
      )}
    </>
  )
}
