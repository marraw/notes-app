export class Note {
  constructor(public title: string,
    public text: string,
    public important: boolean,
    public time: string,
    public date: string,
    public id?: number
  ) { }
}