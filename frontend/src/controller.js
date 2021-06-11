/*jshint esversion: 10*/

const APIAccess = {
    registerUser(username, password, role){
        try{
            return fetch('http://localhost:8000/signup', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({username: username, password: password, role: role})
            }).then(async (response) => {
                let jsonRes = await response.json();
                console.log(jsonRes);
                if(!jsonRes.success) {  // Display error message based off jsonRes message if register fails
                    var error = document.getElementById("error-message");
                    error.style.visibility = "visible";
                    console.log(jsonRes.message);
                    error.innerHTML = jsonRes.message + '*';
                }
                if(!jsonRes.success) throw jsonRes.message;
                
                var error = document.getElementById("error-message");
                error.style.visibility = "hidden";
                return {user: jsonRes.username, role: jsonRes.role};
            });
        }catch(err){
            throw err;
        }
    }
};

export default APIAccess;