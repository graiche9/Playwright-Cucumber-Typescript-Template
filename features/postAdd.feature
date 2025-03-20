Feature: Ajout de posts

@AjoutPost
Scenario Outline: Ajouter un nouveau post
  Given je suis sur la page d acceuil et sur l environnement "<env>" et je saisis "<username>" et "<password>"
  When je clique sur add
  And je saisis le titre "randomTitle"
  And je saisis le contexte "randomContent"
  And je clique sur save
  Then le post sera créé avec le titre "randomTitle"
  
  @int
    Examples:
      | username              | password     | env                             |
      | testeur_integration   | testeur_qa   | http://int.siteinfos.com/admin/ |
      | testeur_integration_2 | testeur_qa_2 | http://int.siteinfos.com/admin/ |

    @rec
    Examples:
      | env                             | username          | password     |
      | http://192.168.1.95:9092/admin/ | testeur_recette   | testeur_qa_3 |
      | http://192.168.1.95:9092/admin/ | testeur_recette_2 | testeur_qa_4 |

  @AjoutPostErreurPostSansTitre
  Scenario Outline: Échec de l'ajout d'un post sans titre
    Given je suis sur la page d acceuil et sur l environnement "<env>" et je saisis "<username>" et "<password>"
    When je clique sur add
    And je saisis le contexte "le contenu du post"
    And je clique sur save
    Then un message d erreur s affiche 

    @int
    Examples:
      | username              | password     | env                             |
      | testeur_integration   | testeur_qa   | http://int.siteinfos.com/admin/ |
      | testeur_integration_2 | testeur_qa_2 | http://int.siteinfos.com/admin/ |

    @rec
    Examples:
      | env                             | username          | password     |
      | http://192.168.1.95:9092/admin/ | testeur_recette   | testeur_qa_3 |
      | http://192.168.1.95:9092/admin/ | testeur_recette_2 | testeur_qa_4 |