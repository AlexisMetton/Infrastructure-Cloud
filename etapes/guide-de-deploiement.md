---
icon: paper-plane
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

# Guide de déploiement

**1. Configuration de l'environnement**

Avant de commencer, il est important de s'assurer que l'environnement est correctement configuré. Cette étape comprend l'initialisation de l'outil _gcloud_ pour le projet et la vérification de l'authentification.

**Commandes à exécuter :**

```bash
gcloud auth login
```

Ces commandes permettent de sélectionner le projet GCP, de s'assurer que l'utilisateur est authentifié et que toutes les actions futures seront effectuées sur le bon projet.

**2. Création de l'infrastructure**

Pour la création de l'infrastructure, Terraform est utilisé pour gérer les ressources de manière déclarative. Le fichier _main.tf_ doit contenir les définitions des ressources, notamment le réseau et le cluster GKE.

**Exemple de configuration de l'infrastructure avec Terraform :**

```hcl
provider "google" {
  project = "nom-du-projet"
  region  = "europe-west6"
  zone    = "europe-west6-b"
}

resource "google_compute_network" "vpc_network" {
  name                    = "terraform-network"
  auto_create_subnetworks = true
}

resource "google_container_cluster" "primary" {
  name     = "gke-cluster"
  location = "europe-west6"
  network  = google_compute_network.vpc_network.name

  node_config {
    machine_type = "e2-micro"
    disk_size_gb = 30
  }
}
```

**Instructions :**

1. Exécuter _terraform init_ pour initialiser le répertoire Terraform.
2. Lancer _terraform apply_ pour créer les ressources sur GCP.

**3. Déploiement des applications**

Les applications (frontend et backend) sont déployées sur le cluster GKE à l'aide de manifestes Kubernetes.

**Commande d'application des fichiers de déploiement :**

```bash
kubectl apply -f frontend-deployment.yaml
kubectl apply -f backend-deployment.yaml
```

**Exemple de fichier YAML pour un déploiement :**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: myapp/frontend:latest
          ports:
            - containerPort: 80
```

**4. Configuration du monitoring avec Prometheus**

L'installation de Prometheus est essentielle pour la surveillance des applications et de l'infrastructure.

**Étapes d'installation de Prometheus avec Helm :**

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
```

**Explications :**

* _helm repo add_ ajoute le dépôt de Prometheus à la liste des dépôts locaux.
* _helm install_ installe la stack Prometheus dans le namespace _monitoring_.

**Configurer des métriques et alertes :** Pour suivre les métriques et configurer des alertes, ajoutez des annotations aux services pour que Prometheus puisse les scrapper.

**Exemple d'annotations sur un service :**

```yaml
metadata:
  annotations:
    prometheus.io/scrape: "true"
    prometheus.io/port: "3001"
    prometheus.io/path: "/metrics"
```

Ensuite, configurez les alertes en utilisant l'interface Prometheus ou la console de Google Cloud pour définir des seuils et des notifications.

**Types d'alertes possibles :**

* **Erreur de niveau critique** : alertes déclenchées pour des erreurs sévères (_severity=ERROR_).
* **Utilisation élevée de ressources** : alertes basées sur des métriques de CPU ou de mémoire.

**Configuration d'alertes et interface Prometheus**

<div><figure><img src="../.gitbook/assets/Capture d&#x27;écran 2024-11-08 112341.png" alt=""><figcaption></figcaption></figure> <figure><img src="../.gitbook/assets/Capture d&#x27;écran 2024-11-08 173214.png" alt=""><figcaption></figcaption></figure></div>

