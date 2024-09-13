import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.action";
import { getCurrentYear } from "@/lib/utils";
import Image from "next/image";

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const patient = await getPatient(userId); // 存取病人資料

  return (
    <div className="h-screen max-h-screen flex">
      <section className="my-auto container remove-scrollbar">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            type="create" // 彈性控制新增 or 取消預約
            userId={userId} // 帳戶 id
            patientId={patient.$id} // 提供病人 id 供索引
          />

          <p className="py-12 mt-10 copyright">
            © {getCurrentYear()} Carepulse
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="max-w-[390px] side-img bg-bottom"
      />
    </div>
  );
}
