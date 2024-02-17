import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HealthChartsMainComponent from "@/components/health-charts/healthcharts-main";

const getAuthData = async (cookieValue) => {
  const goalData = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/user/get-user-data`,
    {
      cache: "no-store",
      headers: { auth_cookie: cookieValue },
    }
  );
  const data = await goalData.json();
  if (!data._id) {
    return redirect("/login");
  } else {
    return data;
  }
};

const AccountPage = async ({ params }) => {
  const cookieStore = cookies();
  const auth_cookie = cookieStore.get("auth_cookie");
  const cookieValue =
    auth_cookie && auth_cookie.value ? auth_cookie.value : undefined;
  const data = await getAuthData(cookieValue);

  return (
    <section className="container mx-auto flex justify-center items-center">
      <HealthChartsMainComponent items={params} />
    </section>
  );
};

export default AccountPage;
