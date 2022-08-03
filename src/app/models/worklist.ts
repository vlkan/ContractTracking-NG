export interface WorkList{
  id: number,
  name: string,
  surname: string,
  projectId:number,
  workingHours:number,
  workingDate: Date,
  isDeleted:EnumIsDeleted,
  createdAt:Date,
  modifiedAt:Date,
}

enum EnumIsDeleted {
  "No" = 0,
  "Yes" = 1,
}
