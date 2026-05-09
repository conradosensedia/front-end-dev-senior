# 📋 Kanban Flow

Um sistema de gerenciamento de tarefas (Kanban) moderno, construído para oferecer agilidade e organização. Este projeto foi desenvolvido focado em alta performance e interatividade via Drag & Drop.

---

## 🚀 Sobre o Projeto

O **Kanban Flow** permite que usuários criem quadros de tarefas e gerenciem seus fluxos de trabalho movendo cards entre colunas de status (To Do, In Progress, Done). A interface foi projetada para ser intuitiva, com feedback em tempo real e persistência de dados.

### Principais Funcionalidades
*   **Gestão de Boards:** Criação e organização de múltiplos quadros.
*   **Sistema Drag & Drop:** Movimentação fluida de tarefas entre colunas usando `dnd-kit`.
*   **CRUD Completo:** Criação, edição e exclusão de tarefas com modais integrados.
*   **Interface Responsiva:** Design limpo e adaptável desenvolvido com Tailwind CSS.
*   **Arquitetura API:** Backend em Laravel servindo dados de forma performática para o Frontend em React.
*   **Documentação Swagger:** Documentação disponivel no Swagger.

---

## 🛠️ Tecnologias Utilizadas

### **Backend**
*   **Laravel 13**: Framework PHP moderno para a API.
*   **Laravel Sail**: Ambiente de desenvolvimento baseado em Docker.
*   **PostgreSQL**: Banco de dados relacional para persistência.

### **Frontend**
*   **React + Vite**: Biblioteca para interfaces reativas e build ultra-rápido.
*   **Tailwind CSS**: Estilização baseada em utilitários.
*   **Dnd-kit**: Biblioteca modular para interações de arrastar e soltar.
*   **Lucide React**: Biblioteca de ícones modernos.

A escolha pelo PostgreSQL em vez do MongoDB fundamenta-se na necessidade de integridade referencial e consistência de dados, garantindo que os relacionamentos entre usuários, quadros e tarefas sejam geridos de forma robusta via chaves estrangeiras. Enquanto bancos NoSQL oferecem flexibilidade para dados amorfos, o modelo relacional do Postgres mostrou-se superior para este sistema devido à estrutura previsível das tarefas e à eficiência na execução de consultas complexas de ordenação, essenciais para a precisão do fluxo de Drag and Drop.

---

## 📦 Como Rodar o Projeto

Este projeto foi configurado para ser iniciado com apenas **um comando**, utilizando Docker e um script de automação.

### **Pré-requisitos**
*   Docker instalado.
*   Node.js e NPM (para dependências locais, se necessário).
*   PHP 8.3+ e Composer.

### **Passo a Passo**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/pabloferreiradias/front-end-dev-senior.git
    cd front-end-dev-senior
    ```

2.  **Execute o script de setup:**
    O script irá configurar o seu arquivo `.env`, subir os containers do Docker, rodar as migrations e gerar o build do frontend.
    ```bash
    chmod +x setup.sh
    ./setup.sh
    ```

3.  **Acesse a aplicação:**
    Após o término do script, a api estará disponível em: [http://localhost/api/v1](http://localhost/api/v1) (ou a porta configurada no seu compose.yaml).
    
    O frontend estará disponível em: [http://localhost:5173/](http://localhost:5173/) (ou a porta configurada no seu compose.yaml).
    
    A documentação estará disponível atráves do Swagger em: [http://localhost/api/documentation/](http://localhost/api/documentation/).

---

## 📐 Decisões de Engenharia

Durante o desenvolvimento, priorizei os seguintes pontos:
*   **UX Otimista:** Ao mover uma tarefa, a interface é atualizada instantaneamente no frontend antes mesmo da resposta do servidor, garantindo uma sensação de rapidez.
*   **Componentização:** Divisão clara entre `Column`, `TaskCard` e `Modals` para facilitar a manutenção.
*   **Segurança e Consistência:** Uso de Form Requests no Laravel para validação de dados e deleção lógica de tarefas.

---
