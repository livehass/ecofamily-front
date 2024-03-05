import { redirect } from "react-router-dom";
import { destroy } from "../../service/Service";
import UserLogin from "../../model/UserLogin";
import { toasts } from "../../util/toasts";

export default async function categoryDelete({ params }) {
  const token =
    sessionStorage.getItem("userLogin") !== null
      ? (JSON.parse(sessionStorage.getItem("userLogin") as string) as UserLogin)
          .token
      : null;

  if (token === null) return redirect("/login");

  await destroy(`categorias/${params.id}`, {
    headers: {
      Authorization: token,
    },
  });
  toasts("Categoria deletada com sucesso", "success");
  return redirect("/categorias");
}
