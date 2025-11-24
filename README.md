# 🌤️ Weather Agent - CoreSpeed Technical Assessment

An intelligent weather assistant built with Zypher Agent Framework and DeepSeek V3.

**Author:** Peter Yuan (Ziyang Yuan)  
**Date:** November 24, 2025

---

## 🛠️ Tech Stack

- **Deno 2.0+** - Runtime environment
- **Zypher Agent** - AI agent framework from CoreSpeed
- **DeepSeek V3** - Large language model
- **wttr.in API** - Free weather data service

---

## 🚀 Quick Start

### 1. Prerequisites

- Install [Deno 2.0+](https://deno.land/)
- Get a [DeepSeek API key](https://platform.deepseek.com/)

### 2. Clone & Install

```bash
git clone https://github.com/ch4r1ty/Zypher-Agent.git
cd Zypher-Agent

deno add jsr:@corespeed/zypher
deno add npm:rxjs-for-await
```

### 3. Configure API Key

Create a `.env` file:

```env
DEEPSEEK_API_KEY=your_api_key_here
```

### 4. Run

```bash
deno run -A main.ts
```

---

## 💻 Usage

```
💬 Ask about the weather (or 'exit' to quit):
> What's the weather in New York today?

🌤️  WEATHER REPORT:
----------------------------------------------------------------------
It's a beautiful sunny day in New York with temperatures around 52°F 
(11°C). Perfect weather for a walk in the park!
----------------------------------------------------------------------
```

**Supported queries:**
- "What's the weather in Tokyo today?"
- "How's the weather in London?"
- "Tell me about the weather in Paris"

---

## ✨ Features

- Real-time weather data for any city worldwide
- Natural language understanding
- Conversational AI responses
- Streaming output

---

## 🎥 Demo Video

[Watch Demo Video](https://youtu.be/J_1C13fB4o4)

---

**Built for CoreSpeed Technical Assessment**
