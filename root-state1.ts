var rootState = {
  type: 'SET_ROOT_STATE',
  payload: {
    listsState: {
      selectedScheduleList: 'c42678a0-2462-11e7-8c3d-1762ba687fe8',
      selectedTaskScedule: '',
      selectedTask: ''
    },
    scheduleLists: [
      {
        id: '',
        name: 'Mostrar todas'
      },
      {
        id: 'c42678a0-2462-11e7-8c3d-1762ba687fe8',
        name: 'List 1',
        active: true,
        taskScheduleIds: []
      },
      {
        id: 'c7c1a0c0-2462-11e7-8c3d-1762ba687fe8',
        name: 'List 2',
        active: true,
        taskScheduleIds: []
      }
    ],
    listDialogState: {
      show: false,
      type: 'NEW'
    },
    tasks: [
      {
        id: '0',
        name: 'Task 1',
        order: 1,
        active: true,
        taskScheduleId: 'caf46a20-2462-11e7-8c3d-1762ba687fe8',
        type: 'base'
      },
      {
        id: '1',
        name: 'Task 2',
        order: 0,
        active: true,
        taskScheduleId: 'caf46a20-2462-11e7-8c3d-1762ba687fe8',
        type: 'base'
      },
      {
        id: '2',
        name: 'Task 3',
        order: 0,
        active: true,
        taskScheduleId: 'caf46a20-2462-11e7-8c3d-1762ba687fe8',
        type: 'base'
      },
      {
        id: '3',
        name: 'Task 4',
        order: 0,
        active: true,
        taskScheduleId: 'd6550320-2462-11e7-8c3d-1762ba687fe8',
        type: 'base'
      }
    ],
    taskSchedules: [
      {
        id: '',
        name: 'Mostrar todas'
      },
      {
        id: 'caf46a20-2462-11e7-8c3d-1762ba687fe8',
        name: 'Schedule 1',
        scheduleListId: 'c42678a0-2462-11e7-8c3d-1762ba687fe8',
        useDateRange: true,
        minute: '*',
        hour: '*',
        dayOfMonth: '*',
        month: '*',
        dayOfWeek: '*',
        active: true,
        start: '2017-04-18T18:13:00.850Z',
        end: '2017-04-18T18:13:00.850Z',
        second: '*'
      },
      {
        id: 'd6550320-2462-11e7-8c3d-1762ba687fe8',
        name: 'Schedule2',
        scheduleListId: 'c42678a0-2462-11e7-8c3d-1762ba687fe8',
        useDateRange: true,
        minute: '*',
        hour: '*',
        dayOfMonth: '*',
        month: '*',
        dayOfWeek: '*',
        active: true,
        start: '2017-04-18T18:14:00.938Z',
        end: '2017-04-18T18:14:00.938Z',
        second: '*'
      },
      {
        id: 'df27ec60-2462-11e7-8c3d-1762ba687fe8',
        name: 'Schedule 3',
        scheduleListId: 'c7c1a0c0-2462-11e7-8c3d-1762ba687fe8',
        useDateRange: true,
        minute: '*',
        hour: '*',
        dayOfMonth: '*',
        month: '*',
        dayOfWeek: '*',
        active: true,
        start: '2017-04-18T18:14:00.742Z',
        end: '2017-04-18T18:14:00.742Z',
        second: '*'
      }
    ],
    taskScheduleDialogState: {
      show: false,
      type: 'NEW'
    }
  }
}