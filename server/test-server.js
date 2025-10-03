// Test simple du serveur
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware basique
app.use(cors({
    origin: [
        'http://127.0.0.1:5500',
        'http://localhost:5500',
        'http://127.0.0.1:5501',
        'http://localhost:5501',
        'http://127.0.0.1:5502',
        'http://localhost:5502'
    ],
    credentials: true
}));
app.use(express.json());

// Route de test simple
app.post('/api/users/login', (req, res) => {
    console.log('📨 Requête reçue:', req.body);
    
    const { email, password } = req.body;
    
    if (!email || !password) {
        console.log('❌ Données manquantes');
        return res.status(400).json({
            success: false,
            message: "Email et mot de passe requis"
        });
    }
    
    if (email === 'admin@ecoride.fr' && password === 'password') {
        console.log('✅ Connexion réussie');
        return res.json({
            success: true,
            message: "Connexion réussie",
            data: {
                token: "test-token-123",
                user: {
                    id: 1,
                    pseudo: "admin",
                    email: "admin@ecoride.fr",
                    user_type: "admin"
                }
            }
        });
    }
    
    console.log('❌ Identifiants invalides');
    res.status(400).json({
        success: false,
        message: "Identifiants invalides"
    });
});

// Route de santé
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`🚀 Serveur de test démarré sur le port ${PORT}`);
    console.log(`📍 Test: http://127.0.0.1:${PORT}/health`);
});