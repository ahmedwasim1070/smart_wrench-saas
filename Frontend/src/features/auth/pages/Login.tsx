// Imports
import { Header } from "../../../components/Header";
import { LoginForm } from "../components/LoginForm";
import { LoginHero } from "../components/LoginHero";

//
const Login = () => {
  return (
    <section id="login" className="flex min-h-screen">
      <Header />

      <div className="flex flex-1">
        {/*  */}
        <LoginHero />

        {/*  */}
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
