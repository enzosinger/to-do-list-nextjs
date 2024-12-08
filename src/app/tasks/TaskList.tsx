"use client";

import { useState, useEffect } from "react";
import { TaskCard } from "@/app/tasks/TaskCard";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

// Definição da interface para modelar as tarefas
interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]); // Armazena todas as tarefas
  const [filter, setFilter] = useState<string>("all"); // Estado para o filtro selecionado

  useEffect(() => {
    // Busca as tarefas da API quando o componente é montado
    async function fetchTasks() {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  // Filtra as tarefas com base no estado atual do filtro
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true; // Retorna todas as tarefas
    if (filter === "active") return !task.completed; // Retorna apenas tarefas ativas
    if (filter === "completed") return task.completed; // Retorna apenas tarefas concluídas
  });

  return (
    <div>
      {/* Dropdown para selecionar o filtro de tarefas */}
      <Select onValueChange={(value) => setFilter(value)}>
        <SelectTrigger className="mb-4">
          <SelectValue placeholder="Filtrar tarefas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          <SelectItem value="active">Ativas</SelectItem>
          <SelectItem value="completed">Concluídas</SelectItem>
        </SelectContent>
      </Select>
      
      {/* Exibe a lista de tarefas filtradas */}
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
