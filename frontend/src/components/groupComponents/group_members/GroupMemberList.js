import GroupMember from './GroupMember'; 
import CardColumns from 'react-bootstrap/CardColumns';
 
import "../groupProfile/Group.css";

function GroupMemberList(props) {
    return (<div>
        <h1 className="group-members">Group Members</h1>
        <CardColumns>
            {props.members.map((member) => {
                return <GroupMember key={member} name={member} />
            })}
        </CardColumns>
    </div>)
};

export default GroupMemberList; 