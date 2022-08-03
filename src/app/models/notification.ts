export interface Notification{
  id:number,
  type:NotificationType,
  message:string,
  isDeleted:EnumIsDeleted,
  createdAt:Date,
  modifiedAt:Date,
}
enum NotificationType{
  "Payment" = 1,
  "NewCustomer" = 2,
  "NewProject" = 3,
  "ProjectExpiration" = 4,
}

enum EnumIsDeleted {
  "No" = 0,
  "Yes" = 1,
}
