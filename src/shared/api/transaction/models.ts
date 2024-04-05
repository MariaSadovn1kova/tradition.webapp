
export namespace TTransaction {
  
  export interface ITransaction {
    id: string
    title?: string
    type: string
    sort: string
    amount: number
    descr?: string
    sender?: string
    comment?: string
    date: Date
    project_id?: number
    object_id?: number
  }
  
  export interface ICreateTransaction {
    title?: string | null
    type: string
    sort: string | null
    amount: number
    descr?: string | null
    sender?: string | null
    comment?: string | null
    date: Date
    project_id?: string
    object_id?: string
  }
}