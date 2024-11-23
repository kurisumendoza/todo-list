import { taskModal } from './selectors';

export class TaskModal {
  constructor() {}

  openModal() {
    taskModal.modal.showModal();
  }

  closeModal() {
    taskModal.modal.close();
  }
}
