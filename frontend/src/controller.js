/*jshint esversion: 10*/

const APIAccess = {
    updateGroupProfile(group, groupName, about, picture){
        try{
            return fetch('http://localhost:8000/group/' + group, {
                method: 'PATCH',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({name: groupName, about: about, picture: picture})
            }).then(async (response) => {
                let jsonRes = await response.json();
                console.log(jsonRes);
               
                if(!jsonRes.success) throw jsonRes.message;
                
                var error = document.getElementById("error-message");
                error.style.visibility = "hidden";
                return {name: jsonRes.name, about: jsonRes.about};
            });
        }catch(err){
            throw err;
        }
    },

    currentUser(){
        var username = document.cookie.split("username=")[1];
        if(!username) return "";
        if (username.length === 0) return "";
        return username;
    },

    //sign in user
    signInUser(username, password){
        try{
            return fetch('http://localhost:8000/signin', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({username: username, password: password})
            }).then(async (response) => {
                let jsonRes = await response.json();
                var error = document.getElementById("error-message");
                if(!jsonRes.success) {
                    error.style.visibility = "visible";
                    console.log(jsonRes.message);
                    error.innerHTML = jsonRes.message + '*';
                    throw jsonRes.message;
                }
                // TODO server needs to return back role
                return {user: username, role: 'partner'};
            });
        } catch(err){
            throw err;
        }
    },

    createGroupProfile(groupName, about, picture){
        try{
            return fetch('http://localhost:8000/group/', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({name: groupName, about: about, picture: picture})
            }).then(async (response) => {
                let jsonRes = await response.json();
                console.log(jsonRes);
                var error = document.getElementById("error-message");
                if(!jsonRes.success) {  // Display error message based off jsonRes message if register fails
                    error.style.visibility = "visible";
                    console.log(jsonRes.message);
                    error.innerHTML = jsonRes.message + '*';
                    throw jsonRes.message;
                }
                
                error.style.visibility = "hidden";
                return {user: jsonRes.name, role: jsonRes.about};
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
    },

    addMember(group, member) {
        try{
            fetch('http://localhost:8000/group/add/' + group, {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({userID: member})
            })
            .then(async (response) => {
                let jsonRes = await response.json();
                console.log(jsonRes);
                return "Success";
            });
        } catch(err) {
            throw err;
        }
    },

    removeMember(group, member){
        try{
            fetch('http://localhost:8000/group/delete/' + group + '/' + member, {
                method: 'DELETE',
                credentials: 'include',
            })
            .then(async (response) => {
                let jsonRes = await response.json();
                console.log(jsonRes);
                return "Success";
            });
        } catch(err) {
            throw err;
        }
    },

    deleteGroup(group){
        try{
            fetch('http://localhost:8000/group/delete/' + group, {
                method: 'DELETE',
                credentials: 'include',
            })
            .then(async (response) => {
                let jsonRes = await response.json();
                console.log(jsonRes);
                return "Success";
            });
        } catch(err) {
            throw err;
        }
    },

    getUserProfile(uid) {
        try {
            return fetch("http://localhost:8000/profile/" + uid, {
                method: 'GET',
                credentials: 'include',
            })
            .then(async (response) => {
                let jsonRes = await response.json()
                console.log(jsonRes)
                return jsonRes
            })
        } catch(err) {
            throw err;
        }
    },
    searchGroup(query, page) {
        try {
            return fetch(`http://localhost:8000/search/group?searchString=${query}&page=${page}`, {
                method: 'GET'
            })
            .then(async (response) => {
                let jsonRes = await response.json()
                console.log(jsonRes)
                return jsonRes
            })
        } catch(err) {
            throw err;
        }
    }
};

export default APIAccess;