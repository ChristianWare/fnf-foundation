/**
 * What belongs on each public page. Rendered by PagePlaceholder until the
 * page is designed for a client. Written for black car / limo operators:
 * the sections are the ones that book rides and rank in search.
 */

export type GuideSection = { name: string; note: string };
export type GuideLink = { label: string; href: string };
export type PageGuide = {
  title: string;
  route: string;
  purpose: string;
  sections: GuideSection[];
  /** File that drives the page's content, if it's data-driven */
  data?: string;
  links?: GuideLink[];
};

export const guides = {
  home: {
    title: "Home",
    route: "/",
    purpose:
      "The front door. Its jobs are to say who you are and where you operate, prove you're legitimate, and get the visitor to book or call. Everything else lives on its own page.",
    sections: [
      {
        name: "Hero",
        note: "Company name, one line that says what and where (\"Private car service in Phoenix & Scottsdale\"), a primary button to /book and a secondary tel: link. No slideshow, no video autoplay.",
      },
      {
        name: "Trust strip",
        note: "Years in business, rides completed, star rating with review count, licensed and insured. Real numbers only; a fake-looking number costs more than no number.",
      },
      {
        name: "Services overview",
        note: "One card per service (airport, corporate, weddings and events, hourly), each linking to its /services/[slug] page. Two sentences per card.",
      },
      {
        name: "How it works",
        note: "Three steps: get a price online, confirm, chauffeur arrives. Say plainly that riders can book at 11pm without calling anyone.",
      },
      {
        name: "Fleet preview",
        note: "Three or four vehicle classes with passenger and luggage counts, linking to /fleet. Real photos of the actual vehicles.",
      },
      {
        name: "Airports and areas",
        note: "The airports and cities served, each linked to its page. This section is what search engines read to understand where you operate.",
      },
      {
        name: "Testimonials",
        note: "Three real reviews with first name, city, and the occasion. Pull from Google if possible.",
      },
      {
        name: "Corporate callout",
        note: "One paragraph for office managers and travel coordinators, linking to /corporate-accounts.",
      },
      {
        name: "FAQ",
        note: "Five or six booking questions (pricing, cancellations, flight delays, car seats, gratuity) with FAQ schema.",
      },
      {
        name: "Final CTA",
        note: "Book now plus the phone number, large.",
      },
    ],
    data: "src/lib/data.ts (homeQuestions), src/lib/services.ts, src/lib/cities.ts",
  },

  about: {
    title: "About",
    route: "/about",
    purpose:
      "Who is behind the company. Prospects read this to decide whether to trust you with a 5am airport run or a wedding day, so it has to be specific to this operator.",
    sections: [
      {
        name: "Intro",
        note: "Founder, year founded, and why the company exists, in two or three plain sentences. No \"luxury, comfort, reliability\" boilerplate.",
      },
      {
        name: "What makes the service different",
        note: "Chauffeur vetting, vehicle standards, on-time record, how riders are kept informed. Concrete practices, not adjectives.",
      },
      {
        name: "Credentials",
        note: "State livery / TCP / DOT numbers, insurance coverage, airport permits. The specifics are what make this page believable.",
      },
      {
        name: "Team",
        note: "Chauffeurs and dispatch with real photos and first names.",
      },
      {
        name: "Fleet and standards",
        note: "How vehicles are maintained, inspected, and cleaned between rides, with a link to /fleet.",
      },
      {
        name: "Community and partners",
        note: "Hotels, venues, and events you regularly serve. Doubles as proof and as local relevance for search.",
      },
      {
        name: "CTA",
        note: "Book or contact.",
      },
    ],
  },

  services: {
    title: "Services",
    route: "/services",
    purpose:
      "The index of everything you offer. Each service gets its own page; this one only routes people to the right one.",
    sections: [
      {
        name: "Intro",
        note: "One paragraph on who you serve and how booking works.",
      },
      {
        name: "Service cards",
        note: "One card per entry in services.ts: name, who it's for, and a link to the detail page.",
      },
      {
        name: "Not sure which service?",
        note: "A line pointing to /contact or /book for a quick quote.",
      },
      {
        name: "Corporate callout",
        note: "Link to /corporate-accounts for businesses.",
      },
    ],
    data: "src/lib/services.ts",
  },

  serviceDetail: {
    title: "Service detail",
    route: "/services/[slug]",
    purpose:
      "One page per service, written in the words riders search for (\"airport car service Phoenix\"). Each is a landing page that must stand on its own.",
    sections: [
      {
        name: "H1 and subhead",
        note: "The search phrase as the headline, with the city. Booking button above the fold.",
      },
      {
        name: "Who it's for and typical trips",
        note: "Two or three concrete scenarios.",
      },
      {
        name: "How this service works",
        note: "Pickup procedure, wait time, flight tracking, hourly minimums, whatever applies here.",
      },
      {
        name: "Pricing approach",
        note: "Flat rate, per hour, or \"from $X\", what's included, gratuity policy. Vague pricing loses the booking.",
      },
      {
        name: "Vehicles used",
        note: "Link to the two fleet pages riders usually pick for this service.",
      },
      {
        name: "Proof",
        note: "One review specific to this service.",
      },
      {
        name: "FAQ",
        note: "Four to six questions with FAQ schema.",
      },
      {
        name: "Related pages",
        note: "Routes, airports, and cities that pair with this service, for internal linking.",
      },
      {
        name: "Book CTA",
        note: "Repeat the booking button at the end.",
      },
    ],
    data: "src/lib/services.ts (one entry per page)",
  },

  fleet: {
    title: "Fleet",
    route: "/fleet",
    purpose:
      "Vehicle classes with capacity and luggage counts. Riders pick a vehicle here before they book, so the numbers matter more than the prose.",
    sections: [
      {
        name: "Intro",
        note: "One paragraph on the fleet and how vehicles are assigned.",
      },
      {
        name: "Vehicle cards",
        note: "One per class: real photo, passenger count, luggage count, best for, link to the detail page.",
      },
      {
        name: "Book CTA",
        note: "Link to /book.",
      },
    ],
    data: "src/lib/data.ts (fleetData)",
  },

  fleetDetail: {
    title: "Vehicle detail",
    route: "/fleet/[slug]",
    purpose: "One page per vehicle class.",
    sections: [
      {
        name: "Photos",
        note: "Interior and exterior of the actual vehicle. Never stock.",
      },
      {
        name: "Specs",
        note: "Passengers, luggage, amenities (Wi-Fi, water, child seats on request).",
      },
      {
        name: "Best for",
        note: "Occasions this class suits, linking to the matching service pages.",
      },
      {
        name: "Pricing note",
        note: "Hourly minimum or typical airport rate.",
      },
      {
        name: "Book this vehicle",
        note: "Booking button, ideally with the vehicle preselected.",
      },
    ],
    data: "src/lib/data.ts (fleetData, one entry per page)",
  },

  airports: {
    title: "Airports",
    route: "/airports",
    purpose:
      "Every airport you serve, each linking to its own page. Airport transfers are the highest-intent searches in this industry, so this hub earns its place.",
    sections: [
      {
        name: "Intro",
        note: "One paragraph: airports served, meet-and-greet, flight tracking.",
      },
      {
        name: "Airport cards",
        note: "Name, code, drive time from the metro, link to the detail page.",
      },
      {
        name: "Private aviation",
        note: "Link to /airports/private-aviation for FBO pickups.",
      },
      {
        name: "Book CTA",
        note: "Link to /book.",
      },
    ],
    data: "src/lib/airports.ts",
  },

  airportDetail: {
    title: "Airport detail",
    route: "/airports/[slug]",
    purpose: "One page per airport.",
    sections: [
      {
        name: "H1 and subhead",
        note: "\"[Airport] Car Service\" with the booking button above the fold.",
      },
      {
        name: "Pickup procedure",
        note: "Meet-and-greet versus curbside, terminals, doors, where the chauffeur waits. This is the content riders actually need.",
      },
      {
        name: "Flight tracking and delays",
        note: "What happens when the flight is late.",
      },
      {
        name: "Early morning and late night",
        note: "Availability and how to book a 4am pickup.",
      },
      {
        name: "Pricing from popular suburbs",
        note: "A short table linking to the route pages.",
      },
      {
        name: "Group and crew transfers",
        note: "Sprinter and coach options.",
      },
      {
        name: "FAQ",
        note: "With FAQ schema.",
      },
      {
        name: "Book CTA",
        note: "Repeat at the end.",
      },
    ],
    data: "src/lib/airports.ts (one entry per page)",
  },

  privateAviation: {
    title: "Private aviation",
    route: "/airports/private-aviation",
    purpose:
      "FBO and charter passengers have different pickup rules and expect more discretion.",
    sections: [
      {
        name: "Intro",
        note: "The FBOs you serve, by airport.",
      },
      {
        name: "Planeside pickup rules",
        note: "Which FBOs allow tarmac access and what they require from the chauffeur.",
      },
      {
        name: "Discretion and security",
        note: "How passenger details are handled.",
      },
      {
        name: "Vehicles",
        note: "The classes typically used for private aviation.",
      },
      {
        name: "Contact or book",
        note: "Many of these are booked by assistants; offer a phone number and a direct email as well as the booking button.",
      },
    ],
  },

  locations: {
    title: "Service areas",
    route: "/locations",
    purpose:
      "Every city you can make locally real gets a page. Thin, duplicated city pages hurt rankings, so this list should only contain cities with genuine local content.",
    sections: [
      {
        name: "Intro",
        note: "One paragraph on the metro you cover.",
      },
      {
        name: "City list",
        note: "Name plus one line, linking to each city page.",
      },
      {
        name: "Long-distance runs",
        note: "City-to-city trips (e.g. Phoenix to Tucson), linking to route pages.",
      },
      {
        name: "Book CTA",
        note: "Link to /book.",
      },
    ],
    data: "src/lib/cities.ts",
  },

  cityDetail: {
    title: "City detail",
    route: "/locations/[city]",
    purpose:
      "One page per city, and it must be locally specific. A 400-word template with the city name swapped is a doorway page.",
    sections: [
      {
        name: "H1 and subhead",
        note: "\"Car Service in [City]\" with the booking button above the fold.",
      },
      {
        name: "Local specifics",
        note: "Neighborhoods, hotels, resorts, and venues you actually serve. Drive times to each airport.",
      },
      {
        name: "Routes from this city",
        note: "Links to the [City] to [Airport] route pages.",
      },
      {
        name: "Services offered here",
        note: "Links to the relevant service pages.",
      },
      {
        name: "Local proof",
        note: "A review from a customer in this city.",
      },
      {
        name: "FAQ",
        note: "With FAQ schema.",
      },
      {
        name: "Book CTA",
        note: "Repeat at the end.",
      },
    ],
    data: "src/lib/cities.ts (one entry per page)",
  },

  routes: {
    title: "Routes",
    route: "/routes",
    purpose:
      "\"Suburb to airport\" pages are the single most common booking search pattern. This hub lists them.",
    sections: [
      {
        name: "Intro",
        note: "One paragraph on flat-rate airport routes.",
      },
      {
        name: "Route list",
        note: "Origin, destination, drive time, price from, link to each route page.",
      },
      {
        name: "Book CTA",
        note: "Link to /book.",
      },
    ],
    data: "src/lib/routes.ts",
  },

  routeDetail: {
    title: "Route detail",
    route: "/routes/[slug]",
    purpose: "One page per route.",
    sections: [
      {
        name: "H1 and subhead",
        note: "\"[Origin] to [Destination] Car Service\" with the booking button above the fold.",
      },
      {
        name: "The numbers",
        note: "Drive time, distance, price from, what's included.",
      },
      {
        name: "Pickup details",
        note: "Link to the destination airport page for terminals and doors.",
      },
      {
        name: "Vehicle options",
        note: "Sedan, SUV, Sprinter with prices for this route.",
      },
      {
        name: "Book CTA",
        note: "Booking button with the route prefilled if possible.",
      },
    ],
    data: "src/lib/routes.ts (one entry per page)",
  },

  corporateAccounts: {
    title: "Corporate accounts",
    route: "/corporate-accounts",
    purpose:
      "Sells the account, not a ride. The buyer is an office manager or travel coordinator who cares about billing, reliability, and not having to think about it.",
    sections: [
      {
        name: "Hero",
        note: "Who it's for and a button that scrolls to the inquiry form.",
      },
      {
        name: "Benefits",
        note: "Monthly invoicing, a booking portal for staff, duty of care, consistent chauffeurs, receipts and reporting.",
      },
      {
        name: "How it works",
        note: "Inquiry, approval, the team is invited to the portal. Three steps.",
      },
      {
        name: "Who you work with",
        note: "Industries or client logos, if you have permission.",
      },
      {
        name: "Proof",
        note: "One corporate testimonial.",
      },
      {
        name: "Inquiry form",
        note: "The working form below. Submissions land in Admin → Corporate → Inquiries.",
      },
      {
        name: "FAQ",
        note: "Billing terms, minimums, cancellation policy for accounts.",
      },
    ],
    links: [{ label: "Corporate portal (for approved accounts)", href: "/corporate" }],
  },

  contact: {
    title: "Contact",
    route: "/contact",
    purpose:
      "Every way to reach you, plus the form. Keep the phone number large; most contact-page visitors want to call.",
    sections: [
      {
        name: "Contact details",
        note: "Phone (tel: link), email, office hours, address. These come from Admin → Company Settings.",
      },
      {
        name: "Contact form",
        note: "The working form below. Submissions email CONTACT_EMAIL from .env.",
      },
      {
        name: "Map",
        note: "Embedded map of the office or service area.",
      },
      {
        name: "Just want a ride?",
        note: "A line pointing to /book.",
      },
      {
        name: "Corporate",
        note: "Link to /corporate-accounts.",
      },
    ],
  },

  blog: {
    title: "Blog",
    route: "/blog",
    purpose:
      "Authority content: pricing questions, black car vs. rideshare comparisons, local guides, trust and operations. One post targets one question and links to one money page.",
    sections: [
      {
        name: "Post list",
        note: "The live list below comes from content/blog/*.mdx. Title, date, excerpt.",
      },
      {
        name: "Tags or categories",
        note: "Optional: pricing, comparisons, local guides, trust.",
      },
      {
        name: "Book CTA",
        note: "A quiet link to /book at the end.",
      },
    ],
    data: "content/blog/*.mdx (frontmatter: title, publishedAt, excerpt, tags, relatedLinkLabel, relatedLinkHref, draft)",
  },

  blogPost: {
    title: "Blog post",
    route: "/blog/[slug]",
    purpose: "One question, answered well, linking to one money page.",
    sections: [
      {
        name: "Title and date",
        note: "Plus the author card.",
      },
      {
        name: "Body",
        note: "H2s for each subquestion. Plain language, real numbers.",
      },
      {
        name: "Related link",
        note: "The one money page this post supports (from frontmatter).",
      },
      {
        name: "Book CTA",
        note: "At the end.",
      },
    ],
    data: "content/blog/[slug].mdx",
  },

  privacy: {
    title: "Privacy policy",
    route: "/privacy",
    purpose:
      "Required by Google sign-in, Stripe, and the app stores. Have a lawyer review it; the outline below is the minimum it needs to cover.",
    sections: [
      {
        name: "What you collect",
        note: "Booking details, contact info, payment (handled by Stripe), pickup locations, flight numbers.",
      },
      {
        name: "How it's used",
        note: "Fulfilling rides, receipts, trip notifications, support.",
      },
      {
        name: "Who it's shared with",
        note: "Chauffeurs (trip details only), Stripe, email and notification providers.",
      },
      {
        name: "Retention and deletion",
        note: "How long records are kept and how to request deletion.",
      },
      {
        name: "Cookies and analytics",
        note: "What's tracked and how to opt out.",
      },
      {
        name: "Contact",
        note: "Email for privacy requests.",
      },
    ],
  },

  terms: {
    title: "Terms of service",
    route: "/terms",
    purpose:
      "The booking terms riders agree to at checkout. The items below are the ones that cause disputes, so each needs a clear number.",
    sections: [
      {
        name: "Reservations and confirmation",
        note: "When a booking is confirmed and how riders are notified.",
      },
      {
        name: "Cancellations",
        note: "Windows and fees, by service type.",
      },
      {
        name: "No-shows and wait time",
        note: "Included wait time, per-minute charges after, when a no-show is called.",
      },
      {
        name: "Pricing",
        note: "Gratuity, tolls, airport fees, extra stops, overtime on hourly bookings.",
      },
      {
        name: "Damage and cleaning",
        note: "Fees and how they're assessed.",
      },
      {
        name: "Liability, delays, and weather",
        note: "What the company is and isn't responsible for.",
      },
      {
        name: "Corporate accounts",
        note: "Billing terms and payment due dates.",
      },
      {
        name: "Contact",
        note: "Where to send questions about these terms.",
      },
    ],
  },
} satisfies Record<string, PageGuide>;
