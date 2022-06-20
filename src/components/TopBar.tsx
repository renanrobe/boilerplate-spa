import { Dropdown, Form } from "react-bootstrap"
import { useEffect, useState } from "react"
import storageService from "../services/storage.service"
import { useHistory } from "react-router-dom"
import { TranslationsOptions } from "../translations"
import i18n from "i18next"
import { useTranslation } from "react-i18next"
import { setDefaultLocale } from "react-datepicker"

export const TopBar = () => {
  let history = useHistory()
  const { t } = useTranslation()
  const [userLetters, setUserLetters] = useState("")
  const [idiomDefault, setIdiomDefault] = useState(storageService.getIdiom())
  const Logout = async () => {
    storageService.clearUserLoggedIn()
    history.push("/Login")
  }

  useEffect(() => {
    const getLettersName = (name: string) => {
      let letters = ""
      let firstLetters = name?.match(/\b(\w)/g)
      if (firstLetters) {
        letters =
          firstLetters[0] +
          (firstLetters.length > 1 ? firstLetters[firstLetters.length - 1] : "")
      }
      return letters
    }

    setUserLetters(getLettersName(storageService.getUserName()))
  }, [])

  const onChangeLanguage = (e) => {
    setDefaultLocale(e.target.value.replaceAll("-", ""))
    i18n.changeLanguage(e.target.value, (err, t) => {
      if (err) return console.log("something went wrong loading", err)
      else {
        setIdiomDefault(e.target.value)
        storageService.setIdiom(e.target.value)
      }
    })
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid">
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mt-2 mt-lg-0">
            <li className="nav-item active">
              <Form.Select onChange={onChangeLanguage} value={idiomDefault}>
                {TranslationsOptions.map((t, index) => {
                  return (
                    <option key={Math.random()} value={t.shortName}>
                      {t.name}
                    </option>
                  )
                })}
              </Form.Select>
            </li>
          </ul>
          <ul className="navbar-nav mt-2 mt-lg-0 ms-2">
            <li className="nav-item active">
              <Dropdown>
                <Dropdown.Toggle className="nav-link user-prefix">
                  {userLetters}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={Logout}>
                    {t("BUTTON_LOGOUT")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
