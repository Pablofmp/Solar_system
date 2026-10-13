# 🤝 Guia de Contribuição

Obrigado pelo teu interesse em contribuir para o **Sistema Solar Interativo**! Este documento fornece orientações para contribuir com o projeto.

## 📋 Como Contribuir

### 🐛 Reportar Bugs

1. Verifica se o bug já foi reportado nas [Issues](../../issues)
2. Se não existir, cria uma nova issue com:
   - Título descritivo
   - Passos para reproduzir
   - Comportamento esperado vs. atual
   - Screenshots (se aplicável)
   - Ambiente (SO, browser, versão)

### 💡 Sugerir Melhorias

1. Abre uma issue com a label `enhancement`
2. Descreve a funcionalidade desejada
3. Explica o benefício para o projeto
4. Fornece exemplos ou mockups (se possível)

### 🔧 Submeter Pull Requests

1. **Faz fork** do repositório
2. **Cria uma branch** para a tua funcionalidade:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. **Faz commit** das tuas alterações:
   ```bash
   git commit -m 'feat: adiciona nova funcionalidade'
   ```
4. **Faz push** para a branch:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. **Abre um Pull Request**

## 🎯 Áreas Prioritárias para Contribuição

### Física
- [ ] Interação N-body completa
- [ ] Efeitos de maré
- [ ] Ressonâncias orbitais
- [ ] Assistência gravitacional

### Visualização
- [ ] Texturas de alta resolução
- [ ] Sombras realistas
- [ ] Atmosferas mais detalhadas
- [ ] Efeitos de luz melhorados

### Educação
- [ ] Mais perguntas no quiz
- [ ] Tour guiado expandido
- [ ] Vídeos educativos
- [ ] Traduções adicionais

### Performance
- [ ] Otimização de shaders
- [ ] Instanced meshes
- [ ] Web Workers
- [ ] Code splitting

### UX/UI
- [ ] Acessibilidade (ARIA)
- [ ] Responsividade mobile
- [ ] Modo VR/AR (WebXR)
- [ ] Mais idiomas

## 📝 Convenções de Código

### Commits
Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Alterações na documentação
- `style:` Formatação, ponto e vírgula, etc.
- `refactor:` Refatoração de código
- `perf:` Melhorias de performance
- `test:` Adição ou correção de testes
- `chore:` Atualizações de build, dependências, etc.

### Estrutura de Ficheiros
```
src/
├── components/     # Componentes React
├── data/          # Dados astronómicos
├── physics/       # Motor de física
├── shaders/       # Shaders GLSL
└── utils/         # Utilitários
```

### Nomenclatura
- **Componentes**: PascalCase (`PlanetCard.tsx`)
- **Ficheiros de dados**: camelCase (`planets.ts`)
- **Funções**: camelCase (`calculateOrbit`)
- **Constantes**: UPPER_SNAKE_CASE (`SOLAR_MASS`)
- **Tipos/Interfaces**: PascalCase (`PlanetData`)

## 🧪 Testes

Antes de submeter um PR:

```bash
# Verifica se o projeto compila
npm run build

# Verifica erros de TypeScript
npx tsc --noEmit

# Verifica linting (se configurado)
npm run lint
```

## 📚 Documentação

- Atualiza o README.md se adicionares novas funcionalidades
- Documenta funções complexas com comentários JSDoc
- Adiciona exemplos de uso quando aplicável
- Mantém o código auto-explicativo

## 🎨 Estilo de Código

- Usa TypeScript para type safety
- Prefere funções puras quando possível
- Mantém componentes pequenos e focados
- Usa hooks do React adequadamente
- Segue as convenções do Tailwind CSS

## 🌍 Traduções

Para adicionar um novo idioma:

1. Edita `src/utils/i18n.ts`
2. Adiciona o novo objeto de traduções
3. Mantém a mesma estrutura dos idiomas existentes
4. Testa a mudança de idioma

## ❓ Dúvidas?

- Abre uma [Discussion](../../discussions)
- Ou contacta os maintainers

## 📜 Licença

Ao contribuir, concordas que as tuas contribuições serão licenciadas sob a [MIT License](LICENSE).

---

**Obrigado por ajudar a tornar a educação científica mais acessível!** 🚀🌌
