/*jshint esversion: 10*/

const APIAccess = {
    updateGroupProfile(group, groupName, about, picture){
        try{
            return fetch('http://localhost:8000/group/' + group, {
                method: 'PATCH',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({name: groupName, about: about, picture: picture}),
                credentials: 'include',
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
                return {user: username, role: document.cookie.split('user=')[1].split('%20')[1]};
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
                body: JSON.stringify({name: groupName, about: about, picture: picture}),
                credentials: 'include',
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

    createNewDlbs(title, dueDate, totalMarks, description){
        try{
            return fetch('http://localhost:8000/assignment/', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({title: title, dueDate: dueDate, totalMarks:totalMarks, description: description}),
                credentials: 'include',
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
    createNewSubmission(fileData){
        try{
            return fetch('http://localhost:8000/assignment/submission', {
                method: 'PUT',
                body: fileData,
                credentials: 'include',
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
    uploadNewVideo(title, videoLink, picture, tag, description, poster){
        try{
            return fetch('http://localhost:8000/video/', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({title: title, url: videoLink, picture: picture, tags: tag, description: description, poster: poster}),
                credentials: 'include',
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
                body: JSON.stringify({username: username, password: password, role: role}),
                credentials: 'include',
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
    addUserInterests(uid, interests){
        try{
            return fetch(`http://localhost:8000/interests/user/${uid}`, {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({interests: interests}),
                credentials: 'include',
            }).then(async (response) => {
                if (response.status !== 200) {
                    let jsonRes = await response.json();
                    return jsonRes;
                }

                return response.status;
            });
        }catch(err){
            throw err;
        }
    },
    addMember(group, member) {
        try{
            return fetch('http://localhost:8000/group/add/' + group, {
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
                return jsonRes;
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
        
    getDlbsInfo(dlbsid) {
        try {
            return fetch("http://localhost:8000/assignment/" + dlbsid, {
                method: 'GET',
                credentials: 'include',
            })
            .then(async (response) => {
                let jsonRes = await response.json()
                return jsonRes
            })
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
                return jsonRes
            })
        } catch(err) {
            throw err;
        }
    },
    searchGroup(query, page) {
        try {
            return fetch(`http://localhost:8000/search/group?searchString=${query}&page=${page}`, {
                method: 'GET',
                credentials: 'include'
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
    searchUserProfile(query, page) {
        try {
            return fetch(`http://localhost:8000/search/profile?searchString=${query}&page=${page}`, {
                method: 'GET',
                credentials: 'include'
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
    updateUserProfile(uid, first_name, last_name, picture, bio){
        try{
            return fetch('http://localhost:8000/profile/' + uid, {
                method: 'PATCH',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({firstName: first_name, lastName: last_name, picture: picture, bio: bio}),
                credentials: 'include',
            }).then(async (response) => {
                let jsonRes = await response.json();
               
                if(!jsonRes.success) throw jsonRes.message;
                
                var error = document.getElementById("error-message");
                error.style.visibility = "hidden";
                return {name: jsonRes.name, about: jsonRes.about};
            });
        }catch(err){
            throw err;
        }
    },
    getVideoSections() {
        try{
            fetch("http://localhost:8000/video/browse/", {credentials: "include"})
                .then(async (response) => {
                   return  await response.json();
                })
                .then(async (data) => {
                    console.log(data)
                    return await data;
                });
           // return loadedData;
        } catch(err) {
            throw err;
        }
       // return loadedData;
    },
    deleteEvent(eventId){
        try{
            return fetch('http://localhost:8000/calendar/' + eventId, {
                method: 'DELETE',
                credentials: 'include'
            })
            .then(async (response) => {
                let jsonRes = await response.json();
                console.log(jsonRes);
                return jsonRes
            });
        } catch(err) {
            throw err;
      }
    },
    createEvent(title, description, conferenceLink, start, end, type, groupId, userId){
        try {
            return fetch('http://localhost:8000/calendar/', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                title: title,
                description: description,
                conferenceLink: conferenceLink,
                start: start,
                end: end,
                type: type,
                groupId: groupId,
                userId: userId}),
            credentials: "include"}).then(async (response) => {
            const jsonRes = await response.json();
            console.log(jsonRes)
            return jsonRes;
        }) } catch (err) {
            throw err;
        }
    },
    createPost(user, type, description, visibility){
        try{
            return fetch('http://localhost:8000/post/', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({user: user, type: type, content: description, visibility: visibility}),
                credentials: 'include',
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
    deletePost(id) {
        try {
            return fetch(`http://localhost:8000/post/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            }).then(async (result) => {
                let jsonRes = await result.json();
                console.log(result)
                return jsonRes
            })
        } catch (err) {
            throw err;
        }
    },
    createComment(user, msg, pid){
        try{
            return fetch('http://localhost:8000/comment/', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({poster: user, message: msg, pid: pid}),
                credentials: 'include',
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
    getGroupIdFromUserId(userId) {
        try{
            return fetch('http://localhost:8000/group/member/' + userId,  {
                method: 'GET',
                credentials: 'include',
            })
            .then(async (response) => {
                let jsonRes = await response.json()
                return jsonRes
            })
        } catch(err) {
            throw err;
        }},
    deleteComment(commentId, postId) {
        try {
            return fetch(`http://localhost:8000/comment/delete/${commentId}/${postId}`, {
                method: 'DELETE',
                credentials: 'include'
            }).then(async (response) => {
                let jsonRes = await response.json();
                console.log(jsonRes)
                return jsonRes;
            })
        } catch (err) {
            throw err;
        }
    },
    createReply(user, msg, cid){
        try{
            return fetch('http://localhost:8000/comment/add/' + cid, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({poster: user, message: msg, cid: cid}),
                credentials: 'include'
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
                return null;
            });
        } catch(err){
            throw err;
        }
    },
    deleteReply(replyId, commentId) {
        try {
            return fetch(`http://localhost:8000/comment/delete/reply/${replyId}/${commentId}`, {
                method: 'DELETE',
                credentials: 'include'
            }).then( async (response) => {
                let jsonRes = await response.json();
                console.log(jsonRes);
                return jsonRes;
            })
        } catch (err){
            throw err;
        }
    },
   
    updateFeedback(grade, feedback, submissionId){
        try{
            return fetch('http://localhost:8000/assignment/submission/' + submissionId, {
                method: 'PATCH',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({grade: grade, feedback: feedback}),
                credentials: 'include',
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

};

export default APIAccess;