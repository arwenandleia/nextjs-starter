import PasswordResetEmailForm from "@/components/client/login/PasswordResetEmailForm";

export default function page() {
  return (
    <article className="w-full h-full flex items-center justify-center">
      <section className="max-w-xl min-w-sm">
        <PasswordResetEmailForm />
      </section>
    </article>
  );
}
