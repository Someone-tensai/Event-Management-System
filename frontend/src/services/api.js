async function get_all_events() {
    return await fetch("http://localhost:3000/api/events");
}

async function register_user(form_data){
    const data =  await fetch("http://localhost:3000/api/users/register", {
        method:"POST",
        headers:{"Content-type":"application/json",},
        body: JSON.stringify(form_data),
    });
    return data;
}

async function login_user(form_data)
{
    const data = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify(form_data)
    })
    return data;
}
export {
    get_all_events,
    register_user,
    login_user,
};