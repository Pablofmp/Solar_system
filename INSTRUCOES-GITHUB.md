# 📤 Instruções para Publicar no GitHub

## ⚠️ Importante

Eu (assistente AI) **não tenho acesso direto ao GitHub** para criar repositórios ou fazer push. No entanto, preparei todos os ficheiros necessários e vou guiar-te passo-a-passo!

## ✅ Ficheiros Criados para o Repositório

Já criei todos os ficheiros necessários para um repositório GitHub profissional:

- ✅ `README.md` - Documentação completa com badges
- ✅ `LICENSE` - Licença MIT
- ✅ `CONTRIBUTING.md` - Guia de contribuição
- ✅ `DEPLOY.md` - Guia de deploy detalhado
- ✅ `.gitignore` - Ignorar ficheiros desnecessários
- ✅ `INSTRUCOES-GITHUB.md` - Este ficheiro

## 🚀 Passo-a-Passo para Publicar

### Opção 1: Usando GitHub CLI (Recomendado)

Se tens o [GitHub CLI](https://cli.github.com/) instalado:

```bash
# 1. Instalar GitHub CLI (se necessário)
# macOS: brew install gh
# Windows: winget install GitHub.cli
# Linux: ver https://github.com/cli/cli#installation

# 2. Autenticar
gh auth login

# 3. Criar repositório e fazer push
gh repo create Solar-System_\(sistema-solar\) --public --source=. --push
```

### Opção 2: Usando Git Manualmente

```bash
# 1. Criar repositório no GitHub
# Acede a: https://github.com/new
# Nome: Solar-System_(sistema-solar)
# Descrição: Sistema Solar Interativo 3D com física realista
# NÃO inicializar com README (já temos)

# 2. No terminal, na pasta do projeto:
git init
git add .
git commit -m "feat: Sistema Solar Interativo 3D completo"
git branch -M main

# 3. Conectar ao GitHub (substitui USERNAME)
git remote add origin https://github.com/USERNAME/Solar-System_(sistema-solar).git
git push -u origin main
```

### Opção 3: Upload Direto pelo Browser

1. Cria o repositório em https://github.com/new
2. Na página do repositório, clica em **"uploading an existing file"**
3. Arrasta todos os ficheiros do projeto
4. Clica em **"Commit changes"**

**Nota**: Esta opção é mais limitada e não preserva o histórico git.

## 📋 Checklist Antes do Push

- [ ] Testar se o projeto compila: `npm run build`
- [ ] Verificar se não há erros de TypeScript
- [ ] Confirmar que o `.gitignore` está correto
- [ ] Ler o README.md para garantir que está completo
- [ ] Escolher uma licença (MIT já incluída)

## 🎯 Estrutura do Repositório

```
Solar-System_(sistema-solar)/
├── 📄 README.md              # Documentação principal
├── 📄 LICENSE                # Licença MIT
├── 📄 CONTRIBUTING.md        # Guia de contribuição
├── 📄 DEPLOY.md              # Guia de deploy
├── 📄 .gitignore             # Ignorar ficheiros
├── 📄 package.json           # Dependências
├── 📄 tsconfig.json          # Config TypeScript
├── 📄 vite.config.js         # Config Vite
├── 📁 src/
│   ├── 📁 components/        # 20+ componentes React
│   ├── 📁 data/              # Dados astronómicos
│   ├── 📁 physics/           # Motor de física
│   ├── 📁 shaders/           # Shaders GLSL
│   └── 📁 utils/             # Utilitários
└── 📁 public/                # Assets estáticos
```

## 🔧 Comandos Úteis

```bash
# Ver status do git
git status

# Ver histórico de commits
git log --oneline

# Adicionar mudanças
git add .
git commit -m "descrição"
git push

# Criar nova branch
git checkout -b feature/nova-funcionalidade

# Voltar para main
git checkout main
```

## 🌐 Deploy Online (Opcional)

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Adicionar ao package.json:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"
npm run deploy
```

### Vercel (Mais Fácil)
1. Acede a [vercel.com](https://vercel.com/)
2. Importa o repositório do GitHub
3. Deploy automático!

### Netlify
1. Acede a [netlify.com](https://netlify.com/)
2. Conecta o repositório
3. Deploy automático!

## 📊 Estatísticas Esperadas

Após o push, o GitHub mostrará:
- 📦 **Tamanho**: ~1.5 MB (código) + assets
- 🗣️ **Linguagens**: TypeScript (90%), CSS (8%), HTML (2%)
- 📝 **Commits**: 1 commit inicial (podes adicionar mais)
- 👥 **Contribuidores**: 1 (tu!)
- ⭐ **Stars**: 0 (espera-se que aumente!)

## 🎨 Personalizar o Repositório

### Adicionar Topics (Tags)
No GitHub, vai a **Settings** e adiciona:
- `solar-system`
- `3d-visualization`
- `physics-simulation`
- `education`
- `astronomy`
- `threejs`
- `react`
- `typescript`

### Adicionar Descrição
Atualiza a descrição do repositório para:
> "Sistema Solar Interativo 3D com física realista - Simulação educativa com mecânica orbital de Kepler, Newton e Einstein. Inclui 9 planetas, luas, cometas, cinturão de Kuiper, e ferramentas educativas completas."

### Adicionar Website
Se fizeres deploy no GitHub Pages/Vercel/Netlify, adiciona o URL na secção "Website" do repositório.

## 🆘 Problemas Comuns

### "Permission denied"
```bash
# Configurar credenciais
git config --global user.name "Teu Nome"
git config --global user.email "teu@email.com"

# Ou usar GitHub CLI
gh auth login
```

### "Updates were rejected"
```bash
# Forçar push (cuidado!)
git push -f origin main
```

### Ficheiros muito grandes
```bash
# Verificar tamanho
git count-objects -vH

# Remover ficheiros grandes do commit
git rm --cached ficheiro-grande
git commit --amend
```

## 📞 Suporte

Se tiveres problemas:
1. Consulta [DEPLOY.md](DEPLOY.md) para instruções detalhadas
2. Lê a [documentação do Git](https://git-scm.com/doc)
3. Consulta o [GitHub Docs](https://docs.github.com/)
4. Abre uma [Discussion](../../discussions)

## 🎉 Pronto!

Após seguir estes passos, o teu **Sistema Solar Interativo** estará disponível no GitHub!

**URL esperado**: `https://github.com/USERNAME/Solar-System_(sistema-solar)`

---

**Boa sorte com o teu projeto!** 🚀🌌
