"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditTaskForm() {
  const { id } = useParams(); // Captura o ID da tarefa
  const router = useRouter();
  const [title, setTitle] = useState(""); // Estado do input
  const [category, setCategory] = useState("Pessoal"); // Estado da categoria
  const [currentTitle, setCurrentTitle] = useState(""); // Nome atual da tarefa

  // Função para buscar a tarefa
  useEffect(() => {
    async function fetchTask() {
      if (!id) return;

      try {
        const response = await fetch(`/api/tasks/${id}`);
        if (!response.ok) {
          console.error("Erro ao buscar a tarefa:", await response.text());
          return;
        }

        const task = await response.json();
        setTitle(task.title); // Define o valor do input
        setCategory(task.category); // Define a categoria atual
        setCurrentTitle(task.title); // Define o nome atual da tarefa
      } catch (error) {
        console.error("Erro ao buscar a tarefa:", error);
      }
    }

    fetchTask();
  }, [id]); // Dependência: roda sempre que `id` mudar

  // Função para salvar as alterações
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, category }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Erro ao salvar alterações:", error.message);
        return;
      }

      router.push("/"); // Redireciona para a página principal
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  }

  // Função para voltar à página principal
  function handleBack() {
    router.push("/");
  }

  return (
    <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md text-foreground">
      <h1 className="text-2xl font-bold mb-2 text-center">Editar Tarefa</h1>
      <p className="text-muted-foreground mb-6 text-center">
        Tarefa atual: <span className="font-semibold">&quot;{currentTitle}&quot;</span>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Edite o título da tarefa"
          className="w-full"
        />
        <div className="space-y-2">
          <p className="text-muted-foreground">Categoria:</p>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="Pessoal"
                checked={category === "Pessoal"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Pessoal
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Trabalho"
                checked={category === "Trabalho"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Trabalho
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Outro"
                checked={category === "Outro"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Outro
            </label>
          </div>
        </div>
        <div className="flex justify-between space-x-4">
          {/* Botão de Voltar */}
          <Button
            type="button"
            onClick={handleBack}
            className="bg-secondary text-secondary-foreground w-full py-2 rounded transition-all hover:bg-secondary/80 hover:scale-105"
          >
            Voltar
          </Button>
          {/* Botão de Salvar */}
          <Button
            type="submit"
            className="bg-primary text-primary-foreground w-full py-2 rounded transition-all hover:bg-primary/80 hover:scale-105"
          >
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
}
