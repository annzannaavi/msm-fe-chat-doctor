'use client';

import React, { useEffect, useState } from 'react';


import dynamic from 'next/dynamic'
import {fetchUserProfile} from "@/services/dashboard";
import {ResponseAPI} from "@/model/DashboardModel";

const Chat = dynamic(() => import('../components/chat'), {
    ssr: false,
})


const ChatPage: React.FC  = () => {

    const [dataUserProfile, setDataUserProfile] = useState(null);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJRCI6MjM1OTgsInBob25lTnVtYmVyIjoiKzYyODEzODc3Mzg0NDEiLCJwYXRpZW50SWQiOiJjY2MyYTJlYi0yMDZmLTQ5ZmMtODE4MC1iM2YxMGM3NTU2NTcifSwiaWF0IjoxNzE5NDc4MzQ4LCJleHAiOjE3MjgxMTgzNDh9.RguuzdTzyPxx52F4eDjWDV1HMUu1FQcLq4Gv0ap-eJc';
    const appointmentID = 'ZmM4OWYyOWMtYmVjNS00Y2I0LTljYjUtMWMyYTllYWE0Mzkz'
    const userID = 'ccc2a2eb-206f-49fc-8180-b3f10c755657'
    //Fetch User Data
    useEffect(()=>{
        const fetchDataUserProfile = async () => {
            if (!token) {
                throw new Error('Token is null or undefined'); // Throw an error if user_id is not available
            }
            const response =  await fetchUserProfile( token, userID, appointmentID )
            setDataUserProfile(response.data.data)
        }
        fetchDataUserProfile()
    },[])

    useEffect(() => {
        console.log({dataUserProfile})
    }, []);

    return (
            <Chat agoraCredential={dataUserProfile} />
    );
};

export default ChatPage;
