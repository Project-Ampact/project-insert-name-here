import Card from 'react-bootstrap/Card';

function GroupMember(props) {
    return(
        <Card key={props.key}>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>{props.role}</Card.Text>
            </Card.Body>
        </Card>
    )
}; 

export default GroupMember; 