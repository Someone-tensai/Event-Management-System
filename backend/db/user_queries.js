const pool=require('../db');


const finddByEmail= async(emmail)=>{
    const result = await pool.query(
        'SELECT * FROM Users WHERE email=$1',
        [email.toLowerCase()]
    
    );
    return result.rows[0] || null;
};

const findById =async(ser_id)=>{
    const result=await pool.query(
        'SELECT user_id,username,email,role,created_at FROM Users WHERE user_id=$1',
        [user_id]
    );
    return
    
}