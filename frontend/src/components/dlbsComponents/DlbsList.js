import DlbsItem from './DlbsItem'; 
import CardColumns from 'react-bootstrap/CardColumns';
import "./Dlbs.css";


function DlbsList(props) {
    return (<div>
        <h1 className="h1-cus">Assignments Available</h1>
        <CardColumns>
            {props.members.map((member) => {
                return <DlbsItem key={member} name={member} uid={member} />
            })}
        </CardColumns>
    </div>)
};

export default DlbsList; 