export interface Item {
  name: string;
  text: string;
  rating?: number;
  url?: string;
  image?: string;
}

export interface Tab {
  name: string;
  items: Item[];
}

export const tabs: Tab[] = [
  {
    name: "PROFILE",
    items: [
      { name: "Problem Solving", image: "problem-solving", rating: 80, text: "Not afraid of new problems. Breaking them into smaller ones is what made this canvas-based site possible." },
      { name: "Communication", image: "communication", rating: 75, text: "Clear written and spoken communication. An empathic listener who explains technical ideas to business, QA and development teams." },
      { name: "Swiftness", image: "swiftness", rating: 90, text: "I pick up new concepts quickly. To build this site I learned both the 2D and WebGL canvas contexts." },
      { name: "Curiosity", image: "curiosity", rating: 80, text: "I'm curious about new technologies and like to get my hands on them." },
      { name: "Knowledge", image: "knowledge", rating: 80, text: "I understand computers as systems and work comfortably with the fundamentals. Master of Computer Science, Arizona State University, With Distinction." },
      { name: "Personality", image: "personality", rating: 80, text: "Loyal, respectful and responsible. I value the team I work with as much as getting things done." },
    ],
  },
  {
    name: "SKILLS",
    items: [
      { name: "React", image: "react", text: "Component libraries, design systems and large applications, from Alfa-Bank to Beeline." },
      { name: "TypeScript", image: "typescript", text: "Migrated legacy JavaScript to TypeScript with clear separation of concerns and 90%+ test coverage." },
      { name: "UI Architecture", image: "ui-architecture", text: "Framework-agnostic core logic, business rules kept apart from the UI, and Clean Architecture." },
      { name: "Testing", image: "testing", text: "Test-driven development with Jest, Vitest and Playwright. Kept 95% coverage on an RPA product." },
      { name: "Node.js & Python", image: "backend", text: "Backend services, REST and GraphQL APIs, plus scripts for automation and data analysis." },
      { name: "WebGL", image: "webgl", text: "Raw shaders and post-processing, like the screen you're looking at." },
      { name: "AI & Automation", image: "ai", text: "AI-assisted development with Claude Code, plus browser and workflow automation." },
    ],
  },
  {
    name: "PROJECTS",
    items: [
      { name: "Hao-shuo-de", image: "hao-shuo-de", url: "https://haoshuode.com", text: "My current project: real Mandarin boiled down to the simplest version that still works." },
      { name: "Pictures of You", image: "pictures-of-you", url: "https://kino6052.github.io/picturesOfYou/", text: "My final computer graphics project, which took me through WebGL from the bottom up to post-processing." },
      { name: "Shmetterling", text: "Built at the 2015 Local Hack Day. It creates music video radio stations using the Spotify and YouTube APIs." },
      { name: "FeedMeWell", text: "An app that orders food from local restaurants based on your calorie needs." },
      { name: "CashtagCU", image: "cashtagcu", text: "My first Three.js project, using the CSS3D renderer to place tiles of tweets in 3D space." },
      { name: "iGEM 2014", text: "A website for the synthetic biology competition, built to display in a wiki format for easy editing." },
    ],
  },
  {
    name: "CONTACT",
    items: [
      { name: "Website", url: "https://kino6052.github.io", text: "My resume, projects and writing." },
      { name: "Email", url: "mailto:kirill.novik.csci@gmail.com", text: "kirill.novik.csci@gmail.com" },
      { name: "GitHub", url: "https://github.com/kino6052", text: "github.com/kino6052" },
    ],
  },
];

export const title = "KIRILL NOVIK // TERMINAL";
