import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function DetalhesUsuario({ route, navigation }) {
  // Desestruturando o parâmetro recebido da navegação
  const { nomeUsuario } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes do Perfil</Text>
      <Text style={styles.texto}>Bem-vindo, {nomeUsuario}!</Text>

      {/* Botão de retorno programático */}
      <TouchableOpacity 
        style={styles.botaoVoltar} 
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 10 
  },
  texto: { 
    fontSize: 18, 
    color: "#555",
    marginBottom: 20 
  },
  botaoVoltar: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});