#!/usr/bin/env node

/**
 * format_injector.js
 * 
 * Idempotently inserts the author line under the first H1 and appends the footer if missing.
 * Requires Node.js 18+
 */

const fs = require('fs');
const path = require('path');

const AUTHOR_LINE = '**By Amit Mishra, Room Service Branding – AI Technology Analyst & Brand Strategist**';

const FOOTER_BLOCK = `⸻

About the Author

Amit Mishra is a technology analyst and brand strategist at Room Service Branding, specializing in emerging AI technologies and their business applications. With extensive experience in evaluating cutting-edge AI tools and platforms, Amit provides insights that help businesses navigate the rapidly evolving artificial intelligence landscape.

⸻

Connect With Me

📱 TikTok | 📸 Instagram | 🎥 YouTube | 💼 LinkedIn | 🐦 Chirp | 🌐 Portfolio | ✍️ Medium

⸻

Get a passive side hustle for next to nothing
© 2025 Amit Mishra, Room Service Branding. All rights reserved.`;

/**
 * Process a single markdown file
 */
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let lines = content.split('\n');
  
  // Find first H1
  let h1Index = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('# ')) {
      h1Index = i;
      break;
    }
  }
  
  if (h1Index === -1) {
    console.warn(`No H1 found in ${filePath}, skipping author line insertion`);
  } else {
    // Check if author line exists immediately after H1
    const nextLineIndex = h1Index + 1;
    if (nextLineIndex >= lines.length || lines[nextLineIndex].trim() !== AUTHOR_LINE) {
      // Insert author line after H1
      lines.splice(nextLineIndex, 0, AUTHOR_LINE);
      modified = true;
      console.log(`Inserted author line in ${filePath}`);
    }
  }
  
  // Check if footer exists
  const updatedContent = lines.join('\n');
  if (!updatedContent.includes(FOOTER_BLOCK)) {
    // Append footer
    lines.push('');
    lines.push(FOOTER_BLOCK);
    modified = true;
    console.log(`Appended footer in ${filePath}`);
  }
  
  if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`No changes needed for ${filePath}`);
  }
}

/**
 * Main function
 */
function main() {
  const postsDir = path.join(__dirname, '../content/posts');
  
  if (!fs.existsSync(postsDir)) {
    console.error(`Posts directory not found: ${postsDir}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(postsDir);
  const mdFiles = files.filter(f => f.endsWith('.md') && f !== 'README.md');
  
  if (mdFiles.length === 0) {
    console.log('No markdown files found to process');
    return;
  }
  
  console.log(`Processing ${mdFiles.length} file(s)...`);
  mdFiles.forEach(file => {
    const filePath = path.join(postsDir, file);
    processFile(filePath);
  });
  
  console.log('Done!');
}

main();
