import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const router = useRouter();

  async function toggleComplete() {
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, completed: !task.completed }),
    });
    window.location.reload();
  }

  async function deleteTask() {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id }),
    });
    window.location.reload();
  }

  function editTask() {
    router.push(`/edit/${task.id}`); // Redireciona para a página de edição
  }

  return (
    <Card className="p-4 flex items-center justify-between">
      <div>
        <h3 className={`font-semibold ${task.completed ? "line-through" : ""}`}>{task.title}</h3>
        <p>{task.completed ? "Concluída" : "Pendente"}</p>
      </div>
      <div className="flex gap-2">
      <Button
        onClick={toggleComplete}
        className="transition-transform duration-200 ease-in-out hover:scale-105"
      >
        {task.completed ? "Desmarcar" : "Concluir"}
      </Button>

      <Button
        variant="secondary"
        onClick={editTask}
        className="transition-transform duration-200 ease-in-out hover:scale-105"
      >
        Editar
      </Button>

      <Button
        variant="destructive"
        onClick={deleteTask}
        className="transition-transform duration-200 ease-in-out hover:scale-105"
      >
        Excluir
      </Button>

      </div>
    </Card>
  );
}
