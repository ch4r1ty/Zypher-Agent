# Academic Insight Agent

A structured reasoning agent built with Zypher SDK, Deno, and DeepSeek V3. It transforms raw technical text into strict Markdown reports using a "System Override" pattern.

## ⚡ Quick Start

### 1. Install Deno (Windows)

```powershell
irm https://deno.land/install.ps1 | iex
```

### 2. Setup Project

```bash
git clone https://github.com/ch4r1ty/Zypher-Agent.git
cd Zypher-Agent
deno install
```

### 3. Configure Keys

Create a `.env` file in the root directory:

```
DEEPSEEK_API_KEY=sk-your_api_key_here
```

### 4. Run

```bash
deno run -A main.ts
```

## 📝 Usage

Simply paste any raw technical text when prompted. The agent will automatically output a structured analysis inside `$$$` delimiters.

---

**Submission for CoreSpeed Technical Assessment**