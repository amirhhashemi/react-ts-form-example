import { forwardRef } from "react";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  Heading,
  VStack,
  Select,
} from "@chakra-ui/react";
import {
  useForm,
  useController,
  type SubmitHandler,
  type UseControllerProps,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z
  .object({
    firstName: z
      .string()
      .min(2, "نام نمیتواند کمتر از ۲ حرف باشد")
      .max(30, "نام نمیتواند بیشتر از ۳۰ حرف باشد"),
    lastName: z
      .string()
      .min(2, "نام خانوادگی نمیتواند کمتر از ۲ حرف باشد")
      .max(30, "نام خانوادگی نمیتواند بیشتر از ۳۰ حرف باشد"),
    password: z.string().min(4, "رمز عبور باید حداقل ۴ حرف باشد"),
    passwordConfirm: z.string().min(4, "رمز عبور باید حداقل ۴ حرف باشد"),
    gender: z.enum(["male", "female"]),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "رمز عبور مطابقت ندارد",
    path: ["passwordConfirm"],
  });

type FormInputs = z.infer<typeof schema>;

export interface FormInputProps extends UseControllerProps<FormInputs> {
  label: string;
  dir?: "ltr" | "rtl";
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, dir, ...rest }, ref) => {
    const {
      field,
      fieldState: { error },
    } = useController(rest);

    return (
      <FormControl isInvalid={Boolean(error)}>
        <FormLabel>{label}</FormLabel>
        <Input {...field} ref={ref} dir={dir} />
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }
);

interface FormSelectProps extends UseControllerProps<FormInputs> {
  options: { value: string; label: string }[];
  label: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ options, label, ...rest }, ref) => {
    const {
      field,
      fieldState: { error },
    } = useController(rest);

    return (
      <FormControl isInvalid={Boolean(error)}>
        <FormLabel>{label}</FormLabel>
        <Select {...field} ref={ref}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }
);

export const Form = () => {
  const { handleSubmit, control } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirm: "",
      gender: "male",
    },
    reValidateMode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("data: ", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        boxShadow={"lg"}
        p="5"
        minWidth={"md"}
        bg="white"
        borderRadius={"md"}
      >
        <Heading mx="auto">فرم ثبت نام</Heading>
        <VStack mt="8" width="100%">
          <FormInput control={control} name="firstName" label="نام" />
          <FormInput control={control} name="lastName" label="نام خانوادگی" />
          <FormInput
            control={control}
            name="password"
            label="رمز عبور"
            dir="ltr"
          />
          <FormInput
            control={control}
            name="passwordConfirm"
            label="تکرار رمز عبور"
            dir="ltr"
          />
          <FormSelect
            control={control}
            name="gender"
            label="جنسیت"
            options={[
              { value: "male", label: "مرد" },
              { value: "female", label: "زن" },
            ]}
          />
        </VStack>
        <Button type="submit" mt="8" width={"100%"}>
          ثبت
        </Button>
      </Flex>
    </form>
  );
};
