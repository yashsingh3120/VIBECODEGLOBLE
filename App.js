import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const TASKS = [
  {
    id: "watch-ads",
    type: "Watch Ads",
    emoji: "🎬",
    title: "Watch a 30s sponsored ad",
    payout: 0.25,
    duration: "00:30",
    description: "Complete short video ads and earn instantly.",
  },
  {
    id: "walk",
    type: "Walk",
    emoji: "🚶",
    title: "Walk 2,000 steps",
    payout: 0.7,
    duration: "Today",
    description: "Track your movement and earn for every active day.",
  },
  {
    id: "survey",
    type: "Survey",
    emoji: "📝",
    title: "Answer a 5 minute survey",
    payout: 1.15,
    duration: "05:00",
    description: "Share your opinion to unlock bonus rewards.",
  },
  {
    id: "watch-ads-2",
    type: "Watch Ads",
    emoji: "📺",
    title: "Watch 3 product clips",
    payout: 0.5,
    duration: "03:00",
    description: "Finish all clips in one go for a bigger reward.",
  },
];

const formatMoney = (value) => `$${value.toFixed(2)}`;

const getTier = (earned) => {
  if (earned >= 15) return "Gold Earner";
  if (earned >= 5) return "Silver Earner";
  return "Starter";
};

const getLevelProgress = (earned) => {
  if (earned >= 15) return 1;
  if (earned >= 5) return (earned - 5) / 10;
  return earned / 5;
};

export default function App() {
  const [completedTaskIds, setCompletedTaskIds] = useState([]);

  const earned = useMemo(
    () =>
      TASKS.filter((task) => completedTaskIds.includes(task.id)).reduce(
        (sum, task) => sum + task.payout,
        0
      ),
    [completedTaskIds]
  );

  const pendingTasks = useMemo(
    () => TASKS.filter((task) => !completedTaskIds.includes(task.id)),
    [completedTaskIds]
  );

  const completedTasks = useMemo(
    () => TASKS.filter((task) => completedTaskIds.includes(task.id)),
    [completedTaskIds]
  );

  const progressWidth = `${Math.max(6, Math.round(getLevelProgress(earned) * 100))}%`;

  const completeTask = (taskId) => {
    setCompletedTaskIds((current) =>
      current.includes(taskId) ? current : [...current, taskId]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>EarnMate Wallet</Text>
          <Text style={styles.heroBalance}>{formatMoney(earned)}</Text>
          <Text style={styles.heroSubtext}>Total balance earned from today&apos;s tasks</Text>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: progressWidth }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>Starter</Text>
            <Text style={styles.progressText}>Silver</Text>
            <Text style={styles.progressText}>Gold</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <StatCard label="Tier" value={getTier(earned)} />
          <StatCard label="Completed" value={`${completedTaskIds.length}`} />
          <StatCard label="Pending" value={`${pendingTasks.length}`} />
        </View>

        <Text style={styles.sectionTitle}>Available Tasks</Text>
        {pendingTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>All tasks completed 🎉</Text>
            <Text style={styles.emptyStateDescription}>
              You completed every ad, walking, and survey task. New tasks arrive tomorrow.
            </Text>
          </View>
        ) : (
          pendingTasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <View style={styles.taskHeader}>
                <Text style={styles.taskEmoji}>{task.emoji}</Text>
                <View style={styles.taskHeaderText}>
                  <Text style={styles.taskType}>{task.type}</Text>
                  <Text style={styles.taskTime}>{task.duration}</Text>
                </View>
                <Text style={styles.taskPayout}>{formatMoney(task.payout)}</Text>
              </View>

              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskDescription}>{task.description}</Text>

              <Pressable style={styles.button} onPress={() => completeTask(task.id)}>
                <Text style={styles.buttonText}>Complete task</Text>
              </Pressable>
            </View>
          ))
        )}

        {completedTasks.length > 0 ? (
          <View style={styles.completedSection}>
            <Text style={styles.completedTitle}>Completed</Text>
            {completedTasks.map((task) => (
              <View key={task.id} style={styles.completedItem}>
                <Text style={styles.completedText}>
                  {task.emoji} {task.title}
                </Text>
                <Text style={styles.completedPayout}>+{formatMoney(task.payout)}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ label, value }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },
  container: {
    padding: 16,
    paddingBottom: 30,
  },
  heroCard: {
    backgroundColor: "#1d4ed8",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },
  heroTitle: {
    color: "#bfdbfe",
    fontSize: 14,
    fontWeight: "700",
  },
  heroBalance: {
    color: "#eff6ff",
    fontSize: 38,
    fontWeight: "800",
    marginTop: 6,
  },
  heroSubtext: {
    color: "#dbeafe",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 12,
  },
  progressTrack: {
    width: "100%",
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.35)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#facc15",
  },
  progressLabels: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressText: {
    color: "#dbeafe",
    fontSize: 11,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    padding: 12,
  },
  statLabel: {
    color: "#94a3b8",
    fontSize: 12,
  },
  statValue: {
    color: "#f8fafc",
    marginTop: 8,
    fontSize: 15,
    fontWeight: "700",
  },
  sectionTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
  },
  taskCard: {
    backgroundColor: "#0f172a",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
    padding: 14,
    marginBottom: 12,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  taskEmoji: {
    fontSize: 22,
    marginRight: 10,
  },
  taskHeaderText: {
    flex: 1,
  },
  taskType: {
    color: "#38bdf8",
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
  },
  taskTime: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 2,
  },
  taskPayout: {
    color: "#22c55e",
    fontWeight: "800",
    fontSize: 16,
  },
  taskTitle: {
    color: "#e2e8f0",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },
  taskDescription: {
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#f8fafc",
    fontWeight: "700",
    fontSize: 14,
  },
  emptyState: {
    marginTop: 4,
    backgroundColor: "#0f172a",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
    padding: 18,
  },
  emptyStateTitle: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  emptyStateDescription: {
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 20,
  },
  completedSection: {
    marginTop: 8,
    backgroundColor: "#0f172a",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
    padding: 14,
  },
  completedTitle: {
    color: "#f8fafc",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 8,
  },
  completedItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },
  completedText: {
    color: "#cbd5e1",
    fontSize: 13,
    flex: 1,
    marginRight: 8,
  },
  completedPayout: {
    color: "#22c55e",
    fontSize: 13,
    fontWeight: "700",
  },
});
