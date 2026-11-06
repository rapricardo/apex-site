const dialogs = document.querySelectorAll<HTMLDialogElement>('dialog');
let dialogOpener: HTMLElement | null = null;
function openDialog(id: string, trigger: HTMLElement) {
  const dialog = document.getElementById(id) as HTMLDialogElement | null;
  if (!dialog) return;
  const previousOpener = dialogOpener;
  dialogs.forEach(item => { if (item.open) item.close(); });
  dialogOpener = trigger.closest('dialog') ? previousOpener : trigger;
  dialog.showModal();
  dialog.scrollTop = 0;
}
document.querySelectorAll<HTMLElement>('[data-dialog]').forEach(button => {
  button.addEventListener('click', () => openDialog(button.dataset.dialog!, button));
});
dialogs.forEach(dialog => {
  dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (![...dialogs].some(item => item.open)) dialogOpener?.focus({ preventScroll: true });
  });
});
