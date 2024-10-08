import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import { getCurrentYear } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true"; // 存取 URL ? 後的部分，i.e. 查詢參數

  return (
    <div className="h-screen max-h-screen flex">
      {isAdmin && <PasskeyModal />}

      <section className="my-auto container remove-scrollbar">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />

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
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="max-w-[50%] side-img"
      />
    </div>
  );
}
