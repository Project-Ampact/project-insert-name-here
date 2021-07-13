import Groups from './Groups'; 
import CardColumns from 'react-bootstrap/CardColumns'; 
import "./GroupsList.css";
import "../groupProfile/Group.css";

function GroupsList(props) {
    return (<div>
        <h1 className="group-members">Groups</h1>
        <CardColumns>
            {props.groups.map((group) => {
                return <Groups key={group._id} name={group.name} about={group.about} picture={group.picture} gid={group._id}/>
            })}
        </CardColumns>
    </div>)
};

export default GroupsList; 