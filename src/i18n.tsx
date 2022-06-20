import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { Translations } from "./translations"
import LngDetector from "i18next-browser-languagedetector"
import backend from "i18next-http-backend"
import { ptBR, enUS } from "date-fns/locale"
import { registerLocale } from "react-datepicker"

registerLocale("ptBR", ptBR)
registerLocale("enUS", enUS)

let resources = {}

Object.getOwnPropertyNames(Translations).forEach(function (val, idx, array) {
  resources[val] = { translation: window.location.pathname + Translations[val] }
})

i18n
  .use(backend)
  .use(LngDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "pt-BR",
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "Idiom"
    },
    backend: {
      loadPath: `${window.location.pathname}locales/{{lng}}/{{ns}}.json`
    },
    load: "all",
    debug: false
  })

export default i18n
