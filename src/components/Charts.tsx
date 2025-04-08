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
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Button } from "./ui/button";
const chartData = [
  { month: "January", ind: 1860, recirc: 800, rejeito: 11 },
  { month: "February", ind: 3050, recirc: 200, rejeito: 22 },
  { month: "March", ind: 2370, recirc: 1200, rejeito: 100 },
  { month: "April", ind: 730, recirc: 190, rejeito: 23 },
  { month: "May", ind: 2090, recirc: 130, rejeito: 45 },
  { month: "June", ind: 2140, recirc: 140, rejeito: 10 },
  { month: "January", ind: 1860, recirc: 800, rejeito: 11 },
  { month: "February", ind: 3050, recirc: 200, rejeito: 22 },
  { month: "March", ind: 2370, recirc: 1200, rejeito: 100 },
  { month: "April", ind: 730, recirc: 190, rejeito: 23 },
  { month: "May", ind: 2090, recirc: 130, rejeito: 45 },
  { month: "June", ind: 2140, recirc: 140, rejeito: 10 },
  { month: "January", ind: 1860, recirc: 800, rejeito: 11 },
  { month: "February", ind: 3050, recirc: 200, rejeito: 22 },
  { month: "March", ind: 2370, recirc: 1200, rejeito: 100 },
  { month: "April", ind: 730, recirc: 190, rejeito: 23 },
  { month: "May", ind: 2090, recirc: 130, rejeito: 45 },
  { month: "June", ind: 2140, recirc: 140, rejeito: 10 },
  { month: "January", ind: 1860, recirc: 800, rejeito: 11 },
  { month: "February", ind: 3050, recirc: 200, rejeito: 22 },
  { month: "March", ind: 2370, recirc: 1200, rejeito: 100 },
  { month: "April", ind: 730, recirc: 190, rejeito: 23 },
  { month: "May", ind: 2090, recirc: 130, rejeito: 45 },
  { month: "June", ind: 2140, recirc: 140, rejeito: 10 },
  { month: "January", ind: 1860, recirc: 800, rejeito: 11 },
  { month: "February", ind: 3050, recirc: 200, rejeito: 22 },
  { month: "March", ind: 2370, recirc: 1200, rejeito: 100 },
  { month: "April", ind: 730, recirc: 190, rejeito: 23 },
  { month: "May", ind: 2090, recirc: 130, rejeito: 45 },
  { month: "June", ind: 2140, recirc: 140, rejeito: 10 },
  { month: "January", ind: 1860, recirc: 800, rejeito: 11 },
  { month: "February", ind: 3050, recirc: 200, rejeito: 22 },
  { month: "March", ind: 2370, recirc: 1200, rejeito: 100 },
  { month: "April", ind: 730, recirc: 190, rejeito: 23 },
  { month: "May", ind: 2090, recirc: 130, rejeito: 45 },
  { month: "June", ind: 2140, recirc: 140, rejeito: 10 },
];

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
  const [viewChart, setViewChart] = useState(["ind"]);

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
                  checked={viewChart.includes("ind")}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("ind", checked)
                  }
                />
                <label htmlFor="ind">Indução</label>
              </div>{" "}
              <div className="flex items-center justify-start gap-3">
                <Checkbox
                  id="Recirc"
                  checked={viewChart.includes("recirc")}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("recirc", checked)
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
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey={viewChart.includes("ind") ? "ind" : ""}
                type="monotone"
                fill="var(--color-ind)"
                fillOpacity={0.4}
                stroke="var(--color-ind)"
                stackId="a"
              />
              <Area
                dataKey={viewChart.includes("recirc") ? "recirc" : ""}
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
