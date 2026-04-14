import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const MODELS = [
  {
    name: "HunyuanVideo",
    type: "Open-source base model",
    quality: "Strong motion + detail, often 720p-1080p workflows",
    bestFor: "General cinematic clips, character scenes",
  },
  {
    name: "LTX-Video",
    type: "Fast open-source generation",
    quality: "Efficient generation with upscaling to 1080p+",
    bestFor: "Rapid prototyping and social content",
  },
  {
    name: "Wan 2.1 (community checkpoints)",
    type: "Emerging open video model family",
    quality: "Great style range, commonly paired with enhancement",
    bestFor: "Stylized content and visual experimentation",
  },
];

const PIPELINE = [
  {
    title: "1) Generate at native resolution",
    details: "Use 16:9 prompts, 24fps target, and motion control (camera move + subject action).",
  },
  {
    title: "2) Temporal enhancement",
    details: "Apply frame interpolation or temporal consistency pass before upscaling.",
  },
  {
    title: "3) Upscale to 1080p or higher",
    details: "Use ESRGAN/Real-ESRGAN/Topaz-style enhancer to reach 1920x1080 or 4K deliverables.",
  },
  {
    title: "4) Final encode",
    details: "Export H.264/H.265, 20-40 Mbps for 1080p masters to preserve detail.",
  },
];

const PROMPT_TEMPLATE = `Cinematic [shot type] of [subject], [action], in [environment],\nlighting: [style], camera: [movement], mood: [tone],\nnegative: blur, artifacts, extra limbs, flicker.`;

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Open-Source Text-to-Video Builder</Text>
        <Text style={styles.subtitle}>
          Recommended open models and a practical workflow for reliable 1080p+ output.
        </Text>

        <Text style={styles.sectionTitle}>Best Open Models</Text>
        {MODELS.map((model) => (
          <View key={model.name} style={styles.card}>
            <Text style={styles.cardTitle}>{model.name}</Text>
            <Text style={styles.line}><Text style={styles.label}>Type:</Text> {model.type}</Text>
            <Text style={styles.line}><Text style={styles.label}>Quality:</Text> {model.quality}</Text>
            <Text style={styles.line}><Text style={styles.label}>Best for:</Text> {model.bestFor}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>1080p+ Production Pipeline</Text>
        <View style={styles.card}>
          {PIPELINE.map((step) => (
            <View key={step.title} style={styles.stepBlock}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepText}>{step.details}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Prompt Starter</Text>
        <View style={styles.card}>
          <Text style={styles.prompt}>{PROMPT_TEMPLATE}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },
  container: {
    padding: 16,
    gap: 12,
  },
  title: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "800",
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    marginTop: 8,
    color: "#93c5fd",
    fontSize: 18,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#0f172a",
    borderColor: "#1e293b",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  cardTitle: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  line: {
    color: "#cbd5e1",
    fontSize: 13,
    marginBottom: 4,
  },
  label: {
    color: "#e2e8f0",
    fontWeight: "700",
  },
  stepBlock: {
    marginBottom: 10,
  },
  stepTitle: {
    color: "#e2e8f0",
    fontWeight: "700",
    marginBottom: 3,
  },
  stepText: {
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 18,
  },
  prompt: {
    color: "#f8fafc",
    fontFamily: "monospace",
    fontSize: 12,
    lineHeight: 18,
  },
});
