export interface Customer{
  Id:number,
  Name:string,
  Email:string,
  Description:string,
  Type:CustomerType,
  Phone:string,
  IsDeleted:EnumIsDeleted,
  CreatedAt:Date,
  ModifiedAt:Date,

}

enum CustomerType{
  Individual = 1,
  Corporate = 2,
}

enum EnumIsDeleted {
  No = 0,
  Yes = 1,
}

