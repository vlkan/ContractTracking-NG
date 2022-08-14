export interface Invoice{
  id:number,
  projectId:number,
  feePaid:number,
  description:string,
  transactionDate:Date,
  isDeleted:EnumIsDeleted,
  createdAt:Date,
  modifiedAt:Date,
}
enum EnumIsDeleted {
  "No" = 0,
  "Yes" = 1,
}
