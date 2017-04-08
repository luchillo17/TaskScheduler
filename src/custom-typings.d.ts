declare module '*';

declare var ENV;

declare var mainBrowserUrl: string;

interface ListsState {
  selectedScheduleList: string;
  selectedTaskScedule:  string;
}

interface DialogState {
  show: boolean;
  type: string;
}

interface ScheduleList {
  id: string;
  name: String;
  active?: Boolean;
  // taskScheduleIds?: string[];
}

interface ScheduleListFilter {
  (scheduleLists: ScheduleList[]): ScheduleList[];
}

interface TaskSchedule {
  id: string;
  name: string;
  scheduleListId: string;
  useDateRange: boolean;
  start?: Date;
  end?: Date;

  second?: String;
  minute: String;
  hour: String;
  dayOfMonth: String;
  month: String;
  dayOfWeek: String;
  active: Boolean;

  taskIds?: String[];
}

interface Task {

}

interface RXState {
  listsState:         ListsState;
  scheduleLists:      ScheduleList[];
  newListDialogState: boolean;
}
