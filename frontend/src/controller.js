/*jshint esversion: 10*/

const APIAccess = {
    signInUser(username, password){
        try{
            fetch('http://localhost:8000/signin', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({username: username, password: password})
            }).then(async (response) => {
                let jsonRes = await response.json();
                console.log(jsonRes);
                if(!jsonRes.success) throw jsonRes.message;
                // if you want to redirect to another page do it here
                window.onload = "/";
            });
        }catch(err){
            throw err;
        }
    }
};

export default APIAccess;