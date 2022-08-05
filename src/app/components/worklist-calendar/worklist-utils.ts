import { EventInput } from '@fullcalendar/angular';
import { WorkList } from 'src/app/models/worklist';
import { WorklistService } from 'src/app/services/worklist.service';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: "2",
    title: 'Eren',
    start: new Date().toISOString().replace(/T.*$/, '')
  },
];

export function createEventId() {
  return String(eventGuid++);
}
