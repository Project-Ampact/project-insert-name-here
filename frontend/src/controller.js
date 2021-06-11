/*jshint esversion: 10*/

const APIAccess = {

    currentUser(){
        var username = document.cookie.split("username=")[1];
        if(!username) return "";
        if (username.length === 0) return "";
        return username;
    },

    //sign in user
    signInUser(username, password){
        try{
            fetch('http://localhost:8000/signin', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({username: username, password: password})
            }).then(async (response) => {
                let jsonRes = await response.json();
                if(!jsonRes.success) {
                    throw jsonRes.message;
                }
                window.location = "/";
            });
        } catch(err){
            throw err;
        }
    },

    registerUser(username, password, role){
        try{
            return fetch('http://localhost:8000/signup', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({username: username, password: password, role: role})
            }).then(async (response) => {
                let jsonRes = await response.json();
                console.log(jsonRes);
                var error = document.getElementById("error-message");
                if (!jsonRes.success) {  // Display error message based off jsonRes message if register fails
                    error.style.visibility = "visible";
                    console.log(jsonRes.message);
                    error.innerHTML = jsonRes.message + '*';
                    throw jsonRes.message;
                }
                
                error.style.visibility = "hidden";
                return {user: jsonRes.username, role: jsonRes.role};
            });
        }catch(err){
            throw err;
        }
    }
};

export default APIAccess;