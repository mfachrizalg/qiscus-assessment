'use client';

import { ChatData } from '@/types';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';

interface ChatUIProps {
    data: ChatData;
}

export const ChatUI = ({ data }: ChatUIProps) => {
    const currentUserId = 'agent@mail.com'; // Assumption for sent/received messages
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [data.comments]);

    const { room, comments } = data;

    return (
        <div className="flex flex-col h-full w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
            {/* Chat Header */}
            <header className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <Image
                    src={room.image_url}
                    alt={room.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-4"
                />
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{room.name}</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {room.participant.map(p => p.name).join(', ')}
                    </p>
                </div>
            </header>

            {/* Message List */}
            <main className="flex-1 p-4 overflow-y-auto space-y-4">
                {comments.map((comment) => (
                    <MessageBubble
                        key={comment.id}
                        comment={comment}
                        participants={room.participant}
                        currentUserId={currentUserId}
                    />
                ))}
                <div ref={messagesEndRef} />
            </main>

            {/* Chat Input */}
            <footer className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
                        Send
                    </button>
                </div>
            </footer>
        </div>
    );
};