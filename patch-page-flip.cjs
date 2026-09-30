const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const files = [
    'node_modules/page-flip/dist/js/page-flip.browser.js',
    'node_modules/page-flip/dist/js/page-flip.module.js',
    'node_modules/page-flip/src/Page/HTMLPage.ts'
];

for (const file of files) {
    const fullPath = path.join(baseDir, file);
    if (!fs.existsSync(fullPath)) {
        console.warn('File not found: ' + file);
        continue;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    let isPatched = false;

    if (file.endsWith('.ts')) {
        const findTs = 'transform: translate3d(0, 0, 0) rotateY(${angle}deg);';
        const replaceTs = 'transform: translate3d(${this.render.getRect().left}px, 0, 0) rotateY(${angle}deg);';
        
        if (content.includes(replaceTs)) {
            console.log('Already patched: ' + file);
            isPatched = true;
        } else if (content.includes(findTs)) {
            content = content.replace(findTs, replaceTs);
            fs.writeFileSync(fullPath, content);
            console.log('Patched: ' + file);
            isPatched = true;
        }
    } else {
        const searchPart = 'translate3d(0, 0, 0) rotateY(${';
        const replacePart = 'translate3d(${this.render.getRect().left}px, 0, 0) rotateY(${';
        
        if (content.includes(replacePart)) {
            console.log('Already patched: ' + file);
            isPatched = true;
        } else {
            let idx = content.indexOf(searchPart);
            if (idx !== -1) {
                let before = content.slice(0, idx);
                let after = content.slice(idx + searchPart.length);
                let newContent = before + replacePart + after;
                fs.writeFileSync(fullPath, newContent);
                console.log('Patched: ' + file);
                isPatched = true;
            }
        }
    }

    if (!isPatched) {
        console.error('Failed to patch (search string not found): ' + file);
    }
}
