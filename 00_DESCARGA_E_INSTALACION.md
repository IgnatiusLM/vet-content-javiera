# 📥 GUÍA COMPLETA DE DESCARGA E INSTALACIÓN
## Dra. Javiera Montoya M. - Sistema Automático de Contenido

**⏱️ Tiempo total: 45 minutos desde descarga hasta en vivo**

---

## 📋 MAPEO DE ARCHIVOS: QUÉ DESCARGAR Y DÓNDE PONERLO

### ✅ PASO 1: CREAR CARPETA DEL PROYECTO

```bash
# Abrir terminal/cmd y ejecutar:
mkdir vet-content-javiera
cd vet-content-javiera
```

---

### ✅ PASO 2: DESCARGAR ARCHIVOS (En este orden)

#### **ARCHIVOS PRINCIPALES (Descargar de /outputs)**

| # | Archivo a Descargar | Copiar a | Reemplaza | Descripción |
|---|---|---|---|---|
| 1 | `vet_content_automation_JAVIERA.jsx` | `./vet_content_automation.jsx` | ❌ NO | Dashboard con colores de Javiera |
| 2 | `brand-guidelines.json` | `./brand-guidelines.json` | ❌ NO | Tu marca completa en JSON |
| 3 | `server.js` | `./server.js` | ✅ SÍ | Backend (reemplaza versión genérica) |
| 4 | `package.json` | `./package.json` | ✅ SÍ | Dependencias (reemplaza versión genérica) |
| 5 | `.env.example` | `./.env` | ✅ SÍ | Variables de entorno (crear nuevo .env) |
| 6 | `GUIA_INTEGRACION_JAVIERA.md` | `./GUIA_INTEGRACION.md` | ❌ NO | Instrucciones de setup |
| 7 | `PROXIMO_PASO.md` | `./PROXIMO_PASO.md` | ❌ NO | Resumen ejecutivo |
| 8 | `README.md` | `./README.md` | ✅ SÍ | Documentación principal |

---

## 🔄 INSTRUCCIONES DETALLADAS

### OPCIÓN A: Descarga Manual (Más Control)

#### 1️⃣ Descargar los 8 Archivos

Ve a `/outputs` en tu navegador y descarga en este orden:

```
Archivos a descargar (click derecho → Descargar):
├── vet_content_automation_JAVIERA.jsx
├── brand-guidelines.json
├── server.js
├── package.json
├── .env.example
├── GUIA_INTEGRACION_JAVIERA.md
├── PROXIMO_PASO.md
└── README.md
```

#### 2️⃣ Crear la Estructura

```bash
# En tu terminal, ejecutar:
mkdir -p vet-content-javiera
cd vet-content-javiera

# Crear archivos principales
# (Pega contenido en cada archivo)
```

#### 3️⃣ Copiar Archivos a su Lugar

```bash
# En la carpeta vet-content-javiera:

# 1. Dashboard (RENOMBAR)
mv vet_content_automation_JAVIERA.jsx vet_content_automation.jsx

# 2. Brand guidelines (SIN cambios)
cp brand-guidelines.json ./

# 3. Server (REEMPLAZA)
cp server.js ./

# 4. Package.json (REEMPLAZA)
cp package.json ./

# 5. Environment (CREAR desde .env.example)
cp .env.example .env

# 6. Documentación
cp GUIA_INTEGRACION_JAVIERA.md ./GUIA_INTEGRACION.md
cp PROXIMO_PASO.md ./
cp README.md ./
```

---

### OPCIÓN B: Script Automático (Recomendado - Mac/Linux)

#### Copiar y pegar en terminal:

```bash
# Script de descarga automática
cat > setup-javiera.sh << 'EOFSCRIPT'
#!/bin/bash

echo "🐾 Creando sistema de Dra. Javiera Montoya..."

# 1. Crear carpeta
mkdir -p vet-content-javiera
cd vet-content-javiera

# 2. Descargar archivos desde outputs
echo "📥 Descargando archivos..."

# Los archivos deben estar en /outputs
# Este script asume que los tienes disponibles

cp ../vet_content_automation_JAVIERA.jsx ./vet_content_automation.jsx
cp ../brand-guidelines.json ./
cp ../server.js ./
cp ../package.json ./
cp ../.env.example ./.env
cp ../GUIA_INTEGRACION_JAVIERA.md ./GUIA_INTEGRACION.md
cp ../PROXIMO_PASO.md ./
cp ../README.md ./

# 3. Crear carpetas necesarias
mkdir -p public/logos
mkdir -p src

# 4. Crear .gitignore
cat > .gitignore << 'EOFGIT'
node_modules/
.env
.env.local
.DS_Store
dist/
build/
*.log
.vscode/
.idea/
EOFGIT

echo "✅ Estructura creada"
echo "📝 Siguiente: Editar .env con tu ANTHROPIC_API_KEY"
echo "🚀 Luego: npm install && npm start"

EOFSCRIPT

chmod +x setup-javiera.sh
./setup-javiera.sh
```

