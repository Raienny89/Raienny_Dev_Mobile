import React, { useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import ItemTarefa, { Tarefa } from "./ItemTarefa";

export default function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { id: 1, descricao: "Estudar ES6+", concluida: true },
    { id: 2, descricao: "Configurar ambiente Expo", concluida: true },
    { id: 3, descricao: "Entender o funcionamento do JSX", concluida: false },
    { id: 4, descricao: "Finalizar Roteiro de Pratica 02", concluida: false },
  ]);

  const tarefasPendentes: Tarefa[] = tarefas.filter((tarefa) => !tarefa.concluida);

  const adicionarTarefa = (): void => {
    const novaTarefa: Tarefa = {
      id: Date.now(),
      descricao: `Nova Tarefa #${tarefas.length + 1}`,
      concluida: false,
    };

    setTarefas([...tarefas, novaTarefa]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Todas as Tarefas (TS)</Text>

      {tarefas.map((tarefa) => (
        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
      ))}

      <View style={styles.botaoContainer}>
        <Button title="Adicionar Tarefa" onPress={adicionarTarefa} color="#20325a" />
      </View>

      <Text style={[styles.titulo, styles.subtitulo]}>Apenas Pendentes</Text>

      {tarefasPendentes.map((tarefa) => (
        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#20325a",
  },
  subtitulo: {
    marginTop: 20,
    color: "#b33939",
  },
  botaoContainer: {
    marginVertical: 15,
  },
});