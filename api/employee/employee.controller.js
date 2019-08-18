import Employee from './employee.model';

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
    return Employee.find({})
        .exec()
        .then(employees => {
            res.status(200).json(employees);
        })
        .catch(handleError(res));
}

export function create(req, res) {
    const newEmployee = new Employee(req.body);

    return newEmployee.save()
        .then(employee => {
           res.status(201). json(employee);
        })
        .catch(handleError(res));
}

export function show(req, res) {
    return Employee.findById(req.params.id)
        .exec()
        .then(handleEntityNotFound(res))
        .then(handleEntity(res))
        .catch(handleError(res));
}