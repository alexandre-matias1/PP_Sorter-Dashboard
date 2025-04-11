"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useContext, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Button } from "./ui/button";
import { ChartsContext } from "@/app/context/charts-context";


const chartConfig = {
  ind: {
    label: "Ind",
    color: "hsl(var(--chart-1))",
  },
  recirc: {
    label: "Recirc",
    color: "hsl(var(--chart-2))",
  },
  rejeito: {
    label: "Rejeito",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function ChartsView() {
  const { chartsData } = useContext(ChartsContext);
  const [viewChart, setViewChart] = useState(["inducao"]);
  console.log(chartsData)


  const handleCheckboxChange = (value: string, checked: CheckedState) => {
    setViewChart((state) => {
      if (checked) {
        return [...state, value];
      } else {
        return state.filter((item) => item !== value);
      }
    });
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div className="flex m-2 gap-2 flex-col">
            <CardTitle>Volumetria Sorter</CardTitle>
            <CardDescription>
              Quantidade de caixas induzidas, rejeitadas e recirculadas
            </CardDescription>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-[220px]" variant="outline">
                Filtrar
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px]">
              <div className="flex items-center justify-start gap-3">
                <Checkbox
                  id="Ind"
                  checked={viewChart.includes("inducao")}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("inducao", checked)
                  }
                />
                <label htmlFor="ind">Indução</label>
              </div>{" "}
              <div className="flex items-center justify-start gap-3">
                <Checkbox
                  id="Recirc"
                  checked={viewChart.includes("recirculacao")}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("recirculacao", checked)
                  }
                />
                <label htmlFor="rec">Recirculação</label>
              </div>{" "}
              <div className="flex items-center justify-start gap-3">
                <Checkbox
                  id="Rejeito"
                  checked={viewChart.includes("rejeito")}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("rejeito", checked)
                  }
                />
                <label htmlFor="rej">Rejeito</label>{" "}
              </div>
            </PopoverContent>
          </Popover>
        </CardHeader>
        <CardContent>
          <ChartContainer className="w-[1350px] h-[600px]" config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartsData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="hour"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(5, 16)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey={viewChart.includes("inducao") ? "inducao" : ""}
                type="monotone"
                fill="var(--color-ind)"
                fillOpacity={0.4}
                stroke="var(--color-ind)"
                stackId="a"
              />
              <Area
                dataKey={viewChart.includes("recirculacao") ? "recirculacao" : ""}
                type="monotone"
                fill="var(--color-recirc)"
                fillOpacity={0.4}
                stroke="var(--color-recirc)"
                stackId="b"
              />
              <Area
                dataKey={viewChart.includes("rejeito") ? "rejeito" : ""}
                type="monotone"
                fill="var(--color-rejeito)"
                fillOpacity={0.4}
                stroke="var(--color-rejeito)"
                stackId="c"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}