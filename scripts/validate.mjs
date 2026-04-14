import fs from 'node:fs';

const appSource = fs.readFileSync(new URL('../App.js', import.meta.url), 'utf8');
const readme = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');

const requiredSnippets = [
  'Open-Source Text-to-Video Builder',
  'Best Open Models',
  '1080p+ Production Pipeline',
  'Prompt Starter',
  'HunyuanVideo',
];

const missing = requiredSnippets.filter((snippet) => !appSource.includes(snippet));
if (missing.length > 0) {
  console.error(`Missing required UI snippets in App.js: ${missing.join(', ')}`);
  process.exit(1);
}

if (!readme.includes('Run locally')) {
  console.error('README is missing run instructions section.');
  process.exit(1);
}

console.log('Validation passed: text-to-video toolkit UI and docs are present.');
