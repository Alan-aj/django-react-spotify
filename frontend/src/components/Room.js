import React, {useState} from 'react';
import {useParams} from 'react-router-dom'


export default function Room(props){
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const {roomCode} = useParams();
    const getRoomDetails = () => {
        fetch("/api/get-room" + "?code=" + roomCode).then((response) =>
            response.json())
        .then((data) => {
            setVotesToSkip(data.votes_to_skip);
            setGuestCanPause(data.guest_can_pause);
            setIsHost(data.is_host);
        });
    }
    getRoomDetails();
    
    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {votesToSkip}</p>
            <p>Guest can pause: {guestCanPause.toString()}</p>
            <p>Host: {isHost.toString()}</p>
        </div>
    );
}


// export default class Room extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             votesToSkip: 2,
//             guestCanPause: false,
//             isHost: false,
//         };
        
        
//         // console.log(roomCode);
//         // this.roomCode = this.props.match.params.roomCode;
//     }


//     render() {
//         const {roomCode} = useParams();
        
//         return (
            
//             <div>
//                 <h3>{roomCode}</h3>
//                 <p>Votes: {this.state.votesToSkip}</p>
//                 <p>Guest can pause: {this.state.guestCanPause}</p>
//                 <p>Host: {this.state.isHost}</p>
//             </div>
//         );
//     }
// }