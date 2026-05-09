# 💻 Kanban Flow - Frontend

Este é o cliente web do projeto Kanban Flow, desenvolvido com **React**, **Vite** e **Tailwind CSS**. A interface foi projetada para oferecer uma experiência de utilizador fluida, com foco total em interações de *Drag & Drop*.

## 🚀 Inicialização

Este serviço está configurado para ser iniciado automaticamente através do **Docker Compose** na raiz do projeto. No entanto, podes optar por executá-lo de forma independente para fins de desenvolvimento.

### Como rodar manualmente (Standalone)

Caso precises de rodar apenas o frontend fora do ambiente Docker, segue estes passos:

1.  **Entra na diretoria do frontend:**
    ```bash
    cd frontend
    ```

2.  **Instala as dependências:**
    ```bash
    npm install
    ```

3.  **Inicia o servidor de desenvolvimento:**
    Utilizamos a flag `--host` para garantir que o Vite fique acessível externamente e consiga comunicar corretamente com o backend:
    ```bash
    npm run dev -- --host
    ```

4.  **Acede à aplicação:**
    O frontend estará disponível em: `http://localhost:5173`

## 🛠️ Tecnologias Principais

* **React + Vite**: Engine para renderização rápida e Hot Module Replacement (HMR).
* **dnd-kit**: Biblioteca modular para a lógica de arrastar e soltar tarefas.
* **Tailwind CSS**: Framework CSS para estilização moderna e responsiva.
* **Axios**: Cliente HTTP para consumo da API Laravel (V1).
* **Lucide React**: Ícones minimalistas e otimizados.

## ⚙️ Configuração da API

Verifica se o arquivo `.env` na raiz desta pasta aponta corretamente para o endpoint do backend. Por defeito, a aplicação procura a API em:
`VITE_API_URL=http://localhost:8000/api/v1`

---
*Este frontend faz parte do ecossistema Kanban Flow e depende da API Laravel para persistência de dados.*