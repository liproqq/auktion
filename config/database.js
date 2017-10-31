exports.database = process.env.DATABASE || 'mongodb://localhost:27017/auktion' + (process.env.NODE_ENV === 'test' ? '_test' : '');

exports.secret = process.env.SECRET || 'yoursecret';
