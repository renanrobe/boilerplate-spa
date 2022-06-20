import { useEffect, useState } from "react"
import LogoSrc from "../assets/logo.png"
import { Link } from "react-router-dom"
import StorageService, { storageService } from "../services/storage.service"
import { Menu } from "../models/menu.model"
import { useTranslation } from "react-i18next"

export const SideNav = () => {
  const { t } = useTranslation()
  const [menu, setMenu] = useState({ menus: [] })
  const user = storageService.getUser()

  useEffect((): any => {
    var menus = StorageService.getSideNavMenus()
    setMenu({ menus: menus })
  }, [])

  return (
    <div className="border-end bg-white" id="sidebar-wrapper">
      <div className="sidebar-heading">
        <Link
          to={
            user?.profile?.profileName === "operator"
              ? "DashboardBranch"
              : "Home"
          }
          style={{ textDecoration: "none" }}
        >
          Logo
        </Link>
      </div>
      <div className="list-group list-group-flush">
        {menu?.menus?.map((item: Menu, idx) => (
          <Link key={idx} to={"/" + item.route} className="">
            {t(item.title)}
          </Link>
        ))}
      </div>
    </div>
  )
}
