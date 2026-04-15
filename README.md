# PWA para Google Apps Script

## Como publicar no GitHub Pages

### 1. Criar repositório no GitHub
1. Acesse https://github.com/new
2. Dê um nome ao repositório (ex: `meu-app`)
3. Marque como **Public**
4. Clique em **Create repository**

### 2. Fazer upload dos arquivos
Na página do repositório criado:
1. Clique em **"uploading an existing file"**
2. Arraste todos estes arquivos de uma vez:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
3. Clique em **Commit changes**

### 3. Ativar GitHub Pages
1. Vá em **Settings** (aba do repositório)
2. No menu lateral, clique em **Pages**
3. Em "Source", selecione **Deploy from a branch**
4. Branch: **main** / Pasta: **/ (root)**
5. Clique em **Save**

### 4. Acessar o app
Após ~1 minuto, seu PWA estará em:
```
https://SEU_USUARIO.github.io/meu-app/
```

### 5. Instalar como PWA no celular
- **Android Chrome/Edge**: Abra o link → Menu (⋮) → "Adicionar à tela inicial" / "Instalar app"
- **iOS Safari**: Abra o link → Compartilhar → "Adicionar à Tela de Início"

---

## Personalizar o app

### Mudar nome e cor
Edite o `manifest.json`:
```json
{
  "name": "Nome do Seu App",
  "short_name": "App",
  "theme_color": "#SUA_COR"
}
```
E no `index.html`, mude a mesma cor em `<meta name="theme-color">`.

### Trocar os ícones
Substitua `icon-192.png` e `icon-512.png` pelos seus ícones.
Use https://realfavicongenerator.net para gerar todos os tamanhos.
