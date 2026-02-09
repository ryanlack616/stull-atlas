/**
 * Timeline Data — History of Ceramic Science
 *
 * ~160 events from 18,000 BCE to 2026 CE, organized by era.
 * Covers science, technology, publications, institutions, digital tools, and community.
 *
 * Significance levels:
 *   1 = Landmark / inflection point (paradigm shift)
 *   2 = Important (shaped the field)
 *   3 = Notable (contributed meaningfully)
 */

// ─── Types ─────────────────────────────────────────────────────────

export type EventCategory = 'science' | 'technology' | 'publication' | 'institution' | 'digital' | 'community'

export interface TimelineEvent {
  year: number
  endYear?: number
  approximate?: boolean
  title: string
  description: string
  category: EventCategory
  people?: string[]
  links?: { label: string; url: string }[]
  significance: 1 | 2 | 3
  inflectionPoint?: boolean
}

export interface Era {
  label: string
  start: number
  end: number
  color: string
}

export interface ThematicThread {
  theme: string
  description: string
  keyMoments: string[]
}

// ─── Helpers ───────────────────────────────────────────────────────

export function formatYear(year: number, approximate?: boolean): string {
  const abs = Math.abs(year)
  const formatted = abs >= 10000 ? abs.toLocaleString() : abs.toString()
  const prefix = approximate ? '~' : ''
  if (year < 0) return `${prefix}${formatted} BCE`
  if (year <= 500 && approximate) return `${prefix}${formatted} CE`
  return `${prefix}${formatted}`
}

// ─── Category Metadata ────────────────────────────────────────────

export const CATEGORY_META: Record<EventCategory, { label: string; color: string; icon: string }> = {
  science:     { label: 'Science',     color: '#3498db', icon: '🔬' },
  technology:  { label: 'Technology',  color: '#e67e22', icon: '⚙️' },
  publication: { label: 'Publication', color: '#9b59b6', icon: '📖' },
  institution: { label: 'Institution', color: '#2ecc71', icon: '🏛️' },
  digital:     { label: 'Digital',     color: '#e74c3c', icon: '💻' },
  community:   { label: 'Community',   color: '#1abc9c', icon: '🤝' },
}

// ─── Events ────────────────────────────────────────────────────────

