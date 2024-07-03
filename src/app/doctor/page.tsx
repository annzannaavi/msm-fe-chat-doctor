'use client';

import React, { useEffect, useState } from 'react';
import AC, { AgoraChat } from 'agora-chat';
import styles from '../page.module.css';
import {ResponseAPI} from "@/model/DashboardModel";

const appKey = '611142475#1327769'; // Replace with your actual Agora Chat app key

interface Message {
    from?: string;  // Make 'from' property optional
    msg: string;
    type: 'sent' | 'received';
    timestamp: number; // Timestamp for the message
}

interface incomeDataProps {
    response: any[] | null;
    agoraCredential: any | null;
    history: any[];
    loading: boolean;
}

const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}.${minutes}`;
};

const ChatPage: React.FC<incomeDataProps> = ({agoraCredential}) => {
    const [messages, setMessages] = useState<Message[]>([]);

    const {agoraUserId, token} = agoraCredential || {};

    useEffect(() => {
        if (agoraUserId && token)
            console.log('sdas', atob(agoraUserId));
    }, [agoraUserId, token]);
    useEffect(() => {
        const conn = new AC.connection({appKey});

        if (agoraUserId && token) conn.open({user: atob(agoraUserId), agoraToken: atob(token)});

        conn.addEventHandler('connection&message', {
            onConnected: () => {
                addMessage({timestamp: Date.now(), from: 'system', msg: 'Connect success!', type: 'received'});
            },
            onDisconnected: () => {
                addMessage({timestamp: Date.now(), from: 'system', msg: 'Logout success!', type: 'received'});
            },
            onTextMessage: (message: AgoraChat.TextMsgBody) => {
                console.log('presn', {message});
                addMessage({timestamp: message.time, from: message.from, msg: message.msg, type: 'received'});
            },
            onTokenWillExpire: () => {
                addMessage({timestamp: Date.now(), from: 'system', msg: 'Token is about to expire', type: 'received'});
            },
            onTokenExpired: () => {
                addMessage({timestamp: Date.now(), from: 'system', msg: 'The token has expired', type: 'received'});
            },
            onRecallMessage: (message) => {
                // You can insert a message here, for example, XXX has recalled a message.
                console.log('Recalling the message succeeds', message)
            },
            onError: (error) => {
                console.error('on error', error);
            },
        });


        const loginButton = document.getElementById('login');
        const logoutButton = document.getElementById('logout');
        const sendMessageButton = document.getElementById('send_peer_message');

        loginButton?.addEventListener('click', () => {
            const userId = (document.getElementById('userID') as HTMLInputElement).value;
            const token = (document.getElementById('token') as HTMLInputElement).value;
            conn.open({user: userId, agoraToken: token});
        });

        logoutButton?.addEventListener('click', () => {
            conn.close();
        });

        sendMessageButton?.addEventListener('click', () => {
            const peerId = (document.getElementById('peerId') as HTMLInputElement).value;
            const peerMessage = (document.getElementById('peerMessage') as HTMLInputElement).value;

            const option: AgoraChat.CreateMsgType = {
                chatType: 'singleChat',
                type: 'txt',
                to: peerId,
                msg: peerMessage,
            };

            const msg = AC.message.create(option);
            conn.send(msg)
                .then(() => {
                    addMessage({timestamp: Date.now(), from: peerId, msg: peerMessage, type: 'sent'});
                })
                .catch(() => {
                    console.error('send private text failed');
                });
        });

        return () => {
            loginButton?.removeEventListener('click', () => {
            });
            logoutButton?.removeEventListener('click', () => {
            });
            sendMessageButton?.removeEventListener('click', () => {
            });
        };
    }, [agoraUserId, token]);

    const addMessage = (message: Message) => {
        const from = message.from || 'Unknown';
        const timestamp = Date.now(); // Get current timestamp in milliseconds

        const newMessage: Message = {
            ...message,
            from: from,
            timestamp: timestamp,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    return (
        <div className={styles.container}>
            <h2>Agora Chat Examples</h2>
            <div className={styles.chatContainer}>

                <div className={styles.log}>
                    {messages.map((message, index) => (
                        <div key={`${index}-message`}>
                            <div className={message.type === 'sent' ? styles.sentMessage : styles.receivedMessage}>
                                {message.msg}
                            </div>
                            <div
                                className={message.type === 'sent' ? styles.sentMessageTime : styles.receivedMessageTime}>
                                {formatTime(message.timestamp)} {/* Display message time */}
                                {message.type === 'sent' && (

                                    <>Delete</>

                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.form}>
                    <form id="loginForm">
                        <div className={styles.inputField}>
                            <label>User ID</label>
                            <input type="text" placeholder="User ID" id="userID"/>
                        </div>
                        <div className={styles.inputField}>
                            <label>Token</label>
                            <input type="text" placeholder="Token" id="token"/>
                        </div>
                        <div>
                            <button type="button" id="login">Login</button>
                            <button type="button" id="logout">Logout</button>
                        </div>
                        <div className={styles.inputField}>
                            <label>Peer user ID</label>
                            <input type="text" placeholder="Peer user ID" id="peerId"/>
                        </div>
                        <div className={styles.inputField}>
                            <label>Peer Message</label>
                            <input type="text" placeholder="Peer message" id="peerMessage"/>
                            <button type="button" id="send_peer_message">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;

