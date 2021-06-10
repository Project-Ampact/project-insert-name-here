/*jshint esversion: 10*/
const APIAccess = {
    
    //use this to check the current user logged into the database
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
    }
};

export default APIAccess;