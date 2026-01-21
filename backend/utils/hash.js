const bcyrpt=require('bcryptjs');

const SALT_ROUNDS=12;

const hashPassword=async(password)=>{
    return await bcrypt.hash(password,SALT_ROUNDS);

};

const comparePassword=async(password,hash)=>{
    return await bcrypt.compare(password,hash);
};

const generateResetToken=()=>{
    return require('crypto').randomBytes(32).toString('hex');
};

module.exports={
    hashPassword,
    comparePassword,
    generateResetToken
};