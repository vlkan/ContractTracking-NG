export interface Payment{
  id:number,
  name:string,
  surname:string,
  projectId:number,
  employeeId:number,
  feePaid:number,
  remainingBudget:number,
  description:string,
  isDeleted:EnumIsDeleted,
  createdAt:Date,
  modifiedAt:Date,
}
enum EnumIsDeleted {
  "No" = 0,
  "Yes" = 1,
}
