import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

const employeeSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    role: {
        type: String,
        default: 'employee'
    },
    password: String,
    salt: String,
    joinedCompanyDate: {
        type: Date, 
        default: Date.now
    },
    leftCompanyDate:  {
        type: Date, 
        default: Date.now
    }
});

employeeSchema.methods = {
    authenticate(password, cb) {
        if(!cb) {
            return this.password == this.encrypyPassword(password);
        }

        this.encrypyPassword(password, (err, pwdGen) => {
            if(err) {
                return cb(err);
            }

            if(this.password == pwdGen) {
                return cb(null, true);
            } else {
                return cb(null, false);
            }
        });
    },

    makeSalt(...args) {
        const defaultByteSize = 16;
        let byteSize;
        let cb;

        if(typeof args[0] === 'function') {
            cb = args[0];
            byteSize = defaultByteSize;
        } else if(typeof args[1] === 'function') {
            cb = args[1];
        } else {
            throw new Error('Missing cb');
        }

        if(!byteSize) {
            byteSize = defaultByteSize;
        }

        return crypto.randomBytes(byteSize, (err, salt) => {
            if(err) {
                return cb(err);
            } else {
                cb(null, salt.toString('base64'));
            }
        })
    },

    encrypyPassword(password, cb) {
        if(!password || !this.salt) {
            if(!cb) {
                return null;                
            } else {
                return cb('Missing password or salt');
            }
        }

        const defaultIteration = 10000
        const defaultKeyLength = 64;
        const salt = Buffer.from(this.salt, 'base64');

        if(!cb) {
            return crypto.pbkdf2Sync(password, salt, defaultIteration, defaultKeyLength, 'sha256')
                .toString('base64');
        }

        return crypto.pbkdf2(password, salt, defaultIteration, defaultKeyLength, 'sha256', (err, key) => {
            if(err) {
                return cb(err);
            } else {
                return cb(null, key.toString('base64'));
            }
        });
    }
}

export default mongoose.model('Employee', employeeSchema);