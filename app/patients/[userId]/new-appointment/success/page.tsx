import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime, getCurrentYear } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// http://localhost:3000/patients/66e939a1000fb5a1a477/new-appointment/success?appointmentId=66e93c2d00077b087600
const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  // 向 server 請求單筆預約的資料
  const appointmentId = (searchParams?.appointmentId as string) || ""; // 從 URL 存取 appointmentId
  const appointment = await getAppointment(appointmentId); // 透過 appointmentId

  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );

  return (
    <div className="px-[5%] flex max-h-screen h-screen">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="mb-6 header max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We will be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details:</p>

          <div className="flex item-center gap-3">
            <Image
              src={doctor?.image!}
              height={100}
              width={100}
              alt="doctor"
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p>{formatDateTime(appointment?.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">© {getCurrentYear()} CarePulse</p>
      </div>
    </div>
  );
};
export default Success;
