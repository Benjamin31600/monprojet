import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, SectionTitle } from '@/src/components/Ui';
import { demoChild } from '@/src/data/demo';
import { colors } from '@/src/theme';

export default function ChildProfile() {
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.page}>
    <Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="arrow-back" size={20} color={colors.navy}/></Pressable>
    <View style={styles.hero}><View style={styles.avatar}><Text>{demoChild.firstName.slice(0,1)}</Text></View><View><Text style={styles.kicker}>FICHE ENFANT</Text><Text style={styles.h1}>{demoChild.firstName}</Text><Text style={styles.sub}>{demoChild.age} · {demoChild.group}</Text></View></View>

    <SectionTitle eyebrow="SANTÉ & SÉCURITÉ" title="Informations importantes"/>
    <Card style={styles.alert}><Ionicons name="warning-outline" size={23} color={colors.danger}/><View style={{ flex: 1 }}><Text style={styles.alertTitle}>Allergie : {demoChild.allergies.join(', ')}</Text><Text style={styles.alertText}>Visible uniquement par les adultes autorisés du service de garde et les responsables légaux.</Text></View></Card>

    <Card style={styles.row}><Ionicons name="call-outline" size={21} color={colors.navy}/><View style={{ flex: 1 }}><Text style={styles.rowLabel}>Contact d’urgence</Text><Text style={styles.rowValue}>{demoChild.emergency}</Text></View></Card>
    <Card style={styles.row}><Ionicons name="camera-outline" size={21} color={colors.navy}/><View style={{ flex: 1 }}><Text style={styles.rowLabel}>Autorisation photo</Text><Text style={styles.rowValue}>Autorisée dans le journal privé · aucun partage public</Text></View></Card>
    <Card style={styles.row}><Ionicons name="people-outline" size={21} color={colors.navy}/><View style={{ flex: 1 }}><Text style={styles.rowLabel}>Personnes autorisées au départ</Text><Text style={styles.rowValue}>Marie B. · Nicolas B.</Text></View></Card>

    <Text style={styles.privacy}>MyCoco ne crée jamais de compte pour l’enfant. Les consentements sont portés par un adulte autorisé et peuvent être retirés.</Text>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream }, page: { padding: 20, paddingBottom: 40, gap: 10 }, back: { width: 42, height: 42, borderRadius: 16, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.line },
  hero: { flexDirection: 'row', gap: 15, alignItems: 'center', paddingVertical: 22 }, avatar: { width: 72, height: 72, borderRadius: 26, backgroundColor: colors.butter, alignItems: 'center', justifyContent: 'center' }, kicker: { color: colors.muted, fontSize: 10, fontWeight: '900', letterSpacing: 1 }, h1: { color: colors.navy, fontSize: 36, fontWeight: '900', letterSpacing: -1.2 }, sub: { color: colors.muted, fontSize: 13 },
  alert: { flexDirection: 'row', gap: 12, borderColor: '#F2CCCC', backgroundColor: '#FFF8F8', marginBottom: 4 }, alertTitle: { color: colors.danger, fontWeight: '900', fontSize: 15 }, alertText: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 4 },
  row: { flexDirection: 'row', gap: 12, alignItems: 'center', padding: 15 }, rowLabel: { color: colors.muted, fontSize: 10, fontWeight: '900', textTransform: 'uppercase', letterSpacing: .7 }, rowValue: { color: colors.ink, fontSize: 13, fontWeight: '700', marginTop: 3 }, privacy: { color: colors.muted, fontSize: 11, lineHeight: 17, padding: 8, marginTop: 4 }
});
