# 🐾 GUÍA DE INTEGRACIÓN COMPLETA
## Dra. Javiera Montoya M. - Veterinaria a Domicilio

**Tiempo total: 45 minutos**

---

## 📋 Lo Que Tienes Listo

```
✅ brand-guidelines.json      (Colores, tipografía, tono)
✅ vet_content_automation_JAVIERA.jsx    (Dashboard personalizado)
✅ Logos profesionales        (Logo cuadrado + Logotipo)
✅ Manual de marca           (Toda la documentación)
✅ Paleta cromática          (Verde menta, terracota, etc.)
```

---

## ⏱️ TIMELINE EXACTO

```
00:00 - 05:00  | Descargar y preparar archivos
05:00 - 10:00  | Configurar en GitHub
10:00 - 15:00  | Deploy en Vercel
15:00 - 25:00  | Deploy en Railway
25:00 - 30:00  | Conectar y probar
30:00 - 45:00  | Hacer primeros posts
```

---

## 🚀 FASE 1: PREPARACIÓN LOCAL (5 MINUTOS)

### Paso 1.1: Descargar Archivos

Descargaste 8 archivos del sistema. Ahora descargarás los personalizados de Javiera:

```
Carpeta: vet-content-automation/

├── package.json                          (ya tienes)
├── server.js                             (ya tienes)
├── .env.example                          (ya tienes)
│
├── vet_content_automation_JAVIERA.jsx    ← NUEVO (dashboard personalizado)
├── brand-guidelines.json                 ← NUEVO (tu marca)
│
├── logos/
│   ├── Logo_Cuadrado.png                (descargaste)
│   ├── Logotipogra_fico.png             (descargaste)
│   └── README_LOGOS.md
│
├── README.md                             (ya tienes)
├── INICIO_RAPIDO.md                      (ya tienes)
├── GUIA_SETUP.md                         (ya tienes)
└── ARQUITECTURA_COMPLETA.md              (ya tienes)
```

### Paso 1.2: Reemplazar Dashboard Original

```bash
# HACER ESTO:
# Renombrar el dashboard original
mv vet_content_automation.jsx vet_content_automation_ORIGINAL.jsx

# Copiar el dashboard personalizado
cp vet_content_automation_JAVIERA.jsx vet_content_automation.jsx

# Resultado: El dashboard ahora es el de Javiera con sus colores
```

### Paso 1.3: Agregar Brand Guidelines

Tu archivo `brand-guidelines.json` ya está listo. Solo asegúrate de:

```bash
# Verificar que existe en la raíz
ls -la brand-guidelines.json

# Si no existe, cópialo:
cp brand-guidelines.json ./brand-guidelines.json
```

### Paso 1.4: Crear Carpeta de Logos

```bash
# Crear carpeta
mkdir -p public/logos

# Copiar logos
cp Logo_Cuadrado.png public/logos/
cp Logotipogra_fico.png public/logos/

# Crear archivo de referencia
cat > public/logos/README.md << 'EOF'
# Logos Oficiales - Dra. Javiera Montoya M.

## Logo Cuadrado (Isotipo)
- Archivo: Logo_Cuadrado.png
- Tamaño oficial: 6250×6250 px
- Uso: Perfil Instagram, WhatsApp, sellos
- Fondo recomendado: Verde menta #1A9E80

## Logotipo (Nombre)
- Archivo: Logotipogra_fico.png
- Tamaño oficial: 6000×3375 px
- Uso: Flyers, carruseles, encabezados, banners
- Fondo recomendado: Fondos claros (#E4F7F2, #F6EDE0, blanco)

## Restricciones
- No cambiar colores
- No deformar ni estirar
- No crear versiones alternativas
- Tamaño mínimo digital: Logo cuadrado 80×80px, Logotipo 300px ancho
EOF
```

### Paso 1.5: Configurar .env

```bash
# Editar .env y agregar:

# OBLIGATORIO
ANTHROPIC_API_KEY=sk-ant-v0-TU-CLAVE-AQUI
NODE_ENV=production
PORT=3000

# RECOMENDADO (para metadata)
BRAND_NAME=Dra. Javiera Montoya M.
BRAND_TAGLINE=VETERINARIA A DOMICILIO
BRAND_SLOGAN=Confianza que entra a tu casa
CLINIC_LOCATION=Santiago Oriente, Chile
COVERAGE_ZONES=Las Condes, Vitacura, Providencia, Ñuñoa, La Reina, Lo Barnechea

# LATER (después de crear base de datos)
MONGODB_URI=mongodb+srv://...
```

