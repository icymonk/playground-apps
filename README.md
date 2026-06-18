# Vue 3 Mega Monorepo

A monolithic repository containing 20 high-quality Vue 3 + Tailwind CSS v4 frontend applications, all built natively without complex build systems.

## Apps Collection (20/20)

### Phase 1: The Essentials
1. **[Pomodoro Timer](./apps/pomodoro-timer/)** - Productivity timer
2. **[Calculator](./apps/calculator-app/)** - iOS-style calculator
3. **[Markdown Editor](./apps/markdown-editor/)** - Split pane markdown editor
4. **[Weather Widget](./apps/weather-widget/)** - Glassmorphic weather widget
5. **[Habit Tracker](./apps/habit-tracker/)** - Weekly grid habit tracker
6. **[Password Generator](./apps/password-generator/)** - Secure password generator

### Phase 2: Interactivity
7. **[AI Chatbot](./apps/ai-chatbot/)** - ChatGPT clone with auto-scrolling
8. **[Weather Dashboard](./apps/weather-dashboard/)** - Dynamic gradients and graphs
9. **[Kanban Board](./apps/kanban-dnd/)** - Trello clone using HTML5 Drag and Drop
10. **[Music Player](./apps/music-player/)** - Spotify-like audio player with visualizer

### Phase 3: Hyper-scale Architecture (The Final 10)
11. **[Crypto Dashboard](./apps/crypto-dashboard/)** - Binance-style crypto trading UI
12. **[Fitness Tracker](./apps/fitness-tracker/)** - Apple Fitness activity rings and stats
13. **[Recipe Book](./apps/recipe-book/)** - Pinterest-style masonry layout for recipes
14. **[Job Board](./apps/job-board/)** - Job listings with responsive slide-over panel
15. **[Video Sharing](./apps/video-sharing/)** - YouTube clone with progress bars
16. **[Real Estate](./apps/real-estate/)** - Airbnb clone with list and map views
17. **[Social Feed](./apps/social-feed/)** - Twitter/X clone with timeline and sidebar
18. **[Code Editor](./apps/code-editor/)** - VS Code layout with explorer and tabs
19. **[Email Client](./apps/email-client/)** - Superhuman-inspired 3-pane email client
20. **[Portfolio Builder](./apps/portfolio-builder/)** - Form-to-Preview real-time website builder

## Infrastructure
- **Monorepo**: Single Git repository housing multiple independent apps.
- **CI/CD**: GitHub Actions automatically builds and deploys individual apps based on path filters.
- **Hosting**: Firebase Multi-site Hosting (`firebase.json` targets routing).
- **Styling**: Tailwind CSS v4 running entirely natively without PostCSS.
- **Package Manager**: Bun (`bun run dev`, `bun run build`).
