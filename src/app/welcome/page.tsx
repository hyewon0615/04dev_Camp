import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Wellcome() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-[1rem]">
      <h1 className="text-5xl ">환영한다냥!</h1>
      <img
        className="w-28 cursor-pointer"
        src="https://ahhyzbgcyoyfrzmvrgce.supabase.co/storage/v1/object/public/images/test/cat.jpg"
      ></img>
      <p>아무의미 없이 귀엽기만 합니다.</p>
    </div>
  );
}
