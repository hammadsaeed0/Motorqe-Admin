import Swal from "sweetalert2";
import { toast } from "react-toastify";
import api from "./api";

const deleteModal = (endpoint, mId,update) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
     await toast.promise(api.delete(endpoint + mId), {
        pending: "Please wait...",
        success: "Deleted! Your data has been deleted.",
        //   error: 'Promise rejected 🤯'
      });
      //   const id = toast.loading("Please wait...");
      //   api.delete(endpoint + mId).then((response) => {
      //     toast.update(id, { render: "Deleted! Your data has been deleted.", type: "success", isLoading: false });
      //   })
      update()
    }
   
  });
};

export default deleteModal;
