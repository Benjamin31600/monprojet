import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Brand } from '@/src/components/Brand';
import { Card, Eyebrow, PrimaryButton, SectionTitle } from '@/src/components/Ui';
import { colors } from '@/src/theme';
import { groupChildren } from '@/src/data/demo';

const tone: Record<string,string> = { butter: colors.butter, mint: colors.mint, sky: colors.sky, lavender: colors.lavender };

export default function EducatorSpace() {
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.page}>
    <View style={styles.top}><Brand compact/><Pressable onPress={() => router.replace('/')} style={styles.avatar}><Text>AL</Text></Pressable></View>
    <View style={styles.intro}><Eyebrow>ESPACE ÉDUCATRICE</Eyebrow><Text style={styles.h1}>Bonjour Amélie.</Text><Text style={styles.lead}>4 enfants aujourd’hui · Les Renardeaux · Mardi 11 septembre</Text></View>

    <Card style={styles.quickCard}><Text style={styles.quickTitle}>Ajouter au journal</Text><Text style={styles.quickText}>Une saisie rapide, puis MyCoco la présente clairement aux bons parents.</Text><View style={styles.quickGrid}>{[
      ['restaurant-outline','Repas'],['moon-outline','Sieste'],['color-palette-outline','Activité'],['happy-outline','Humeur'],['camera-outline','Photo'],['alert-circle-outline','Incident']
    ].map(([icon,label]) => <Pressable key={label} style={styles.quick} onPress={() => {}}><Ionicons name={icon as any} size={21} color={colors.navy}/><Text style={styles.quickTextLabel}>{label}</Text></Pressable>)}</View></Card>

    <SectionTitle eyebrow="MON GROUPE" title="Présences et informations clés" action="4 enfants"/>
    <View style={styles.children}>{groupChildren.map((child) => <Card key={child.name} style={styles.child}><View style={[styles.childAvatar,{ backgroundColor: tone[child.tone] }]}><Text>{child.name.slice(0,1)}</Text></View><View style={{ flex: 1 }}><Text style={styles.childName}>{child.name}</Text><Text style={styles.childMeta}>{child.status} · {child.note}</Text></View><Ionicons name="chevron-forward" size={18} color={colors.muted}/></Card>)}</View>

    <SectionTitle eyebrow="À FAIRE" title="Avant 16 h"/>
    <Card style={styles.todo}><View style={styles.todoIcon}><Ionicons name="document-text-outline" size={20} color={colors.navy}/></View><View style={{ flex: 1 }}><Text style={styles.todoTitle}>Compléter 2 journaux</Text><Text style={styles.todoText}>Léo et Emma ont déjà 3 événements enregistrés aujourd’hui.</Text></View></Card>

    <PrimaryButton label="Ouvrir les messages parents" onPress={() => router.push('/messages')} icon="chatbubbles-outline"/>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream }, page: { padding: 20, paddingBottom: 42 }, top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.mint, alignItems: 'center', justifyContent: 'center' },
  intro: { paddingTop: 26, paddingBottom: 18 }, h1: { color: colors.navy, fontSize: 38, fontWeight: '900', letterSpacing: -1.4, marginTop: 4 }, lead: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 7 },
  quickCard: { backgroundColor: colors.butter, borderColor: colors.butter, marginBottom: 26 }, quickTitle: { color: colors.navy, fontSize: 24, fontWeight: '900' }, quickText: { color: colors.navySoft, fontSize: 13, lineHeight: 19, marginTop: 4, marginBottom: 14 }, quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, quick: { width: '31%', minWidth: 92, backgroundColor: colors.white, paddingVertical: 12, borderRadius: 15, alignItems: 'center', gap: 6 }, quickTextLabel: { color: colors.navy, fontWeight: '800' },
  children: { gap: 9, marginBottom: 26 }, child: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 13 }, childAvatar: { width: 44, height: 44, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }, childName: { color: colors.ink, fontSize: 15, fontWeight: '900' }, childMeta: { color: colors.muted, fontSize: 12, marginTop: 3 },
  todo: { flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 18 }, todoIcon: { width: 44, height: 44, borderRadius: 15, backgroundColor: colors.sky, alignItems: 'center', justifyContent: 'center' }, todoTitle: { color: colors.ink, fontSize: 15, fontWeight: '900' }, todoText: { color: colors.muted, fontSize: 12, lineHeight: 17, marginTop: 3 }
});
