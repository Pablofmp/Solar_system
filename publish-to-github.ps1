# Script PowerShell para publicar o Sistema Solar Interativo no GitHub
# Nome do repositório: Solar_System

Write-Host "🌌 Sistema Solar Interativo - Publicação no GitHub" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se o git está instalado
try {
    $gitVersion = git --version
    Write-Host "✅ Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git não está instalado." -ForegroundColor Red
    Write-Host "   Instala o git em: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Verificar se o GitHub CLI está instalado
$ghInstalled = $false
try {
    $ghVersion = gh --version
    Write-Host "✅ GitHub CLI encontrado!" -ForegroundColor Green
    $ghInstalled = $true
} catch {
    Write-Host "ℹ️  GitHub CLI não encontrado (opcional)" -ForegroundColor Yellow
}

Write-Host ""

if ($ghInstalled) {
    $useGh = Read-Host "🚀 Queres usar o GitHub CLI para criar o repositório automaticamente? (s/n)"
    
    if ($useGh -eq "s" -or $useGh -eq "S") {
        Write-Host ""
        Write-Host "🔐 Autenticando com o GitHub..." -ForegroundColor Cyan
        gh auth login
        
        Write-Host ""
        Write-Host "📦 Criando repositório 'Solar_System'..." -ForegroundColor Cyan
        gh repo create Solar_System --public --source=. --push
        
        Write-Host ""
        Write-Host "✅ Sucesso! Repositório criado." -ForegroundColor Green
        $repoInfo = gh repo view --json url -q .url
        Write-Host "   URL: $repoInfo" -ForegroundColor Green
        exit 0
    }
}

# Método manual
Write-Host ""
Write-Host "📝 Método manual com Git" -ForegroundColor Cyan
Write-Host ""

$githubUsername = Read-Host "👤 Qual é o teu username do GitHub?"

if ([string]::IsNullOrEmpty($githubUsername)) {
    Write-Host "❌ Username não fornecido. Abortando." -ForegroundColor Red
    exit 1
}

# Configurar git se necessário
$gitName = git config user.name
if ([string]::IsNullOrEmpty($gitName)) {
    $gitName = Read-Host "📛 Nome para commits"
    git config --global user.name "$gitName"
}

$gitEmail = git config user.email
if ([string]::IsNullOrEmpty($gitEmail)) {
    $gitEmail = Read-Host "📧 Email para commits"
    git config --global user.email "$gitEmail"
}

Write-Host ""
Write-Host "📦 Inicializando repositório git..." -ForegroundColor Cyan
git init

Write-Host ""
Write-Host "📂 Adicionando ficheiros..." -ForegroundColor Cyan
git add .

Write-Host ""
Write-Host "💾 Criando commit inicial..." -ForegroundColor Cyan
git commit -m "feat: Sistema Solar Interativo 3D completo

- 9 planetas com dados reais da NASA
- 11 luas principais
- Física realista: Kepler, Newton, Einstein
- Precessão relativística do periélio
- Cintura de asteroides e Kuiper
- Tróianos de Júpiter
- Atmosferas volumétricas
- Tour guiado e quiz educativo
- Calculadora de viagem espacial
- Gráficos em tempo real
- Mini-mapa interativo
- Atalhos de teclado
- Modo escuro/claro
- Internacionalização (PT, EN, ES, FR)
- Exportação de dados (PNG, JSON, CSV)"

Write-Host ""
Write-Host "🌿 Renomeando branch para main..." -ForegroundColor Cyan
git branch -M main

Write-Host ""
Write-Host "🔗 Conectando ao GitHub..." -ForegroundColor Cyan
git remote add origin "https://github.com/$githubUsername/Solar_System.git"

Write-Host ""
Write-Host "🚀 Fazendo push para o GitHub..." -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANTE: O GitHub vai pedir as tuas credenciais." -ForegroundColor Yellow
Write-Host "   Se usares 2FA, precisas de um Personal Access Token." -ForegroundColor Yellow
Write-Host "   Cria um em: https://github.com/settings/tokens" -ForegroundColor Yellow
Write-Host ""
git push -u origin main

Write-Host ""
Write-Host "✅ Sucesso! Repositório criado em:" -ForegroundColor Green
Write-Host "   https://github.com/$githubUsername/Solar_System" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 O teu Sistema Solar Interativo está agora no GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "📌 Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. Adiciona topics: solar-system, 3d-visualization, physics-simulation" -ForegroundColor White
Write-Host "   2. Atualiza a descrição do repositório" -ForegroundColor White
Write-Host "   3. (Opcional) Faz deploy no GitHub Pages, Vercel ou Netlify" -ForegroundColor White
Write-Host ""
