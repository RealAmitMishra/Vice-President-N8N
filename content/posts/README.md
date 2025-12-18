# Blog Posts Directory

This directory contains blog posts written in Markdown format.

## Filename Format

All blog post files must follow the naming convention:

```
YYYY-MM-DD-slug.md
```

Where:
- `YYYY` is the 4-digit year
- `MM` is the 2-digit month (01-12)
- `DD` is the 2-digit day (01-31)
- `slug` is a URL-friendly identifier for the post (lowercase, hyphens instead of spaces)

### Examples

- `2025-12-18-welcome.md`
- `2025-12-25-ai-automation-trends.md`
- `2026-01-01-new-year-tech-predictions.md`

## Required Format

Every blog post **must** include:

### 1. Author Line

The author line must appear **immediately after** the first H1 heading:

```markdown
# Your Post Title
**By Amit Mishra, Room Service Branding – AI Technology Analyst & Brand Strategist**
```

### 2. Footer Block

Every post must end with the exact footer block (do not alter):

```
⸻

About the Author

Amit Mishra is a technology analyst and brand strategist at Room Service Branding, specializing in emerging AI technologies and their business applications. With extensive experience in evaluating cutting-edge AI tools and platforms, Amit provides insights that help businesses navigate the rapidly evolving artificial intelligence landscape.

⸻

Connect With Me

📱 TikTok | 📸 Instagram | 🎥 YouTube | 💼 LinkedIn | 🐦 Chirp | 🌐 Portfolio | ✍️ Medium

⸻

Get a passive side hustle for next to nothing
© 2025 Amit Mishra, Room Service Branding. All rights reserved.
```

## Automation Tools

- **format_injector.js**: Automatically inserts the author line and footer if missing
- **lint_posts.js**: Validates that all posts have the required author line and footer

These tools ensure consistency across all blog posts.
