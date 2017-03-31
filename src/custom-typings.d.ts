declare module '*';

declare var ENV;

declare var mainBrowserUrl: string;

interface ScheduleList {
  name: String;
  active: Boolean;
  taskSchedules: TaskSchedule[];
}

interface TaskSchedule {
  start?: Date;
  end?: Date;

  second?: String;
  minute: String;
  hour: String;
  dayOfMonth: String;
  month: String;
  dayOfWeek: String;
  active: String;

  tasks?: Task[];
}

interface Task {

}

interface RXState {
  scheduleLists: ScheduleList[];
}
