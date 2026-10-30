# GeoBlueBerry
A responsive, dependency-free website for a nine-orchard Georgian blueberry growing network.

## Development
Node.js 24 is available in the environment. Run `npm run dev` from this directory. The server binds to port 5173 (override with PORT).
Run `npm run check` for JavaScript syntax checks and `npm run build` to create the deployable static files in dist/.

## Content and launch notes
Orchard counts use the supplied total of nine. Regional pictures are illustrative AI-generated imagery, not verified photographs of GeoBlueBerry orchards. Harvest bars show a relative seasonal sequence, not confirmed dates.
The business owner supplied the claims of more than 600 tonnes of supply capacity and six years of market experience. Capacity is not presented as annual output or a confirmed shipment volume. Seasonal continuity is not a year-round fresh-supply promise.
Specific varieties, certifications, acreage, order volumes, pack formats and contact information require business confirmation before adding them.
The inquiry form validates input and downloads a text file locally; it does not deliver messages. Configure a real contact or submission service before launch.
AgriMap links open https://agrimap.pro. Its functionality is described using the supplied brief; no integration or data connection is established.
Images and the SVG logo are stored locally. System fonts provide a dependency-free rendering.

## Languages
English, Georgian and Russian are available through the header language selector, including on mobile. The selected language is saved in localStorage when available. Share links with ?lang=en, ?lang=ka or ?lang=ru to open a specific language; an explicit supported URL parameter takes precedence over the saved preference. English is the default. Translation copy lives in translations.js. Brand names remain unchanged. Form data is preserved when switching; exported inquiry labels and validation messages use the selected language.
