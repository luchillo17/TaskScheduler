declare module '*';

declare var ENV;

declare var mainBrowserUrl: string;

interface ListsState {
  selectedScheduleList: string;
  selectedTaskScedule : string;
  selectedTask        : string;
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

  job?: any;
}

interface Task {
  id: string;
  name: string;
  order: number;
  active: boolean;
  taskScheduleId: string;

  type: string;
}

interface TaskType {
  name: string;
  type: any;
  formSelector: string;
}

interface RXState {
  listsState     : ListsState;
  scheduleLists  : ScheduleList[];
  TaskSchedules  : TaskSchedule[];
  listDialogState: DialogState;
  taskScheduleDialogState: DialogState;
}
