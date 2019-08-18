import Company from './company.model';

const handleError = (res, statusCode) => {
    statusCode = statusCode || 500;
    return function(error) {
        return res.status(statusCode).json(error);
    }
}

const handleEntityNotFound = (res) => {
    return (entity) => {
        if(!entity) {
            res.status(404).end();
            return null;
        }

        return entity;
    }
}

const handleEntity = (res) => {
    statusCode = statusCode || 200;
    return (entity) => {
        if(entity) {
            return res.status(statusCode).json(entity);
        }

        return null;
    }
}

export function index(req, res) {
    return Company.find({})
        .exec()
        .then(companies => {
            res.status(200).json(companies);
        })
        .catch(handleError(res));
}

export function create(req, res) {
    const newCompany = new Company(req.body);
    return newCompany.save()
        .then(company => {
            res.status(201).json(company);
        })
        .catch(handleError(res));
}

export function show(res, req) {
    return Company.findById(req.params.id)
        .exec()
        .then(handleEntityNotFound(res))
        .then(handleEntity(res))
        .catch(handleError(res));
}