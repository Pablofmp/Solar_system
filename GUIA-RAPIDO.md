# 🚀 Guia Rápido: Publicar no GitHub

## Nome do Repositório: `Solar_System`

---

## ⚡ Método Mais Rápido (Recomendado)

### 1. Instalar GitHub CLI

**macOS:**
```bash
brew install gh
```

**Windows:**
```powershell
winget install GitHub.cli
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt install gh

# Fedora
sudo dnf install gh

# Arch
sudo pacman -S github-cli
```

### 2. Autenticar
```bash
gh auth login
```
Segue as instruções (escolhe HTTPS e autentica pelo browser).

### 3. Publicar
```bash
gh repo create Solar_System --public --source=. --push
```

**Pronto!** ✅ O teu repositório está criado em:
`https://github.com/TEU-USUARIO/Solar_System`

---

## 📝 Método Alternativo (Git Manual)

### Passo 1: Criar Repositório no GitHub

1. Acede a: **https://github.com/new**
2. Preenche:
   - **Repository name**: `Solar_System`
   - **Description**: `Sistema Solar Interativo 3D com física realista`
   - **Public** ✅
   - **NÃO** marcar "Add a README file"
3. Clica em **"Create repository"**

### Passo 2: Publicar Código

No terminal, na pasta do projeto:

```bash
# Inicializar git
git init

# Adicionar todos os ficheiros
git add .

# Commit inicial
git commit -m "feat: Sistema Solar Interativo 3D completo"

# Renomear branch
git branch -M main

# Conectar ao GitHub (SUBSTITUI 'TEU-USUARIO')
git remote add origin https://github.com/TEU-USUARIO/Solar_System.git

# Fazer push
git push -u origin main
```

**Importante**: Substitui `TEU-USUARIO` pelo teu username do GitHub!

---

## 🖥️ Usar Scripts Automáticos

### Linux/macOS
```bash
chmod +x publish-to-github.sh
./publish-to-github.sh
```

### Windows (PowerShell)
```powershell
.\publish-to-github.ps1
```

---

## 🌐 Deploy Online (Opcional)

### Vercel (Mais Fácil)
1. Acede a: **https://vercel.com**
2. Clica em **"Add New Project"**
3. Importa o repositório `Solar_System`
4. Clica em **"Deploy"**
5. Pronto! Site online em ~30 segundos

### GitHub Pages
```bash
npm install --save-dev gh-pages
```

Adiciona ao `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Depois:
```bash
npm run deploy
```

Nas settings do GitHub:
- **Settings** → **Pages**
- **Source**: `gh-pages branch`
- **Save**

---

## ✅ Checklist Final

- [ ] Repositório criado com nome `Solar_System`
- [ ] Código publicado com sucesso
- [ ] README.md visível na página principal
- [ ] (Opcional) Site online via Vercel/GitHub Pages

---

## 🎨 Personalizar o Repositório

### Adicionar Topics
1. Vai à página do repositório
2. Clica no ícone de engrenagem (⚙️) perto do nome
3. Adiciona: `solar-system`, `3d-visualization`, `physics-simulation`, `education`, `astronomy`, `threejs`, `react`, `typescript`

### Atualizar Descrição
```
Sistema Solar Interativo 3D com física realista - Simulação educativa com mecânica orbital de Kepler, Newton e Einstein
```

---

## 🆘 Problemas Comuns

### "Permission denied"
```bash
# Configurar credenciais
git config --global user.name "Teu Nome"
git config --global user.email "teu@email.com"
```

### "Updates were rejected"
```bash
# Forçar push (cuidado!)
git push -f origin main
```

### 2FA Ativado
Se tens autenticação de dois fatores, precisas de um **Personal Access Token**:
1. Acede a: https://github.com/settings/tokens
2. Clica em **"Generate new token"**
3. Seleciona: `repo` (full control)
4. Copia o token e usa-o como password no git

---

## 📞 Precisas de Ajuda?

- 📖 [Documentação do Git](https://git-scm.com/doc)
- 📘 [GitHub Docs](https://docs.github.com/)
- 💬 Abre uma [Discussion](https://github.com/TEU-USUARIO/Solar_System/discussions)

---

**Boa sorte!** 🚀🌌
