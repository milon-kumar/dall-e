import { surpriseMePrompts } from "../constant";
import FileServer from "file-saver"

export function getRandomPrompt(prampt){
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];

    if(randomPrompt === prampt) return getRandomPrompt(prampt);

    return randomPrompt;
}

export function downloadImage(_id,photo){
    FileServer.saveAs(photo,`download-${_id}.jpg`);
}