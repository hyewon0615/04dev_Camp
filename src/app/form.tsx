"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast"
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phoneRegex = /^010\d{8}$/;

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "이름은 2글자 이상이여야 합니다.",
    })
    .max(100, {
      message: "이름은 100글자 이하이여야 합니다.",
    }),
  email: z.string().email("올바른 이메일을 입력해주세요."),
  phoneNumber: z
    .string()
    .min(11, { message: "연락처는 11자리여야 합니다." })
    .max(11, { message: "연락처는 11자리여야 합니다." })
    .refine(
      (value) => phoneRegex.test(value),
      "010으로 시작하는 11자리 숫자를 입력해주세요"
    ),
  role: z.string().nonempty("역할을 선택해주세요."),
  password: z
    .string()
    .min(6, "비밀번호는 최소 6자리 이상이어야 합니다.")
    .max(100, "비밀번호는 100자리 이하이어야 합니다.")
    .refine(
      (value) => passwordRegex.test(value),
      "비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다."
    ),
  passwordCheck: z
    .string()
    .min(6, "비밀번호는 최소 6자리 이상이어야 합니다.")
    .max(100, "비밀번호는 100자리 이하이어야 합니다.")
    .refine(
      (value) => passwordRegex.test(value),
      "비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다."
    ),
});

export default function JoinForm() {
  const [step, setStep] = useState(0);
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      role: "",
      password: "",
      passwordCheck: "",
    },
  });
//   console.log(form.watch());
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("폼 제출 중", data);

    const { username, email, phoneNumber, role, passwordCheck ,password } = data;
    if (password !== passwordCheck) {
              alert("비밀번호가 일치하지 않습니다.");
              return;
            }
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, phoneNumber, role, passwordCheck ,password  }),
      });
      if (!response.ok) {
        throw new Error("네트워크 응답이 올바르지 않습니다");
      }
      // 여기서 응답 처리
      console.log("등록 성공", response);
      toast({ title: "등록 성공" });
    } catch (error: any) {
      console.error("등록 실패:", error);
      toast({ title: "등록 실패", description: error.message });
    }
  };
  return (
    <div className="flex flex-wrap justify-center items-center h-screen">
      <Card className="w-[380px] overflow-hidden min-h-[507px]">
        <CardHeader>
          <CardTitle>계정을 생성합니다</CardTitle>
          <CardDescription>필수 정보를 입력해볼게요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <motion.div
                animate={{ translateX: `${step * -100}%` }}
                className={cn({ hidden: step === 1 })}
                transition={{
                  ease: "easeInOut",
                }}
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input placeholder="홍길동" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="hello@sparta-devcamp.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>연락처</FormLabel>
                      <FormControl>
                        <Input placeholder="01000000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>역할</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="역할을 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">관리자</SelectItem>
                          <SelectItem value="user">일반사용자</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                animate={{ translateX: `${(1 - step) * 100}%` }}
                style={{ translateX: `${(1 - step) * 100}%` }}
                className={cn({ hidden: step === 0 }, "min-h-[305px]")}
                transition={{
                  ease: "easeInOut",
                }}
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordCheck"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호확인</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <Button
                type="button"
                onClick={() => {
                  //배열에 들어있는 이름의 input 유효성 검사
                  form.trigger(["email", "phoneNumber", "role", "username"]);
                  const phoneNumberState = form.getFieldState("phoneNumber");
                  const emailState = form.getFieldState("email");
                  const usernameState = form.getFieldState("username");
                  const roleState = form.getFieldState("role");

                  if (!phoneNumberState.isDirty || phoneNumberState.invalid)
                    return;
                  if (!emailState.isDirty || emailState.invalid) return;
                  if (!usernameState.isDirty || usernameState.invalid) return;
                  if (!roleState.isDirty || roleState.invalid) return;
                  setStep(1);
                }}
                className={cn({ hidden: step === 1 })}
              >
                다음 단계로
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Button>
              <div className="flex gap-2.5">
                <Button className={cn({ hidden: step === 0 })} type="submit">
                  계정 등록하기
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className={cn({ hidden: step === 0 })}
                  onClick={() => {
                    setStep(0);
                  }}
                >
                  이전 단계로
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </div>
  );
}
