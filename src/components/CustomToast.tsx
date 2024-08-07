import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function CustomToast() {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      toastClassName={() => 'relative py-4 px-2 text-stone-900 dark:text-stone-100 bg-stone-200 dark:bg-stone-900 flex itens-center justify-between overflow-hidden cursor-pointer'}
      bodyClassName={() => 'text-stone-900 dark:text-stone-100 bg-stone-200 dark:bg-stone-900 flex'}
    />
  )
}


