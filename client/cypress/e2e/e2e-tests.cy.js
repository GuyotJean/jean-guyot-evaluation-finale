// cypress/e2e/tasks-e2e.cy.js
describe("Connexion et affichage des tâches", () => {
  const baseUrl = "http://localhost:5173";
  const userEmail = "test@example.com";
  const userPassword = "1234";

  it("Se connecte, affiche les tâches et ajoute une nouvelle tâche", () => {
    // 1️⃣ Ouvre la page de login
    cy.visit(`${baseUrl}/login`);

    // 2️⃣ Remplit le formulaire
    cy.get('[data-cy=email]').type(userEmail);
    cy.get('[data-cy=password]').type(userPassword);

    // 3️⃣ Soumet le formulaire
    cy.get('[data-cy=submit]').click();

    // 4️⃣ Vérifie la redirection vers /tasks
    cy.url().should("include", "/tasks");

    // 5️⃣ Vérifie qu'au moins une tâche existante est affichée
    cy.get('[data-cy=task-item]').should("exist").and("have.length.greaterThan", 0);

    // 6️⃣ Ajoute une nouvelle tâche
    const newTask = "Tâche Cypress Test";
    cy.get('[data-cy=new-task-input]').type(newTask);
    cy.get('[data-cy=add-task-btn]').click();

    // 7️⃣ Vérifie que la nouvelle tâche apparaît dans la liste
    cy.get('[data-cy=task-item]').contains(newTask).should("exist");
  });
});
