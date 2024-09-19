"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import AppointmentForm from "./forms/AppointmentForm";
import { Appointment } from "@/types/appwrite.types";
import clsx from "clsx";

type AppointmentModalProps = {
  type: "schedule" | "cancel";
  patientId: string;
  userId: string;
  appointment?: Appointment;
};

const AppointmentModal = ({
  type,
  patientId,
  userId,
  appointment,
}: AppointmentModalProps) => {
  const [open, setOpen] = useState(false); // 控制 Modal 開關

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={clsx(
            "capitalize",
            { "text-green-500": type === "schedule" },
            { "text-rose-500": type === "cancel" }
          )}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:mx-w-md shad-dialog">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle
            className={`capitalize ${type === "cancel" && "text-rose-500"}`}
          >
            {type} Appointment
          </DialogTitle>
          <DialogDescription>
            Please fill in the following details to{" "}
            <span className={`${type === "cancel" && "text-rose-500"}`}>
              {type}
            </span>{" "}
            an appointment
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          type={type}
          userId={userId}
          patientId={patientId}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
export default AppointmentModal;
