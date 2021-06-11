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

    createGroupProfile(groupName, about, picture){
        try{
            return fetch('http://localhost:8000/group/', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({name: groupName, about: about, picture: picture})
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
                return {user: jsonRes.name, role: jsonRes.about};
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
        } catch {

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
        } catch {

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
        } catch {

        }
    }

};

export default APIAccess;