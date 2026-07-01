// Imports
import { SITE_CONTENT } from "../../../constants";

//
export const LoginForm = () => {
  return (
    //
    <section
      id="login-form"
      className="w-1/2 h-full bg-bg-base border-l border-border-subtle flex items-center justify-center"
    >
      {/*  */}
      <form className="w-[75%] flex flex-col gap-y-2 border">
        {/*  */}
        <h2 className="primary-title text-headline-lg">
          {SITE_CONTENT.login.form.title}
        </h2>

        {/*  */}
        <p className="primary-subtitle">{SITE_CONTENT.login.form.subtitle}</p>
      </form>
    </section>
  );
};
