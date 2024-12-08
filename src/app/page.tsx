import { TaskForm } from "@/app/tasks/TaskForm";
import { TaskList } from "@/app/tasks/TaskList";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      {/* Container do conteúdo principal */}
      <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">TO-DO LIST!</h1>
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}
