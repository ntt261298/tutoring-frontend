import toastr from 'toastr';

export const showMessage = (type, title, content) => {
  toastr.remove();
  toastr.options = {
    positionClass: 'toast-top-right',
    progressBar: true,
    closeButton: true,
  };
  switch (type) {
    case 'error':
      toastr.options.timeOut = 5000;
      toastr.error(content, title);
      break;
    case 'warning':
      toastr.options.timeOut = 3000;
      toastr.warning(content, title);
      break;
    case 'info':
      toastr.options.timeOut = 5000;
      toastr.info(content, title);
      break;
    case 'success':
      toastr.options.timeOut = 3000;
      toastr.success(content, title);
      break;
    default:
      break;
  }
};

export const showErrorMsg = (content, title = 'Error') => showMessage('error', title, content);

export const showSuccessMsg = (content, title = 'Success') => showMessage('success', title, content);
