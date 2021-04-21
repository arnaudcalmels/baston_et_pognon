import { toast } from "react-toastify";

export const setErrorToasts = (errors) => {
  let index = 1;
  let time = 2000 * index;
  errors.forEach( error => {
    toast.error(error, { 
      autoClose: time,
      position: toast.POSITION.BOTTOM_RIGHT
     });
    index++;
  });
};

export const setSuccessToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT
  })
}