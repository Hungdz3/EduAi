import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-background text-foreground">
      <main className="flex flex-col items-center gap-6 max-w-2xl">
        <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl text-primary">
          Chào mừng đến với EduAI
        </h1>
        <p className="text-xl text-muted-foreground">
          Nền tảng học trực tuyến thông minh dành cho giáo viên và học sinh, hỗ trợ bởi trí tuệ nhân tạo.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Link href="/login">
            <Button size="lg" className="text-lg px-8">
              Đăng nhập
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="lg" className="text-lg px-8">
              Đăng ký
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
