import { openDb } from "@/lib/sqlite";
import { subDays, subHours } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

interface LogEntry {
  hour: string;
  inducao: number;
  recirculacao: number;
  rejeito: number;
}

export interface RequestBody {
  startDate: string;
  endDate: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { startDate, endDate } = body;

    console.log(startDate, endDate);

    if (!startDate || !endDate) {
      return NextResponse.json({
        error: "Date not found",
      });
    }

    if (startDate > endDate) {
      return NextResponse.json({
        error: "A data inicial é superior a data final",
      });
    }
    const dateLimit = 7;
    const limitDate = subDays(new Date(endDate), dateLimit);

    if (new Date(startDate) < limitDate) {
      return NextResponse.json({
        error: "O limite de data é de até 7 dias",
      });
    }

    const db = await openDb();
    const logs: LogEntry[] = await db.all(
      `
        SELECT 
          strftime('%Y-%m-%d %H:00:00', DateFormat) AS hour,
          SUM(CASE 
                WHEN Tipo = 'NDIR' AND Mensagem NOT LIKE '%SRT1A%' AND Mensagem NOT LIKE '%SRT1B%' THEN 1 
                ELSE 0 
              END) AS inducao,
          SUM(CASE 
                WHEN Tipo = 'ACKN' AND substr(Mensagem, 97, 3) = '999' THEN 1
                ELSE 0
              END) AS recirculacao,
          SUM(CASE 
                WHEN Tipo = 'ACKN' AND substr(Mensagem, 97, 3) IN ('A09', 'B14') THEN 1
                ELSE 0
              END) AS rejeito
        FROM logs_v3
        WHERE DateFormat BETWEEN ? AND ?
        GROUP BY hour
        ORDER BY hour ASC;

    `,
      [startDate, endDate]
    );
    await db.close();

    const startDateObj = subHours(new Date(startDate), 3);
    const endDateObj = subHours(new Date(endDate), 3);

    const datesWithZeroQuantity: LogEntry[] = [];

    while (startDateObj < endDateObj) {
      const fullDates =
        startDateObj.toISOString().slice(0, 13).replace("T", " ") + ":00:00";
      datesWithZeroQuantity.push({
        hour: fullDates,
        inducao: 0,
        recirculacao: 0,
        rejeito: 0,
      });
      startDateObj.setHours(startDateObj.getHours() + 1);
    }

    const mergedLogs: LogEntry[] = datesWithZeroQuantity.map((item) => {
      const found = logs.find((log) => log.hour === item.hour);
      return {
        hour: item.hour,
        inducao: found?.inducao ?? 0,
        recirculacao: found?.recirculacao ?? 0,
        rejeito: found?.rejeito ?? 0,
      };
    });
    return NextResponse.json(mergedLogs);
  } catch (error) {
    return NextResponse.json({
      error: "Error",
      message: (error as Error).message,
    });
  }
}
