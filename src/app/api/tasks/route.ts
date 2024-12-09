import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Obter todas as tarefas
export async function GET() {
  try {
    // Recupera todas as tarefas do banco de dados
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('GET error:', error); // Loga erros no console para depuração
    return NextResponse.json({ error: 'Algo deu errado' }, { status: 500 });
  }
}

// Criar uma nova tarefa
export async function POST(request: Request) {
  try {
    const { title, category } = await request.json();

    // Verifica se o título foi enviado
    if (!title || title.trim() === "") {
      return NextResponse.json({ error: 'Título é obrigatório' }, { status: 400 });
    }

    // Verifica se a categoria foi enviada
    if (!category || !['Pessoal', 'Trabalho', 'Outro'].includes(category)) {
      return NextResponse.json({ error: 'Categoria inválida' }, { status: 400 });
    }

    // Cria uma nova tarefa com o título, status padrão e categoria
    const task = await prisma.task.create({
      data: {
        title,
        completed: false,
        category,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Algo deu errado' }, { status: 500 });
  }
}

// Atualizar uma tarefa
export async function PATCH(request: Request) {
  try {
    const { id, title, completed, category } = await request.json();

    // Verifica se o ID foi enviado
    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }

    // Verifica se a categoria é válida, caso fornecida
    if (category && !['Pessoal', 'Trabalho', 'Outro'].includes(category)) {
      return NextResponse.json({ error: 'Categoria inválida' }, { status: 400 });
    }

    // Atualiza os dados da tarefa com base nos campos fornecidos
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }), // Atualiza o título se fornecido
        ...(completed !== undefined && { completed }), // Atualiza o status se fornecido
        ...(category !== undefined && { category }), // Atualiza a categoria se fornecida
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ error: 'Algo deu errado' }, { status: 500 });
  }
}

// Excluir uma tarefa
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    // Verifica se o ID foi enviado
    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }

    // Busca a tarefa no banco de dados para garantir que ela existe
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) {
      return NextResponse.json({ error: 'Tarefa não encontrada' }, { status: 404 });
    }

    // Exclui a tarefa do banco de dados
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Algo deu errado' }, { status: 500 });
  }
}
