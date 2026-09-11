import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/theme';

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <View style={styles.row} accessibilityLabel="MyCoco">
      <View style={[styles.mark, compact && styles.markCompact]}>
        <View style={styles.dotA} />
        <View style={styles.dotB} />
        <View style={styles.smile} />
      </View>
      <Text style={[styles.word, compact && styles.wordCompact]}>mycoco</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  mark: { width: 44, height: 44, borderRadius: 16, backgroundColor: colors.butter, position: 'relative', overflow: 'hidden' },
  markCompact: { width: 34, height: 34, borderRadius: 12 },
  dotA: { position: 'absolute', width: 10, height: 10, borderRadius: 9, backgroundColor: colors.navy, top: 11, left: 9 },
  dotB: { position: 'absolute', width: 10, height: 10, borderRadius: 9, backgroundColor: colors.coral, top: 11, right: 9 },
  smile: { position: 'absolute', width: 20, height: 10, borderBottomWidth: 3, borderBottomColor: colors.navy, borderRadius: 20, bottom: 9, left: 12 },
  word: { color: colors.navy, fontSize: 28, fontWeight: '900', letterSpacing: -1.3 },
  wordCompact: { fontSize: 23 }
});
