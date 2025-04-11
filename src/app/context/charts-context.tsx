"use client";

import { createContext, useState } from "react";
import { api } from "@/lib/axios";

interface ChartsProviderProps {
  children: React.ReactNode;
}

interface ChartsProps{
  hour: string;
  inducao: number;
  recirculacao: number;
  rejeito: number;
}


export interface ChartsContextType {
  chartsData: ChartsProps[];
  fetchRequest: (start?: string, end?: string) => Promise<void>;
}

export const ChartsContext = createContext({} as ChartsContextType);

export function ChartsProvider({ children }: ChartsProviderProps) {
  const [charts, setCharts] = useState<ChartsProps[]>([]);

  async function fetchRequest(start?: string, end?: string) {
    try {
      const response = await api.post("api/logs", {
        startDate: start,
        endDate: end,
      });
      setCharts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
        console.error("Erro ao buscar os dados", error);
    }
  }

  return (
    <ChartsContext.Provider value={{ chartsData: charts, fetchRequest }}>
      {children}
    </ChartsContext.Provider>
  );
}