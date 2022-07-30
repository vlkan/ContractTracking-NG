import { Project } from "./projcet";
import { ResponseModel } from "./responseModel";

export interface ProjectResponseModel extends ResponseModel{
  data:Project[],
}
