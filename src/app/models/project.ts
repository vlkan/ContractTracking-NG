export interface Project{
  Id:number,
  Name:string,
  Type:ProjectType,
  SubType:string,
  EmployeeOwnerId:number,
  CustomerOwnerId:number,
  Description:string,
  ContractBudget:number,
  CurrencyType:CurrencyTypeE,
  ContractTerm:number,
  ContractStartDate:Date,
  WorkerDay:number,
  WorkerHour:number,
  IsDeleted:EnumIsDeleted,
  CreatedAt:Date,
  ModifiedAt:Date
}

enum ProjectType
{
    System = 1,
    Software = 2,
    SystemAndSoftware = 3,
}

enum CurrencyTypeE
{
    TurkishLira = 1,
    Dollar = 2,
    Euro = 3,
    Pound = 4,
}

enum EnumIsDeleted {
  No = 0,
  Yes = 1,
}
