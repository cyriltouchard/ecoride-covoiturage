// audit-auto.js - Script d'audit automatisé pour EcoRide
const fs = require('fs');
const path = require('path');

class EcoRideAuditor {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.fixes = [];
        this.basePath = __dirname;
    }

    // Audit principal
    async runFullAudit() {
        console.log('🔍 AUDIT AUTOMATISÉ ECORIDE - DÉMARRAGE');
        console.log('='.repeat(50));

        try {
            await this.auditStructure();
            await this.auditConfiguration();
            await this.auditDatabase();
            await this.auditAPI();
            await this.auditSecurity();
            await this.auditFrontend();
            
            this.generateReport();
        } catch (error) {
            console.error('❌ Erreur durant l\'audit:', error);
        }
    }

    // 1. Audit de la structure
    async auditStructure() {
        console.log('\n📁 Audit de la structure du projet...');
        
        const requiredFiles = [
            'server/package.json',
            'server/server.js',
            'server/.env',
            'server/init-db.js',
            'public/js/script.js',
            'public/css/style.css',
            'index.html',
            'espace-chauffeur.html'
        ];

        const requiredDirectories = [
            'server/models',
            'server/controllers',
            'server/routes',
            'server/middleware',
            'server/config',
            'public/js',
            'public/css',
            'public/images'
        ];

        // Vérifier fichiers requis
        for (const file of requiredFiles) {
            const fullPath = path.join(this.basePath, '..', file);
            if (!fs.existsSync(fullPath)) {
                this.errors.push(`Fichier manquant: ${file}`);
            } else {
                console.log(`✅ ${file}`);
            }
        }

        // Vérifier répertoires requis
        for (const dir of requiredDirectories) {
            const fullPath = path.join(this.basePath, '..', dir);
            if (!fs.existsSync(fullPath)) {
                this.errors.push(`Répertoire manquant: ${dir}`);
            } else {
                console.log(`✅ ${dir}/`);
            }
        }
    }

    // 2. Audit de configuration
    async auditConfiguration() {
        console.log('\n⚙️ Audit de la configuration...');
        
        try {
            // Vérifier .env
            const envPath = path.join(this.basePath, '.env');
            if (fs.existsSync(envPath)) {
                const envContent = fs.readFileSync(envPath, 'utf8');
                const requiredEnvVars = ['PORT', 'MONGO_URI', 'JWT_SECRET', 'DB_HOST', 'DB_USER', 'DB_NAME'];
                
                for (const envVar of requiredEnvVars) {
                    if (!envContent.includes(envVar)) {
                        this.errors.push(`Variable d'environnement manquante: ${envVar}`);
                    } else {
                        console.log(`✅ Variable ${envVar} présente`);
                    }
                }
            }

            // Vérifier package.json
            const packagePath = path.join(this.basePath, 'package.json');
            if (fs.existsSync(packagePath)) {
                const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
                const requiredDeps = ['express', 'mongoose', 'mysql2', 'jsonwebtoken', 'bcryptjs', 'cors', 'helmet'];
                
                for (const dep of requiredDeps) {
                    if (!packageJson.dependencies || !packageJson.dependencies[dep]) {
                        this.errors.push(`Dépendance manquante: ${dep}`);
                    } else {
                        console.log(`✅ Dépendance ${dep} présente`);
                    }
                }
            }

        } catch (error) {
            this.errors.push(`Erreur audit configuration: ${error.message}`);
        }
    }

    // 3. Audit base de données
    async auditDatabase() {
        console.log('\n🗄️ Audit de la base de données...');
        
        try {
            const initDbPath = path.join(this.basePath, 'init-db.js');
            if (fs.existsSync(initDbPath)) {
                const initDbContent = fs.readFileSync(initDbPath, 'utf8');
                const requiredTables = ['users', 'vehicles', 'rides', 'user_credits', 'credit_transactions', 'driver_preferences'];
                
                for (const table of requiredTables) {
                    if (!initDbContent.includes(`CREATE TABLE IF NOT EXISTS ${table}`)) {
                        this.errors.push(`Table manquante dans init-db.js: ${table}`);
                    } else {
                        console.log(`✅ Table ${table} définie`);
                    }
                }
            }
        } catch (error) {
            this.errors.push(`Erreur audit database: ${error.message}`);
        }
    }

    // 4. Audit API
    async auditAPI() {
        console.log('\n🔌 Audit de l\'API...');
        
        const routeFiles = [
            'routes/userRoutes.js',
            'routes/vehicleRoutes.js', 
            'routes/rideRoutes.js',
            'routes/creditRoutes.js'
        ];

        for (const routeFile of routeFiles) {
            const fullPath = path.join(this.basePath, routeFile);
            if (fs.existsSync(fullPath)) {
                const content = fs.readFileSync(fullPath, 'utf8');
                
                // Vérifier l'importation du middleware d'auth
                if (!content.includes('require(\'../middleware/auth\')')) {
                    this.warnings.push(`${routeFile}: Middleware d'auth possiblement manquant`);
                } else {
                    console.log(`✅ ${routeFile}: Middleware d'auth présent`);
                }

                // Vérifier les exports
                if (!content.includes('module.exports')) {
                    this.errors.push(`${routeFile}: Manque module.exports`);
                } else {
                    console.log(`✅ ${routeFile}: Export présent`);
                }
            }
        }
    }

    // 5. Audit sécurité
    async auditSecurity() {
        console.log('\n🔒 Audit de sécurité...');
        
        try {
            const serverPath = path.join(this.basePath, 'server.js');
            if (fs.existsSync(serverPath)) {
                const serverContent = fs.readFileSync(serverPath, 'utf8');
                
                const securityChecks = [
                    { check: 'helmet', desc: 'Middleware Helmet pour sécurité headers' },
                    { check: 'cors', desc: 'Configuration CORS' },
                    { check: 'express.json', desc: 'Limitation taille JSON' },
                    { check: 'JWT_SECRET', desc: 'Secret JWT sécurisé' }
                ];

                for (const security of securityChecks) {
                    if (!serverContent.includes(security.check)) {
                        this.warnings.push(`Sécurité: ${security.desc} possiblement manquant`);
                    } else {
                        console.log(`✅ ${security.desc}`);
                    }
                }
            }

            // Vérifier middleware d'authentification
            const authPath = path.join(this.basePath, 'middleware/auth.js');
            if (fs.existsSync(authPath)) {
                const authContent = fs.readFileSync(authPath, 'utf8');
                
                if (authContent.includes('authenticateToken') && authContent.includes('requireRole')) {
                    console.log('✅ Middleware d\'authentification complet');
                } else {
                    this.errors.push('Middleware d\'authentification incomplet');
                }
            }

        } catch (error) {
            this.errors.push(`Erreur audit sécurité: ${error.message}`);
        }
    }

    // 6. Audit frontend
    async auditFrontend() {
        console.log('\n🖥️ Audit du frontend...');
        
        const htmlFiles = [
            '../index.html',
            '../espace-chauffeur.html',
            '../espace-utilisateur.html',
            '../covoiturages.html'
        ];

        for (const htmlFile of htmlFiles) {
            const fullPath = path.join(this.basePath, htmlFile);
            if (fs.existsSync(fullPath)) {
                const content = fs.readFileSync(fullPath, 'utf8');
                
                // Vérifier inclusion des scripts essentiels
                if (!content.includes('public/js/script.js')) {
                    this.warnings.push(`${htmlFile}: Script principal possiblement manquant`);
                }
                
                // Vérifier inclusion du CSS
                if (!content.includes('public/css/style.css')) {
                    this.warnings.push(`${htmlFile}: CSS principal possiblement manquant`);
                }

                console.log(`✅ ${htmlFile} analysé`);
            }
        }

        // Vérifier script.js principal
        const scriptPath = path.join(this.basePath, '../public/js/script.js');
        if (fs.existsSync(scriptPath)) {
            const scriptContent = fs.readFileSync(scriptPath, 'utf8');
            
            // Vérifier cohérence des URLs
            const urlsFound = scriptContent.match(/http:\/\/[\w\.:\d\/]+/g) || [];
            const uniqueUrls = [...new Set(urlsFound)];
            
            if (uniqueUrls.length > 1) {
                this.warnings.push(`URLs incohérentes détectées: ${uniqueUrls.join(', ')}`);
            } else {
                console.log('✅ URLs cohérentes dans script.js');
            }
        }
    }

    // Génération du rapport
    generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 RAPPORT D\'AUDIT COMPLET');
        console.log('='.repeat(60));

        console.log(`\n🔍 Résumé:`);
        console.log(`   • Erreurs critiques: ${this.errors.length}`);
        console.log(`   • Avertissements: ${this.warnings.length}`);
        console.log(`   • Corrections appliquées: ${this.fixes.length}`);

        if (this.errors.length > 0) {
            console.log('\n❌ ERREURS CRITIQUES:');
            this.errors.forEach((error, index) => {
                console.log(`   ${index + 1}. ${error}`);
            });
        }

        if (this.warnings.length > 0) {
            console.log('\n⚠️ AVERTISSEMENTS:');
            this.warnings.forEach((warning, index) => {
                console.log(`   ${index + 1}. ${warning}`);
            });
        }

        if (this.fixes.length > 0) {
            console.log('\n🔧 CORRECTIONS APPLIQUÉES:');
            this.fixes.forEach((fix, index) => {
                console.log(`   ${index + 1}. ${fix}`);
            });
        }

        // Score global
        const totalIssues = this.errors.length + this.warnings.length;
        const score = Math.max(0, 100 - (this.errors.length * 10) - (this.warnings.length * 2));
        
        console.log(`\n🏆 SCORE GLOBAL: ${score}/100`);
        
        if (score >= 90) {
            console.log('✅ EXCELLENT - Projet prêt pour production');
        } else if (score >= 75) {
            console.log('✅ BIEN - Quelques améliorations recommandées');
        } else if (score >= 60) {
            console.log('⚠️ MOYEN - Corrections nécessaires');
        } else {
            console.log('❌ CRITIQUE - Corrections urgentes requises');
        }

        console.log('\n' + '='.repeat(60));
    }
}

// Exécution si appelé directement
if (require.main === module) {
    const auditor = new EcoRideAuditor();
    auditor.runFullAudit().catch(console.error);
}

module.exports = EcoRideAuditor;