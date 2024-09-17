"use server";

import { ID } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    // 於 databases 建立預約掛號文件
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};
