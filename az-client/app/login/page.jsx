import LoginForm from "../../components/auth/loginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getAuthData = async (cookieValue) => {
  console.log(process.env.NEXT_PUBLIC_SERVER_URL);
  const goalData = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/get-user-data`,
    {
      cache: "no-store",
      headers: { auth_cookie: cookieValue },
    }
  );
  const data = await goalData.json();

  if (data._id) {
    return redirect("/account/info");
  } else {
    return data;
  }
};

const Login = async () => {
  const cookieStore = cookies();
  const auth_cookie = cookieStore.get("auth_cookie");
  const cookieValue =
    auth_cookie && auth_cookie.value ? auth_cookie.value : undefined;
  const data = await getAuthData(cookieValue);

  return (
    <div>
      <>
        <title>ورود به حساب</title>
        <meta name="robots" content="index,follow" />
        <meta name="description" content="ورود به حساب" />
        <link rel="canonical" href="http://localhost:3000/login" />
      </>
      <LoginForm />
    </div>
  );
};

export default Login;