export const EVENTS: TimelineEvent[] = [

  // ═══════════════════════════════════════════════════════════════
  //  ANCIENT & MEDIEVAL FOUNDATIONS  (~18,000 BCE – 1540 CE)
  // ═══════════════════════════════════════════════════════════════

  {
    year: -18000,
    approximate: true,
    title: 'Ceramic Venus Figurines',
    description: 'Dolní Věstonice figurines — first deliberate use of fire to transform clay into a permanent material. Not vessels, but proof that humans understood fired clay as a distinct substance.',
    category: 'science',
    significance: 2,
  },
  {
    year: -10000,
    approximate: true,
    title: 'Jōmon Pottery (Japan)',
    description: 'Earliest known functional ceramics — cord-marked vessels for cooking and storage. Predates agriculture in the region, challenging the assumption that pottery follows farming.',
    category: 'technology',
    significance: 2,
  },
  {
    year: -9000,
    approximate: true,
    title: 'Çatalhöyük Kilns',
    description: 'First architectural firing structures in Anatolia (modern Turkey). Controlled firing environments enable predictable, repeatable results — the prerequisite for all ceramic development.',
    category: 'technology',
    significance: 3,
  },
  {
    year: -3000,
    approximate: true,
    title: 'Egyptian Faience',
    description: 'First deliberate alkaline glaze development. Soda-lime-silica chemistry applied intentionally to create glossy blue-green surfaces. Marks the transition from accidental surface effects to intentional glaze chemistry.',
    category: 'science',
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: -1500,
    approximate: true,
    title: 'Mesopotamian Lead Glazes',
    description: 'Low-fire lead glaze chemistry emerges in the ancient Near East. Lead oxide as a powerful flux produces brilliant, low-temperature surfaces. This chemistry dominated for over 3,000 years until 20th-century safety concerns.',
    category: 'science',
    significance: 2,
  },
  {
    year: -500,
    approximate: true,
    title: 'Greek Black-Figure & Red-Figure Ware',
    description: 'Controlled reduction-oxidation atmosphere cycles produce black and red surfaces from the same iron-bearing clay. Demonstrates sophisticated understanding of atmospheric chemistry without any theoretical framework.',
    category: 'science',
    significance: 2,
  },
  {
    year: -200,
    approximate: true,
    title: 'Roman Terra Sigillata',
    description: 'Standardized slip chemistry replicated across the Roman Empire — the first large-scale ceramic materials standardization. Factory-scale production with consistent results.',
    category: 'technology',
    significance: 3,
  },
  {
    year: 100,
    approximate: true,
    title: 'Han Dynasty Celadons',
    description: 'First high-fire reduction glazes. Chinese potters master cone 10+ temperatures with controlled reduction atmosphere, unlocking iron-based celadon chemistry that the West wouldn\u2019t reproduce for 1,800 years.',
    category: 'science',
    people: [],
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 600,
    approximate: true,
    title: 'Tang Sancai (Three-Color Ware)',
    description: 'Systematic use of copper (green), iron (amber), and cobalt (blue) colorants in lead-fluxed glazes. Colorant chemistry becomes reproducible and tradeable.',
    category: 'science',
    significance: 2,
  },
  {
    year: 800,
    approximate: true,
    title: 'Abbasid Luster Ware',
    description: 'Metallic reduction chemistry developed in the Islamic world — silver and copper compounds reduced on the glaze surface to produce iridescent metallic effects. The most advanced glaze technology of the medieval period.',
    category: 'science',
    significance: 2,
  },
  {
    year: 900,
    approximate: true,
    title: 'Persian Glaze Treatises',
    description: 'First written glaze recipes (largely lost, referenced in later texts). The beginning of recorded ceramic knowledge — recipes transmitted by text rather than solely by apprenticeship.',
    category: 'publication',
    significance: 3,
  },
  {
    year: 1000,
    approximate: true,
    title: 'Song Dynasty Imperial Glazes',
    description: 'Ru, guan, ge, jun, and ding glazes — the peak of empirical ceramic development. Achieved through generations of refinement without any molecular understanding. Still considered the highest achievement of ceramic chemistry.',
    category: 'science',
    significance: 1,
  },
  {
    year: 1300,
    approximate: true,
    title: 'Chinese Blue-and-White Porcelain',
    description: 'Cobalt chemistry refined for underglaze decoration on porcelain. Establishes blue-and-white as the most globally traded ceramic type — influencing every subsequent tradition.',
    category: 'science',
    significance: 2,
  },
  {
    year: 1400,
    approximate: true,
    title: 'Iznik Pottery',
    description: 'Ottoman quartz-frit body chemistry (Turkey). An alternative to clay-based bodies using crushed quartz and glass frit — a completely different materials approach that produces brilliant white surfaces for colorant display.',
    category: 'science',
    significance: 3,
  },
  {
    year: 1540,
    title: 'Cipriano Piccolpasso — \u201CI Tre Libri dell\u2019Arte del Vasaio\u201D',
    description: 'First systematic documentation of ceramic processes in the European tradition. Piccolpasso described Italian maiolica production with enough detail to reconstruct the entire process — the first true ceramic technical manual.',
    category: 'publication',
    people: ['Cipriano Piccolpasso'],
    significance: 2,
  },

  // ═══════════════════════════════════════════════════════════════
  //  RENAISSANCE & EARLY MODERN  (1540–1760)
  // ═══════════════════════════════════════════════════════════════

  {
    year: 1556,
    title: 'Georgius Agricola — \u201CDe Re Metallica\u201D',
    description: 'Comprehensive mining and minerals treatise brings mineralogical thinking into ceramic discourse. Understanding of raw materials begins to be systematic rather than purely empirical.',
    category: 'publication',
    people: ['Georgius Agricola'],
    significance: 3,
  },
  {
    year: 1580,
    title: 'Bernard Palissy\u2019s Experiments',
    description: 'French potter famously burned his furniture to fuel kiln experiments with enamels and glazes. Documented his failures alongside successes — an early application of scientific method to ceramics, valuing learning from failure.',
    category: 'science',
    people: ['Bernard Palissy'],
    significance: 2,
  },
  {
    year: 1612,
    title: 'Antonio Neri — \u201CL\u2019Arte Vetraria\u201D',
    description: 'Glass chemistry treatise that influences glaze understanding. Glass and glaze chemistry recognized as related fields — both involving silica melted with fluxes.',
    category: 'publication',
    people: ['Antonio Neri'],
    significance: 3,
  },
  {
    year: 1669,
    endYear: 1708,
    title: 'Johann Friedrich Böttger — European Porcelain',
    description: 'Alchemist-turned-ceramicist begins porcelain experiments under Augustus the Strong of Saxony. Achieves true hard-paste porcelain by 1708, ending Europe\u2019s dependence on Chinese imports.',
    category: 'science',
    people: ['Johann Friedrich Böttger'],
    significance: 2,
  },
  {
    year: 1712,
    title: 'Père d\u2019Entrecolles — Letters from China',
    description: 'Jesuit missionary François Xavier d\u2019Entrecolles sends detailed letters from Jingdezhen describing the kaolin/petuntse (china stone) system for porcelain production. Industrial espionage that transmitted China\u2019s most guarded ceramic secrets to Europe.',
    category: 'publication',
    people: ['François Xavier d\u2019Entrecolles'],
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 1720,
    title: 'Meissen Research Program',
    description: 'Systematic European porcelain chemistry begins at the Meissen manufactory in Saxony. First European institutional ceramic research — secrets protected under threat of imprisonment.',
    category: 'institution',
    significance: 2,
  },
  {
    year: 1740,
    title: 'Réaumur\u2019s Artificial Porcelain',
    description: 'René Antoine Ferchault de Réaumur pursues a French approach to porcelain through devitrification of glass. Competing European approaches to the "porcelain problem" drive innovation across the continent.',
    category: 'science',
    people: ['René Antoine de Réaumur'],
    significance: 3,
  },
  {
    year: 1748,
    title: 'Vincennes/Sèvres Established',
    description: 'French soft-paste porcelain research begins at Vincennes (becomes Sèvres 1756). Becomes a world-class research institution for ceramic chemistry, employing dedicated chemists.',
    category: 'institution',
    significance: 2,
  },

  // ═══════════════════════════════════════════════════════════════
  //  INDUSTRIAL REVOLUTION  (1760–1830)
  // ═══════════════════════════════════════════════════════════════

  {
    year: 1759,
    title: 'Wedgwood & Bentley Partnership',
    description: 'Josiah Wedgwood and Thomas Bentley merge business acumen with scientific curiosity. Wedgwood\u2019s factory becomes the model for industrial ceramic research — systematic experimentation at production scale.',
    category: 'institution',
    people: ['Josiah Wedgwood', 'Thomas Bentley'],
    significance: 2,
  },
  {
    year: 1765,
    endYear: 1813,
    title: 'Lunar Society of Birmingham',
    description: 'Josiah Wedgwood, Joseph Priestley, James Watt, Matthew Boulton, and Erasmus Darwin formed this "club of industrialists," meeting by the full moon. Their cross-pollination of chemistry, engineering, and ceramics fueled the Industrial Revolution.',
    category: 'institution',
    people: ['Josiah Wedgwood', 'James Watt', 'Matthew Boulton', 'Joseph Priestley'],
    significance: 1,
  },
  {
    year: 1768,
    title: 'Wedgwood\u2019s Systematic Recipe Books',
    description: 'Wedgwood begins maintaining detailed experimental records — numbered trials with controlled variables and measured outcomes. Scientific record-keeping applied to ceramic production for the first time.',
    category: 'science',
    people: ['Josiah Wedgwood'],
    significance: 3,
  },
  {
    year: 1775,
    title: 'Wedgwood\u2019s Pyrometric Tablets',
    description: 'Pre-pyrometer temperature measurement using calibrated clay shrinkage. The first attempt at quantitative kiln temperature measurement — approximate but revolutionary in concept.',
    category: 'technology',
    people: ['Josiah Wedgwood'],
    significance: 3,
  },
  {
    year: 1782,
    title: 'Wedgwood\u2019s Pyrometer',
    description: 'Josiah Wedgwood invented the first pyrometric device for measuring kiln temperatures, presenting it to the Royal Society. Pottery moved from "fire until it looks right" to measurable, repeatable processes. Foundation for all modern ceramic science.',
    category: 'science',
    people: ['Josiah Wedgwood'],
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 1800,
    title: 'William Cookworthy — Hard-Paste Porcelain',
    description: 'First British true porcelain using Cornish kaolin and china stone. Britain finally achieves high-fire porcelain independent of Continental recipes.',
    category: 'science',
    people: ['William Cookworthy'],
    significance: 2,
  },
  {
    year: 1805,
    title: 'Spode\u2019s Bone China Formula',
    description: 'Josiah Spode II standardizes the bone ash porcelain formula — approximately 50% bone ash, 25% kaolin, 25% china stone. Creates a distinctly British porcelain type: translucent, strong, and commercially successful.',
    category: 'technology',
    people: ['Josiah Spode II'],
    significance: 2,
  },
  {
    year: 1815,
    title: 'Staffordshire Potteries Industrialize',
    description: 'Mass production in the Staffordshire region demands standardized materials and repeatable chemistry. Industrial scale forces the shift from artisanal intuition to documented, reproducible processes.',
    category: 'institution',
    significance: 2,
  },
  {
    year: 1820,
    title: 'Michael Faraday\u2019s Chemistry',
    description: 'Faraday\u2019s work on electrochemistry and chemical analysis begins to influence understanding of ceramic colorants and material interactions. Modern chemistry starts to inform ceramics.',
    category: 'science',
    people: ['Michael Faraday'],
    significance: 3,
  },

  // ═══════════════════════════════════════════════════════════════
  //  AGE OF SYSTEMIZATION  (1830–1920)
  // ═══════════════════════════════════════════════════════════════

  {
    year: 1837,
    title: 'Sèvres Systematic Colorant Research',
    description: 'The French national manufactory begins a methodical colorant testing program funded by the state. Government-sponsored ceramic research — the first institutional commitment to ceramic science.',
    category: 'institution',
    significance: 3,
  },
  {
    year: 1843,
    title: 'Alexandre Brongniart — \u201CTraité des Arts Céramiques\u201D',
    description: 'Encyclopedic ceramic reference published by the director of Sèvres. The first comprehensive scientific ceramic text — treating ceramics as a branch of chemistry rather than purely a craft.',
    category: 'publication',
    people: ['Alexandre Brongniart'],
    significance: 2,
  },
  {
    year: 1851,
    title: 'Crystal Palace Exhibition',
    description: 'The Great Exhibition in London showcases ceramic chemistry from around the world. International competition drives innovation as manufacturers display and compare their latest achievements.',
    category: 'community',
    significance: 3,
  },
  {
    year: 1857,
    title: 'Chemical Analysis of Chinese Porcelain',
    description: 'European scientists systematically analyze historical Chinese ceramic materials for the first time. The scientific method applied to historical ceramics — reverse-engineering centuries of empirical knowledge.',
    category: 'science',
    significance: 3,
  },
  {
    year: 1860,
    title: 'Royal Berlin Porcelain Manufactory Research',
    description: 'German state-sponsored ceramic science at the Berlin manufactory. Sets the institutional stage for Hermann Seger\u2019s transformative work.',
    category: 'institution',
    significance: 3,
  },
  {
    year: 1870,
    title: 'Hermann Seger at the Royal Porcelain Factory',
    description: 'Hermann Seger (1839–1893) takes a research position at the Royal Berlin Porcelain Factory. The most important figure in ceramic science begins his life\u2019s work.',
    category: 'institution',
    people: ['Hermann Seger'],
    significance: 2,
  },
  {
    year: 1873,
    title: 'Seger Begins Cone Development',
    description: 'Seger starts developing pyrometric cones — small ceramic pyramids formulated to bend at specific temperatures, measuring total heat-work rather than temperature alone.',
    category: 'science',
    people: ['Hermann Seger'],
    significance: 2,
  },
  {
    year: 1878,
    title: 'Seger\u2019s First Papers on Glaze Calculation',
    description: 'Early publications outline the molecular formula approach to analyzing glazes. The mathematical framework for rational glaze calculation begins to take shape.',
    category: 'publication',
    people: ['Hermann Seger'],
    significance: 2,
  },
  {
    year: 1880,
    title: 'Karl Langenbeck at Rookwood Pottery',
    description: 'Trained chemist Karl Langenbeck becomes the first professional ceramic chemist employed by an American art pottery, bringing scientific rigor to the Rookwood studio in Cincinnati.',
    category: 'science',
    people: ['Karl Langenbeck'],
    significance: 3,
  },
  {
    year: 1886,
    title: 'Seger Formula Published — Unity Molecular Formula',
    description: 'Hermann Seger publishes the Unity Molecular Formula (UMF) system. By normalizing flux oxides to 1.0, glazes become mathematically comparable regardless of batch size. Shifted ceramics from craft to science. Every modern glaze calculation system derives from Seger.',
    category: 'science',
    people: ['Hermann Seger'],
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 1892,
    title: 'Seger Cone System Published',
    description: 'Seger\u2019s standardized pyrometric cone system published. Each cone is formulated to deform at a specific combination of temperature and time — measuring "heat-work" rather than temperature alone.',
    category: 'technology',
    people: ['Hermann Seger'],
    significance: 2,
  },
  {
    year: 1893,
    title: 'Hermann Seger Dies',
    description: 'Seger dies at 54, but his legacy — the UMF system, Seger cones, and the scientific approach to glazes — becomes the foundation for all 20th-century ceramic science.',
    category: 'science',
    people: ['Hermann Seger'],
    significance: 2,
  },
  {
    year: 1895,
    title: 'Edward Orton Sr. Founds Ceramic Foundation',
    description: 'The Edward Orton Jr. Ceramic Foundation established in Columbus, Ohio. Institutionalizes American ceramic research and begins the parallel development of Orton cones.',
    category: 'institution',
    people: ['Edward Orton Sr.'],
    significance: 2,
  },
  {
    year: 1900,
    title: 'Charles Fergus Binns — NY State School of Clay-Working',
    description: 'Binns founds the ceramic program at what becomes Alfred University (New York). The "father of American studio ceramics" — formalizes ceramic education in America.',
    category: 'institution',
    people: ['Charles Fergus Binns'],
    significance: 2,
  },
  {
    year: 1902,
    title: 'Seger\u2019s Collected Writings Published (English)',
    description: 'The American Ceramic Society published the English translation of "The Collected Writings of Hermann August Seger," making his foundational work on glaze chemistry accessible to the English-speaking world.',
    category: 'publication',
    significance: 2,
  },
  {
    year: 1905,
    title: 'Adelaide Alsop Robineau — Crystalline Glaze Pioneer',
    description: 'Robineau (1865–1929) achieves mastery of zinc-silicate crystalline glazes through systematic experimentation with crystal nucleation and growth. Her legendary "Scarab Vase" (exhibited 1910) advances glaze science while creating museum-worthy art.',
    category: 'science',
    people: ['Adelaide Alsop Robineau'],
    significance: 2,
  },
  {
    year: 1905,
    title: 'Ohio State Ceramic Engineering Program',
    description: 'Ohio State University establishes a formal ceramic engineering program. Ceramics recognized as an engineering discipline — not just art, not just chemistry, but applied materials science.',
    category: 'institution',
    significance: 3,
  },
  {
    year: 1906,
    title: 'Orton Cones Commercially Available',
    description: 'Edward Orton Jr. (1863–1932) standardized cone manufacturing in the United States. Small studios could now replicate industrial precision — firing became teachable and universally reliable. Orton cones remain the standard today.',
    category: 'technology',
    people: ['Edward Orton Jr.'],
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 1908,
    approximate: true,
    title: 'R.T. Stull Begins Glaze Research',
    description: 'Ray Thomas Stull (1875–1944), professor of ceramic engineering at the University of Illinois, begins systematic research on the relationship between silica, alumina, and glaze surface quality — keeping fluxes constant while varying SiO₂ and Al₂O₃ to map their effects on fired properties.',
    category: 'science',
    people: ['R.T. Stull'],
    significance: 2,
  },
  {
    year: 1914,
    title: 'Stull — \u201CDeformation Temperatures\u201D Paper',
    description: 'R.T. Stull publishes research on glaze viscosity, deformation temperatures, and the interplay of SiO₂ and Al₂O₃ in porcelain glazes. Expanding the empirical foundation for his definitive chart.',
    category: 'science',
    people: ['R.T. Stull'],
    links: [
      { label: 'Archive.org', url: 'https://archive.org/details/deformationtempe21stul' },
    ],
    significance: 3,
  },
  {
    year: 1912,
    title: 'Stull Chart Published',
    description: 'R.T. Stull publishes "Influences of Variable Silica and Alumina on Porcelain Glazes of Constant RO" in Transactions of the American Ceramic Society (Vol. XIV, pp. 62–70). The paper maps the SiO₂:Al₂O₃ relationship that defines matte, satin, and gloss zones at cone 11. The most important visual tool for glaze chemistry — the chart this application is named after.',
    category: 'science',
    people: ['R.T. Stull'],
    links: [
      { label: 'Google Books (Trans. ACS Vol. XIV)', url: 'https://books.google.com/books?id=9qwYAQAAIAAJ' },
    ],
    significance: 1,
    inflectionPoint: true,
  },

  // ═══════════════════════════════════════════════════════════════
  //  MODERN STUDIO CERAMICS  (1920–1990)
  // ═══════════════════════════════════════════════════════════════

  {
    year: 1910,
    title: 'Charles Binns — \u201CThe Potter\u2019s Craft\u201D',
    description: 'Founding director of the New York State School of Clay-Working (now Alfred University) publishes a formal ceramic education text codifying the Alfred approach. Studio pottery pedagogy established as a teachable discipline.',
    category: 'publication',
    people: ['Charles Fergus Binns'],
    significance: 3,
  },
  {
    year: 1920,
    title: 'Bernard Leach & Shoji Hamada — East Meets West',
    description: 'Bernard Leach returns to England from Japan, accompanied by Shoji Hamada. They bring reduction firing knowledge, Japanese aesthetics, and a philosophy of pottery as a way of life. The studio ceramics movement is born.',
    category: 'community',
    people: ['Bernard Leach', 'Shoji Hamada'],
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 1920,
    title: 'Leach Pottery Established (St Ives)',
    description: 'Bernard Leach and Shoji Hamada establish the Leach Pottery in St Ives, Cornwall — the most influential teaching center for studio ceramics in the Western world. Hamada returns to Japan in 1923; Leach continues building a model for studio pottery practice worldwide.',
    category: 'institution',
    people: ['Bernard Leach', 'Shoji Hamada'],
    significance: 2,
  },
  {
    year: 1923,
    title: 'Rutile as Glaze Material',
    description: 'Titanium dioxide (rutile) effects explored for glaze surfaces. Opens new aesthetic possibilities — opacity, mottling, crystalline breaking — that become defining characteristics of studio glazes.',
    category: 'science',
    significance: 3,
  },
  {
    year: 1925,
    title: 'Cranbrook Academy — Maija Grotell',
    description: 'Cranbrook Academy of Art (Michigan) becomes a center for American studio ceramics. Maija Grotell (1899–1973), "mother of American ceramics," establishes an influential lineage of ceramic educators and artists.',
    category: 'institution',
    people: ['Maija Grotell'],
    significance: 2,
  },
  {
    year: 1927,
    title: 'A.B. Searle — \u201CAn Encyclopedia of the Ceramic Industries\u201D',
    description: 'Comprehensive industrial ceramic reference. Industrial knowledge documented and made available to a wider audience.',
    category: 'publication',
    people: ['A.B. Searle'],
    significance: 3,
  },
  {
    year: 1930,
    title: 'Crystal Growth Research',
    description: 'Research into deliberate macro-crystalline glaze formation advances. Understanding nucleation, cooling rates, and zinc-silicate chemistry enables potters to grow crystals intentionally rather than by accident.',
    category: 'science',
    significance: 3,
  },
  {
    year: 1933,
    title: 'Black Mountain College',
    description: 'Experimental arts college in North Carolina includes ceramics in its radical interdisciplinary program. Alternative education model embracing experimentation over tradition.',
    category: 'institution',
    significance: 3,
  },
  {
    year: 1940,
    title: 'Bernard Leach — \u201CA Potter\u2019s Book\u201D',
    description: 'The most influential ceramics book of the 20th century. Leach blends philosophy, technique, and chemistry — framing ceramics as holistic practice, not just craft or science. Defined the ethos of studio pottery.',
    category: 'publication',
    people: ['Bernard Leach'],
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 1942,
    title: 'Marguerite Wildenhain — Pond Farm Pottery',
    description: 'Marguerite Wildenhain (1896\u20131985), Bauhaus-trained master potter and Jewish refugee who fled Nazi Germany, settles at Pond Farm in Guerneville, California. The first woman to earn the Master Potter certification in Germany (1925), she teaches rigorous summer sessions from 1949 until 1980, introducing Bauhaus techniques and philosophy to hundreds of American potters. Published "Pottery: Form and Expression" (1959). Pond Farm designated a National Historic Landmark in 2023.',
    category: 'institution',
    people: ['Marguerite Wildenhain'],
    significance: 2,
  },
  {
    year: 1945,
    title: 'Affordable Electric Kilns',
    description: 'Post-war manufacturing makes electric kilns accessible to home studios. Ceramics no longer requires expensive gas infrastructure or communal wood-firing. The studio ceramics boom begins — oxidation firing becomes the dominant mode.',
    category: 'technology',
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 1951,
    title: 'Archie Bray Foundation Founded',
    description: 'Archie Bray Sr., a brickmaker in Helena, Montana, establishes the Archie Bray Foundation for the Ceramic Arts. Peter Voulkos and Rudy Autio are among its first residents. Becomes the most influential American ceramic institution — a model for artist residency programs worldwide.',
    category: 'institution',
    people: ['Archie Bray Sr.', 'Peter Voulkos', 'Rudy Autio'],
    significance: 2,
  },
  {
    year: 1948,
    title: 'Beatrice Wood — Luster Glaze Mastery',
    description: 'Beatrice Wood (1893–1998) achieves mastery of luster glazes through decades of experimentation. Her work demonstrates that individual empirical research can rival institutional programs.',
    category: 'science',
    people: ['Beatrice Wood'],
    significance: 3,
  },
  {
    year: 1950,
    title: 'Warren MacKenzie — Apprentice at St Ives',
    description: 'Warren MacKenzie (1924\u20132018) and his wife Alix become the first American apprentices at Bernard Leach\u2019s pottery in St Ives, Cornwall (1950\u20131952). They absorb Leach\u2019s philosophy and Hamada\u2019s Mingei aesthetic firsthand, then bring Leach and Hamada on a watershed U.S. workshop tour in 1952.',
    category: 'community',
    people: ['Warren MacKenzie', 'Alix MacKenzie'],
    significance: 2,
  },
  {
    year: 1953,
    title: 'Warren MacKenzie — University of Minnesota',
    description: 'MacKenzie begins a 37-year teaching career at the University of Minnesota (1953\u20131990), training generations of functional potters in the Leach-Hamada tradition. His simple, wheel-thrown stoneware \u2014 affordable, generous, and deeply influenced by Japanese folk pottery \u2014 defines the "Mingei-sota" style. Perhaps the most influential American functional potter of the 20th century. His studio in Stillwater, MN operated until his death in 2018.',
    category: 'community',
    people: ['Warren MacKenzie'],
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 1954,
    title: 'Peter Voulkos — Material Experimentation as Art',
    description: 'After residency at the Archie Bray Foundation (1951–1954), Voulkos brings Abstract Expressionist energy to ceramics at the Otis Art Institute (Los Angeles). Challenges the idea that ceramic materials serve function — clay and glaze become expressive media in themselves.',
    category: 'science',
    people: ['Peter Voulkos'],
    significance: 2,
  },
  {
    year: 1966,
    title: 'Paul Soldner — American Raku',
    description: 'Paul Soldner (1921–2011), a student of Voulkos at Otis, develops American Raku — adapting the traditional Japanese technique with post-firing reduction in combustible materials. The process creates unpredictable, dramatic surface effects (copper lusters, carbon trapping) that become a gateway into atmospheric chemistry for generations of potters. Later experiments with salt and soda firing further expand the vocabulary of atmospheric surfaces.',
    category: 'science',
    people: ['Paul Soldner'],
    significance: 2,
  },
  {
    year: 1950,
    title: 'Haystack Mountain School of Crafts',
    description: 'Founded in Montville, Maine (later relocated to Deer Isle, 1961). Summer workshop model for intensive ceramic education. The workshop format — intensive, immersive, community-based — becomes a primary mode of ceramic knowledge transmission.',
    category: 'institution',
    significance: 3,
  },
  {
    year: 1956,
    title: 'Dunting & Thermal Shock',
    description: 'Cristobalite inversion and its role in dunting (cracking) finally explained in terms accessible to studio potters. Technical problems become solvable through understanding rather than avoidance.',
    category: 'science',
    significance: 3,
  },
  {
    year: 1957,
    title: 'Daniel Rhodes — \u201CClay and Glazes for the Potter\u201D',
    description: 'Daniel Rhodes (1911–1989), Alfred University professor, published this landmark textbook that became the standard reference for studio potters. Bridged the gap between ceramic science and studio practice. Defined ceramic education for 50+ years.',
    category: 'publication',
    people: ['Daniel Rhodes'],
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 1960,
    title: 'Glenn C. Nelson — \u201CCeramics: A Potter\u2019s Handbook\u201D',
    description: 'Standard textbook for ceramic education. Together with Rhodes, Nelson\u2019s handbook provides the pedagogical framework for generations of ceramic students.',
    category: 'publication',
    people: ['Glenn C. Nelson'],
    significance: 2,
  },
  {
    year: 1960,
    title: 'Toshiko Takaezu — Reduction Firing Innovation',
    description: 'Toshiko Takaezu (1922–2011) pushes reduction firing into sculptural territory with closed-form vessels. Her glazes — influenced by Japanese and Hawaiian traditions — demonstrate the artistic potential of atmospheric chemistry.',
    category: 'science',
    people: ['Toshiko Takaezu'],
    significance: 2,
  },
  {
    year: 1962,
    title: 'Herbert Sanders — Copper-Red Research',
    description: 'Decades of systematic research on reduction copper glazes culminates in publication. Chinese copper-red glazes — the most technically demanding of all glaze types — become reproducible in Western studios.',
    category: 'science',
    people: ['Herbert Sanders'],
    significance: 2,
  },
  {
    year: 1962,
    title: 'Don Reitz — Salt Firing Revival',
    description: 'Don Reitz (1929\u20132014) earns his MFA from Alfred University and joins the University of Wisconsin-Madison faculty, where he teaches for 25 years. More than anyone else, Reitz is credited with reviving the medieval technique of salt firing in American ceramics \u2014 throwing salt into a hot kiln to create textured, unpredictable surfaces. His fearless experimentation (banana peels, copper plates, anything at hand) and monumental sculptural forms helped wrench ceramics off the dinner table and into the gallery.',
    category: 'science',
    people: ['Don Reitz'],
    significance: 2,
  },
  {
    year: 1964,
    title: 'Herbert Sanders — \u201CGlazes for Special Effects\u201D',
    description: 'Crystalline, luster, and reduction glazes documented with scientific rigor. Advanced glaze techniques made teachable.',
    category: 'publication',
    people: ['Herbert Sanders'],
    significance: 3,
  },
  {
    year: 1964,
    title: 'Ken Ferguson — Kansas City Art Institute',
    description: 'Kenneth Ferguson (1928\u20132004) becomes head of the ceramics department at the Kansas City Art Institute, a position he holds for over 30 years (1964\u20131997). His emphasis on functional pottery as serious art \u2014 and his legendary critiques \u2014 shape a generation of American potters. Students include Akio Takamori, Chris Gustin, and Kurt Weiser.',
    category: 'institution',
    people: ['Ken Ferguson'],
    significance: 2,
  },
  {
    year: 1966,
    title: 'NCECA Founded',
    description: 'The National Council on Education for the Ceramic Arts formalizes the U.S. ceramic community. Annual conferences enable knowledge exchange, peer review, and the professionalization of ceramic education.',
    category: 'institution',
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 1967,
    title: 'W.G. Lawrence — \u201CCeramic Science for the Potter\u201D',
    description: 'Technical scientific approach to ceramics — bridging the gap between industrial ceramic engineering and studio practice.',
    category: 'publication',
    people: ['W.G. Lawrence'],
    significance: 3,
  },
  {
    year: 1968,
    title: 'Ron Roy — Professional Glaze Testing',
    description: 'Ron Roy begins a career focused on glaze safety, calculation, and systematic testing in Canada. Safety consciousness enters studio ceramics as a professional discipline.',
    category: 'science',
    people: ['Ron Roy'],
    significance: 2,
  },
  {
    year: 1948,
    title: 'Cullen Parmalee — \u201CCeramic Glazes\u201D',
    description: 'Parmalee\u2019s comprehensive treatment of glaze chemistry includes detailed discussion of the Stull chart and its practical applications. Industrial knowledge made accessible to studio potters. Revised edition 1951.',
    category: 'publication',
    people: ['Cullen Parmalee'],
    significance: 2,
  },
  {
    year: 1972,
    title: 'Lead Glaze Safety Crisis',
    description: 'Health warnings about lead leaching into food from ceramic glazes trigger an industry-wide reformulation. After 3,000 years as the primary low-fire flux, lead begins its exit from studio ceramics. Safety becomes a primary concern in glaze chemistry.',
    category: 'science',
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 1982,
    title: 'Emmanuel Cooper — \u201CElectric Kiln Pottery\u201D',
    description: 'Cooper validates electric kiln firing as a legitimate artistic medium, not merely a compromise (UK). Oxidation firing gains intellectual respectability.',
    category: 'publication',
    people: ['Emmanuel Cooper'],
    significance: 3,
  },
  {
    year: 1972,
    title: 'Studio Potter Magazine Founded',
    description: 'Gerry Williams and his wife co-found Studio Potter magazine. Knowledge sharing formalized in a dedicated print publication — a community-driven forum for technical exchange beyond academic journals.',
    category: 'community',
    people: ['Gerry Williams'],
    significance: 3,
  },
  {
    year: 1975,
    title: 'David Green — \u201CUnderstanding Pottery Glazes\u201D',
    description: 'Accessible glaze chemistry text from the UK. Demystifies glaze calculation for beginning potters — one of the first books to make UMF understandable without a chemistry background.',
    category: 'publication',
    people: ['David Green'],
    significance: 3,
  },
  {
    year: 1977,
    title: 'Val Cushing\u2019s Testing Methodology',
    description: 'Val Cushing (1931–2013) develops and shares practical glaze testing methodology at Alfred University. Influential but less famous than Rhodes — his handbook circulated widely among ceramic educators.',
    category: 'publication',
    people: ['Val Cushing'],
    significance: 3,
  },
  {
    year: 1979,
    title: 'Robert Tichane — \u201CCeladon Blues\u201D',
    description: 'Historical and technical study of celadon glazes. Tichane reverse-engineers Chinese imperial celadons, bringing academic rigor to the analysis of historical glazes.',
    category: 'publication',
    people: ['Robert Tichane'],
    significance: 3,
  },
  {
    year: 1980,
    approximate: true,
    title: 'American Anagama Movement Begins',
    description: 'Japanese-trained American potters begin building anagama (single-chamber wood kilns) across the U.S. The anagama revival reintroduces wood ash as an active glazing agent — fly ash, flame path, and ember contact create surfaces impossible to achieve with applied glazes. A direct rejection of the electric kiln era.',
    category: 'technology',
    significance: 2,
  },
  {
    year: 1981,
    title: 'Michael Cardew — \u201CPioneer Pottery\u201D',
    description: 'Traditional pottery knowledge documented by a Leach pupil who spent decades working in West Africa. Pre-industrial methods preserved for future generations.',
    category: 'publication',
    people: ['Michael Cardew'],
    significance: 3,
  },
  {
    year: 1982,
    title: 'Barium Carbonate Safety Concerns',
    description: 'Barium toxicity research triggers another round of glaze reformulation. The cycle of safety-driven chemistry continues — each generation confronts its own material hazards.',
    category: 'science',
    significance: 2,
  },
  {
    year: 1975,
    title: 'Hamer & Hamer — \u201CThe Potter\u2019s Dictionary\u201D',
    description: 'Encyclopedic reference covering every aspect of ceramic materials and processes (UK). Becomes the definitive materials dictionary for studio potters. Multiple revised editions follow.',
    category: 'publication',
    people: ['Frank Hamer', 'Janet Hamer'],
    significance: 2,
  },
  {
    year: 1985,
    title: 'Wood Firing Workshops Spread Nationally',
    description: 'Wood firing workshops and community kiln-building projects proliferate across American universities and craft schools. Multi-day firings become communal events — the labor-intensive process creates a social practice distinct from solitary electric kiln work. Schools like Penland, Haystack, and Arrowmont host intensive wood firing sessions.',
    category: 'community',
    significance: 3,
  },
  {
    year: 1985,
    title: 'Richard Burkett — Early BBS Glaze Databases',
    description: 'First digital glaze databases appear on bulletin board systems. The beginning of digital ceramic knowledge — recipes shared electronically for the first time.',
    category: 'digital',
    people: ['Richard Burkett'],
    significance: 2,
  },
  {
    year: 1987,
    title: 'Daniel de Montmollin — \u201CPratique des \u00E9maux de gr\u00E8s\u201D',
    description: 'Brother Daniel de Montmollin published 60 SiO\u2082\u2013Al\u2082O\u2083 charts showing how different flux combinations affect melting behavior at cone 13. Originally published in French (1987); English translation \u201CPractice of Stoneware Glazes\u201D follows in 2005. A monumental experimental work that remains unmatched in scope.',
    category: 'publication',
    people: ['Daniel de Montmollin'],
    significance: 2,
  },
  {
    year: 1999,
    title: 'Nigel Wood — \u201CChinese Glazes\u201D',
    description: 'Nigel Wood publishes \u201CChinese Glazes: Their Origins, Chemistry and Recreation\u201D (A&C Black / University of Pennsylvania Press). Scholarly analysis tracing 3,000 years of Chinese glaze development, with chemical analyses and recipes for reproducing historic glazes with Western materials.',
    category: 'publication',
    people: ['Nigel Wood'],
    significance: 2,
  },
  {
    year: 1989,
    title: 'Cone 6 Oxidation Movement Begins',
    description: 'A growing community of potters explores cone 6 oxidation as a high-fire alternative to reduction. Electric kiln firing at cone 6 challenges the cone 10 reduction orthodoxy — sets the stage for the 2003 breakthrough.',
    category: 'community',
    significance: 3,
  },
  {
    year: 1986,
    title: 'Ian Currie — \u201CStoneware Glazes: A Systematic Approach\u201D',
    description: 'Ian Currie (d. 2011) introduced the Grid Method for systematic glaze testing (Bootstrap Press, Australia). His approach allows potters to efficiently explore the SiO₂–Al₂O₃ landscape with real test tiles, bridging theory and practice. Testing moves from random trials to mathematical coverage of possibility space.',
    category: 'publication',
    people: ['Ian Currie'],
    significance: 1,
    inflectionPoint: true,
  },

  // ═══════════════════════════════════════════════════════════════
  //  DIGITAL ERA — Early Digital Transition  (1990–2000)
  // ═══════════════════════════════════════════════════════════════

  {
    year: 1991,
    title: 'First Ceramic Calculation Software (DOS)',
    description: 'Desktop glaze calculation software appears for DOS platforms. Computation begins to replace hand calculation of the Seger formula — a tedious process that had limited adoption of the UMF system.',
    category: 'digital',
    significance: 3,
  },
  {
    year: 1992,
    title: 'GlazeMaster Software',
    description: 'Ron Roy and John Hesselberth develop GlazeMaster, a professional-grade glaze calculation tool (Canada). Desktop software makes UMF calculation accessible to any potter with a computer.',
    category: 'digital',
    people: ['Ron Roy', 'John Hesselberth'],
    significance: 2,
  },
  {
    year: 1993,
    title: 'Early Internet Ceramic Forums',
    description: 'First online ceramic communities emerge on Usenet and early web forums. Global ceramic discourse begins — potters can exchange knowledge without physical proximity for the first time.',
    category: 'community',
    significance: 3,
  },
  {
    year: 1995,
    title: 'Jack Troy — "Wood-Fired Stoneware and Porcelain"',
    description: 'Jack Troy publishes the definitive reference on wood firing, documenting kiln design, firing techniques, and the chemistry of wood ash glazing. The book provides the intellectual framework for the anagama revival and legitimizes wood firing as a discipline with its own scientific rigor.',
    category: 'publication',
    people: ['Jack Troy'],
    significance: 2,
  },
  {
    year: 1995,
    title: 'Tony Hansen — Digitalfire.com & Insight',
    description: 'Tony Hansen launched Digitalfire.com and the Insight glaze calculation software, creating the most comprehensive online ceramics encyclopedia with 7,730+ pages. West & Gerrow thermal expansion coefficients became the industry standard through Insight.',
    category: 'digital',
    people: ['Tony Hansen'],
    links: [
      { label: 'Digitalfire', url: 'https://digitalfire.com' },
    ],
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 1996,
    title: 'HyperGlaze Software',
    description: 'Nigel Palmer develops HyperGlaze, an alternative calculation tool (Australia). Multiple competing software tools push the field forward and give potters options.',
    category: 'digital',
    people: ['Nigel Palmer'],
    significance: 3,
  },
  {
    year: 1997,
    title: 'Clayart Reaches 1,000+ Members',
    description: 'The Clayart email listserv becomes a major global discussion forum. Expert potters, chemists, and hobbyists engage in real-time problem solving across continents.',
    category: 'community',
    significance: 2,
  },
  {
    year: 1984,
    title: 'Robin Hopper — \u201CThe Ceramic Spectrum\u201D',
    description: 'Comprehensive colorant guide documenting the full spectrum of ceramic colorants and their interactions (Chilton Book Co., Canada). Definitive colorant reference for studio potters. Second edition by Krause Publications, 2001.',
    category: 'publication',
    people: ['Robin Hopper'],
    significance: 2,
  },
  {
    year: 1999,
    title: 'First Web-Based Glaze Calculators',
    description: 'Browser-based glaze calculation tools appear — no software installation required. The shift from desktop to web begins.',
    category: 'digital',
    significance: 3,
  },

  // ═══════════════════════════════════════════════════════════════
  //  DIGITAL ERA — Web 2.0 Knowledge Explosion  (2000–2010)
  // ═══════════════════════════════════════════════════════════════

  {
    year: 2000,
    title: 'Linda Arbuckle — GlazeChem Database',
    description: 'Linda Arbuckle develops the GlazeChem database and educational materials for calculation tutorials at the University of Florida. Pedagogical approach to glaze sharing — teaching the method, not just the recipe.',
    category: 'community',
    people: ['Linda Arbuckle'],
    significance: 3,
  },
  {
    year: 2001,
    title: 'John Sankey — Systematic Expansion Research',
    description: 'John Sankey begins building a comprehensive database of glaze expansion coefficients (Canada). Crazing and shivering become predictable and preventable through data.',
    category: 'science',
    people: ['John Sankey'],
    significance: 3,
  },
  {
    year: 2002,
    title: 'Hesselberth & Roy — \u201CMastering Cone 6 Glazes\u201D',
    description: 'John Hesselberth and Ron Roy validate cone 6 oxidation as a safe, sustainable alternative to high-fire reduction. Studios can achieve excellent results in electric kilns without toxic fumes. The book triggers a permanent shift — cone 6 becomes the dominant firing range.',
    category: 'publication',
    people: ['John Hesselberth', 'Ron Roy'],
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 2005,
    title: 'John Sankey — Expansion Database Published',
    description: 'Comprehensive glaze and clay thermal expansion data published. Scientific approach to glaze-body fit problems — crazing and shivering become solvable with calculation.',
    category: 'science',
    people: ['John Sankey'],
    significance: 3,
  },
  {
    year: 2007,
    title: 'Cone6Pots Yahoo Group',
    description: 'Collaborative online community for cone 6 testing. Crowd-sourced glaze development — potters share results from standardized tests, building collective knowledge faster than any individual could.',
    category: 'community',
    significance: 3,
  },
  {
    year: 2007,
    title: 'John Britt — "The Complete Guide to High-Fire Glazes"',
    description: 'John Britt, former Clay Coordinator at Penland School of Crafts, publishes a comprehensive reference for cone 10 glazing with hundreds of personally tested recipes. Covers copper, iron, shino, salt/soda, and crystalline glazes with rigorous chemistry. His workshop-based teaching methodology — test, document, share — embodies the democratization of glaze knowledge. Later followed by "The Complete Guide to Mid-Range Glazes" (2014).',
    category: 'publication',
    people: ['John Britt'],
    significance: 2,
  },
  {
    year: 2008,
    title: 'Spreadsheet Glaze Calculators',
    description: 'Excel and Google Sheets-based calculation tools widely shared online. Free, modifiable tools accessible to anyone — democratizing calculation beyond commercial software.',
    category: 'digital',
    significance: 3,
  },
  {
    year: 2008,
    title: 'Manganese Toxicity Research',
    description: 'Health concerns about manganese dioxide (a common brown/purple colorant) published widely. Another round of the safety cycle — materials once considered harmless require reconsideration.',
    category: 'science',
    significance: 2,
  },
  {
    year: 2008,
    title: 'Global Financial Crisis \u2192 DIY Ceramics Boom',
    description: 'Economic downturn drives hobbyist ceramics growth. YouTube tutorials proliferate as people seek creative outlets and low-cost hobbies. Massive audience expansion beyond the academic/professional sphere.',
    category: 'community',
    significance: 2,
  },
  {
    year: 2009,
    title: 'First Pottery Tutorials on YouTube',
    description: 'Video-based ceramic education reaches mass audiences for the first time. Visual learning supplements text — students can watch a glaze being mixed rather than only reading about it.',
    category: 'community',
    significance: 2,
  },

  // ═══════════════════════════════════════════════════════════════
  //  DIGITAL ERA — Social Media & Democratization  (2010–2020)
  // ═══════════════════════════════════════════════════════════════

  {
    year: 2010,
    title: 'r/Pottery and Online Communities',
    description: 'Reddit, Instagram, and other social platforms host growing ceramic communities. A new generation of potters discovers the craft through social media rather than formal education.',
    category: 'community',
    significance: 3,
  },
  {
    year: 2010,
    title: 'Mobile Apps for Glaze Calculation',
    description: 'Phone-based calculation tools emerge. Glaze calculation becomes possible in the studio, at the kiln, at the bucket — not just at a desk.',
    category: 'digital',
    significance: 3,
  },
  {
    year: 2012,
    title: 'Digitalfire Systematic Materials Testing',
    description: 'Tony Hansen\u2019s comprehensive materials documentation project expands to cover virtually every commercially available ceramic material with standardized testing data.',
    category: 'science',
    people: ['Tony Hansen'],
    significance: 2,
  },
  {
    year: 2012,
    title: 'Instagram Pottery Community',
    description: 'Image-based knowledge sharing on Instagram transforms how potters learn and share. Glaze surfaces become visual vocabulary — "Instagram glazes" emerge as an aesthetic category.',
    category: 'community',
    significance: 3,
  },
  {
    year: 2013,
    title: 'Matt Katz — Ceramic Materials Workshop',
    description: 'Matt Katz begins hands-on materials testing workshops adapting Stull chart research for modern cone 6 firing. Revival of systematic materials understanding through direct experience.',
    category: 'community',
    people: ['Matt Katz'],
    links: [
      { label: 'CMW', url: 'https://ceramicmaterialsworkshop.com' },
    ],
    significance: 2,
  },
  {
    year: 2014,
    title: 'Facebook Pottery Groups Reach Critical Mass',
    description: 'Multiple large ceramic groups form on Facebook — some exceeding 100,000 members. Mainstream social media adoption brings ceramic knowledge to the broadest audience yet.',
    category: 'community',
    significance: 3,
  },
  {
    year: 2015,
    title: 'Cloud-Based Glaze Calculation',
    description: 'Web applications replace desktop software as the primary calculation tool. Platform-independent, always up-to-date, and accessible from any device.',
    category: 'digital',
    significance: 3,
  },
  {
    year: 2016,
    title: 'Derek Philipau — Glazy.org',
    description: 'Derek Philipau launched Glazy, the first open-source ceramics database. With D3.js Stull chart visualization and community-contributed recipes, Glazy proved that ceramic knowledge could be collectively owned. The glazy-data repository on GitHub opened access to thousands of tested recipes.',
    category: 'digital',
    people: ['Derek Philipau'],
    links: [
      { label: 'Glazy', url: 'https://glazy.org' },
      { label: 'GitHub', url: 'https://github.com/derekphilipau/glazy-data' },
    ],
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 2017,
    title: 'Computational Fluid Dynamics for Kiln Atmosphere',
    description: 'Computer modeling of kiln atmosphere flow and temperature distribution. Atmospheric firing — once the domain of intuition and experience — becomes scientifically predictable.',
    category: 'science',
    significance: 3,
  },
  {
    year: 2018,
    title: 'Machine Learning Glaze Experiments',
    description: 'Academic research papers explore using machine learning to predict glaze properties from recipe inputs. The first tentative steps toward AI-assisted ceramic chemistry.',
    category: 'digital',
    significance: 2,
  },
  {
    year: 2019,
    title: 'Pieter Mostert — \u201CUnderstanding the Stull Chart\u201D',
    description: 'Pieter Mostert published a clear, rigorous reinterpretation of the Stull chart on the Glazy Wiki, including the "forest metaphor" for navigating UMF space. One of the most accessible introductions to the topic — modernizing Stull\u2019s century-old framework.',
    category: 'publication',
    people: ['Pieter Mostert'],
    links: [
      { label: 'Glazy Wiki', url: 'https://wiki.glazy.org/t/understanding-the-stull-chart/857.html' },
    ],
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 2019,
    title: 'TikTok Ceramic Explainers',
    description: 'Short-form video ceramic education emerges on TikTok. A new generation learns glaze chemistry in 60-second clips — radically different knowledge transmission from textbooks and workshops.',
    category: 'community',
    significance: 3,
  },

  // ═══════════════════════════════════════════════════════════════
  //  DIGITAL ERA — Contemporary Synthesis  (2020–2030)
  // ═══════════════════════════════════════════════════════════════

  {
    year: 2020,
    title: 'Linda Bloomfield — \u201CColour in Glazes\u201D (2nd ed.)',
    description: 'Linda Bloomfield\u2019s updated "Colour in Glazes" included sections on the Stull chart, expanding its reach to a broader audience of ceramic artists interested in understanding colorant chemistry.',
    category: 'publication',
    people: ['Linda Bloomfield'],
    significance: 3,
  },
  {
    year: 2020,
    title: 'COVID-19 Pandemic — Virtual Ceramics',
    description: 'Physical workshops close worldwide. Virtual learning explodes — shared Google Sheets replace studio notebooks, Discord servers replace critique sessions, Zoom workshops cross time zones. Permanent shift to hybrid learning.',
    category: 'community',
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 2021,
    title: 'Discord Servers Replace Forums',
    description: 'Real-time collaborative glaze development on Discord. Synchronous knowledge sharing — potters troubleshoot glazes together across continents in real time.',
    category: 'community',
    significance: 3,
  },
  {
    year: 2021,
    title: 'Chromium Toxicity Research',
    description: 'Chromium VI concerns lead to reformulations, particularly in red and green colorant systems. The ongoing safety cycle continues with each generation.',
    category: 'science',
    significance: 3,
  },
  {
    year: 2022,
    title: 'Supply Chain Disruptions',
    description: 'Global material shortages force widespread glaze reformulation and renewed interest in local sourcing. Wild clay, wood ash, and foraged materials see a revival. Sustainability becomes an urgent concern in ceramic chemistry.',
    category: 'science',
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 2022,
    title: 'AI/ML Glaze Prediction Papers',
    description: 'Academic papers on machine learning glaze design proliferate. Algorithms begin predicting glaze surface quality, color, and thermal expansion from recipe composition alone.',
    category: 'digital',
    significance: 2,
  },
  {
    year: 2023,
    title: 'Short-Form Video Dominates',
    description: 'TikTok and Instagram Reels become the primary learning format for new potters. 60-second glaze chemistry explainers reach millions but sacrifice depth for accessibility — the eternal tension.',
    category: 'community',
    significance: 3,
  },
  {
    year: 2023,
    title: 'Real-Time Kiln Monitoring',
    description: 'IoT kiln controllers with phone apps become consumer-accessible. Remote firing monitoring standardized — potters can watch kiln climb from anywhere.',
    category: 'digital',
    significance: 3,
  },
  {
    year: 2024,
    title: 'AI/ML Glaze Prediction Becomes Practical',
    description: 'Machine learning models move beyond academic papers to practical tools that suggest novel glaze compositions based on desired properties. Testing becomes validation rather than discovery.',
    category: 'digital',
    significance: 1,
    inflectionPoint: true,
  },
  {
    year: 2024,
    title: 'Collaborative Testing Networks',
    description: 'Organized testing campaigns coordinated through Discord and social media — crowd-sourced systematic testing at a scale impossible for any individual or institution.',
    category: 'community',
    significance: 3,
  },
  {
    year: 2025,
    title: 'IoT Kilns with Cloud Data Logging',
    description: 'Firing data automatically uploaded and analyzed in the cloud. Big data approaches to firing — patterns across thousands of firings become visible.',
    category: 'technology',
    significance: 3,
  },
  {
    year: 2025,
    title: 'Sustainability Research Accelerates',
    description: 'Carbon footprint analysis of ceramic materials and firing. Local sourcing of clay and glaze materials revived as both environmental imperative and aesthetic choice.',
    category: 'science',
    significance: 3,
  },
  {
    year: 2026,
    title: 'Stull Atlas — Interactive Explorer',
    description: 'This application: an interactive Stull chart explorer plotting 3,000+ real-world glaze recipes by UMF, with 3D visualization, blend calculators, materials database, recipe optimizer, AI-assisted glaze suggestion, and similarity tools. Built to preserve and extend the tradition from Wedgwood to Glazy.',
    category: 'digital',
    significance: 1,
    inflectionPoint: true,
    links: [
      { label: 'Stull Atlas', url: 'https://rlv.lol/stullv2/' },
    ],
  },
]

