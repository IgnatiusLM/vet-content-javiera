import React, { useState, useEffect } from 'react';
import { Wand2, TrendingUp, FileText, Image, Film, Hash, Download, Play, Pause, RotateCw } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// BRAND CONFIGURATION - DRA. JAVIERA MONTOYA
// ═══════════════════════════════════════════════════════════════════════════

const BRAND = {
  name: "Dra. Javiera Montoya M.",
  tagline: "VETERINARIA A DOMICILIO",
  slogan: "Confianza que entra a tu casa",
  colors: {
    primary: "#1A9E80",      // Verde Menta
    dark: "#2C3E35",          // Verde Noche
    light: "#E4F7F2",         // Menta Pálido
    warm: "#F6EDE0",          // Crema Cálido
    accent: "#E07A5C"         // Terracota
  },
  fonts: {
    serif: "'Cormorant Garamond', serif",
    sans: "'DM Sans', sans-serif"
  }
};

// ═══════════════════════════════════════════════════════════════════════════

export default function VetContentAutomation() {
  const [workflow, setWorkflow] = useState('trending');
  const [isRunning, setIsRunning] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scheduleFrequency, setScheduleFrequency] = useState('3');

  // Generate content with brand guidelines injected
  const generateContent = async (stage, data) => {
    try {
      const brandPrompt = `
Guía de marca: 
- Nombre: ${BRAND.name}
- Servicio: ${BRAND.tagline}
- Tono: Calidez profesional, confianza, sin jerga médica
- Público: Mujeres 30-50 años, profesionales, Santiago Oriente
- Valores: Confianza personal, cuidado personalizado, bienestar animal
`;

      const prompts = {
        trending: `${brandPrompt}

Eres un experto en tendencias de contenido veterinario para una atención a domicilio en Santiago. 
Genera 5 temas trending que resuelvan dudas reales de dueños de mascotas en zona alta de Santiago.

Responde SOLO en JSON sin markdown:
{
  "topics": [
    {"topic": "...", "engagement": "Alta|Media", "hook": "..."}
  ]
}`,
        script: `${brandPrompt}

Genera un guión corto (15-20 segundos) en español para: "${data}"
Debe ser:
- Gancho emocional en primeros 2 segundos
- Educativo pero conversacional
- Call-to-action cálido (no urgente)
- Voz de la Dra. hablando desde experiencia personal

Responde en JSON:
{
  "script": "...",
  "hook": "...",
  "duration": "segundos"
}`,
        captions: `${brandPrompt}

Genera 3 opciones de caption para "${data}"
- Tono: Confianza + Calidez profesional
- Incluir emojis de pata 🐾, corazón ❤️ (moderado)
- CTA natural: "Cuéntame" o "Escríbeme" en lugar de "Llama ya"
- Máximo 200 caracteres cada uno

Responde en JSON:
{
  "captions": ["...", "...", "..."],
  "hashtags": ["#DraJavieraMontoya", "#VeterinariaDomicilio", "#...", ...]
}`
      };

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            { role: "user", content: prompts[stage] }
          ],
        })
      });

      const result = await response.json();
      const text = result.content[0].text.replace(/```json|```/g, "").trim();
      return JSON.parse(text);
    } catch (err) {
      console.error('API Error:', err);
      setError('Error en la generación de contenido. Intenta de nuevo.');
      return null;
    }
  };

  // Main automation workflow
  const runAutomation = async () => {
    setIsRunning(true);
    setError('');
    setLoading(true);

    try {
      const trendingData = await generateContent('trending', null);
      if (!trendingData) throw new Error('No se pudieron obtener temas trendy');

      const newPosts = [];
      const topicsToUse = trendingData.topics.slice(0, parseInt(scheduleFrequency));

      for (const topic of topicsToUse) {
        const scriptData = await generateContent('script', topic.topic);
        const captionData = await generateContent('captions', topic.topic);

        if (scriptData && captionData) {
          newPosts.push({
            id: Date.now() + Math.random(),
            topic: topic.topic,
            hook: topic.hook,
            engagement: topic.engagement,
            script: scriptData.script,
            scriptHook: scriptData.hook,
            duration: scriptData.duration,
            captions: captionData.captions,
            hashtags: captionData.hashtags,
            imagePrompt: `Veterinary content about ${topic.topic}, professional, bright, warm colors, Instagram style, 1080x1350`,
            videoUrl: null,
            status: 'draft',
            scheduledTime: new Date(Date.now() + (newPosts.length * 4 * 60 * 60 * 1000)).toLocaleString('es-ES'),
            createdAt: new Date().toLocaleString('es-ES')
          });
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setPosts(newPosts);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Error en la automatización');
      setLoading(false);
    }

    setIsRunning(false);
  };

  const exportWorkflow = () => {
    const workflow = {
      fecha: new Date().toLocaleString('es-ES'),
      veterinaria: BRAND.name,
      tagline: BRAND.tagline,
      posts: posts,
      configuracion: {
        postsPerDay: scheduleFrequency,
        idioma: 'Español',
        especialidad: 'Atención Veterinaria a Domicilio'
      }
    };

    const json = JSON.stringify(workflow, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${BRAND.name.replace(/\s+/g, '-')}-workflow-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateImagePreview = (prompt) => {
    return `https://images.unsplash.com/photo-${Math.random().toString(36).substr(2, 9)}?w=400&h=500&fit=crop`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${BRAND.colors.light} 0%, ${BRAND.colors.warm} 100%)`,
      color: BRAND.colors.dark,
      fontFamily: BRAND.fonts.sans,
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: '25%',
          width: '384px',
          height: '384px',
          backgroundColor: BRAND.colors.primary,
          borderRadius: '50%',
          mixBlendMode: 'multiply',
          filter: 'blur(80px)',
          opacity: 0.15,
          animation: 'blob 7s infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: 0,
          right: '25%',
          width: '384px',
          height: '384px',
          backgroundColor: BRAND.colors.accent,
          borderRadius: '50%',
          mixBlendMode: 'multiply',
          filter: 'blur(80px)',
          opacity: 0.15,
          animation: 'blob 7s infinite',
          animationDelay: '2s'
        }}></div>
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <header style={{
          borderBottom: `1px solid ${BRAND.colors.primary}30`,
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(255,255,255,0.8)'
        }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem 1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  padding: '0.75rem',
                  background: `linear-gradient(135deg, ${BRAND.colors.primary} 0%, ${BRAND.colors.accent} 100%)`,
                  borderRadius: '0.5rem'
                }}>
                  <Wand2 style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                </div>
                <div>
                  <h1 style={{
                    fontSize: '1.875rem',
                    fontWeight: 900,
                    background: `linear-gradient(90deg, ${BRAND.colors.primary} 0%, ${BRAND.colors.accent} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: BRAND.fonts.serif,
                    margin: 0
                  }}>
                    {BRAND.name}
                  </h1>
                  <p style={{
                    color: BRAND.colors.accent,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    margin: 0
                  }}>
                    {BRAND.tagline}
                  </p>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: `${BRAND.colors.primary}10`,
                border: `1px solid ${BRAND.colors.primary}40`,
                borderRadius: '9999px'
              }}>
                <div style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  backgroundColor: '#22c55e',
                  borderRadius: '50%',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}></div>
                <span style={{
                  fontSize: '0.75rem',
                  fontFamily: "'Monaco', monospace",
                  color: BRAND.colors.primary
                }}>Activo</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ maxWidth: '80rem', margin: '0 auto', padding: '3rem 1.5rem' }}>
          {/* Control Panel */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {/* Configuration Card */}
            <div style={{
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${BRAND.colors.primary}30`,
              borderRadius: '1rem',
              padding: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: BRAND.colors.primary
              }}>
                <TrendingUp style={{ width: '1.25rem', height: '1.25rem' }} />
                Configuración
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: BRAND.colors.primary,
                    marginBottom: '0.75rem'
                  }}>
                    Posts por día
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['1', '2', '3', '4'].map(num => (
                      <button
                        key={num}
                        onClick={() => setScheduleFrequency(num)}
                        style={{
                          flex: 1,
                          padding: '0.5rem 0.75rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          backgroundColor: scheduleFrequency === num 
                            ? BRAND.colors.primary 
                            : `${BRAND.colors.primary}10`,
                          color: scheduleFrequency === num 
                            ? 'white' 
                            : BRAND.colors.primary
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={runAutomation}
                  disabled={isRunning}
                  style={{
                    padding: '1rem 1.5rem',
                    borderRadius: '0.75rem',
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    border: 'none',
                    cursor: isRunning ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    background: isRunning
                      ? '#9ca3af'
                      : `linear-gradient(135deg, ${BRAND.colors.primary} 0%, ${BRAND.colors.accent} 100%)`,
                    color: 'white',
                    boxShadow: isRunning ? 'none' : `0 20px 25px -5px ${BRAND.colors.primary}40`
                  }}
                >
                  {isRunning ? (
                    <>
                      <Pause style={{ width: '1.25rem', height: '1.25rem', animation: 'spin 2s linear infinite' }} />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Play style={{ width: '1.25rem', height: '1.25rem' }} />
                      Ejecutar Automatización
                    </>
                  )}
                </button>

                {posts.length > 0 && (
                  <button
                    onClick={exportWorkflow}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: `${BRAND.colors.accent}30`,
                      border: `1px solid ${BRAND.colors.accent}60`,
                      color: BRAND.colors.accent,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Download style={{ width: '1rem', height: '1rem' }} />
                    Exportar Flujo
                  </button>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem'
            }}>
              {[
                { icon: FileText, label: 'Guiones', value: posts.length, color: BRAND.colors.primary },
                { icon: Image, label: 'Imágenes', value: posts.length, color: BRAND.colors.accent },
                { icon: Film, label: 'Videos', value: posts.filter(p => p.status === 'ready').length, color: BRAND.colors.primary },
                { icon: Hash, label: 'Hashtags', value: posts.reduce((acc, p) => acc + p.hashtags.length, 0), color: BRAND.colors.accent },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${BRAND.colors.primary}30`,
                    borderRadius: '0.75rem',
                    padding: '1.5rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ color: BRAND.colors.dark, fontSize: '0.875rem', fontWeight: 500, margin: 0 }}>
                        {stat.label}
                      </p>
                      <p style={{
                        fontSize: '2.25rem',
                        fontWeight: 900,
                        margin: '0.5rem 0 0 0',
                        color: stat.color
                      }}>
                        {stat.value}
                      </p>
                    </div>
                    <div style={{
                      padding: '0.75rem',
                      background: `${stat.color}20`,
                      borderRadius: '0.5rem'
                    }}>
                      <stat.icon style={{ width: '1.5rem', height: '1.5rem', color: stat.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div style={{
              marginBottom: '2rem',
              padding: '1rem',
              background: '#fee2e2',
              border: `1px solid #fecaca`,
              borderRadius: '0.75rem',
              color: '#7f1d1d',
              fontWeight: 500
            }}>
              {error}
            </div>
          )}

          {/* Posts Grid */}
          {posts.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: '1.875rem',
                fontWeight: 700,
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: BRAND.colors.primary
              }}>
                <RotateCw style={{ width: '1.5rem', height: '1.5rem' }} />
                Contenido Generado ({posts.length})
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                {posts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    style={{
                      background: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${BRAND.colors.primary}30`,
                      borderRadius: '1rem',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      transform: 'translateY(0)',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = `0 20px 25px ${BRAND.colors.primary}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                    }}
                  >
                    {/* Image Preview */}
                    <div style={{
                      position: 'relative',
                      height: '192px',
                      background: `linear-gradient(135deg, ${BRAND.colors.primary} 0%, ${BRAND.colors.accent} 100%)`,
                      overflow: 'hidden'
                    }}>
                      <img
                        src={generateImagePreview(post.imagePrompt)}
                        alt={post.topic}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s'
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginBottom: '0.75rem'
                      }}>
                        <h3 style={{
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          color: BRAND.colors.primary,
                          flex: 1,
                          fontFamily: BRAND.fonts.serif,
                          margin: 0
                        }}>
                          {post.topic}
                        </h3>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          whiteSpace: 'nowrap',
                          marginLeft: '0.5rem',
                          backgroundColor: post.engagement === 'Alta' ? '#dcfce7' :
                                          post.engagement === 'Media' ? '#fef3c7' : '#dbeafe',
                          color: post.engagement === 'Alta' ? '#166534' :
                                post.engagement === 'Media' ? '#92400e' : '#1e40af'
                        }}>
                          {post.engagement}
                        </span>
                      </div>

                      <p style={{
                        color: BRAND.colors.dark,
                        fontSize: '0.875rem',
                        marginBottom: '1rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {post.hook}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '1rem' }}>
                        {post.hashtags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: '0.75rem',
                              backgroundColor: `${BRAND.colors.primary}15`,
                              padding: '0.25rem 0.5rem',
                              borderRadius: '0.25rem',
                              color: BRAND.colors.primary
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div style={{
                        paddingTop: '1rem',
                        borderTop: `1px solid ${BRAND.colors.primary}20`
                      }}>
                        <p style={{
                          fontSize: '0.75rem',
                          color: BRAND.colors.accent,
                          fontFamily: "'Monaco', monospace",
                          margin: 0
                        }}>
                          🕐 {post.scheduledTime}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Post View */}
          {selectedPost && (
            <div style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(5px)',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}>
              <div style={{
                background: `linear-gradient(135deg, ${BRAND.colors.light} 0%, ${BRAND.colors.warm} 100%)`,
                border: `1px solid ${BRAND.colors.primary}40`,
                borderRadius: '1.5rem',
                maxWidth: '48rem',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2rem'
              }}>
                <button
                  onClick={() => setSelectedPost(null)}
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    color: BRAND.colors.dark,
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>

                <h2 style={{
                  fontSize: '1.875rem',
                  fontWeight: 900,
                  marginBottom: '0.5rem',
                  background: `linear-gradient(90deg, ${BRAND.colors.primary} 0%, ${BRAND.colors.accent} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: BRAND.fonts.serif
                }}>
                  {selectedPost.topic}
                </h2>
                <p style={{ color: BRAND.colors.primary, marginBottom: '2rem' }}>
                  {selectedPost.hook}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {/* Script */}
                  <div style={{
                    background: `${BRAND.colors.primary}10`,
                    border: `1px solid ${BRAND.colors.primary}30`,
                    borderRadius: '0.75rem',
                    padding: '1.5rem'
                  }}>
                    <h3 style={{
                      fontWeight: 700,
                      fontSize: '1.125rem',
                      marginBottom: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: BRAND.colors.primary
                    }}>
                      <FileText style={{ width: '1.25rem', height: '1.25rem' }} />
                      Guión
                    </h3>
                    <p style={{ color: BRAND.colors.dark, lineHeight: 1.6 }}>
                      {selectedPost.script}
                    </p>
                  </div>

                  {/* Captions */}
                  <div style={{
                    background: `${BRAND.colors.primary}10`,
                    border: `1px solid ${BRAND.colors.primary}30`,
                    borderRadius: '0.75rem',
                    padding: '1.5rem'
                  }}>
                    <h3 style={{
                      fontWeight: 700,
                      fontSize: '1.125rem',
                      marginBottom: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: BRAND.colors.accent
                    }}>
                      <Hash style={{ width: '1.25rem', height: '1.25rem' }} />
                      Opciones de Caption
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {selectedPost.captions.map((caption, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '1rem',
                            background: 'rgba(255,255,255,0.6)',
                            border: `1px solid ${BRAND.colors.primary}20`,
                            borderRadius: '0.5rem',
                            cursor: 'copy',
                            transition: 'all 0.3s'
                          }}
                          onClick={() => {
                            navigator.clipboard.writeText(caption);
                            alert('¡Caption copiado!');
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                            e.currentTarget.style.borderColor = BRAND.colors.primary;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
                            e.currentTarget.style.borderColor = `${BRAND.colors.primary}20`;
                          }}
                        >
                          <p style={{ color: BRAND.colors.dark, margin: 0 }}>
                            {caption}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hashtags */}
                  <div style={{
                    background: `${BRAND.colors.primary}10`,
                    border: `1px solid ${BRAND.colors.primary}30`,
                    borderRadius: '0.75rem',
                    padding: '1.5rem'
                  }}>
                    <h3 style={{
                      fontWeight: 700,
                      fontSize: '1.125rem',
                      marginBottom: '0.75rem',
                      color: BRAND.colors.primary
                    }}>
                      Hashtags ({selectedPost.hashtags.length})
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {selectedPost.hashtags.map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: `${BRAND.colors.primary}30`,
                            border: `1px solid ${BRAND.colors.primary}60`,
                            borderRadius: '9999px',
                            color: BRAND.colors.primary,
                            fontSize: '0.875rem',
                            cursor: 'copy',
                            transition: 'all 0.3s'
                          }}
                          onClick={() => {
                            navigator.clipboard.writeText(tag);
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = `${BRAND.colors.primary}50`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = `${BRAND.colors.primary}30`;
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer style={{
          borderTop: `1px solid ${BRAND.colors.primary}20`,
          backdropFilter: 'blur(10px)',
          marginTop: '5rem'
        }}>
          <div style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            color: BRAND.colors.dark,
            fontSize: '0.875rem'
          }}>
            <p>🐾 Sistema de contenido veterinario • {BRAND.name} • {BRAND.tagline}</p>
          </div>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&family=DM+Sans:wght@400;500;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        body {
          font-family: ${BRAND.fonts.sans};
        }
      `}</style>
    </div>
  );
}