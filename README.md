Academic Insight AgentA structured reasoning agent built with Zypher SDK, Deno, and DeepSeek V3. It transforms raw technical text into strict Markdown reports using a "System Override" pattern.⚡ Quick Start1. Install Deno (Windows)irm [https://deno.land/install.ps1](https://deno.land/install.ps1) | iex
2. Setup Projectgit clone [https://github.com/ch4r1ty/Zypher-Agent.git](https://github.com/ch4r1ty/Zypher-Agent.git)
cd Zypher-Agent
deno install
3. Configure KeysCreate a .env file:DEEPSEEK_API_KEY=sk-your_api_key_here
4. Rundeno run -A main.ts
📝 UsageSimply paste any raw technical text when prompted. The agent will automatically output a structured analysis inside $$$ delimiters.Submission for CoreSpeed Technical Assessment