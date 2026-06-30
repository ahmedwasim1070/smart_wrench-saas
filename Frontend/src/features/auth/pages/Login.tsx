// Imports
import { Header } from "../../../components/Header";
import { LoginForm } from "../components/LoginForm";
import { LoginHero } from "../components/LoginHero";

//
const Login = () => {
  return (
    <section>
      <Header />

      <div className="flex flex-row items-center w-full h-180">
        {/*  */}
        <LoginHero />

        {/*  */}
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