### Paso 1.6: Instalar Dependencias

```bash
# Si aún no instalaste:
npm install

# Debería mostrar:
# added 247 packages, and audited 248 packages

# Probar que funciona:
npm start

# Debería mostrar:
# 🚀 Servidor iniciado en puerto 3000
# 📍 URL: http://localhost:3000

# Abrir navegador en: http://localhost:3000
# ✅ Debería ver dashboard CON LOS COLORES DE JAVIERA
```

---

## 📁 FASE 2: GITHUB (5 MINUTOS)

### Paso 2.1: Inicializar Repositorio

```bash
# Navegar a la carpeta
cd vet-content-automation

# Inicializar Git
git init

# Crear .gitignore
cat > .gitignore << 'EOF'
node_modules/
.env
.env.local
.DS_Store
dist/
build/
*.log
.vscode/
.idea/
EOF

# Commit inicial
git add .
git commit -m "Initial commit: Dra. Javiera Montoya content system"
```

### Paso 2.2: Subir a GitHub

```bash
# 1. Ir a https://github.com/new
# 2. Nombre del repo: vet-content-javiera
# 3. Descripción: "Automated veterinary content system for Dra. Javiera Montoya"
# 4. NO inicializar con README (ya lo tienes)
# 5. Crear repositorio

# 4. En tu terminal:
git remote add origin https://github.com/TU-USUARIO/vet-content-javiera.git
git branch -M main
git push -u origin main

# ✅ Tu código está en GitHub y listo para deploy
```

---

## 🌐 FASE 3: DEPLOY EN VERCEL (10 MINUTOS)

### Paso 3.1: Deploy Frontend

```
1. Ir a https://vercel.com
2. Hacer login con GitHub
3. Click "New Project"
4. Seleccionar: vet-content-javiera
5. Click "Import"
6. Esperar ~2 minutos
7. ✅ Tu dashboard está en vivo en:
   https://vet-content-javiera.vercel.app
```

**Verificar que se ve con los colores correctos:**
- Verde menta principal ✅
- Terracota en acentos ✅
- Fonts Cormorant Garamond + DM Sans ✅

---

## 📦 FASE 4: DEPLOY EN RAILWAY (15 MINUTOS)

### Paso 4.1: Crear Base de Datos MongoDB

```
1. Ir a https://www.mongodb.com/cloud/atlas
2. Click "Sign up" (gratuito)
3. Llenar datos básicos
4. Crear cuenta
5. Click "Create Project"
6. Nombre: "vet-javiera"
7. Click "Create Project"
8. Click "Create" (a la derecha)
9. Seleccionar "M0 Free" (siempre gratis)
10. Seleccionar región cercana
11. Click "Create Cluster"
12. Esperar ~5 minutos a que se cree

13. Ir a "Database Access"
14. Click "Add New Database User"
15. Username: vet_admin
16. Password: Generar automático (copiar)
17. Click "Add User"

18. Ir a "Network Access"
19. Click "Add IP Address"
20. Seleccionar: "Allow access from anywhere"
21. Confirm

22. Ir a "Databases"
23. Click "Connect" en tu cluster
24. Seleccionar: "Drivers"
25. Copiar el connection string:
    mongodb+srv://vet_admin:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority
```

Guardar en formato:
```
mongodb+srv://vet_admin:TU-PASSWORD@cluster.mongodb.net/vet_content?retryWrites=true&w=majority
```

### Paso 4.2: Deploy Backend en Railway

```
1. Ir a https://railway.app
2. Click "Sign up with GitHub"
3. Conectar con tu GitHub
4. Click "New Project"
5. Seleccionar "Deploy from GitHub repo"
6. Seleccionar: vet-content-javiera
7. Click "Deploy"
8. Esperar a que inicie (2-3 minutos)

9. En el proyecto, ir a "Variables"
10. Hacer click en "Add Variable"

11. Agregar estas variables (copiar/pegar exacto):

ANTHROPIC_API_KEY
sk-ant-v0-TU-CLAVE-AQUI

MONGODB_URI
mongodb+srv://vet_admin:PASSWORD@cluster.mongodb.net/vet_content?retryWrites=true&w=majority

NODE_ENV
production

BRAND_NAME
Dra. Javiera Montoya M.

BRAND_TAGLINE
VETERINARIA A DOMICILIO

POSTS_PER_DAY
3

SCHEDULE_TIME
06:00

12. Click "Deploy" para aplicar cambios
13. Esperar ~2 minutos
14. Tu backend está en vivo en:
    https://vet-content-javiera.up.railway.app
```

