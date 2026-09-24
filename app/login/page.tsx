import LoginForm from "@/components/client/login/LoginForm";
import SignupForm from "@/components/client/login/SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <article className="h-full w-full ">
      <h2>Login Page</h2>
      <section className="flex items-center justify-center h-full w-full md:p-24 p-8">
        <Tabs defaultValue="login" className="w-full min-h-160 max-w-xl">
          <TabsList className="w-full my-4 ">
            <TabsTrigger
              value="login"
              className="dark:data-active:bg-muted-foreground dark:data-active:text-muted"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="dark:data-active:bg-muted-foreground dark:data-active:text-muted"
            >
              SignUp
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </section>
    </article>
  );
}
