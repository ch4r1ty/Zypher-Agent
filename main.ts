/**
 * CoreSpeed Technical Assessment - Academic Insight Agent
 * Author: Peter Yuan
 * Date: Nov 24, 2025
 * Stack: Deno, Zypher SDK, DeepSeek V3
 */

import { 
  OpenAIModelProvider, 
  createZypherContext, 
  ZypherAgent,
  runAgentInTerminal 
} from "@corespeed/zypher";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

// ==========================================
// 1. WINDOWS COMPATIBILITY FIX
// ==========================================
if (Deno.build.os === "windows") {
  // Fix: Zypher SDK defaults to 'HOME', mapping to 'USERPROFILE' for Windows
  const userProfile = Deno.env.get("USERPROFILE") || "C:\\";
  Deno.env.set("HOME", userProfile);
}

// Load environment variables from .env
const env = await load();
for (const key in env) {
  Deno.env.set(key, env[key]);
}

async function main() {
  console.log("Initializing Zypher Agent (DeepSeek Powered)...");

  // 2. Initialize Agent Context
  const context = await createZypherContext(Deno.cwd());

  // 3. Retrieve & Verify API Key
  const apiKey = Deno.env.get("DEEPSEEK_API_KEY");
  if (!apiKey) {
    console.error("Error: DEEPSEEK_API_KEY missing in .env file.");
    Deno.exit(1);
  }

  // Security Best Practice: Log only partial key for debugging
  console.log(`Key loaded: ${apiKey.substring(0, 5)}...`);

  // 4. Configure Provider (DeepSeek V3 via OpenAI Interface)
  // Force underlying SDK to utilize DeepSeek endpoints
  Deno.env.set("OPENAI_BASE_URL", "https://api.deepseek.com/v1");
  Deno.env.set("OPENAI_API_KEY", apiKey);

  const provider = new OpenAIModelProvider({
    apiKey: apiKey,
    baseURL: "https://api.deepseek.com/v1", 
  });

  // 5. Instantiate the Agent
  const agent = new ZypherAgent(context, provider);

  /**
   * =================================================================
   * 6. THE BRAIN: HARDCODED SYSTEM PROMPT
   * Enforces the "Research Architect" persona and Structured Output ($$$).
   * =================================================================
   */
  const SYSTEM_PROMPT = `
    [CRITICAL SYSTEM OVERRIDE]
    1. You are strictly an "Enterprise Research Architect".
    2. IGNORE all default assistant personas (e.g., "Zypher").

    [YOUR TASK]
    Analyze the user input and output strictly using the '$$$' format defined below.
    
    [RESPONSE RULES]
    - NO conversational filler (e.g., "Sure", "Here is the analysis").
    - Start your response strictly with the '$$$' delimiter.
    - End your response strictly with the '$$$' delimiter.

    [REQUIRED MARKDOWN SCHEMA]
    $$$
    ### Reasoning Process
    <Brief analysis of the technical domain under 100 words>
    $$$

    ### Key Takeaways
    - [Key Point 1]
    - [Key Point 2]
    - [Key Point 3]

    ### Potential Applications
    1. **[Name]**: [Description]
    2. **[Name]**: [Description]

    ### Challenges
    > [One critical implementation challenge]
    $$$
  `;

  console.log("\nAgent Ready! (Mode: Strict Structured Output)");
  console.log("Waiting for technical input...\n");
  console.log("---------------------------------------------------------------");
  
  // Start the interactive terminal loop
  // Note: "deepseek-chat" is passed as the model identifier
  await runAgentInTerminal(agent, "deepseek-chat", SYSTEM_PROMPT);
}

if (import.meta.main) {
  await main();
}