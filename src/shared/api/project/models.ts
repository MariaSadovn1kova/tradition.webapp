
export namespace TProject {
  
  export interface IProject {
    id: string
    title: string
    receipts_count: number
    expenses_count: number
  }
  
  export interface ICreateProject {
    title: string
  }
}