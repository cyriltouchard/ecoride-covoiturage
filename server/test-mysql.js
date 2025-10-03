// Test de connexion MySQL pour EcoRide
require('dotenv').config();
const mysql = require('mysql2/promise');

async function testMySQLConnection() {
    try {
        console.log('🔄 Test de connexion MySQL...');
        
        // Test de connexion sans base spécifique
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            port: process.env.DB_PORT || 3306
        });
        
        console.log('✅ Connexion MySQL réussie !');
        
        // Création de la base si elle n'existe pas
        await connection.execute('CREATE DATABASE IF NOT EXISTS ecoride_sql CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
        console.log('✅ Base de données ecoride_sql créée/vérifiée');
        
        // Sélection de la base
        await connection.query('USE ecoride_sql');
        
        // Test simple de fonctionnement
        const [testResult] = await connection.query('SELECT 1 as test');
        console.log('📋 Base de données opérationnelle :', testResult[0].test === 1 ? 'OK' : 'Erreur');
        
        await connection.end();
        
        // Test avec pool de connexions (configuration finale)
        const pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: 'ecoride_sql',
            port: process.env.DB_PORT || 3306,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        
        const [result] = await pool.query('SELECT "Pool MySQL opérationnel" as message');
        console.log('✅ Pool MySQL configuré:', result[0].message);
        
        await pool.end();
        
    } catch (error) {
        console.error('❌ Erreur MySQL:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 Solution: Assurez-vous que MySQL/MariaDB est démarré');
            console.log('   - Windows: Démarrer le service MySQL');
            console.log('   - XAMPP: Démarrer MySQL depuis le panneau de contrôle');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('💡 Solution: Vérifiez les identifiants dans le fichier .env');
        }
    }
}

// Exécution du test
testMySQLConnection();