import Swal from "sweetalert2";

export function message(title, message) {
  return Swal.fire({
    title: title,
    text: message,
    icon: "question",
    confirmButtonText: "Confirmar",
    confirmButtonColor: "red",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
  });
}
export function messageInfo(title, message, icon) {
  return Swal.fire({
    title: title,
    text: message,
    icon: icon,
    confirmButtonColor:"blue"
  });
}
