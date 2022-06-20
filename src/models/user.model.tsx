import { IdiomModel } from "./idiom.model"
import { LocaleModel } from "./locale.model"

export interface UserModel {
  id: number
  email: string
  login: string
  fullName: string
  isActive: boolean
  isActiveString: string
  isBlocked: boolean
  localeId: number
  idiomId: number
  updatedAt?: string
  profileId: number

  locale?: LocaleModel
  idiom?: IdiomModel
  profile?: any
}
