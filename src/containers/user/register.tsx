import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useParams } from "react-router-dom"
import { Header } from "../../components/Header"

export const UserRegister = () => {
  const { pathname } = useLocation()
  const { id } = useParams<{ id?: string }>()
  const [isLoading, setLoading] = useState(false)
  const { t } = useTranslation()

  useCallback(async () => {
    console.log("id", id)
  }, [id])

  return (
    <>
      <Header path={`${pathname}/add`} title="Titulo header" />
      listagem
    </>
  )
}
