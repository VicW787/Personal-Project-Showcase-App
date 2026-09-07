# Coffee R Us — Admin Portal

A single page application for a small coffee shop, built with React and React Router for the C5M8 summative assessment.

Customers browse the coffee and search it by name or origin. An administrator adds new coffee through a form, and edits the price or description of anything already in the shop. Data is stored in db.json and served by json-server, so changes stay put between refreshes.

Install once:

bash
npm install

Then start two terminals. The app needs both running at the same time.

Terminal 1 — the backend:

bash
npm run server

Serves db.json at <http://127.0.0.1:4000>.
If the app says "Failed to fetch", check that json-server is still running. On WSL, use 127.0.0.1 rather than the localhost.

#### Terminal 2 — the app
1) npm run dev
2) Open the address Vite prints, in this case: <http://localhost:5173>.

#### To run the tests
1) bash
2) npm test


#### Styling
Plain CSS, hand-written, all of it in src/index.css. No Tailwind, Bootstrap or any other framework.

The colours come from the mock-up design document and are set as CSS custom properties at the top of the file, so the whole palette can be changed from one place:

Layout is CSS Grid. The shop page uses repeat(auto-fit, minmax(180px, 1fr)) for the card grid, so the number of columns adjusts to the screen width on its own.
One media query at the bottom of the file moves the sidebar above the grid on narrow screens.
Font used is Arial, matching the mock-up.
