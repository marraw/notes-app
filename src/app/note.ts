export class Note {
  constructor(public title: string,
    public text: string,
    public important: boolean,
    public id: number | undefined,
    public time: string,
    public date: string
  ) { }
}