---

### OPCIÓN C: Windows PowerShell

```powershell
# Copiar y pegar en PowerShell como administrador:

$files = @(
    "vet_content_automation_JAVIERA.jsx",
    "brand-guidelines.json",
    "server.js",
    "package.json",
    ".env.example",
    "GUIA_INTEGRACION_JAVIERA.md",
    "PROXIMO_PASO.md",
    "README.md"
)

mkdir vet-content-javiera -Force
cd vet-content-javiera

foreach ($file in $files) {
    Copy-Item "../$file" .
}

Rename-Item "vet_content_automation_JAVIERA.jsx" "vet_content_automation.jsx"
Copy-Item ".env.example" ".env"
Rename-Item "GUIA_INTEGRACION_JAVIERA.md" "GUIA_INTEGRACION.md"

mkdir public/logos -Force

Write-Host "✅ Estructura lista"
Write-Host "📝 Editar .env con tu API Key"
Write-Host "🚀 Luego: npm install && npm start"
```

---

## 📂 ESTRUCTURA FINAL (Después de descargar)

```
vet-content-javiera/
│
├── ✅ ARCHIVOS NECESARIOS
│   ├── vet_content_automation.jsx        (tu dashboard personalizado)
│   ├── server.js                         (backend)
│   ├── package.json                      (dependencias)
│   ├── brand-guidelines.json             (tu marca)
│   ├── .env                              (crear desde .env.example)
│   └── .gitignore
│
├── 📚 DOCUMENTACIÓN
│   ├── README.md
│   ├── GUIA_INTEGRACION.md
│   ├── PROXIMO_PASO.md
│   └── ARQUITECTURA_COMPLETA.md (opcional)
│
├── 📁 CARPETAS
│   ├── public/
│   │   └── logos/
│   │       ├── Logo_Cuadrado.png
│   │       └── Logotipogra_fico.png
│   └── src/
│       └── (generado por npm)
│
└── node_modules/
    └── (generado por npm install)
```

---

## 🔐 PASO CRÍTICO: CONFIGURAR .env

### Después de copiar archivos:

```bash
# 1. Editar .env
nano .env
# O: code .env (en VS Code)
# O: abre con tu editor de texto

# 2. Encontrar esta línea:
ANTHROPIC_API_KEY=sk-ant-v0-xxxxx...

# 3. Reemplazar xxxxx con tu clave real:
# Ejemplo:
ANTHROPIC_API_KEY=sk-ant-v0-abcdefg123456789...

# 4. Guardar y cerrar
```

**⚠️ IMPORTANTE:** Tu API Key empieza con `sk-ant-v0-`

---

## 🚀 INSTALAR Y PROBAR

```bash
# 1. Instalar dependencias
npm install
# Debería tomar 2-3 minutos

# 2. Iniciar servidor
npm start
# Debería mostrar:
# 🚀 Servidor iniciado en puerto 3000

# 3. Abrir navegador
# http://localhost:3000

# 4. Verificar:
# ✓ Se ve el dashboard con colores de Javiera
# ✓ Verde menta, terracota, Cormorant font
# ✓ Nombre "Dra. Javiera Montoya M."
```

---

## 🐙 SUBIR A GITHUB

```bash
# 1. Inicializar Git
git init

# 2. Agregar archivos
git add .

# 3. Primer commit
git commit -m "Initial commit: Dra. Javiera Montoya content system"

# 4. Crear repo en https://github.com/new
# Nombre: vet-content-javiera
# NO inicializar con README (ya lo tienes)

# 5. Conectar con GitHub
git remote add origin https://github.com/TU-USUARIO/vet-content-javiera.git
git branch -M main
git push -u origin main

# ✅ Tu código en GitHub
```

---

## ☁️ DEPLOY EN VERCEL (10 minutos)

```
1. Ir a https://vercel.com
2. Login con GitHub
3. Click "New Project"
4. Seleccionar: vet-content-javiera
5. Click "Import"
6. Esperar deployment (~2 min)
7. ✅ Dashboard en vivo en:
   https://vet-content-javiera.vercel.app
```

---

## 🗄️ DEPLOY EN RAILWAY (15 minutos)

### Parte A: MongoDB

```
1. https://www.mongodb.com/cloud/atlas
2. Crear cuenta gratuita
3. Create → M0 Free cluster
4. Esperar creación (~5 min)
5. Database Access → Add User
   - Username: vet_admin
   - Password: (generar automático, copiar)
6. Network Access → Allow from anywhere
7. Databases → Connect → Drivers
8. Copiar connection string:
   mongodb+srv://vet_admin:PASSWORD@cluster.mongodb.net/vet_content?retryWrites=true&w=majority
```

