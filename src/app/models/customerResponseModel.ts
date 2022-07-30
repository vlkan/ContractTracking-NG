import { Customer } from "./customer";
import { ResponseModel } from "./responseModel";

export interface CustoemrResponseModel extends ResponseModel{
  data:Customer[],
}
