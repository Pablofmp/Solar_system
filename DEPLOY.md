# 🚀 Guia de Deploy para GitHub

Este guia explica como publicar o **Sistema Solar Interativo** no GitHub.

## 📋 Pré-requisitos

- [Git](https://git-scm.com/) instalado
- Conta no [GitHub](https://github.com/)
- Terminal ou linha de comandos

## 🔧 Passo-a-Passo

### 1. Criar Repositório no GitHub

1. Acede a [github.com/new](https://github.com/new)
2. Preenche os campos:
   - **Repository name**: `Solar-System_(sistema-solar)`
   - **Description**: `Sistema Solar Interativo 3D com física realista - Simulação educativa com mecânica orbital de Kepler, Newton e Einstein`
   - **Public** (recomendado para projetos educativos)
   - **NÃO** inicializar com README, .gitignore ou license (já temos)
3. Clica em **"Create repository"**

### 2. Preparar o Projeto Localmente

Abre o terminal na pasta do projeto e executa:

```bash
# Inicializar git (se ainda não foi feito)
git init

# Adicionar todos os ficheiros
git add .

# Primeiro commit
git commit -m "feat: Sistema Solar Interativo 3D completo

- Visualização 3D com Three.js e React Three Fiber
- 9 planetas com dados reais da NASA
- 11 luas principais
- 2 cometas (Halley, Hale-Bopp)
- Cintura de asteroides e Kuiper
- Tróianos de Júpiter (pontos L4/L5)
- Física realista: Kepler, Newton, Einstein
- Precessão relativística do periélio
- Dilatação temporal gravitacional
- Transferência de Hohmann
- Calculadora de viagem espacial
- Comparador de planetas
- Calculadora de peso
- Tour guiado interativo
- Quiz educativo
- Gráficos em tempo real
- Mini-mapa interativo
- Atalhos de teclado
- Modo escuro/claro
- Internacionalização (PT, EN, ES, FR)
- Exportação de dados (PNG, JSON, CSV)
- Atmosferas volumétricas
- Auroras polares
- Anéis de Saturno melhorados
- Simulação N-body"
```

### 3. Conectar ao GitHub

```bash
# Adicionar o repositório remoto
# Substitui USERNAME pelo teu username do GitHub
git remote add origin https://github.com/USERNAME/Solar-System_(sistema-solar).git

# Renomear branch para main
git branch -M main

# Fazer push
git push -u origin main
```

### 4. Verificar no GitHub

1. Acede a `https://github.com/USERNAME/Solar-System_(sistema-solar)`
2. Verifica se todos os ficheiros foram enviados
3. O README.md deve aparecer automaticamente na página

## 🌐 Deploy Adicional (Opcional)

### GitHub Pages (Hospedagem Gratuita)

Para tornar o projeto acessível online:

```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Adicionar ao package.json (scripts):
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

Depois, nas settings do repositório:
1. Vai a **Settings** → **Pages**
2. Em **Source**, seleciona **gh-pages branch**
3. Clica em **Save**
4. O site estará disponível em: `https://USERNAME.github.io/Solar-System_(sistema-solar)/`

### Vercel (Deploy Automático)

1. Acede a [vercel.com](https://vercel.com/)
2. Clica em **"New Project"**
3. Importa o repositório do GitHub
4. Clica em **"Deploy"**
5. Pronto! Site online em segundos.

### Netlify (Deploy Automático)

1. Acede a [netlify.com](https://netlify.com/)
2. Arrasta a pasta `dist/` para o Netlify
3. Ou conecta o repositório GitHub para deploy automático

## 📝 Comandos Úteis

### Verificar Status
```bash
git status
```

### Ver Histórico de Commits
```bash
git log --oneline
```

### Atualizar Mudanças Locais
```bash
git add .
git commit -m "descrição das mudanças"
git push
```

### Resolver Conflitos
```bash
git pull origin main
# Resolver conflitos manualmente
git add .
git commit -m "fix: resolve conflitos"
git push
```

### Criar Nova Branch
```bash
git checkout -b feature/nova-funcionalidade
# Faz as mudanças
git add .
git commit -m "feat: nova funcionalidade"
git push origin feature/nova-funcionalidade
```

## 🎯 Boas Práticas

### Commits
- Usa mensagens claras e descritivas
- Segue o padrão [Conventional Commits](https://www.conventionalcommits.org/)
- Faz commits pequenos e focados

### Branches
- `main` - código estável
- `develop` - desenvolvimento ativo
- `feature/*` - novas funcionalidades
- `fix/*` - correções de bugs

### Pull Requests
- Descreve claramente as mudanças
- Adiciona screenshots (se aplicável)
- Reference issues relacionadas
- Pede review antes de merge

## 🔒 Segurança

### Nunca Commitar:
- ❌ Credenciais (senhas, tokens, API keys)
- ❌ Ficheiros `.env` com dados sensíveis
- ❌ `node_modules/` (usar `.gitignore`)
- ❌ Ficheiros de sistema (`.DS_Store`, `Thumbs.db`)

### Usar:
- ✅ `.gitignore` configurado
- ✅ Variáveis de ambiente para secrets
- ✅ GitHub Secrets para CI/CD
- ✅ HTTPS para clones e pushes

## 📊 Estatísticas do Repositório

Após o push, o GitHub mostrará:
- Número de commits
- Linguagens utilizadas
- Tamanho do repositório
- Contribuidores
- Issues e Pull Requests
- Stars e Forks

## 🆘 Problemas Comuns

### "Permission denied (publickey)"
```bash
# Configurar SSH (alternativa ao HTTPS)
ssh-keygen -t ed25519 -C "your_email@example.com"
# Adicionar a chave ao GitHub: Settings → SSH and GPG keys
```

### "Updates were rejected"
```bash
# Forçar push (cuidado!)
git push -f origin main
```

### "fatal: remote origin already exists"
```bash
# Remover e readicionar
git remote remove origin
git remote add origin https://github.com/USERNAME/Solar-System_(sistema-solar).git
```

## 📞 Suporte

Se tiveres problemas:
1. Verifica a [documentação do Git](https://git-scm.com/doc)
2. Consulta o [GitHub Docs](https://docs.github.com/)
3. Abre uma [Discussion](../../discussions) no repositório

---

**Boa sorte com o teu projeto!** 🚀🌌
