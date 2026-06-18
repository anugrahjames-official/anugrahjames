const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'growth-intelligence-report-dashboard.html');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /<!-- ══════════════════════════════════════════\r?\n\s*CTA\r?\n══════════════════════════════════════════ -->[\s\S]*?(?=<!-- ══════════════════════════════════════════\r?\n\s*FOOTER)/;

if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(filePath, content);
    console.log("Section removed successfully!");
} else {
    console.log("Could not find the CTA section.");
}
