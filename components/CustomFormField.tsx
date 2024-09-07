"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldTypes } from "./forms/PatientForm";

interface CustomFormFieldProps {
  control: Control<any>;
  fieldType: FormFieldTypes;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

// 彈性控制欄位要渲染的元素
const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldProps;
}) => {
  return <Input type="text" placeholder="John Doe" />;
};

const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, fieldType, name, label, placeholder, iconSrc, iconAlt } =
    props; // 子層有元件需要整包 props: 在父層級傳整包 -> 解構

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {fieldType !== FormFieldTypes.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />

          {/* <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} type={fieldType} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage /> */}
        </FormItem>
      )}
    />
  );
};
export default CustomFormField;
