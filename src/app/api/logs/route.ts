import { NextRequest, NextResponse } from "next/server";
import AppDataSource from "../../../lib/typeorm";
import { logs_v2 } from "../../../../logs";
import { Between } from "typeorm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "Data de início e fim são obrigatórias." },
        { status: 400 }
      );
    }
    //2025-03-04 00:00:00 2025-03-05 00:00:00

    const startDateObj = new Date(startDate).toISOString();
    const endDateObj = new Date(endDate).toISOString();

    console.log(startDateObj, endDateObj);

    const formattedStartDate = startDateObj
      .replace("T", " ")
      .replace("Z", "")
      .slice(0, 19);
    const formattedEndDate = endDateObj
      .replace("T", " ")
      .replace("Z", "")
      .slice(0, 19);

    console.log(formattedStartDate, formattedEndDate);

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    
    // const logs = await AppDataSource.getRepository(logs_v2).find({
    //   where: {
    //     DateFormat: Between(formattedStartDate, formattedEndDate),
    //   },
    // });


    const logs = await AppDataSource.getRepository(logs_v2).find({
      take: 10, // Limita a consulta a 10 registros
      order: {
        // Caso queira ordenar, pode adicionar a cláusula ORDER BY (opcional)
        DateFormat: 'ASC', // Ou 'DESC', dependendo da ordem desejada
      },
    });

    //const logs = await AppDataSource.createQueryBuilder().select().from("logs_v2", "logs").limit(10).orderBy("DateFormat", "ASC").getMany();

    return NextResponse.json(logs);
  } catch (error) {
    console.error("Erro ao buscar logs:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  } finally {
    await AppDataSource.destroy(); // Fecha a conexão
  }
}
