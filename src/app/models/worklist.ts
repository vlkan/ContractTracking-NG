export interface WorkList{
  id: number,
  employeeId:number
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
