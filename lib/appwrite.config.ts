import * as sdk from "node-appwrite";

export const {
  APPWRITE_PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  // 重新命名
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

// 創建 Appwrite 客戶端實例
const client = new sdk.Client();

// Appwrite 配置
client.setEndpoint(ENDPOINT!).setProject(APPWRITE_PROJECT_ID!).setKey(API_KEY!);

// 創建並匯出 Appwrite 的各個服務實例
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
