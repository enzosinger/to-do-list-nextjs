"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Pessoal");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !category.trim()) {
      alert("Título e categoria são obrigatórios!");
      return;
    }

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Erro ao criar tarefa");
        return;
      }

      router.push("/"); // Redireciona para a página inicial
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      alert("Erro inesperado. Tente novamente.");
    }
  }

  function handleBack() {
    router.push("/"); // Redireciona para a página inicial
  }

  return (
    <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Adicionar Tarefa</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Digite o título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
        />
        <div className="space-y-2">
          <div>
            <label>
              <input
                type="radio"
                value="Pessoal"
                checked={category === "Pessoal"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Pessoal
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="Trabalho"
                checked={category === "Trabalho"}
                onChange={(e) => setCategory(e.target.value)}
                className="mr-2"
              />
              Trabalho
            </label>
          </div>
          <div>
            <label>
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
          {/* Botão Voltar */}
          <Button
            type="button"
            onClick={handleBack}
            className="bg-secondary text-secondary-foreground w-full py-2 rounded transition-all hover:bg-secondary/80 hover:scale-105"
          >
            Voltar
          </Button>
          {/* Botão Adicionar */}
          <Button
            type="submit"
            className="bg-primary text-primary-foreground w-full py-2 rounded transition-all hover:bg-primary/80 hover:scale-105"
          >
            Adicionar
          </Button>
        </div>
      </form>
    </div>
  );
}
