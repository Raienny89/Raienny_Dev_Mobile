
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform
} from "react-native";

import api from "./src/services/api";

export default function App() {
  const [utilizadores, setUtilizadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Estados do Desafio 2
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Código original do professor
  useEffect(() => {
    const buscarDados = async () => {
      try {
        const resposta = await api.get("/users");
        setUtilizadores(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar dados:", erro.message);
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, []);

  // DESAFIO 1 - Pull-to-Refresh
  const atualizarLista = async () => {
    setRefreshing(true);

    try {
      const resposta = await api.get("/users");
      setUtilizadores(resposta.data);
    } catch (erro) {
      console.error("Erro ao atualizar lista:", erro.message);
    } finally {
      setRefreshing(false);
    }
  };

  // Função para mostrar alertas no celular e navegador
  const exibirAlerta = (titulo, mensagem) => {
    if (Platform.OS === "web") {
      window.alert(titulo + "\n" + mensagem);
    } else {
      Alert.alert(titulo, mensagem);
    }
  };

  // DESAFIO 2 - Enviar formulário com POST
  const enviarCadastro = async () => {
    if (!nome.trim() || !email.trim()) {
      exibirAlerta(
        "Atenção",
        "Preencha o nome e o e-mail."
      );
      return;
    }

    setEnviando(true);

    try {
      const resposta = await api.post("/posts", {
        name: nome.trim(),
        email: email.trim()
      });

      console.log("Resposta do POST:", resposta.data);

      exibirAlerta(
        "Sucesso!",
        "Dados enviados com sucesso para a API!"
      );

      setNome("");
      setEmail("");

    } catch (erro) {
      console.error("Erro ao enviar dados:", erro.message);

      exibirAlerta(
        "Erro",
        "Não foi possível enviar os dados."
      );

    } finally {
      setEnviando(false);
    }
  };

  // Carregamento inicial
  if (loading) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>A carregar utilizadores...</Text>
      </View>
    );
  }

  // DESAFIO 2 - Tela do formulário
  if (mostrarFormulario) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>
          Cadastrar Usuário
        </Text>

        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={enviarCadastro}
          disabled={enviando}
        >
          {enviando ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.textoBotao}>
              Enviar Cadastro
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => setMostrarFormulario(false)}
        >
          <Text style={styles.textoBotao}>
            Voltar para Lista
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Tela principal - Lista de Utilizadores
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Lista de Utilizadores
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => setMostrarFormulario(true)}
      >
        <Text style={styles.textoBotao}>
          Cadastrar Usuário
        </Text>
      </TouchableOpacity>

      <FlatList
        data={utilizadores}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={atualizarLista}
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <Text style={styles.nome}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
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
    paddingHorizontal: 20
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#14325A"
  },
  cartao: {
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold"
  },
  email: {
    color: "#666",
    marginTop: 5
  },
  botao: {
    backgroundColor: "#14325A",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20
  },
  textoBotao: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#14325A"
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16
  },
  botaoVoltar: {
    backgroundColor: "#666",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10
  }
});
