"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PasskeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(true); // 管理 Modal 開關
  const [passkey, setPasskey] = useState(""); // 管理驗證碼輸入
  const [error, setError] = useState(""); // 驗證碼錯誤信息

  // 已登入驗證且驗證碼尚未過期
  const encryptedKey =
    typeof window !== "undefined" // 確保只在瀏覽器環境中執行，避免在 SSR 時發生錯誤
      ? window.localStorage.getItem("accessKey") // localStorage 只能在瀏覽器環境中訪問
      : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey); // 解碼

    if (path) {
      // 檢查
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false); // 成功後關閉 Modal
        router.push("/admin");
      } else {
        setOpen(true); // 保持 Modal 開啟等待輸入 -> 驗證
      }
    }
  }, [encryptedKey]); // 依賴驗證碼的變化

  // 從未登入驗證／驗證碼過期
  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // 檢查使用者輸入的驗證碼
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey); // 加密

      localStorage.setItem("accessKey", encryptedKey); // 儲存加密驗證碼至 localStorage 的 accessKey key

      setOpen(false); // 成功後關閉 Modal
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  // 關閉 Modal
  const handleClose = () => {
    setOpen(false);
    router.push("/"); // 重導回首頁
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              onClick={() => handleClose()}
              src="/assets/icons/close.svg"
              height={20}
              width={20}
              alt="close"
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot index={0} className="shad-otp-slot" />
              <InputOTPSlot index={1} className="shad-otp-slot" />
              <InputOTPSlot index={2} className="shad-otp-slot" />
              <InputOTPSlot index={3} className="shad-otp-slot" />
              <InputOTPSlot index={4} className="shad-otp-slot" />
              <InputOTPSlot index={5} className="shad-otp-slot" />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="mt-4 flex justify-center text-14-regular shad-error">
              {error}
            </p>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePasskey(e)}
            className="w-full shad-primary-btn"
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default PasskeyModal;
