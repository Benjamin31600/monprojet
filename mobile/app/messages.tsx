import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Brand } from '@/src/components/Brand';
import { colors, radius } from '@/src/theme';

export default function Messages() {
  return <SafeAreaView style={styles.safe}><View style={styles.page}>
    <View style={styles.head}><Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="arrow-back" size={20} color={colors.navy}/></Pressable><Brand compact/><View style={{ width: 40 }}/></View>
    <View style={styles.title}><Text style={styles.kicker}>MESSAGERIE PRIVÉE</Text><Text style={styles.h1}>Les Renardeaux</Text><Text style={styles.sub}>Amélie · Éducatrice</Text></View>
    <ScrollView contentContainerStyle={styles.thread}>
      <View style={styles.received}><Text style={styles.msg}>Bonjour Marie, Léo a très bien mangé ce midi. Il vient de s’endormir pour la sieste.</Text><Text style={styles.time}>12:45</Text></View>
      <View style={styles.sent}><Text style={styles.sentText}>Merci beaucoup ! Il était fatigué ce matin, c’est rassurant.</Text><Text style={styles.sentTime}>12:47 · Lu</Text></View>
      <View style={styles.received}><Text style={styles.msg}>Oui, tout va très bien 😊</Text><Text style={styles.time}>12:48</Text></View>
    </ScrollView>
    <View style={styles.composer}><TextInput placeholder="Écrire un message…" placeholderTextColor={colors.muted} style={styles.input}/><Pressable style={styles.send}><Ionicons name="send" size={19} color={colors.white}/></Pressable></View>
  </View></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream }, page: { flex: 1, padding: 18 }, head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, back: { width: 40, height: 40, borderRadius: 16, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.line },
  title: { paddingVertical: 22, borderBottomWidth: 1, borderBottomColor: colors.line }, kicker: { color: colors.muted, fontSize: 10, fontWeight: '900', letterSpacing: 1 }, h1: { color: colors.navy, fontSize: 28, fontWeight: '900', marginTop: 4 }, sub: { color: colors.muted, fontSize: 13, marginTop: 2 },
  thread: { paddingVertical: 20, gap: 10 }, received: { maxWidth: '82%', alignSelf: 'flex-start', backgroundColor: colors.white, borderRadius: 20, borderBottomLeftRadius: 7, padding: 14, borderWidth: 1, borderColor: colors.line }, sent: { maxWidth: '82%', alignSelf: 'flex-end', backgroundColor: colors.navy, borderRadius: 20, borderBottomRightRadius: 7, padding: 14 }, msg: { color: colors.ink, fontSize: 14, lineHeight: 20 }, sentText: { color: colors.white, fontSize: 14, lineHeight: 20 }, time: { color: colors.muted, fontSize: 10, marginTop: 6 }, sentTime: { color: '#CFD9E1', fontSize: 10, marginTop: 6 },
  composer: { flexDirection: 'row', gap: 9, alignItems: 'center', paddingTop: 8 }, input: { flex: 1, minHeight: 50, borderRadius: radius.md, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, paddingHorizontal: 15, color: colors.ink }, send: { width: 50, height: 50, borderRadius: 17, backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center' }
});
