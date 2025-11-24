# 🌤️ Weather Agent - CoreSpeed Technical Assessment

An intelligent weather assistant powered by Zypher Agent Framework, DeepSeek V3, and real-time weather data.

**Author:** Peter Yuan (Ziyang Yuan)  
**Date:** November 24, 2025  
**Assessment for:** CoreSpeed

---

## 🎯 Project Overview

This project demonstrates an AI agent built with Zypher that can:
- 🌍 Fetch real-time weather data for any city worldwide
- 🤖 Use DeepSeek V3 for natural language understanding and response generation
- 💬 Provide conversational, friendly weather reports
- 🔄 Process user queries intelligently and extract city names automatically

## ✨ Key Features

- **Real-time Weather Data**: Integrates with wttr.in API for accurate, up-to-date weather information
- **Natural Language Processing**: Understands various ways of asking about weather
- **Conversational AI**: DeepSeek V3 generates friendly, human-like responses
- **Cross-platform**: Works on Windows with PowerShell integration
- **Interactive CLI**: Easy-to-use command-line interface

## 🛠️ Tech Stack

- **Runtime**: Deno 2.0+
- **AI Framework**: Zypher Agent (CoreSpeed)
- **LLM**: DeepSeek V3 (via OpenAI-compatible API)
- **Weather API**: wttr.in (free, no API key required)
- **Language**: TypeScript

## 📋 Prerequisites

Before running the project, ensure you have:

1. **Deno 2.0+** installed ([Download here](https://deno.land/))
2. **DeepSeek API Key** ([Get it here](https://platform.deepseek.com/))
3. **PowerShell** (pre-installed on Windows)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ch4r1ty/Zypher-Agent.git
cd Zypher-Agent
```

### 2. Install Dependencies

```bash
deno add jsr:@corespeed/zypher
deno add npm:rxjs-for-await
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

**Note:** You can get a free DeepSeek API key at [platform.deepseek.com](https://platform.deepseek.com/)

## 💻 Usage

### Run the Weather Agent

```bash
deno run -A main.ts
```

### Example Interactions

```
💬 Ask about the weather (or 'exit' to quit):
> What's the weather in New York today?

🌤️  WEATHER REPORT:
----------------------------------------------------------------------
Here's the current weather in New York:

It's a beautiful sunny day in New York with temperatures around 52°F 
(11°C). It feels a bit cooler though, more like 49°F (9°C), so you 
might want a light jacket. The humidity is quite comfortable at 36%, 
and there's a gentle 9 mph breeze coming from the northwest. 
Visibility is excellent at 9 miles, and the UV index is low at 1.

Perfect weather for a walk in the park or exploring the city!
----------------------------------------------------------------------
```

### Supported Query Formats

The agent understands various ways of asking:
- "What's the weather in Tokyo today?"
- "How's the weather in London?"
- "Tell me about the weather in Paris"
- "Weather in Berlin"

## 📁 Project Structure

```
CoreSpeed-Demo/
├── main.ts              # Main application file
├── deno.json            # Deno configuration
├── .env                 # Environment variables (API keys)
├── README.md            # This file
└── main_test.ts         # Test file (if any)
```

## 🎥 Demo Video

[Link to your demo video - to be added]

## 🧠 How It Works

1. **User Input**: User asks about weather in natural language
2. **City Extraction**: Smart regex patterns extract the city name
3. **API Call**: PowerShell command fetches weather data from wttr.in
4. **Data Parsing**: JSON response is parsed for relevant weather info
5. **AI Response**: DeepSeek V3 generates a natural, conversational summary
6. **Streaming Output**: Response is streamed in real-time to the user

## 🔑 Key Technical Decisions

### Why DeepSeek V3?
- Cost-effective compared to GPT-4
- Excellent Chinese and English language support
- Fast response times
- OpenAI-compatible API

### Why wttr.in?
- Free, no API key required
- Comprehensive weather data
- JSON format support
- Global coverage

### Why Direct API Calls vs Tool Calling?
DeepSeek V3's tool calling support is limited, so I implemented a hybrid approach:
- Direct API calls for reliability
- AI for natural language generation
- Best of both worlds: accurate data + conversational responses

## 🐛 Troubleshooting

### Issue: "DEEPSEEK_API_KEY missing"
**Solution**: Make sure you've created a `.env` file with your API key

### Issue: Weather data fetch fails
**Solution**: 
- Check your internet connection
- Ensure PowerShell is available on your system
- Try a different city name

### Issue: Deno permissions error
**Solution**: Run with `-A` flag to allow all permissions: `deno run -A main.ts`

## 📝 License

This project is created for the CoreSpeed technical assessment.

## 🙏 Acknowledgments

- **CoreSpeed** for the Zypher Agent framework
- **DeepSeek** for the powerful LLM
- **wttr.in** for the free weather API

## 📧 Contact

**Peter Yuan (Ziyang Yuan)**  
GitHub: [@ch4r1ty](https://github.com/ch4r1ty)

---

**Built with ❤️ for CoreSpeed Technical Assessment**
