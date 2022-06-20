import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import { Header } from "../../components/Header"

export const UserList = () => {
  const { pathname } = useLocation()
  const [isLoading, setLoading] = useState(false)
  const { t } = useTranslation()

  return (
    <>
      <Header path={`${pathname}/add`} title="Titulo header" />
      listagem
    </>
  )
}
