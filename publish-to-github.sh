#!/bin/bash

# Script para publicar o Sistema Solar Interativo no GitHub
# Nome do repositório: Solar_System

echo "🌌 Sistema Solar Interativo - Publicação no GitHub"
echo "=================================================="
echo ""

# Verificar se o git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git não está instalado. Por favor, instala o git primeiro."
    echo "   macOS: brew install git"
    echo "   Windows: winget install Git.Git"
    echo "   Linux: sudo apt install git"
    exit 1
fi

# Verificar se o GitHub CLI está instalado (opcional)
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI encontrado!"
    echo ""
    echo "🚀 Método recomendado: GitHub CLI"
    echo ""
    read -p "Queres usar o GitHub CLI para criar o repositório automaticamente? (s/n): " use_gh
    
    if [ "$use_gh" = "s" ] || [ "$use_gh" = "S" ]; then
        echo ""
        echo "🔐 Autenticando com o GitHub..."
        gh auth login
        
        echo ""
        echo "📦 Criando repositório 'Solar_System'..."
        gh repo create Solar_System --public --source=. --push
        
        echo ""
        echo "✅ Sucesso! Repositório criado em:"
        echo "   https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner)"
        exit 0
    fi
fi

# Método manual com git
echo ""
echo "📝 Método manual com Git"
echo ""

# Pedir username do GitHub
read -p "👤 Qual é o teu username do GitHub? " github_username

if [ -z "$github_username" ]; then
    echo "❌ Username não fornecido. Abortando."
    exit 1
fi

# Configurar git (se necessário)
if [ -z "$(git config user.name)" ]; then
    read -p "📛 Nome para commits: " git_name
    git config --global user.name "$git_name"
fi

if [ -z "$(git config user.email)" ]; then
    read -p "📧 Email para commits: " git_email
    git config --global user.email "$git_email"
fi

echo ""
echo "📦 Inicializando repositório git..."
git init

echo ""
echo "📂 Adicionando ficheiros..."
git add .

echo ""
echo "💾 Criando commit inicial..."
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

echo ""
echo "🌿 Renomeando branch para main..."
git branch -M main

echo ""
echo "🔗 Conectando ao GitHub..."
git remote add origin https://github.com/$github_username/Solar_System.git

echo ""
echo "🚀 Fazendo push para o GitHub..."
echo ""
echo "⚠️  IMPORTANTE: O GitHub vai pedir as tuas credenciais."
echo "   Se usares 2FA, precisas de um Personal Access Token."
echo "   Cria um em: https://github.com/settings/tokens"
echo ""
git push -u origin main

echo ""
echo "✅ Sucesso! Repositório criado em:"
echo "   https://github.com/$github_username/Solar_System"
echo ""
echo "🎉 O teu Sistema Solar Interativo está agora no GitHub!"
echo ""
echo "📌 Próximos passos:"
echo "   1. Adiciona topics: solar-system, 3d-visualization, physics-simulation"
echo "   2. Atualiza a descrição do repositório"
echo "   3. (Opcional) Faz deploy no GitHub Pages, Vercel ou Netlify"
echo ""
