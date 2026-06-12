import Link from "next/link";

export default function ManageFooter() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          Xây dựng với{" "}
          <Link
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            shadcn/ui
          </Link>
          . Mã nguồn có trên{" "}
          <Link
            href="https://github.com/Congglee/seatly"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
