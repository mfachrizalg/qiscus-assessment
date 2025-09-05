import { ChatUI } from "@/components/ChatUI";
import { ChatData } from "@/types";
// We use the 'fs' module to read the local JSON file on the server.
import fs from 'fs/promises';
import path from 'path';

// This is an async Server Component, so we can use async/await here.
export default async function Home() {
    // Construct the path to the JSON file
    const filePath = path.join(process.cwd(), 'src', 'data', 'dummy-extended.json');

    // Read and parse the data
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const chatResults = JSON.parse(jsonData);

    // The dummy data is an array of results, we'll use the first one.
    const chatData: ChatData = chatResults.results[0];

    return (
        <div className="font-sans bg-gray-100 dark:bg-gray-900 h-screen p-4 sm:p-6 md:p-8">
            <ChatUI data={chatData} />
        </div>
    );
}