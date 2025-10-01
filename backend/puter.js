// backend-scripts/puter.js
import Puter from "puter";
import process from "process";

const apiKey = process.env.PUTER_API_KEY; // your Puter API key
const prompt = process.argv[2]; // prompt from Laravel

const client = new Puter({ apiKey });

async function main() {
    try {
        const response = await client.generate({
            model: "gpt-3.5",   // <-- Using GPT-3.5
            prompt: prompt,
            maxTokens: 200
        });
        console.log(JSON.stringify(response)); // output for Laravel
    } catch (err) {
        console.error(err);
    }
}

main();
