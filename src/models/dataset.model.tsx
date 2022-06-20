import { PaginationModel } from "./pagination.model"

export interface DatasetModel {
  dataset: string
  pagination?: PaginationModel
  filters?: any
  sort?: any
  data?: any
  dataHeader?: any
}

export const DatasetDefault: DatasetModel = {
  dataset: "",
  pagination: {
    page_number: 1,
    total_pages: 1,
    records_pages: 10,
    total_records: 0
  },
  sort: {
    field: "",
    orientation: "asc"
  },
  filters: null,
  data: null
}
