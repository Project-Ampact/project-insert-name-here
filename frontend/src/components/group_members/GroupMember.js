function GroupMember(props) {
    return(
        <li key={props.key}>
            <div>
                <h3>{props.name}</h3>
                <p>{props.role}</p>
            </div>
        </li>
    )
}; 

export default GroupMember; 