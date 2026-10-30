import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";


const iniciarBanco = async (db) => {
  await db.execAsync("PRAGMA journal_mode = WAL;");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      concluida INTEGER DEFAULT 0
    );
  `);
  console.log("Base de dados inicializada!");
};

export default function App() {
  return (
    <SQLiteProvider databaseName="app-database.db" onInit={iniciarBanco}>
      <EcraPrincipal />
    </SQLiteProvider>
  );
}

function EcraPrincipal() {
  const db = useSQLiteContext();

  
  const [nomeUsuario, setNomeUsuario] = useState({
    nome: "Visitante",
    logado: true,
  });
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    carregarPreferencias();
    carregarTarefas();
  }, [db]);

  // 
  const carregarPreferencias = async () => {
    try {
      const dadoSalvo = await AsyncStorage.getItem("@AppTarefas:Nome");
      if (!dadoSalvo) return;

      let usuario;
      try {
        usuario = JSON.parse(dadoSalvo);
      } catch {
        
        usuario = { nome: dadoSalvo, logado: true };
      }

      if (typeof usuario === "string") {
        usuario = { nome: usuario, logado: true };
      }

      if (usuario && typeof usuario.nome === "string") {
        setNomeUsuario({
          nome: usuario.nome,
          logado: usuario.logado === true,
        });
      }
    } catch (erro) {
      console.error("Erro ao carregar preferências:", erro);
      setMensagemErro("Não foi possível carregar o nome salvo.");
    }
  };

  
  const salvarNome = async () => {
    try {
      const novoUsuario = { nome: "Estudante INF204", logado: true };
      await AsyncStorage.setItem(
        "@AppTarefas:Nome",
        JSON.stringify(novoUsuario)
      );
      setNomeUsuario(novoUsuario);
      setMensagemErro("");
    } catch (erro) {
      console.error("Erro ao salvar nome:", erro);
      setMensagemErro("Não foi possível salvar o nome.");
    }
  };

  
  const carregarTarefas = async () => {
    try {
      const resultados = await db.getAllAsync(
        "SELECT * FROM tarefas ORDER BY id DESC;"
      );
      setTarefas(resultados);
      setMensagemErro("");
    } catch (erro) {
      console.error("Falha ao ler dados:", erro);
      setMensagemErro("Não foi possível carregar as tarefas.");
    }
  };

  
  const adicionarTarefa = async () => {
    const descricao = novaTarefa.trim();
    if (!descricao) return;

    try {
      await db.runAsync(
        "INSERT INTO tarefas (descricao, concluida) VALUES (?, ?);",
        [descricao, 0]
      );
      setNovaTarefa("");
      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao inserir tarefa:", erro);
      setMensagemErro("Não foi possível adicionar a tarefa.");
    }
  };

  
  const alternarStatus = async (id, statusAtual) => {
    const novoStatus = statusAtual === 1 ? 0 : 1;

    try {
      await db.runAsync(
        "UPDATE tarefas SET concluida = ? WHERE id = ?;",
        [novoStatus, id]
      );
      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao atualizar tarefa:", erro);
      setMensagemErro("Não foi possível atualizar a tarefa.");
    }
  };

  
  const excluirTarefa = async (id) => {
    try {
      await db.runAsync("DELETE FROM tarefas WHERE id = ?;", [id]);
      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao excluir tarefa:", erro);
      setMensagemErro("Não foi possível excluir a tarefa.");
    }
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Olá, {nomeUsuario.nome}!</Text>
        <TouchableOpacity style={styles.botaoAcao} onPress={salvarNome}>
          <Text style={styles.textoBotao}>Mudar Nome</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
          onSubmitEditing={adicionarTarefa}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.botaoAdd} onPress={adicionarTarefa}>
          <Text style={styles.textoBotao}>Add</Text>
        </TouchableOpacity>
      </View>

      {mensagemErro ? (
        <Text style={styles.erro}>{mensagemErro}</Text>
      ) : null}

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma tarefa cadastrada.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <TouchableOpacity
              style={styles.areaTarefa}
              onPress={() => alternarStatus(item.id, item.concluida)}
              accessibilityLabel={`Alternar status de ${item.descricao}`}
            >
              <Text
                style={[
                  styles.textoTarefa,
                  item.concluida === 1 && styles.textoConcluido,
                ]}
              >
                {item.descricao}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => excluirTarefa(item.id)}
              accessibilityLabel={`Excluir ${item.descricao}`}
            >
              <Text style={styles.textoExcluir}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: { flex: 1, fontSize: 24, fontWeight: "bold", color: "#14325A" },
  botaoAcao: { backgroundColor: "#808080", padding: 10, borderRadius: 8 },
  inputContainer: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFF",
  },
  botaoAdd: {
    backgroundColor: "#0064A0",
    padding: 15,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
  },
  textoBotao: { color: "#FFF", fontWeight: "bold" },
  cartao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  areaTarefa: { flex: 1, padding: 15 },
  textoTarefa: { fontSize: 18, color: "#333" },
  textoConcluido: { textDecorationLine: "line-through", color: "#999" },
  botaoExcluir: { paddingHorizontal: 18, paddingVertical: 15 },
  textoExcluir: { color: "#C0392B", fontSize: 18, fontWeight: "bold" },
  erro: { color: "#C0392B", marginBottom: 12 },
  vazio: { color: "#777", textAlign: "center", marginTop: 30},
});
