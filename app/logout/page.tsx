"use server";
import { signOut } from "@/auth";

export default function SignOutPage() {
  return (
    <div>
      <h5>Você tem certeza que deseja sair?</h5>
      <form
        action={async (formData) => {
          await signOut();
        }}
      >
        <button type="submit">Sair</button>
      </form>
    </div>
  );
}
