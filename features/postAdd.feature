Feature: Ajout de posts

@AjoutPost
Scenario: Ajouter un nouveau post
  Given je suis sur la page d acceuil
  When je clique sur add
  And je saisis le titre "New post"
  And je saisis le contexte "le contenu du post"
  And je clique sur save
  Then le post sera créé avec le titre "New post"

  @AjoutPostErreurPostSansTitre
  Scenario: Échec de l'ajout d'un post sans titre
    Given je suis sur la page d acceuil
    When je clique sur add
    And je saisis le contexte "le contenu du post"
    And je clique sur save
    Then un message d erreur s affiche