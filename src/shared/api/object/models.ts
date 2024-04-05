export namespace TObject {

  export interface IObject {
    id: number
    title: string
    descr: string|null
    project_id: number
    receipts_count: number
    expenses_count: number
  }

  export interface ICreateObject {
    title: string
    descr?: string|null
    project_id: string
  }
}