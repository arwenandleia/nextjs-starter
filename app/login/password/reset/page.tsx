import ChangePasswordForm from "@/components/client/login/ChangePasswordForm";

type SearchParamsType = {
  token?: string;
  error?: string;
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) {
  const { token, error } = await searchParams;

  if (!token || error) {
    return (
      <article className="w-full h-full flex items-center justify-center">
        <section className="max-w-xl min-w-sm">
          <h2>Unable to reset password</h2>
        </section>
      </article>
    );
  }

  return (
    <article className="w-full h-full flex items-center justify-center">
      <section className="max-w-xl min-w-sm">
        <ChangePasswordForm token={token} />
      </section>
    </article>
  );
}
