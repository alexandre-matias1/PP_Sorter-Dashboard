"use client";

import { Package, PackageX, Repeat } from "lucide-react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useContext } from "react";
import { ChartsContext } from "@/app/context/charts-context";

export function Cards() {
  const { chartsData } = useContext(ChartsContext);

  const totalInd = chartsData.reduce((acc, item) => acc + item.inducao, 0);
  const totalRecirc = chartsData.reduce(
    (acc, item) => acc + item.recirculacao,
    0
  );
  const totalRej = chartsData.reduce((acc, item) => acc + item.rejeito, 0);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-10 flex-col">
          <Card className="flex w-[300px] h-35 font-bold text-zinc-800 dark:text-zinc-200">
            <CardTitle className="flex items-center justify-between pl-6 pr-4">
              Total induzido
              <Package />
            </CardTitle>
            <CardContent className="flex  ">
              <span className="text-red-400 dark:text-red-500">{totalInd}</span>
            </CardContent>
          </Card>{" "}
          <Card className="flex w-[300px] h-35 font-bold text-zinc-800 dark:text-zinc-200">
            <CardTitle className="flex items-center justify-between pl-6 pr-4">
              Total Recirculado
              <Repeat />
            </CardTitle>
            <CardContent className="flex  ">
              <div className="flex justify-between w-[300px]">
                <span className="text-red-400 dark:text-red-500">
                  {totalRecirc}
                </span>
                {totalRecirc <= 0 ? (
                  <span className="text-yellow-300 dark:text-yellow-400">
                    0%
                  </span>
                ) : (
                  <span className="text-yellow-300 dark:text-yellow-400">
                    {((totalRecirc / totalInd) * 100).toFixed(2)}%
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="flex w-[300px] h-35 font-bold text-zinc-800 dark:text-zinc-200">
            <CardTitle className="flex items-center justify-between pl-6 pr-4">
              Total Rejeitado <PackageX />
            </CardTitle>
            <CardContent className="flex  ">
              <div className="flex justify-between w-[300px]">
                <span className="text-red-400 dark:text-red-500">
                  {totalRej}
                </span>
                <span className="text-yellow-300 dark:text-yellow-400">
                {totalRecirc <= 0 ? (
                  <span className="text-yellow-300 dark:text-yellow-400">
                    0%
                  </span>
                ) : (
                  <span className="text-yellow-300 dark:text-yellow-400">
                    {((totalRej / totalInd) * 100).toFixed(2)}%
                  </span>
                )}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
