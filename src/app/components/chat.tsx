'use client';

import React, { useEffect, useState, useRef } from 'react';
import AC, { AgoraChat } from 'agora-chat';
import styles from '../page.module.css';
import { ResponseAPI } from "@/model/DashboardModel";
import Image from "next/image";
import {endChatService} from "@/services/dashboard";

const appKey = '611142475#1327769'; // Replace with your actual Agora Chat app key

interface Message {
    id: string;
    from?: string;
    msg: string;
    type: 'sent' | 'received';
    timestamp: number;
}

interface incomeDataProps {
    agoraCredential: any | null;
}

const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}.${minutes}`;
};

const ChatPage: React.FC<incomeDataProps> = ({ agoraCredential }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const connRef = useRef<AgoraChat.Connection | null>(null); // Use ref to store the connection instance

    const { agoraUserId, token } = agoraCredential || {};
    const [peerID, setPeerID] = useState('090a1a9b987d4ac79e8f4cf22a7b938d');
    const [endChat, setEndChat] = useState(false);

    const handleEndChat = async () => {
        const appointments = ['7597db03-b44a-4d89-8522-9bb4f86ea197'];
        const doctorId = "b4fe164f-9c6c-4e24-b0fd-e0c80e2eebb8";
        const source = "doctor-chat-room";
        const userName = "lontong";
        const userId = "lontong.balap";
        try {
            const response = await endChatService({ appointments, doctorId, source, userName, userId });
            if (response.status === 200) setEndChat(true);
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error:', error.message);
            } else {
                console.log('Unexpected error:', error);
            }
        }
    };

    useEffect(() => {
        const conn = new AC.connection({ appKey });
        connRef.current = conn; // Store the connection instance in the ref

        if (agoraUserId && token) {
            conn.open({ user: atob(agoraUserId), agoraToken: atob(token) })
                .then(() => {
                    console.log('Connection opened successfully');
                })
                .catch((error) => {
                    console.error('Failed to open connection:', error);
                });
        }

        conn.addEventHandler('connection&message', {
            onConnected: () => {
                console.log({ timestamp: Date.now(), from: 'system', msg: 'Connect success!', type: 'received' });
            },
            onDisconnected: () => {
                console.log({ timestamp: Date.now(), from: 'system', msg: 'Logout success!', type: 'received' });
            },
            onTextMessage: (message: AgoraChat.TextMsgBody) => {
                addMessage({ id: message.id, timestamp: message.time, from: message.from, msg: message.msg, type: 'received' });
            },
            onTokenWillExpire: () => {
                console.log({ timestamp: Date.now(), from: 'system', msg: 'Token is about to expire', type: 'received' });
            },
            onTokenExpired: () => {
                console.log({ timestamp: Date.now(), from: 'system', msg: 'The token has expired', type: 'received' });
            },
            onError: (error) => {
                console.error('Error:', error);
            },
        });

        const loginButton = document.getElementById('login');
        const logoutButton = document.getElementById('logout');
        const sendMessageButton = document.getElementById('send_peer_message');
        const peerMessageInput = document.getElementById('peerMessage') as HTMLInputElement;

        const sendMessage = () => {
            const peerId = peerID;
            const peerMessage = peerMessageInput.value;

            const option: AgoraChat.CreateMsgType = {
                chatType: 'singleChat',
                type: 'txt',
                to: peerId,
                msg: peerMessage,
            };

            const msg = AC.message.create(option);
            conn.send(msg)
                .then(() => {
                    addMessage({ id: msg.id, timestamp: Date.now(), from: peerId, msg: peerMessage, type: 'sent' });
                    peerMessageInput.value = ''; // Clear the input field
                })
                .catch((error) => {
                    console.error('Send private text failed:', error);
                });
        };

        loginButton?.addEventListener('click', () => {
            const userId = (document.getElementById('userID') as HTMLInputElement).value;
            const token = (document.getElementById('token') as HTMLInputElement).value;
            conn.open({ user: userId, agoraToken: token });
        });

        logoutButton?.addEventListener('click', () => {
            conn.close();
        });

        sendMessageButton?.addEventListener('click', sendMessage);

        peerMessageInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });

        return () => {
            loginButton?.removeEventListener('click', () => { });
            logoutButton?.removeEventListener('click', () => { });
            sendMessageButton?.removeEventListener('click', sendMessage);
            peerMessageInput.removeEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    sendMessage();
                }
            });
        };
    }, [agoraUserId, token, peerID]);

    useEffect(() => {
        if (endChat && connRef.current) {
            if (connRef.current instanceof AgoraChat.Connection) {
                connRef.current.close();
            }
        }
    }, [endChat]);

    const addMessage = (message: Message) => {
        const from = message.from || 'Unknown';
        const timestamp = Date.now();

        const newMessage: Message = {
            ...message,
            from: from,
            timestamp: timestamp,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    const deleteMessage = (id: string, to?: string) => {
        if (!connRef.current) {
            console.error('Connection not established');
            return;
        }

        if (!to) {
            console.error('Recipient ID is undefined');
            return;
        }

        const option: {
            mid: string;
            to: string;
            chatType: 'singleChat' | 'groupChat' | 'chatRoom';
        } = {
            mid: id,
            to: to,
            chatType: 'singleChat', // Ensure this matches one of the allowed values
        };

        connRef.current.recallMessage(option)
            .then((res) => {
                console.log("Message recall success", res);
                setMessages((prevMessages) => prevMessages.filter(message => message.id !== id));
            })
            .catch((error) => {
                console.error("Message recall failed", error);
            });
    };


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.chatRoom}>
                    Chat Room
                </div>
                <div className={styles.endChat}>
                    <button type="button" onClick={() => handleEndChat()} id="logout">END CHAT</button>
                </div>
            </div>
            <div className={styles.chatContainer}>
                <div className={styles.log}>
                    {messages.map((message, index) => (
                        <div key={`${index}-message`}>
                            <div className={message.type === 'sent' ? styles.sentMessage : styles.receivedMessage}>
                                {message.msg}
                            </div>
                            <div className={message.type === 'sent' ? styles.sentMessageTime : styles.receivedMessageTime}>
                                {message.type === 'sent' && (
                                    <div className={styles.deleteChat} onClick={() => deleteMessage(message.id, message.from)}>Delete</div>
                                )}
                                <div className='flex'>{formatTime(message.timestamp)}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.form}>
                    <div className={styles.menuBar}>
                        <div>
                            <Image
                                src="/static/img/menu-bar__b.png"
                                alt="Menu Bar Bold"
                                width={28}
                                height={28}
                                priority
                            />
                        </div>
                        <div>
                            <Image
                                src="/static/img/menu-bar__i.png"
                                alt="Menu Bar Bold"
                                width={28}
                                height={28}
                                priority
                            />
                        </div>
                        <div>
                            <Image
                                src="/static/img/menu-bar__u.png"
                                alt="Menu Bar Bold"
                                width={28}
                                height={28}
                                priority
                            />
                        </div>
                        <div>
                            <Image
                                src="/static/img/menu-bar__s.png"
                                alt="Menu Bar Bold"
                                width={28}
                                height={28}
                                priority
                            />
                        </div>
                        <div>
                            <Image
                                src="/static/img/list.png"
                                alt="Menu Bar Bold"
                                width={58}
                                height={28}
                                priority
                            />
                        </div>
                        <div className='pt-1 ml-1'>
                            <Image
                                src="/static/img/frame.png"
                                alt="Menu Bar Bold"
                                width={21}
                                height={21}
                                priority
                            />
                        </div>
                    </div>
                    <div className={styles.inputField}>
                        <div className={styles.inputFieldBox}>
                            <input type="text" placeholder="Type your Message Here" id="peerMessage" />
                        </div>
                        <div className={styles.sendButton}>
                            <button type="button" id="send_peer_message">SEND</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
