import { UserCredentialsModel } from "../models/userCredentials"
import { ResultRequestModel } from "../models/resultRequest.model"
import { RecoveryPasswordModel } from "../models/recoveryPassword.model"
import HttpService from "./http.service"

const basePath = "/Auth"

export const AuthService = {
  login,
  forgotPassword,
  refreshToken,
  recoveryPassword
}

async function login(data: UserCredentialsModel): Promise<ResultRequestModel> {
  return HttpService.post(`${basePath}/Login`, data)
}

async function forgotPassword(data: string): Promise<ResultRequestModel> {
  return HttpService.post(`${basePath}/ForgotPassword`, JSON.stringify(data))
}

async function refreshToken(data: string): Promise<ResultRequestModel> {
  return HttpService.post(`${basePath}/ForgotPassword`, data)
}

async function recoveryPassword(
  data: RecoveryPasswordModel
): Promise<ResultRequestModel> {
  return HttpService.post(`${basePath}/RecoveryPassword`, data)
}

export default AuthService