// ─── Eras ──────────────────────────────────────────────────────────

export const ERAS: Era[] = [
  { label: 'Ancient & Medieval',       start: -18000, end: 1540,  color: 'rgba(139, 90, 43, 0.06)' },
  { label: 'Renaissance & Early Modern', start: 1540,  end: 1760,  color: 'rgba(155, 89, 182, 0.06)' },
  { label: 'Industrial Revolution',      start: 1760,  end: 1830,  color: 'rgba(230, 126, 34, 0.06)' },
  { label: 'Age of Systemization',       start: 1830,  end: 1920,  color: 'rgba(52, 152, 219, 0.06)' },
  { label: 'Modern Studio Ceramics',     start: 1920,  end: 1990,  color: 'rgba(46, 204, 113, 0.06)' },
  { label: 'Digital Era',               start: 1990,  end: 2030,  color: 'rgba(231, 76, 60, 0.06)' },
]

// ─── Thematic Threads ──────────────────────────────────────────────

export const THEMATIC_THREADS: ThematicThread[] = [
  {
    theme: 'Democratization of Knowledge',
    description: 'Recurring pattern of technology making expert knowledge accessible to wider audiences.',
    keyMoments: [
      '1906 — Orton cones standardize temperature measurement for all',
      '1945 — Affordable electric kilns enable home studios',
      '1995 — Digitalfire.com brings ceramic knowledge online',
      '1997 — Clayart mailing list creates global expert community',
      '2008 — YouTube tutorials reach mass audiences',
      '2016 — Glazy.org open-source collaborative database',
      '2020 — COVID drives virtual learning and spreadsheet sharing',
    ],
  },
  {
    theme: 'Safety & Toxicology',
    description: 'Each era confronts new toxicity concerns and reformulates. The cycle repeats with different materials.',
    keyMoments: [
      '1972 — Lead glaze safety crisis (3,000 years of use reconsidered)',
      '1982 — Barium carbonate safety concerns',
      '1990s — Manganese toxicity recognized',
      '2008 — Manganese warnings widespread',
      '2021 — Chromium VI research',
    ],
  },
  {
    theme: 'East-West Exchange',
    description: 'Chinese and Japanese knowledge repeatedly transforms Western ceramic practice.',
    keyMoments: [
      '1712 — Père d\u2019Entrecolles letters reveal porcelain chemistry',
      '1920 — Leach & Hamada bring reduction firing to the UK',
      '1960s — Raku introduced to Western studios',
      '1970s — Wood firing revival (Japanese influence)',
      '1980s — Anagama kiln building spreads across the West',
    ],
  },
  {
    theme: 'Individual vs. Collective Knowledge',
    description: 'Tension between proprietary secrets and open sharing — from guild secrets to open source.',
    keyMoments: [
      'Ancient — Secret recipes guarded by guilds and courts',
      '1886 — Seger publishes the formula (open science)',
      '1995 — Digitalfire makes knowledge freely accessible',
      '2016 — Glazy.org fully open-source',
      '2020s — Collaborative testing networks',
    ],
  },
  {
    theme: 'Art vs. Science',
    description: 'Recurring debate: does chemistry enhance creativity or constrain it?',
    keyMoments: [
      '1920s — Leach emphasizes intuition and philosophy over calculation',
      '1950s — Voulkos challenges technical precision as artistic limit',
      '1990 — Currie systematizes glaze testing into a grid',
      '2010s — Social media celebrates "happy accidents"',
      '2020s — AI-assisted design raises new questions about authorship',
    ],
  },
  {
    theme: 'Paradigm Shifts',
    description: 'Four major eras of ceramic methodology, each building on the last.',
    keyMoments: [
      'Empirical / Craft Knowledge (Ancient → 1886): Trial and error, apprenticeship, secret recipes',
      'Scientific / Seger Era (1886 → 1995): Mathematical calculation, UMF, systematic testing',
      'Digital / Networked (1995 → 2024): Software calculation, online databases, global collaboration',
      'AI-Assisted / Computational (2024 → present): Machine learning, algorithmic design, sustainability',
    ],
  },
]
