import path from 'path';

export default function(app) {
    app.use('/api/employee', require('./api/employee'));
    app.use('/api/company', require('./api/company'));
}