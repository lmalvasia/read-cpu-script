import fs from 'fs';

export default class File {
    static writeFile() {
        fs.writeFile(getDateTime() + '.log', data, err => {
            if (err) console.log(err);
            console.log('Successfully Written to File.');
        });
    }
}