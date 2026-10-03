<div align="center">

# 🧠 Personal AI Memory

### *What actually needs my attention right now?*

A privacy-first personal AI that turns **messages, meetings, deadlines, and commitments** into useful context — so you can focus on what actually matters.

<br>

[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?style=for-the-badge\&logo=react\&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)](https://vite.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br>

**Built for the Nebius × NVIDIA Global AI Hackathon 2026**

</div>

---

## ✨ The Problem

We don't have an information problem.

We have an **attention problem**.

Emails, messages, meetings, deadlines, notes, and commitments continuously compete for our attention. Traditional productivity tools store all of this information — but still leave the user asking:

> **"Okay... but what actually needs my attention right now?"**

**Personal AI Memory** is built around answering that question.

---

## 🎯 What It Does

<table>
<tr>
<td width="50%">

### 🔔 Attention Inbox

Surface the information that actually deserves attention.

* Priority detection
* Deadlines
* Action-required items
* Noise filtering
* Explainable prioritization
* Save important context to memory

</td>
<td width="50%">

### 🎙️ Meeting Capture

Turn meetings into reusable knowledge.

* Explicit recording activation
* Live recording state
* Transcript
* Summary
* Decisions
* Action items
* Deadlines & assignees

</td>
</tr>

<tr>
<td width="50%">

### 🧠 Personal Memory

Build a useful long-term context layer.

* People
* Preferences
* Facts
* Commitments
* Decisions
* Tasks
* Important dates

</td>
<td width="50%">

### 📅 Planning

Connect attention with upcoming commitments.

* Deadlines
* Conflicts
* Upcoming tasks
* Priority context
* Commitment awareness

</td>
</tr>
</table>

---

## 🖥️ Product

<div align="center">

### A calm interface for a noisy digital life.

<!-- Replace with actual screenshot/GIF when the UI is finalized -->

`Attention` → `Meetings` → `Memory` → `Planner`

</div>

---

## 🧭 The Core Flow

```text
                 ┌─────────────────────┐
                 │   Information       │
                 │                     │
                 │ Emails • Messages   │
                 │ Meetings • Notes    │
                 │ Deadlines • Tasks   │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Personal AI       │
                 │                     │
                 │ Understand          │
                 │ Extract             │
                 │ Remember            │
                 │ Prioritize          │
                 └──────────┬──────────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
       ┌─────────────────┐     ┌─────────────────┐
       │ 🧠 Memory       │     │ 🔔 Attention    │
       │                 │     │                 │
       │ What matters    │     │ What matters   │
       │ long-term       │     │ right now      │
       └─────────────────┘     └─────────────────┘
```

---

## 🔐 Privacy Comes First

Personal AI should never feel like surveillance.

That's why privacy is part of the product architecture.

* 🎙️ **Explicit recording only**
* 🔴 **Clearly visible recording state**
* 🚫 **No background or covert recording**
* 🧠 **User-controlled memories**
* 🗑️ **Memories can be inspected and deleted**
* 🔑 **API credentials never belong in the frontend**
* 🧪 **Synthetic data for demonstrations**

The user should always know **when information is being captured and what is being remembered.**

---

## 🧠 AI + Deterministic Systems

Not everything needs an LLM.

Personal AI Memory deliberately separates **AI reasoning** from **predictable application logic**.

| AI handles                | Code handles         |
| ------------------------- | -------------------- |
| 📝 Summarization          | 🎨 UI                |
| 🔎 Information extraction | 🔀 Filtering         |
| 🎙️ Meeting understanding | ↕️ Sorting           |
| 🧠 Memory extraction      | 📅 Date calculations |
| ⚡ Priority reasoning      | ✅ Validation         |
| 📌 Action-item extraction | 💾 Local persistence |

This keeps the product predictable where it should be predictable, while using AI where contextual reasoning actually adds value.

---

## ⚙️ Technology

<div align="center">

| Layer                 | Technology                           |
| --------------------- | ------------------------------------ |
| **Frontend**          | React + TypeScript                   |
| **Build**             | Vite                                 |
| **Styling**           | Tailwind CSS                         |
| **Icons**             | Lucide React                         |
| **State**             | React Context + `useReducer`         |
| **Persistence**       | Browser `localStorage`               |
| **AI Infrastructure** | Nebius AI Cloud                      |
| **AI Models**         | NVIDIA open-source models / Nemotron |

</div>

> The Nebius/NVIDIA AI layer is currently being integrated. The current repository contains the frontend product foundation and deterministic demo workflows.

---

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────┐
│                 React App                   │
├─────────────────────────────────────────────┤
│                                             │
│  Attention     Meetings     Memory  Planner │
│      │             │           │       │    │
│      └─────────────┴───────────┴───────┘    │
│                    │                        │
│              AppContext                    │
│             useReducer                     │
│                    │                        │
│              Local Storage                 │
│                    │                        │
└────────────────────┼────────────────────────┘
                     │
                     ▼
              AI Service Layer
                     │
                     ▼
          ┌──────────────────────┐
          │  Nebius Token Factory│
          │          +           │
          │ NVIDIA Open Models   │
          └──────────────────────┘
```

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── inbox/
│   └── layout/
│
├── context/
│   ├── AppContext.tsx
│   ├── context.ts
│   ├── types.ts
│   └── useApp.ts
│
├── data/
│   └── mockData.ts
│
├── types/
│   ├── attention.ts
│   ├── meeting.ts
│   ├── memory.ts
│   └── planner.ts
│
├── utils/
│   ├── mockAnalyzer.ts
│   ├── meetingPresets.ts
│   └── priorityUtils.ts
│
├── views/
│   ├── AttentionView.tsx
│   ├── MeetingsView.tsx
│   ├── MemoryView.tsx
│   └── PlannerView.tsx
│
├── App.tsx
└── main.tsx
```

---

## 🚀 Getting Started

### Requirements

* **Node.js**
* **npm**
* **Git**

### 1. Clone

```bash
git clone https://github.com/Harshit-Batra2008/personal-ai-memory.git
cd personal-ai-memory
```

### 2. Install

```bash
npm install
```

### 3. Run

```bash
npm run dev
```

Open the local URL shown by Vite.

### 4. Build

```bash
npm run build
```

### 5. Lint

```bash
npx eslint src
```

---

## 🛣️ Roadmap

### ✅ Product Foundation

* [x] Application shell
* [x] Navigation
* [x] State architecture
* [x] Local persistence
* [x] Synthetic demo data

### ✅ Attention Intelligence

* [x] Attention Inbox
* [x] Priority indicators
* [x] Action tracking
* [x] Content analysis prototype
* [x] Memory linking

### 🚧 Meeting Intelligence

* [x] Explicit meeting workflow
* [x] Recording-state interface
* [x] Transcript review
* [x] Summary structure
* [x] Decision extraction structure
* [x] Action-item structure
* [ ] Real microphone capture
* [ ] AI transcription
* [ ] AI-powered meeting analysis

### 🚧 Personal AI

* [ ] Nebius Token Factory integration
* [ ] NVIDIA Nemotron integration
* [ ] AI summarization
* [ ] AI extraction
* [ ] AI priority reasoning
* [ ] Persistent contextual memory
* [ ] Cross-meeting context
* [ ] Commitment tracking
* [ ] Conflict detection

### 🔜 Final Demo

* [ ] End-to-end AI workflow
* [ ] Privacy review
* [ ] Performance testing
* [ ] Final polish
* [ ] Demo video
* [ ] Hackathon submission

---

## 💡 Design Principles

### Minimal > Complicated

The interface should feel obvious within seconds.

### Action > Information

The goal isn't to show users more information.

It's to help them understand **what matters.**

### Explainable > Black Box

When something receives attention, the system should be able to explain **why**.

### User Control > Automation

Automation should remove repetitive work without removing user control.

### Privacy > Convenience

Personal AI should never silently capture personal information.

---

## 🧪 Current Status

<div align="center">

**Frontend foundation**
🟢 Complete

**Attention Inbox**
🟢 Complete

**Meeting Capture UI**
🟢 Complete

**Personal Memory foundation**
🟢 Complete

**AI / Nemotron integration**
🟡 In development

**Real audio pipeline**
🟡 In development

</div>

---

## 🏆 Hackathon

Built for:

### Nebius × NVIDIA Global AI Hackathon 2026

The project targets the **Personal AI** track, focusing on persistent personal context, reusable memory, attention management, and AI-powered tools.

The final implementation will use:

* **Nebius AI Cloud / Token Factory**
* **NVIDIA open-source AI models**
* AI-powered personal memory
* Context-aware attention reasoning

---

## 👥 Team

**Personal AI Memory Team**

Built with ❤️ for the **Nebius × NVIDIA Global AI Hackathon 2026**.

---

## 📜 License

This project is licensed under the **MIT License**.

See [`LICENSE`](LICENSE) for details.

---

<div align="center">

### 🧠 Remember less. Focus more.

**Personal AI Memory**

</div>
