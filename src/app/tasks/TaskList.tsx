"use client";

import { useState, useEffect } from "react";
import { TaskCard } from "@/app/tasks/TaskCard";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string; // Inclui a categoria
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categories, setCategories] = useState<string[]>(["Pessoal", "Trabalho", "Outro"]); // Categorias ativas

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filter === "all" || (filter === "active" && !task.completed) || (filter === "completed" && task.completed);
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categories.includes(task.category);
    return matchesStatus && matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (category: string) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category) // Remove a categoria
        : [...prev, category] // Adiciona a categoria
    );
  };

  // Mapeia categorias para emojis
  const getCategoryEmoji = (category: string): string => {
    if (category === "Pessoal") return "🏠";
    if (category === "Trabalho") return "💼";
    if (category === "Outro") return "❓";
    return ""; // Caso nenhuma categoria seja correspondente
  };

  return (
    <div>
      {/* Botão de adicionar nova tarefa */}
      <Button
        onClick={() => (window.location.href = "/add")} // Redireciona para a página de adicionar tarefas
        className="mb-4 w-full bg-black text-white hover:bg-gray-800"
      >
        Adicionar Nova Tarefa
      </Button>

      {/* Barra de pesquisa */}
      <Input
        placeholder="Buscar tarefas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full"
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

      {/* Filtro de categorias (horizontal) */}
      <div className="mb-4 flex space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={categories.includes("Pessoal")}
            onChange={() => handleCategoryChange("Pessoal")}
            className="mr-2"
          />
          Pessoal
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={categories.includes("Trabalho")}
            onChange={() => handleCategoryChange("Trabalho")}
            className="mr-2"
          />
          Trabalho
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={categories.includes("Outro")}
            onChange={() => handleCategoryChange("Outro")}
            className="mr-2"
          />
          Outro
        </label>
      </div>

      {/* Lista de tarefas */}
      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={{
            ...task,
            title: `${getCategoryEmoji(task.category)} - ${task.title}`, // Substitui a categoria pelo emoji
          }}
        />
      ))}
    </div>
  );
}
