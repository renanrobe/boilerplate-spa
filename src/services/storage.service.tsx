import { Menu } from "../models/menu.model"
import { ResultLogin } from "../models/resultLogin.model"
import { UserModel } from "../models/user.model"

export const storageService = {
  setUserLoggedIn,
  getSideNavMenus,
  getTopMenus,
  clearUserLoggedIn,
  getAccessToken,
  getUserName,
  getIdiom,
  getUser,
  setIdiom,
  checkRouteByMenu
}

function checkRouteByMenu(route: string): Boolean {
  let menus = getMenus()
  let allowRoute = false
  if (route === "/") {
    route = "/Home"
  }
  menus?.map((menu) => {
    if (route.toLowerCase().includes(menu.route.toLowerCase())) {
      allowRoute = true
    }
  })

  return allowRoute
}

function getMenus(): Array<Menu> {
  var storageItem: Menu[] = null
  var user = getUser()
  if (user?.profile?.profileName === "admin") {
    storageItem = [
      {
        title: "MENU_DASHBOARD",
        icon: "faUsers",
        route: "Home",
        area: "lateral"
      }
    ]
  }
  if (user?.profile?.profileName === "core") {
    storageItem = [
      {
        title: "MENU_DASHBOARD",
        icon: "faUsers",
        route: "Home",
        area: "lateral"
      }
    ]
  }
  if (user?.profile?.profileName === "operator") {
    storageItem = [
      {
        title: "MENU_DASHBOARD_BRANCH",
        icon: "faUsers",
        route: "DashboardBranch",
        area: "lateral"
      }
    ]
  }

  if (storageItem) {
    try {
      return storageItem
    } catch (error) {
      console.error(error)
    }
    return null
  }
}

export function getSideNavMenus(): Array<Menu> {
  var menus = getMenus()
  var sideNavMenus = menus?.filter((m) => m.area === "lateral")
  return sideNavMenus
}

export function getTopMenus(): Array<Menu> {
  var menus = getMenus()
  var sideNavMenus = menus.filter((m) => m.area === "superior")
  return sideNavMenus
}

function setUserLoggedIn(result: ResultLogin): void {
  localStorage.setItem("AccessTokenDynamicPickup", result.accessToken)
  localStorage.setItem("UserName", result.user.fullName)
  localStorage.setItem("User", JSON.stringify(result.user))
  localStorage.setItem("Idiom", result.user.idiom.shortName)
}

function clearUserLoggedIn(): void {
  localStorage.removeItem("AccessTokenDynamicPickup")
  localStorage.removeItem("UserName")
  localStorage.clear()
}

function getAccessToken(): string {
  return localStorage.getItem("AccessTokenDynamicPickup")
}

function getUserName(): string {
  return localStorage.getItem("UserName")
}

function getIdiom(): string {
  return localStorage.getItem("Idiom")
}

function getUser(): UserModel {
  return JSON.parse(localStorage.getItem("User"))
}

function setIdiom(idiom: string) {
  localStorage.setItem("Idiom", idiom)
}

export default storageService
