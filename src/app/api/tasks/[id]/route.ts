import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Reutilizando o Prisma Client

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Extrai o ID da URL

    // Verifica se o ID foi fornecido
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Busca a tarefa no banco de dados
    const task = await prisma.task.findUnique({
      where: { id },
    });

    // Verifica se a tarefa foi encontrada
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("GET /api/tasks/[id] error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
