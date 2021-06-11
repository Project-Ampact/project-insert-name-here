import Card from 'react-bootstrap/Card';

function Groups(props) {
    return(
        <Card key={props.key}>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>{props.name}</Card.Text>
            </Card.Body>
        </Card>
    )
}; 

export default Groups; 