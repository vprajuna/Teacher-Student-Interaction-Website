module.exports = {
    timeout: 100,
    load: {
        before: ["responseTime", "logger", "cors", "responses", "gzip"],
        order: ["proxy", "parser"],
        after: ["router"]
    },
    settings: {
        public: {
            path: './public',
            maxAge: 60000,
        },
        proxy: {
            enabled: true,
            clientPath: './public/client',
        },
        parser: {
            jsonLimit: '10mb'
        },
        gzip: {
            enabled: true,
            options: {
              br: false
            }
        },
        cors: {
            enabled: true,
            origin: ['http://localhost:3000', 'http://localhost:1337']
        },
        // logger: {
        //     // dev + prod
        //     level: debug + info,
        //     requests: true + false
        // }
        
        // dev
    },
}