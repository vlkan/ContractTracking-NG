export interface Customer{
  id:number,
  name:string,
  email:string,
  description:string,
  type:CustomerType,
  phone:string,
  isDeleted:EnumIsDeleted,
  createdAt:Date,
  modifiedAt:Date,
}

enum CustomerType{
  Individual = 1,
  Corporate = 2,
}

enum EnumIsDeleted {
  No = 0,
  Yes = 1,
}

