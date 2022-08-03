export interface Project{
  id:number,
  name:string,
  type:ProjectType,
  subType:string,
  employeeOwnerId:number,
  customerOwnerId:number,
  description:string,
  contractBudget:number,
  currencyType:CurrencyTypeE,
  contractTerm:number,
  contractStartDate:Date,
  workerDay:number,
  workerHour:number,
  isDeleted:EnumIsDeleted,
  createdAt:Date,
  modifiedAt:Date
}

enum ProjectType
{
    "System" = 1,
    "Software" = 2,
    "SystemAndSoftware" = 3,
}

enum CurrencyTypeE
{
    "Turkish Lira" = 1,
    "Dollar" = 2,
    "Euro" = 3,
    "Pound" = 4,
}

enum EnumIsDeleted {
  "No" = 0,
  "Yes" = 1,
}
