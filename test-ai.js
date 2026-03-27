const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

const openai = new OpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function testAI() {
  console.log('Testing OpenRouter connection...');
  console.log('Using Key:', process.env.OPENROUTER_API_KEY.substring(0, 10) + '...');
  
  try {
    const response = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [{ role: 'user', content: 'Say hello' }],
    });
    console.log('Response Success:', response.choices[0].message.content);
  } catch (err) {
    console.error('API Test Error:', err.status, err.message);
    if (err.response) {
      console.error('Full Error Response:', JSON.stringify(err.response.data, null, 2));
    }
  }
}

testAI();
