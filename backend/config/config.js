require('dotenv').config();

module.exports={
    //server
    port: process.env.PORT || 3000,

    //database
    db:{
        host: process.env.DB_HOST ||'localhost',
        port: process.env.DB_PORT || 5432,
        name: process.env.DB_NAME || 'event_management_system',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
    },
    
    //jwt
    jwt:{
        secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
        expiresIn: process.env.JWT_EXPIRES_IN || '365d'
    },

    //cors
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

    //email
    email: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        password: process.env.SMTP_PASSWORD,
        from: process.env.EMAIL_FROM
    },

    //validation
    allowedEmailDomains: (process.env.ALLOWED_EMAIL_DOMAINS || '').split(',').filter(Boolean),

    //club thresholds

    clubThresholds:{
        physical: parseInt(process.env.CLUB_THRESHOLD_PHYSICAL) || 10,
        online: parseInt(process.env.CLUB_THRESHOLD_ONLINE) || 5,
        hybrid: parseInt(process.env.CLUB_THRESHOLD_HYBRID) || 10,

    },

    //file uploads
    upload: {
        maxSize: parseInt(process.env.UPLOAD_MAX_SIZE) || 5 * 1024 * 1024, // 5MB
        PATH: process.env.UPLOAD_PATH || 'uploads/'
    }

};