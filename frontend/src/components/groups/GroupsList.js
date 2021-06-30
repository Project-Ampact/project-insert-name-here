import Groups from './Groups'; 
import CardColumns from 'react-bootstrap/CardColumns'; 
import "./GroupsList.css";
import "../groupProfile/Group.css";

function GroupsList(props) {
    if (props.groups.length === 0) {
        return (
            <div className="group-not-found">
                <h3>No groups found</h3>
            </div>
        )
    }

    return (
    <div>
        <CardColumns>
            {props.groups.map((group) => {
                return <Groups key={group._id} name={group.name} role={group._id}/>
            })}
        </CardColumns>
    </div>)
};

export default GroupsList; 