---

## 🔗 FASE 5: CONECTAR FRONTEND ↔ BACKEND (5 MINUTOS)

### Paso 5.1: Obtener URL del Backend

En Railway, tu URL del backend se ve así:
```
https://vet-content-javiera.up.railway.app
```

(Railway te da una URL única automáticamente)

### Paso 5.2: Actualizar Dashboard

Editar `vet_content_automation_JAVIERA.jsx`:

```javascript
// ENCONTRAR ESTA LÍNEA (aproximadamente línea 60):
const response = await fetch("https://api.anthropic.com/v1/messages", {

// CAMBIAR A:
const BACKEND_URL = "https://vet-content-javiera.up.railway.app";

// Y toda esta sección:
const response = await fetch(`${BACKEND_URL}/api/generate`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    postsCount: parseInt(scheduleFrequency)
  })
})
```

### Paso 5.3: Agregar Variable en Vercel

```
1. En Vercel, proyecto vet-content-javiera
2. Click en "Settings"
3. Click en "Environment Variables"
4. Click "Add"
5. Key: REACT_APP_BACKEND_URL
   Value: https://vet-content-javiera.up.railway.app
6. Click "Save"
7. Hacer push a GitHub (trigger automático de redeploy):

git add .
git commit -m "Update backend URL"
git push
```

---

## ✅ FASE 6: PRUEBA FINAL (5 MINUTOS)

### Prueba 1: Verificar Dashboard

```
1. Abrir: https://vet-content-javiera.vercel.app
2. Verificar colores:
   ✓ Verde menta #1A9E80 en header
   ✓ Terracota #E07A5C en acentos
   ✓ Fontes: Cormorant Garamond en titulares
   ✓ Nombre: "Dra. Javiera Montoya M."
```

### Prueba 2: Generar Primer Post

```
1. En dashboard: Seleccionar "3" posts
2. Hacer click en "Ejecutar Automatización"
3. Esperar ~30-45 segundos
4. Debería ver 3 posts generados
5. Hacer click en uno de los posts
6. Verificar que:
   ✓ Script está en español
   ✓ Captions incluyen nombre de la Dra.
   ✓ Hashtags incluyen #DraJavieraMontoya
   ✓ Tono es cálido, profesional, sin urgencia
```

### Prueba 3: Exportar Contenido

```
1. En dashboard, click "Exportar Flujo"
2. Se descarga JSON con todos los posts
3. Abrir en editor de texto
4. Verificar que:
   ✓ Incluye "Dra. Javiera Montoya M."
   ✓ Todos los datos están presentes
   ✓ Puedes compartir con equipo
```

---

## 💰 VERIFICAR COSTOS

### Anthropic (Claude API)
```
Con $5 USD tienes:

Costo por post: ~$0.020
$5 / $0.020 = 250 posts

Si publicas 3 posts/día:
250 / 3 = 83 días = ~3 meses

RESULTADO: Tu crédito te alcanza para 
CASI 3 MESES de operación completa ✅
```

### Otros Servicios
```
Vercel (Frontend)      | $0/mes (gratuito)
Railway (Backend)      | ~$5/mes (bastante barato)
MongoDB Atlas          | $0/mes (M0 gratuito)
────────────────────────────────────────
COSTO TOTAL MENSUAL:   ~$5 USD ✅
```

---

## 📱 INTEGRACIÓN CON INSTAGRAM (PRÓXIMO PASO)

Una vez que todo esté funcionando, para publicar automáticamente en Instagram:

### 1. Crear App en Meta

```
1. Ir a https://developers.facebook.com
2. Crear cuenta desarrollador
3. Crear app → Seleccionar "Otro"
4. Nombre: "Dra. Javiera Montoya Content"
5. Agregar producto: "Instagram Graph API"
6. Crear página de Facebook (si no tienes)
7. Conectar página a Instagram Business
8. Crear access token
```

### 2. Agregar Credenciales en .env

