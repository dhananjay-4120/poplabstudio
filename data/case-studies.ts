export interface CaseStudyMetric {
  value: string;
  label: string;
  sublabel?: string;
  isHero?: boolean;
}

export interface CaseStudyRow {
  values: string[];
  isWinner?: boolean;
}

export interface CaseStudyTable {
  headers: string[];
  rows: CaseStudyRow[];
}

export interface CaseStudy {
  slug: string;
  index: string;
  title: string;
  italicAccent: string;
  categoryTag: string;
  filterCategory: 'all' | 'meta' | 'google' | 'b2b' | 'd2c';
  dateLabel: string;
  clientType: string;
  heroLede: string;
  metrics: CaseStudyMetric[];
  theThinking: {
    headline: string;
    paragraphs: string[];
    pullQuote: string;
  };
  executionPoints: string[];
  proofTable?: CaseStudyTable;
  proofImage?: string;
  proofCaption?: string;
  prevSlug: string;
  prevTitle: string;
  nextSlug: string;
  nextTitle: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'bakery',
    index: '01 / 08',
    title: 'Premium dessert-first',
    italicAccent: 'bakery',
    categoryTag: 'Meta Ads · Premium D2C · F&B',
    filterCategory: 'meta',
    dateLabel: 'DEC 2025',
    clientType: 'D2C BRAND · META PURCHASE CAMPAIGNS',
    heroLede:
      'How five product-led Meta purchase campaigns generated ₹24.72L at 4.10x blended ROAS by isolating hero SKUs from entry-level funnel feeders.',
    metrics: [
      { value: '₹24.72L', label: 'Purchase value', isHero: true },
      { value: '4.10x', label: 'Blended ROAS', isHero: true },
      { value: '6,844', label: 'Website purchases' },
      { value: '₹190', label: 'Cost per purchase' },
    ],
    theThinking: {
      headline: 'Five product campaigns instead of one umbrella - keeping the algorithm honest.',
      paragraphs: [
        'The bakery wasn\'t an awareness problem. They had strong word-of-mouth, repeat buyers, and a working storefront with Meta Pixel already collecting event telemetry. The challenge was whether paid acquisition could become a predictable third revenue channel: profitable enough to justify aggressive spend and reliable enough to forecast kitchen prep.',
        'We rejected the standard agency template of a single generic umbrella campaign. When you lump all products into one ad set, Meta\'s algorithm inevitably dumps 80% of budget into whatever gets the cheapest click—often a low-margin impulse item—leaving higher-margin hero SKUs starved.',
        'Instead, we architected five isolated purchase-objective campaigns, one per product line. Budget was weighted by historical sales velocity and AOV. Broad targeting handled algorithmic discovery, custom purchaser lookalikes drove mid-funnel expansion, and dynamic remarketing recaptured cart abandoners. Remarketing did the heavy lifting, as it always does for high-loyalty food brands.',
      ],
      pullQuote:
        'Five product campaigns instead of one umbrella - so the algorithm stayed honest about what actually sells.',
    },
    executionPoints: [
      'Five product-led purchase campaigns instead of one umbrella, preventing algorithmic budget cannibalization',
      'Founder-led kitchen video creatives decisively outperformed polished studio reels (trust signal > food porn)',
      'Budget allocation dynamically weighted by sales velocity and gross margin contribution, never split evenly',
      'UGC tasting reviews and carousel bundles reserved for retargeting; single high-contrast static shots for cold testing',
      'Entry-product campaign run with a low ticket size to acquire first-time buyers who convert to repeat customers',
    ],
    proofImage: '/case-studies/meta_ads_manager_proof.webp',
    proofCaption: 'Meta Ads Manager - verified purchase campaigns overview, Dec 2025. Account name redacted for confidentiality.',
    prevSlug: 'd2c',
    prevTitle: 'D2C store at scale',
    nextSlug: 'jewellery',
    nextTitle: 'Ultra-luxury jewellery house',
  },
  {
    slug: 'jewellery',
    index: '02 / 08',
    title: 'Ultra-luxury jewellery',
    italicAccent: 'house',
    categoryTag: 'Google Search · Ultra-Luxury · Buyer Filter',
    filterCategory: 'google',
    dateLabel: 'AUG–SEP 2025',
    clientType: 'LUXURY D2C · GOOGLE SEARCH',
    heroLede:
      'Using Google Search as an intentional buyer filter rather than a mass-traffic funnel for high-ticket heritage pieces with ₹50L+ order values.',
    metrics: [
      { value: '₹98.6K', label: 'Total spend' },
      { value: '157', label: 'High-intent clicks' },
      { value: '₹628', label: 'Avg CPC (Deliberate)' },
      { value: '5–7', label: 'Qualified consults', isHero: true },
    ],
    theThinking: {
      headline: 'The high click cost wasn\'t a leak. It was the qualification fee.',
      paragraphs: [
        'For a luxury house with ₹50L+ bridal and bespoke ticket sizes, volume is an operational liability, not a virtue. Cheap ₹15 clicks flood the client\'s concierge team with students, mood-board curators, and window shoppers who admire the craftsmanship but possess zero purchasing power.',
        'We inverted standard search practice. Instead of bidding on broad keywords like "gold necklace designs," we scoped Google Search strictly to bridal-heritage, bespoke consultation, and heirloom jadau queries. Broad curiosity search queries were aggressively negated from day one.',
        'The landing experience skipped catalog browsing entirely and routed visitors directly into a private showroom consultation scheduling flow. The ₹628 CPC was welcomed: it filtered out casual browsers and delivered 157 ultra-serious visitors, resulting in 5–7 high-ticket private consultations.',
      ],
      pullQuote:
        'The high click cost wasn\'t a leak. It was the qualification fee.',
    },
    executionPoints: [
      'Keyword scope restricted strictly to brand, bridal heritage, and bespoke custom commissions',
      'Exhaustive negative-keyword list maintained daily against aspirational non-buyer intent',
      'High CPCs accepted as a deliberate qualification filter to protect showroom concierge time',
      'Landing route bypassed product browsing in favor of private appointment scheduling',
      'Offline Conversion Import (OCI) fed qualified showroom consult values back to Google Smart Bidding',
      'Weekly search-term audit ensuring zero rupee spend on generic jewellery queries',
    ],
    prevSlug: 'bakery',
    prevTitle: 'Dessert bakery',
    nextSlug: 'travel-europe',
    nextTitle: 'Travel platform, Europe push',
  },
  {
    slug: 'travel-europe',
    index: '03 / 08',
    title: 'Travel platform,',
    italicAccent: 'Europe push',
    categoryTag: 'Meta Ads · Travel · Full-Funnel',
    filterCategory: 'meta',
    dateLabel: 'JAN 2026',
    clientType: 'THREE-STAGE CONVERSION FUNNEL',
    heroLede:
      'A synchronized three-stage Meta funnel delivering 11.4L impressions and 60 qualified travel inquiries at ₹131 CPL against a ₹130 target.',
    metrics: [
      { value: '₹13K', label: 'Total spend' },
      { value: '11.4L', label: 'Verified impressions' },
      { value: '60', label: 'Qualified leads', isHero: true },
      { value: '₹131', label: 'CPL vs ₹130 target' },
    ],
    theThinking: {
      headline: 'Nobody books a European itinerary off a single impulse ad.',
      paragraphs: [
        'High-ticket international vacations are considered purchases requiring sustained emotional buy-in and brand trust. Running single-stage instant lead ads directly to cold audiences burns cash because users will not hand over contact details without established credibility.',
        'We structured an honest three-stage sequential architecture: Stage 1 (Awareness) built large, cost-effective audience pools using scenic cinematic video cutdowns. Stage 2 (Traffic & Engagement) filtered for active vacation planners by routing them to detailed itinerary breakdowns.',
        'Stage 3 (Lead Generation) harvested the warm retargeting pool created by the first two stages. Because prospects had already spent minutes exploring itineraries, lead quality was high and form completion friction was welcomed.',
      ],
      pullQuote:
        'Three concurrent campaigns sharing creative DNA, keeping CPL stable while impressions scaled past 11 Lakh.',
    },
    executionPoints: [
      'Three concurrent campaigns - awareness, traffic, leads - sharing creative DNA with isolated KPIs',
      'Awareness layer utilized 15-second cinematic video reels optimized for 3-second continuous views',
      'Mid-funnel traffic campaign built high-intent custom audiences used as exclusive retargeting seeds',
      'Lead-gen layer implemented multi-step qualifying questions (travel month, party size, budget expectation)',
      'Rigorous daily pacing keeping blended lead acquisition cost locked at ₹131.69',
    ],
    proofTable: {
      headers: ['Stage', 'Spend', 'Result', 'Efficiency Metric'],
      rows: [
        { values: ['Awareness (Cold Reach)', '₹2,082', '11.8L impressions', '₹2.16 CPM'] },
        { values: ['Traffic (Itinerary Hub)', '₹3,086', '1,156 landing views', '₹2.67 / view'] },
        { values: ['Lead Gen (Retargeting)', '₹7,901', '60 verified leads', '₹131.69 CPL'], isWinner: true },
      ],
    },
    prevSlug: 'jewellery',
    prevTitle: 'Luxury jewellery house',
    nextSlug: 'interiors',
    nextTitle: 'Residential interiors firm',
  },
  {
    slug: 'interiors',
    index: '04 / 08',
    title: 'Residential interiors',
    italicAccent: 'firm',
    categoryTag: 'Google Search · Local Services · Lead Gen',
    filterCategory: 'google',
    dateLabel: 'SEP–OCT 2025',
    clientType: 'LOCAL ARCHITECTURAL & INTERIOR DESIGN',
    heroLede:
      'Generating 4 confirmed high-ticket interior design commissions under a tight ₹15K monthly Google Search constraint through radical geographical precision.',
    metrics: [
      { value: '₹14.9K', label: 'Total monthly spend' },
      { value: '78', label: 'Qualified clicks' },
      { value: '0.98%', label: 'Strict intent CTR' },
      { value: '4', label: 'Confirmed consults', isHero: true },
    ],
    theThinking: {
      headline: 'Precision over reach when monthly capital is strictly capped.',
      paragraphs: [
        'Interior design commissions require months of lead time and involve large budget outlays. With an experimental budget capped under ₹15,000 per month, there was zero margin for wasted clicks or algorithmic experimentation.',
        'We imposed strict geo-fencing limited exclusively to premier pin codes within a 15-kilometer radius of the studio\'s flagship projects. We mapped negative keywords against DIY queries, student internships, and budget renovation searches.',
        'The daily budget was capped and paced across all 30 days to prevent front-loaded exhaustion. Conversions were tracked directly via phone call extensions and multi-step intake forms, resulting in 11 serious inquiries and 4 signed design contracts.',
      ],
      pullQuote:
        'Eleven inquiries converted to four confirmed design consultations in a single month.',
    },
    executionPoints: [
      'Geo-targeting restricted exclusively to high-net-worth neighborhoods within service radius',
      'Negative keyword list actively blocked terms like "cheap", "diy", "free estimate", and "carpenter near me"',
      'Call extensions and WhatsApp direct buttons integrated for instant mobile qualification',
      'GTM tracking configured for both form completions and telephone call duration (>60 seconds)',
      'Even daily pacing ensuring consistent visibility across peak evening decision hours',
    ],
    prevSlug: 'travel-europe',
    prevTitle: 'Europe travel push',
    nextSlug: 'wellness',
    nextTitle: 'Women\'s wellness brand',
  },
  {
    slug: 'wellness',
    index: '05 / 08',
    title: 'Women\'s wellness',
    italicAccent: 'brand',
    categoryTag: 'Meta Ads · Wellness · Creative Testing',
    filterCategory: 'meta',
    dateLabel: 'MAY 2025',
    clientType: 'WELLNESS D2C · CREATIVE A/B SPRINT',
    heroLede:
      'How isolating creative variation across 4 simultaneous ad formats unlocked a $0.45 CPL and generated 221 qualified patient leads.',
    metrics: [
      { value: '$0.45', label: 'Winning CPL', isHero: true },
      { value: '221', label: 'Leads from winner' },
      { value: '~3x', label: 'Volume vs runner-up' },
      { value: '4', label: 'Formats tested in parallel' },
    ],
    theThinking: {
      headline: 'Audience targeting plateaus quickly. Creative testing doesn\'t.',
      paragraphs: [
        'Wellness and healthcare booking decisions are anchored in emotional relief, not intellectual comparison. Most agency competitors in this category default to generic discount angles ("Get 20% off your first consult"), attracting low-commitment bargain hunters.',
        'We formulated four creative formats running in parallel against an identical broad demographic audience: static typographic proof, customer testimonial, carousel breakdown, and founder-led clinical empathy video.',
        'The founder-led empathy video addressing chronic back and posture pain completely dominated the sprint: it dropped CPL to $0.45 and generated nearly three times more bookings than the nearest runner-up.',
      ],
      pullQuote:
        'Audience targeting plateaus quickly. Creative testing doesn\'t.',
    },
    executionPoints: [
      'Four creative formats tested simultaneously with identical copy, CTA, and landing page destination',
      'Single consolidated audience eliminating ad set auction overlap and budget skew',
      'Web-based lead forms prioritized over in-app instant forms to ensure genuine patient intent',
      'Winning creative scaled immediately to 80% budget allocation while pausing bottom 2 formats',
    ],
    proofTable: {
      headers: ['Creative Format Tested', 'Leads Generated', 'Cost per Lead (CPL)'],
      rows: [
        { values: ['Format 01 · Static Typographic Proof', '79', '$0.52'] },
        { values: ['Format 02 · Short Testimonial Cut', '32', '$0.63'] },
        { values: ['Format 03 · Feature Carousel', '44', '$0.52'] },
        { values: ['Format 04 · Clinical Empathy Video', '221', '$0.45'], isWinner: true },
      ],
    },
    prevSlug: 'interiors',
    prevTitle: 'Residential interiors firm',
    nextSlug: 'holiday',
    nextTitle: 'Holiday packages platform',
  },
  {
    slug: 'holiday',
    index: '06 / 08',
    title: 'Holiday packages',
    italicAccent: 'platform',
    categoryTag: 'Search + Display · Travel · Two-Channel',
    filterCategory: 'google',
    dateLabel: 'OCT 2025',
    clientType: 'MULTI-CHANNEL SEARCH & DISPLAY',
    heroLede:
      'Coordinating Google Search with intent-driven Display remarketing to capture high-intent domestic travelers at 19% below target CPL.',
    metrics: [
      { value: '70', label: 'Total qualified leads', isHero: true },
      { value: '₹121', label: 'Blended CPL' },
      { value: '19%', label: 'Below target acquisition cost' },
      { value: '70%', label: 'Mobile device conversions' },
    ],
    theThinking: {
      headline: 'Search captures active demand; Display protects against competitor poaching.',
      paragraphs: [
        'Search and Display are complementary engines. Search intercepts users when they explicitly type high-purchase queries like "Kerala family package from Delhi." But vacation research takes days, during which prospects compare dozens of competing options.',
        'We used Search on exact and phrase match to capture initial high-intent interest. Simultaneously, we built dynamic remarketing display lists that served responsive banner reminders across travel blogs and flight status portals.',
        'The coordinated two-channel strategy prevented drop-off and yielded 70 confirmed travel bookings at ₹121 blended CPL—19% below the brand\'s historical benchmark.',
      ],
      pullQuote:
        'Search and Display aren\'t substitutes - they\'re complementary levers that multiply each other.',
    },
    executionPoints: [
      'Search campaigns scoped strictly to high-purchase intent destination keywords',
      'Negative list eliminated non-paying queries ("government tour bus", "flight only", "free cancellation")',
      'Mobile-first landing page with one-tap WhatsApp chat generating 70% of total leads',
      'Display remarketing frequency-capped at 3 impressions per user/day to avoid ad fatigue',
      'Smart bidding transitioned to Maximize Conversions once baseline data threshold was met',
    ],
    proofTable: {
      headers: ['Channel Channel', 'Conversions Logged', 'Cost per Lead (CPL)'],
      rows: [
        { values: ['Google Search (Exact & Phrase)', '42', '₹132'] },
        { values: ['Google Display (Remarketing Pool)', '28', '₹108'] },
        { values: ['Blended Multi-Channel Total', '70', '₹121'], isWinner: true },
      ],
    },
    prevSlug: 'wellness',
    prevTitle: 'Women\'s wellness brand',
    nextSlug: 'linkedin',
    nextTitle: 'Enterprise software, CEO-led',
  },
  {
    slug: 'linkedin',
    index: '07 / 08',
    title: 'Enterprise software,',
    italicAccent: 'CEO-led',
    categoryTag: 'LinkedIn Outreach · B2B Enterprise',
    filterCategory: 'b2b',
    dateLabel: 'DEC 2023',
    clientType: '6-WEEK CEO OUTREACH PROGRAM',
    heroLede:
      'Personalized executive-to-executive outreach program yielding a 54.7% connection rate and 97 enterprise decision-maker meetings without generic automation spam.',
    metrics: [
      { value: '867', label: 'Contacts enrolled' },
      { value: '54.7%', label: 'Connection acceptance rate', isHero: true },
      { value: '53', label: 'Direct qualified pipeline' },
      { value: '97', label: 'Booked executive meetings' },
    ],
    theThinking: {
      headline: 'The bot handled the boring part. The CEO handled the relationship part.',
      paragraphs: [
        'Enterprise SaaS deals cannot be closed with blast cold emails or generic LinkedIn inMail spam. C-level executives in logistics and supply chain ignore templated messages because they smell junior SDR automation from the first sentence.',
        'We designed a high-craft executive dialogue model where outreach came directly from the founder\'s profile. Targeting was sculpted using Sales Navigator around discrete enterprise triggers: recent warehouse tech upgrades, ERP migrations, and regional expansion announcements.',
        'Cadence was automated up until the exact moment of a reply. Once a prospect engaged, automation paused instantly and the conversation transferred to human scheduling. The result: 97 enterprise meetings and over 50 pipeline opportunities.',
      ],
      pullQuote:
        'The bot did the boring part. The CEO did the relationship part.',
    },
    executionPoints: [
      'Segmented account lists built across enterprise logistics, warehouse automation, and retail supply chain',
      'Three-tier message sequence: context-driven opener, zero-fluff case study reference, soft diagnostic invitation',
      'Automated pauses triggered immediately upon prospect response to protect personal rapport',
      'Daily monitoring against LinkedIn platform safety thresholds to prevent profile flagging',
      'Direct synchronization between LinkedIn inbox and client HubSpot CRM',
    ],
    prevSlug: 'holiday',
    prevTitle: 'Holiday packages platform',
    nextSlug: 'd2c',
    nextTitle: 'D2C store at scale',
  },
  {
    slug: 'd2c',
    index: '08 / 08',
    title: 'D2C store at',
    italicAccent: 'scale',
    categoryTag: 'Shopify · D2C · Scaling',
    filterCategory: 'd2c',
    dateLabel: 'MAY 2026',
    clientType: 'FULL-FUNNEL COMMERCE SCALING',
    heroLede:
      'Holding conversion rate steady at 2.19% while scaling a Shopify storefront to ₹1.14M in monthly sales and 536 profitable orders.',
    metrics: [
      { value: '₹1.14M', label: 'Total monthly sales', isHero: true },
      { value: '24.4K', label: 'High-intent store sessions' },
      { value: '536', label: 'Fulfilled orders' },
      { value: '2.19%', label: 'Stable conversion rate' },
    ],
    theThinking: {
      headline: 'Scaling spend is where most brands lose the plot - pouring on budget while conversion rate collapses.',
      paragraphs: [
        'The traditional pitfall in e-commerce scaling is chasing vanity traffic. Marketers double their daily ad budget, watch cost per click drop, and celebrate reach—while conversion rate quietly craters from 2.5% down to 0.8%, destroying unit economics.',
        'Our focus was the exact opposite: guarding conversion rate as traffic volume scaled from 5,000 to 24,400 sessions. We paired Meta Advantage+ shopping campaigns with rigorous checkout rate optimization, mobile page speed compression, and post-purchase bundle upsells.',
        'Because customer acquisition and landing page mechanics were optimized together, the store generated ₹1.14M in verified sales across 30 days while protecting net contribution margin.',
      ],
      pullQuote:
        'Steady conversion at scale is the unglamorous proof that the full-funnel system is actually working.',
    },
    executionPoints: [
      'Meta Advantage+ campaigns deployed with catalog feeds and curated hero creative carousels',
      'Shopify storefront checkout friction eliminated (prefilled address, UPI 1-click checkout)',
      'AOV boosted via post-purchase upsell mechanics without introducing cart friction',
      'Server-side Conversions API (CAPI) matching 95%+ of purchase events back to Meta ad manager',
      'Continuous weekly monitoring of marginal ROAS to prevent unprofitable budget bleeding',
    ],
    proofImage: '/case-studies/case1_shopify_70.8L.webp',
    proofCaption: 'Shopify verified revenue dashboard - scaling phase showing consistent sales velocity.',
    prevSlug: 'linkedin',
    prevTitle: 'Enterprise software, CEO-led',
    nextSlug: 'bakery',
    nextTitle: 'Premium dessert-first bakery',
  },
];
