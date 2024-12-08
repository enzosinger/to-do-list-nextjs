"use client";

import EditTaskForm from "./EditTaskForm"; // Importa o componente de edição

export default function EditPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <EditTaskForm /> {/* Renderiza o formulário de edição */}
    </div>
  );
}
