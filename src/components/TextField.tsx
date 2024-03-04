import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";

type TextFieldProps = {
  label: string;
  [key: string]: any;
};

export const TextField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta, helpers] = useField(props as any);
  return (
    <FormControl isInvalid={Boolean(meta.touched && meta.error)}>
      <FormLabel>{label}</FormLabel>
      <Input {...field} {...props} />
      <FormErrorMessage>{meta.touched && meta.error}</FormErrorMessage>
    </FormControl>
  );
};
