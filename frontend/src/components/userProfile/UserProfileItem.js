import Card from 'react-bootstrap/Card';

function UserProfileItem(props) {
    return(
        <Card key={props.key}>
            <Card.Body>
                <Card.Title>{`${props.firstName} ${props.lastName}`}</Card.Title>
                <Card.Text>{`${props.firstName} ${props.lastName}`}</Card.Text>
            </Card.Body>
        </Card>
    )
}; 

export default UserProfileItem; 