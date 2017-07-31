import {
  Component,
  OnDestroy,
  HostBinding,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { ConfirmationService } from 'primeng/primeng';
import { Observable, Subject, Subscription } from 'rxjs';

import { v1 as uuidV1 } from 'uuid';

@Component({
  selector: 'folder',
  styleUrls: [ './folder.component.scss' ],
  templateUrl: './folder.component.html',
  // encapsulation: ViewEncapsulation.None,
})
export class FolderComponent implements AfterViewInit, OnDestroy {
  @HostBinding('id') private id = 'folder-panel';

  private listsState$: Subscription;
  private folders$: Subscription;
  private taskSchedules$: Subscription;
  private folderDialogState$: Subscription;

  public selectedFolderId = '';

  public folderDialogState: DialogState = { show: false, type: 'NEW' };

  public folders: Folder[] = [];
  public taskSchedules: TaskSchedule[] = [];

  // NewListDialog
  public folderDialogForm: FormGroup;

  constructor(
    private confirmDialogService: ConfirmationService,
    private store: Store<RXState>,
    private fb: FormBuilder,
  ) {
    this.folderDialogForm = this.fb.group({
      id: [uuidV1(), Validators.required],
      name: ['', [Validators.required, , Validators.minLength(4)]],
      active: [true, Validators.required],
    });

    this.folders$ = this.store.select<Folder[]>('folders')
      .subscribe((folders) => {
        this.folders = folders;
      });

    this.taskSchedules$ = this.store.select<TaskSchedule[]>('taskSchedules')
      .subscribe((taskSchedules) => {
        this.taskSchedules = taskSchedules;
      });

    this.listsState$ = this.store.select<ListsState>('listsState')
      .subscribe((listsState) => {
        this.selectedFolderId = listsState.selectedFolder;
      });
  }

  public ngAfterViewInit() {
    this.folderDialogState$ = this.store
      .select<DialogState>('folderDialogState')
      .subscribe((folderDialogState) => {
        this.folderDialogState = folderDialogState;
      });
  }

  public ngOnDestroy() {
    this.listsState$.unsubscribe();
    this.folders$.unsubscribe();
    this.taskSchedules$.unsubscribe();
    this.folderDialogState$.unsubscribe();
  }

  public setSelectedFolder(scheduleList: Folder) {
    this.store.dispatch({
      type: 'SHOW_LIST',
      payload: scheduleList.id,
    });
  }

  public toggleFolderDialog(isShow: boolean) {
    this.folderDialogForm.reset({
      id: uuidV1(),
      name: '',
      active: true,
    });
    this.store.dispatch({
      type: isShow ? 'SHOW_LIST_DIALOG' : 'HIDE_LIST_DIALOG',
      payload: this.folderDialogState.type,
    });
  }
  public openFolderDialog(type: string) {
    switch (type) {
      case 'UPDATE':
        if (this.selectedFolderId === '') return;
        const selectedFolder = this.folders
          .find((folder) => folder.id === this.selectedFolderId);

        this.folderDialogForm.reset({
          id: selectedFolder.id,
          name: selectedFolder.name,
          active: selectedFolder.active,
        });
        break;
      case 'DELETE':
        if (this.selectedFolderId === '') return;

        const folderToDelete = this.folders
          .find((folder) => folder.id === this.selectedFolderId);

        this.confirmDialogService.confirm({
          message: `¿Esta seguro que desea borrar la carpeta ${folderToDelete.name}?`,
          header: 'Confirmar borrado carpeta',
          icon: 'fa fa-trash',
          accept: () => {
            const taskSchedulesDeletedIds = this.taskSchedules
              .filter(taskSchedule => taskSchedule.folderId === folderToDelete.id)
              .map(taskSchedule => taskSchedule.id)
              .forEach(id => {
                this.store.dispatch({
                  type: 'DELETE_TASK_BY_TASK_SCHEDULE_ID',
                  payload: id,
                });
              });
            this.store.dispatch({
              type: 'DELETE_TASK_SCHEDULES_BY_FOLDER_ID',
              payload: folderToDelete.id,
            });
            this.store.dispatch({
              type: 'DELETE_LIST',
              payload: folderToDelete,
            });
          },
        });

        return;

      case 'NEW':
      default:
        this.folderDialogForm.reset({
          id: uuidV1(),
          name: '',
          active: true,
        });
        break;
    }
    this.store.dispatch({
      type: 'SHOW_LIST_DIALOG',
      payload: type,
    });
  }

  public saveFolderDialog() {
    switch (this.folderDialogState.type) {
      case 'UPDATE':
        if (this.folderDialogForm.invalid) {
          return;
        }
        this.store.dispatch({
          type: 'UPDATE_LIST',
          payload: this.folderDialogForm.value,
        });

        break;

      case 'NEW':
      default:
        if (this.folderDialogForm.invalid) {
          return;
        }
        this.store.dispatch({
          type: 'ADD_LIST',
          payload: this.folderDialogForm.value,
        });
        break;
    }
    this.toggleFolderDialog(false);
  }
}
