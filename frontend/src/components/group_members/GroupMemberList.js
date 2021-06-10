import GroupMember from './GroupMember'; 
import CardColumns from 'react-bootstrap/CardColumns'; 

function GroupMemberList(props) {
    return (<div>
        <h1>Group Members</h1>
        <CardColumns>
            {props.map((member) => {
                return <GroupMember key={member._id} name={member.name} role={member.role}/>
            })}
        </CardColumns>
    </div>)
};

export default GroupMemberList; 