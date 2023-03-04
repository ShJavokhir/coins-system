import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginWrapper } from "./Login.style";
import ButtonLoader from "../../Common/ButtonLoader";
import { useContextSelector } from "use-context-selector";
import UserContext from "../../../Context/UserContext";
import { useRouter } from "next/router";
import AuthProvider from "../../../Data/AuthProvider";
import { toast } from "react-toastify";
import ParticlesComponent from "../../Common/ParticlesJs"

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  const { isAuth, user: currentUser } = useContextSelector(
    UserContext,
    (ctx) => ctx.state
  );
  const loginContext = useContextSelector(
    UserContext,
    (ctx) => ctx.actions.login
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(currentUser);
    console.log(isAuth);
    if (isAuth && currentUser) {
      switch (currentUser.roles) {
        case "ROLE_ADMIN": {
          router.replace("/dashboard/groups");
          break;
        }
        case "ROLE_TEACHER": {
          router.replace("/dashboard/teacher/groups");
          break;
        }
        case "ROLE_DIRECTOR": {
          router.replace("/dashboard/reytingDirector");
          break;
        }
        case "ROLE_SEO": {
          router.replace("/dashboard/seoStatistika");
          break;
        }
        case "ROLE_EDUCATION_DEPARTMENT": {
          router.replace("/dashboard/eduStatistika");
          break;
        }
        case "ROLE_SUNDAY_EVENT": {
          router.replace("/dashboard/dash");
          break;
        }
        case "ROLE_STUDENT": {
          router.replace("/dashboard/reyting");
          break;
        }
        case "ROLE_ADDITION_LESSON": {
          router.replace("/dashboard/addition");
          break;
        }
      }
    }
  }, [isAuth, currentUser]);

  const onSubmit = (values) => {
    const body = { username: values.name, password: values.password };
    setLoading(true);
    AuthProvider.login(body)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        loginContext(data);
      })
      .catch((err) => {
          toast.error("Login yoki parol noto'g'ri!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
    <ParticlesComponent/>
    <LoginWrapper>
      <div className="main">
        <div className="left">
          <img src="images/logo1.png" alt="" />
        </div>
        <div className="right">
        <h4>Kirish</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <label>Login</label>
            <input
              type="text"
              autoComplete="off"
              {...register("name", { required: true })}
            />
          </div>
          <div className="input">
            <label>Parol</label>
            <input
              type="password"
              autoComplete="off"
              {...register("password", { required: true })}
            />
          </div>
          <button disabled={loading} type="submit" className="loginBtn">
            Kirish
            {loading && <ButtonLoader />}
          </button>
        </form>
        </div>
      </div>
    </LoginWrapper>
    </>
  );
};

export default Login;
