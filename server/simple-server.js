// Version minimale pour identifier le problème
console.log('🚀 Démarrage du serveur minimal...');

try {
    const express = require('express');
    console.log('✅ Express chargé');
    
    const cors = require('cors');
    console.log('✅ CORS chargé');
    
    const app = express();
    console.log('✅ App Express créée');
    
    // Configuration CORS
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
    console.log('✅ CORS configuré');
    
    app.use(express.json());
    console.log('✅ Middleware JSON configuré');
    
    // Route simple
    app.get('/health', (req, res) => {
        console.log('📡 Requête sur /health');
        res.json({ status: 'OK', timestamp: new Date().toISOString() });
    });
    
    app.post('/api/users/login', (req, res) => {
        console.log('📨 Requête de connexion reçue');
        console.log('Body:', req.body);
        
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                console.log('❌ Données manquantes');
                return res.status(400).json({
                    success: false,
                    message: "Email et mot de passe requis"
                });
            }
            
            if (email === 'admin@ecoride.fr' && password === 'password') {
                console.log('✅ Connexion réussie pour admin');
                return res.json({
                    success: true,
                    message: "Connexion réussie",
                    data: {
                        token: "test-token-" + Date.now(),
                        user: {
                            id: 1,
                            pseudo: "admin",
                            email: "admin@ecoride.fr",
                            user_type: "admin"
                        }
                    }
                });
            }
            
            console.log('❌ Identifiants invalides pour:', email);
            res.status(400).json({
                success: false,
                message: "Identifiants invalides"
            });
            
        } catch (error) {
            console.error('💥 Erreur dans la route login:', error);
            res.status(500).json({
                success: false,
                message: "Erreur serveur",
                error: error.message
            });
        }
    });
    
    const PORT = 3002;
    
    app.listen(PORT, () => {
        console.log(`🎯 Serveur minimal démarré sur le port ${PORT}`);
        console.log(`📍 Test santé: http://127.0.0.1:${PORT}/health`);
        console.log(`📍 Test login: POST http://127.0.0.1:${PORT}/api/users/login`);
    });
    
} catch (error) {
    console.error('💥 Erreur fatale:', error);
    console.error('Stack:', error.stack);
}