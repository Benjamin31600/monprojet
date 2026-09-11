import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Brand } from '@/src/components/Brand';
import { Card, Eyebrow, PrimaryButton, SectionTitle } from '@/src/components/Ui';
import { colors, radius } from '@/src/theme';
import { groupChildren } from '@/src/data/demo';

const tone: Record<string,string> = { butter: colors.butter, mint: colors.mint, sky: colors.sky, lavender: colors.lavender };

export default function EducatorSpace() {
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.page}>
    <View style={styles.top}><Brand compact/><Pressable onPress={() => router.replace('/')} style={styles.avatar}><Text style={styles.avatarText}>AM</Text></Pressable></View>

    <View style={styles.intro}><Eyebrow>MON SERVICE DE GARDE</Eyebrow><Text style={styles.h1}>Bonjour Amélie.</Text><Text style={styles.lead}>4 enfants présents · 1 rappel important · 2 parents à confirmer</Text></View>

    <View style={styles.stats}>
      <Card style={[styles.stat,{backgroundColor:colors.sage}]}><Text style={styles.statValue}>4/6</Text><Text style={styles.statLabel}>Présents</Text></Card>
      <Card style={[styles.stat,{backgroundColor:colors.sky}]}><Text style={styles.statValue}>2</Text><Text style={styles.statLabel}>Messages</Text></Card>
      <Card style={[styles.stat,{backgroundColor:colors.butter}]}><Text style={styles.statValue}>1</Text><Text style={styles.statLabel}>Paiement dû</Text></Card>
    </View>

    <Card style={styles.quickCard}>
      <Text style={styles.quickTitle}>Ajouter au journal</Text><Text style={styles.quickText}>Choisissez une action, sélectionnez un ou plusieurs enfants puis publiez en quelques secondes.</Text>
      <View style={styles.quickGrid}>{[
        ['restaurant-outline','Repas',colors.peach],['moon-outline','Sieste',colors.lavender],['color-palette-outline','Activité',colors.sky],['happy-outline','Humeur',colors.sage],['camera-outline','Photo',colors.blush],['alert-circle-outline','Incident',colors.butter]
      ].map(([icon,label,bg]) => <Pressable key={label as string} style={[styles.quick,{backgroundColor:bg as string}]} onPress={() => {}}><Ionicons name={icon as any} size={21} color={colors.navy}/><Text style={styles.quickTextLabel}>{label as string}</Text></Pressable>)}</View>
    </Card>

    <SectionTitle eyebrow="MON GROUPE" title="Enfants aujourd’hui" action="Voir planning"/>
    <View style={styles.children}>{groupChildren.map((child, index) => <Card key={child.name} style={styles.child}><View style={[styles.childAvatar,{ backgroundColor: tone[child.tone] || [colors.sky,colors.sage,colors.lavender][index%3] }]}><Text style={styles.initial}>{child.name.slice(0,1)}</Text></View><View style={{ flex: 1 }}><Text style={styles.childName}>{child.name}</Text><Text style={styles.childMeta}>{child.status} · {child.note}</Text></View><Pressable style={styles.more}><Ionicons name="add" size={20} color={colors.navy}/></Pressable></Card>)}</View>

    <SectionTitle eyebrow="À FAIRE" title="Rappels du jour"/>
    <Card style={styles.task}><View style={[styles.taskIcon,{backgroundColor:colors.blush}]}><Ionicons name="bag-handle-outline" size={20} color={colors.navy}/></View><View style={{flex:1}}><Text style={styles.taskTitle}>Couches pour Scott</Text><Text style={styles.taskText}>Envoyer un rappel au parent avant 16 h.</Text></View><Pressable><Text style={styles.taskAction}>Envoyer</Text></Pressable></Card>
    <Card style={styles.task}><View style={[styles.taskIcon,{backgroundColor:colors.butter}]}><Ionicons name="wallet-outline" size={20} color={colors.navy}/></View><View style={{flex:1}}><Text style={styles.taskTitle}>Frais de garde à confirmer</Text><Text style={styles.taskText}>1 échéance arrive le 15 septembre.</Text></View><Pressable><Text style={styles.taskAction}>Voir</Text></Pressable></Card>

    <Card style={styles.inviteCard}><View style={{flex:1}}><Text style={styles.inviteEyebrow}>DÉVELOPPER MON ESPACE</Text><Text style={styles.inviteTitle}>Inviter un parent</Text><Text style={styles.inviteText}>Le parent crée sa fiche enfant, ses contacts d’urgence, allergies, habitudes et autorisations depuis une invitation sécurisée.</Text></View><View style={styles.inviteIcon}><Ionicons name="person-add-outline" size={23} color={colors.navy}/></View></Card>

    <PrimaryButton label="Inviter un parent" onPress={() => {}} icon="person-add-outline"/>
    <Pressable onPress={() => router.push('/messages')} style={styles.messages}><Ionicons name="chatbubbles-outline" size={18} color={colors.navy}/><Text style={styles.messagesText}>Ouvrir les messages parents</Text></Pressable>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:colors.cream}, page:{padding:20,paddingBottom:42}, top:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}, avatar:{width:42,height:42,borderRadius:21,backgroundColor:colors.sage,alignItems:'center',justifyContent:'center'}, avatarText:{fontWeight:'900',color:colors.navy},
  intro:{paddingTop:24,paddingBottom:18}, h1:{color:colors.navy,fontSize:36,fontWeight:'900',letterSpacing:-1.2,marginTop:4}, lead:{color:colors.muted,fontSize:14,lineHeight:21,marginTop:7},
  stats:{flexDirection:'row',gap:9,marginBottom:14}, stat:{flex:1,padding:13,minHeight:88}, statValue:{color:colors.navy,fontSize:24,fontWeight:'900'}, statLabel:{color:colors.navySoft,fontSize:11,fontWeight:'800',marginTop:5},
  quickCard:{backgroundColor:colors.white,marginBottom:26}, quickTitle:{color:colors.navy,fontSize:23,fontWeight:'900'}, quickText:{color:colors.muted,fontSize:13,lineHeight:19,marginTop:4,marginBottom:14}, quickGrid:{flexDirection:'row',flexWrap:'wrap',gap:8}, quick:{width:'31%',minWidth:92,paddingVertical:13,borderRadius:16,alignItems:'center',gap:6}, quickTextLabel:{color:colors.navy,fontWeight:'800'},
  children:{gap:9,marginBottom:26}, child:{flexDirection:'row',alignItems:'center',gap:12,padding:13}, childAvatar:{width:44,height:44,borderRadius:16,alignItems:'center',justifyContent:'center'}, initial:{fontWeight:'900',color:colors.navy}, childName:{color:colors.ink,fontSize:15,fontWeight:'900'}, childMeta:{color:colors.muted,fontSize:12,marginTop:3}, more:{width:34,height:34,borderRadius:17,backgroundColor:colors.cream,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:colors.line},
  task:{flexDirection:'row',gap:12,alignItems:'center',marginBottom:10,padding:14}, taskIcon:{width:44,height:44,borderRadius:15,alignItems:'center',justifyContent:'center'}, taskTitle:{color:colors.ink,fontSize:15,fontWeight:'900'}, taskText:{color:colors.muted,fontSize:12,lineHeight:17,marginTop:3}, taskAction:{color:colors.info,fontSize:12,fontWeight:'900'},
  inviteCard:{flexDirection:'row',gap:12,alignItems:'center',backgroundColor:colors.lavender,borderColor:'#DED6EE',marginTop:16,marginBottom:14}, inviteEyebrow:{fontSize:9,fontWeight:'900',letterSpacing:.8,color:colors.navySoft}, inviteTitle:{fontSize:20,fontWeight:'900',color:colors.navy,marginTop:4}, inviteText:{fontSize:12,lineHeight:18,color:colors.navySoft,marginTop:5}, inviteIcon:{width:48,height:48,borderRadius:16,backgroundColor:colors.white,alignItems:'center',justifyContent:'center'},
  messages:{marginTop:10,flexDirection:'row',gap:8,alignItems:'center',justifyContent:'center',padding:14,borderRadius:radius.md,borderWidth:1,borderColor:colors.line,backgroundColor:colors.white}, messagesText:{fontWeight:'900',color:colors.navy,fontSize:13}
});
