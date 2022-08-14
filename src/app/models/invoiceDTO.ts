export interface InvoiceDTO{
  id:number,
  projectName:string,
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

