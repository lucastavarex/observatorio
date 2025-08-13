# Observatório - Aplicação Next.js Containerizada

Este projeto é uma aplicação Next.js 15 containerizada com suporte a Kubernetes para deploy em múltiplos ambientes.

## 🐳 Testando o Dockerfile Localmente

### Pré-requisitos
- Docker instalado e rodando
- Node.js 20+ (para desenvolvimento local)

### 1. Build da Imagem Docker

```bash
# Construir a imagem local
docker build -t observatorio:local .

# Verificar se a imagem foi criada
docker images | grep observatorio
```

### 2. Teste Local da Aplicação

```bash
# Executar o container
docker run -d --name observatorio-test -p 3000:3000 observatorio:local

# Ver logs em tempo real
docker logs -f observatorio-test

# Verificar se está rodando
docker ps | grep observatorio
```

### 3. Acessar a Aplicação

Abra seu navegador e acesse: `http://localhost:3000`

### 4. Comandos Úteis para Debug

```bash
# Ver logs do container
docker logs observatorio-test

# Entrar no container para debug
docker exec -it observatorio-test /bin/sh

# Parar o container
docker stop observatorio-test

# Remover o container
docker rm observatorio-test

# Limpar tudo de uma vez
docker stop observatorio-test && docker rm observatorio-test
```

### 5. Teste Completo (Script)

```bash
#!/bin/bash
echo "🚀 Testando aplicação Observatório..."

# Build
echo "📦 Construindo imagem..."
docker build -t observatorio:local .

# Run
echo "🏃 Executando container..."
docker run -d --name observatorio-test -p 3000:3000 observatorio:local

# Wait
echo "⏳ Aguardando aplicação inicializar..."
sleep 10

# Test
echo "🧪 Testando endpoint..."
curl -f http://localhost:3000 && echo "✅ Aplicação funcionando!" || echo "❌ Erro na aplicação"

# Cleanup
echo "🧹 Limpando..."
docker stop observatorio-test && docker rm observatorio-test

echo "✨ Teste concluído!"
```

## ☸️ Deploy no Kubernetes

### Estrutura dos Manifests

```
k8s/
├── prod/           # Configurações de produção
│   ├── kustomization.yaml
│   └── resources.yaml
└── staging/        # Configurações de staging
    ├── kustomization.yaml
    └── resources.yaml
```

### Configurações por Ambiente

#### Staging (`k8s/staging/`)
- **Tag da imagem**: `ghcr.io/insper/observatorio:latest`
- **Replicas**: 1
- **Porta**: 80 → 3000

#### Produção (`k8s/prod/`)
- **Tag da imagem**: `ghcr.io/insper/observatorio:stable`
- **Replicas**: 1
- **Porta**: 80 → 3000

### Deploy com Kustomize

#### Staging
```bash
# Aplicar configurações de staging
kubectl apply -k k8s/staging/

# Verificar status
kubectl get pods -l app=app
kubectl get services -l app=app
```

#### Produção
```bash
# Aplicar configurações de produção
kubectl apply -k k8s/prod/

# Verificar status
kubectl get pods -l app=app
kubectl get services -l app=app
```

### Verificações Pós-Deploy

```bash
# Ver pods
kubectl get pods

# Ver logs de um pod específico
kubectl logs -l app=app

# Ver serviços
kubectl get services

# Ver deployments
kubectl get deployments

# Descrever recursos para debug
kubectl describe pod -l app=app
kubectl describe service app
```

## 🔐 Configuração de Secrets

A aplicação espera um secret chamado `app-secrets` no Kubernetes. Crie-o antes do deploy:

```bash
# Exemplo de criação de secret (ajuste conforme necessário)
kubectl create secret generic app-secrets \
  --from-literal=NODE_ENV=production \
  --from-literal=DATABASE_URL=your_db_url \
  --from-literal=API_KEY=your_api_key
```

## 🚀 Próximos Passos

### 1. CI/CD Pipeline
- [ ] Configurar GitHub Actions para build automático
- [ ] Push automático para registry (GHCR)
- [ ] Deploy automático nos ambientes

### 2. Monitoramento
- [ ] Adicionar health checks no Dockerfile
- [ ] Configurar liveness/readiness probes no K8s
- [ ] Implementar métricas e logs centralizados

### 3. Infraestrutura
- [ ] Configurar Ingress para roteamento externo
- [ ] Implementar SSL/TLS
- [ ] Configurar backup e disaster recovery

### 4. Segurança
- [ ] Scan de vulnerabilidades na imagem
- [ ] Políticas de segurança do pod
- [ ] Network policies

### 5. Escalabilidade
- [ ] Configurar HPA (Horizontal Pod Autoscaler)
- [ ] Otimizar recursos (CPU/Memory)
- [ ] Implementar cache distribuído

## 🛠️ Troubleshooting

### Problemas Comuns

#### Container não inicia
```bash
# Ver logs detalhados
docker logs observatorio-test

# Verificar se a porta está livre
netstat -tulpn | grep 3000
```

#### Erro de build
```bash
# Limpar cache do Docker
docker system prune -a

# Verificar se o Dockerfile está correto
docker build --no-cache -t observatorio:local .
```

#### Problemas no Kubernetes
```bash
# Ver eventos do cluster
kubectl get events --sort-by='.lastTimestamp'

# Ver logs de todos os pods
kubectl logs -l app=app --all-containers

# Verificar configuração do secret
kubectl describe secret app-secrets
```

## 📚 Recursos Úteis

- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kustomize Documentation](https://kustomize.io/)

## 🤝 Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

**Status**: ✅ Containerizada e pronta para deploy no Kubernetes
**Última atualização**: $(date)
