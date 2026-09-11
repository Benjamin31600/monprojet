import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Brand } from '@/src/components/Brand';
import { Card, Eyebrow, PrimaryButton, SoftButton } from '@/src/components/Ui';
import { backendMode } from '@/src/lib/supabase';
import { colors, radius } from '@/src/theme';

export default function Welcome() {
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.page}>
    <Brand />
    <View style={styles.hero}>
      <Eyebrow>LE QUOTIDIEN DE GARDE, ENFIN SIMPLE</Eyebrow>
      <Text style={styles.h1}>Un seul endroit pour suivre, rassurer et organiser.</Text>
      <Text style={styles.lead}>MyCoco relie parents, éducatrices et services de garde autour de ce qui compte vraiment : la journée de l’enfant.</Text>
    </View>

    <Card style={styles.featureCard}>
      <View style={styles.featureIcon}><Ionicons name="heart-outline" size={24} color={colors.navy}/></View>
      <View style={{ flex: 1 }}><Text style={styles.featureTitle}>Journal de journée</Text><Text style={styles.featureText}>Repas, siestes, activités, photos, humeur, départ et messages — sans cahier papier.</Text></View>
    </Card>

    <View style={styles.choice}>
      <Text style={styles.choiceTitle}>Découvrir l’espace</Text>
      <PrimaryButton label="Je suis un parent" onPress={() => router.push('/parent')} icon="people-outline" />
      <SoftButton label="Je suis éducatrice / responsable" onPress={() => router.push('/educator')} icon="school-outline" />
    </View>

    <View style={styles.safety}><Ionicons name="shield-checkmark-outline" size={18} color={colors.success}/><Text style={styles.safetyText}>Comptes adultes uniquement · données enfant privées · mode {backendMode === 'demo' ? 'démo' : 'connecté'}.</Text></View>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream }, page: { padding: 22, paddingBottom: 40, gap: 18 },
  hero: { paddingTop: 26, gap: 11 }, h1: { color: colors.navy, fontSize: 42, lineHeight: 44, fontWeight: '900', letterSpacing: -1.8 },
  lead: { color: colors.muted, fontSize: 16, lineHeight: 24, maxWidth: 560 },
  featureCard: { flexDirection: 'row', gap: 14, backgroundColor: colors.mint }, featureIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  featureTitle: { color: colors.navy, fontSize: 17, fontWeight: '900', marginBottom: 4 }, featureText: { color: colors.navySoft, fontSize: 13, lineHeight: 19 },
  choice: { gap: 10, backgroundColor: colors.white, borderRadius: radius.lg, padding: 18, borderWidth: 1, borderColor: colors.line }, choiceTitle: { color: colors.ink, fontSize: 20, fontWeight: '900', marginBottom: 4 },
  safety: { flexDirection: 'row', gap: 8, alignItems: 'center', paddingHorizontal: 4 }, safetyText: { color: colors.muted, flex: 1, fontSize: 12, lineHeight: 17 },
});
