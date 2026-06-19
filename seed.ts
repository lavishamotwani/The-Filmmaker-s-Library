import { db } from '@workspace/db';
import {
  coursesTable,
  phasesTable,
  modulesTable,
  resourcesTable,
  exercisesTable,
} from '@workspace/db';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('Clearing existing data...');
  await db.delete(exercisesTable);
  await db.delete(resourcesTable);
  await db.delete(modulesTable);
  await db.delete(phasesTable);
  await db.delete(coursesTable);

  console.log('Seeding courses...');

  const [directorsEye] = await db.insert(coursesTable).values({
    slug: 'directors-eye',
    title: "The Director's Eye",
    description: 'A complete self-directed curriculum in cinematography and direction. Two segments: a 6–8 week foundation sprint covering the 13 essential concepts, then a multi-year deep curriculum across 13 phases — image, light, motion, sound, actors, editing, documentary, and the masters. Designed for the solo filmmaker who must be director, DP, sound recordist, and editor all at once.',
    color: '#C9A96E',
    icon: '🎬',
    sortOrder: 1,
  }).returning();

  const [writersMaster] = await db.insert(coursesTable).values({
    slug: 'writers-master',
    title: "The Writer's Master Curriculum",
    description: 'A complete, self-directed programme in screenwriting, world cinema, character, mythology, literature, psychology, and the writer\'s practice. Eight phases across 41 modules. A map for building a writer\'s mind capable of holding Chekhov and Parasite, the Ramayana and Cassavetes, Jung and folk tales, all at once.',
    color: '#8B6F47',
    icon: '✍️',
    sortOrder: 2,
  }).returning();

  console.log("Seeding Director's Eye phases and modules...");

  const [deSegOne] = await db.insert(phasesTable).values({
    courseId: directorsEye.id,
    title: 'Segment One — The Foundation',
    description: 'A rapid, rigorous overview: 13 lessons over 6–8 weeks. Each lesson takes 3–5 days. You will read, watch, do an exercise, and make something. By the end you will have shot your first short piece and know how to think about every image you make.',
    sortOrder: 1,
  }).returning();

  await db.insert(modulesTable).values([
    {
      phaseId: deSegOne.id,
      title: 'The Frame: Every Image Is a Decision',
      description: 'What you see is what you choose. Framing is not neutral — it is argument. Study Every Frame a Painting (all 28 YouTube essays by Tony Zhou). Read The Filmmaker\'s Eye (Mercado, Chapters 1–3). Watch 20 minutes each of Tokyo Story (Ozu) and Bicycle Thieves (De Sica) — pause every 5 minutes and ask: where is the camera? How high? What is in the frame that did not have to be? Exercise: the 10-Frame Day (10 deliberate photographs, 3 sentences each). The Painting Study (Hopper\'s Nighthawks — describe it, then describe the camera position that would recreate it).',
      sortOrder: 1,
    },
    {
      phaseId: deSegOne.id,
      title: 'Light: The Cinematographer\'s Only Tool',
      description: 'Light does not illuminate a scene. Light creates a scene. Read In the Blink of an Eye (Murch, first 30 pages) and Lighting for Cinematography (Landau, Chapters 1–3): hard vs. soft light, direction, colour temperature, contrast. Watch Wolfcrow\'s "light direction" series and Aputure\'s 3-Point Lighting tutorial on YouTube. Study: Kaagaz Ke Phool (Guru Dutt / V.K. Murthy, 1959) — the single shaft of light through the skylight. Pather Panchali (Ray / Subrata Mitra, 1955) — Mitra\'s bounce lighting invention. Exercise: film a subject near a window at morning, noon, and afternoon without moving anything. Write one paragraph on what changed emotionally, not technically. The Rembrandt Study: recreate the light of a Rembrandt self-portrait using only a window.',
      sortOrder: 2,
    },
    {
      phaseId: deSegOne.id,
      title: 'The Camera Moves — Or It Doesn\'t',
      description: 'Every camera move is a decision. Stillness is also a decision. The question is not how to move — the question is why. Watch Every Frame a Painting: "Spielberg — the Spielberg Oner" and "Welles and the Long Take." Watch Film Riot\'s "How to Move a Camera." Read On Directing Film (Mamet, 100 pages, one afternoon). Films to study: The Silence of the Lambs (Demme\'s direct-address close-up), Come and See (Klimov — the camera participates in the war), Taste of Cherry (Kiarostami — stillness as philosophical argument). Exercise: same scene three ways — static wide, slow dolly in, handheld close. Write what each version says about the character\'s interior state.',
      sortOrder: 3,
    },
    {
      phaseId: deSegOne.id,
      title: 'Lenses — The Emotional Optic',
      description: 'A lens is not a technical choice. A lens is an emotional argument about the world. Read Cinematography: Theory and Practice (Blain Brown, Chapters 4–5 on lenses and optics). Watch In Depth Cine\'s "Focal Length Explained" and Wolfcrow\'s "Lens Choice and Storytelling." Wide lenses (16–24mm): expand space, distort faces at close range, create oppressive interiors. Standard (35–50mm): closest to human perception, "invisible." Telephoto (85mm+): compress space, isolate subject, create surveillance or longing — The Godfather\'s 400mm traps its characters. Exercise: the Lens Diary — for one week, note what zooming in and out does to the feeling of your phone photographs.',
      sortOrder: 4,
    },
    {
      phaseId: deSegOne.id,
      title: 'The Cut — Why Editing Is Directing',
      description: 'The director\'s work is not on set. It is in the edit. Every shot you choose is a choice about what comes next. Read In the Blink of an Eye (Murch, the rest). Murch\'s Rule of Six: Emotion, Story, Rhythm, Eye-trace, 2D plane, 3D space — in that order of priority. Watch any 5-minute explainer on the Kuleshov Effect. Watch StudioBinder\'s "8 Cuts Every Filmmaker Should Know." Films: Battleship Potemkin (Eisenstein, 1925) — the Odessa Steps sequence: meaning made in the collision between shots. Breathless (Godard, 1960) — the jump cut as accidental discovery kept as style. Exercise: the Kuleshov Experiment — one neutral face intercut with three different objects; show to someone and ask what emotion they see. The face is identical. The context creates the emotion.',
      sortOrder: 5,
    },
    {
      phaseId: deSegOne.id,
      title: 'Sound — The Other Half of Cinema',
      description: 'You see with your eyes and hear with your body. Sound is the half of cinema most students never study. Read In the Blink of an Eye (Murch, revisit — his chapters on sound design). Watch No Film School\'s "Sound Design in Film" series. Search YouTube for "sound design Apocalypse Now Murch." Films: A Separation (Farhadi) — offscreen sound as information the audience receives before the characters do. Stalker (Tarkovsky) — almost entirely real-world acoustic texture, no score for long stretches. Bresson\'s Pickpocket and A Man Escaped — "the ear goes more towards the within, the eye towards the outer." Exercise: the Sound Walk — close your eyes in a public space for 10 minutes, write everything you hear by loudness then by emotional weight. Write a 1-page "sound script" for a scene here with no visual description. Exercise: the Silent Scene — shoot 2 minutes with no dialogue, then add only diegetic sound design.',
      sortOrder: 6,
    },
    {
      phaseId: deSegOne.id,
      title: 'Mise en Scène — The Director\'s Total Control',
      description: 'Everything in front of the camera is a decision. The director owns everything the lens sees. Watch StudioBinder\'s "What is Mise en Scène?" Read Making Movies (Sidney Lumet — the complete book, short and wise). Watch Every Frame a Painting: "Wes Anderson — Centered" and "David Fincher — And the Other Way Is Wrong." Films: The Godfather (Coppola / Gordon Willis) — the Don in shadow, petitioners in light; the staging creates the moral architecture. Nayakan (Mani Ratnam / P.C. Sriram, 1987) — the chawl vs. mansion contrast tells the story of what power costs. Exercise: choose one room, stage a disagreement between two people. Write a staging plan first. Film it. Compare plan to result.',
      sortOrder: 7,
    },
    {
      phaseId: deSegOne.id,
      title: 'Directing Actors — The Most Human Skill',
      description: 'The camera records what is in front of it. The director\'s job is to make sure what is in front of it is true. Read Directing Actors (Judith Weston, Chapters 1–5): actable vs. unactable notes. Unactable: "Be sad." Actable: "You just found out he\'s not coming back." Read True and False (Mamet, one sitting): actors should do the action, not feel the emotion. Watch Film Riot\'s "How to Direct Actors." Films: A Woman Under the Influence (Cassavetes) — Cassavetes rehearsed for months and let the cameras run; the camera serves the actor. The Salesman (Farhadi) — how Farhadi directs actors to withhold information. Exercise: give the same line three different notes — one unactable, one actable, one physical. Film each. Which produced the truest performance?',
      sortOrder: 8,
    },
    {
      phaseId: deSegOne.id,
      title: 'Documentary — The School of Reality',
      description: 'Documentary is not a lesser form of filmmaking. It is the hardest school. Reality does not cooperate. Read Introduction to Documentary (Bill Nichols, Chapters 1–2): the six modes — expository, observational, participatory, poetic, reflexive, performative. Watch Varda by Agnès (2019) — the greatest living example of the solo filmmaker-essayist. Watch The House Is Black (Farrokhzad, 1962, 22 minutes, free on YouTube) — the greatest short documentary ever made. Solo toolkit: a tripod is your crew; a directional microphone is your sound department; the observational method — set up, let the camera run, be present. Exercise: the 5-Minute Documentary — film one person doing their daily work for 30 minutes, edit to 5 minutes, no narration, no titles. What does someone who doesn\'t know them understand?',
      sortOrder: 9,
    },
    {
      phaseId: deSegOne.id,
      title: 'Visual Planning — The Director\'s Homework',
      description: 'What separates a director from someone who points a camera is preparation. The preparation is invisible. Its absence is not. Watch StudioBinder\'s "How to Create a Shot List" and Film Riot\'s "Location Scouting for Filmmakers." Read Reflections: On Cinematography (Roger Deakins, 2025) — his chapters on pre-production. The visual development process: script breakdown (dominant emotion, light source, camera relationship per scene), shot list (shot type, lens, movement, duration), storyboard (even stick figures — the act of drawing commits you to framing), mood board (images from paintings, photographs, films). Exercise: take one scene from Masaan, Court, or Moonlight. Create a shot list for it as if you were filming tomorrow — minimum 6 shots. Find a still from the actual film and compare.',
      sortOrder: 10,
    },
    {
      phaseId: deSegOne.id,
      title: 'Your First Short — The Laboratory',
      description: 'Everything before this lesson was preparation. This lesson is the work. Make a 3–5 minute documentary or essay film. Solo. You are the director, the DP, and the editor. Requirements: no required dialogue; must be edited, not raw footage; at least one deliberate compositional choice per shot; sound design even if minimal; a beginning, middle, and end. Process: Pre-production (1–2 days): choose subject, location, make a shot list and mood board, visit the location at the time of day you plan to film. Production (1–2 days): film; be present; let the camera find things you didn\'t plan. Post-production (2–3 days): edit; no more than 3 pieces of music; no titles to explain — trust the image. Study alongside: La Jetée (Marker, 1962, 28 min, free on YouTube) — a film made of still photographs and a voiceover. Cameraperson (Kirsten Johnson, 2016).',
      sortOrder: 11,
    },
    {
      phaseId: deSegOne.id,
      title: 'The Director-DP Relationship',
      description: 'When you are working alone, you are both. When you work with others, this relationship defines the film. Watch ASC (American Society of Cinematographers) YouTube — any three cinematographer interviews. Listen to Team Deakins Podcast (Episode 1 first — free on Spotify, Apple Podcasts). Study these partnerships as creative marriages: Satyajit Ray + Subrata Mitra (Apu Trilogy — Mitra invented bounce lighting because Ray wanted naturalism studio lighting couldn\'t achieve; when Mitra left after Charulata, Ray\'s visual register shifted permanently). Bergman + Nykvist (Cries and Whispers, Persona — "I try not to light a scene; I try to let it light itself"). Kubrick + Alcott (Barry Lyndon — lenses developed for NASA to shoot by candlelight). Tarkovsky + Yusov (the long take as philosophy). When you work alone, carry both halves of this conversation inside you.',
      sortOrder: 12,
    },
    {
      phaseId: deSegOne.id,
      title: 'What You\'re Missing — Gaps to Fill',
      description: 'Segment One gives you the language. Here is what the language does not yet cover — and where Segment Two begins. What Segment One does not cover: colour theory and grading; full technical understanding of exposure and sensors; production design; advanced acting theory (Stanislavski, Meisner); the full history of cinematography — the great DPs as individual schools of thought; music and film scoring; the director\'s full process across a feature production; the essay film and advanced documentary forms; specific directors as visual systems (Kubrick, Tarkovsky, Bresson, Malick, Cassavetes, Haneke, Kiarostami, Kurosawa, Ray, Ghatak). What to do now: make another short film; begin a Visual Notebook; move into Segment Two following what calls you.',
      sortOrder: 13,
    },
  ]);

  const [deP1] = await db.insert(phasesTable).values({ courseId: directorsEye.id, title: 'Phase I — The Grammar of the Image', description: 'Before you pick up a camera, you must understand how images have always worked. Composition, visual history, and the inherited grammar of 130 years of cinema.', sortOrder: 2 }).returning();
  const [deP2] = await db.insert(phasesTable).values({ courseId: directorsEye.id, title: 'Phase II — Light', description: 'The cinematographer\'s primary tool — and the most misunderstood. The physics and philosophy of light, from Rembrandt to LED panels. Colour as emotional argument.', sortOrder: 3 }).returning();
  const [deP3] = await db.insert(phasesTable).values({ courseId: directorsEye.id, title: 'Phase III — The Camera in Motion', description: 'Movement is meaning. Stillness is also meaning. Camera movement and the deep study of lenses as emotional instruments.', sortOrder: 4 }).returning();
  const [deP4] = await db.insert(phasesTable).values({ courseId: directorsEye.id, title: 'Phase IV — Exposure & Technical Foundation', description: 'The technical is in service of the emotional. Know this completely so you stop thinking about it.', sortOrder: 5 }).returning();
  const [deP5] = await db.insert(phasesTable).values({ courseId: directorsEye.id, title: 'Phase V — Editing', description: 'The cut is where cinema becomes cinema. Montage theory from Eisenstein to Murch, and how to shoot for the edit.', sortOrder: 6 }).returning();
  const [deP6] = await db.insert(phasesTable).values({ courseId: directorsEye.id, title: 'Phase VI — Mise en Scène', description: 'The world the camera sees must be controlled completely. Staging, blocking, production design.', sortOrder: 7 }).returning();
  const [deP7] = await db.insert(phasesTable).values({ courseId: directorsEye.id, title: 'Phase VII — Directing Actors', description: 'Performance is the most human element of cinema. Acting methods and the practical work of casting, rehearsal, and the set.', sortOrder: 8 }).returning();
  const [deP8] = await db.insert(phasesTable).values({ courseId: directorsEye.id, title: 'Phase VIII — Sound', description: 'Sound is the other half of cinema. Sound design as storytelling and the director\'s relationship with music.', sortOrder: 9 }).returning();
  const [deP9] = await db.insert(phasesTable).values({ courseId: directorsEye.id, title: 'Phase IX — The Director\'s Complete Process', description: 'From script to screen. Reading the script, visual development, the director on set, the director in the edit.', sortOrder: 10 }).returning();
  const [deP10] = await db.insert(phasesTable).values({ courseId: directorsEye.id, title: 'Phase X — Documentary & The Essay Film', description: 'The form that belongs to a solo filmmaker working alone. The full spectrum of documentary modes and the essay film as thinking in public.', sortOrder: 11 }).returning();
  const [deP11] = await db.insert(phasesTable).values({ courseId: directorsEye.id, title: 'Phase XI — The Masters', description: 'The great cinematographers and directors as individual visual systems. Study them as schools of thought.', sortOrder: 12 }).returning();
  const [deP12] = await db.insert(phasesTable).values({ courseId: directorsEye.id, title: 'Phase XII — Director-DP Partnerships', description: 'Some relationships are so complete they must be studied as a single creative intelligence. Seven partnerships studied together.', sortOrder: 13 }).returning();
  const [deP13] = await db.insert(phasesTable).values({ courseId: directorsEye.id, title: 'Phase XIII — The Director\'s Practice', description: 'Everything else is preparation. This is the work. The visual notebook, the short film programme, complete resources.', sortOrder: 14 }).returning();

  await db.insert(modulesTable).values([
    {
      phaseId: deP1.id, sortOrder: 1,
      title: 'Composition: The Architecture of the Frame',
      description: 'Composition is not about making pretty pictures. It is about where the eye goes, and why. Read: The Filmmaker\'s Eye (Mercado) — definitive text on cinematic composition; The Five C\'s of Cinematography (Mascelli, 1965) — Camera Angle, Continuity, Cutting, Close-up, Composition; Cinematic Storytelling (Van Sijll) — 100 visual techniques with film stills. Watch: Every Frame a Painting (full archive, 28 essays); kogonada video essays (Kubrick, Ozu, Welles, Bresson — search YouTube); StudioBinder Shot by Shot series. Photographers to study as composers: Cartier-Bresson (the decisive moment), Raghu Rai (Bhopal documentation), Dayanita Singh (memory and archive), Salgado (Workers, 1993). Painters: Vermeer (intimate interior framing, diagonal light), Caravaggio (chiaroscuro — direct source for Scorsese and Ridley Scott), Edward Hopper (every painting looks like a film still from a film not yet made). Exercises: Rule of Thirds Audit; Negative Space Study (5 stills where emptiness equals the subject); Frame-Within-a-Frame (10 natural frames in your environment).',
    },
    {
      phaseId: deP1.id, sortOrder: 2,
      title: 'The Visual History of Cinema — Image as Language',
      description: 'Cinema invented its visual grammar over 130 years. You must know the history to know what you are inheriting. Read: Film Art: An Introduction (Bordwell/Thompson, Chapters 1–5); On Photography (Sontag); Ways of Seeing (Berger, 160 pages — how ideology is embedded in every image). Key movements: German Expressionism (1919–30s) — The Cabinet of Dr. Caligari, Nosferatu, M; shadow, distortion, psychological dread; direct ancestor of film noir. Soviet Montage (1920s) — Eisenstein, Pudovkin, Kuleshov; meaning through collision. Italian Neorealism (1940s–50s) — natural light, real locations, non-professional actors; origin of documentary realism in fiction. French New Wave (1958–68) — jump cuts, handheld, improvisation. New Iranian Cinema (1980s–2000s) — restraint, ellipsis, poetry through indirection. Korean New Wave (1990s–2000s) — genre as social X-ray. Films: Sunrise (Murnau, 1927); Citizen Kane (Welles/Toland, 1941); Rashomon (Kurosawa/Miyagawa, 1950); Breathless (Godard/Coutard, 1960); 2001 (Kubrick); Days of Heaven (Malick/Almendros, 1978 — almost entirely shot in the 20 minutes after sunset).',
    },
    {
      phaseId: deP2.id, sortOrder: 1,
      title: 'The Physics and Philosophy of Light',
      description: 'Light is the only thing the cinematographer actually controls — everything else is a response to it. Read Cinematography: Theory and Practice (Blain Brown, complete) and Lighting for Cinematography (David Landau, complete). Physical qualities: hard light (small source, strong shadows — Caravaggio, film noir), soft light (large source, gradual shadows — Subrata Mitra\'s bounce technique), direction (Rembrandt — one source, one triangle of light on the face), colour temperature (tungsten 3200K warm, daylight 5600K cool, mixed sources = tension). Watch Wolfcrow\'s complete lighting series and In Depth Cine. Study: how V.K. Murthy created the shaft-of-light sequence in Kaagaz Ke Phool (1959); how Sven Nykvist described lighting Cries and Whispers — "deep red as the colour of the interior of the human body." Tools: a light meter; one practical light; a reflector made from white card.',
    },
    {
      phaseId: deP2.id, sortOrder: 2,
      title: 'Colour — The Emotional Spectrum',
      description: 'Colour is not decoration. It is argument. Colour temperature and the kelvin scale. The colour wheel and complementary contrast. Colour grading workflow — from LOG to finished image. Vittorio Storaro\'s colour as ideology: his colour theory for Apocalypse Now, The Last Emperor, Dick Tracy is the most developed intellectual framework for cinematographic colour, rooted in Jung and the philosophy of light. Study: The Last Emperor (1987) — colour shifts from imperial gold to communist grey; Amélie (2001) — saturated greens and reds as emotional register; Roma (2018) — desaturated, almost monochrome naturalism. Tool: DaVinci Resolve (free) — the industry standard; learn the primary colour wheels, the curves, the qualifier. Exercise: recolour the same still photograph three times to create three different emotional registers.',
    },
    {
      phaseId: deP3.id, sortOrder: 1,
      title: 'Camera Movement: The Grammar of Motion',
      description: 'The camera moves through space as the audience moves through emotion. Study every movement type and its emotional grammar: Static (commitment, observation, formality — Ozu and Haneke almost never move); Dolly/Track (authority, controlled revelation — Kubrick\'s hallway tracking shot in The Shining); Handheld (intimacy, anxiety, participation — Cassavetes, the Dardenne brothers, Farhadi); Steadicam (uncanny grace, hovering attention — The Shining again, Children of Men); Crane/Jib (god\'s-eye perspective, scale, emotional distance); Drone (contemporary scale); Zoom (psychological intrusion — Kubrick\'s zoom in The Shining; the Spielberg dolly-zoom in Jaws). The long take not as technique but as philosophy in Tarkovsky. Emmanuel Lubezki\'s revolution: three consecutive Oscars for The Tree of Life, Gravity, The Revenant — pushing handheld natural light to its furthest extreme. Exercises: study Birdman and 1917 as exercises in continuous movement.',
    },
    {
      phaseId: deP3.id, sortOrder: 2,
      title: 'Lenses — The Deep Study',
      description: 'A lens is an argument about space, time, and the relationship between subject and world. Full study of focal length, depth of field, lens character (sharpness, aberration, bokeh). Anamorphic vs. spherical — anamorphic lenses create oval bokeh, lens flares, a wider aspect ratio; spherical create the round bokeh of standard cinema. The 400mm in The Godfather: characters seem trapped. Deep focus in Citizen Kane (Toland): everything in focus from foreground to background — a radical choice that implicated the whole world. Wide lenses in Kubrick: the Steadicam Overlook Hotel hallways use 18mm — the space seems to recede endlessly. The telephoto lens in Antonioni\'s films: characters observed across impossible distances, their alienation visible in the compression of space. Read Cinematography: Theory and Practice (Brown, lens chapters complete) and Reflections: On Cinematography (Deakins).',
    },
    {
      phaseId: deP4.id, sortOrder: 1,
      title: 'Exposure, Sensors, and the Technical Image',
      description: 'Know the technical image completely so you stop thinking about it. The exposure triangle: aperture (controls depth of field and light intake), shutter speed (controls motion blur — 180-degree rule: shutter = double the frame rate), ISO (amplification — more ISO, more noise). Dynamic range: how much difference between highlights and shadows a sensor can hold simultaneously. LOG formats: flat image that preserves maximum dynamic range for grading. Film stock emulation: why DPs still talk about film stocks. Gordon Willis and deliberate underexposure as philosophy: he let actors\' eyes disappear into shadow to create moral ambiguity. The studio rejected The Godfather footage initially for being "too dark." The academy eventually corrected. Know: histogram, zebras, false colour, focus peaking. These tools exist so you can forget about the technical and think about the image.',
    },
    {
      phaseId: deP5.id, sortOrder: 1,
      title: 'Montage Theory — The Foundation',
      description: 'The cut is where cinema becomes cinema. Eisenstein\'s five types of montage: metric (rhythm by length), rhythmic (rhythm by content), tonal (emotional tone), overtonal (combination), intellectual (collision of meanings — the "god" sequence in Strike). Pudovkin on continuity: the cut as connection. Kuleshov\'s discovery: the meaning of a shot is created by what surrounds it, not by the shot itself. Murch\'s Rule of Six: Emotion first, then Story, then Rhythm, then Eye-trace, then 2D plane, then 3D space — if you must break a rule, break the last ones first. Read Film Form (Eisenstein) and In the Blink of an Eye (Murch). Study: Battleship Potemkin (Odessa Steps sequence, 10 minutes — the founding text of montage); Man with a Movie Camera (Vertov, 1929 — the city as edit); The Godfather (baptism sequence — inter-cut with the murders). Tool: DaVinci Resolve (free). Learn to cut emotionally, not logically.',
    },
    {
      phaseId: deP5.id, sortOrder: 2,
      title: 'Shooting for the Edit',
      description: 'Every shot you make is a contract with your future self. How to think about coverage before you shoot. Coverage strategies: master shot, coverage (close-ups, OTS), inserts, cutaways. The 180-degree rule and when to break it (Ozu broke it constantly — as a philosophy, not a mistake). Match cuts: how to create visual rhymes across cuts. Eyeline matching: where a character looks creates the next shot. How Kiarostami shot with a single camera and minimal coverage — forcing him to think about each shot as its own complete statement. Read In the Blink of an Eye. Study: Taste of Cherry (Kiarostami) for minimal coverage; A Separation (Farhadi) for complex coverage serving dramatic irony; Drive My Car (Hamaguchi) for the long master shot as moral statement.',
    },
    {
      phaseId: deP6.id, sortOrder: 1,
      title: 'Staging, Blocking, and the Space Between Bodies',
      description: 'Where bodies are in space tells the story before a word is spoken. Staging is the geometry of power, desire, and conflict. Proxemics: public space (3.5m+), social space (1.2–3.5m), personal space (45cm–1.2m), intimate space (under 45cm). Movement in drama: characters who move have power; characters who are static are held. Height: high angle diminishes, low angle elevates. Facing: two characters facing each other is confrontation; facing the same direction is alliance. Read On Directing Film (Mamet) — his argument that the director\'s job is to juxtapose images, not to move the camera for effect. Study: Tati\'s Playtime (1967) — no protagonist, a city is the character; Haneke\'s The White Ribbon — fixed camera, bodies in geometrically precise moral space; Bergman\'s Scenes from a Marriage — two faces, one room, everything.',
    },
    {
      phaseId: deP6.id, sortOrder: 2,
      title: 'Production Design — The World of the Film',
      description: 'The world of the film must be as consistent as reality — but more purposeful. Production design is storytelling: every colour, texture, period detail, and prop selection serves the film\'s emotional argument. The mood board translated into three dimensions. Key principle: the world a character inhabits reveals what they believe about themselves. Study: The Godfather — the shifting colour palette from gold and amber in the first act to cold green in the final act (the colour of moral corruption); Nayakan — the chawl interiors (cramped, warm, communal) vs. the later mansion (cold, empty, isolating); Parasite (Bong Joon-ho) — the Park family home as a film about architecture. Give the production designer the mood board. Ask them to push back on it. The best production designers disagree productively.',
    },
    {
      phaseId: deP7.id, sortOrder: 1,
      title: 'Acting Methods the Director Must Understand',
      description: 'You cannot lead actors through territory you have never mapped. The major systems: Stanislavski\'s system — the foundation; given circumstances, emotional memory, objective, action, subtext. Strasberg\'s Method — the American adaptation; emotional memory as primary technique; controversial but historically essential. Meisner\'s technique — "living truthfully under imaginary circumstances"; the repetition exercise; listening as the primary actor\'s skill. Bresson\'s "model" — the opposite of Method: strip all performance until only the body\'s involuntary responses remain; the close-up of hands; the face as pure information. Read Directing Actors (Weston) and True and False (Mamet). Study: A Woman Under the Influence (Cassavetes, 1974) — the most sustained study of performance in American cinema; Persona (Bergman, 1966) — two faces as the entirety of cinema.',
    },
    {
      phaseId: deP7.id, sortOrder: 2,
      title: 'Casting, Rehearsal, and the Set',
      description: 'The director\'s three battlegrounds. Casting: what you are looking for is not who plays the character most convincingly but who reveals something true in the space the character occupies. An actor who brings their own truth is worth more than an actor who performs someone else\'s. Rehearsal: build trust first; actors who do not trust the director cannot be vulnerable; give them room to fail privately before they fail publicly. The set: the most dangerous place in filmmaking, where economics, exhaustion, and collaboration meet. Read Making Movies (Lumet) — his complete account of the director\'s relationships on set: with the DP (the most important creative relationship), the actors (trust before anything), the editor (involve early, share rushes daily), the production designer (give them the mood board, let them push back). The solo filmmaker on set: maintain the interior conversation between the director and the DP, even when there is no one else there.',
    },
    {
      phaseId: deP8.id, sortOrder: 1,
      title: 'Sound Design and the Director\'s Ear',
      description: 'Sound is not what you hear. It is what you feel in your body. Diegetic sound: exists in the world of the film (footsteps, traffic, dialogue). Non-diegetic: score, narration — exists outside the world. The distinction blurs in great film sound: in The Conversation (Coppola), the diegetic becomes sinister; in Mulholland Drive, the non-diegetic becomes the film\'s unconscious. Foley: recorded sound effects that replace the sounds captured on set. Room tone: the sound of silence in a space — every cut needs it. Walter Murch\'s work on Apocalypse Now was the first film to formally credit a "Sound Designer." His concept: "The sound of a helicopter becomes a metaphor for an entire war." Study: No Country for Old Men (the Coens and Craig Berkey) — almost no score; every sound is diegetic; the world\'s indifference made audible. Stalker (Tarkovsky) — the Zone is built entirely from sound.',
    },
    {
      phaseId: deP8.id, sortOrder: 2,
      title: 'Music in Film',
      description: 'Music tells the audience how to feel. The director\'s job is to decide when to let it. The temp track problem: editors cut to temp music during assembly; directors fall in love with temp tracks; composers are then asked to replicate something that already exists — which destroys the possibility of original thinking. Directors who use silence: Bresson (almost no score), Haneke (almost no score — the audience must feel the discomfort unaided), Tati (mostly diegetic). Directors who use music as argument: Kubrick (existing classical music chosen with surgical precision — "The Blue Danube" for the space station ballet; "Also Sprach Zarathustra" for the monolith); Leone (Morricone — melody as character before dialogue); Malick (Preisner, Saint-Saëns — music as the natural world\'s inner life). The director\'s relationship with the composer: share the rough cut, not the script; the composer must respond to images, not words.',
    },
    {
      phaseId: deP9.id, sortOrder: 1,
      title: 'Reading the Script',
      description: 'The director reads a script differently from everyone else. The writer asks: what is the character feeling? The director asks: what does the audience see? For every scene: what is the dominant emotion? What is the light source? What is the camera relationship to the subject? What would be lost if this scene were cut? What does the first image need to establish? What is the scene\'s decisive moment — the single instant where everything that has been building arrives? Read On Directing Film (Mamet) — his method of breaking a script into beats and then finding the shot that serves each beat. Read Adventures in the Screen Trade (Goldman) — his account of the director\'s relationship to the screenplay and the politics of a production.',
    },
    {
      phaseId: deP9.id, sortOrder: 2,
      title: 'Visual Development',
      description: 'The director translates language into image before a single frame is shot. The full visual development process: read the script and list every scene; for each scene write the dominant emotion, light source, and camera relationship; build the mood board from paintings, photographs, and film stills; write the shot list; draw the storyboard (even rough figures — the act of drawing commits you to a frame); scout locations at the time of day you plan to shoot; run test shoots with the DP. The conversation with the DP in pre-production is where the film\'s visual language is invented. Read Sculpting in Time (Tarkovsky) — on visual intention as a philosophical act. Read Reflections: On Cinematography (Deakins) — his pre-production methodology with the Coen Brothers and other directors.',
    },
    {
      phaseId: deP9.id, sortOrder: 3,
      title: 'The Director on Set',
      description: 'The director is not the most technically skilled person on set. The director is the one who knows what the film is trying to say, and who makes sure every decision serves that. The director\'s key relationships: With the DP (the most important creative relationship — the director brings emotional intention, the DP brings technical means; the gap between them is where the visual language lives; establish in pre-production through long conversations, mood boards, test shoots). With the actors (trust before anything; an actor who doesn\'t trust the director cannot be vulnerable; build in rehearsal, not on the day). With the editor (the best directors involve the editor from earliest stages; share rushes daily; let the editor see what works that you cannot see because you were in the room). With production designer and costume designer (give them the mood board; ask them to push back). Read Making Movies (Lumet) and Adventures in the Screen Trade (Goldman).',
    },
    {
      phaseId: deP9.id, sortOrder: 4,
      title: 'The Director in the Edit — Post-Production',
      description: 'The first assembly cut is always terrible. This is not a problem. It is the beginning. The editing process: Assembly cut — put everything together in script order; do not evaluate; do not delete anything; just assemble; usually runs far too long and too slow. Rough cut — cut for emotion first (Murch\'s Rule One); remove everything that doesn\'t serve the scene\'s dominant emotion. Fine cut — structural decisions; does the film\'s architecture work? Are pacing rhythms right? Picture lock — the final sequence is fixed; no more editorial changes. Sound design and music — fill the world with what the image cannot carry. Colour grade — the final visual argument; this is where the mood board becomes the film. The documentary edit is structurally different: the structure must be discovered in the footage, not imposed on it; watch all footage before touching the edit; take notes on every surprising moment; build structure from those surprises. Read In the Blink of an Eye (Murch) and The Conversations (Michael Ondaatje and Walter Murch).',
    },
    {
      phaseId: deP10.id, sortOrder: 1,
      title: 'Documentary Forms — The Full Spectrum',
      description: 'Documentary is not a genre. It is a relationship between a camera and reality. Bill Nichols\' six modes: Expository (voice-of-God narration) — Night Mail (Jennings, 1936). Observational (cinéma vérité) — Grey Gardens (Maysles, 1975); Salesman (Maysles, 1969) — character built through pure behaviour. Participatory — Shoah (Lanzmann, 1985) — the director is on screen, asking questions; the film is about the limits of testimony. Poetic — The House Is Black (Farrokhzad, 1962). Reflexive — Stories We Tell (Polley, 2012) — the film examines its own making. Performative — Varda by Agnès (2019). Solo documentary practice: your advantage is invisibility — a large crew changes the behaviour of subjects; alone you are less threatening; Kiarostami, Varda, and Panahi all worked this way. The extended presence: the Dardenne brothers spent months with subjects before filming; Oppenheimer spent years. Read Introduction to Documentary (Nichols, complete) and Documentary Storytelling (Sheila Curran Bernard).',
    },
    {
      phaseId: deP10.id, sortOrder: 2,
      title: 'The Essay Film — Cinema as Thought',
      description: 'The essay film is the form that belongs to the filmmaker who is alone, who is thinking, who has something to say about the world. Chris Marker invented it. Agnès Varda perfected it. Pasolini made it political. It requires no crew, no actors, no script — only a point of view and a camera. Films to study: La Jetée (Marker, 1962, 28 minutes, free on YouTube) — still photographs, a voiceover, an entire theory of memory and time. Sans Soleil (Marker, 1983) — the greatest essay film; letters from a cameraman, Japan, Guinea-Bissau, memory, and the act of looking; watch three times. The Gleaners and I (Varda, 2000) — autobiography and social argument in the same frame. The Look of Silence (Oppenheimer, 2014) — companion to The Act of Killing; entirely different visual strategy for the same event. Making your essay film: write the voiceover last, not first; film first, find the images that surprise you, then write the voice that connects them. The voiceover is not explanation — it is counterpoint.',
    },
    {
      phaseId: deP11.id, sortOrder: 1,
      title: 'The Great Cinematographers — Individual Studies',
      description: 'A cinematographer\'s body of work is a visual argument about how the world looks. For each DP: watch three films in chronological order; read whatever interviews are available (ASC Magazine at theasc.com is the best free resource). Ask: what is consistent across their work? What changed? What problem were they solving? Tier 1 — Non-negotiable: Gregg Toland (deep focus, Citizen Kane); Subrata Mitra (bounce lighting, Apu Trilogy); V.K. Murthy (chiaroscuro, Guru Dutt films); Sven Nykvist ("simple light that lets everything breathe," Bergman); Gordon Willis ("Prince of Darkness," The Godfather, Manhattan); Roger Deakins (naturalism and precision — Blade Runner 2049, 1917, Fargo, No Country). Tier 2 — Essential: Vittorio Storaro (colour as ideology); Emmanuel Lubezki (long takes in natural light — Tree of Life, Gravity, The Revenant); Santosh Sivan (most awarded Indian DP, FTII graduate, first Asian in the ASC); Raoul Coutard (New Wave, natural light as deliberate aesthetic); Kazuo Miyagawa (Rashomon, Ugetsu); Robert Richardson (JFK, Tarantino). Tier 3 — Further: Wexler, Christopher Doyle (Wong Kar-wai), Rodrigo Prieto, P.C. Sriram (Mani Ratnam), Avinash Arun (Masaan, Kaala).',
    },
    {
      phaseId: deP11.id, sortOrder: 2,
      title: 'The Great Directors — Visual Systems',
      description: 'Study a director not for their stories but for their way of seeing. Every great director is a specific way of organising the world. The 3-pass method applies, but on the third pass study only the visual choices. Ask: what does this director always do? What do they never do? What would be impossible in someone else\'s film? The directors: Kubrick (symmetry and the geometry of dread — the zoom as psychological intrusion; total control, no improvisation); Tarkovsky (time and the spiritual image — water, fire, grass as recurring motifs; the long take as philosophy); Kurosawa (composition in motion — multiple telephoto lenses on widescreen, staging of weather); Bresson (reduction — the model not the actor; sound over image; the close-up of hands); Ozu (the tatami shot, the pillow shot, 360-degree space — broke continuity rules as philosophy); Bergman ("the human face is the great subject of the cinema"); Kiarostami (the long take in the real world; the incomplete image; what the camera refuses to show is as important as what it shows); Haneke (the fixed camera as accusation; the long take that refuses to cut at the moment of impact); Malick (natural light as spirituality, camera as participant not observer); Cassavetes (improvisation, the close-up, the face as landscape); Ray (restraint and precision); Ghatak (operatic, unstable, melodramatic — the camera on the verge of breakdown).',
    },
    {
      phaseId: deP12.id, sortOrder: 1,
      title: 'The Great Partnerships — Studied Together',
      description: 'Seven partnerships where the director\'s vision and the DP\'s execution are so fused you cannot study one without the other. Partnership 01 — Ray + Subrata Mitra: Mitra invented bounce lighting because Ray wanted a naturalism studio lighting couldn\'t provide; when Mitra left after Charulata (1964), Ray\'s visual register shifted permanently. Study: Pather Panchali (1955), Aparajito (1956), The World of Apu (1959), Charulata (1964). Partnership 02 — Bergman + Nykvist: "simple light" eliminating theatrical conventions; Cries and Whispers — deep red as the colour of the interior of the human body. Study: Persona (1966), Cries and Whispers (1972), Fanny and Alexander (1982). Partnership 03 — Kubrick + Alcott: Barry Lyndon shot entirely by candlelight using lenses developed for NASA. Study: Barry Lyndon (1975), The Shining (1980). Partnership 04 — Tarkovsky + Yusov/Rerberg: Stalker shot three times after disasters and creative collapse — somehow the greatest result. Study: Andrei Rublev (1966), Solaris (1972), Stalker (1979). Partnership 05 — Guru Dutt + V.K. Murthy: chiaroscuro influenced by German Expressionism and American noir; Kaagaz Ke Phool (1959) — India\'s first CinemaScope film; commercially rejected, now considered world cinema. Study: Pyaasa (1957), Kaagaz Ke Phool (1959). Partnership 06 — Coens + Deakins: 14 films over 25 years; the simplest shot that serves the story. Study: Fargo (1996), No Country for Old Men (2007), True Grit (2010). Partnership 07 — Mani Ratnam + Sivan/Sriram: P.C. Sriram shot Nayakan (1987); Santosh Sivan shot Roja (1992), Bombay (1995), Dil Se (1998). Study: Nayakan, Roja, Dil Se.',
    },
    {
      phaseId: deP13.id, sortOrder: 1,
      title: 'The Visual Notebook',
      description: 'The greatest cinematographers see before they shoot. The practice of seeing cannot be separated from the practice of making. Keep a physical notebook — not digital. Small enough to fit in a pocket. Daily practice: one image studied (a film still, a painting, a photograph) — three sentences: where is the eye? what is the light? what is missing? One photograph made — one sentence about what you were trying to achieve and whether you achieved it. Weekly: one scene from any film on the curriculum, broken down shot by shot — draw the camera positions; note the lens; note the cut. Monthly: one technical experiment — one lighting setup you\'ve never tried; one camera movement you\'ve never made; one lens you\'ve never used. This is not supplementary to the curriculum. This is the curriculum. The technical knowledge decays without the practice. The practice without the knowledge remains random. Together they build an eye.',
    },
    {
      phaseId: deP13.id, sortOrder: 2,
      title: 'The Short Film as Doctoral Programme',
      description: 'The short film is not a stepping stone. It is the laboratory where everything is at stake in miniature. Make one short film every 3 months. Each must attempt something specific — a visual technique studied, a formal challenge set. Keep every version. Watch them in sequence every 6 months: the progression of your eye is visible in the films. Five defined short films: Film 1 — Observational: no dialogue, no music; pure image and ambient sound; 5 minutes maximum. Film 2 — Essay: a voiceover you write, images you shoot, one piece of archive; on something you cannot stop thinking about. Film 3 — With a subject (non-actor): observational and intimate; follow them for one day. Film 4 — Controlled fiction: two characters, one location, one scene; full pre-production — mood board, shot list, storyboard. Film 5 — Your choice: you know more now; make what the first four taught you that you need to make. Study: Wasp (Andrea Arnold, 2003, 26 min, Oscar winner); Two Distant Strangers (Travon Free, 2020, 32 min, Oscar winner); The House Is Black (Farrokhzad, 1962, 22 min — the greatest short film ever made). Read: The 21st Century Screenplay (Linda Aronson) — her chapter on short films.',
    },
    {
      phaseId: deP13.id, sortOrder: 3,
      title: 'Resources — The Complete Reference',
      description: 'Everything you need, organised by type. Essential books: On Directing Film (Mamet); Making Movies (Lumet); In the Blink of an Eye (Murch); Directing Actors (Weston); Cinematography: Theory and Practice (Blain Brown); Lighting for Cinematography (Landau); The Filmmaker\'s Eye (Mercado); The Five C\'s of Cinematography (Mascelli); Sculpting in Time (Tarkovsky); Notes on the Cinematograph (Bresson); Our Films, Their Films (Ray); Film Form (Eisenstein); Ways of Seeing (Berger); Reflections: On Cinematography (Deakins, 2025). Free online resources: Every Frame a Painting (YouTube), kogonada video essays (YouTube), Wolfcrow (YouTube), In Depth Cine (YouTube), StudioBinder (YouTube), Film Riot (YouTube), No Film School (YouTube), Team Deakins Podcast, ASC Magazine (theasc.com), Senses of Cinema (sensesofcinema.com), Criterion Channel, MUBI.',
    },
  ]);

  console.log("Seeding Writer's Master phases and modules...");

  const [wmP1] = await db.insert(phasesTable).values({ courseId: writersMaster.id, title: 'Phase I — Screenwriting Craft & Fundamentals', description: 'Before you break rules, you must know them cold. The four foundational modules covering story architecture, screenplay format, reading produced scripts, and dialogue. Do these first.', sortOrder: 1 }).returning();
  const [wmP2] = await db.insert(phasesTable).values({ courseId: writersMaster.id, title: 'Phase II — Character: The Human Being on the Page', description: 'Audiences don\'t remember plots. They remember people. Character psychology, motivation, the Hero\'s Journey, archetypes, and advanced Jungian tools for building three-dimensional people.', sortOrder: 2 }).returning();
  const [wmP3] = await db.insert(phasesTable).values({ courseId: writersMaster.id, title: 'Phase III — World Cinema: Histories & Voices', description: 'Every national cinema is a lens on the world. Collect them all. Twelve national and regional cinemas studied in depth — directors, context, and essential films for each.', sortOrder: 3 }).returning();
  const [wmP4] = await db.insert(phasesTable).values({ courseId: writersMaster.id, title: 'Phase IV — Mythology, Folklore & Sacred Texts', description: 'Story is older than cinema. Go to the source. World mythology, the monomyth, folklore and fairy tale, and scriptures as narrative material.', sortOrder: 4 }).returning();
  const [wmP5] = await db.insert(phasesTable).values({ courseId: writersMaster.id, title: 'Phase V — World Literature: Reading Like a Writer', description: 'The screenplay is the flower. The novel is the root. Five modules covering the novel as teacher, Latin American magical realism, Russian and European literature, South Asian literature, and African and Asian voices.', sortOrder: 5 }).returning();
  const [wmP6] = await db.insert(phasesTable).values({ courseId: writersMaster.id, title: 'Phase VI — Psychology: Understanding the Human Mind', description: 'You are writing human beings. The more deeply you understand humans, the more real your characters become. Depth psychology, behavioural and social psychology, trauma and memory.', sortOrder: 6 }).returning();
  const [wmP7] = await db.insert(phasesTable).values({ courseId: writersMaster.id, title: 'Phase VII — The Companion Arts', description: 'The screenplay is the flower. These are the roots. Seven companion arts: plays, short stories, essays, observation, documentary, photography, and art history.', sortOrder: 7 }).returning();
  const [wmP8] = await db.insert(phasesTable).values({ courseId: writersMaster.id, title: 'Phase VIII — The Writer\'s Practice', description: 'Study is preparation. Writing is the work. The short film laboratory, daily writing practice, the feature film from idea to draft, and pitching and the industry.', sortOrder: 8 }).returning();

  await db.insert(modulesTable).values([
    {
      phaseId: wmP1.id, sortOrder: 1,
      title: 'Story: The Invisible Architecture',
      description: 'Why does a story work? Before you write a word of screenplay, understand story at its most elemental level. Read in this sequence: (1) Story (Robert McKee) — the bible of story theory; read slowly, take notes on every chapter; use it as a way of thinking, not a rulebook; for every principle McKee names, watch a film he references (Chinatown, Casablanca, Tootsie) then re-read the chapter. (2) Screenplay: The Foundations (Syd Field) — three-act structure, turning points, the paradigm; draw Field\'s diagram; understand the midpoint and plot points; do every exercise. (3) Save the Cat! (Blake Snyder) — the 15-beat structure as diagnostic tool; use his lens, not his ceiling. (4) The Anatomy of Story (Truby) — his 22-step structure and moral premise; the character web for ensemble writing. (5) Wired for Story (Lisa Cron) — brain science behind why stories work; short and essential. (6) On Writing (Stephen King) — not about screenwriting; about the instinct of a writer; generous, specific, irreplaceable.',
    },
    {
      phaseId: wmP1.id, sortOrder: 2,
      title: 'The Craft of the Screenplay',
      description: 'Format is not bureaucracy — it is the visual language of the medium. A page of screenplay equals approximately one minute of screen time. Every choice of white space, slug line, and action line is a creative decision. Read: The Screenwriter\'s Bible (Trottier) — the definitive formatting reference, use like a dictionary; Making a Good Script Great (Linda Seger) — rewriting and structure; Adventures in the Screen Trade (William Goldman) — memoir plus craft; one of the greatest screenwriters who ever lived on the process, the politics, and the joy of it; Which Lie Did I Tell? (Goldman) — the sequel, even better on rewriting. Tools: Final Draft, WriterDuet, Highland 2, or Fade In (free). Spend one day learning proper script format — sluglines, action, dialogue, transitions. Online resources: Scriptnotes podcast (John August and Craig Mazin, first 30 episodes — practical, specific, no fluff); Go Into the Story (Scott Myers\' free craft blog at gointothestory.blcklst.com).',
    },
    {
      phaseId: wmP1.id, sortOrder: 3,
      title: 'Learning from Produced Screenplays',
      description: 'Reading produced screenplays alongside the film is how you learn to write for the screen. You see the gap between what is written and what is filmed — that gap is where craft lives. Free sources: IMSDB (imsdb.com), Script Slug (scriptslug.com), Simply Scripts (simplyscripts.com), The Black List (blcklst.com). Tier 1 — Structure Masterclasses: Chinatown (Towne — every scene plants and pays off), Tootsie (Gelbart/Schisgal — comedy structure), All About Eve (Mankiewicz — multi-narrator, dialogue mastery), Network (Chayefsky — monologue as dramatic action), The Shawshank Redemption (Darabont), When Harry Met Sally (Ephron). Tier 2 — Contemporary: Parasite (Bong — genre shifts, social commentary), Moonlight (Jenkins — economy of language, the triptych), Eternal Sunshine (Kaufman — non-linear done right), Marriage Story (Baumbach — subtext in what people don\'t say). Tier 3 — Indian: Deewar (Salim-Javed — template for Hindi commercial cinema), Sholay (Salim-Javed), Masaan (Varun Grover), Court (Tamhane). TV Pilots: The Wire, Fleabag, Breaking Bad, Succession, Paatal Lok. Method: Read 1 (cold, note surprises), Read 2 (watch film, note every divergence), Read 3 (underline visual storytelling, identify structure). Write a one-page analysis.',
    },
    {
      phaseId: wmP1.id, sortOrder: 4,
      title: 'Dialogue & Scene Writing',
      description: 'Dialogue is not conversation. It is heightened, purposeful, and serves character, conflict, and story simultaneously. Every scene must do at least two things: advance plot and reveal character. Read: Writing Dialogue (Tom Chiarella) — the most specific and practical book on dialogue; every chapter gives an exercise; great dialogue is indirect; characters rarely say what they mean; The 21st Century Screenplay (Linda Aronson) — scenes, sequences, dialogue, non-linear narrative; Dialogue: The Art of Verbal Action (McKee). The Subtext Principle: write dialogue "on the nose" first, then cut. The "official subject" (we discuss the estate) vs. the "real subject" (I am dying inside). Films: His Girl Friday (Hawks, 1940 — the fastest dialogue ever filmed; overlapping speech), Network (Chayefsky — every speech is an aria), Before Sunrise/Sunset (Linklater — dialogue as action), Whiplash (every conversation is a power struggle), A Separation (Farhadi — dialogue that reveals character through contradiction), Glengarry Glen Ross (Mamet — status warfare disguised as sales talk), Marriage Story (Baumbach — the most technically accomplished dialogue argument in recent American cinema), Masaan (Varun Grover — Indian dialogue that is poetic without being theatrical).',
    },
    {
      phaseId: wmP2.id, sortOrder: 1,
      title: 'Character Psychology & Motivation',
      description: 'The most common failure in screenwriting is creating characters who serve the plot rather than drive it. Psychology gives you the tools to build people from the inside out. A character\'s wound, lie, want, need, and truth are the architecture of a human being on the page. Read: The Science of Writing Characters (Kira-Anne Pelican — Big Five personality theory, attachment styles applied to character); Creating Character Arcs (K.M. Weiland — maps arc directly onto three-act structure); The Drama of the Gifted Child (Alice Miller — how childhood emotional suppression creates adult compulsion; 30 pages; changes how you think about backstory permanently); Games People Play (Eric Berne — the psychological games humans play to avoid intimacy; extraordinary for writing scenes where subtext is the real action); Thinking, Fast and Slow (Kahneman — System 1 and System 2; how humans actually decide; essential for believable motivation); Emotional Intelligence (Goleman — the gap between emotional intelligence and its absence is where conflict lives). Films: Taxi Driver (alienation and projection), There Will Be Blood (Shakespearean character), Portrait of a Lady on Fire (desire and repression), Wild Strawberries (Bergman — a life examined through memory and regret).',
    },
    {
      phaseId: wmP2.id, sortOrder: 2,
      title: 'The Hero\'s Journey & Archetypes',
      description: 'Campbell\'s monomyth is not a formula to follow. It is a map of how humans have always told stories about transformation. Understanding it lets you work with it — and against it — intentionally. Read: The Hero with a Thousand Faces (Campbell — the source; read slowly; Chapters 1–3 and the summary in Part II are essential; not a screenplay template — a window into why stories move us); The Power of Myth (Campbell with Bill Moyers — the PBS conversations; more accessible than Hero; start here if Campbell feels dense); The Writer\'s Journey (Vogler — Campbell applied to screenwriting; essential vocabulary: Mentor, Threshold Guardian, Shadow, Shapeshifter — learn as lenses, not boxes); Morphology of the Folktale (Propp — structural analysis of Russian folk tales; 31 narrative functions; surprisingly applicable to contemporary genre writing). Watch: The Power of Myth PBS series (6 episodes, YouTube, Moyers interviewing Campbell — the greatest extended conversation about mythology ever filmed). Films: Star Wars (Lucas used Campbell consciously), The Matrix, Mad Max: Fury Road (dual protagonists), Spirited Away (Miyazaki\'s version of the descent into the underworld).',
    },
    {
      phaseId: wmP2.id, sortOrder: 3,
      title: 'Advanced Psychology for Writers',
      description: 'Jung\'s theory of the unconscious, archetypes, and the shadow is the deepest toolkit a storyteller can possess. Combined with attachment theory and social psychology, these frameworks make your characters three-dimensional in ways that surprise even you. Read in order: (1) A Primer of Jungian Psychology (Hall/Nordby — short and clear; read before Jung himself); (2) Man and His Symbols (Jung — his last book, designed for non-psychologists; illustrated; the collective unconscious, archetypes, the shadow; start here before anything else of his); (3) The Archetypes and the Collective Unconscious (Jung — harder; focus on essays on Shadow, Anima/Animus, the Self); (4) Memories, Dreams, Reflections (Jung\'s autobiography — the most personal entry into his thought); (5) Re-Visioning Psychology (Hillman — argues for multiple "souls" rather than a unified self; useful for morally complex characters who contain contradictions); (6) King, Warrior, Magician, Lover (Moore/Gillette — four male archetypes; applicable to any character); (7) Women Who Run With the Wolves (Estés — female archetypes through myth and fairy tale); (8) Attached (Levine/Heller — attachment styles explain almost all relational dynamics). Films: A Beautiful Mind, Repulsion (Polanski — dissociation as cinema), Ordinary People (grief and family systems), Caché/Hidden (Haneke — guilt and the return of the past).',
    },
    {
      phaseId: wmP3.id, sortOrder: 1,
      title: 'How to Study a Film (The Method)',
      description: 'Watching films is not the same as studying them. Every film in this curriculum should be studied, not just watched. The 3-Pass Method: Pass 1 — watch straight through with no pause; experience it as an audience member; note only your emotional responses. Pass 2 — watch with a notepad; pause every 10 minutes; write: What is the dominant emotion of this stretch? What story information was delivered? What visual choices stand out? Pass 3 — watch one scene repeatedly; break it down shot by shot, line by line; what does the director choose to show? What do they hide? Why? What to ask of every film: What is the film\'s central question (not plot — theme)? How does the first scene establish everything that matters? What is the film\'s relationship to silence and empty space? How does this film treat time? What is the director\'s recurring visual motif? What would be lost if this were made in Hollywood? Free resources: Every Frame a Painting (YouTube, all 28 essays), kogonada video essays (YouTube), Senses of Cinema (sensesofcinema.com — deep critical writing, free), Sight & Sound Greatest Films list 2022 (use as a roadmap).',
    },
    {
      phaseId: wmP3.id, sortOrder: 2,
      title: 'Iranian Cinema',
      description: 'Iran is one of the most cinematically rich nations on earth. Its cinema emerged from the Islamic Revolution with fierce constraints and produced formally inventive, emotionally devastating films. For Indian writers navigating their own pressures, this cinema is an education in indirection — how to say everything through metaphor, ellipsis, and the world of children as a lens on adults. Directors: Abbas Kiarostami (the poet — master of slow cinema and the documentary-narrative hybrid; study Close-Up, Taste of Cherry, Through the Olive Trees as a trio); Asghar Farhadi (moral complexity; every film is a masterclass in dramatic irony and withheld information); Jafar Panahi (cinema of defiance — made films while under house arrest); Mohsen Makhmalbaf (radical); Forough Farrokhzad (poet-filmmaker, The House Is Black, 1962 — the origin of Iranian New Wave). Films in order: The House Is Black (1962, 22 min, free YouTube — watch twice); The Cow (Mehrjui, 1969); Where Is the Friend\'s House? (Kiarostami, 1987); Close-Up (Kiarostami, 1990); Taste of Cherry (1997); A Separation (Farhadi, 2011 — Oscar winner); This Is Not a Film (Panahi, 2011 — made under house arrest on an iPhone). Read: Close Up: Iranian Cinema (Hamid Dabashi).',
    },
    {
      phaseId: wmP3.id, sortOrder: 3,
      title: 'French Cinema & the New Wave',
      description: 'The Nouvelle Vague changed everything. Truffaut, Godard, Chabrol, Rohmer, Rivette were critics who became filmmakers and rewrote the rules of modern cinema. To study French cinema is to study the DNA of every art film since 1959. Read first: "A Certain Tendency of the French Cinema" (Truffaut, 1954 — the manifesto; find free online at sensesofcinema.com). Directors: Jean-Luc Godard (the disruptor — jump cuts changed editing forever); François Truffaut (the humanist — The 400 Blows remains one of cinema\'s most perfect films); Agnès Varda (feminist visionary — also the most modern); Jean Renoir (The Rules of the Game, 1939 — the masterpiece that preceded it all); Robert Bresson (minimalism as philosophy — actors as "models"; sound as image); Jacques Tati (pure visual comedy, no dialogue needed — Playtime is architecture as cinema); Jean-Pierre Melville (cool and moral); Eric Rohmer (philosophy and desire in conversation); Claire Denis (contemporary inheritor — Beau Travail is a masterwork of sensory cinema). Films in order: The Rules of the Game (1939); The 400 Blows (1959); Breathless (1960); Shoot the Piano Player (1960); Cléo from 5 to 7 (Varda, 1962); The Umbrellas of Cherbourg (Demy, 1964 — all dialogue sung); Pickpocket (Bresson, 1959); Playtime (Tati, 1967); Le Samourai (Melville, 1967); Beau Travail (Denis, 1999).',
    },
    {
      phaseId: wmP3.id, sortOrder: 4,
      title: 'Italian Cinema & Neorealism',
      description: 'Italian Neorealism invented social realism in cinema: non-professional actors, real locations, real people — it proved cinema could be documentary-adjacent and still be art. It directly influenced Iranian cinema, Indian parallel cinema, and the American indie movement. Read: "Some Ideas on the Cinema" (Cesare Zavattini, free online at sensesofcinema.com — the theoretical foundation of neorealism). Directors: Vittorio De Sica (neorealism at its purest — compassion as method); Roberto Rossellini (the father — Rome Open City; war-era cinema of raw humanity); Federico Fellini (began in neorealism, transcended it into dream logic); Michelangelo Antonioni (alienation and modernity — silence and empty space as meaning); Pier Paolo Pasolini (poet, novelist, provocateur — his films are moral grenades); Luchino Visconti (Marxist aristocrat — classical beauty in service of social critique); Sergio Leone (myth-making — Once Upon a Time in the West is the operatic peak of Italian genre). Films in order: Rome, Open City (Rossellini, 1945); Shoeshine (De Sica, 1946); Bicycle Thieves (De Sica, 1948 — the masterwork); Umberto D (De Sica, 1952); La Strada (Fellini, 1954); 8½ (Fellini, 1963); L\'Avventura (Antonioni, 1960); The Leopard (Visconti, 1963); Once Upon a Time in the West (Leone, 1968).',
    },
    {
      phaseId: wmP3.id, sortOrder: 5,
      title: 'Japanese Cinema',
      description: 'Japan gave us Kurosawa\'s epic storytelling, Ozu\'s formal restraint, Mizoguchi\'s long takes, Miyazaki\'s mythological imagination, and a horror tradition without equal. Japanese cinema has more distinct traditions than almost any other national cinema. Read: Something Like an Autobiography (Akira Kurosawa — his memoir); Ozu and the Poetics of Cinema (David Bordwell — free PDF at davidbordwell.net, for deep study of Ozu\'s technique). Directors: Akira Kurosawa (narrative clarity and visual scale — influenced Lucas, Spielberg, Leone); Yasujirō Ozu (stillness, family, the tatami shot — study pillow shots, static camera, 360-degree space); Kenji Mizoguchi (long takes and female suffering — Ugetsu is a ghost story and a feminist text); Hayao Miyazaki (animated mythology — Spirited Away is a descent into the underworld); Hirokazu Kore-eda (contemporary Ozu — family, memory, quiet moral weight); Ryusuke Hamaguchi (Drive My Car — Chekhov and grief; dialogue as revelation). Films in order: Rashomon (1950); Ikiru (1952); Ugetsu (Mizoguchi, 1953); Tokyo Story (Ozu, 1953 — the saddest film ever made); Seven Samurai (1954); Harakiri (Kobayashi, 1962); Ran (Kurosawa, 1985); Spirited Away (Miyazaki, 2001); Shoplifters (Kore-eda, 2018); Drive My Car (Hamaguchi, 2021).',
    },
    {
      phaseId: wmP3.id, sortOrder: 6,
      title: 'Korean New Wave',
      description: 'South Korean cinema, after the lifting of censorship in 1996, produced the most exciting national cinema of the 21st century. Genre blending, social commentary, formal ambition. Korean directors understand that genre is a container — they use it and destroy it in the same film. Read: koreanfilm.org (Darcy Paquet\'s free essays — essential). Directors: Bong Joon-ho (genre as social X-ray — Parasite is the peak; Memories of Murder is the masterclass in tone shifts); Park Chan-wook (vengeance trilogy — formal perfectionism; cinema as controlled fury); Lee Chang-dong (the moral filmmaker — Burning and Poetry are among the finest films of their decade); Hong Sang-soo (the Korean Rohmer — repetition, coincidence, women and writers). Films in order: Peppermint Candy (Lee Chang-dong, 1999 — a life in reverse, begins with suicide, ends with youth); Memories of Murder (Bong, 2003); Oldboy (Park Chan-wook, 2003 — questions the desire for revenge); Poetry (Lee Chang-dong, 2010 — an elderly woman and a poem; devastating); Burning (Lee Chang-dong, 2018); Parasite (Bong, 2019 — genre shifts engineered precisely; study the screenplay).',
    },
    {
      phaseId: wmP3.id, sortOrder: 7,
      title: 'Spanish Cinema',
      description: 'Spain\'s cinema has always had to speak in code. Under Franco, allegory was survival. After Franco, Pedro Almodóvar made camp and melodrama into high art. Directors: Luis Buñuel (surrealism as weapon — Un Chien Andalou, The Exterminating Angel, Belle de Jour); Pedro Almodóvar (melodrama, the female world, desire and grief — Talk to Her and All About My Mother are two of the great films of world cinema); Víctor Erice (The Spirit of the Beehive, 1973 — a child\'s response to Frankenstein under Franco; one of the most beautiful films ever made); Guillermo del Toro (Pan\'s Labyrinth — the fairy tale as political metaphor); Alejandro Amenábar (The Sea Inside — the most humane film about death in recent cinema). Films: Un Chien Andalou (Buñuel/Dalí, 1929, 17 min — free on YouTube); The Spirit of the Beehive (Erice, 1973); All About My Mother (Almodóvar, 1999); Talk to Her (Almodóvar, 2002); Pan\'s Labyrinth (del Toro, 2006); The Sea Inside (Amenábar, 2004).',
    },
    {
      phaseId: wmP3.id, sortOrder: 8,
      title: 'Indian Cinema (Parallel & Beyond)',
      description: 'India has the richest and most diverse film culture on earth. The parallel cinema movement (1960s–80s) rejected commercial convention and produced world-class art. Read: Our Films, Their Films (Satyajit Ray — the most lucid writing on cinema by any Indian filmmaker); Senses of Cinema Indian cinema essays (sensesofcinema.com — free). Directors: Satyajit Ray (restraint and precision — his best period produces some of the greatest films in any language); Ritwik Ghatak (the opposite of Ray — operatic, unstable, melodramatic in the best sense; the camera always on the verge of breakdown); Mrinal Sen (political urgency); Shyam Benegal (social realism, the Bhumika-era); Mani Ratnam (world-cinema ambitions within the mainstream — his films with P.C. Sriram and Santosh Sivan are India\'s most fully cinematic). Contemporary: Anurag Kashyap (Gangs of Wasseypur — maximalist, literary); Varun Grover (Masaan — contemporary, rooted, emotionally complex); Chaitanya Tamhane (Court — negative space as political argument). Films: Pather Panchali (Ray, 1955); Pyaasa (Guru Dutt, 1957); Meghe Dhaka Tara (Ghatak, 1960); Kaagaz Ke Phool (Guru Dutt, 1959); Bhumika (Benegal, 1977); Nayakan (Mani Ratnam, 1987); Dil Se (Mani Ratnam, 1998); Masaan (Ghaywan, 2015); Court (Tamhane, 2014).',
    },
    {
      phaseId: wmP3.id, sortOrder: 9,
      title: 'Latin American Cinema',
      description: 'Cinema Novo, political urgency, and the most formally adventurous cinema of the 20th century outside Europe. The 1960s Brazilian Cinema Novo movement (Glauber Rocha) demanded: "neither a well-made film nor a badly-made film, but a necessary film." Directors: Glauber Rocha (Black God White Devil, Land in Anguish — political urgency, baroque energy); Tomás Gutiérrez Alea (Memories of Underdevelopment, Cuba 1968); Fernando Meirelles (City of God, 2002 — editing as social argument); Alfonso Cuarón (Y Tu Mamá También, Roma — the most internationally visible contemporary Latin American filmmaker); Alejandro González Iñárritu (Amores Perros — three stories, one city, one catastrophe). Contemporary: Pablo Larraín (Jackie, Spencer, El Conde — the most formally audacious Chilean filmmaker). Films: Black God White Devil (Rocha, 1964); Memories of Underdevelopment (Alea, 1968); Y Tu Mamá También (Cuarón, 2001); Amores Perros (Iñárritu, 2000); City of God (Meirelles, 2002); Roma (Cuarón, 2018 — a meditation on class, memory, and the female gaze).',
    },
    {
      phaseId: wmP3.id, sortOrder: 10,
      title: 'Russian & Eastern European Cinema',
      description: 'Soviet Montage invented the language of cinema. Russian cinema has been paying it back ever since. Directors: Sergei Eisenstein (the theorist — Battleship Potemkin, October, Ivan the Terrible; montage as political weapon); Andrei Tarkovsky (the spiritual filmmaker — Andrei Rublev, Stalker, The Mirror; time and the image); Elem Klimov (Come and See, 1985 — the most devastating anti-war film ever made); Alexander Sokurov (Russian Ark — one continuous 90-minute Steadicam shot through the Hermitage; the most formally daring film of the 21st century). Eastern Europe: Krzysztof Kieślowski (The Double Life of Véronique, Three Colours trilogy — moral intuition and coincidence); Jiří Menzel (Closely Watched Trains, Czech New Wave). Read: Sculpting in Time (Tarkovsky — essential). Films: Battleship Potemkin (1925, free); Ivan the Terrible (Eisenstein, 1944); Andrei Rublev (Tarkovsky, 1966); The Mirror (Tarkovsky, 1975); Stalker (Tarkovsky, 1979); Come and See (Klimov, 1985); The Double Life of Véronique (Kieślowski, 1991); Russian Ark (Sokurov, 2002).',
    },
    {
      phaseId: wmP3.id, sortOrder: 11,
      title: 'American Independent Cinema',
      description: 'The American independent tradition is the alternative to the American mainstream — the cinema of personal vision, small budgets, and formal risk. Directors: John Cassavetes (the founding father — A Woman Under the Influence; improvisation, the close-up, the face as landscape; his films reject composition in the classical sense; the camera follows emotion); Jim Jarmusch (Stranger Than Paradise, Paterson — slow cinema, American deadpan); Richard Linklater (Boyhood, the Before trilogy — time and conversation as the full content of cinema); Kelly Reichardt (Meek\'s Cutoff, First Cow — restraint, landscape, the female gaze); Barry Jenkins (Moonlight — three acts, one life; economy of language; what is unsaid); Chloé Zhao (The Rider, Nomadland — non-professional actors, real landscapes, the American West). Films: A Woman Under the Influence (Cassavetes, 1974); Stranger Than Paradise (Jarmusch, 1984); Do the Right Thing (Lee, 1989); Before Sunrise (Linklater, 1995); Boyhood (2014); Moonlight (Jenkins, 2016); First Cow (Reichardt, 2019); Nomadland (Zhao, 2020).',
    },
    {
      phaseId: wmP3.id, sortOrder: 12,
      title: 'African Cinema & Other Essential Voices',
      description: 'The cinema of the Global South has been the most politically urgent cinema of the 20th century. African cinema: Ousmane Sembène (the father of African cinema — Xala, Black Girl, Moolaadé; his films are arguments about colonial damage and African dignity); Abderrahmane Sissako (Bamako, Timbuktu — the most lyrical and politically precise African filmmaker working today); Mati Diop (Atlantics — the first African woman to compete for the Palme d\'Or). Taiwanese New Wave: Hou Hsiao-hsien (A City of Sadness, Flowers of Shanghai — long takes and the Taiwanese past) and Edward Yang (Yi Yi — the definitive Taiwanese film; a meditation on family and time). Hong Kong: Wong Kar-wai (In the Mood for Love — the most beautiful film about lost time; with Christopher Doyle, colour and movement as emotional texture; Chungking Express). Films: Black Girl (Sembène, 1966); Xala (Sembène, 1975); Touki Bouki (Djibril Diop Mambéty, 1973); Bamako (Sissako, 2006); Atlantics (Diop, 2019); In the Mood for Love (Wong Kar-wai, 2000); Yi Yi (Edward Yang, 2000); A City of Sadness (Hou Hsiao-hsien, 1989).',
    },
    {
      phaseId: wmP4.id, sortOrder: 1,
      title: 'World Mythology & the Monomyth',
      description: 'Every story ever told is a version of one story. The monomyth is not a formula — it is a map of how the human mind has always organised experience into narrative. Read: The Hero with a Thousand Faces (Campbell — the source; read it slowly; the separation/initiation/return structure is the deep grammar of every myth); Myth and Reality (Mircea Eliade — the anthropological complement to Campbell; what myths actually do in a society); The Golden Bough (Frazer — the great Victorian synthesis of world myth and ritual). Essential mythologies: Greek (Edith Hamilton\'s Mythology is the best accessible version); Norse (Neil Gaiman\'s Norse Mythology; Kevin Crossley-Holland\'s translation for the serious student); Hindu (the Mahabharata and Ramayana as story systems — not just as sacred texts but as structural and dramatic models; the Mahabharata is the greatest dramatic work ever created); Mesopotamian (the Epic of Gilgamesh — humanity\'s oldest surviving narrative; the friendship plot, the grief plot); Celtic (Joseph Campbell and the Celtic tales). Watch: The Power of Myth PBS series (6 episodes, YouTube). Exercises: map the Mahabharata onto the Hero\'s Journey; find one story from your regional oral tradition and map it onto Propp\'s 31 functions.',
    },
    {
      phaseId: wmP4.id, sortOrder: 2,
      title: 'Folklore, Fairy Tale & Oral Tradition',
      description: 'The stories that survive without being written down are the oldest and most powerful. They contain compressed wisdom about human psychology, social structure, and moral order — all delivered in images. Read: Grimm\'s Complete Fairy Tales (the unedited Brothers Grimm — not the sanitised versions; Cinderella\'s stepsisters have their eyes pecked out by birds; Snow White\'s evil queen is forced to dance in red-hot iron shoes; the originals are about what they\'re about); The Uses of Enchantment (Bruno Bettelheim — Freudian analysis of fairy tales; essential for understanding what these stories are doing to children and why they survive; his reading of Hansel and Gretel as a story about oral fixation is disturbing and accurate); Morphology of the Folktale (Vladimir Propp — the structural analysis of Russian folk tales; 31 narrative functions that apply to almost any genre film). Indian oral traditions: the Panchatantra (the oldest collection of fables; the frame narrative as a storytelling structure); the Jataka tales (550 stories of the Buddha\'s previous lives — extraordinary narrative variety); regional folk traditions; the Gond oral tradition of Central India (for this filmmaker specifically). Exercise: collect one oral story from your immediate geography. Write it down exactly as it was told. Then write a version that could be filmed.',
    },
    {
      phaseId: wmP4.id, sortOrder: 3,
      title: 'Scriptures & Sacred Narratives',
      description: 'The greatest narratives in history are sacred texts — not despite their spiritual purpose but because of it. Narrative power and spiritual purpose are not in conflict; they emerge from the same human need. The Mahabharata: 100,000 verses; the Bhagavad Gita embedded within it; the most complex ethical system ever put into narrative form; it contains every human situation; "Whatever is here is found elsewhere; what is not here is nowhere." The Ramayana: the ideal king, the ideal wife, the ideal devotee; the epic of loyalty and exile; Valmiki\'s original is structurally perfect. The Bible as Literature: the Old Testament narrative books (Genesis, Exodus, Samuel, Kings) contain some of the most compressed and powerful storytelling in any language; read the King James Version for the prose; the story of Joseph in Genesis is a model screenplay in 40 pages. The Quran\'s narrative: the 25 prophets whose stories appear in non-chronological fragments across the text; the narrative of Joseph (Surah Yusuf) is described within the text itself as "the most beautiful of stories." Read: The Hindus: An Alternative History (Wendy Doniger) for the Hindu sacred texts as cultural argument.',
    },
    {
      phaseId: wmP5.id, sortOrder: 1,
      title: 'The Novel as Teacher',
      description: 'Read as a writer — study how a novelist builds a world, controls time, and earns an ending. The question to ask of every novel: How does the writer make you feel what the character feels? Tolstoy: Anna Karenina (the novel as complete social world; read with attention to how Tolstoy controls sympathy — he makes you understand why every character does what they do, even when they destroy each other) and War and Peace (scale and intimacy simultaneously). Dostoevsky: Crime and Punishment (guilt as interior monologue — the model for psychological interiority in Western fiction) and The Brothers Karamazov (the greatest novel ever written; three brothers, one murdered father, one unanswerable question about God). Flaubert: Madame Bovary (the perfection of style; free indirect discourse — Flaubert invented the technique of entering a character\'s consciousness without using "she thought"). Chekhov\'s stories (complete — read everything): "The Lady with the Dog" and "Ward No. 6" first. The short story will teach you the scene; the novel will teach you the structure.',
    },
    {
      phaseId: wmP5.id, sortOrder: 2,
      title: 'Latin American & Magical Realism',
      description: 'Magical realism is not a genre. It is a way of seeing that treats the impossible as ordinary — as if myth and daily life inhabit the same world without contradiction. It emerged from the specific conditions of Latin America — colonialism, violence, the mixing of indigenous and European cultures — but its strategies are universal. Read: One Hundred Years of Solitude (García Márquez — the book that gave magical realism to the world; Macondo is a village that is also a century; read it slowly, don\'t try to track the genealogy, let it wash over you); Love in the Time of Cholera (García Márquez — the love story as a narrative argument about time and waiting); Pedro Páramo (Juan Rulfo — the shortest entry point to magical realism; 100 pages; the dead speak; a son searches for his father who died before he was born; influenced García Márquez above everything); The House of the Spirits (Isabel Allende — Chilean magical realism; four generations of women; the political and the mythical in the same sentence); Ficciones (Borges — short stories as philosophy; The Garden of Forking Paths; The Library of Babel; The Aleph); Like Water for Chocolate (Laura Esquivel — the recipe as chapter structure; emotion as literal reality). Poetry: Pablo Neruda\'s Twenty Love Poems and a Song of Despair.',
    },
    {
      phaseId: wmP5.id, sortOrder: 3,
      title: 'Russian & European Literature',
      description: 'The Europeans took the novel to its philosophical limit. Where Latin American literature dreams, European modernism wakes up in a nightmare it can\'t explain. Read: Kafka — The Trial (a man is arrested for a crime that is never named; guilt as the condition of existence) and The Metamorphosis (a man wakes as a bug; read it as a story about what happens to a family when one member becomes a burden); Camus — The Stranger (the most perfectly stripped prose in European literature; Meursault kills a man and cannot explain why; his trial is about whether he wept at his mother\'s funeral) and The Plague (how a community responds to catastrophe; the ethics of ordinary decency); Sartre — Nausea (existence precedes essence; the world feels wrong before it feels meaningful); Beckett — Molloy and the Trilogy (language and silence; form as content); Nabokov — Lolita (the most unreliable narrator in literature; every sentence is a performance; guilt in the form of beauty); Calvino — If on a winter\'s night a traveler (a novel that plays with reading itself); Kundera — The Unbearable Lightness of Being (essay and novel braided together; the author\'s voice as a structural element).',
    },
    {
      phaseId: wmP5.id, sortOrder: 4,
      title: 'South Asian Literature',
      description: 'India is the world\'s most untapped literary resource for screenwriters. The sheer range of South Asian writing — across languages, eras, and forms — gives a writer access to the full human spectrum. Read: Manto: Bombay Stories (Saadat Hasan Manto — the greatest South Asian writer of the 20th century; his prose is the closest thing in literature to a camera; his stories about Partition are unbearable and necessary); Tamas (Bhisham Sahni — Partition; four days; a novel that does what most films only attempt); The God of Small Things (Arundhati Roy — language as sculpture; told backwards in time and yet gains in tension); Midnight\'s Children (Salman Rushdie — India at independence; magical realism; Booker of Bookers); A Fine Balance (Rohinton Mistry — the Emergency years; devastating and structurally perfect); Godaan (Premchand — the pinnacle of Hindi literature; poverty and dignity; Hori is one of the great characters in world literature); Gora (Tagore — identity, nation, the colonial self); Fire on the Mountain (Anita Desai — interior life and landscape as character); Persepolis (Marjane Satrapi — graphic novel memoir; an Iranian girl\'s coming-of-age through the Revolution; directly connected to the Iranian cinema module).',
    },
    {
      phaseId: wmP5.id, sortOrder: 5,
      title: 'African, Asian & Postcolonial Voices',
      description: 'The most urgent literature of the 20th century came from the margins of the Western canon. These writers wrote from the experience of colonialism, resistance, and the complicated aftermath of independence. Read: Things Fall Apart (Chinua Achebe — the novel that put African literature on the world map; colonialism and cultural disintegration; the tragedy of a man who cannot adapt because the things he values are the very things being destroyed); Season of Migration to the North (Tayeb Salih, Sudan — one of the ten best novels of the 20th century and largely unread outside Africa; the reverse colonial journey); Disgrace (J.M. Coetzee — post-apartheid South Africa; beautifully cold prose; the question of what a white man owes); Invisible Man (Ralph Ellison — a Black man in America, invisible to the society he lives in; the most important American novel of the 20th century after The Great Gatsby). Japanese: The Sound of Waves (Mishima — pure and lyrical; the simplest story, perfectly told); Snow Country (Kawabata — wasted love; haiku applied to the novel form); The Wind-Up Bird Chronicle (Murakami — how to build a narrative around what is absent). Korean: The Vegetarian (Han Kang — quiet, devastating, feminist); Kitchen (Banana Yoshimoto — grief and domestic ordinary life).',
    },
    {
      phaseId: wmP6.id, sortOrder: 1,
      title: 'Depth Psychology: Jung & the Unconscious',
      description: 'Jungian psychology is the study of the unconscious mind — the part of the self that operates beneath awareness. The shadow, the anima/animus, the persona, the self: these are not abstract concepts but the machinery of great characters. Key concepts: The Unconscious — the part of the psyche that is not accessible to conscious thought but that drives behaviour; in stories, the unconscious speaks through the character\'s actions when they contradict their stated intentions. The Shadow — the rejected, disowned parts of the self; in stories, the shadow appears as the antagonist who is a version of the protagonist; or as the protagonist\'s self-destructive choices. The Anima/Animus — the inner feminine in men, inner masculine in women; characters who project their anima onto others (the romanticised Other who cannot exist) are the engine of many great love stories. The Persona — the social mask; the difference between who a character appears to be and who they are. Individuation — the process of becoming whole; the integration of shadow, anima, and persona into a unified self; this is what a character arc does, when it does it properly. Read: Man and His Symbols, then The Archetypes and the Collective Unconscious, then Memories, Dreams, Reflections. Freud: Introductory Lectures (Parts I and II) and Interpretation of Dreams (Chapter 6 on Dream Work — condensation, displacement, symbolism — is a screenwriter\'s guide to subtext).',
    },
    {
      phaseId: wmP6.id, sortOrder: 2,
      title: 'Behavioural & Social Psychology',
      description: 'Understanding how humans actually make decisions — often irrationally, often unconsciously — makes your characters unpredictable in the right ways. Social psychology explains ensemble behaviour, complicity, and how good people do terrible things — which is the subject of most great drama. Read: Thinking, Fast and Slow (Kahneman — System 1 and System 2 thinking; the psychology of decision-making; indispensable for believable motivation); Influence (Cialdini — the science of persuasion; six principles; how humans change each other\'s minds; essential for understanding antagonists and manipulation); The Lucifer Effect (Zimbardo — how good people become capable of evil; the Stanford Prison Experiment; for writing characters who participate in systemic evil without being "villains"); The Social Animal (Elliot Aronson — the best textbook on social psychology for general readers; conformity, prejudice, attraction, aggression, altruism); Predictably Irrational (Dan Ariely — why humans do irrational things consistently; gold for character contradiction); Maslow\'s Hierarchy of Needs (original essay, free online — essential framework for character want hierarchy: physiological, safety, love/belonging, esteem, self-actualisation); In the Realm of Hungry Ghosts (Gabor Maté — addiction as trauma; one of the most compassionate books ever written about human suffering).',
    },
    {
      phaseId: wmP6.id, sortOrder: 3,
      title: 'Trauma, Memory & the Wounded Character',
      description: 'Most great dramatic characters carry something broken inside them. Understanding how trauma actually works — how the body holds it, how memory distorts it, how people both flee from and are compelled toward their wounds — transforms how you write damaged people. The key insight: trauma is not primarily a psychological event; it is a physiological one. The body holds what the mind cannot process. This is why traumatised characters cannot simply "decide" to be different — the wound is stored in muscle, nerve, and autonomic response, not in thought. Read: The Body Keeps the Score (Bessel van der Kolk — the definitive text; read the first half at minimum; essential for any writer); Trauma and Recovery (Judith Herman — the academic foundation; focus on the stages of recovery and the role of testimony; excellent on why survivors cannot tell their story in sequence — this is one of the most useful things you will ever learn for structuring a screenplay about trauma); Man\'s Search for Meaning (Viktor Frankl — Holocaust survival and the will to meaning; what sustains humans under the worst conditions; the question Frankl asks is the question every character must answer: why go on?); The Year of Magical Thinking (Joan Didion — a literary document of how the mind refuses reality in grief).',
    },
    {
      phaseId: wmP7.id, sortOrder: 1,
      title: 'Reading Plays',
      description: 'The stage is where story was compressed before cinema was invented. Reading plays forces you to understand how words alone carry weight, how what is not said creates tension, and how a scene\'s architecture governs everything that happens inside it. How to read a play: read it in one sitting; read the stage directions as visual information; close the book and reconstruct the play from memory; read it again tracking one character\'s journey only. Essential playwrights: Chekhov (The Seagull, Three Sisters, Uncle Vanya — what he teaches: the architecture of subtext; characters never say what they mean; every scene has an "official subject" and a "real subject"); Ibsen (A Doll\'s House, Hedda Gabler — secrets and the information withheld that must eventually surface); Pinter (The Homecoming, Betrayal — silence, menace, the weaponisation of language; "the Pinter pause" is the space where meaning accumulates); Beckett (Waiting for Godot, Endgame — structure as the subject itself; what story can do when it refuses the comfort of plot); Miller (Death of a Salesman — the tragedy of men who believed a lie about themselves until the lie killed them); Williams (A Streetcar Named Desire — the language of desire and vulnerability); Brecht (Mother Courage — political theatre that is also moving; the alienation effect). Indian: Vijay Tendulkar (Ghashiram Kotwal, Silence! The Court Is in Session) and Girish Karnad (Tughlaq, Hayavadana). Books: The Art of Dramatic Writing (Egri), Three Uses of the Knife (Mamet), Backwards and Forwards (David Ball — 80 pages; invaluable structural analysis).',
    },
    {
      phaseId: wmP7.id, sortOrder: 2,
      title: 'Short Stories',
      description: 'The short story does in ten pages what a novel does in three hundred. Reading short stories teaches you to build a world, establish a character, create and release tension — all in the time it takes to drink a cup of tea. How to study a short story: note the first sentence; find the "turn" — the moment where something shifts; read the last paragraph again — in great short fiction the ending reframes everything; count the scenes; rewrite the opening paragraph from a different POV. Essential writers: Chekhov (The Complete Short Stories — start with "The Lady with the Dog" and "Ward No. 6"; he invented the modern short story; the ending of "The Lady with the Dog" is the greatest ending in the form); Carver (Cathedral, What We Talk About When We Talk About Love — minimalism and the unsaid); Flannery O\'Connor (A Good Man Is Hard to Find — the grotesque in service of grace; the moment a character\'s illusions are destroyed); Borges (Ficciones — narrative as philosophy; a premise is a world, and a world is enough); Munro (Lives of Girls and Women — she compresses decades into ten pages); Joyce (Dubliners — "The Dead" is the greatest short story in the English language; epiphany as form); Kafka (The Metamorphosis); Le Guin (The Ones Who Walk Away from Omelas — five pages; the most efficient moral argument in short fiction). Indian: Premchand (Kafan/The Shroud — possibly the greatest Indian short story); Ismat Chughtai (Lihaaf — desire and resistance in Urdu). Books: Burning Down the House (Charles Baxter); Mystery and Manners (Flannery O\'Connor).',
    },
    {
      phaseId: wmP7.id, sortOrder: 3,
      title: 'Essay Writing',
      description: 'The essay is thinking made visible. Writing essays trains the muscle of structured thinking. A screenwriter who cannot argue — who cannot take a position, develop it rigorously, and defend it — is a screenwriter who cannot articulate theme. Essential essay writers: George Orwell ("Politics and the English Language," 1946, free at orwell.ru — the single most useful essay on writing clearly; read it every year; "Why I Write" and "Shooting an Elephant" also free); James Baldwin (Notes of a Native Son, The Fire Next Time — the essay as witness; anger, beauty, and precision inhabiting the same sentence); Joan Didion (Slouching Towards Bethlehem — "we tell ourselves stories in order to live"; style is not decoration, it is meaning); Virginia Woolf (A Room of One\'s Own — the essay as consciousness; associative, circling); Zadie Smith (Changing My Mind, Feel Free — rigour and warmth together); David Foster Wallace (Consider the Lobster — the footnote, the digression, the obsessive qualification, all arriving somewhere unexpected); Susan Sontag (Against Interpretation, On Photography, Notes on Camp — attention as a form of love). Indian: Arundhati Roy (The End of Imagination — political writing at the level of art); Pankaj Mishra (the finest intellectual essayist currently writing in English). Free archives: Aeon (aeon.co), Literary Hub (lithub.com), tetw.org, Orwell\'s complete essays at orwell.ru.',
    },
    {
      phaseId: wmP7.id, sortOrder: 4,
      title: 'Observation',
      description: 'All writing begins in seeing. Not looking — seeing. The difference is everything. The most common failure in character writing is generalisation — characters built from assumptions rather than observations. Carry a physical notebook. Its only purpose is to record what you notice. Date every entry. Write in it every day. Daily practice: record one overheard piece of dialogue — not paraphrased, the actual words, exactly as spoken, with context; describe one person you saw today in three sentences (one for physical detail, one for how they moved, one for what they made you feel); record one image that stopped you — write it in under 50 words, precision not poetry; record one thing that puzzled you — behaviour you couldn\'t explain, a face that seemed to carry a secret story. Read: Ways of Seeing (John Berger — the foundational text on how we look at images); A Field Guide to Getting Lost (Rebecca Solnit — attention, wandering, the practice of noticing); Pilgrim at Tinker Creek (Annie Dillard — sustained attention to the natural world as a practice); W.G. Sebald\'s The Rings of Saturn (a walk through Suffolk becomes an exploration of memory, colonialism, and loss — the model for the essay film and the observation-based narrative).',
    },
    {
      phaseId: wmP7.id, sortOrder: 5,
      title: 'Documentary Practice',
      description: 'The greatest lesson a fiction screenwriter can take from documentary: real life contains structures that cannot be invented. People do not behave the way we expect. Real conversations are stranger, more oblique, more contradictory than scripted ones. Bill Nichols\' six modes: Expository (Voice-of-God narration), Observational (fly on the wall — no interviews, no narration; the camera watches), Participatory (the filmmaker is on screen; their presence is the story), Poetic (image-driven; mood over argument), Reflexive (the film examines its own making), Performative (subjective and personal; the filmmaker\'s experience is the lens). Essential documentaries to study: Grey Gardens (Maysles Bros., 1975 — observational mode at its most intimate); Salesman (Maysles Bros., 1969 — character built through behaviour, not backstory); Shoah (Lanzmann, 1985 — nine hours; the Holocaust through survivor testimony; a film about memory and language); Hoop Dreams (James, 1994 — the three-act structure found in reality over five years); Stories We Tell (Polley, 2012 — family memory and the construction of narrative); The Act of Killing (Oppenheimer, 2012 — the most formally radical documentary on this list); An Insignificant Man (Abhay Kumar/Khushboo Ranka, 2016 — the best Indian political documentary). Read: Introduction to Documentary (Nichols), Documentary Storytelling (Bernard).',
    },
    {
      phaseId: wmP7.id, sortOrder: 6,
      title: 'Photography',
      description: 'A photograph is a decision about what to include and what to exclude. So is a screenplay. Studying photography teaches you to think in frames: what is in the frame, what is outside it, where the eye is led, what the light reveals and what it withholds. Henri Cartier-Bresson\'s concept of the "decisive moment" — the precise instant when composition, light, movement, and meaning converge — is as applicable to screenwriting as to photography. A scene has a decisive moment: the instant when everything that has been building arrives in a single image or gesture. Photographers to study: Henri Cartier-Bresson (the father of modern photojournalism — study his geometry); Dorothea Lange (Migrant Mother carries an entire social and political argument without a word); Sebastião Salgado (Workers, 1993 and Genesis, 2013 — sustained visual arguments); Raghu Rai (India\'s most important photojournalist — his Bhopal documentation); Dayanita Singh (contemporary Indian photographer working with archive, memory, and the book as form); Nan Goldin (The Ballad of Sexual Dependency — intimacy, addiction, found family, photographed from inside the lives); Diane Arbus (portraits of people on the margins). Read: On Photography (Sontag), Camera Lucida (Barthes — the punctum; the detail that pierces), Ways of Seeing (Berger). Free resources: magnumphotos.com, metmuseum.org, artsandculture.google.com.',
    },
    {
      phaseId: wmP7.id, sortOrder: 7,
      title: 'Art History',
      description: 'Cinema inherited its visual language from five hundred years of painting. When Kubrick lit Barry Lyndon by candlelight, he was recreating Rembrandt. When Tarkovsky composed his long takes, he was thinking in the terms of icon painting. When Malick frames a face against a sunlit sky, he is working in the tradition of Caravaggio. Most useful concepts: Composition (rule of thirds, diagonal tension, foreground/background); Chiaroscuro (strong contrast between light and dark — Caravaggio, Rembrandt); Negative space (what is left empty is as important as what is filled); The gaze (who looks at whom, and with what power); Ekphrasis (writing that describes a visual work — trains visual precision in language). Painters every screenwriter must know: Caravaggio (inventor of chiaroscuro; his paintings feel like stills from a film; direct influence on Scorsese, Ridley Scott); Rembrandt (the painter of interior light; cited by Kubrick, Tarkovsky, Barry Jenkins); Vermeer (intimate interiors; light through a window; the quietest observational painter); Goya (Saturn Devouring His Son — how art witnesses atrocity); Edward Hopper (American loneliness — his paintings look like film stills from movies not yet made; present in Wim Wenders, Todd Haynes, David Lynch); Francis Bacon (the most raw psychological paintings of the 20th century — for writers exploring trauma); Rothko (emotional register and tone). Read: The Story of Art (Gombrich), Ways of Seeing (Berger). Free: artsandculture.google.com, khanacademy.org/humanities/art-history, Power of Art — Simon Schama BBC series (YouTube, 8 episodes).',
    },
    {
      phaseId: wmP8.id, sortOrder: 1,
      title: 'The Short Film: Your Laboratory',
      description: 'A short film is not a small feature. It is a different form — closer to the short story or the poem. The best short films work through compression, implication, and a single irresolvable tension. Study them not to graduate into features, but to understand what economy of storytelling means. Films to study: La Jetée (Chris Marker, 1962, 28 minutes, free YouTube — still photographs and a voiceover; proof that cinema does not require anything you think it requires); The House Is Black (Farrokhzad, 1962, 22 minutes, free YouTube — a poet made this film; a literary sensibility and a camera are enough); Wasp (Andrea Arnold, 2003, 26 minutes, Oscar winner — study how much she achieves with almost nothing); Two Distant Strangers (Travon Free, 2020, 32 minutes, Oscar winner — repetition and variation as structure); An Occurrence at Owl Creek Bridge (Enrico, 1962, 28 minutes — the trick ending that earned a Palme d\'Or). Read: The 21st Century Screenplay (Linda Aronson) — her chapter on short films and non-linear narrative is the most useful writing on this format. Writing exercise: write three different short film concepts in one sentence each — a premise, a location, and a turning point. Pick the one that frightens you most to make.',
    },
    {
      phaseId: wmP8.id, sortOrder: 2,
      title: 'Developing a Daily Writing Practice',
      description: 'Writing is not inspiration. It is a practice that produces inspiration. The writers who wait for inspiration write nothing. The writers who write every day find that inspiration arrives as a side effect of the practice. Read: The War of Art (Steven Pressfield — the concept of Resistance; every form of procrastination and avoidance explained; read it in one sitting); Bird by Bird (Anne Lamott — "shitty first drafts"; the permission to write badly as a prerequisite for writing well); On Writing (Stephen King — memoir and craft; the daily word count as the only rule that matters). Practical: write every day; start with 250 words; build to 500; do not edit while you write; the first draft is discovery, not performance. The notebook: write in it before you write anything else; write down what you noticed, dreamed, remembered, felt afraid of; the notebook is the garden; the script is the harvest. Study how great writers worked: Chekhov saw patients all morning and wrote in the afternoons; Kafka wrote after midnight when his family slept; Flaubert rewrote each sentence until it was perfect before moving to the next; Carver wrote in his car in a parking lot. There is no one method. There is only the method that produces pages.',
    },
    {
      phaseId: wmP8.id, sortOrder: 3,
      title: 'The Feature Film: From Idea to Draft',
      description: 'Writing a feature screenplay is the most complex sustained creative act in popular art. It requires holding 90–120 pages of interdependent narrative in your head simultaneously, managing dozens of characters, multiple plotlines, and a tonal consistency that must survive the inevitable catastrophe of the first draft. The development process: (1) The Logline — one sentence: protagonist + want + obstacle + stakes. (2) The One-Page — the story in one page; genre, world, tone, central conflict, ending. (3) The Outline — scene by scene; every scene gets one sentence: what happens and what changes. (4) The Beat Sheet — Snyder\'s 15 beats, Field\'s paradigm, or Truby\'s 22 steps applied to your story as a diagnostic, not a template. (5) The Scene Breakdown — write the scene, not the screenplay; for each scene: what is the character\'s objective? What is the obstacle? What changes? (6) First Draft — write it without stopping to revise; 90 pages in 30 days is one screenplay; 3 pages a day is the only discipline needed. (7) The Revision — now read it; identify the three biggest structural problems; fix those first; then the tonal inconsistencies; then the dialogue. Read: Screenplay (Field), Story (McKee), Making a Good Script Great (Seger).',
    },
    {
      phaseId: wmP8.id, sortOrder: 4,
      title: 'Pitching, Rewriting & the Industry',
      description: 'The craft is the writing. The industry is what happens to the writing. You must understand both — and keep them separate in your mind. How to pitch: the logline (one sentence, practice it 50 times until it sounds effortless); the one-sentence premise (protagonist + want + obstacle); the two-minute pitch (logline + world + three major turns + ending + why this story matters now); the full pitch (everything above + character introductions + tone/comparisons). The rewrite: this is a different skill from the first draft. The first draft is exploratory. The rewrite is diagnostic. Read the draft as if you didn\'t write it. Identify: does the protagonist want something in every scene? Is the obstacle always strong enough? Does every scene either advance plot or reveal character — and ideally both? Does the ending feel inevitable and surprising? Read: Making a Good Script Great (Linda Seger — the definitive guide to structural rewriting), Which Lie Did I Tell? (Goldman — on the rewrite as survival). The industry: it operates on relationships, not quality alone; produce work publicly (short films, online, wherever); enter competitions (The Black List, Austin Film Festival); write your own work rather than waiting to be hired; the spec script that demonstrates your voice is worth more than the assignment that hides it. Listen to Scriptnotes podcast for the current reality of working in the industry.',
    },
  ]);

  console.log('Seeding resources...');
  type ResourceInsert = typeof resourcesTable.$inferInsert;
  const resourceRows: ResourceInsert[] = [];

  const allModules = await db.select().from(modulesTable);
  const moduleMap = new Map(allModules.map(m => [m.title, m.id]));

  const r = (moduleTitle: string, items: Omit<ResourceInsert, 'moduleId' | 'sortOrder'>[]) => {
    const moduleId = moduleMap.get(moduleTitle);
    if (!moduleId) { console.warn(`Module not found: "${moduleTitle}"`); return; }
    items.forEach((item, i) => resourceRows.push({ ...item, moduleId, sortOrder: i + 1, isFree: item.isFree ?? false }));
  };

  r('The Frame: Every Image Is a Decision', [
    { type: 'video', title: 'Every Frame a Painting — Full Archive (28 essays)', author: 'Tony Zhou', url: 'https://www.youtube.com/c/everyframeapainting', isFree: true },
    { type: 'book', title: 'The Filmmaker\'s Eye', author: 'Gustavo Mercado', url: 'https://www.amazon.com/Filmmakers-Eye-Meaningful-Purposeful-Cinematography/dp/0240812751' },
    { type: 'film', title: 'Tokyo Story', author: 'Yasujirō Ozu, 1953', url: 'https://www.criterion.com/films/27438-tokyo-story' },
    { type: 'film', title: 'Bicycle Thieves', author: 'Vittorio De Sica, 1948', url: 'https://www.criterion.com/films/26823-bicycle-thieves' },
    { type: 'article', title: 'Edward Hopper paintings', author: 'National Gallery of Art', url: 'https://www.nga.gov/collection/artist-info.1388.html', isFree: true },
  ]);
  r('Light: The Cinematographer\'s Only Tool', [
    { type: 'video', title: 'Wolfcrow — Light Direction Series', author: 'Wolfcrow', url: 'https://www.youtube.com/c/wolfcrow', isFree: true },
    { type: 'video', title: 'Aputure — 3-Point Lighting & Natural Light Series', author: 'Aputure', url: 'https://www.youtube.com/c/aputure', isFree: true },
    { type: 'book', title: 'In the Blink of an Eye', author: 'Walter Murch', url: 'https://www.amazon.com/Blink-Eye-Perspective-Film-Editing/dp/1879505622' },
    { type: 'book', title: 'Lighting for Cinematography', author: 'David Landau', url: 'https://www.amazon.com/Lighting-Cinematography-Practical-Guide-Craft/dp/1501339079' },
    { type: 'film', title: 'Kaagaz Ke Phool', author: 'Guru Dutt / V.K. Murthy, 1959', url: 'https://www.youtube.com/watch?v=kAUg9jTxZ6Y', isFree: true },
    { type: 'film', title: 'Pather Panchali', author: 'Satyajit Ray / Subrata Mitra, 1955', url: 'https://www.criterion.com/films/27434-pather-panchali' },
  ]);
  r('The Camera Moves — Or It Doesn\'t', [
    { type: 'video', title: 'Film Riot — How to Move a Camera', author: 'Film Riot', url: 'https://www.youtube.com/c/filmriot', isFree: true },
    { type: 'book', title: 'On Directing Film', author: 'David Mamet', url: 'https://www.amazon.com/Directing-Film-David-Mamet/dp/0140127224' },
    { type: 'film', title: 'Come and See', author: 'Elem Klimov, 1985', url: 'https://www.criterion.com/films/28817-come-and-see' },
    { type: 'film', title: 'Taste of Cherry', author: 'Abbas Kiarostami, 1997', url: 'https://www.criterion.com/films/27781-taste-of-cherry' },
  ]);
  r('The Cut — Why Editing Is Directing', [
    { type: 'book', title: 'In the Blink of an Eye', author: 'Walter Murch', url: 'https://www.amazon.com/Blink-Eye-Perspective-Film-Editing/dp/1879505622' },
    { type: 'video', title: 'StudioBinder — 8 Cuts Every Filmmaker Should Know', author: 'StudioBinder', url: 'https://www.youtube.com/c/studiobinder', isFree: true },
    { type: 'film', title: 'Battleship Potemkin', author: 'Sergei Eisenstein, 1925', url: 'https://www.youtube.com/watch?v=yGMtRwFnEKk', isFree: true },
    { type: 'film', title: 'Breathless', author: 'Jean-Luc Godard, 1960', url: 'https://www.criterion.com/films/291-breathless' },
  ]);
  r('Documentary — The School of Reality', [
    { type: 'book', title: 'Introduction to Documentary', author: 'Bill Nichols', url: 'https://www.amazon.com/Introduction-Documentary-Third-Bill-Nichols/dp/0253028566' },
    { type: 'film', title: 'The House Is Black', author: 'Forough Farrokhzad, 1962', url: 'https://www.youtube.com/watch?v=YYGBLnlrAnQ', isFree: true },
    { type: 'film', title: 'Varda by Agnès', author: 'Agnès Varda, 2019', url: 'https://www.criterion.com/films/29380-varda-by-agnes' },
  ]);
  r('Mise en Scène — The Director\'s Total Control', [
    { type: 'video', title: 'StudioBinder — What is Mise en Scène?', author: 'StudioBinder', url: 'https://www.youtube.com/c/studiobinder', isFree: true },
    { type: 'book', title: 'Making Movies', author: 'Sidney Lumet', url: 'https://www.amazon.com/Making-Movies-Sidney-Lumet/dp/0679756604' },
    { type: 'film', title: 'The Godfather', author: 'Coppola / Gordon Willis, 1972', url: 'https://www.amazon.com/Godfather-Marlon-Brando/dp/B001GJ4ABI' },
  ]);
  r('Directing Actors — The Most Human Skill', [
    { type: 'book', title: 'Directing Actors', author: 'Judith Weston', url: 'https://www.amazon.com/Directing-Actors-Professional-Judith-Weston/dp/094118822X' },
    { type: 'book', title: 'True and False', author: 'David Mamet', url: 'https://www.amazon.com/True-False-Heresy-Common-Actors/dp/0679772642' },
    { type: 'film', title: 'A Woman Under the Influence', author: 'John Cassavetes, 1974', url: 'https://www.criterion.com/films/28851-a-woman-under-the-influence' },
  ]);
  r('Your First Short — The Laboratory', [
    { type: 'film', title: 'La Jetée', author: 'Chris Marker, 1962', url: 'https://www.youtube.com/watch?v=aQkOSQsJ-nY', isFree: true },
    { type: 'film', title: 'Cameraperson', author: 'Kirsten Johnson, 2016', url: 'https://www.criterion.com/films/28865-cameraperson' },
  ]);
  r('The Director-DP Relationship', [
    { type: 'podcast', title: 'Team Deakins Podcast', author: 'Roger Deakins', url: 'https://www.teamdeakins.com/podcasts', isFree: true },
    { type: 'article', title: 'ASC Magazine Archive — free cinematographer interviews', author: 'American Society of Cinematographers', url: 'https://www.theasc.com/magazine', isFree: true },
  ]);
  r('Composition: The Architecture of the Frame', [
    { type: 'book', title: 'The Filmmaker\'s Eye', author: 'Gustavo Mercado', url: 'https://www.amazon.com/Filmmakers-Eye-Meaningful-Purposeful-Cinematography/dp/0240812751' },
    { type: 'book', title: 'The Five C\'s of Cinematography', author: 'Joseph Mascelli', url: 'https://www.amazon.com/Five-Cinematography-Motion-Picture-Techniques/dp/0879100079' },
    { type: 'video', title: 'Every Frame a Painting — Full Archive (28 essays)', author: 'Tony Zhou', url: 'https://www.youtube.com/c/everyframeapainting', isFree: true },
    { type: 'video', title: 'kogonada video essays (Kubrick, Ozu, Welles, Bresson)', author: 'kogonada', url: 'https://www.youtube.com/user/kogonada', isFree: true },
    { type: 'article', title: 'Magnum Photos — browse by photographer', author: 'Magnum Photos', url: 'https://www.magnumphotos.com', isFree: true },
  ]);
  r('The Visual History of Cinema — Image as Language', [
    { type: 'book', title: 'Film Art: An Introduction', author: 'David Bordwell & Kristin Thompson', url: 'https://www.amazon.com/Film-Art-Introduction-David-Bordwell/dp/1259534960' },
    { type: 'book', title: 'Ways of Seeing', author: 'John Berger', url: 'https://www.amazon.com/Ways-Seeing-Based-BBC-Television/dp/0140135154' },
    { type: 'film', title: 'Citizen Kane', author: 'Orson Welles / Gregg Toland, 1941', url: 'https://www.amazon.com/Citizen-Kane-Orson-Welles/dp/B00004RHQG' },
    { type: 'film', title: 'Days of Heaven', author: 'Terrence Malick / Néstor Almendros, 1978', url: 'https://www.criterion.com/films/28762-days-of-heaven' },
  ]);
  r('The Great Cinematographers — Individual Studies', [
    { type: 'article', title: 'ASC Magazine Archive — free cinematographer interviews', author: 'American Society of Cinematographers', url: 'https://www.theasc.com/magazine', isFree: true },
    { type: 'podcast', title: 'Team Deakins Podcast — start with Episode 1', author: 'Roger Deakins', url: 'https://www.teamdeakins.com/podcasts', isFree: true },
    { type: 'book', title: 'Reflections: On Cinematography', author: 'Roger Deakins', url: 'https://www.amazon.com/Reflections-Cinematography-Roger-Deakins/dp/1419773895' },
  ]);
  r('The Great Directors — Visual Systems', [
    { type: 'book', title: 'Sculpting in Time', author: 'Andrei Tarkovsky', url: 'https://www.amazon.com/Sculpting-Time-Andrei-Tarkovsky/dp/0292776241' },
    { type: 'book', title: 'Notes on the Cinematograph', author: 'Robert Bresson', url: 'https://www.amazon.com/Notes-Cinematograph-New-York-Review-Books/dp/1590172507' },
    { type: 'book', title: 'Our Films, Their Films', author: 'Satyajit Ray', url: 'https://www.amazon.com/Our-Films-Their-Satyajit-Ray/dp/0863111831' },
    { type: 'video', title: 'kogonada video essays', author: 'kogonada', url: 'https://www.youtube.com/user/kogonada', isFree: true },
  ]);
  r('Documentary Forms — The Full Spectrum', [
    { type: 'book', title: 'Introduction to Documentary', author: 'Bill Nichols', url: 'https://www.amazon.com/Introduction-Documentary-Third-Bill-Nichols/dp/0253028566' },
    { type: 'book', title: 'Documentary Storytelling', author: 'Sheila Curran Bernard', url: 'https://www.amazon.com/Documentary-Storytelling-Filmmakers-Guide-Creative/dp/0415833965' },
    { type: 'film', title: 'Grey Gardens', author: 'Maysles Brothers, 1975', url: 'https://www.criterion.com/films/28732-grey-gardens' },
    { type: 'film', title: 'The House Is Black', author: 'Forough Farrokhzad, 1962', url: 'https://www.youtube.com/watch?v=YYGBLnlrAnQ', isFree: true },
    { type: 'film', title: 'An Insignificant Man', author: 'Khushboo Ranka / Abhay Kumar, 2016', url: 'https://www.amazon.com/An-Insignificant-Man/dp/B079GHJHWK' },
  ]);
  r('The Essay Film — Cinema as Thought', [
    { type: 'film', title: 'La Jetée', author: 'Chris Marker, 1962', url: 'https://www.youtube.com/watch?v=aQkOSQsJ-nY', isFree: true },
    { type: 'film', title: 'Sans Soleil', author: 'Chris Marker, 1983', url: 'https://www.criterion.com/films/27997-sans-soleil' },
    { type: 'film', title: 'The Gleaners and I', author: 'Agnès Varda, 2000', url: 'https://www.criterion.com/films/29155-the-gleaners-and-i' },
    { type: 'film', title: 'The Look of Silence', author: 'Joshua Oppenheimer, 2014', url: 'https://www.criterion.com/films/28870-the-look-of-silence' },
  ]);
  r('The Great Partnerships — Studied Together', [
    { type: 'book', title: 'Sculpting in Time', author: 'Andrei Tarkovsky', url: 'https://www.amazon.com/Sculpting-Time-Andrei-Tarkovsky/dp/0292776241' },
    { type: 'book', title: 'Our Films, Their Films', author: 'Satyajit Ray', url: 'https://www.amazon.com/Our-Films-Their-Satyajit-Ray/dp/0863111831' },
    { type: 'podcast', title: 'Team Deakins Podcast', author: 'Roger Deakins', url: 'https://www.teamdeakins.com/podcasts', isFree: true },
    { type: 'film', title: 'Pather Panchali', author: 'Satyajit Ray / Subrata Mitra, 1955', url: 'https://www.criterion.com/films/27434-pather-panchali' },
    { type: 'film', title: 'Pyaasa', author: 'Guru Dutt / V.K. Murthy, 1957', url: 'https://www.youtube.com/watch?v=C_aKYMYfFqk', isFree: true },
    { type: 'film', title: 'Barry Lyndon', author: 'Stanley Kubrick / John Alcott, 1975', url: 'https://www.amazon.com/Barry-Lyndon-Ryan-ONeal/dp/B000FJZMLU' },
  ]);
  r('The Short Film as Doctoral Programme', [
    { type: 'film', title: 'Wasp', author: 'Andrea Arnold, 2003', url: 'https://www.youtube.com/watch?v=0xNFJCm7v2E', isFree: true },
    { type: 'film', title: 'The House Is Black', author: 'Forough Farrokhzad, 1962', url: 'https://www.youtube.com/watch?v=YYGBLnlrAnQ', isFree: true },
    { type: 'book', title: 'The 21st Century Screenplay', author: 'Linda Aronson', url: 'https://www.amazon.com/21st-Century-Screenplay-Completely-Comprehensive/dp/1935247468' },
  ]);
  r('Story: The Invisible Architecture', [
    { type: 'book', title: 'Story', author: 'Robert McKee', url: 'https://www.amazon.com/Story-Substance-Structure-Principles-Screenwriting/dp/0060391685' },
    { type: 'book', title: 'Screenplay: The Foundations of Screenwriting', author: 'Syd Field', url: 'https://www.amazon.com/Screenplay-Foundations-Screenwriting-Syd-Field/dp/0385339062' },
    { type: 'book', title: 'The Anatomy of Story', author: 'John Truby', url: 'https://www.amazon.com/Anatomy-Story-22-Steps-Becoming/dp/0865479933' },
    { type: 'book', title: 'Save the Cat!', author: 'Blake Snyder', url: 'https://www.amazon.com/Save-Cat-Last-Screenwriting-Need/dp/1932907009' },
    { type: 'book', title: 'On Writing', author: 'Stephen King', url: 'https://www.amazon.com/Writing-10th-Anniversary-Memoir-Craft/dp/1439156816' },
  ]);
  r('The Craft of the Screenplay', [
    { type: 'book', title: 'Adventures in the Screen Trade', author: 'William Goldman', url: 'https://www.amazon.com/Adventures-Screen-Trade-Hollywood-Screenwriting/dp/0446391174' },
    { type: 'book', title: 'The Screenwriter\'s Bible', author: 'David Trottier', url: 'https://www.amazon.com/Screenwriters-Bible-Complete-Guide-Writing/dp/1935247336' },
    { type: 'podcast', title: 'Scriptnotes Podcast — first 30 episodes', author: 'John August & Craig Mazin', url: 'https://scriptnotes.net/all-episodes', isFree: true },
    { type: 'article', title: 'Go Into the Story — Scott Myers\' free craft blog', author: 'Scott Myers', url: 'https://gointothestory.blcklst.com', isFree: true },
  ]);
  r('Learning from Produced Screenplays', [
    { type: 'article', title: 'IMSDB — free screenplay archive', author: 'IMSDB', url: 'https://imsdb.com', isFree: true },
    { type: 'article', title: 'Script Slug — produced screenplays', author: 'Script Slug', url: 'https://www.scriptslug.com', isFree: true },
    { type: 'article', title: 'Simply Scripts — international & older scripts', author: 'Simply Scripts', url: 'https://www.simplyscripts.com', isFree: true },
    { type: 'article', title: 'The Black List — award-winning unproduced scripts', author: 'The Black List', url: 'https://blcklst.com', isFree: true },
  ]);
  r('Dialogue & Scene Writing', [
    { type: 'book', title: 'Writing Dialogue', author: 'Tom Chiarella', url: 'https://www.amazon.com/Writing-Dialogue-Tom-Chiarella/dp/0898797969' },
    { type: 'book', title: 'The 21st Century Screenplay', author: 'Linda Aronson', url: 'https://www.amazon.com/21st-Century-Screenplay-Completely-Comprehensive/dp/1935247468' },
    { type: 'film', title: 'A Separation', author: 'Asghar Farhadi, 2011', url: 'https://www.criterion.com/films/28021-a-separation' },
    { type: 'film', title: 'Before Sunrise / Before Sunset / Before Midnight', author: 'Richard Linklater', url: 'https://www.amazon.com/Before-Sunrise-Sunset-Midnight-Trilogy/dp/B00DKXPAHC' },
  ]);
  r('Character Psychology & Motivation', [
    { type: 'book', title: 'The Drama of the Gifted Child', author: 'Alice Miller', url: 'https://www.amazon.com/Drama-Gifted-Child-Search-True/dp/0465016901' },
    { type: 'book', title: 'Creating Character Arcs', author: 'K.M. Weiland', url: 'https://www.amazon.com/Creating-Character-Arcs-Masterful-Storytelling/dp/0985780460' },
    { type: 'book', title: 'Games People Play', author: 'Eric Berne', url: 'https://www.amazon.com/Games-People-Play-Psychology-Relationships/dp/0345410033' },
    { type: 'film', title: 'Taxi Driver', author: 'Paul Schrader / Martin Scorsese, 1976', url: 'https://www.amazon.com/Taxi-Driver-Robert-Niro/dp/B001GJ4AO8' },
  ]);
  r('The Hero\'s Journey & Archetypes', [
    { type: 'book', title: 'The Hero with a Thousand Faces', author: 'Joseph Campbell', url: 'https://www.amazon.com/Hero-Thousand-Faces-Joseph-Campbell/dp/1577315936' },
    { type: 'book', title: 'The Writer\'s Journey', author: 'Christopher Vogler', url: 'https://www.amazon.com/Writers-Journey-Mythic-Structure-Storytellers/dp/193290736X' },
    { type: 'video', title: 'The Power of Myth — PBS Series (6 episodes, YouTube)', author: 'Joseph Campbell & Bill Moyers', url: 'https://www.youtube.com/watch?v=DGUjOOdDSp8', isFree: true },
  ]);
  r('Advanced Psychology for Writers', [
    { type: 'book', title: 'Man and His Symbols', author: 'Carl Jung', url: 'https://www.amazon.com/Man-His-Symbols-Carl-Jung/dp/0440351839' },
    { type: 'book', title: 'Women Who Run With the Wolves', author: 'Clarissa Pinkola Estés', url: 'https://www.amazon.com/Women-Who-Run-Wolves-Archetypal/dp/034541002X' },
    { type: 'book', title: 'Attached', author: 'Amir Levine & Rachel Heller', url: 'https://www.amazon.com/Attached-Science-Adult-Attachment-Find/dp/1585429139' },
  ]);
  r('How to Study a Film (The Method)', [
    { type: 'video', title: 'Every Frame a Painting — all 28 essays', author: 'Tony Zhou', url: 'https://www.youtube.com/c/everyframeapainting', isFree: true },
    { type: 'video', title: 'kogonada video essays', author: 'kogonada', url: 'https://www.youtube.com/user/kogonada', isFree: true },
    { type: 'article', title: 'Senses of Cinema — free world cinema criticism', author: 'Senses of Cinema', url: 'https://www.sensesofcinema.com', isFree: true },
  ]);
  r('Iranian Cinema', [
    { type: 'book', title: 'Close Up: Iranian Cinema, Past, Present and Future', author: 'Hamid Dabashi', url: 'https://www.amazon.com/Close-Up-Iranian-Cinema-Present/dp/1844671976' },
    { type: 'film', title: 'The House Is Black', author: 'Forough Farrokhzad, 1962', url: 'https://www.youtube.com/watch?v=YYGBLnlrAnQ', isFree: true },
    { type: 'film', title: 'Close-Up', author: 'Abbas Kiarostami, 1990', url: 'https://www.criterion.com/films/27781-close-up' },
    { type: 'film', title: 'A Separation', author: 'Asghar Farhadi, 2011', url: 'https://www.criterion.com/films/28021-a-separation' },
    { type: 'film', title: 'This Is Not a Film', author: 'Jafar Panahi, 2011', url: 'https://www.criterion.com/films/28819-this-is-not-a-film' },
  ]);
  r('French Cinema & the New Wave', [
    { type: 'article', title: '"A Certain Tendency of the French Cinema" — Truffaut\'s 1954 manifesto', author: 'François Truffaut', url: 'https://www.sensesofcinema.com/2001/cinema-s-first-century/truffaut/', isFree: true },
    { type: 'film', title: 'The 400 Blows', author: 'François Truffaut, 1959', url: 'https://www.criterion.com/films/285-the-400-blows' },
    { type: 'film', title: 'Breathless', author: 'Jean-Luc Godard, 1960', url: 'https://www.criterion.com/films/291-breathless' },
    { type: 'film', title: 'Pickpocket', author: 'Robert Bresson, 1959', url: 'https://www.criterion.com/films/27862-pickpocket' },
    { type: 'film', title: 'Cléo from 5 to 7', author: 'Agnès Varda, 1962', url: 'https://www.criterion.com/films/26768-cleo-from-5-to-7' },
    { type: 'book', title: 'Notes on the Cinematograph', author: 'Robert Bresson', url: 'https://www.amazon.com/Notes-Cinematograph-New-York-Review-Books/dp/1590172507' },
  ]);
  r('Italian Cinema & Neorealism', [
    { type: 'article', title: '"Some Ideas on the Cinema" by Cesare Zavattini (free)', author: 'Cesare Zavattini', url: 'https://www.sensesofcinema.com/2002/feature-articles/zavattini/', isFree: true },
    { type: 'film', title: 'Bicycle Thieves', author: 'Vittorio De Sica, 1948', url: 'https://www.criterion.com/films/26823-bicycle-thieves' },
    { type: 'film', title: 'Rome, Open City', author: 'Roberto Rossellini, 1945', url: 'https://www.criterion.com/films/28889-rome-open-city' },
    { type: 'film', title: '8½', author: 'Federico Fellini, 1963', url: 'https://www.criterion.com/films/335-8-1-2' },
    { type: 'film', title: 'L\'Avventura', author: 'Michelangelo Antonioni, 1960', url: 'https://www.criterion.com/films/27777-l-avventura' },
  ]);
  r('Japanese Cinema', [
    { type: 'book', title: 'Something Like an Autobiography', author: 'Akira Kurosawa', url: 'https://www.amazon.com/Something-Like-Autobiography-Akira-Kurosawa/dp/0394714393' },
    { type: 'article', title: 'Ozu and the Poetics of Cinema (free PDF)', author: 'David Bordwell', url: 'https://www.davidbordwell.net/books/poetics.php', isFree: true },
    { type: 'film', title: 'Rashomon', author: 'Akira Kurosawa, 1950', url: 'https://www.criterion.com/films/27744-rashomon' },
    { type: 'film', title: 'Tokyo Story', author: 'Yasujirō Ozu, 1953', url: 'https://www.criterion.com/films/27438-tokyo-story' },
    { type: 'film', title: 'Seven Samurai', author: 'Akira Kurosawa, 1954', url: 'https://www.criterion.com/films/25054-seven-samurai' },
    { type: 'film', title: 'Drive My Car', author: 'Ryusuke Hamaguchi, 2021', url: 'https://www.mubi.com/films/drive-my-car' },
  ]);
  r('Korean New Wave', [
    { type: 'article', title: 'koreanfilm.org — Darcy Paquet\'s free essays', author: 'Darcy Paquet', url: 'https://www.koreanfilm.org', isFree: true },
    { type: 'film', title: 'Memories of Murder', author: 'Bong Joon-ho, 2003', url: 'https://www.criterion.com/films/29060-memories-of-murder' },
    { type: 'film', title: 'Oldboy', author: 'Park Chan-wook, 2003', url: 'https://www.amazon.com/Oldboy-Choi-Min-sik/dp/B001CU3L7U' },
    { type: 'film', title: 'Poetry', author: 'Lee Chang-dong, 2010', url: 'https://www.mubi.com/films/poetry' },
    { type: 'film', title: 'Parasite', author: 'Bong Joon-ho, 2019', url: 'https://www.amazon.com/Parasite-Song-Kang-ho/dp/B07Z6YQKHP' },
  ]);
  r('Indian Cinema (Parallel & Beyond)', [
    { type: 'book', title: 'Our Films, Their Films', author: 'Satyajit Ray', url: 'https://www.amazon.com/Our-Films-Their-Satyajit-Ray/dp/0863111831' },
    { type: 'article', title: 'Senses of Cinema — Indian cinema essays', author: 'Senses of Cinema', url: 'https://www.sensesofcinema.com/category/national-cinemas/indian-cinema/', isFree: true },
    { type: 'film', title: 'Pather Panchali', author: 'Satyajit Ray, 1955', url: 'https://www.criterion.com/films/27434-pather-panchali' },
    { type: 'film', title: 'Pyaasa', author: 'Guru Dutt, 1957', url: 'https://www.youtube.com/watch?v=C_aKYMYfFqk', isFree: true },
    { type: 'film', title: 'Masaan', author: 'Neeraj Ghaywan, 2015', url: 'https://www.netflix.com/title/80107489' },
    { type: 'film', title: 'Court', author: 'Chaitanya Tamhane, 2014', url: 'https://www.mubi.com/films/court' },
  ]);
  r('Russian & Eastern European Cinema', [
    { type: 'book', title: 'Sculpting in Time', author: 'Andrei Tarkovsky', url: 'https://www.amazon.com/Sculpting-Time-Andrei-Tarkovsky/dp/0292776241' },
    { type: 'film', title: 'Battleship Potemkin', author: 'Sergei Eisenstein, 1925', url: 'https://www.youtube.com/watch?v=yGMtRwFnEKk', isFree: true },
    { type: 'film', title: 'Come and See', author: 'Elem Klimov, 1985', url: 'https://www.criterion.com/films/28817-come-and-see' },
    { type: 'film', title: 'Stalker', author: 'Andrei Tarkovsky, 1979', url: 'https://www.criterion.com/films/28871-stalker' },
  ]);
  r('American Independent Cinema', [
    { type: 'film', title: 'A Woman Under the Influence', author: 'John Cassavetes, 1974', url: 'https://www.criterion.com/films/28851-a-woman-under-the-influence' },
    { type: 'film', title: 'Moonlight', author: 'Barry Jenkins, 2016', url: 'https://www.amazon.com/Moonlight-Mahershala-Ali/dp/B01N2MMFNF' },
    { type: 'film', title: 'Nomadland', author: 'Chloé Zhao, 2020', url: 'https://www.amazon.com/Nomadland-Frances-McDormand/dp/B08XMVTLBS' },
  ]);
  r('World Mythology & the Monomyth', [
    { type: 'book', title: 'The Hero with a Thousand Faces', author: 'Joseph Campbell', url: 'https://www.amazon.com/Hero-Thousand-Faces-Joseph-Campbell/dp/1577315936' },
    { type: 'video', title: 'The Power of Myth — PBS Series (YouTube)', author: 'Joseph Campbell & Bill Moyers', url: 'https://www.youtube.com/watch?v=DGUjOOdDSp8', isFree: true },
    { type: 'book', title: 'Mythology', author: 'Edith Hamilton', url: 'https://www.amazon.com/Mythology-Timeless-Tales-Gods-Heroes/dp/0316223441' },
  ]);
  r('Folklore, Fairy Tale & Oral Tradition', [
    { type: 'book', title: 'The Uses of Enchantment', author: 'Bruno Bettelheim', url: 'https://www.amazon.com/Uses-Enchantment-Meaning-Importance-Fairy/dp/0679723935' },
    { type: 'book', title: 'Morphology of the Folktale', author: 'Vladimir Propp', url: 'https://www.amazon.com/Morphology-Folktale-Vladimir-Propp/dp/0292783760' },
  ]);
  r('South Asian Literature', [
    { type: 'book', title: 'Manto: Bombay Stories', author: 'Saadat Hasan Manto', url: 'https://www.amazon.com/Bombay-Stories-Saadat-Hasan-Manto/dp/0812981235' },
    { type: 'book', title: 'The God of Small Things', author: 'Arundhati Roy', url: 'https://www.amazon.com/God-Small-Things-Arundhati-Roy/dp/0812979656' },
    { type: 'book', title: 'Midnight\'s Children', author: 'Salman Rushdie', url: 'https://www.amazon.com/Midnights-Children-Salman-Rushdie/dp/0812976533' },
    { type: 'book', title: 'Godaan', author: 'Premchand', url: 'https://www.amazon.com/Godan-Novel-Munshi-Premchand/dp/8126006056' },
  ]);
  r('African, Asian & Postcolonial Voices', [
    { type: 'book', title: 'Things Fall Apart', author: 'Chinua Achebe', url: 'https://www.amazon.com/Things-Fall-Apart-Chinua-Achebe/dp/0385474547' },
    { type: 'book', title: 'Season of Migration to the North', author: 'Tayeb Salih', url: 'https://www.amazon.com/Season-Migration-North-Tayeb-Salih/dp/0894108700' },
    { type: 'book', title: 'The Wind-Up Bird Chronicle', author: 'Haruki Murakami', url: 'https://www.amazon.com/Wind-Up-Bird-Chronicle-Haruki-Murakami/dp/0679775439' },
  ]);
  r('Depth Psychology: Jung & the Unconscious', [
    { type: 'book', title: 'Man and His Symbols', author: 'Carl Jung', url: 'https://www.amazon.com/Man-His-Symbols-Carl-Jung/dp/0440351839' },
    { type: 'book', title: 'Memories, Dreams, Reflections', author: 'Carl Jung', url: 'https://www.amazon.com/Memories-Dreams-Reflections-C-Jung/dp/0679723951' },
    { type: 'article', title: 'Maslow\'s Hierarchy of Needs — original essay (free)', author: 'Abraham Maslow', url: 'https://psychclassics.yorku.ca/Maslow/motivation.htm', isFree: true },
  ]);
  r('Behavioural & Social Psychology', [
    { type: 'book', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', url: 'https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555' },
    { type: 'book', title: 'The Lucifer Effect', author: 'Philip Zimbardo', url: 'https://www.amazon.com/Lucifer-Effect-Good-People-Turn/dp/0812974441' },
    { type: 'book', title: 'Influence', author: 'Robert Cialdini', url: 'https://www.amazon.com/Influence-Psychology-Persuasion-Robert-Cialdini/dp/006124189X' },
  ]);
  r('Trauma, Memory & the Wounded Character', [
    { type: 'book', title: 'The Body Keeps the Score', author: 'Bessel van der Kolk', url: 'https://www.amazon.com/Body-Keeps-Score-Healing-Trauma/dp/0143127748' },
    { type: 'book', title: 'Man\'s Search for Meaning', author: 'Viktor Frankl', url: 'https://www.amazon.com/Mans-Search-Meaning-Viktor-Frankl/dp/080701429X' },
    { type: 'book', title: 'Trauma and Recovery', author: 'Judith Herman', url: 'https://www.amazon.com/Trauma-Recovery-Aftermath-Violence-Political/dp/0465087302' },
    { type: 'book', title: 'The Year of Magical Thinking', author: 'Joan Didion', url: 'https://www.amazon.com/Year-Magical-Thinking-Joan-Didion/dp/1400078431' },
  ]);
  r('Reading Plays', [
    { type: 'book', title: 'The Art of Dramatic Writing', author: 'Lajos Egri', url: 'https://www.amazon.com/Art-Dramatic-Writing-Lajos-Egri/dp/0671213326' },
    { type: 'book', title: 'Three Uses of the Knife', author: 'David Mamet', url: 'https://www.amazon.com/Three-Uses-Knife-Nature-Purpose/dp/0679772979' },
    { type: 'video', title: 'National Theatre Live — free streams (YouTube)', author: 'National Theatre', url: 'https://www.youtube.com/c/NationalTheatre', isFree: true },
  ]);
  r('Essay Writing', [
    { type: 'article', title: 'George Orwell\'s Complete Essays (free)', author: 'George Orwell', url: 'https://www.orwell.ru/library/essays', isFree: true },
    { type: 'article', title: 'Aeon — free essays on ideas', author: 'Aeon', url: 'https://aeon.co', isFree: true },
    { type: 'article', title: 'Literary Hub — free essays and criticism', author: 'Literary Hub', url: 'https://lithub.com', isFree: true },
    { type: 'article', title: 'tetw.org — curated links to the best essays on the web', author: 'The Electric Typewriter', url: 'https://tetw.org', isFree: true },
  ]);
  r('Documentary Practice', [
    { type: 'book', title: 'Introduction to Documentary', author: 'Bill Nichols', url: 'https://www.amazon.com/Introduction-Documentary-Third-Bill-Nichols/dp/0253028566' },
    { type: 'film', title: 'Grey Gardens', author: 'Maysles Brothers, 1975', url: 'https://www.criterion.com/films/28732-grey-gardens' },
    { type: 'film', title: 'The Act of Killing', author: 'Joshua Oppenheimer, 2012', url: 'https://www.criterion.com/films/28869-the-act-of-killing' },
    { type: 'film', title: 'An Insignificant Man', author: 'Abhay Kumar / Khushboo Ranka, 2016', url: 'https://www.amazon.com/An-Insignificant-Man/dp/B079GHJHWK' },
  ]);
  r('Photography', [
    { type: 'book', title: 'On Photography', author: 'Susan Sontag', url: 'https://www.amazon.com/Photography-Susan-Sontag/dp/0312420099' },
    { type: 'book', title: 'Camera Lucida', author: 'Roland Barthes', url: 'https://www.amazon.com/Camera-Lucida-Reflections-Photography/dp/0374521344' },
    { type: 'article', title: 'Magnum Photos — browse by photographer', author: 'Magnum Photos', url: 'https://www.magnumphotos.com', isFree: true },
    { type: 'article', title: 'Metropolitan Museum Photography Collection', author: 'The Metropolitan Museum of Art', url: 'https://www.metmuseum.org/art/collection/search#!?material=Photographs', isFree: true },
  ]);
  r('Art History', [
    { type: 'book', title: 'The Story of Art', author: 'E.H. Gombrich', url: 'https://www.amazon.com/Story-Art-Pocket-Gombrich/dp/0714832472' },
    { type: 'book', title: 'Ways of Seeing', author: 'John Berger', url: 'https://www.amazon.com/Ways-Seeing-Based-BBC-Television/dp/0140135154' },
    { type: 'article', title: 'Google Arts & Culture', author: 'Google', url: 'https://artsandculture.google.com', isFree: true },
    { type: 'article', title: 'Khan Academy Art History (free)', author: 'Khan Academy', url: 'https://www.khanacademy.org/humanities/art-history', isFree: true },
    { type: 'video', title: 'Power of Art — Simon Schama BBC Series (YouTube)', author: 'BBC', url: 'https://www.youtube.com/watch?v=qhEHIVDKMeI', isFree: true },
  ]);
  r('The Short Film: Your Laboratory', [
    { type: 'film', title: 'La Jetée', author: 'Chris Marker, 1962', url: 'https://www.youtube.com/watch?v=aQkOSQsJ-nY', isFree: true },
    { type: 'film', title: 'The House Is Black', author: 'Forough Farrokhzad, 1962', url: 'https://www.youtube.com/watch?v=YYGBLnlrAnQ', isFree: true },
    { type: 'film', title: 'Wasp', author: 'Andrea Arnold, 2003', url: 'https://www.youtube.com/watch?v=0xNFJCm7v2E', isFree: true },
    { type: 'book', title: 'The 21st Century Screenplay', author: 'Linda Aronson', url: 'https://www.amazon.com/21st-Century-Screenplay-Completely-Comprehensive/dp/1935247468' },
  ]);
  r('Developing a Daily Writing Practice', [
    { type: 'book', title: 'The War of Art', author: 'Steven Pressfield', url: 'https://www.amazon.com/War-Art-Through-Creative-Battles/dp/1936891026' },
    { type: 'book', title: 'Bird by Bird', author: 'Anne Lamott', url: 'https://www.amazon.com/Bird-Some-Instructions-Writing-Life/dp/0385480016' },
    { type: 'book', title: 'On Writing', author: 'Stephen King', url: 'https://www.amazon.com/Writing-10th-Anniversary-Memoir-Craft/dp/1439156816' },
  ]);
  r('The Feature Film: From Idea to Draft', [
    { type: 'book', title: 'Screenplay: The Foundations of Screenwriting', author: 'Syd Field', url: 'https://www.amazon.com/Screenplay-Foundations-Screenwriting-Syd-Field/dp/0385339062' },
    { type: 'article', title: 'WriterDuet — free screenplay writing tool', author: 'WriterDuet', url: 'https://writerduet.com', isFree: true },
    { type: 'book', title: 'Making a Good Script Great', author: 'Linda Seger', url: 'https://www.amazon.com/Making-Good-Script-Great-Linda/dp/0935526455' },
  ]);
  r('Pitching, Rewriting & the Industry', [
    { type: 'book', title: 'Which Lie Did I Tell?', author: 'William Goldman', url: 'https://www.amazon.com/Which-Lie-Tell-More-Adventures/dp/0679421432' },
    { type: 'podcast', title: 'Scriptnotes Podcast — industry insights', author: 'John August & Craig Mazin', url: 'https://scriptnotes.net/all-episodes', isFree: true },
    { type: 'article', title: 'The Black List — find representation and industry contacts', author: 'The Black List', url: 'https://blcklst.com', isFree: true },
  ]);

  if (resourceRows.length > 0) {
    await db.insert(resourcesTable).values(resourceRows);
  }

  const phaseCount = await db.select().from(phasesTable);
  const moduleCount = await db.select().from(modulesTable);

  console.log('\nSeed complete!');
  console.log(`  Courses: 2`);
  console.log(`  Phases: ${phaseCount.length}`);
  console.log(`  Modules: ${moduleCount.length}`);
  console.log(`  Resources: ${resourceRows.length}`);

  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
