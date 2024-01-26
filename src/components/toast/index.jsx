import React from 'react'
import { toast } from 'react-toastify';

const index = (message, type) => {
    switch (type) {
        case "success":
          return toast.success(
            <>{message}</>,
            {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
          }
          );
        case "error":
          return toast.error(
            <>{message}</>,
            {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            }
          );
        case "warning":
          return toast.warning(
              <>{message}</>,
              {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            }
          );
        default:
          return toast.warning(
              <>Toast not defined...</>,
              {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            }
          );
      }
}

export default index