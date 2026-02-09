"""
Add descriptionSimple and descriptionDetailed to all timeline events.
Run once, then delete this file.
"""
import re

DESCRIPTIONS = {
    # ─── FARADAY + AGE OF SYSTEMIZATION ────────────────────────────

    "Michael Faraday\u2019s Chemistry": {
        "simple": "Michael Faraday\u2019s discoveries about how chemicals interact helped people start to understand why certain minerals make certain colors in glazes.",
        "detailed": "Faraday\u2019s (1791\u20131867) foundational work in electrochemistry and chemical analysis \u2014 particularly his laws of electrolysis \u2014 provided the conceptual framework for understanding ceramic colorant chemistry at a molecular level. His demonstration that material properties arise from chemical composition and structure established the intellectual basis for systematic colorant research."
    },
    "S\u00e8vres Systematic Colorant Research": {
        "simple": "The French government paid scientists at a famous pottery factory to test which minerals make which colors. This was the first time a country funded ceramic research.",
        "detailed": "The French national manufactory began a methodical colorant testing program funded by the state, systematically cataloging the effects of metallic oxide additions on glaze color and opacity under various firing conditions. This represents the first institutional commitment to ceramic science as a government priority."
    },
    "Alexandre Brongniart \u2014 \u201CTrait\u00e9 des Arts C\u00e9ramiques\u201D": {
        "simple": "The head of France\u2019s famous pottery factory wrote the first encyclopedia of ceramics \u2014 treating pottery as real science for the first time.",
        "detailed": "Brongniart (1770\u20131847), director of S\u00e8vres, published an encyclopedic ceramic reference that systematically classified ceramic bodies, glazes, and decorative techniques according to their chemical composition and physical properties. This was the first text to treat ceramics comprehensively as a branch of chemistry."
    },
    "Crystal Palace Exhibition": {
        "simple": "Countries from around the world brought their best pottery to a huge exhibition in London. Seeing what everyone else was making pushed potters to try harder and learn faster.",
        "detailed": "The Great Exhibition of 1851 in London\u2019s Crystal Palace showcased ceramic achievements from multiple nations, creating an international competitive context that accelerated materials innovation. For the first time, ceramic manufacturers could directly compare technologies, stimulating cross-national knowledge transfer."
    },
    "Chemical Analysis of Chinese Porcelain": {
        "simple": "European scientists finally took apart Chinese ceramics piece by piece to figure out what they were made of \u2014 reverse-engineering centuries of pottery secrets.",
        "detailed": "Systematic chemical analysis of historical Chinese ceramic materials by European scientists applied quantitative analytical chemistry (gravimetric analysis, wet chemistry) to determine the precise oxide composition of bodies and glazes. This archaeological science approach enabled reproduction of historical glazes using modern raw materials."
    },
    "Royal Berlin Porcelain Manufactory Research": {
        "simple": "Germany\u2019s government started funding ceramic science research at a royal porcelain factory \u2014 this is where Hermann Seger would soon change everything.",
        "detailed": "German state-sponsored ceramic science at the Royal Berlin Manufactory (KPM) established the institutional framework within which Hermann Seger would develop his transformative UMF system. Government investment in ceramic research reflected the growing recognition of ceramics as a strategically important industrial science."
    },
    "Hermann Seger at the Royal Porcelain Factory": {
        "simple": "Hermann Seger, the most important scientist in pottery history, started working at a royal porcelain factory. His ideas would change how every potter thinks about glazes.",
        "detailed": "Hermann Seger (1839\u20131893) took a research position at the Royal Berlin Porcelain Factory (KPM), beginning the systematic investigation of glaze chemistry that would produce the Unity Molecular Formula \u2014 the most important analytical framework in ceramic history."
    },
    "Seger Begins Cone Development": {
        "simple": "Seger invented small clay pyramids that melt at exact temperatures. Put one in the kiln, and when it bends over, you know how hot it got. Potters still use these today.",
        "detailed": "Seger\u2019s pyrometric cones are small ceramic pyramids formulated from precisely measured oxide compositions to deform at specific combinations of temperature and time (heat-work). Unlike thermocouples, which measure instantaneous temperature, cones integrate the total thermal energy delivered to the ware \u2014 a more meaningful metric for predicting ceramic outcomes."
    },
    "Seger\u2019s First Papers on Glaze Calculation": {
        "simple": "Seger started publishing his ideas about using math to understand glazes. Instead of guessing, potters could now calculate what a glaze would do before firing it.",
        "detailed": "Seger\u2019s early publications outlined the molecular (molar) formula approach to glaze analysis: converting weight-percent batch recipes into molar ratios of constituent oxides grouped by function (flux, stabilizer, glass-former). This mathematical framework made glazes systematically comparable for the first time in history."
    },
    "Karl Langenbeck at Rookwood Pottery": {
        "simple": "Rookwood Pottery in Cincinnati hired their first real chemist \u2014 bringing laboratory science into an art pottery studio for the first time in America.",
        "detailed": "Karl Langenbeck, a trained analytical chemist, became the first professional ceramic chemist employed by an American art pottery. At Rookwood (est. 1880), he applied quantitative chemical analysis to glaze formulation, demonstrating that scientific rigor could enhance artistic production rather than constrain it."
    },
    "Seger Formula Published \u2014 Unity Molecular Formula": {
        "simple": "Hermann Seger published a way to describe any glaze using a simple math formula. By comparing the numbers, you can predict if a glaze will be glossy, matte, or something in between. Every glaze calculator today uses his system.",
        "detailed": "Seger\u2019s Unity Molecular Formula (UMF) normalizes the flux oxide column (RO/R\u2082O) to unity (1.0), expressing all other oxides as molar ratios relative to this reference. This normalization makes glazes mathematically comparable regardless of batch size, concentration, or raw material source. The UMF transformed ceramic formulation from empirical recipe-following into rational design \u2014 enabling systematic prediction of glaze properties from oxide composition. Every modern glaze calculation system derives directly from Seger\u2019s framework."
    },
    "Seger Cone System Published": {
        "simple": "Seger published his cone system so any potter could buy these small clay markers and know exactly how much heat their kiln delivered. No more guessing.",
        "detailed": "Seger\u2019s standardized pyrometric cone system measures \u201Cheat-work\u201D (the integral of temperature over time) rather than temperature alone. Each cone is formulated from a specific oxide composition designed to deform at a characteristic combination of peak temperature and duration. This distinction between temperature and heat-work remains fundamental to understanding firing behavior."
    },
    "Hermann Seger Dies": {
        "simple": "Seger died young at 54, but his ideas \u2014 the formula system, the cones, the whole scientific approach to glazes \u2014 became the foundation for everything that came after.",
        "detailed": "Seger\u2019s death at 54 ended a career that produced the three pillars of modern ceramic science: the Unity Molecular Formula (rational glaze analysis), pyrometric cones (quantitative heat-work measurement), and the systematic grouping of ceramic oxides by function (flux, stabilizer, glass-former). His legacy is woven into every glaze calculation made today."
    },
    "Edward Orton Sr. Founds Ceramic Foundation": {
        "simple": "The Orton Foundation was started in Ohio to support ceramic research \u2014 and to make the American version of Seger\u2019s temperature-measuring cones.",
        "detailed": "The Edward Orton Jr. Ceramic Foundation (Columbus, Ohio, est. 1895) institutionalized American ceramic research and initiated parallel development of Orton pyrometric cones, which would become the dominant standard in North America. The Foundation\u2019s mission to support ceramic education and research continues today."
    },
    "Charles Fergus Binns \u2014 NY State School of Clay-Working": {
        "simple": "Charles Binns started the first real college program for making pottery in America, at what is now Alfred University. He\u2019s called the father of American studio ceramics.",
        "detailed": "Binns (1857\u20131934) founded the ceramic program at what became Alfred University, establishing the first American academic program dedicated to studio ceramics as distinct from industrial ceramics. By integrating chemistry, materials science, and studio practice into a formal curriculum, Binns created the template for American ceramic education."
    },
    "Seger\u2019s Collected Writings Published (English)": {
        "simple": "Seger\u2019s most important papers were translated into English, so potters in America and England could finally read his groundbreaking ideas about glaze chemistry.",
        "detailed": "The American Ceramic Society\u2019s English translation of Seger\u2019s collected writings made his foundational research \u2014 previously accessible only in German \u2014 available to the English-speaking world. This translation was instrumental in the global adoption of the UMF system and Seger\u2019s analytical framework."
    },
    "Adelaide Alsop Robineau \u2014 Crystalline Glaze Pioneer": {
        "simple": "Adelaide Robineau spent years experimenting with glazes that grow actual crystals on the surface. Her famous \u201CScarab Vase\u201D took over 1,000 hours to make and is now in a museum.",
        "detailed": "Robineau (1865\u20131929) achieved mastery of zinc-silicate crystalline glazes through systematic experimentation with crystal nucleation sites, ZnO/SiO\u2082 ratios, and controlled cooling schedules. Her \u201CScarab Vase\u201D (exhibited 1910) demonstrates that individual empirical research could rival institutional science while producing art of the highest order."
    },
    "Ohio State Ceramic Engineering Program": {
        "simple": "Ohio State University started teaching ceramics as an engineering subject \u2014 not just art, but real materials science with math and lab work.",
        "detailed": "Ohio State\u2019s formal ceramic engineering program marked the recognition of ceramics as an engineering discipline alongside metallurgy and chemical engineering. This institutional legitimacy elevated ceramic research from an adjunct of industrial manufacturing to an independent academic field."
    },
    "Orton Cones Commercially Available": {
        "simple": "Small cone-shaped markers that melt at exact temperatures became available for anyone to buy. Now even a potter working alone at home could measure kiln heat as precisely as a factory. Orton cones are still the standard today.",
        "detailed": "Edward Orton Jr. (1863\u20131932) standardized pyrometric cone manufacturing in the United States, making precision heat-work measurement commercially accessible. Before Orton cones, only institutional laboratories could accurately assess firing conditions. Democratization of temperature measurement enabled reproducible results in small studios, fundamentally expanding who could practice ceramic science."
    },
    "R.T. Stull Begins Glaze Research": {
        "simple": "Professor Stull at the University of Illinois started a huge experiment: what happens when you change the amounts of silica and alumina in a glaze while keeping everything else the same? His answers would become a famous chart.",
        "detailed": "R.T. Stull (1875\u20131944) began systematic research at the University of Illinois on the relationship between SiO\u2082 (glass-former) and Al\u2082O\u2083 (stabilizer) in porcelain glazes, holding the flux (RO) column constant while mapping fired surface quality across the SiO\u2082\u2013Al\u2082O\u2083 compositional space. This controlled-variable approach produced the foundational dataset for his 1912 chart."
    },
    "Stull \u2014 \u201CDeformation Temperatures\u201D Paper": {
        "simple": "Stull published more research on how glazes melt and flow, building up to his most important discovery.",
        "detailed": "Stull\u2019s research on glaze viscosity and deformation temperatures explored the interplay of SiO\u2082 and Al\u2082O\u2083 in controlling melt behavior, surface tension, and flow characteristics of porcelain glazes. This work expanded the empirical foundation for his definitive 1912 chart."
    },
    "Stull Chart Published": {
        "simple": "Stull published his most important discovery: a chart showing that by changing the ratio of two key ingredients \u2014 silica and alumina \u2014 you can predict whether a glaze will be glossy, satiny, or matte. This chart is what our app is named after!",
        "detailed": "Stull published \u201CInfluences of Variable Silica and Alumina on Porcelain Glazes of Constant RO\u201D in Transactions of the American Ceramic Society (Vol. XIV, pp. 62\u201370). The paper maps fired surface quality (gloss, semi-matte, matte, dry) as a function of the SiO\u2082:Al\u2082O\u2083 molar ratio at constant flux composition (cone 11). This two-dimensional oxide-ratio map \u2014 the Stull chart \u2014 is the most important visual tool in glaze chemistry and the namesake of this application."
    },

    # ─── MODERN STUDIO CERAMICS ────────────────────────────────────

    "Charles Binns \u2014 \u201CThe Potter\u2019s Craft\u201D": {
        "simple": "The founder of America\u2019s first pottery school wrote a textbook so students everywhere could learn the same way his students did.",
        "detailed": "Binns\u2019s textbook codified the Alfred University approach to ceramic education: integrating materials science, studio practice, and aesthetic development. This publication established studio pottery pedagogy as a formal, transmissible discipline rather than an individual apprenticeship tradition."
    },
    "Bernard Leach & Shoji Hamada \u2014 East Meets West": {
        "simple": "Bernard Leach and Shoji Hamada brought Japanese pottery ideas to England \u2014 the beauty of simple, handmade things. They started a whole movement of potters making pots by hand instead of in factories.",
        "detailed": "Leach\u2019s return to England from Japan (with Hamada) introduced reduction firing knowledge, Japanese Mingei aesthetics, and a philosophy of pottery as a holistic way of life. Their collaboration catalyzed the studio ceramics movement \u2014 establishing the philosophical framework (truth to materials, fitness for purpose, integration of Eastern and Western traditions) that defined Western studio pottery for the remainder of the century."
    },
    "Leach Pottery Established (St Ives)": {
        "simple": "Leach and Hamada built their own pottery workshop in St Ives, England. It became the most famous teaching pottery in the world \u2014 people came from everywhere to learn.",
        "detailed": "The Leach Pottery in St Ives, Cornwall became the most influential teaching center for studio ceramics in the Western world. Using a Japanese noborigama-style kiln alongside Western equipment, the pottery modeled an integrated practice: hand-digging local clays, formulating glazes from first principles, and firing in reduction \u2014 a complete self-sufficient ceramics practice."
    },
    "Rutile as Glaze Material": {
        "simple": "Potters discovered that a mineral called rutile (titanium) makes beautiful speckled and mottled glaze effects that became very popular in handmade pottery.",
        "detailed": "Exploration of titanium dioxide (rutile, TiO\u2082) as a glaze additive revealed its capacity to produce opacity, surface breaking/mottling, and microcrystalline effects through phase separation and crystal nucleation. Rutile\u2019s complex behavior \u2014 acting as both opacifier and crystallization promoter depending on concentration and cooling rate \u2014 makes it one of the most versatile studio glaze materials."
    },
    "Cranbrook Academy \u2014 Maija Grotell": {
        "simple": "Maija Grotell, called the \u201Cmother of American ceramics,\u201D started teaching at Cranbrook Academy in Michigan and trained a whole generation of important potters and teachers.",
        "detailed": "Maija Grotell (1899\u20131973), Finnish-born ceramicist at Cranbrook Academy of Art, established one of the most influential pedagogical lineages in American ceramics. Her emphasis on material investigation \u2014 understanding clay and glaze behavior through direct experimentation rather than formula alone \u2014 produced a generation of educator-artists who disseminated her methodology throughout American university programs."
    },
    "A.B. Searle \u2014 \u201CAn Encyclopedia of the Ceramic Industries\u201D": {
        "simple": "A huge encyclopedia of everything about ceramics was published, so factory workers and potters alike could look up how things are made.",
        "detailed": "Searle\u2019s comprehensive industrial ceramic reference documented the full spectrum of ceramic manufacturing processes, raw materials, and testing methods. Making industrial knowledge available beyond the factory floor, it served as a bridge between industrial ceramic engineering and the emerging studio pottery movement."
    },
    "Crystal Growth Research": {
        "simple": "Scientists figured out how to grow big, beautiful crystals on glazed pots on purpose \u2014 not just by accident. The secret is in how slowly you cool the kiln.",
        "detailed": "Research into deliberate macro-crystalline glaze formation advanced understanding of nucleation, crystal growth kinetics, and the role of zinc-silicate (Zn\u2082SiO\u2084, willemite) systems. Controlled cooling schedules \u2014 holding at specific temperatures to allow crystal growth \u2014 enabled reproducible crystalline effects, transforming a once-accidental phenomenon into a controllable process."
    },
    "Black Mountain College": {
        "simple": "Black Mountain College in North Carolina was a wild, experimental school where ceramics was taught alongside painting, music, and dance \u2014 art with no boundaries.",
        "detailed": "Black Mountain College\u2019s (1933\u20131957) radical interdisciplinary pedagogy \u2014 integrating visual arts, performing arts, and crafts in a democratic learning environment \u2014 established an alternative model for ceramic education. Its emphasis on experimentation over tradition and process over product influenced the expressive ceramics movement of the 1950s\u201360s."
    },
    "Bernard Leach \u2014 \u201CA Potter\u2019s Book\u201D": {
        "simple": "Leach wrote the most important pottery book of the century. It wasn\u2019t just about technique \u2014 it was about why making pots matters, how it connects to life, and what makes a good pot good.",
        "detailed": "Leach\u2019s \u201CA Potter\u2019s Book\u201D (1940) is the most influential English-language ceramics text of the 20th century. Blending philosophy, technique, materials science, and East-West aesthetic theory, it framed ceramics as a holistic practice rather than a mere craft or industrial activity. Its influence on the studio pottery ethos \u2014 truth to materials, humility, fitness for purpose \u2014 remains profound."
    },
    "Marguerite Wildenhain \u2014 Pond Farm Pottery": {
        "simple": "Marguerite Wildenhain fled Nazi Germany and settled in California, where she taught pottery every summer for over 30 years. She was the first woman in Germany to earn a Master Potter title.",
        "detailed": "Wildenhain (1896\u20131985), trained at the Bauhaus (1919\u201325) and the first woman to earn German Master Potter certification (1925), fled Nazi persecution and established Pond Farm Pottery in Guerneville, California. Her rigorous summer teaching sessions (1949\u20131980) transmitted Bauhaus principles \u2014 integration of design, material, and function \u2014 to hundreds of American potters. Pond Farm was designated a National Historic Landmark in 2023."
    },
    "Affordable Electric Kilns": {
        "simple": "After World War II, electric kilns became cheap enough for anyone to own. You didn\u2019t need a big gas system or a wood pile anymore \u2014 just plug it in. This let thousands of new people start making pottery at home.",
        "detailed": "Post-war manufacturing economies made electric kilns accessible to home studios for the first time, fundamentally altering the economics and demographics of ceramics. Electric kilns (oxidation firing) eliminated the need for gas infrastructure, dedicated kiln rooms, and atmospheric control expertise. This technological democratization triggered the studio ceramics boom of the 1950s\u201360s and established oxidation firing as the dominant mode."
    },
    "Archie Bray Foundation Founded": {
        "simple": "A brickmaker in Montana started a place where artists could come and make pottery. Peter Voulkos was one of the first artists to work there. It became the most important ceramics residency in America.",
        "detailed": "Archie Bray Sr., a brickmaker in Helena, Montana, established the Archie Bray Foundation as a place where \u201Canyone interested in the ceramic arts could work.\u201D Early residents Peter Voulkos and Rudy Autio helped establish it as the premier American ceramic artist residency \u2014 a model for residency programs worldwide. The Foundation continues to host international artists today."
    },
    "Beatrice Wood \u2014 Luster Glaze Mastery": {
        "simple": "Beatrice Wood spent decades experimenting on her own to create beautiful shimmery luster glazes. She proved that one determined person can make discoveries as important as a whole research lab.",
        "detailed": "Beatrice Wood (1893\u20131998), the \u201CMama of Dada,\u201D achieved mastery of luster glazes through decades of individual empirical research. Her work demonstrates that systematic personal experimentation \u2014 outside institutional frameworks \u2014 can produce results rivaling institutional research programs. Her luster glazes employ metallic reduction techniques with roots in the Abbasid tradition."
    },
    "Warren MacKenzie \u2014 Apprentice at St Ives": {
        "simple": "Warren MacKenzie and his wife Alix traveled to England to learn from Bernard Leach himself \u2014 the first Americans to do so. They learned a simple, honest way of making pots by hand.",
        "detailed": "Warren MacKenzie (1924\u20132018) and wife Alix became the first American apprentices at the Leach Pottery in St Ives, Cornwall (1950\u20131952). They absorbed Leach\u2019s philosophy and Hamada\u2019s Mingei aesthetic firsthand, then facilitated Leach and Hamada\u2019s watershed 1952 U.S. workshop tour, which directly influenced the emerging American studio pottery movement."
    },
    "Warren MacKenzie \u2014 University of Minnesota": {
        "simple": "MacKenzie taught pottery at the University of Minnesota for 37 years, showing that a good pot doesn\u2019t have to be fancy \u2014 it just has to be honest. He sold his pots for prices anyone could afford, and he changed American pottery forever.",
        "detailed": "MacKenzie\u2019s 37-year teaching career at the University of Minnesota (1953\u20131990) established the most influential lineage of American functional potters. His practice \u2014 simple, wheel-thrown stoneware priced for everyday use, deeply influenced by Japanese folk pottery (Mingei) \u2014 defined the \u201CMingei-sota\u201D style. MacKenzie\u2019s insistence on affordability and accessibility challenged the gallery-art model and modeled an alternative: pottery as a democratic, generous practice."
    },
    "Peter Voulkos \u2014 Material Experimentation as Art": {
        "simple": "Peter Voulkos started treating clay the way painters treat paint \u2014 ripping, stacking, and glazing in wild, expressive ways. He proved ceramics could be serious art, not just useful pots.",
        "detailed": "After residency at the Archie Bray Foundation (1951\u20131954), Voulkos brought Abstract Expressionist energy to ceramics at the Otis Art Institute. His monumental, deconstructed ceramic forms challenged the primacy of function and established clay and glaze as expressive artistic media equivalent to paint and bronze. This paradigm shift elevated ceramics within the fine art discourse."
    },
    "Paul Soldner \u2014 American Raku": {
        "simple": "Paul Soldner took an old Japanese firing technique and made it wilder and more unpredictable. Pull a red-hot pot from the kiln, throw it in leaves or newspaper, and the smoke creates amazing colors you can\u2019t plan.",
        "detailed": "Soldner (1921\u20132011), a student of Voulkos, developed American Raku by adapting the traditional Japanese technique with post-firing reduction in combustible materials. The process creates unpredictable surface effects (copper lusters, carbon trapping, flashing) through rapid thermal shock and localized reduction chemistry. American Raku became a gateway into atmospheric chemistry for generations of studio potters."
    },
    "Haystack Mountain School of Crafts": {
        "simple": "A summer school for crafts was started in Maine where potters could go for intensive workshops. Learning pottery in an immersive week-long session became a whole new way to study.",
        "detailed": "Founded in Montville, Maine in 1950 (relocated to Deer Isle, 1961), Haystack established the intensive summer workshop model for ceramic education. This format \u2014 immersive, community-based, guest-instructor-led \u2014 became a primary mode of ceramic knowledge transmission alongside university programs and apprenticeships."
    },
    "Dunting & Thermal Shock": {
        "simple": "Scientists finally explained why pots sometimes crack in the kiln \u2014 a mineral called cristobalite expands and contracts at a specific temperature. Once potters understood this, they could prevent it.",
        "detailed": "Research clarifying the role of cristobalite inversion (the \u03b1\u2192\u03b2 transition at ~225\u00b0C involving ~3% volume change) in dunting (stress fracture during cooling) made this common kiln defect scientifically understandable and preventable. Understanding thermal expansion behavior and quartz/cristobalite inversions became essential knowledge for clay body formulation."
    },
    "Daniel Rhodes \u2014 \u201CClay and Glazes for the Potter\u201D": {
        "simple": "Daniel Rhodes wrote the book that almost every pottery student has read. It explains clay, glazes, and kilns in a way that regular people can understand \u2014 not just scientists.",
        "detailed": "Rhodes (1911\u20131989), professor at Alfred University, published the landmark text that bridged ceramic science and studio practice. The book translated industrial ceramic chemistry \u2014 UMF calculation, thermal expansion, colorant behavior \u2014 into language accessible to studio potters without formal chemistry training. It defined ceramic education for over 50 years and remains in print."
    },
    "Glenn C. Nelson \u2014 \u201CCeramics: A Potter\u2019s Handbook\u201D": {
        "simple": "Another important pottery textbook was published that became required reading in college ceramics classes for decades.",
        "detailed": "Nelson\u2019s handbook, alongside Rhodes\u2019s text, provided the pedagogical framework for university-level ceramic education. Together, these two books established the canonical curriculum: materials science, forming techniques, glaze calculation, and kiln operation as an integrated body of knowledge."
    },
    "Toshiko Takaezu \u2014 Reduction Firing Innovation": {
        "simple": "Toshiko Takaezu pushed clay into sculptural shapes nobody had tried before, using closed forms and beautiful reduction-fired glazes inspired by her Japanese and Hawaiian heritage.",
        "detailed": "Takaezu (1922\u20132011) pioneered closed-form ceramic sculpture with glazes influenced by Japanese and Hawaiian traditions. Her work demonstrates the artistic potential of atmospheric (reduction) chemistry \u2014 using kiln atmosphere as a creative tool to produce surfaces impossible in oxidation firing. Her legacy bridges the functional/sculptural divide in American ceramics."
    },
    "Herbert Sanders \u2014 Copper-Red Research": {
        "simple": "After decades of careful testing, Herbert Sanders figured out how to reliably make copper-red glazes \u2014 one of the hardest glaze effects to get right.",
        "detailed": "Sanders\u2019s decades of systematic copper-red research culminated in published methodology for reproducing the most technically demanding of all glaze types. Chinese copper-red glazes require precise control of Cu\u00b2\u207a/Cu\u00b9\u207a/Cu\u2070 equilibria through atmosphere, temperature, and cooling rate. Sanders made these glazes reproducible in Western studios through documented, systematic procedures."
    },
    "Don Reitz \u2014 Salt Firing Revival": {
        "simple": "Don Reitz brought back an old technique of throwing salt into a hot kiln to create amazing, unpredictable surfaces. His wild experiments \u2014 throwing banana peels and copper into the fire \u2014 showed potters that anything goes.",
        "detailed": "Reitz (1929\u20132014) revived the medieval technique of salt firing (vapor glazing with NaCl at >1200\u00b0C) in American studio ceramics. At the University of Wisconsin-Madison (1962\u20131988), his experimental firing practice \u2014 introducing unconventional materials into the kiln \u2014 expanded the vocabulary of atmospheric surfaces and legitimized salt/soda vapor glazing as a contemporary practice."
    },
    "Herbert Sanders \u2014 \u201CGlazes for Special Effects\u201D": {
        "simple": "Sanders wrote a book explaining how to make glazes with special effects \u2014 crystals, lusters, and reduction colors \u2014 things most potters thought were too hard to try.",
        "detailed": "Sanders documented crystalline, luster, and reduction glaze techniques with scientific rigor, making advanced glaze processes accessible to studio potters. The publication transformed \u201Cspecial effect\u201D glazes from closely guarded individual knowledge into teachable, reproducible techniques."
    },
    "Ken Ferguson \u2014 Kansas City Art Institute": {
        "simple": "Ken Ferguson ran the ceramics program at Kansas City Art Institute for over 30 years. His tough but caring teaching style shaped some of the most important potters working today.",
        "detailed": "Ferguson (1928\u20132004) headed KCAI\u2019s ceramics department for over 30 years (1964\u20131997). His emphasis on functional pottery as serious art \u2014 and his demanding pedagogical style \u2014 produced a generation of significant American potters, establishing Kansas City as a major center for ceramic education alongside Alfred, Cranbrook, and Rhode Island School of Design."
    },
    "NCECA Founded": {
        "simple": "Pottery teachers from across America founded NCECA \u2014 a big annual conference where thousands of potters come together to share ideas, show their work, and learn from each other. It\u2019s still the biggest gathering of potters in the world.",
        "detailed": "The National Council on Education for the Ceramic Arts formalized the U.S. ceramic community through annual conferences enabling knowledge exchange, peer review, and professionalization of ceramic education. NCECA\u2019s interdisciplinary format \u2014 combining academic papers, demonstrations, exhibitions, and commercial trade \u2014 established the model for national ceramic discourse."
    },
    "W.G. Lawrence \u2014 \u201CCeramic Science for the Potter\u201D": {
        "simple": "A scientist wrote a book specifically to help potters understand the chemistry behind what happens in their kilns \u2014 bridging the gap between the lab and the studio.",
        "detailed": "Lawrence\u2019s text applied industrial ceramic engineering principles specifically to studio pottery contexts, translating phase diagrams, thermal equilibria, and oxide chemistry into terms relevant to small-studio practice. It represents an early effort to make professional-level ceramic science accessible to non-engineers."
    },
    "Ron Roy \u2014 Professional Glaze Testing": {
        "simple": "Ron Roy made it his life\u2019s work to test glazes for safety \u2014 making sure the cups and bowls people eat from don\u2019t leach harmful chemicals. He turned glaze safety into a real profession.",
        "detailed": "Ron Roy\u2019s career focused on systematic glaze testing methodology, particularly leaching analysis (ASTM C738) for functional ware safety. His work elevated glaze safety from an afterthought to a professional discipline, establishing standardized testing protocols that enabled potters to verify food-safety claims with scientific rigor."
    },
    "Cullen Parmalee \u2014 \u201CCeramic Glazes\u201D": {
        "simple": "Parmalee\u2019s book on ceramic glazes included detailed discussion of the Stull chart \u2014 helping potters understand how to use this powerful tool in their own work.",
        "detailed": "Parmalee\u2019s comprehensive treatment of glaze chemistry includes detailed discussion of the Stull chart and its practical applications for predicting glaze surface quality from oxide composition. This text served as a critical bridge between industrial ceramic engineering and studio pottery practice, making Stull\u2019s research accessible to a broader audience."
    },
    "Lead Glaze Safety Crisis": {
        "simple": "Doctors discovered that lead in pottery glazes could make people sick when acidic food dissolved it. After 3,000 years of using lead, potters had to find safer alternatives. This changed glaze chemistry forever.",
        "detailed": "Health research demonstrating significant lead leaching from ceramic glazes into acidic foods triggered industry-wide reformulation. Lead oxide (PbO) \u2014 the dominant low-fire flux for over three millennia \u2014 began its exit from studio ceramics. This safety crisis drove the development of leadless glaze systems (boron-based, lithium-based) and established the precedent that material safety is a primary concern in glaze formulation."
    },
    "Emmanuel Cooper \u2014 \u201CElectric Kiln Pottery\u201D": {
        "simple": "Emmanuel Cooper wrote a book proving that electric kilns aren\u2019t just for beginners \u2014 you can make serious, beautiful pottery in them too.",
        "detailed": "Cooper\u2019s publication validated electric kiln firing (oxidation atmosphere) as a legitimate artistic practice, not merely a compromise for those without access to gas or wood kilns. This intellectual legitimization of oxidation firing opened creative territory distinct from the reduction-firing tradition dominant since Leach."
    },
    "Studio Potter Magazine Founded": {
        "simple": "A new magazine just for studio potters was started, giving potters their own publication to share techniques, recipes, and ideas with each other.",
        "detailed": "Gerry Williams co-founded Studio Potter as a community-driven forum for technical and philosophical exchange among studio potters. Unlike academic journals, it provided a platform for practitioner-to-practitioner knowledge sharing \u2014 glaze recipes, kiln designs, studio practice insights \u2014 outside institutional channels."
    },
    "David Green \u2014 \u201CUnderstanding Pottery Glazes\u201D": {
        "simple": "David Green wrote one of the first books that explained glaze chemistry in simple, everyday language \u2014 so you didn\u2019t need a science degree to understand how glazes work.",
        "detailed": "Green\u2019s text from the UK demystified glaze calculation for beginning potters, presenting the UMF system, limit formulas, and oxide behavior in accessible language. It was among the first publications to make Seger\u2019s framework understandable without formal chemistry training."
    },
    "Val Cushing\u2019s Testing Methodology": {
        "simple": "Val Cushing at Alfred University developed a practical system for testing glazes that students could follow step by step. His handouts got passed around for decades.",
        "detailed": "Cushing (1931\u20132013) developed and disseminated practical glaze testing methodology at Alfred University. His systematic approach to glaze testing \u2014 including his widely circulated \u201CCushing\u2019s Handbook\u201D of cone 6\u201310 base glazes \u2014 influenced ceramic pedagogy across American university programs."
    },
    "Robert Tichane \u2014 \u201CCeladon Blues\u201D": {
        "simple": "Robert Tichane studied ancient Chinese celadon glazes using modern science. He figured out exactly what made them so beautiful and shared the recipes so others could try.",
        "detailed": "Tichane applied modern analytical chemistry to historical Chinese celadon glazes, reverse-engineering imperial formulations through oxide analysis, petrographic examination, and systematic re-creation. This scholarly-practitioner approach \u2014 combining art-historical research with laboratory analysis \u2014 established a methodology for studying historical glazes scientifically."
    },
    "American Anagama Movement Begins": {
        "simple": "American potters started building Japanese-style wood kilns that fire for days at a time. The wood ash lands on the pots and melts into a natural glaze \u2014 every pot comes out different.",
        "detailed": "Japanese-trained American potters began building anagama (single-chamber wood kilns) across the U.S. in the early 1980s. The anagama revival reintroduced wood ash as an active glazing agent: fly ash, flame path, and ember contact produce surfaces impossible with applied glazes. Extended firings (3\u20137 days) create complex, site-specific atmospheric effects that represent a direct rejection of the reproducibility paradigm."
    },
    "Michael Cardew \u2014 \u201CPioneer Pottery\u201D": {
        "simple": "Michael Cardew, one of Leach\u2019s students, wrote about the traditional pottery methods he learned while working in West Africa \u2014 preserving knowledge that might otherwise have been lost.",
        "detailed": "Cardew (1901\u20131983), Leach\u2019s first apprentice, documented pre-industrial pottery methods developed during decades of practice in West Africa (Gold Coast/Ghana, 1942\u201348; Nigeria, 1950\u201365). \u201CPioneer Pottery\u201D preserves traditional techniques \u2014 wood-fired kilns, local clay preparation, ash glazes \u2014 that were rapidly disappearing as industrial methods spread globally."
    },
    "Barium Carbonate Safety Concerns": {
        "simple": "Scientists found that barium, a common glaze ingredient, could be harmful if it leached into food. Another round of reformulating glazes to make them safer.",
        "detailed": "Research on barium carbonate (BaCO\u2083) toxicity triggered another cycle of glaze reformulation. Barium\u2019s ability to produce rich, satiny matte surfaces made it popular in studio glazes, but concerns about its bioavailability in functional ware led to the development of alternative matte mechanisms (alumina matte, magnesia matte, zinc matte) and stricter leaching standards."
    },
    "Hamer & Hamer \u2014 \u201CThe Potter\u2019s Dictionary\u201D": {
        "simple": "Frank and Janet Hamer wrote a big dictionary explaining every pottery term, material, and technique. If you\u2019ve ever wondered what a word means in ceramics, this is where you look it up.",
        "detailed": "The Hamers\u2019 encyclopedic reference covers virtually every aspect of ceramic materials and processes, from raw material chemistry to firing techniques. Its comprehensive, alphabetically organized format made it the definitive materials dictionary for studio potters worldwide. Multiple revised editions have kept it current."
    },
    "Wood Firing Workshops Spread Nationally": {
        "simple": "Wood-firing workshops popped up at schools and craft centers across America. Multi-day firings became communal events \u2014 people working together around the clock to keep the kiln going.",
        "detailed": "The proliferation of wood firing workshops and community kiln-building projects across American universities and craft schools (Penland, Haystack, Arrowmont) established multi-day firings as communal events. The labor-intensive process \u2014 requiring continuous stoking for 3\u20137 days \u2014 created a social dimension distinct from solitary electric kiln work, fostering community-based ceramic practice."
    },
    "Richard Burkett \u2014 Early BBS Glaze Databases": {
        "simple": "For the first time, potters shared glaze recipes on early computer networks. The digital age of ceramics had begun \u2014 recipes that used to be secrets were now just a download away.",
        "detailed": "The appearance of glaze databases on bulletin board systems (BBS) marked the beginning of digital ceramic knowledge. For the first time, glaze recipes could be shared electronically \u2014 searchable, copyable, and transmissible without physical presence. This prefigured the web-based databases (Digitalfire, Glazy) that would transform ceramic knowledge sharing."
    },
    "Daniel de Montmollin \u2014 \u201CPratique des \u00e9maux de gr\u00e8s\u201D": {
        "simple": "A French monk spent years testing 60 different glaze combinations and published all the results in beautiful charts. His book shows exactly what happens when you change the ingredients.",
        "detailed": "Brother Daniel de Montmollin published 60 SiO\u2082\u2013Al\u2082O\u2083 charts showing how different flux combinations affect melting behavior at cone 13. Each chart holds one flux composition constant while mapping the SiO\u2082\u2013Al\u2082O\u2083 response surface with actual fired test tiles. Originally published in French (1987); English translation \u201CPractice of Stoneware Glazes\u201D (2005). The scope of systematic empirical work is unmatched."
    },
    "Nigel Wood \u2014 \u201CChinese Glazes\u201D": {
        "simple": "Nigel Wood wrote a scholarly book tracing 3,000 years of Chinese glaze history, with actual recipes so modern potters could recreate the glazes of ancient masters.",
        "detailed": "Wood\u2019s \u201CChinese Glazes: Their Origins, Chemistry and Recreation\u201D (A&C Black / University of Pennsylvania Press, 1999) provides scholarly analysis of 3,000 years of Chinese glaze development, combining chemical analyses of historical sherds with practical recipes for reproducing historic glazes using Western raw materials. It bridges archaeological science and studio practice."
    },
    "Cone 6 Oxidation Movement Begins": {
        "simple": "A growing group of potters started proving you could make great glazes at a lower temperature in an electric kiln \u2014 safer, cheaper, and easier than the traditional high-fire method.",
        "detailed": "The emerging cone 6 oxidation community challenged the orthodoxy that serious studio ceramics required cone 10 reduction firing. By demonstrating that high-quality functional glazes could be achieved at cone 6 in electric kilns \u2014 without toxic fumes, lower energy costs, and broader accessibility \u2014 this movement set the stage for the paradigm shift documented in Hesselberth & Roy\u2019s 2002 publication."
    },
    "Ian Currie \u2014 \u201CStoneware Glazes: A Systematic Approach\u201D": {
        "simple": "Ian Currie invented the \u201CGrid Method\u201D \u2014 a way to test 35 glaze variations on one tile. Instead of random experiments, potters could now systematically explore what\u2019s possible. This changed how everyone tests glazes.",
        "detailed": "Currie (d. 2011) introduced the Grid Method for systematic glaze testing: a 5\u00d77 matrix of test tiles that varies SiO\u2082 and Al\u2082O\u2083 independently across a defined range while holding fluxes constant. This approach efficiently maps the SiO\u2082\u2013Al\u2082O\u2083 landscape with actual fired results, bridging Stull\u2019s theoretical chart and studio practice. The method transforms testing from random trials to mathematical coverage of compositional space."
    },

    # ─── DIGITAL ERA ───────────────────────────────────────────────

    "First Ceramic Calculation Software (DOS)": {
        "simple": "The first computer programs for calculating glazes appeared. Instead of doing math by hand, potters could type in ingredients and get the chemistry instantly.",
        "detailed": "Desktop glaze calculation software for DOS platforms automated the conversion of weight-percent batch recipes to UMF (molar oxide ratios). This computational approach eliminated the tedious hand-calculation of Seger formulas \u2014 a process that had limited practical adoption of the UMF system for nearly a century."
    },
    "GlazeMaster Software": {
        "simple": "Ron Roy and John Hesselberth made a computer program called GlazeMaster that let any potter with a computer calculate glaze chemistry. Software made UMF accessible to everyone.",
        "detailed": "GlazeMaster, developed by Ron Roy and John Hesselberth, provided professional-grade glaze calculation with an interface designed for studio potters rather than ceramic engineers. Desktop software reduced the barrier to UMF adoption from \u201Ccan do matrix algebra\u201D to \u201Ccan use a computer.\u201D"
    },
    "Early Internet Ceramic Forums": {
        "simple": "Potters started talking to each other on the early internet. For the first time, someone in Oregon could ask a question and get an answer from someone in England the same day.",
        "detailed": "First online ceramic communities on Usenet and early web forums enabled global discourse about ceramic materials and techniques. Geographic isolation \u2014 previously a major barrier to knowledge exchange \u2014 began to dissolve as potters could exchange technical knowledge without physical proximity."
    },
    "Jack Troy \u2014 \u201CWood-Fired Stoneware and Porcelain\u201D": {
        "simple": "Jack Troy wrote the definitive book on wood firing \u2014 explaining the science and art of building kilns, managing fires, and understanding how wood ash creates natural glazes.",
        "detailed": "Troy\u2019s comprehensive reference documents kiln design, firing techniques, and the chemistry of wood ash glazing (CaO-K\u2082O-SiO\u2082 systems from wood ash). The book provides the intellectual framework for the American anagama revival and legitimizes wood firing as a discipline with its own scientific rigor."
    },
    "Tony Hansen \u2014 Digitalfire.com & Insight": {
        "simple": "Tony Hansen created Digitalfire.com \u2014 a free website with over 7,000 pages about every ceramic material you can think of. He also made Insight, a glaze calculation program that became the industry standard.",
        "detailed": "Hansen launched Digitalfire.com and the Insight glaze calculation software, creating the most comprehensive online ceramics resource (7,730+ articles). Insight\u2019s implementation of West & Gerrow thermal expansion coefficients became the industry standard for coefficient-of-expansion calculation. Digitalfire\u2019s systematic materials documentation \u2014 standardized testing data for virtually every commercially available ceramic material \u2014 democratized materials knowledge."
    },
    "HyperGlaze Software": {
        "simple": "Another glaze calculation program appeared in Australia. Having multiple competing programs pushed all of them to get better and gave potters more choices.",
        "detailed": "Nigel Palmer\u2019s HyperGlaze (Australia) provided an alternative calculation tool with different visualization approaches. Competition among multiple software platforms (Insight, GlazeMaster, HyperGlaze, GlazeChem) accelerated feature development and expanded the user base for computational ceramic chemistry."
    },
    "Clayart Reaches 1,000+ Members": {
        "simple": "The Clayart email group grew to over 1,000 members \u2014 potters, scientists, and hobbyists helping each other solve problems in real time, from anywhere in the world.",
        "detailed": "The Clayart email listserv became the first major global discussion forum for ceramics, with expert potters, ceramic engineers, and hobbyists engaging in real-time problem solving across continents. This marked the transition from local/regional knowledge communities to a truly global ceramics discourse."
    },
    "Robin Hopper \u2014 \u201CThe Ceramic Spectrum\u201D": {
        "simple": "Robin Hopper wrote a complete guide to ceramic colors \u2014 explaining exactly which minerals produce which colors and how they interact with each other.",
        "detailed": "Hopper\u2019s comprehensive colorant guide documents the full spectrum of ceramic colorants (transition metal oxides, rare earth oxides, inclusion pigments) and their interactions with different flux systems, firing atmospheres, and cooling schedules. The definitive colorant reference for studio potters."
    },
    "First Web-Based Glaze Calculators": {
        "simple": "Glaze calculators moved to the web \u2014 no download needed. Just open a browser and start calculating. The cloud era of ceramics began.",
        "detailed": "Browser-based glaze calculation tools eliminated software installation requirements, enabling platform-independent access and lowering the barrier to adoption. This shift from desktop to web prefigured the fully cloud-based systems (Glazy, modern Digitalfire) that followed."
    },
    "Linda Arbuckle \u2014 GlazeChem Database": {
        "simple": "Linda Arbuckle at the University of Florida built a database for learning glaze chemistry. She focused on teaching people how to think about glazes, not just mixing recipes.",
        "detailed": "Arbuckle\u2019s GlazeChem database and educational materials at the University of Florida took a pedagogical approach to glaze sharing \u2014 teaching the analytical method (UMF calculation, limit formula analysis) rather than merely distributing recipes. This \u201Cteach to fish\u201D approach influenced online ceramic education philosophy."
    },
    "John Sankey \u2014 Systematic Expansion Research": {
        "simple": "John Sankey in Canada started building a big database of how much different glazes expand and shrink. This data helps potters prevent cracking and crazing.",
        "detailed": "Sankey\u2019s comprehensive database of glaze thermal expansion coefficients (Canada) enabled systematic prediction of glaze-body fit \u2014 the compatibility between a glaze\u2019s thermal expansion and its clay body\u2019s. Crazing (expansion mismatch) and shivering (compression mismatch) became predictable and preventable through calculated coefficient comparison."
    },
    "Hesselberth & Roy \u2014 \u201CMastering Cone 6 Glazes\u201D": {
        "simple": "This book proved that you can make beautiful, food-safe glazes in a regular electric kiln at cone 6 \u2014 no gas, no reduction, no toxic fumes. It changed what temperature most potters fire at.",
        "detailed": "Hesselberth and Roy validated cone 6 oxidation as a safe, sustainable, high-quality alternative to cone 10 reduction. Through systematic testing of over 1,000 glaze compositions, they demonstrated that excellent functional glazes \u2014 durable, food-safe, aesthetically diverse \u2014 could be achieved in electric kilns. The publication triggered a permanent shift: cone 6 oxidation became the dominant firing range in North American studio ceramics."
    },
    "John Sankey \u2014 Expansion Database Published": {
        "simple": "Sankey published his expansion data so everyone could use it. Now any potter could calculate whether their glaze would fit their clay body.",
        "detailed": "Publication of comprehensive thermal expansion data enabled studio potters to calculate glaze-body fit using coefficients of thermal expansion (CTE). Combined with Insight\u2019s West & Gerrow CTE calculations, this data made crazing and shivering problems solvable through quantitative analysis rather than empirical trial-and-error."
    },
    "Cone6Pots Yahoo Group": {
        "simple": "A big online group formed where potters shared results from testing cone 6 glazes. Working together, they tested more variations than any one person ever could.",
        "detailed": "The Cone6Pots Yahoo Group established a crowd-sourced model for glaze development: potters sharing results from standardized tests across different kilns, clays, and environments. This collaborative approach \u2014 distributed testing with shared results \u2014 built collective knowledge faster than any individual or institution could alone."
    },
    "John Britt \u2014 \u201CThe Complete Guide to High-Fire Glazes\u201D": {
        "simple": "John Britt tested hundreds of glaze recipes himself and published them all in one book, covering copper reds, shinos, salt glazes, and more. He taught that testing and sharing is the heart of pottery.",
        "detailed": "Britt, former Clay Coordinator at Penland School of Crafts, published a comprehensive reference for cone 10 glazing with hundreds of personally tested recipes covering copper, iron, shino, salt/soda, and crystalline glazes with rigorous chemistry. His workshop-based methodology \u2014 test, document, share \u2014 embodies the democratization of glaze knowledge."
    },
    "Spreadsheet Glaze Calculators": {
        "simple": "Potters started sharing glaze calculators built in Excel and Google Sheets \u2014 free tools anyone could download and modify. No expensive software needed.",
        "detailed": "Excel and Google Sheets-based calculation tools widely shared online democratized glaze computation beyond commercial software. These free, modifiable tools enabled users to customize calculations, add personal materials databases, and share templates \u2014 prefiguring open-source approaches to ceramic technology."
    },
    "Manganese Toxicity Research": {
        "simple": "Scientists warned that manganese dioxide \u2014 a common ingredient for brown and purple colors \u2014 could be hazardous. Yet another glaze material that potters had to reconsider.",
        "detailed": "Health research on manganese dioxide (MnO\u2082) \u2014 widely used for brown and purple colorant effects \u2014 revealed neurotoxicity risks from inhalation of raw material dust. This continued the recurring cycle in ceramics: materials considered safe for generations requiring reassessment as toxicological science advances."
    },
    "Global Financial Crisis \u2192 DIY Ceramics Boom": {
        "simple": "When the economy crashed in 2008, lots of people picked up pottery as a creative hobby. YouTube tutorials made it easy to learn for free, and suddenly millions of new people were interested in ceramics.",
        "detailed": "The 2008 economic downturn, combined with the proliferation of YouTube tutorials, drove a significant expansion of hobbyist ceramics. This demographic shift \u2014 from primarily academic/professional practitioners to a massive amateur community \u2014 fundamentally altered the landscape of ceramic knowledge consumption and production."
    },
    "First Pottery Tutorials on YouTube": {
        "simple": "Pottery teachers started making free video tutorials on YouTube. For the first time, you could watch someone mix a glaze or throw a pot instead of just reading about it.",
        "detailed": "Video-based ceramic education on YouTube reached mass audiences for the first time, supplementing text-based learning with visual demonstration. Students could observe glaze mixing, application techniques, and firing procedures \u2014 tacit knowledge that had previously required physical co-presence with an instructor."
    },
    "r/Pottery and Online Communities": {
        "simple": "Reddit, Instagram, and other social media platforms became huge gathering places for potters. A new generation discovered ceramics through scrolling, not school.",
        "detailed": "The emergence of ceramic communities on Reddit, Instagram, and other social platforms established a new pathway into ceramics: self-directed learning through social media rather than formal education. This expanded the practitioner community beyond traditional academic pipelines."
    },
    "Mobile Apps for Glaze Calculation": {
        "simple": "Glaze calculation apps appeared for phones. Now you could figure out your glaze chemistry right at the kiln or mixing bucket \u2014 not just at your computer.",
        "detailed": "Phone-based calculation tools enabled in-studio glaze computation \u2014 at the kiln, at the mixing bucket, at the materials shelf \u2014 rather than requiring return to a desktop computer. This mobility removed the last physical barrier between calculation and practice."
    },
    "Digitalfire Systematic Materials Testing": {
        "simple": "Tony Hansen\u2019s Digitalfire website grew into a massive database with scientific test data for almost every ceramic material you can buy \u2014 a free encyclopedia of ceramics.",
        "detailed": "Hansen\u2019s comprehensive materials documentation project expanded to cover virtually every commercially available ceramic material with standardized testing data: thermal expansion,ite spectrum, oxide composition, particle size, and application notes. This systematic approach to materials knowledge has no equivalent in other craft disciplines."
    },
    "Instagram Pottery Community": {
        "simple": "Instagram became a huge platform for potters to share photos of their glazes. People started choosing glaze recipes based on how they looked in pictures, creating new trends.",
        "detailed": "Image-based knowledge sharing on Instagram transformed how potters learn and share. Glaze surfaces became visual vocabulary \u2014 scrollable, shareable, and immediately comparable. \u201CInstagram glazes\u201D emerged as an aesthetic category, with certain surface effects (drippy, high-contrast, crystalline) amplified by the platform\u2019s visual format."
    },
    "Matt Katz \u2014 Ceramic Materials Workshop": {
        "simple": "Matt Katz started hands-on workshops where potters make and test glazes using the Stull chart as their guide. Learning by doing \u2014 mixing, firing, and seeing the results yourself.",
        "detailed": "Katz\u2019s Ceramic Materials Workshop program revived systematic materials understanding through direct experience, adapting Stull chart research for modern cone 6 firing. Participants construct and fire their own test tiles, building firsthand understanding of the SiO\u2082\u2013Al\u2082O\u2083 relationship. This pedagogy bridges the gap between theoretical knowledge and embodied practice."
    },
    "Facebook Pottery Groups Reach Critical Mass": {
        "simple": "Pottery groups on Facebook grew to over 100,000 members. More people were sharing glaze recipes online than ever before in history.",
        "detailed": "Multiple large ceramic Facebook groups exceeding 100,000 members established mainstream social media as the primary public forum for ceramic knowledge exchange. This scale \u2014 orders of magnitude larger than any previous ceramic community \u2014 democratized access but introduced challenges of information quality and expertise verification."
    },
    "Cloud-Based Glaze Calculation": {
        "simple": "Glaze calculators moved to the cloud \u2014 available from any device, always up to date, no installation needed. The desktop software era was ending.",
        "detailed": "Web applications replaced desktop software as the primary calculation platform, enabling platform-independent access, automatic updates, and cloud-synchronized user data. This architectural shift reduced barriers to adoption and enabled collaborative features impossible in desktop applications."
    },
    "Derek Philipau \u2014 Glazy.org": {
        "simple": "Derek Philipau created Glazy, a free, open-source website where potters share recipes, see them plotted on a Stull chart, and learn from each other\u2019s results. All the knowledge is owned by the community.",
        "detailed": "Philipau launched Glazy (2016), the first fully open-source ceramics database, implementing D3.js Stull chart visualization and community-contributed recipes with UMF analysis. Glazy proved that ceramic knowledge could be collectively owned and openly shared. The glazy-data repository on GitHub made thousands of tested recipes available as structured open data \u2014 a paradigm shift from proprietary knowledge."
    },
    "Computational Fluid Dynamics for Kiln Atmosphere": {
        "simple": "Scientists started using computers to simulate how air flows inside a kiln. This helps predict temperature differences and flame paths that affect how glazes turn out.",
        "detailed": "Computer modeling of kiln atmosphere flow and temperature distribution using CFD (Computational Fluid Dynamics) brought engineering simulation to ceramic firing. Atmospheric effects \u2014 once the domain of intuition and experience \u2014 became scientifically predictable, enabling optimization of kiln design and firing schedules."
    },
    "Machine Learning Glaze Experiments": {
        "simple": "Researchers started teaching computers to predict what a glaze will look like based on its recipe. The first steps toward AI-designed glazes.",
        "detailed": "Academic research papers explored using machine learning (neural networks, random forests, gradient boosting) to predict glaze properties \u2014 color, surface quality, thermal expansion \u2014 from oxide composition. This represented the first tentative steps toward computationally-assisted ceramic design."
    },
    "Pieter Mostert \u2014 \u201CUnderstanding the Stull Chart\u201D": {
        "simple": "Pieter Mostert wrote one of the clearest explanations of the Stull chart ever published, using a \u201Cforest metaphor\u201D that makes it easy to understand. This helped bring Stull\u2019s century-old chart back to life for a new generation.",
        "detailed": "Mostert\u2019s publication on the Glazy Wiki provided a rigorous modern reinterpretation of Stull\u2019s original research, including the \u201Cforest metaphor\u201D for navigating UMF compositional space. By contextualizing Stull\u2019s 1912 work within contemporary understanding of glass formation, melt viscosity, and alumina\u2019s dual role (amphoteric behavior), Mostert modernized and revitalized the most important visual tool in glaze chemistry."
    },
    "TikTok Ceramic Explainers": {
        "simple": "Pottery teachers started making 60-second videos on TikTok explaining glaze chemistry. A totally new way to learn \u2014 fast, visual, and reaching millions of people who\u2019d never been in a ceramics class.",
        "detailed": "Short-form video ceramic education on TikTok radically compressed knowledge transmission \u2014 60-second glaze chemistry explainers reaching millions of viewers. This format maximizes accessibility at the cost of depth, embodying the eternal tension between democratization and rigor in ceramic education."
    },
    "Linda Bloomfield \u2014 \u201CColour in Glazes\u201D (2nd ed.)": {
        "simple": "Linda Bloomfield updated her book on glaze color, adding sections about the Stull chart for the first time. More potters learned about this important tool through her book.",
        "detailed": "Bloomfield\u2019s updated edition included sections on the Stull chart, expanding awareness of SiO\u2082\u2013Al\u2082O\u2083 mapping to a broader audience of ceramic artists primarily interested in colorant chemistry. This integration of Stull\u2019s framework into a colorant-focused text reflects the growing recognition of structural composition as inseparable from color behavior."
    },
    "COVID-19 Pandemic \u2014 Virtual Ceramics": {
        "simple": "When the pandemic shut down studios and workshops, potters moved everything online. Zoom classes, shared Google Sheets, and Discord servers became the new classroom. This permanent shift means anyone anywhere can learn pottery now.",
        "detailed": "Physical workshop closures worldwide forced an abrupt transition to virtual learning: shared Google Sheets replaced studio notebooks, Discord servers replaced critique sessions, and Zoom workshops crossed time zones. This crisis-driven digitization produced a permanent shift toward hybrid (in-person + virtual) ceramic education, dramatically expanding geographic access."
    },
    "Discord Servers Replace Forums": {
        "simple": "Potters moved to Discord for real-time chat about glazes and techniques. Instead of waiting for someone to reply on a forum, you could troubleshoot a glaze problem live with people around the world.",
        "detailed": "Real-time collaborative glaze development on Discord servers replaced the asynchronous model of email lists and web forums. Synchronous communication enabled within-session troubleshooting: a potter could post a problem, receive analysis from multiple experienced practitioners, and implement solutions in the same studio session."
    },
    "Chromium Toxicity Research": {
        "simple": "Scientists found that certain forms of chromium in glazes could be harmful. Another material that potters have to be careful with \u2014 the safety cycle continues.",
        "detailed": "Research on hexavalent chromium (Cr\u2076\u207a) concerns led to reformulations in red and green colorant systems. While trivalent chromium (Cr\u2082O\u2083) used in ceramics is generally stable, the potential for oxidation to toxic Cr\u2076\u207a under certain firing conditions required reassessment of chromium-containing glaze formulations."
    },
    "Supply Chain Disruptions": {
        "simple": "When global shipping broke down, potters couldn\u2019t get their usual materials. This forced them to look locally \u2014 digging their own clay, collecting wood ash, and using whatever they could find nearby.",
        "detailed": "Global material shortages forced widespread glaze reformulation and renewed interest in local sourcing. Wild clay, wood ash, and foraged materials experienced a revival driven by both necessity and emerging sustainability ethics. This crisis accelerated the shift from globally-sourced standardized materials toward locally-adapted ceramic practice."
    },
    "AI/ML Glaze Prediction Papers": {
        "simple": "Scientists published more and more papers about using AI to design glazes. Computer algorithms were getting better at predicting what a glaze will look like before you even fire it.",
        "detailed": "Proliferation of academic papers applying machine learning to glaze design \u2014 predicting surface quality, color (L*a*b* coordinates), thermal expansion, and durability from oxide composition alone. Models trained on datasets like Glazy\u2019s open repository demonstrated increasingly accurate predictions, suggesting computational approaches could complement (not replace) empirical testing."
    },
    "Short-Form Video Dominates": {
        "simple": "TikTok and Instagram Reels became how most new potters learn. Quick, visual, and millions of views \u2014 but you lose the depth that comes from a book or a workshop.",
        "detailed": "Short-form video (TikTok, Instagram Reels) became the primary learning format for new potters, with 60-second glaze chemistry explainers reaching millions. This format maximizes accessibility but sacrifices depth \u2014 embodying the fundamental tension between democratic access and rigorous education that recurs throughout ceramic history."
    },
    "Real-Time Kiln Monitoring": {
        "simple": "You can now watch your kiln\u2019s temperature on your phone while you\u2019re away. Internet-connected controllers send alerts and log every firing automatically.",
        "detailed": "IoT kiln controllers with smartphone integration became consumer-accessible, enabling remote monitoring of firing schedules, real-time temperature alerts, and automatic data logging. This connected-kiln paradigm generates structured firing data that can be analyzed for pattern recognition and optimization."
    },
    "AI/ML Glaze Prediction Becomes Practical": {
        "simple": "AI tools for designing glazes moved from university labs to practical tools that real potters can use. Tell the computer what you want, and it suggests recipes to try.",
        "detailed": "Machine learning models transitioned from academic research to practical tools suggesting novel glaze compositions based on desired properties (target color, surface quality, thermal expansion). Testing becomes validation rather than discovery \u2014 fundamentally altering the traditional empirical workflow of ceramic formulation."
    },
    "Collaborative Testing Networks": {
        "simple": "Potters started organizing large-scale testing projects on Discord and social media \u2014 crowds of people all testing variations and sharing results. Together, they test more than any university lab ever could.",
        "detailed": "Organized testing campaigns coordinated through Discord and social media represent a new paradigm: crowd-sourced systematic testing at a scale exceeding any individual or institutional capacity. Standardized protocols ensure comparability across different kilns, clays, and environments."
    },
    "IoT Kilns with Cloud Data Logging": {
        "simple": "Kiln controllers now automatically upload firing data to the cloud. This creates a huge dataset of real firings that can reveal patterns no one has seen before.",
        "detailed": "Cloud-connected kiln controllers with automatic data upload create aggregated firing datasets \u2014 enabling big-data approaches to kiln optimization. Patterns across thousands of firings become visible, potentially revealing correlations between firing schedules and outcomes that elude individual observation."
    },
    "Sustainability Research Accelerates": {
        "simple": "Potters and scientists are working together to make ceramics more sustainable \u2014 using local materials, reducing energy waste, and measuring the environmental impact of different firing methods.",
        "detailed": "Carbon footprint analysis of ceramic materials and firing processes is driving evidence-based sustainability practices. Research into alternative fluxes (recycled glass, industrial waste), lower-temperature firing schedules, and locally-sourced materials accelerates as the ceramic community confronts environmental responsibility."
    },
    "Stull Atlas \u2014 Interactive Explorer": {
        "simple": "This app! An interactive version of Stull\u2019s century-old chart that lets you explore thousands of real glaze recipes, calculate your own, and see how they all relate to the science. Built to make glaze chemistry visual, approachable, and fun for everyone.",
        "detailed": "Stull Atlas is an interactive Stull chart explorer plotting 3,000+ real-world glaze recipes by UMF, with 3D visualization, blend calculators, comprehensive materials database, genetic-algorithm recipe optimizer, AI-assisted glaze suggestion, and similarity tools. Built to preserve and extend the analytical tradition from Seger (1886) through Stull (1912) to Glazy (2016) \u2014 making 140 years of ceramic science accessible through modern web technology."
    },
}


