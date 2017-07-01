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
  selectedFolder: string;
  selectedTaskSchedule: string;
  selectedTask        : string;
}

interface DialogState {
  show: boolean;
  type?: string;
}

interface Folder {
  id: string;
  name: String;
  active?: Boolean;
  // taskScheduleIds?: string[];
}

interface ScheduleListFilter {
  (scheduleLists: Folder[]): Folder[];
}

interface TaskSchedule {
  id: string;
  name: string;
  folderId: string;
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
  scheduleLists: Folder[];

  taskDialogState: DialogState
  listDialogState: DialogState;
  taskScheduleDialogState: DialogState;
}

interface ErrorFormat {
  type: 'hasProperty' | 'hasValue' | 'lacksValue' | 'array' | 'map'
  to?: string
  value?: any
  mapSelf?: boolean
  returnValue?: any | undefined
  children?: ErrorChild
  childrenArray?: ErrorFormat
}

interface ErrorChild{
  [key: string]: ErrorFormat
}

interface MapFormat {
  type?: 'array' | 'map' | 'assign' | 'parse'
  from?: string
  to?: string
  defaultVal?: any
  isPick?: boolean

  array?: MapFormat
  filterBy?: FilterChild
  addChildren?: MapFormat[];
  removeChildren?: string | string[];
  children?: MapChild
  childrenArray?: MapFormat
}

interface FilterChild {
  to: string
  value: any
}

interface MapChild {
  [key: string]: MapFormat
}
