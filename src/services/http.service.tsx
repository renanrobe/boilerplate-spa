import axios from "axios"
import appsettings from "../configs/appsettings.json"
import storageService from "./storage.service"
import { ToastService } from "./toast.service"
import i18n from "../i18n"

let showError = true
let alertSessionExpired = false

const HttpService = axios.create({
  baseURL: appsettings.API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  }
})

function BuildAuth() {
  const accessToken = storageService.getAccessToken()
  return accessToken
}

HttpService.interceptors.request.use((config) => {
  let authentication = BuildAuth()
  if (authentication != null) {
    config.headers.authorization = `Bearer ${authentication}`
  }

  return config
})

HttpService.interceptors.response.use(
  function (response) {
    ;(response.data.messages || []).forEach((resultMessage) => {
      if (resultMessage.message) {
        resultMessage.message = resultMessage.message.replaceAll("P0001: ", "")
        const t = i18n.t
        switch (resultMessage.type) {
          case 0:
          case "ERROR":
            ToastService.error(t(resultMessage.message))
            break
          case 1:
          case "WARNING":
            ToastService.warn(t(resultMessage.message), null)
            break
          case 2:
          case "INFO":
            ToastService.info(t(resultMessage.message), null)
            break
          case 3:
          case "SUCCESS":
            ToastService.success(t(resultMessage.message))
            break
          default:
            ToastService.info(t(resultMessage.message), null)
            break
        }
      }
    })
    if (response.data.redirectRoute) {
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    }
    return response.data
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      if (alertSessionExpired === false) {
        alertSessionExpired = true
        localStorage.clear()

        setTimeout(() => {
          window.location.reload()
          alertSessionExpired = false
        }, 1000)
      }
    } else {
      if (showError) {
        showError = false
      }
      setTimeout(() => {
        showError = true
      }, 3000)
    }
    return Promise.reject(error)
  }
)

export default HttpService
