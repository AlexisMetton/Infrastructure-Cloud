---
icon: webhook
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Schéma d'infrastructure

## Structure du projet

Ce schéma illustre la structure interne d'un déploiement Kubernetes. Le cluster est représenté comme l'enveloppe extérieure jaune qui contient plusieurs nœuds (orange), chacun comprenant des pods (violet) qui hébergent les applications conteneurisées (vert). Au centre de ce système se trouve le Master, responsable de la gestion du cluster, tandis que les services (points en gris) assurent la communication entre les composants.

\


<figure><img src="broken-reference" alt=""><figcaption></figcaption></figure>



