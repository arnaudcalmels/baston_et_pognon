import { toast } from "react-toastify";

export const setErrorToasts = (errors) => {
  let index = 1;
  for (const error in errors) {
    let time = 2000 * index;
    toast.error(`${error}: ${errors[error]}`, { 
      autoClose: time,
      position: toast.POSITION.BOTTOM_RIGHT
     });
    index++;
  }
};

export const setSuccessToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT
  })
}