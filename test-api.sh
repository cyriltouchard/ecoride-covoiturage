#!/bin/bash

echo "🔄 Test API EcoRide - Connexion Admin"
echo "================================="
echo ""

echo "📡 Test 1: Ping du serveur"
curl -s -o /dev/null -w "Status: %{http_code}\n" http://127.0.0.1:3002
echo ""

echo "📡 Test 2: Connexion avec admin@ecoride.fr"
echo "Données envoyées: {\"email\":\"admin@ecoride.fr\",\"password\":\"password\"}"
echo ""

response=$(curl -s -w "HTTPSTATUS:%{http_code}" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ecoride.fr","password":"password"}' \
  http://127.0.0.1:3002/api/users/login)

# Séparer le body et le status code
http_code=$(echo "$response" | grep -o "HTTPSTATUS:[0-9]*" | cut -d: -f2)
body=$(echo "$response" | sed 's/HTTPSTATUS:[0-9]*$//')

echo "📊 Status HTTP: $http_code"
echo "📦 Réponse complète:"
echo "$body" | jq . 2>/dev/null || echo "$body"
echo ""

if [ "$http_code" -eq 200 ]; then
    echo "✅ SUCCÈS: Connexion réussie!"
elif [ "$http_code" -eq 400 ]; then
    echo "❌ ERREUR 400: Bad Request - Vérifier les données ou la validation"
elif [ "$http_code" -eq 404 ]; then
    echo "❌ ERREUR 404: Route non trouvée"
elif [ "$http_code" -eq 500 ]; then
    echo "❌ ERREUR 500: Erreur serveur"
else
    echo "⚠️ STATUT INATTENDU: $http_code"
fi