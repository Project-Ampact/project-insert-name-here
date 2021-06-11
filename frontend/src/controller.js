/*jshint esversion: 10*/

const APIAccess = {
    getGroup(gid){
        try{
            fetch('http://localhost:8000/group/' + gid, )
            .then(async (response) => {
                let jsonRes = await response.json();
                console.log(jsonRes);
             /*   if(!jsonRes.success) {  // Display error message based off jsonRes message if register fails
                    var error = document.getElementById("error-message");
                    error.style.visibility = "visible";
                    console.log(jsonRes.message);
                    error.innerHTML = jsonRes.message + '*';
                }
                if(!jsonRes.success) throw jsonRes.message;*/
                
              /*  var error = document.getElementById("error-message");
                error.style.visibility = "hidden";
                window.location = "/";*/
                // if you want to redirect to another page do it here
                return {name: jsonRes.name, about: jsonRes.about, members: jsonRes.members, picture: jsonRes.picture};
            });
        }catch(err){
            throw err;
        }
    }
};

export default APIAccess;