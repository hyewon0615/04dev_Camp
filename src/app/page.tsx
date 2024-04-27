import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LoginForm from "./login/page";
import JoinForm from "./form";

export default async function RegisterPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/welcome");
  }

  return (
    <section className=" h-screen flex items-center justify-center">
      <div className="flex flex-wrap justify-center items-center h-screen">
        <Card className="w-[380px] overflow-hidden min-h-[507px]">
          <CardHeader>
            <CardTitle>계정을 생성합니다</CardTitle>
            <CardDescription>필수 정보를 입력해볼게요.</CardDescription>
          </CardHeader>
          <CardContent>
            <JoinForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
