#!/usr/bin/env node

/**
 * lint_posts.js
 * 
 * Validates that all markdown files in content/posts/ have:
 * 1. Author line immediately under the first H1
 * 2. Footer block at the end
 * 
 * Exits with code 1 if any file fails validation.
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
 * Validate a single markdown file
 */
function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let errors = [];
  
  // Find first H1
  let h1Index = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('# ')) {
      h1Index = i;
      break;
    }
  }
  
  if (h1Index === -1) {
    errors.push('No H1 heading found');
  } else {
    // Check if author line exists immediately after H1
    const nextLineIndex = h1Index + 1;
    if (nextLineIndex >= lines.length || lines[nextLineIndex].trim() !== AUTHOR_LINE) {
      errors.push(`Missing author line immediately after H1 (expected on line ${nextLineIndex + 1})`);
    }
  }
  
  // Check if footer exists
  if (!content.includes(FOOTER_BLOCK)) {
    errors.push('Missing required footer block');
  }
  
  return errors;
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
    console.log('No markdown files found to lint');
    process.exit(0);
  }
  
  console.log(`Linting ${mdFiles.length} file(s)...\n`);
  
  let hasErrors = false;
  mdFiles.forEach(file => {
    const filePath = path.join(postsDir, file);
    const errors = validateFile(filePath);
    
    if (errors.length > 0) {
      hasErrors = true;
      console.error(`❌ ${file}:`);
      errors.forEach(err => console.error(`   - ${err}`));
      console.error('');
    } else {
      console.log(`✓ ${file}`);
    }
  });
  
  if (hasErrors) {
    console.error('\nLinting failed! Please fix the errors above.');
    process.exit(1);
  } else {
    console.log('\n✓ All posts passed linting!');
    process.exit(0);
  }
}

main();
