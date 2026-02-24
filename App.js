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
    title: "Watch a 30s sponsored ad",
    payout: 0.25,
    description: "Complete short video ads and earn instantly.",
  },
  {
    id: "walk",
    type: "Walk",
    title: "Walk 2,000 steps",
    payout: 0.7,
    description: "Track your movement and earn for every active day.",
  },
  {
    id: "survey",
    type: "Survey",
    title: "Answer a 5 minute survey",
    payout: 1.15,
    description: "Share your opinion to unlock bonus rewards.",
  },
  {
    id: "watch-ads-2",
    type: "Watch Ads",
    title: "Watch 3 product clips",
    payout: 0.5,
    description: "Finish all clips in one go for a bigger reward.",
  },
];

const formatMoney = (value) => `$${value.toFixed(2)}`;

const getTier = (earned) => {
  if (earned >= 15) return "Gold Earner";
  if (earned >= 5) return "Silver Earner";
  return "Starter";
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

  const completeTask = (taskId) => {
    setCompletedTaskIds((current) =>
      current.includes(taskId) ? current : [...current, taskId]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>EarnMate</Text>
        <Text style={styles.subheading}>
          Complete quick tasks like ads, walking, and surveys to earn money.
        </Text>

        <View style={styles.statsRow}>
          <StatCard label="Earned" value={formatMoney(earned)} />
          <StatCard label="Completed" value={`${completedTaskIds.length}`} />
          <StatCard label="Tier" value={getTier(earned)} />
        </View>

        <Text style={styles.sectionTitle}>Available Tasks</Text>
        {pendingTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>All tasks completed 🎉</Text>
            <Text style={styles.emptyStateDescription}>
              Come back later for new earning opportunities.
            </Text>
          </View>
        ) : (
          pendingTasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <View style={styles.taskTopRow}>
                <Text style={styles.taskType}>{task.type}</Text>
                <Text style={styles.taskPayout}>{formatMoney(task.payout)}</Text>
              </View>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskDescription}>{task.description}</Text>
              <Pressable
                style={styles.button}
                onPress={() => completeTask(task.id)}
              >
                <Text style={styles.buttonText}>Mark as completed</Text>
              </Pressable>
            </View>
          ))
        )}
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
    backgroundColor: "#0f172a",
  },
  container: {
    padding: 18,
    paddingBottom: 32,
  },
  heading: {
    color: "#f8fafc",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 12,
  },
  subheading: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 18,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "#1e293b",
    padding: 12,
  },
  statLabel: {
    color: "#94a3b8",
    fontSize: 12,
  },
  statValue: {
    color: "#f8fafc",
    marginTop: 6,
    fontSize: 16,
    fontWeight: "700",
  },
  sectionTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  taskCard: {
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  taskTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  taskType: {
    color: "#38bdf8",
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
  },
  taskPayout: {
    color: "#22c55e",
    fontWeight: "700",
    fontSize: 15,
  },
  taskTitle: {
    color: "#e2e8f0",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },
  taskDescription: {
    color: "#cbd5e1",
    fontSize: 14,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#f8fafc",
    fontWeight: "700",
  },
  emptyState: {
    marginTop: 4,
    backgroundColor: "#1e293b",
    borderRadius: 14,
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
  },
});
