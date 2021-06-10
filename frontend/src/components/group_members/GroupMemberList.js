import GroupMember from './GroupMember'; 

function GroupMemberList(props) {
	return (<div>
		<h1>Group Members</h1>
		<ul>
			{props.map((member) => {
				return <GroupMember key={member._id} name={member.name} role={member.role}/>
			})}
		</ul>
	</div>)
};

export default GroupMemberList; 


