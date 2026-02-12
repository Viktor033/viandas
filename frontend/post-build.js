const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../target/frontend-staging/browser');
const destDir = path.join(__dirname, '../target/frontend-staging');

console.log(`Moving files from ${sourceDir} to ${destDir}...`);

if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory ${sourceDir} does not exist.`);
    // If browser dir doesn't exist, maybe it's already in the right place or build failed.
    // We won't exit with error to avoid breaking the chain if it's already okay, 
    // but typically this means build didn't output where we expected.
    process.exit(0);
}

// Move all files/folders from source to dest
try {
    const files = fs.readdirSync(sourceDir);

    files.forEach(file => {
        const sourcePath = path.join(sourceDir, file);
        const destPath = path.join(destDir, file);

        // If destination exists, remove it first (for directories) or overwrite
        if (fs.existsSync(destPath)) {
            fs.rmSync(destPath, { recursive: true, force: true });
        }

        fs.renameSync(sourcePath, destPath);
    });

    // Remove the now empty source directory
    fs.rmdirSync(sourceDir);
    console.log('Files moved successfully.');

} catch (err) {
    console.error('Error moving files:', err);
    process.exit(1);
}
