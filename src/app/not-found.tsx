import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="text-primary text-6xl font-bold">404</p>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground text-sm">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link href="/" className={buttonVariants()}>
        Back home
      </Link>
    </div>
  );
}
