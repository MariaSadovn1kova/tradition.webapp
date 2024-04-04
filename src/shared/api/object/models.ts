export namespace TObject {

  export interface IObject {
    id: number;
    title: string;
    descr: string|null;
    project_id: number;
  }

  export interface ICreateObject {
    title: string;
    descr: string|null;
    project_id: number;
  }
}