def main():
    with open(r'src\pages\timelineData.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    added = 0
    skipped = 0
    not_found = 0

    for title, descs in DESCRIPTIONS.items():
        # Check if already has descriptionSimple
        # Find the event by its title
        title_escaped = title.replace("'", "\\'")

        # Look for the description line of this event (which doesn't already have descriptionSimple after it)
        # Find the event block by looking for the title
        idx = content.find(f"title: '{title}',")
        if idx == -1:
            # Try with escaped quotes
            idx = content.find(f"title: '{title_escaped}',")
        if idx == -1:
            print(f"  NOT FOUND: {title[:60]}")
            not_found += 1
            continue

        # Check if already has descriptionSimple nearby (within next 500 chars)
        block = content[idx:idx + 800]
        if 'descriptionSimple' in block:
            skipped += 1
            continue

        # Find the description line and its end
        desc_start = content.find("description: '", idx)
        if desc_start == -1 or desc_start > idx + 600:
            print(f"  NO DESC: {title[:60]}")
            not_found += 1
            continue

        # Find end of description value - need to find the matching closing quote
        # The description is a single-quoted string that may contain escaped quotes
        i = desc_start + len("description: '")
        while i < len(content):
            if content[i] == '\\':
                i += 2  # skip escaped char
            elif content[i] == "'":
                break
            else:
                i += 1

        # i is now at the closing quote
        desc_end = i + 1  # include the quote
        # Find the comma and newline after
        rest = content[desc_end:]
        comma_nl = rest.find(',\n')
        if comma_nl == -1:
            print(f"  NO COMMA: {title[:60]}")
            not_found += 1
            continue

        insert_pos = desc_end + comma_nl + 2  # after the comma and newline

        # Build the two new lines
        simple = descs['simple'].replace("'", "\\'")
        detailed = descs['detailed'].replace("'", "\\'")
        new_lines = f"    descriptionSimple: '{simple}',\n    descriptionDetailed: '{detailed}',\n"

        content = content[:insert_pos] + new_lines + content[insert_pos:]
        added += 1

    with open(r'src\pages\timelineData.ts', 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"\nDone! Added: {added}, Skipped (already done): {skipped}, Not found: {not_found}")


if __name__ == '__main__':
    main()
