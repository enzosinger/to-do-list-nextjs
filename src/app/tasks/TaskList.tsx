"use client";

import { useState, useEffect } from "react";
import { TaskCard } from "@/app/tasks/TaskCard";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>(""); // Novo estado para o termo de busca

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  // Filtrar tarefas com base no status e no termo de busca
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filter === "all" || (filter === "active" && !task.completed) || (filter === "completed" && task.completed);
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      {/* Campo de busca */}
      <Input
        placeholder="Buscar tarefas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {/* Filtro de status */}
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

      {/* Lista de tarefas */}
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
