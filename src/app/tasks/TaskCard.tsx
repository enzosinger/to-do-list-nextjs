import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [showConfirm, setShowConfirm] = useState(false); // Estado do modal de confirmação

  async function toggleComplete() {
    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, completed: !task.completed }),
    });
    window.location.reload();
  }

  async function confirmDelete() {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id }),
    });
    setShowConfirm(false); // Fecha o modal
    window.location.reload();
  }

  function editTask() {
    router.push(`/edit/${task.id}`); // Redireciona para a página de edição
  }

  return (
    <>
      <Card className="p-4 flex items-center justify-between">
        <div>
          <h3 className={`font-semibold ${task.completed ? "line-through" : ""}`}>{task.title}</h3>
          <p>{task.completed ? "Concluída" : "Pendente"}</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={toggleComplete}
            className="bg-gray-500 text-white w-full py-2 rounded transition-all hover:bg-gray-600 hover:scale-105"
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
            onClick={() => setShowConfirm(true)} // Mostra o modal
            className="transition-transform duration-200 ease-in-out hover:scale-105"
          >
            Excluir
          </Button>
        </div>
      </Card>

      {/* Modal de confirmação */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4">
              Tem certeza que deseja excluir a tarefa <span className="font-bold">{task.title}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setShowConfirm(false)} // Fecha o modal sem excluir
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-secondary/80"
              >
                Cancelar
              </Button>
              <Button
                onClick={confirmDelete} // Confirma a exclusão
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
