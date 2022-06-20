import HttpService from "./http.service"
import { RequestInputOutputParamsModel } from "../models/requestInputOutputParams.model"
const basePath = "/User"

export const UserService = {
  getAll,
  getList,
  insert,
  update,
  del,
  getById,
  remove,
  insertOrUpdate
}

async function getAll() {
  return HttpService.get(basePath)
}

async function insertOrUpdate(data) {
  return HttpService.post(`${basePath}/create`, data)
}

async function insert(data) {
  return HttpService.post(`${basePath}`, data)
}

async function update(data) {
  return HttpService.put(basePath, data)
}

async function del(data) {
  return HttpService.delete(basePath, { data })
}

async function remove(data) {
  return HttpService.post(`${basePath}/remove`, data)
}

async function getById(id) {
  return HttpService.get(`${basePath}/${id}`)
}

async function getList(data: RequestInputOutputParamsModel) {
  return HttpService.post(`${basePath}/ListWithPagination`, data)
}

export default UserService
