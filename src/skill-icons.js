/* Icons for skill tags (the small pills under "Built with" and "Skills").
   Keys are tag names, matched case-insensitively. Values are files in public/logos/skills/.
   A tag without an entry is shown as plain text. */
const files = {
  'python': 'python.svg', 'fastapi': 'fastapi.svg', 'pytorch': 'pytorch.svg', 'qdrant': 'qdrant.svg',
  'docker': 'docker.svg', 'react': 'react.svg', 'react 18': 'react.svg', 'react native': 'react.svg',
  'typescript': 'typescript.svg', 'swift': 'swift.svg', 'vapor': 'vapor.svg', 'vapor queues': 'vapor.svg',
  'mongodb': 'mongodb.svg', 'stripe': 'stripe.svg', 'firebase': 'firebase.svg', 'firebase storage': 'firebase.svg',
  'github workflows': 'github.svg', 'jenkins': 'jenkins.svg', 'kubernetes': 'kubernetes.svg',
  'ga4': 'googleanalytics.svg', 'ga4 apis': 'googleanalytics.svg', 'dinov2': 'meta.svg',
  'vision ai': 'lucide-eye.svg', 'vision model': 'lucide-eye.svg', 'video streams': 'lucide-video.svg',
  'real-time video': 'lucide-video.svg', 'testing': 'lucide-clipboard-check.svg', 'ci/cd': 'lucide-workflow.svg',
  'scrum': 'lucide-list-checks.svg', 'stakeholder management': 'lucide-users.svg', 'agents': 'lucide-sparkles.svg',
  'voice': 'lucide-messages-square.svg', 'webhooks': 'lucide-plug-zap.svg', 'server migration': 'lucide-server.svg',
  'backend services': 'lucide-server.svg', 'vendor integration': 'lucide-plug.svg',
  'self-service flows': 'lucide-layers.svg', 'workflow automation': 'lucide-repeat.svg',
  'durable jobs': 'lucide-refresh-cw.svg', 'image generation': 'lucide-image.svg',
  'barcode & inventory': 'lucide-tags.svg', 'inventory': 'lucide-tags.svg', 'tracking': 'lucide-crosshair.svg',
};

export function skillIcon(name) {
  const f = files[String(name).toLowerCase()];
  return f ? `/logos/skills/${f}` : null;
}
