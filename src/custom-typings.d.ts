declare module '*';
declare var ENV;
declare var IS_NODE;

declare var mainBrowserUrl: string;


interface NotificationParams extends NotificationOptions{
  title: string;
  duration?: number;
}

interface MailConfig {
  service: string;
  user: string;
  pass: string;
}

interface MailMessage {
  to: string
  html: string
  text?: string
  from?: string
  subject?: string
}

interface ListsState {
  selectedScheduleList: string;
  selectedTaskSchedule: string;
  selectedTask        : string;
}

interface DialogState {
  show: boolean;
  type?: string;
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

  mailNotify: boolean;
  mailAddress: string;

  job?: any;
}

type CrudMethod = 'NEW' | 'UPDATE';
type Direction = 'FROM_MEMORY' | 'TO_MEMORY' | 'MEMORY_TO_MEMORY';

interface Task {
  id: string;
  name: string;
  order: number;
  active: boolean;
  taskScheduleId: string;

  type: TaskType;

  crudMethod?: CrudMethod;
  direction?: Direction;
  data?: any;

  [key: string]: any;
}

interface TaskType {
  name: string;
  type: string;
  component: any;
  executor: any;
}

interface TaskExecutor {
  executeTask(task: Task, data?: any[], taskIndex?: number): Promise<any|Error>;
}

interface RXState {
  mailConfig: MailConfig;

  tasks        : Task[];
  listsState   : ListsState;
  currentTask  : Task;
  TaskSchedules: TaskSchedule[];
  scheduleLists: ScheduleList[];

  taskDialogState: DialogState
  listDialogState: DialogState;
  taskScheduleDialogState: DialogState;
}

interface MapFormat {
  type?: 'array' | 'map'
  from?: string
  to?: string
  defaultVal?: any
  isPick?: boolean

  array?: MapFormat
  addChildren?: MapFormat[];
  removeChildren?: string | string[];
  children?: MapChild
  childrenArray?: MapFormat
}

interface MapChild {
  [key: string]: MapFormat
}
