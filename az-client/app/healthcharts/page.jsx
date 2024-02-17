import { redirect } from "next/navigation";

const AccountPage = () => {
  return redirect("/healthcharts/bmi");
};

export default AccountPage;
