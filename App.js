import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
export default function Contador() {
const [contagem, setContagem] = useState(0);
return (
<View style={styles.container}>
<Text style={styles.titulo}>Contagem Atual:</Text>
<Text style={styles.numero}>{contagem}</Text>
<Button
title="Incrementar +1"
onPress={() => setContagem(contagem + 1)}
/>

<View>
  <Button
  title="Decrementar -1"
  onPress={() => setContagem(Math.max(0, contagem - 1))}
/>
</View>


<View>
<Button
title="Zerar"
onPress={() => setContagem(0)}
/>
</View>


</View>
);
}
const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
backgroundColor: "#ffffff"
},
titulo: {
fontSize: 20,
color: "#333333"
},
numero: {
fontSize: 48,
fontWeight: "bold",
color: "#d21010", /*cor do número*/
marginBottom: 20
}
});
