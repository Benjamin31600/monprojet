import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Brand } from '@/src/components/Brand';
import { Card, Eyebrow, PrimaryButton, SectionTitle } from '@/src/components/Ui';
import { colors, radius } from '@/src/theme';
import { demoChild, today } from '@/src/data/demo';

export default function ParentSpace() {
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.page}>
    <View style={styles.top}><Brand compact/><Pressable onPress={() => router.replace('/')} style={styles.avatar}><Text>MB</Text></Pressable></View>
    <View style={styles.intro}><Eyebrow>ESPACE PARENT</Eyebrow><Text style={styles.h1}>Bonjour Marie.</Text><Text style={styles.lead}>Voici l’essentiel de la journée de {demoChild.firstName}, sans vous noyer dans les notifications.</Text></View>

    <Card style={styles.live}>
      <View style={styles.liveTop}><View><Text style={styles.liveKicker}>MAINTENANT</Text><Text style={styles.liveTitle}>Sieste en cours</Text></View><View style={styles.pulse}/></View>
      <Text style={styles.liveText}>Endormi à 12:42 · Les Renardeaux</Text>
      <View style={styles.liveActions}><Pressable style={styles.liveAction} onPress={() => router.push('/child')}><Ionicons name="person-circle-outline" size={19} color={colors.navy}/><Text style={styles.liveActionText}>Profil de {demoChild.firstName}</Text></Pressable><Pressable style={styles.liveAction} onPress={() => router.push('/messages')}><Ionicons name="chatbubble-ellipses-outline" size={19} color={colors.navy}/><Text style={styles.liveActionText}>Écrire</Text></Pressable></View>
    </Card>

    <SectionTitle eyebrow="AUJOURD’HUI" title="Sa journée en un coup d’œil" action="Tout voir"/>
    <View style={styles.timeline}>{today.map((item, i) => <View key={item.time} style={styles.event}><View style={styles.rail}><View style={[styles.eventIcon, i === today.length - 1 && { backgroundColor: colors.butter }]}><Ionicons name={item.icon} size={18} color={colors.navy}/></View>{i < today.length - 1 && <View style={styles.line}/>}</View><View style={styles.eventBody}><View style={styles.eventTop}><Text style={styles.eventType}>{item.type}</Text><Text style={styles.eventTime}>{item.time}</Text></View><Text style={styles.eventTitle}>{item.title}</Text><Text style={styles.eventDetail}>{item.detail}</Text></View></View>)}</View>

    <SectionTitle eyebrow="À NE PAS MANQUER" title="Agenda"/>
    <Card style={styles.agenda}><View style={styles.date}><Text style={styles.dateDay}>18</Text><Text style={styles.dateMonth}>SEP</Text></View><View style={{ flex: 1 }}><Text style={styles.agendaTitle}>Sortie au parc</Text><Text style={styles.agendaText}>Prévoir chapeau et bouteille d’eau identifiée.</Text></View><Ionicons name="chevron-forward" size={20} color={colors.muted}/></Card>

    <PrimaryButton label="Ouvrir la messagerie" onPress={() => router.push('/messages')} icon="chatbubbles-outline"/>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream }, page: { padding: 20, paddingBottom: 42 }, top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.lavender, alignItems: 'center', justifyContent: 'center' },
  intro: { paddingTop: 26, paddingBottom: 18 }, h1: { color: colors.navy, fontSize: 38, fontWeight: '900', letterSpacing: -1.4, marginTop: 4 }, lead: { color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: 7 },
  live: { backgroundColor: colors.navy, borderColor: colors.navy, marginBottom: 26 }, liveTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, liveKicker: { color: '#C7D1D9', fontSize: 10, fontWeight: '900', letterSpacing: 1.1 }, liveTitle: { color: colors.white, fontSize: 27, fontWeight: '900', marginTop: 5 }, pulse: { width: 13, height: 13, borderRadius: 8, backgroundColor: colors.mint }, liveText: { color: '#D8E0E6', fontSize: 13, marginTop: 7 },
  liveActions: { flexDirection: 'row', gap: 8, marginTop: 18, flexWrap: 'wrap' }, liveAction: { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: colors.white, paddingVertical: 9, paddingHorizontal: 11, borderRadius: 12 }, liveActionText: { color: colors.navy, fontSize: 12, fontWeight: '800' },
  timeline: { marginBottom: 26 }, event: { flexDirection: 'row', gap: 13, minHeight: 82 }, rail: { width: 40, alignItems: 'center' }, eventIcon: { width: 38, height: 38, borderRadius: 14, backgroundColor: colors.sky, alignItems: 'center', justifyContent: 'center', zIndex: 2 }, line: { width: 1, backgroundColor: colors.line, flex: 1 },
  eventBody: { flex: 1, paddingBottom: 18 }, eventTop: { flexDirection: 'row', justifyContent: 'space-between' }, eventType: { color: colors.navySoft, fontSize: 10, fontWeight: '900', textTransform: 'uppercase', letterSpacing: .9 }, eventTime: { color: colors.muted, fontSize: 11, fontWeight: '700' }, eventTitle: { color: colors.ink, fontSize: 16, fontWeight: '900', marginTop: 5 }, eventDetail: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 3 },
  agenda: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 18 }, date: { width: 58, height: 62, borderRadius: radius.md, backgroundColor: colors.butter, alignItems: 'center', justifyContent: 'center' }, dateDay: { color: colors.navy, fontSize: 24, fontWeight: '900', lineHeight: 26 }, dateMonth: { color: colors.navy, fontSize: 9, fontWeight: '900', letterSpacing: 1 }, agendaTitle: { color: colors.ink, fontSize: 16, fontWeight: '900' }, agendaText: { color: colors.muted, fontSize: 12, lineHeight: 17, marginTop: 3 }
});