### Parte B: Railway Backend

```
1. https://railway.app
2. Login con GitHub
3. New Project → Deploy from GitHub repo
4. Seleccionar: vet-content-javiera
5. Click Deploy
6. Ir a "Variables"
7. Agregar variables:

ANTHROPIC_API_KEY = sk-ant-v0-TU-CLAVE
MONGODB_URI = mongodb+srv://vet_admin:PASSWORD@cluster...
NODE_ENV = production
BRAND_NAME = Dra. Javiera Montoya M.
POSTS_PER_DAY = 3

8. Esperar deployment (~3 min)
9. ✅ Backend en vivo en:
   https://vet-content-javiera.up.railway.app
```

---

## 🔗 CONECTAR FRONTEND Y BACKEND

```bash
# 1. Editar vet_content_automation.jsx
# Encontrar línea ~60:
const response = await fetch("https://api.anthropic.com/v1/messages",

# 2. Cambiar a:
const BACKEND_URL = "https://vet-content-javiera.up.railway.app";

# 3. En Vercel → Settings → Environment Variables
# Agregar:
REACT_APP_BACKEND_URL = https://vet-content-javiera.up.railway.app

# 4. Push a GitHub
git add .
git commit -m "Update backend URL"
git push

# ✅ Vercel redeploy automático
```

---

## ✅ CHECKLIST FINAL

```
[ ] Archivos descargados a la carpeta correcta
[ ] .env configurado con API Key real
[ ] npm install ejecutado sin errores
[ ] npm start funciona → http://localhost:3000 ✓
[ ] Dashboard se ve con colores correctos
[ ] Código en GitHub
[ ] Frontend en Vercel
[ ] Backend en Railway
[ ] MongoDB conectado
[ ] Frontend y Backend enlazados
[ ] Primer post se genera correctamente
[ ] Sistema 100% en vivo

→ LISTO PARA PRODUCCIÓN ✅
```

---

## 🆘 SI ALGO FALLA

### Error: "API Key not found"
```
✓ Verificar que .env tiene: ANTHROPIC_API_KEY=sk-ant-v0-...
✓ Verificar que NO hay espacios extras
✓ Reiniciar: npm start
```

### Error: "Cannot find module"
```
✓ Ejecutar: npm install
✓ Verificar que package.json está correcto
✓ Eliminar node_modules: rm -rf node_modules
✓ Reinstalar: npm install
```

### Los colores no se ven
```
✓ Limpiar caché: Cmd+Shift+R (Mac) o Ctrl+Shift+R (Windows)
✓ Verificar que usaste: vet_content_automation.jsx (renombrado)
✓ Verificar que brand-guidelines.json existe
```

---

## 📞 SOPORTE RÁPIDO

| Problema | Comando |
|----------|---------|
| Verificar que npm está instalado | `npm --version` |
| Ver estructura de carpetas | `ls -la` (Mac/Linux) o `dir` (Windows) |
| Ver si puerto 3000 está en uso | `lsof -i :3000` (Mac/Linux) |
| Detener servidor | `Ctrl+C` |
| Ver logs completos | `npm start 2>&1` |

---

## 🎯 PRÓXIMO: SEGUIR GUIA_INTEGRACION.md

Una vez que todo esté descargado y funcionando localmente:

```
1. Lee: GUIA_INTEGRACION.md (instrucciones detalladas)
2. Sigue cada fase (6 fases de 45 minutos)
3. En 45 minutos: Sistema completamente en vivo
4. Empieza a generar posts automáticamente
```

---

## 📝 NOTAS IMPORTANTES

```
✓ Tu API Key de Claude es privada
  - NO la commitees a GitHub (.gitignore la protege)
  - NO la compartas con nadie
  - Mantenla solo en .env local y Railway

✓ Los colores de Javiera están:
  - En brand-guidelines.json
  - En vet_content_automation.jsx (CSS variables)
  - En todos los prompts de Claude

✓ El sistema genera contenido EN ESPAÑOL
  - Tono: Cálido, profesional, personal
  - Público: Mujeres 30-50, Santiago Oriente
  - Valores: Confianza, calidez, bienestar

✓ Cada post se personaliza automáticamente
  - Nombre de la Dra.
  - Hashtags de marca
  - Colores de marca
  - Tono de marca
```

---

## 🚀 ESTÁS LISTO

Sigue estos pasos en orden:

```
1. Descargar archivos (Opción A, B o C)
2. Configurar .env
3. npm install
4. npm start (verificar)
5. Subir a GitHub
6. Deploy Vercel + Railway
7. Conectar frontend ↔ backend
8. ¡Publicar contenido automáticamente!
```

**¡Tu sistema está 100% personalizado y listo para escalar! 🐾**

---

**Documentación de descarga para Dra. Javiera Montoya M.**
*Enero 2024 | Versión 1.0.0*