export interface WorkListDTO{
  id: number,
  employeeName:string
  employeeSurName:string
  projectName:string,
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
