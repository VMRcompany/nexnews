import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY || "");

// API для получения новостей без ключа на клиенте
app.post('/api/news', async (req, res) => {
    try {
        const { prompt } = req.body;
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { 
                responseMimeType: "application/json",
                temperature: 0.7
            },
            tools: [{ googleSearch: {} }]
        });

        const response = await result.response;
        let text = response.text();
        
        // Очистка текста от возможных markdown-оберток
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const newsData = JSON.parse(text);
        res.json({ news: Array.isArray(newsData) ? newsData : (newsData.news || []) });
    } catch (error) {
        console.error("Server News Error:", error);
        res.status(500).json({ error: "Failed to fetch news", details: error.message });
    }
});

// Раздача статики (нашего index.html)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static('.'));

app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html'));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
