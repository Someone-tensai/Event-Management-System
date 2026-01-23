const bcrypt=require('bcryptjs');

const SALT_ROUNDS=12;

const hash_password=async(password)=>{
    return await bcrypt.hash(password,SALT_ROUNDS);

};

const compare_password=async(password,hash)=>{
    return await bcrypt.compare(password,hash);
};

const generate_reset_token=()=>{
    return require('crypto').randomBytes(32).toString('hex');
};

module.exports={
    hash_password,
    compare_password,
    generate_reset_token
};