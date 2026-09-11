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
      <Eyebrow>LA VIE DE GARDE, SIMPLEMENT</Eyebrow>
      <Text style={styles.h1}>Plus simple pour les nounous. Plus rassurant pour les parents.</Text>
      <Text style={styles.lead}>MyCoco réunit planning, journal, photos, besoins, messages, rappels et informations importantes de l’enfant dans une seule application.</Text>
    </View>

    <View style={styles.bubbles}>
      <View style={[styles.bubble,{backgroundColor: colors.sage}]}><Ionicons name="calendar-outline" size={21} color={colors.navy}/><Text style={styles.bubbleText}>Planning</Text></View>
      <View style={[styles.bubble,{backgroundColor: colors.sky}]}><Ionicons name="camera-outline" size={21} color={colors.navy}/><Text style={styles.bubbleText}>Photos</Text></View>
      <View style={[styles.bubble,{backgroundColor: colors.lavender}]}><Ionicons name="chatbubble-ellipses-outline" size={21} color={colors.navy}/><Text style={styles.bubbleText}>Messages</Text></View>
      <View style={[styles.bubble,{backgroundColor: colors.butter}]}><Ionicons name="notifications-outline" size={21} color={colors.navy}/><Text style={styles.bubbleText}>Rappels</Text></View>
    </View>

    <Card style={styles.providerCard}>
      <View style={styles.iconWrap}><Ionicons name="home-outline" size={24} color={colors.navy}/></View>
      <View style={{flex:1}}><Text style={styles.cardEyebrow}>POUR LES NOUNOUS & MILIEUX DE GARDE</Text><Text style={styles.cardTitle}>Créez votre espace gratuitement</Text><Text style={styles.cardText}>Configurez votre groupe, ajoutez vos horaires puis invitez les parents. Aucun compte enfant n’est créé.</Text></View>
    </Card>

    <View style={styles.actions}>
      <PrimaryButton label="Créer mon espace gratuit" onPress={() => router.push('/educator')} icon="sparkles-outline" />
      <SoftButton label="J’ai reçu une invitation parent" onPress={() => router.push('/parent')} icon="mail-open-outline" />
      <Text style={styles.login}>Déjà membre ? Connectez-vous depuis votre espace.</Text>
    </View>

    <View style={styles.safety}><Ionicons name="shield-checkmark-outline" size={18} color={colors.success}/><Text style={styles.safetyText}>Application réservée aux adultes · accès enfant sur invitation · données privées · mode {backendMode === 'demo' ? 'démo' : 'connecté'}.</Text></View>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  page: { padding: 22, paddingBottom: 44, gap: 18 },
  hero: { paddingTop: 22, gap: 11 },
  h1: { color: colors.navy, fontSize: 39, lineHeight: 42, fontWeight: '900', letterSpacing: -1.5 },
  lead: { color: colors.muted, fontSize: 16, lineHeight: 24 },
  bubbles: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  bubble: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 10, paddingHorizontal: 12, borderRadius: radius.pill },
  bubbleText: { color: colors.navy, fontWeight: '800', fontSize: 12 },
  providerCard: { flexDirection: 'row', gap: 14, backgroundColor: colors.peach, borderColor: '#F1DCCF' },
  iconWrap: { width: 48, height: 48, borderRadius: 16, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  cardEyebrow: { color: colors.navySoft, fontSize: 10, fontWeight: '900', letterSpacing: .8 },
  cardTitle: { color: colors.navy, fontSize: 19, fontWeight: '900', marginTop: 5 },
  cardText: { color: colors.navySoft, fontSize: 13, lineHeight: 19, marginTop: 5 },
  actions: { gap: 10, backgroundColor: colors.white, borderRadius: radius.lg, padding: 18, borderWidth: 1, borderColor: colors.line },
  login: { textAlign: 'center', color: colors.muted, fontSize: 12, marginTop: 3 },
  safety: { flexDirection: 'row', gap: 8, alignItems: 'center', paddingHorizontal: 4 },
  safetyText: { color: colors.muted, flex: 1, fontSize: 12, lineHeight: 17 },
});
