import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '@/src/theme';

export function Card({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <Text style={styles.eyebrow}>{children}</Text>;
}

export function PrimaryButton({ label, onPress, icon = 'arrow-forward' }: { label: string; onPress: () => void; icon?: keyof typeof Ionicons.glyphMap }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.primary, pressed && { opacity: .86 }]}><Text style={styles.primaryText}>{label}</Text><Ionicons name={icon} size={18} color={colors.white}/></Pressable>;
}

export function SoftButton({ label, onPress, icon }: { label: string; onPress: () => void; icon: keyof typeof Ionicons.glyphMap }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.soft, pressed && { opacity: .75 }]}><Ionicons name={icon} size={18} color={colors.navy}/><Text style={styles.softText}>{label}</Text></Pressable>;
}

export function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: string }) {
  return <View style={styles.sectionHead}><View>{eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}<Text style={styles.sectionTitle}>{title}</Text></View>{action ? <Text style={styles.action}>{action}</Text> : null}</View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.line, padding: 18, ...shadow },
  eyebrow: { color: colors.muted, fontSize: 11, fontWeight: '900', letterSpacing: 1.2, textTransform: 'uppercase' },
  primary: { backgroundColor: colors.navy, minHeight: 54, borderRadius: 16, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  primaryText: { color: colors.white, fontWeight: '900', fontSize: 15 },
  soft: { backgroundColor: colors.cream, borderRadius: 16, paddingVertical: 13, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 8 },
  softText: { color: colors.navy, fontWeight: '800', fontSize: 13 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 },
  sectionTitle: { color: colors.ink, fontSize: 23, fontWeight: '900', letterSpacing: -.7, marginTop: 4 },
  action: { color: colors.navySoft, fontWeight: '900', fontSize: 12 }
});
