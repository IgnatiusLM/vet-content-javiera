import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'VET Content Flow Backend',
  });
});

app.get('/api/config', (req, res) => {
  res.json({
    brand: {
      name: 'Dra. Javiera Montoya M.',
      tagline: 'VETERINARIA A DOMICILIO',
      slogan: 'Confianza que entra a tu casa',
    },
    colors: {
      primary: '#1A9E80',
      accent: '#E07A5C',
      light: '#E4F7F2',
    },
  });
});

async function getTrendingTopics() {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-opus-4-1-20250805',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Eres experto en contenido veterinario. Genera 5 temas trending para una veterinaria a domicilio en Santiago Oriente, Chile. Responde SOLO en JSON:
{
  "topics": [
    {"topic": "nombre del tema", "engagement": "Alta|Media", "hook": "frase gancho"}
  ]
}`,
        },
      ],
    });

    const content = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { topics: [] };
  } catch (error) {
    console.error('Error:', error);
    return { topics: [{ topic: 'Cuidados veterinarios básicos', engagement: 'Alta', hook: 'Aprende lo importante' }] };
  }
}

async function generateScript(topic) {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-opus-4-1-20250805',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `Eres la Dra. Javiera Montoya. Genera guión corto (15-20 segundos) sobre: "${topic}". Responde SOLO en JSON:
{
  "script": "texto del guión",
  "hook": "gancho de 2 segundos",
  "duration": "18"
}`,
        },
      ],
    });

    const content = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { script: `Hola, hoy te comparto sobre ${topic}`, hook: 'Escúchame bien', duration: '18' };
  } catch (error) {
    console.error('Error:', error);
    return { script: `Hola, hoy te comparto sobre ${topic}`, hook: 'Escúchame bien', duration: '18' };
  }
}

async function generateCaptionsAndHashtags(topic) {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-opus-4-1-20250805',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `Para el tema "${topic}", genera 3 captions y 15 hashtags. Responde SOLO en JSON:
{
  "captions": ["caption 1", "caption 2", "caption 3"],
  "hashtags": ["#tag1", "#tag2", ...]
}`,
        },
      ],
    });

    const content = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { captions: [`Aprende sobre ${topic} 🐾`], hashtags: ['#DraJavieraMontoya'] };
  } catch (error) {
    console.error('Error:', error);
    return { captions: [`Aprende sobre ${topic} 🐾`], hashtags: ['#DraJavieraMontoya'] };
  }
}

app.post('/api/generate', async (req, res) => {
  try {
    console.log('📝 Generando contenido...');

    const trendingData = await getTrendingTopics();
    const topics = trendingData.topics || [];

    if (topics.length === 0) {
      return res.status(400).json({ error: 'No se pudieron obtener temas trending' });
    }

    const posts = [];
    for (let i = 0; i < Math.min(3, topics.length); i++) {
      const topic = topics[i];
      console.log(`  📌 Tema ${i + 1}: ${topic.topic}`);

      const scriptData = await generateScript(topic.topic);
      const captionData = await generateCaptionsAndHashtags(topic.topic);

      const post = {
        id: `post_${Date.now()}_${i}`,
        topic: topic.topic,
        hook: topic.hook,
        engagement: topic.engagement,
        script: scriptData.script,
        scriptHook: scriptData.hook,
        duration: scriptData.duration,
        captions: captionData.captions,
        hashtags: captionData.hashtags,
        imagePrompt: `Veterinary content about ${topic.topic}, professional, bright, warm colors, Instagram style`,
        status: 'draft',
        createdAt: new Date().toISOString(),
        scheduledTime: new Date(Date.now() + (i + 1) * 4 * 60 * 60 * 1000).toISOString(),
      };

      posts.push(post);
      console.log(`    ✅ Post ${i + 1} generado`);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.log(`✅ ${posts.length} posts generados`);
    res.json({ success: true, posts, count: posts.length });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: 'Error generando contenido', details: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada', path: req.path });
});

app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({ error: 'Error interno del servidor', message: err.message });
});

app.listen(PORT, () => {
  console.log('\n');
  console.log('┌─────────────────────────────────────────────┐');
  console.log('│  🐾 DRA. JAVIERA MONTOYA - BACKEND SERVER   │');
  console.log('│     VETERINARIA A DOMICILIO                 │');
  console.log('└─────────────────────────────────────────────┘');
  console.log(`\n🚀 Servidor iniciado en puerto ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`\n📚 Endpoints disponibles:`);
  console.log(`   GET    /              (HTML principal)`);
  console.log(`   GET    /api/health    (Health check)`);
  console.log(`   GET    /api/config    (Configuración)`);
  console.log(`   POST   /api/generate  (Generar contenido)`);
  console.log(`\n⏹️  Presiona Ctrl+C para detener\n`);
});

process.on('SIGINT', () => {
  console.log('\n\n👋 Servidor cerrado graciosamente');
  process.exit(0);
});
