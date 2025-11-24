/**
 * CoreSpeed Technical Assessment - Simple Weather Agent
 * Author: Peter Yuan
 * Date: Nov 24, 2025
 * Stack: Deno, Zypher SDK, DeepSeek V3
 * Features: Real-time weather data (simplified - direct API calls)
 */

import { 
  OpenAIModelProvider, 
  createZypherContext, 
  ZypherAgent 
} from "@corespeed/zypher";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { eachValueFrom } from "rxjs-for-await";

// ==========================================
// WINDOWS COMPATIBILITY FIX
// ==========================================
if (Deno.build.os === "windows") {
  const userProfile = Deno.env.get("USERPROFILE") || "C:\\";
  Deno.env.set("HOME", userProfile);
}

// Load environment variables from .env
const env = await load();
for (const key in env) {
  Deno.env.set(key, env[key]);
}

// Helper function to fetch weather data using PowerShell curl
async function getWeather(city: string): Promise<string> {
  try {
    const cityName = city.replace(/\s+/g, "_");
    const url = `https://wttr.in/${cityName}?format=j1`;
    
    // Use PowerShell curl (Invoke-WebRequest) with proper command
    const command = new Deno.Command("powershell", {
      args: [
        "-Command",
        `(Invoke-WebRequest -Uri "${url}" -UseBasicParsing).Content`
      ],
      stdout: "piped",
      stderr: "piped",
    });
    
    const { code, stdout, stderr } = await command.output();
    
    if (code !== 0) {
      const error = new TextDecoder().decode(stderr);
      console.error(`[ERROR] PowerShell failed: ${error}`);
      return `Unable to fetch weather data for ${city}.`;
    }
    
    const output = new TextDecoder().decode(stdout).trim();
    
    // Check if we got valid data
    if (!output || output.length < 100) {
      console.error(`[ERROR] Invalid response: ${output.substring(0, 200)}`);
      return `Unable to fetch weather data for ${city}.`;
    }
    
    const data = JSON.parse(output);
    const current = data.current_condition[0];
    
    return `Current weather in ${city}:
- Temperature: ${current.temp_F}°F (${current.temp_C}°C)
- Feels like: ${current.FeelsLikeF}°F (${current.FeelsLikeC}°C)
- Condition: ${current.weatherDesc[0].value}
- Humidity: ${current.humidity}%
- Wind: ${current.windspeedMiles} mph from ${current.winddir16Point}
- Visibility: ${current.visibilityMiles} miles
// - UV Index: ${current.uvIndex}`;
  } catch (error) {
    console.error(`[ERROR] Exception: ${error}`);
    return `Error fetching weather: ${error instanceof Error ? error.message : String(error)}`;
  }
}

// Extract city name from user query
function extractCity(query: string): string {
  // Common patterns
  const patterns = [
    /weather\s+in\s+([a-z\s]+?)(?:\s+today|\s+now|$|\?)/i,
    /how'?s?\s+(?:the\s+)?weather\s+in\s+([a-z\s]+?)(?:\s+today|\s+now|$|\?)/i,
    /what'?s?\s+(?:the\s+)?weather\s+(?:like\s+)?in\s+([a-z\s]+?)(?:\s+today|\s+now|$|\?)/i,
    /tell\s+me\s+about\s+(?:the\s+)?(?:weather\s+in\s+)?([a-z\s]+?)(?:\s+weather)?(?:\s+today|\s+now|$|\?)/i,
  ];
  
  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  // Default to New York if can't parse
  return "New York";
}

async function main() {
  console.log("Initializing Weather Agent (DeepSeek Powered)...");

  const context = await createZypherContext(Deno.cwd());

  const apiKey = Deno.env.get("DEEPSEEK_API_KEY");
  if (!apiKey) {
    console.error("Error: DEEPSEEK_API_KEY missing in .env file.");
    Deno.exit(1);
  }

  console.log(`Key loaded: ${apiKey.substring(0, 5)}...`);

  Deno.env.set("OPENAI_BASE_URL", "https://api.deepseek.com/v1");
  Deno.env.set("OPENAI_API_KEY", apiKey);

  const provider = new OpenAIModelProvider({
    apiKey: apiKey,
    baseUrl: "https://api.deepseek.com/v1",
  });

  const agent = new ZypherAgent(context, provider);

  console.log("\n" + "=".repeat(70));
  console.log("🌤️  Weather Agent (DeepSeek V3 + wttr.in)");
  console.log("=".repeat(70));
  console.log("\n✓ Agent initialized successfully");
  console.log("✓ Weather data source: wttr.in (free API, no key required)");
  console.log("\n📋 Example queries:");
  console.log("   - What's the weather in New York today?");
  console.log("   - How's the weather in Tokyo?");
  console.log("   - Tell me about the weather in London");
  console.log("\n" + "=".repeat(70));
  
  while (true) {
    console.log("\n💬 Ask about the weather (or 'exit' to quit):");
    const input = prompt("> ");
    
    if (!input || input.trim().toLowerCase() === "exit") {
      console.log("\n👋 Goodbye!");
      break;
    }

    try {
      console.log("\n🔍 Fetching weather data...");
      
      // Extract city and fetch weather
      const city = extractCity(input);
      const weatherData = await getWeather(city);
      
      console.log("✓ Data received, generating response...\n");
      
      // Ask agent to provide a natural response with the weather data
      const event$ = agent.runTask(
        `You are a friendly weather assistant. The user asked: "${input}"

Here is the current weather data:
${weatherData}

Please provide a natural, conversational response summarizing this weather information. Be friendly and helpful.`,
        "deepseek-chat"
      );
      
      console.log("-".repeat(70));
      console.log("🌤️  WEATHER REPORT:");
      console.log("-".repeat(70));
      
      // Stream the results
      for await (const event of eachValueFrom(event$)) {
        if (event.type === "text") {
          Deno.stdout.writeSync(new TextEncoder().encode(event.content));
        }
      }
      
      console.log("\n" + "-".repeat(70));
    } catch (error) {
      console.error("\n❌ Error:", error instanceof Error ? error.message : String(error));
    }
  }
  
  agent.mcp.cleanup();
}

if (import.meta.main) {
  await main();
}
