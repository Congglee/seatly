import Logo from "@/components/logo";
import Menu from "@/app/manage/_components/menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export default function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden" asChild>
        <Button className="h-8 [&_svg]:size-5" variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <SheetTitle className="hidden" />
          <Button
            className="flex justify-center items-center pb-2 pt-1 [&_svg]:size-8"
            variant="link"
            asChild
          >
            <Link href="/manage/dashboard">
              <Logo />
            </Link>
          </Button>
        </SheetHeader>
        <Menu sidebarOpen={true} />
      </SheetContent>
    </Sheet>
  );
}
