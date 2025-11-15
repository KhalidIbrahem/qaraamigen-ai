// import fs from 'fs';
// import csv from 'csv-parser';
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import { FaissStore } from "langchain/vectorstores/faiss";

// // 1. Read the Harvard CSV
// const records = [];

// fs.createReadStream('harvard_somali_data.csv')
//   .pipe(csv())
//   .on('data', (data) => {
//     // Create a meaningful sentence for the AI to learn
//     const text = `In ${data['Start Year']}, the artist ${data['Component creator']} recorded the track "${data['Component Title']}" which is part of the collection ${data['Collection Title']}.`;
    
//     // Add metadata for filtering
//     records.push({ 
//         pageContent: text, 
//         metadata: { 
//             artist: data['Component creator'], 
//             year: data['Start Year'] 
//         } 
//     });
//   })
//   .on('end', async () => {
//     console.log(`Loaded ${records.length} historical records.`);
    
//     // 2. Turn Text into Vectors (Embeddings)
//     const embeddings = new OpenAIEmbeddings();
    
//     // 3. Create Vector Store (The "Brain" of your Chat)
//     const vectorStore = await FaissStore.fromDocuments(records, embeddings);
    
//     // 4. Save the "Brain" to use in your website
//     await vectorStore.save("./public/somali_music_index");
    
//     console.log("Training Complete. Chatbot now knows Harvard Archive data.");
//   });