```env
INSTAGRAM_ACCESS_TOKEN=IGxxxxxxxxxxxxxxxxx
INSTAGRAM_BUSINESS_ACCOUNT_ID=17841404xxxx
```

### 3. Publicar Automáticamente

El sistema publicará automáticamente 3 posts diarios a las 6 AM, 12 PM y 6 PM.

---

## 🎨 CÓMO EL MANUAL DE MARCA SE USA

### En el Dashboard
- ✅ **Colores**: Verde menta primario, terracota acentos
- ✅ **Tipografía**: Cormorant Garamond (títulos), DM Sans (cuerpo)
- ✅ **Logos**: Se pueden agregar en esquina (futuro enhancement)
- ✅ **Branding**: Nombre "Dra. Javiera Montoya M." en header

### En los Posts Generados (Claude AI)
- ✅ **Tono**: Cálida profesional sin tecnicismos innecesarios
- ✅ **Contenido**: Enfoque en confianza y bienestar de mascota
- ✅ **Captions**: Usan nombre de la Dra., CTAs naturales
- ✅ **Hashtags**: Incluyen #DraJavieraMontoya, #VeterinariaDomicilio
- ✅ **Emojis**: Pata 🐾, corazón ❤️ (moderado, según marca)

### En Publicaciones de Instagram
- ✅ **Fondo**: Menta pálido (#E4F7F2) o Crema (#F6EDE0)
- ✅ **Logo**: Esquina inferior derecha (discreto)
- ✅ **Tipografía**: Cormorant para titulares principales
- ✅ **Paleta**: Solo colores de marca

**El manual no altera el diseño — lo perfecciona y lo hace coherente.**

---

## ⚙️ AFTER LAUNCH CHECKLIST

```
Después de que todo esté en vivo:

[ ] Crear perfil Instagram Business (si no tienes)
[ ] Agregar foto de perfil: Logo_Cuadrado.png
[ ] Agregar descripción con zona de cobertura
[ ] Conectar WhatsApp Business
[ ] Agregar logos en public/logos
[ ] Crear stories template con colores de marca
[ ] Programar primeros 3 posts
[ ] Monitorear engagement primeros días
[ ] Ajustar horarios de publicación según analytics
[ ] Expandir contenido con casos reales
```

---

## 🆘 SI ALGO NO FUNCIONA

### Error: "API Key not found"
```
✓ Verificar que .env tiene ANTHROPIC_API_KEY
✓ Verificar que la clave es válida (empieza con sk-ant-v0-)
✓ En Railway: Verificar que la variable está en "Variables"
✓ Reiniciar: git push → Vercel redeploy automático
```

### Error: "Cannot connect to API"
```
✓ Verificar que Railway está en "Running" status
✓ Verificar que la URL de backend está correcta
✓ Probar: curl https://vet-content-javiera.up.railway.app/api/health
```

### Los colores no se ven correctamente
```
✓ Limpiar caché navegador (Cmd+Shift+R en Mac, Ctrl+Shift+R en Windows)
✓ Verificar que usaste vet_content_automation_JAVIERA.jsx
✓ Verificar que brand-guidelines.json existe en raíz
```

### MongoDB connection error
```
✓ Verificar que URL está correcta (mongodb+srv://...)
✓ Verificar que password es el correcto
✓ Verificar que IP está autorizado en "Network Access"
✓ Usar URL exactamente como aparece en MongoDB Atlas
```

---

## 📞 SOPORTE RÁPIDO

| Problema | Solución |
|----------|----------|
| Dashboard no carga | Verificar Vercel deploy status |
| Posts no se generan | Revisar API Key en Railway |
| Colores equivocados | Usar archivo JAVIERA, limpiar caché |
| Costoso de operar | Usar planes gratuitos, monitorear uso API |

---

## ✨ ESTÁS LISTO

```
✅ Sistema instalado y personalizado
✅ Brand Javiera completamente integrada
✅ En vivo en Vercel + Railway
✅ Costo: ~$5/mes
✅ Crédito API: 3 meses de operación

Próximo: Publicar 3 posts automáticamente cada día
y monitorear crecimiento de seguidores.

¡FELICIDADES! Tu sistema está 100% operativo. 🐾
```

---

**Documentación creada para: Dra. Javiera Montoya M. - Veterinaria a Domicilio**

*Última actualización: Enero 2024*
*Versión: 1.0.0*