import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Brand } from '@/src/components/Brand';
import { Card, Eyebrow, PrimaryButton, SectionTitle } from '@/src/components/Ui';
import { colors, radius } from '@/src/theme';
import { demoChild, today } from '@/src/data/demo';

export default function ParentSpace() {
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.page}>
    <View style={styles.top}><Brand compact/><Pressable onPress={() => router.replace('/')} style={styles.avatar}><Text style={styles.avatarText}>BR</Text></Pressable></View>

    <View style={styles.intro}><Eyebrow>ESPACE PARENT</Eyebrow><Text style={styles.h1}>Bonjour Benjamin.</Text><Text style={styles.lead}>Tout ce qui concerne {demoChild.firstName}, au même endroit.</Text></View>

    <Card style={styles.childCard}>
      <View style={styles.childHead}><View style={styles.childAvatar}><Text style={styles.childAvatarText}>S</Text></View><View style={{flex:1}}><Text style={styles.childName}>{demoChild.firstName}</Text><Text style={styles.childMeta}>Les Renardeaux · Aujourd’hui 8 h 00–16 h 30</Text></View><View style={styles.okBadge}><Text style={styles.okText}>Présent</Text></View></View>
      <View style={styles.healthRow}><Ionicons name="medical-outline" size={18} color={colors.danger}/><Text style={styles.healthText}>Allergie arachides</Text><Pressable onPress={() => router.push('/child')}><Text style={styles.link}>Voir la fiche</Text></Pressable></View>
    </Card>

    <View style={styles.grid}>
      <Card style={[styles.miniCard,{backgroundColor:colors.sage}]}><Ionicons name="moon-outline" size={22} color={colors.navy}/><Text style={styles.miniKicker}>MAINTENANT</Text><Text style={styles.miniTitle}>Sieste</Text><Text style={styles.miniText}>Depuis 13 h 08</Text></Card>
      <Card style={[styles.miniCard,{backgroundColor:colors.butter}]}><Ionicons name="wallet-outline" size={22} color={colors.navy}/><Text style={styles.miniKicker}>PROCHAIN FRAIS</Text><Text style={styles.miniTitle}>93,50 $</Text><Text style={styles.miniText}>À régler le 15 sept.</Text></Card>
    </View>

    <SectionTitle eyebrow="AUJOURD’HUI" title="Sa journée en un coup d’œil" action="Tout voir"/>
    <View style={styles.timeline}>{today.map((item, i) => <View key={item.time} style={styles.event}><View style={styles.rail}><View style={[styles.eventIcon, { backgroundColor: [colors.sky,colors.lavender,colors.peach,colors.sage][i % 4] }]}><Ionicons name={item.icon} size={18} color={colors.navy}/></View>{i < today.length - 1 && <View style={styles.line}/>}</View><View style={styles.eventBody}><View style={styles.eventTop}><Text style={styles.eventType}>{item.type}</Text><Text style={styles.eventTime}>{item.time}</Text></View><Text style={styles.eventTitle}>{item.title}</Text><Text style={styles.eventDetail}>{item.detail}</Text></View></View>)}</View>

    <SectionTitle eyebrow="À PRÉVOIR" title="Rappels et besoins"/>
    <Card style={styles.reminder}><View style={[styles.reminderIcon,{backgroundColor:colors.blush}]}><Ionicons name="bag-handle-outline" size={20} color={colors.navy}/></View><View style={{flex:1}}><Text style={styles.reminderTitle}>Apporter des couches</Text><Text style={styles.reminderText}>Il en reste pour environ 2 jours.</Text></View><View style={styles.pill}><Text style={styles.pillText}>Demain</Text></View></Card>
    <Card style={styles.reminder}><View style={[styles.reminderIcon,{backgroundColor:colors.sky}]}><Ionicons name="calendar-outline" size={20} color={colors.navy}/></View><View style={{flex:1}}><Text style={styles.reminderTitle}>Sortie au parc</Text><Text style={styles.reminderText}>Prévoir chapeau et bouteille d’eau.</Text></View><View style={styles.pill}><Text style={styles.pillText}>18 sept.</Text></View></Card>

    <PrimaryButton label="Écrire à la nounou" onPress={() => router.push('/messages')} icon="chatbubbles-outline"/>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream }, page: { padding: 20, paddingBottom: 42 }, top: { flexDirection:'row',alignItems:'center',justifyContent:'space-between' },
  avatar:{width:42,height:42,borderRadius:21,backgroundColor:colors.lavender,alignItems:'center',justifyContent:'center'}, avatarText:{color:colors.navy,fontWeight:'900'},
  intro:{paddingTop:24,paddingBottom:18}, h1:{color:colors.navy,fontSize:36,fontWeight:'900',letterSpacing:-1.2,marginTop:4}, lead:{color:colors.muted,fontSize:15,lineHeight:22,marginTop:7},
  childCard:{backgroundColor:colors.white,marginBottom:14}, childHead:{flexDirection:'row',gap:12,alignItems:'center'}, childAvatar:{width:52,height:52,borderRadius:18,backgroundColor:colors.sky,alignItems:'center',justifyContent:'center'}, childAvatarText:{fontSize:18,fontWeight:'900',color:colors.navy}, childName:{fontSize:19,fontWeight:'900',color:colors.ink}, childMeta:{fontSize:12,color:colors.muted,marginTop:3}, okBadge:{paddingHorizontal:10,paddingVertical:6,borderRadius:radius.pill,backgroundColor:colors.sage}, okText:{fontSize:11,fontWeight:'900',color:colors.success},
  healthRow:{marginTop:14,paddingTop:12,borderTopWidth:1,borderTopColor:colors.line,flexDirection:'row',gap:8,alignItems:'center'}, healthText:{flex:1,color:colors.ink,fontWeight:'800',fontSize:13}, link:{color:colors.info,fontWeight:'800',fontSize:12},
  grid:{flexDirection:'row',gap:10,marginBottom:26}, miniCard:{flex:1,minHeight:142}, miniKicker:{fontSize:9,fontWeight:'900',letterSpacing:.9,color:colors.navySoft,marginTop:10}, miniTitle:{fontSize:23,fontWeight:'900',color:colors.navy,marginTop:4}, miniText:{fontSize:12,color:colors.navySoft,marginTop:3},
  timeline:{marginBottom:26}, event:{flexDirection:'row',gap:13,minHeight:82}, rail:{width:40,alignItems:'center'}, eventIcon:{width:38,height:38,borderRadius:14,alignItems:'center',justifyContent:'center',zIndex:2}, line:{width:1,backgroundColor:colors.line,flex:1}, eventBody:{flex:1,paddingBottom:18}, eventTop:{flexDirection:'row',justifyContent:'space-between'}, eventType:{color:colors.navySoft,fontSize:10,fontWeight:'900',textTransform:'uppercase',letterSpacing:.9}, eventTime:{color:colors.muted,fontSize:11,fontWeight:'700'}, eventTitle:{color:colors.ink,fontSize:16,fontWeight:'900',marginTop:5}, eventDetail:{color:colors.muted,fontSize:13,lineHeight:19,marginTop:3},
  reminder:{flexDirection:'row',gap:12,alignItems:'center',marginBottom:10,padding:14}, reminderIcon:{width:44,height:44,borderRadius:15,alignItems:'center',justifyContent:'center'}, reminderTitle:{color:colors.ink,fontWeight:'900',fontSize:15}, reminderText:{color:colors.muted,fontSize:12,marginTop:3}, pill:{backgroundColor:colors.white,borderWidth:1,borderColor:colors.line,borderRadius:radius.pill,paddingHorizontal:9,paddingVertical:6}, pillText:{fontSize:10,fontWeight:'900',color:colors.navySoft}
});
