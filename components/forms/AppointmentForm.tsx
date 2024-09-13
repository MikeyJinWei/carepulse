"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.action";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";

type AppointmentFormProps = {
  type: "create" | "cancel" | "schedule";
  userId: string;
  patientId: string;
};

const AppointmentForm = ({ type, userId, patientId }: AppointmentFormProps) => {
  const router = useRouter();

  // 表單提交裝態
  const [isLoading, setIsLoading] = useState(false); // 之後嘗試看看 useTransition
  // 表單欄位狀態管理
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  // 表單提交 req
  const onSubmit = async ({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const userData = {
        name,
        email,
        phone,
      }; // 檢查必要表單資料 truthy, falsy

      // fetch api
      const newUser = await createUser(userData); // 將 variable 修正成更明確的 naming

      if (newUser) router.push(`/patients/${newUser.$id}/register`); // 重導路由
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false); // 結束提交狀態
  };

  // 依據使用者目的決定提交按鈕內文
  let buttonLabel;

  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-2 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">
            Request a new appointment in 10 seconds
          </p>
        </section>

        {/* 根據使用者目的條件渲染表單元素 */}
        {type !== "cancel" && (
          <>
            {/* select */}
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="doctor"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem value={doctor.name} key={doctor.name}>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Image
                      src={doctor.image}
                      height={32}
                      width={32}
                      alt="doctor"
                      className="border rounded-full border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="reason"
                label="Reason for appointment"
                placeholder="Enter reason for appointment, ex: Annual montly check-up"
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="notes"
                label="Additional comments/notes"
                placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg"
              />
            </div>
          </>
        )}

        {type == "cancel" && (
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Enter reason for cancellation, ex: Work overtime"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
export default AppointmentForm;
