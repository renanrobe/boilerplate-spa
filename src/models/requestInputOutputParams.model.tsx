import { DatasetModel } from "./dataset.model"

export interface RequestInputOutputParamsModel {
  auth?: any // Dictionary<string, object>
  datasets?: DatasetModel[]
  parameters?: any // Dictionary<string, object>
}

export const RequestInputOutputParamsModelDefault: RequestInputOutputParamsModel =
  {
    auth: null,
    datasets: [
      {
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
    ],
    parameters: null
  }
