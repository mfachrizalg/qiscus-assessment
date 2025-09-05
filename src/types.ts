// src/types.ts

export interface Participant {
    id: string;
    name: string;
    role: number;
}

export interface Room {
    name: string;
    id: number;
    image_url: string;
    participant: Participant[];
}

export interface Comment {
    id: number;
    type: 'text' | 'image' | 'video' | 'pdf';
    message?: string; // Optional for non-text types
    url?: string;     // Optional for text types
    fileName?: string; // Optional for text types
    sender: string;
}

export interface ChatData {
    room: Room;
    comments: Comment[];
}