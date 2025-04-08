import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { ModeToggle } from "@/components/theme/toggle-mode";
import { Separator } from "./ui/separator";


export function Header() {
  return (
    <>
      <header className="flex p-9 justify-between items-center">
        <div className="flex gap-3">
          <ChartNoAxesColumnIncreasing size={32}/>
          <h1 className="text-xl text-zinc-900 dark:text-zinc-300">Sorter Dashboard</h1>
        </div>
        <ModeToggle />
      </header>
      <Separator />
    </>
  );
}
