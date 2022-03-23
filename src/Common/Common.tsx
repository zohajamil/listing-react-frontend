
import { NOTIFICATION_TYPE, Store } from "react-notifications-component";

export const apiUrl = "http://localhost:5000/grocery-items-management/asia-south1/api/";

export const isSuccessCode = (code: number): boolean => {
  if (code >= 200 && code < 300) {
    return true;
  } else {
    return false;
  }
};

export const addNotificationToApp = (
    title: string,
    message: string,
    type: NOTIFICATION_TYPE
  ) => {
    Store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "bottom",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        showIcon: true,
      },
    });
  };
  