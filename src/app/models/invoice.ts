export interface Invoice{
  id:number,
  name:string,
  surname:string,
  projectId:number,
  feePaid:number,
  description:string,
  isDeleted:EnumIsDeleted,
  createdAt:Date,
  modifiedAt:Date,
}
enum EnumIsDeleted {
  "No" = 0,
  "Yes" = 1,
}
