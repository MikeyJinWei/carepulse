import Image from "next/image";
import { Button } from "./ui/button";

// 確認日後是否有需要擴展型別
type ButtonProps = {
  isLoading: boolean;
  className?: string;
  children?: React.ReactNode;
};

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "w-full shad-primary-btn"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="assets/icons/loader.svg"
            height={24}
            width={24}
            alt="loader"
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
export default SubmitButton;
