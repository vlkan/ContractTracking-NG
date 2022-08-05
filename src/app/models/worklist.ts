export interface WorkList{
  id: number,
  name: string,
  surname: string,
  projectId:number,
  workingHours:number,
  start: Date,
  isDeleted:EnumIsDeleted,
  createdAt:Date,
  modifiedAt:Date,
}

enum EnumIsDeleted {
  "No" = 0,
  "Yes" = 1,
}
