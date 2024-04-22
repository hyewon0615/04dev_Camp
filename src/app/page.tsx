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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
  username: z.string().min(2, {
    message: "이름은 2글자 이상이여야 합니다.",
  }),
  email: z.string().email("올바른 이메일을 입력해주세요"),
  phoneNumber: z.string().min(11, { message: "연락처는 11자리여야 합니다." }),
  role: z.string().nonempty("역할을 선택해주세요."),
});

export default function JoinForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      role: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="flex flex-wrap justify-center items-center h-screen">
      <Card className="w-[380px] ">
        <CardHeader>
          <CardTitle>계정을 생성합니다</CardTitle>
          <CardDescription>필수 정보를 입력해볼게요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input placeholder="홍길동" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
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
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
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
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
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
                    <Select onValueChange={field.onChange} {...field}>
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
              <Button type="submit">다음 단계로</Button>
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
