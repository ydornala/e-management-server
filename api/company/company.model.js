import mongoose, { Schema } from 'mongoose';

const companySchema = new Schema({
    name: String,
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }]
});

export default mongoose.model('Company', companySchema);