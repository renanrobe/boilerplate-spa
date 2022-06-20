import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { UserModel } from "../../models/user.model"

import { Header } from "../../components/Header"

export const HomeList = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const [isLoading, setLoading] = useState(false)

  const handleDispash = async () => {
    dispatch({ type: "START_REDUX", fullName: "Nome do usuario" })
  }

  const handleDispashDois = async () => {
    dispatch({ type: "START_REDUX", fullName: "Nome do usuario 2" })
  }

  const user = useSelector((state: UserModel) => state)

  console.log("User", user)

  return (
    <>
      <Header path={`${pathname}/add`} title={t("HEADER")} />
      <div>
        {t("CONTENT")} - <span onClick={handleDispash}>Dispara Redux</span> -{" "}
        <span onClick={handleDispashDois}>Dispara Redux 2</span>
      </div>
      <div>{t("FOOTER")}</div>
    </>
  )
}
