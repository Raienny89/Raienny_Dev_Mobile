import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function UrnaEletronica() {
  
  const [votosA, setVotosA] = useState(0);
  const [votosB, setVotosB] = useState(0);
  const [votosC, setVotosC] = useState(0);

  


const totalVotos = votosA + votosB + votosC;
const porcentagemA = totalVotos > 0 ? ((votosA / totalVotos) * 100).toFixed(2) : 0;
const porcentagemB = totalVotos > 0 ? ((votosB / totalVotos) * 100).toFixed(2) : 0;
const porcentagemC = totalVotos > 0 ? ((votosC / totalVotos) * 100).toFixed(2) : 0;

const zerarUrna = () => {setVotosA(0);
setVotosB(0);
setVotosC(0);
};


  return (
    
    <View style={styles.container}>
      <Text style={styles.titulo}>Painel de Votação</Text>

      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>Candidato A: {votosA} votos ({porcentagemA}%)</Text>
        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosA((prev) => prev + 1)}
        >
          <Text style={styles.textoBotao}>Votar em A</Text>
        </TouchableOpacity>
      </View>

     
      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>Candidato B: {votosB} votos ({porcentagemB}%)</Text>
        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosB((prev) => prev + 1)}
        >
          <Text style={styles.textoBotao}>Votar em B</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>Candidato C: {votosC} votos ({porcentagemC}%)</Text>
        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosC((prev) => prev + 1)}
        >
          <Text style={styles.textoBotao}>Votar em C</Text>
        </TouchableOpacity>


        <View style={styles.rodape}>
            <Text style={styles.totalTexto}>Total de Votos: {totalVotos}</Text>
            <TouchableOpacity style={styles.botaoZerar} onPress={zerarUrna}>
            <Text style={styles.textoBotao}>Zerar Urna</Text>
          </TouchableOpacity>
        </View>

        
      </View>
    </View>

    
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#14325A",
  },
  candidatoContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nomeCandidato: {
    fontSize: 18,
    fontWeight: "600",
    color: "#14325A",
    marginBottom: 12,
  },
  botaoVotar: {
    backgroundColor: "#14325A",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  candidatoContainer: {
      width: "100%",
      backgroundColor: "#FFF",
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      alignItems: "center",
      elevation: 2,
},
    nomeCandidato: { fontSize: 18, marginBottom: 10 },
    botaoVotar: { backgroundColor: "#0064A0", padding: 10, borderRadius: 5, width:
        "80%", alignItems: "center" },
    textoBotao: { color: "#FFF", fontWeight: "bold" },
    rodape: { marginTop: 30, alignItems: "center", width: "100%", borderTopWidth:
          1, borderColor: "#CCC", paddingTop: 20 },
    totalTexto: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
    botaoZerar: { backgroundColor: "#808080", padding: 15, borderRadius: 5 }

});