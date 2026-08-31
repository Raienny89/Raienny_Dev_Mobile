import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from "react-native";
export default function App() {
const [nome, setNome] = useState("Joao Vitor");
return (
<View style={styles.container}>
<View style={styles.cartao}>
<Image source={{ uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/11f2ba7d-88c4-4271-b5a6-93573195b74c/dg2nnit-e273a7d9-a085-4831-9b82-1ab27260826d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi8xMWYyYmE3ZC04OGM0LTQyNzEtYjVhNi05MzU3MzE5NWI3NGMvZGcybm5pdC1lMjczYTdkOS1hMDg1LTQ4MzEtOWI4Mi0xYWIyNzI2MDgyNmQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VRhKNCsnqCOGRhRSRBqYjG_UUxIQp__RyIILS8S4kio" }} style={styles.avatar} />
<View style={styles.infoPerfil}>
<Text style={styles.nomeUsuario}>{nome}</Text>
<Text style={styles.profissao}>Engenheiro de Software</Text>
</View>
{/* Botao Customizado */}

<TouchableOpacity style={styles.botao1} activeOpacity={0.7} onPress={() =>
alert("Seguindo " + nome)}>
<Text style={styles.textoBotao}>Seguir</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.botao2} activeOpacity={0.7} onPress={() =>
alert("Parando de seguir " + nome)}>
<Text style={styles.textoBotao}>Parar de seguir</Text>
</TouchableOpacity>{/*Botão criado*/}

<TouchableOpacity style={styles.botao3} activeOpacity={0.7} onPress={() =>
alert("Verificando perfil de " + nome)}>
<Text style={styles.textoBotao}>Ver Perfil</Text>
</TouchableOpacity>{/*Botão criado tbm*/}

{/* Entrada de Texto */}
<TextInput
style={styles.input}
placeholder="Alterar nome..."
value={nome}
onChangeText={(texto) => setNome(texto)}
/>
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
},
cartao: {
backgroundColor: "#FFFFFF",
padding: 30,
borderRadius: 15,
alignItems: "center",
shadowColor: "#000",
shadowOpacity: 0.1,
shadowRadius: 10,
elevation: 5,
width: "80%",
},
avatar: {
width: 120,
height: 120,
borderRadius: 60,
marginBottom: 15,
},
infoPerfil: {
borderWidth: 1,
borderColor: "#14325A",
borderRadius: 8,
padding: 10,
alignItems: "center",
marginBottom: 20,
},
nomeUsuario: {
fontSize: 22,
fontWeight: "bold",
color: "#14325A", // ProBlue
},
profissao: {
fontSize: 16,
color: "#505050", // ProGray
marginBottom: 20,
},

botao1: {
backgroundColor: "#0064A0", // ProAccent
paddingVertical: 10,
paddingHorizontal: 30,
borderRadius: 8,
marginBottom: 20,
},
textoBotao: {
color: "#FFFFFF",
fontWeight: "bold",
fontSize: 16,
},
input: {
width: "100%",
borderWidth: 1,
borderColor: "#CCC",
borderRadius: 8,
padding: 10,
textAlign: "center",
},

botao2: {
backgroundColor: "#a00000", // ProAccent
paddingVertical: 10,
paddingHorizontal: 30,
borderRadius: 8,
marginBottom: 20,
},


botao3: {
backgroundColor: "#0d890b", // ProAccent
paddingVertical: 10,
paddingHorizontal: 30,
borderRadius: 8,
marginBottom: 20,
},

});