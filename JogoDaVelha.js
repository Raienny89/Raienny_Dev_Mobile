import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function JogoDaVelha() {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));
  const [vezDoX, setVezDoX] = useState(true);

  function lidarComJogada(indice) {
    // Evita sobrescrever uma célula já marcada
    if (tabuleiro[indice]) return;

    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[indice] = vezDoX ? "X" : "O";
    setTabuleiro(novoTabuleiro);
    setVezDoX(!vezDoX);
  }

  function reiniciarJogo() {
    setTabuleiro(Array(9).fill(null));
    setVezDoX(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.turnoTexto}>
        Vez do jogador: <Text style={styles.jogadorDestaque}>{vezDoX ? "X" : "O"}</Text>
      </Text>

      {/* Grade estruturada com colunas e linhas */}
      <View style={styles.grade}>
        {/* Linha 1 */}
        <View style={styles.linha}>
          <TouchableOpacity style={styles.celula} onPress={() => lidarComJogada(0)}>
            <Text style={styles.textoCelula}>{tabuleiro[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.celula, styles.bordaMeioV]} onPress={() => lidarComJogada(1)}>
            <Text style={styles.textoCelula}>{tabuleiro[1]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.celula} onPress={() => lidarComJogada(2)}>
            <Text style={styles.textoCelula}>{tabuleiro[2]}</Text>
          </TouchableOpacity>
        </View>

        {/* Linha 2 */}
        <View style={[styles.linha, styles.bordaMeioH]}>
          <TouchableOpacity style={styles.celula} onPress={() => lidarComJogada(3)}>
            <Text style={styles.textoCelula}>{tabuleiro[3]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.celula, styles.bordaMeioV]} onPress={() => lidarComJogada(4)}>
            <Text style={styles.textoCelula}>{tabuleiro[4]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.celula} onPress={() => lidarComJogada(5)}>
            <Text style={styles.textoCelula}>{tabuleiro[5]}</Text>
          </TouchableOpacity>
        </View>

        {/* Linha 3 */}
        <View style={styles.linha}>
          <TouchableOpacity style={styles.celula} onPress={() => lidarComJogada(6)}>
            <Text style={styles.textoCelula}>{tabuleiro[6]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.celula, styles.bordaMeioV]} onPress={() => lidarComJogada(7)}>
            <Text style={styles.textoCelula}>{tabuleiro[7]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.celula} onPress={() => lidarComJogada(8)}>
            <Text style={styles.textoCelula}>{tabuleiro[8]}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.botaoReiniciar} onPress={reiniciarJogo}>
        <Text style={styles.textoReiniciar}>Reiniciar Jogo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 40,
  },
  turnoTexto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#14325A",
    marginBottom: 15,
  },
  jogadorDestaque: {
    color: "#0064A0",
  },
  grade: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  linha: {
    flexDirection: "row",
  },
  celula: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  bordaMeioV: {
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: "#14325A",
  },
  bordaMeioH: {
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#14325A",
  },
  textoCelula: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#14325A",
  },
  botaoReiniciar: {
    marginTop: 15,
    backgroundColor: "#505050",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  textoReiniciar: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});