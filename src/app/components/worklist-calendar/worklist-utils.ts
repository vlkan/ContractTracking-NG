import { EventInput } from '@fullcalendar/angular';
import { WorkList } from 'src/app/models/worklist';
import { WorklistService } from 'src/app/services/worklist.service';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'Test',
    start: TODAY_STR
  },
  {
    id: createEventId(),
    title: 'Test',
    start: TODAY_STR + 'T12:00:00'
  }
];

export function createEventId() {
  return String(eventGuid++);
}

export class DateUtil{
  workList: WorkList[]=[]
  constructor(private workListService: WorklistService){
    this.getWorkList()
  }
  getWorkList(){
    this.workListService.getWorkLists().subscribe((response) => {
      this.workList = response.data;
      console.log(response);
    });
  }
  // static eventParser(workListt: WorkList[], convList: EventInput[]){
  //   for(let i=0; i<workListt.length; i++){
  //     convList.push({id:String(workListt[0]),start:Date(workListt[5])})
  //   }
  //   return convList
  // }
}
