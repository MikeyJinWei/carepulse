import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.action";
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
      <section className="my-auto container remove-scrollbar">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />

          <div className="mt-20 flex justify-between xl:text-left text-14-regular">
            <p className="justify-items-end text-dark-600">
              © {getCurrentYear()} Carepulse
            </p>

            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
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
