"use server"; // 伺服器端行為

import {
  APPWRITE_PROJECT_ID,
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  storage,
  users,
} from "@/lib/appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(), // Appwrite method 生成 id
      // 從傳入的 user 物件中獲取用戶的 Email、電話和姓名
      user.email,
      user.phone,
      undefined, // password
      user.name
    );

    return parseStringify(newUser); // 轉換成 JSON string 後 return
  } catch (error: any) {
    // 排除重複 email 註冊的錯誤
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);

      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patient = await databases.listDocuments(
      DATABASE_ID!, // 從哪個 database req
      PATIENT_COLLECTION_ID!, // 哪一個 collection
      [Query.equal("userId", userId)]
    );

    return parseStringify(patient.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument, // 身分證副本
  ...patient // 其他病人資料
}: RegisterUserParams) => {
  try {
    // 上傳身分證副本圖片至 storage
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    // 於 databases 建立新病人文件
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${APPWRITE_PROJECT_ID}`, // 已成功上傳的身分證副本圖
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error(error);
  }
};
