import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const showGameCompleteAlert = (
  alertText,
  handleConfirm = () => null
) => {
  MySwal.fire({
    title: <p>Congratulations!</p>,
    text: alertText,
    icon: "success",
    confirmButtonText: `
    <i class="fa fa-thumbs-up"></i> Great!
  `,
  }).then((result) => {
    if (result.isConfirmed) {
      handleConfirm();
    }
  });
};
