/*jshint esversion: 10*/

const APIAccess = {
    registerUser(username, password, role){
        try{
            fetch('http://localhost:8000/signup', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({username: username, password: password, role: role})
            }).then(async (response) => {
                let jsonRes = await response.json();
                console.log(jsonRes);
                if(!jsonRes.success) throw jsonRes.message;
                // if you want to redirect to another page do it here
                return {user: jsonRes.username, role: jsonRes.role};
            });
        }catch(err){
            throw err;
        }
    }
};

export default APIAccess;