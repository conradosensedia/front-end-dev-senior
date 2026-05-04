### 📝 Requisitos: Tela "Create New Board" (Formulário)

Esta tela deve ser acessada ao clicar no card "Create New Board" da página anterior. Ela avalia como o desenvolvedor lida com entradas do usuário e persistência.

#### **1. Componentes de Formulário (React)**
* **Campos de Texto:** Implementar os campos `Board Name` (obrigatório) e `Description` (opcional).
* **Board Identity (Seletores):**
    * **Theme Color:** Um seletor de cores funcional. O estado deve refletir a cor selecionada (adicionando um feedback visual, como uma borda ou check).
    * **Board Icon:** Uma lista de ícones selecionáveis. O ícone escolhido deve ser enviado para o backend para renderização posterior nos cards do Dashboard.
* **Breadcrumbs:** Implementar a navegação no topo (`Workspace > Boards`) para permitir o retorno fácil.

#### **2. Validação e UX**
* **Validação de Front-end:** O botão "Create Board" deve permanecer desabilitado ou exibir um erro caso o `Board Name` esteja vazio.
* **Feedback de Envio:** Exibir um estado de "Loading" no botão durante a requisição à API e redirecionar para o Dashboard em caso de sucesso.

#### **3. Persistência e Padrões (PHP)**
* **Repository Pattern:** O método `save(Board $board)` no seu repositório PHP deve ser capaz de lidar com a gravação desses campos no banco escolhido (PostgreSQL ou MongoDB).
* **Data Transfer Object (DTO):** Como uma boa prática sênior, espera-se que o candidato use DTOs ou Request Objects para validar os dados vindos do React antes de passá-los ao repositório.

<img width="2664" height="2048" alt="image" src="https://github.com/user-attachments/assets/ca79d1da-3efa-437e-9345-8b82bf0d2e1c" />
