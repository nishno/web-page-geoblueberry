import {mkdir,copyFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const file of ['index.html','styles.css','app.js','translations.js','logo.svg','orchard.webp','blueberries.webp'])await copyFile(file,'dist/'+file);
console.log('Static site built in dist/');
