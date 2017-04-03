declare module '*';

declare var ENV;

declare var mainBrowserUrl: string;

interface ListsState {
  selectedScheduleList: string;
  selectedTaskScedule:  string;
}

interface ScheduleList {
  id: string;
  name: String;
  active?: Boolean;
  taskScheduleIds?: string[];
}

interface TaskSchedule {
  id: string;
  scheduleListId: string
  start?: Date;
  end?: Date;

  second?: String;
  minute: String;
  hour: String;
  dayOfMonth: String;
  month: String;
  dayOfWeek: String;
  active: String;

  taskIds?: String[];
}

interface Task {

}

interface RXState {
  listsState:         ListsState;
  scheduleLists:      ScheduleList[];
  newListDialogState: boolean;
}
