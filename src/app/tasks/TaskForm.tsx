"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TaskForm() {
  // Estado para o título da tarefa
  const [title, setTitle] = useState("");
  // Estado para mensagens de erro
  const [error, setError] = useState<string | null>(null);

  // Lida com o envio do formulário
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Validação: título não pode ser vazio
    if (!title.trim()) {
      setError("O título é obrigatório!");
      return;
    }

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      // Exibe a mensagem de erro retornada pela API, se houver
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Erro ao adicionar a tarefa. Tente novamente.");
        return;
      }

      // Reseta o formulário e mensagens de erro após sucesso
      setTitle("");
      setError(null);
      window.location.reload(); // Atualiza a página para refletir as mudanças
    } catch (err) {
      console.error("Erro ao adicionar tarefa:", err);
      setError("Erro inesperado. Tente novamente mais tarde.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
      {/* Exibe a mensagem de erro caso exista */}
      {error && <p className="text-red-500">{error}</p>}
      <Input
        placeholder="Digite uma nova tarefa..."
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError(null); // Limpa o erro ao digitar
        }}
      />
      <Button type="submit">Adicionar Tarefa</Button>
    </form>
  );
}
