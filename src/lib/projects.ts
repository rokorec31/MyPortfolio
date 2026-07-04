export interface Project {
  id: string;
  title: string;
  year: number;
  description: string;
  content: string; // Markdown
  tags: string[];
  imageUrl: string;
}

// Mock data — will be replaced by Firestore in Stage 4
export const projects: Project[] = [
  {
    id: "realtime-video-chat",
    title: "Realtime Video Chat",
    year: 2026,
    description:
      "A low-latency video conferencing app with screen sharing and live captions.",
    content: `## Overview

A realtime video chat application built for low latency and high reliability.

## Features

- WebRTC-based peer connections via LiveKit
- Live captions powered by on-device speech recognition
- Screen sharing with adaptive bitrate

## Architecture

The client is built with Next.js and connects to a LiveKit SFU cluster for media routing.`,
    tags: ["Next.js", "LiveKit", "TypeScript"],
    imageUrl:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&q=80",
  },
  {
    id: "ios-fitness-tracker",
    title: "iOS Fitness Tracker",
    year: 2025,
    description:
      "A native iOS app that tracks workouts, syncs with HealthKit, and visualizes progress.",
    content: `## Overview

A native fitness tracking app for iOS.

## Features

- HealthKit integration for workout and heart-rate data
- Custom charts built with Swift Charts
- Widgets and Live Activities for at-a-glance progress`,
    tags: ["Swift", "SwiftUI", "HealthKit"],
    imageUrl:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&q=80",
  },
  {
    id: "ai-writing-assistant",
    title: "AI Writing Assistant",
    year: 2025,
    description:
      "A browser-based writing tool with AI-powered suggestions and grammar fixes.",
    content: `## Overview

An AI-assisted writing tool that runs entirely in the browser.

## Features

- Inline suggestions with streaming responses
- Grammar and tone rewriting
- Local draft history with IndexedDB`,
    tags: ["Next.js", "TypeScript", "Claude API"],
    imageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80",
  },
  {
    id: "smart-home-dashboard",
    title: "Smart Home Dashboard",
    year: 2024,
    description:
      "A unified dashboard controlling lights, sensors, and cameras across the home.",
    content: `## Overview

A single dashboard for every smart device in the house.

## Features

- MQTT-based device communication
- Realtime sensor charts
- Scene automation with a visual rule builder`,
    tags: ["React", "MQTT", "Node.js"],
    imageUrl:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80",
  },
  {
    id: "ecommerce-storefront",
    title: "E-commerce Storefront",
    year: 2024,
    description:
      "A headless commerce storefront with instant search and one-page checkout.",
    content: `## Overview

A fast, headless e-commerce storefront.

## Features

- Instant product search with typo tolerance
- One-page checkout with Stripe
- Incremental static regeneration for product pages`,
    tags: ["Next.js", "Stripe", "Tailwind CSS"],
    imageUrl:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80",
  },
  {
    id: "open-source-cli",
    title: "Open Source CLI Tool",
    year: 2023,
    description:
      "A developer productivity CLI that automates repetitive project setup tasks.",
    content: `## Overview

A command-line tool that scaffolds and automates common dev workflows.

## Features

- Template-based project scaffolding
- Plugin system for custom commands
- Cross-platform binaries via CI`,
    tags: ["Rust", "CLI", "GitHub Actions"],
    imageUrl:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&q=80",
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
