import { Comment, Participant } from '@/types';
import Image from 'next/image';
import { FileIcon } from './FileIcon';

interface MessageBubbleProps {
    comment: Comment;
    participants: Participant[];
    currentUserId: string;
}

export const MessageBubble = ({ comment, participants, currentUserId }: MessageBubbleProps) => {
    const isSender = comment.sender === currentUserId;
    const senderInfo = participants.find(p => p.id === comment.sender);

    const alignment = isSender ? 'justify-end' : 'justify-start';
    const bubbleColor = isSender
        ? 'bg-blue-600 text-white'
        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200';

    const renderMessageContent = () => {
        switch (comment.type) {
            case 'text':
                return <p className="text-sm">{comment.message}</p>;
            case 'image':
                return (
                    <Image
                        src={comment.url!}
                        alt={comment.fileName || 'Chat image'}
                        width={250}
                        height={200}
                        className="rounded-lg object-cover"
                    />
                );
            case 'video':
                return (
                    <video
                        controls
                        className="max-w-xs rounded-lg"
                        style={{ maxWidth: '250px' }}
                    >
                        <source src={comment.url!} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                );
            case 'pdf':
                return (
                    <a
                        href={comment.url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-lg bg-gray-100 dark:bg-gray-600 p-3 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                    >
                        <FileIcon />
                        <div className="flex flex-col">
                            <span className="font-medium">{comment.fileName}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">PDF Document</span>
                        </div>
                    </a>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`flex items-end gap-2 ${alignment}`}>
            {!isSender && (
                <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-sm text-gray-600 dark:text-gray-300">
                        {senderInfo?.name.charAt(0).toUpperCase()}
                    </div>
                </div>
            )}
            <div className="flex flex-col" style={{ maxWidth: '70%' }}>
                {!isSender && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 mb-1 ml-2">
            {senderInfo?.name}
          </span>
                )}
                <div className={`rounded-2xl p-1 ${bubbleColor}`}>
                    <div className={`p-2 ${comment.type !== 'text' ? 'bg-transparent' : ''}`}>
                        {renderMessageContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};