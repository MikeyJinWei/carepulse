"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { createAppointment } from "@/lib/actions/appointment.actions";

type AppointmentFormProps = {
  type: "create" | "cancel" | "schedule";
  userId: string;
  patientId: string;
};

const AppointmentForm = ({ type, userId, patientId }: AppointmentFormProps) => {
  const router = useRouter();

  // 表單
  const AppointmentFormValidation = getAppointmentSchema(type); // 初始化表單綱要

  const [isLoading, setIsLoading] = useState(false); // 表單提交狀態

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(Date.now()),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  }); // 表單欄位狀態管理

  // 表單提交 req
  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);

    // status variable 控制使用者想對表單做什麼操作
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
      default:
        status = "pending";
    }

    try {
      // if...else 依據使用者想操作的類別實現邏輯
      // 提交預約前先檢查 patientId, i.e. 病人資料是否已成功創建
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };

        const newAppointment = await createAppointment(appointmentData); // fetch api

        if (newAppointment) {
          form.reset(); // 還原各欄位值到初始值 - defaultValues
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          ); // 創建成功後重導
        }
      }
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
                name="note"
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
