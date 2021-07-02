import UserProfileItem from './UserProfileItem'; 
import CardColumns from 'react-bootstrap/CardColumns'; 
import "./UserProfileList.css";

function UserProfileList(props) {
    if (props.profiles.length === 0) {
        return (
            <div className="profile-not-found">
                <h3>No user profiles found</h3>
            </div>
        )
    }

    return (
    <div>
        <CardColumns>
            {props.profiles.map((profile) => {
                return <UserProfileItem key={profile._id} firstName={profile.firstName} lastName={profile.lastName} role={profile._id}/>
            })}
        </CardColumns>
    </div>)
};

export default UserProfileList; 