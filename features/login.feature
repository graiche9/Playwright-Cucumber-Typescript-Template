@login
Feature: Login

  @positif
  Scenario Outline: Connexion reussie
    Given Je navigue vers "<env>"
    When Je saisis l'identifiant "<username>" dans le champs username
    And Je saisis le mot de passe "<password>" dans le champs password
    And Je clique sur le bouton de login
    Then Je suis redirige vers la page d acceuil

    @int
    Examples:
      | env                             | username              | password     |
      | http://192.168.1.95:9091/admin/ | testeur_integration   | testeur_qa   |
      | http://192.168.1.95:9091/admin/ | testeur_integration_2 | testeur_qa_2 |

    @rec
    Examples:
      | env                             | username          | password     |
      | http://192.168.1.95:9092/admin/ | testeur_recette   | testeur_qa_3 |
      | http://192.168.1.95:9092/admin/ | testeur_recette_2 | testeur_qa_4 |

  @negatif
  Scenario Outline: Failled connexion
    Given Je navigue vers "<env>"
    When Je saisis l'identifiant "<username>" dans le champs username
    And Je saisis le mot de passe "<password>" dans le champs password
    And Je clique sur le bouton de login
    Then un message d erreur de connexion s affiche

    @int
    Examples:
      | env                             | username                   | password          |
      | http://int.siteinfos.com/admin/ | testeur_integration_faux   | testeur_qa        |
      | http://int.siteinfos.com/admin/ | testeur_integration_2_faux | testeur_qa_2      |
      | http://int.siteinfos.com/admin/ | testeur_integration_faux   | testeur_qa        |
      | http://int.siteinfos.com/admin/ | testeur_integration_2      | testeur_qa_2_faux |

    @rec
    Examples:
      | env                             | username               | password          |
      | http://rec.siteinfos.com/admin/ | testeur_recette_faux   | testeur_qa_3      |
      | http://rec.siteinfos.com/admin/ | testeur_recette_2_faux | testeur_qa_4      |
      | http://rec.siteinfos.com/admin/ | testeur_recette_faux   | testeur_qa_3      |
      | http://rec.siteinfos.com/admin/ | testeur_recette_2      | testeur_qa_4_faux |
