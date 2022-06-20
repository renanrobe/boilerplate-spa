import { ResultMessageModel } from "./resultMessage.model"

export interface ResultRequestModel {
  success: boolean
  messages?: ResultMessageModel[]
  result: any
  redirectRoute?: string
}
