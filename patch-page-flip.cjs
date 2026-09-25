const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\karan\\Desktop\\GNDEC_MAGAZINE';
const files = [
    'node_modules/page-flip/dist/js/page-flip.browser.js',
    'node_modules/page-flip/dist/js/page-flip.module.js',
    'node_modules/page-flip/src/Page/HTMLPage.ts'
];

for (const file of files) {
    const fullPath = path.join(baseDir, file);
    if (!fs.existsSync(fullPath)) continue;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // For TypeScript source
    if (file.endsWith('.ts')) {
        const findTs = 'transform: translate3d(0, 0, 0) rotateY(${angle}deg);';
        const replaceTs = 'transform: translate3d(${this.render.getRect().left}px, 0, 0) rotateY(${angle}deg);';
        if (content.includes(findTs)) {
            content = content.replace(findTs, replaceTs);
            fs.writeFileSync(fullPath, content);
            console.log('Patched ' + file);
        }
    } else {
        // For minified JS
        let searchPart = 'translate3d(0, 0, 0) rotateY(${';
        let idx = content.indexOf(searchPart);
        if (idx !== -1) {
            let before = content.slice(0, idx);
            let after = content.slice(idx + searchPart.length);
            let replacePart = 'translate3d(${this.render.getRect().left}px, 0, 0) rotateY(${';
            let newContent = before + replacePart + after;
            fs.writeFileSync(fullPath, newContent);
            console.log('Patched ' + file);
        } else {
            console.log('Search string not found in ' + file);
        }
    }
}
