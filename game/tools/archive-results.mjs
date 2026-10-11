import {readFile,writeFile} from 'node:fs/promises';
const doc=JSON.parse(await readFile('test-results/browser-results.json'));if(doc.stats.unexpected||doc.stats.skipped||doc.stats.flaky)throw Error('Browser matrix is not clean');await writeFile('docs/TACTILE_BROWSER_RESULTS.json',JSON.stringify(doc,null,2));console.log(JSON.stringify(doc.stats));
