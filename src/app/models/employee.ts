export interface Employee{
  id:number,
  name:string,
  surname:string,
  email:string,
  jobTitle:string,
  startDate:Date,
  isDeleted:EnumIsDeleted,
  createdAt:Date,
  modifiedAt:Date,
}
enum EnumIsDeleted {
  "No" = 0,
  "Yes" = 1,
}
