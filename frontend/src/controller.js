/*jshint esversion: 10*/

const APIAccess = {
    updateGroupProfile(groupName, about, picture){
        try{
            return fetch('http://localhost:8000/group/60c13863b069455054d4b224', {
                method: 'PATCH',
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

    /*addGroupMember(gid, _id){
        try{
            return fetch('http://localhost:8000/group/' + gid, { // Group id here
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({userID: _id, groupID: gid}) // member id here
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
    },*/
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

    removeGroupMember(gid, _id){
        try{
            return fetch('http://localhost:8000/group/' + gid + "/" + _id, { // Group id and member id here
                method: 'DELETE'
                //headers: {'Content-Type':'application/json'},
               // body: JSON.stringify({_id: _id}) // member id here
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
    }
};

export default APIAccess;