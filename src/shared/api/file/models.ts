export namespace TFile {

  export interface IFile {
    id: number
    name: string
    file_path: string
    object_id: number
    transaction_id: number
  }

  export interface ICreateFile {
    file: File
  }
}