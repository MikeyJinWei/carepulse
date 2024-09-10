"use server"; // 伺服器端行為

import { users } from "@/lib/appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";

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
