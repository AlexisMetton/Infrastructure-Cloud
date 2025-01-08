---
icon: square-code
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

# Runbooks

Ce runbook détaille les commandes essentielles et leur usage pour déployer et gérer l'infrastructure du projet sur Google Kubernetes Engine (GKE) avec la supervision de Prometheus.

**1. Mise en place de Kubernetes**

**Initialisation et création de l'infrastructure :**

*   Initialisez Terraform pour préparer le répertoire :

    ```bash
    terraform init
    ```
*   Appliquez le plan Terraform pour créer l'infrastructure, notamment le réseau VPC et le cluster GKE :

    ```bash
    terraform apply
    ```
*   Configurez _kubectl_ pour accéder au cluster GKE :

    ```bash
    gcloud container clusters get-credentials gke-cluster --region europe-west6 --project eternal-trainer-441008-u0
    ```

**2. Déploiement normal**

**Déploiement des applications frontend et backend :**

*   Appliquez les fichiers de déploiement pour le frontend et le backend :

    ```bash
    kubectl apply -f frontend/frontend-deployment.yaml
    kubectl apply -f backend/backendend-deployment.yaml
    ```
*   Vérifiez l'état des déploiements :

    ```bash
    kubectl get deployment
    ```
*   Consultez les services déployés :

    ```bash
    kubectl get services
    ```

**3. Déploiement Canary**

**Mise en place d'un déploiement canary :**

*   Appliquez le déploiement standard du frontend :

    ```bash
    kubectl apply -f frontend/frontend-deployment.yaml
    ```
*   Appliquez le déploiement canary pour une version spécifique du frontend :

    ```bash
    kubectl apply -f frontend/frontend-deployment-canary.yaml
    ```
*   Vérifiez l'état des déploiements et des services :

    ```bash
    kubectl get deployment
    kubectl get services
    ```
*   Testez le service pour identifier la version en cours :

    ```bash
    curl -ks http://`kubectl get svc frontend-service -o=jsonpath="{.status.loadBalancer.ingress[0].ip}"`/version
    ```

**4. Déploiement Blue-Green**

**Mise en place d'un déploiement blue-green :**

*   Appliquez les fichiers de déploiement pour les versions blue et green :

    ```bash
    kubectl apply -f frontend/frontend-deployment-blue.yaml
    kubectl apply -f frontend/frontend-deployment-green.yaml
    ```
*   Appliquez le service pour pointer vers le déploiement blue :

    ```bash
    kubectl apply -f services/frontend-service-blue.yaml
    ```
*   Vérifiez les déploiements et les services :

    ```bash
    kubectl get deployment
    kubectl get services
    ```
*   Testez la version en cours :

    ```bash
    curl -ks http://`kubectl get svc frontend-service -o=jsonpath="{.status.loadBalancer.ingress[0].ip}"`/version
    ```

**5. Déploiement Rolling**

**Mise en place d'un déploiement rolling update :**

*   Appliquez le déploiement rolling pour le frontend :

    ```bash
    kubectl apply -f frontend/frontend-deployment-roling.yaml
    ```
*   Vérifiez l'état des ReplicaSets :

    ```bash
    kubectl get replicasets
    ```
*   Modifiez le déploiement en cours pour ajuster la configuration :

    ```bash
    bkubectl edit deployment frontend-deployment-Rolling
    ```
*   Confirmez l'état après la mise à jour :

    ```bash
    kubectl get replicasets
    ```

**6. Installation et configuration de Prometheus**

**Installation de Prometheus avec Helm :**

*   Créez un namespace dédié au monitoring :

    ```bash
    kubectl create namespace monitoring
    ```
*   Ajoutez le dépôt Helm de Prometheus :

    ```bash
    helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    ```
*   Installez Prometheus dans le namespace _monitoring_ :

    ```bash
    helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace --version 39.6.0
    ```

**Accès à l'interface Prometheus :**

*   Redirigez le port local pour accéder à l'interface Prometheus :

    ```bash
    kubectl port-forward svc/prometheus-kube-prometheus-prometheus -n monitoring 9090:9090
    ```

**Vérification de l'installation :**

*   Consultez l'état des pods dans le namespace _monitoring_ :

    ```bash
    kubectl get pods -n monitoring -o wide
    ```
