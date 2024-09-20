import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import { getCurrentYear } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Register = async (
  {
    /* 從路由解構使用者的 id */
    params: { userId },
  }: SearchParamProps /* http://localhost:3000/patients/66dffcfa0036a2e1c4bd/register */
) => {
  const user = await getUser(userId); // 傳入 userId 至 action function 取得使用者資料

  return (
    <div className="h-screen max-h-screen flex">
      <section className="container remove-scrollbar">
        <div className="sub-container max-w-[860px] flex-1">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />

          <p className="py-12 copyright">© {getCurrentYear()} Carepulse</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="max-w-[390px] side-img"
      />
    </div>
  );
};
export default Register;
