import { Package, PackageX, Repeat } from "lucide-react";
import { Card, CardContent, CardTitle } from "./ui/card";

export function Cards() {
  return (
    <>
      <div className="flex flex-col">
        <div className="">
        <Card className="flex w-[300px] h-35 font-bold text-zinc-800 dark:text-zinc-200">
          <CardTitle className="flex items-center justify-between pl-6 pr-4">
            Total induzido
            <Package />
          </CardTitle>
          <CardContent className="flex  ">
            <span className="text-red-400 dark:text-red-500">1200</span>
          </CardContent>
        </Card>{" "}
        <Card className="flex w-[300px] h-35 font-bold text-zinc-800 dark:text-zinc-200">
          <CardTitle className="flex items-center justify-between pl-6 pr-4">
            Total Recirculado
            <Repeat />
          </CardTitle>
          <CardContent className="flex  ">
            <div className="flex gap-47">
              <span className="text-red-400 dark:text-red-500">1200</span>
              <span className="text-yellow-300 dark:text-yellow-400">10%</span>
            </div>
          </CardContent>
        </Card>
        <Card className="flex w-[300px] h-35 font-bold text-zinc-800 dark:text-zinc-200">
          <CardTitle className="flex items-center justify-between pl-6 pr-4">
            Total Rejeitado <PackageX />
          </CardTitle>
          <CardContent className="flex  ">
            <div className="flex gap-47">
              <span className="text-red-400 dark:text-red-500">1200</span>
              <span className="text-yellow-300 dark:text-yellow-400">10%</span>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </>
  );
}
