import axios from 'axios';
import * as fs from 'fs';
class ImageService {
    async download(url: string) {
        const { data } = await axios.get(url, { responseType: 'stream' })
        return data
    }
    async saveFile(url: string, fileName:string) {
        const data = await this.download(url)
        return new Promise((resolve, reject) => {
            data.pipe(fs.createWriteStream(fileName))
                .on('error', reject)
                .once('close', () => resolve(fileName));
        });
    }
}


export { ImageService }

