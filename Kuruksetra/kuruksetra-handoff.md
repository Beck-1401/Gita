# Kurukṣetra: An Interactive Visualization of Bhagavadgītā Chapter 1

## Project Handoff Document for Claude Code
**Author**: Brad Bannon (bradbannon.com) — Boston College, THEO 1432  
**Purpose**: Immersive, academically accurate, interactive 3D scene of Kurukṣetra as described in Bhagavadgītā 1.1–1.47  
**Deployment**: Firebase / Google Cloud, hosted at bradbannon.com  
**Audience**: Undergraduate students (ages 17–23) in a Hindu-Christian comparative theology course

---

## 1. Vision

The user stands at the center of the Kurukṣetra battlefield, beside Arjuna's chariot. They can rotate 360° and look at the assembled warriors of both armies. Hovering over or clicking on named figures reveals the Gītā verse(s) that describe them, in English translation. The experience is atmospheric, reverent, and textually grounded — every visual element should be traceable to a specific verse or set of verses from Chapter 1.

**This is NOT the Viśvarūpa scene from Chapter 11.** This is the quiet, tense pre-battle assembly: the marshaling of armies, the blowing of conches, and Arjuna's rising despair as he surveys his kinsmen arrayed for slaughter.

### Aesthetic Direction

Think: golden-hour light over a vast dusty plain. Stylized but dignified — not cartoonish, not photorealistic. Low-poly or painterly geometric forms work well. The mood is epic and somber. Warm earth tones, dust haze, a sky caught between dawn and foreboding. Sound design (optional/future): distant drums, wind, conch blasts.

### Intertextual Easter Egg

The five horses drawing Arjuna's chariot allude to Kaṭha Upaniṣad 1.3.3–4, where the body is the chariot (ratha), the Self (ātman) is the rider, the intellect (buddhi) is the charioteer, the mind (manas) is the reins, and the five senses (indriya) are the five horses. Kṛṣṇa-as-charioteer is the Gītā's embodiment of this metaphor. A subtle tooltip or info-panel on the chariot can reference this.

---

## 2. Textual Source Map: BG Chapter 1, Verse by Verse

Below is a complete spatial/narrative mapping of every verse in Chapter 1. Each verse is tagged with its **spatial implication** (where things are, who is where) and **interactive implication** (what the user should see/access).

### Frame Narrative (1.1)

- **1.1** — Dhṛtarāṣṭra (blind king, NOT present on the field) asks Sañjaya: "Assembled on the dharma-field of Kuru (dharmakṣetre kurukṣetre), what did my sons and the sons of Pāṇḍu do?"
- **Spatial**: This sets the macro-location. The entire scene IS dharmakṣetra kurukṣetra. Consider rendering this verse as an opening title card or environmental text.
- **Interactive**: Could serve as intro/splash text before the 3D scene loads.

### Duryodhana Surveys the Pāṇḍava Army (1.2–1.11)

Duryodhana approaches his teacher Droṇa and points out the Pāṇḍava warriors. These verses give us the **Pāṇḍava roster** as seen from the Kaurava side.

- **1.2** — Duryodhana sees the Pāṇḍava army arrayed in battle formation (vyūḍhāṃ pāṇḍavānīkam). He approaches Droṇa (ācāryam).
  - **Spatial**: Duryodhana and Droṇa are on the KAURAVA side, looking across at the Pāṇḍavas.

- **1.3** — "Behold, O teacher, this great army of the sons of Pāṇḍu, arrayed by the son of Drupada (Dhṛṣṭadyumna), your wise pupil."
  - **Spatial**: Dhṛṣṭadyumna is the Pāṇḍava field marshal. He should be visually prominent on the Pāṇḍava side.

- **1.4–1.6** — Duryodhana names Pāṇḍava heroes:
  - **1.4**: Bhīma and Arjuna (mahā-rathas, "great chariot-warriors"); Yuyudhāna (= Sātyaki), Virāṭa, Drupada
  - **1.5**: Dhṛṣṭaketu, Cekitāna, the valiant king of Kāśī (Kāśirāja), Purujit, Kuntibhoja, Śaibya — "bulls among men" (puruṣavyāghra)
  - **1.6**: Yudhāmanyu the brave, Uttamaujā the valiant, the son of Subhadrā (= Abhimanyu), and the sons of Draupadī — "all great chariot-warriors"
  - **Spatial**: These warriors are scattered across the PĀṆḌAVA formation. Each is a hotspot.

- **1.7** — Duryodhana now names the distinguished warriors on HIS OWN (Kaurava) side: "Know also, O best of the twice-born, the leaders of my army."
  - **Spatial**: Transition — now we're populating the KAURAVA side.

- **1.8** — Kaurava champions: "You yourself (Droṇa), and Bhīṣma, and Karṇa, and Kṛpa the ever-victorious; Aśvatthāmā, Vikarṇa, and also Somadatta's son (Bhūriśravas)."
  - **Spatial**: These are the primary Kaurava hotspots — each gets a figure and verse tag.

- **1.9** — "And many other heroes, willing to give up their lives for my sake, armed with various weapons and missiles, all skilled in battle."
  - **Spatial**: Generic Kaurava soldiers — render as a mass/crowd behind the named figures.

- **1.10** — "Unlimited is our army under Bhīṣma's protection, while their (Pāṇḍava) army, guarded by Bhīma, is limited."
  - **Spatial**: Bhīṣma is the SUPREME COMMANDER of the Kaurava forces. He should be the most visually prominent figure on that side. Bhīma is his Pāṇḍava counterpart here.

- **1.11** — "Therefore, stationed in your respective positions at every entrance to the formation, all of you must protect Bhīṣma alone (bhīṣmam evābhirakṣantu)."
  - **Spatial**: This gives a formation structure — Kaurava warriors are stationed at strategic points protecting Bhīṣma at center.

### The Conch-Blowing Sequence (1.12–1.19)

This is the GREAT SONIC MOMENT of Chapter 1. It should be the central interactive set-piece.

- **1.12** — "Then Bhīṣma, the grand-sire, the eldest of the Kurus, roaring like a lion, blew his conch, giving Duryodhana joy."
  - **Spatial**: Bhīṣma, Kaurava side, blowing conch. Lion's roar. His conch is not named in the text.
  - **Interactive**: Click Bhīṣma → verse 1.12, hear/see conch visual effect.

- **1.13** — "Then conches, kettledrums, tabors, drums, and cow-horns all suddenly blared forth — the sound was tumultuous (sa śabdas tumulo 'bhavat)."
  - **Spatial**: The entire Kaurava army erupts. This is an ambient/atmospheric moment — dust rises, banners shake.

- **1.14** — "Then, stationed in their great chariot yoked to white horses, Mādhava (Kṛṣṇa) and Pāṇḍava (Arjuna) blew their divine conches."
  - **Spatial**: THE CHARIOT. Center of the scene. White horses. Kṛṣṇa and Arjuna together. This is the visual anchor of the whole experience.
  - **Note on horses**: The text says "white horses" (śvetair hayair yukte mahati syandane). Five horses per the Kaṭha Upaniṣad intertext (Brad's request). Technically the Gītā doesn't specify the number, but five is the traditional iconographic convention and the Kaṭha allusion is intentional pedagogy.

- **1.15** — Kṛṣṇa blew **Pāñcajanya**; Arjuna blew **Devadatta**; Bhīma, the wolf-bellied doer of terrible deeds, blew the great conch **Pauṇḍra**.
  - **Interactive**: Three named conches, three hotspots. Each conch-name should appear with the verse.

- **1.16** — King Yudhiṣṭhira, son of Kuntī, blew **Anantavijaya**; Nakula and Sahadeva blew **Sughoṣa** and **Maṇipuṣpaka**.
  - **Interactive**: Three more named conches.

- **1.17–1.18** — "The king of Kāśī, the supreme archer; Śikhaṇḍin, the great chariot-warrior; Dhṛṣṭadyumna and Virāṭa and the unconquered Sātyaki; Drupada and the sons of Draupadī, O lord of the earth, and the mighty-armed son of Subhadrā (Abhimanyu) — all blew their respective conches."
  - **Interactive**: Secondary conch-blowers on the Pāṇḍava side.

- **1.19** — "That tumultuous uproar resounding through earth and sky rent the hearts of Dhṛtarāṣṭra's sons (nabhaśca pṛthivīṃ caiva tumulo 'bhyanunādayan)."
  - **Spatial**: Atmospheric climax of the conch sequence. Environmental effect — sky trembles, dust billows.

### Arjuna Moves to the Center (1.20–1.24)

- **1.20** — "Then, seeing Dhṛtarāṣṭra's sons drawn up in battle order, with missiles about to fly, the son of Pāṇḍu (Arjuna), whose banner bears the emblem of Hanumān (kapidhvaja), took up his bow."
  - **CRITICAL VISUAL**: The chariot has a **banner with Hanumān (the ape/monkey)** on it. This is kapidhvaja — "ape-bannered." This must be visible on the chariot.

- **1.21–1.22** — Arjuna says to Kṛṣṇa: "O Acyuta, place my chariot between the two armies (senayor ubhayor madhye rathaṃ sthāpaya me 'cyuta) so that I may behold those who stand here eager for battle, with whom I must contend in this great trial of arms."
  - **Spatial**: THIS IS WHY THE CHARIOT IS AT CENTER. Arjuna explicitly asks to be placed between the two armies. The user's viewpoint is essentially Arjuna's viewpoint.

- **1.23** — "Let me see those who have assembled here to fight, wishing to please the evil-minded son of Dhṛtarāṣṭra (Duryodhana) in battle."
  - **Interactive**: This verse motivates the 360° survey mechanic — Arjuna is literally looking around at everyone.

- **1.24** — Sañjaya narrates: "O Bhārata, Kṛṣṇa, thus addressed by Arjuna, placed the best of chariots between the two armies."
  - **Spatial**: Confirms central placement.

### Arjuna Surveys His Kinsmen (1.25–1.27)

- **1.25** — "In the presence of Bhīṣma and Droṇa and all the rulers of the earth, Kṛṣṇa said: 'O Pārtha, behold these Kurus gathered together.'"
  - **Interactive**: Kṛṣṇa's one spoken line in Chapter 1. Should be a hotspot on Kṛṣṇa.

- **1.26–1.27** — "Then Arjuna saw standing there fathers, grandfathers, teachers, maternal uncles, brothers, sons, grandsons, friends, fathers-in-law, and well-wishers — in both armies. Seeing all these kinsmen arrayed, the son of Kuntī was overcome with deep compassion (kṛpayā parayāviṣṭo)."
  - **Interactive**: This is the emotional pivot. Consider a visual darkening or shift in atmosphere when the user reaches this stage.

### Arjuna's Despair (1.28–1.46)

Arjuna speaks at length about why he cannot fight. These verses are more dialogical than spatial, but they contain key physical descriptions.

- **1.28–1.30** — Physical symptoms: limbs quaking (sīdanti mama gātrāṇi), mouth drying (mukhaṃ ca pariśuṣyati), body trembling (vepathuśca śarīre), hair standing on end (romaharṣaśca), Gāṇḍīva (his bow) slipping from his hand (gāṇḍīvaṃ sraṃsate hastāt), skin burning (tvak caiva paridahyate), he cannot stand (na ca śaknomy avasthātum), his mind is reeling (bhramatīva ca me manaḥ).
  - **Interactive**: These could be annotations on Arjuna's figure. The physical collapse is vivid and specific.

- **1.31** — "I see adverse omens (nimittāni ca paśyāmi viparītāni)."
  - **Spatial/Atmospheric**: Ominous signs — could be subtle environmental cues (birds, wind shifts, dark clouds).

- **1.32–1.35** — Arjuna names whom he cannot bear to kill: "Bhīṣma, Droṇa, and also others — teachers, fathers, sons, grandfathers, maternal uncles, fathers-in-law, grandsons, brothers-in-law, and other kinsmen. Even for the sovereignty of the three worlds, let alone this earth, I would not kill them, O Madhusūdana."
  - **Interactive**: When the user hovers over warriors on BOTH sides, this passage contextualizes the tragedy — these are family members on opposite sides.

- **1.36–1.44** — Extended moral argument (not spatially relevant, but important for verse-text popups on Arjuna).

- **1.45–1.46** — "It would be better for me if the sons of Dhṛtarāṣṭra, weapons in hand, were to kill me in battle, unresisting and unarmed."
  - **Interactive**: Despair reaches its peak.

### The Final Image (1.47)

- **1.47** — "Having spoken thus on the battlefield, Arjuna cast aside his bow and arrows and sank down on the seat of the chariot, his mind overwhelmed with grief (viṣīdantam idaṃ vākyam ... śokasaṃvignamānasaḥ)."
  - **Spatial**: Arjuna sitting in the chariot, bow dropped. This could be an alternate "state" the user can toggle to — before and after the despair. Or it could be the scene's final frame.

---

## 3. Character Registry

### Positioned at Center (Between Both Armies)

| Character | Description | Verse(s) | Visual Notes |
|-----------|-------------|----------|--------------|
| **Arjuna** | Pāṇḍava prince, main protagonist | 1.14, 1.20–1.47 | Standing in chariot, Gāṇḍīva bow, diadem (kirīṭin) |
| **Kṛṣṇa** | Arjuna's charioteer, avatar of Viṣṇu | 1.14–1.15, 1.24–1.25 | Holding reins, divine bearing, dark complexion |
| **Chariot** | Divine chariot with ape-banner (kapidhvaja) | 1.14, 1.20, 1.24 | White horses (5, per Kaṭha), Hanumān banner, great chariot (mahati syandane) |

### Kaurava Side (Dhṛtarāṣṭra's Army)

| Character | Description | Verse(s) | Visual Notes |
|-----------|-------------|----------|--------------|
| **Bhīṣma** | Grand patriarch, supreme commander | 1.8, 1.10, 1.11, 1.12, 1.25 | Eldest, most prominent; blows conch with lion's roar; white-haired elder warrior |
| **Droṇa** | Teacher of both sides (ācārya) | 1.2, 1.3, 1.7, 1.8, 1.25 | Brahmin warrior-teacher; Duryodhana addresses him |
| **Karṇa** | Warrior, rival of Arjuna | 1.8 | Great archer, known for golden armor (traditional, not ch.1-specific) |
| **Kṛpa** | "Ever-victorious" (kṛpaśca samitiñjayaḥ) | 1.8 | Brahmin warrior |
| **Aśvatthāmā** | Son of Droṇa | 1.8 | Young warrior, near his father |
| **Vikarṇa** | Son of Dhṛtarāṣṭra | 1.8 | Prince |
| **Bhūriśravas** | Son of Somadatta (saumadattiḥ) | 1.8 | Noble warrior |
| **Duryodhana** | Eldest son of Dhṛtarāṣṭra, instigator | 1.2, 1.12 | Near Droṇa at scene opening; prince with royal bearing |

### Pāṇḍava Side

| Character | Description | Verse(s) | Visual Notes |
|-----------|-------------|----------|--------------|
| **Dhṛṣṭadyumna** | Son of Drupada, Pāṇḍava field marshal | 1.3, 1.17 | Arranged the army (vyūḍhām); blows conch |
| **Bhīma** | Second Pāṇḍava, "wolf-bellied" (vṛkodaraḥ) | 1.4, 1.10, 1.15 | Massive, fearsome; blows conch Pauṇḍra |
| **Yudhiṣṭhira** | Eldest Pāṇḍava, "King Yudhiṣṭhira, son of Kuntī" | 1.16 | Royal, dharmic bearing; blows Anantavijaya |
| **Nakula** | Fourth Pāṇḍava | 1.16 | Twin; blows Sughoṣa |
| **Sahadeva** | Fifth Pāṇḍava | 1.16 | Twin; blows Maṇipuṣpaka |
| **Drupada** | King, father of Dhṛṣṭadyumna and Draupadī | 1.4, 1.18 | Elder king; blows conch |
| **Virāṭa** | King who sheltered Pāṇḍavas | 1.4, 1.17 | Royal warrior |
| **Sātyaki** | (= Yuyudhāna), ally of Kṛṣṇa | 1.4, 1.17 | "Unconquered" (aparājitaḥ) |
| **Kāśirāja** | King of Kāśī (Varanasi), "supreme archer" | 1.5, 1.17 | Archer-king (paramaṣvāsaḥ) |
| **Śikhaṇḍin** | Great chariot-warrior | 1.17 | Warrior with unique story (future expansion?) |
| **Dhṛṣṭaketu** | Allied king | 1.5 | Chariot-warrior |
| **Cekitāna** | Allied warrior | 1.5 | Chariot-warrior |
| **Purujit** | Allied king | 1.5 | "Bull among men" |
| **Kuntibhoja** | Allied king | 1.5 | "Bull among men" |
| **Śaibya** | Allied king | 1.5 | "Bull among men" |
| **Yudhāmanyu** | Brave warrior | 1.6 | Chariot-warrior |
| **Uttamaujā** | Valiant warrior | 1.6 | Chariot-warrior |
| **Abhimanyu** | Son of Arjuna and Subhadrā | 1.6, 1.18 | Young warrior, "mighty-armed" |
| **Sons of Draupadī** | Five sons, one by each Pāṇḍava | 1.6, 1.18 | Group of young warriors |

### Named Conches (Key Interactive Feature)

| Conch | Bearer | Verse | Side |
|-------|--------|-------|------|
| *(unnamed — lion's roar)* | Bhīṣma | 1.12 | Kaurava |
| **Pāñcajanya** | Kṛṣṇa | 1.15 | Center |
| **Devadatta** | Arjuna | 1.15 | Center |
| **Pauṇḍra** | Bhīma | 1.15 | Pāṇḍava |
| **Anantavijaya** | Yudhiṣṭhira | 1.16 | Pāṇḍava |
| **Sughoṣa** | Nakula | 1.16 | Pāṇḍava |
| **Maṇipuṣpaka** | Sahadeva | 1.16 | Pāṇḍava |

---

## 4. Technical Architecture

### Stack

- **Framework**: React (single-page app)
- **3D Engine**: Three.js (via `@react-three/fiber` and `@react-three/drei`)
- **Styling**: Tailwind CSS for UI overlays
- **Deployment**: Firebase Hosting (bradbannon.com)
- **Build**: Vite

### Scene Structure

```
Scene
├── Environment
│   ├── Ground plane (dusty Kurukṣetra earth)
│   ├── Skybox (golden dawn / foreboding horizon)
│   ├── Atmospheric haze / dust particles
│   └── Distant terrain (low hills, horizon)
├── Center Group
│   ├── Chariot (detailed model)
│   │   ├── Chariot body (ornate, with wheels)
│   │   ├── Five horses (white, stylized)
│   │   ├── Hanumān banner (kapidhvaja)
│   │   ├── Kṛṣṇa figure (charioteer position)
│   │   └── Arjuna figure (warrior position, with Gāṇḍīva)
│   └── Ground detail (wheel tracks, dust)
├── Kaurava Army (one hemisphere)
│   ├── Named warriors (interactive, elevated on chariots/elephants)
│   │   ├── Bhīṣma (foremost, commander position)
│   │   ├── Droṇa (with Duryodhana nearby)
│   │   ├── Karṇa
│   │   ├── Kṛpa
│   │   ├── Aśvatthāmā
│   │   ├── Vikarṇa
│   │   └── Bhūriśravas
│   └── Generic soldiers (instanced geometry — hundreds/thousands implied)
├── Pāṇḍava Army (opposite hemisphere)
│   ├── Named warriors (interactive)
│   │   ├── Dhṛṣṭadyumna (field marshal, prominent)
│   │   ├── Bhīma
│   │   ├── Yudhiṣṭhira
│   │   ├── Nakula
│   │   ├── Sahadeva
│   │   ├── Drupada
│   │   ├── Virāṭa
│   │   ├── Sātyaki
│   │   ├── Kāśirāja
│   │   ├── Śikhaṇḍin
│   │   ├── Abhimanyu
│   │   ├── Dhṛṣṭaketu
│   │   ├── Cekitāna
│   │   ├── Purujit, Kuntibhoja, Śaibya (can be grouped)
│   │   ├── Yudhāmanyu, Uttamaujā (can be grouped)
│   │   └── Sons of Draupadī (group)
│   └── Generic soldiers (instanced geometry)
└── UI Overlay
    ├── Verse panel (shows on hover/click)
    ├── Character name label (floating above figures)
    ├── Conch name labels (during conch sequence)
    ├── Navigation hints
    └── Chapter/verse reference footer
```

### Camera

- **OrbitControls** centered on the chariot group
- Constrained: allow full 360° horizontal rotation (azimuth), limited vertical (don't let them look underground)
- Zoom: allow zoom in/out within reasonable bounds
- Optional: smooth auto-rotation on idle
- Mobile: touch-drag to rotate, pinch to zoom

### Interaction Model

1. **Hover** over a named warrior figure → name label appears above them, brief descriptor
2. **Click** on a named warrior → verse panel slides in from the side (or bottom on mobile) showing:
   - Character name (Devanāgarī + IAST transliteration + English)
   - Verse number(s)
   - Sanskrit text (Devanāgarī)
   - English translation
   - Brief contextual note (1–2 sentences: who this person is, which side, their role)
3. **Click** on the chariot → special expanded panel with Kaṭha Upaniṣad cross-reference
4. **Click** on a conch → conch name + verse, with a note on the conch's significance

### Visual Style for Warrior Figures

Since generating detailed 3D character models is expensive, use a **stylized geometric approach**:

- **Option A (Recommended)**: Tall, abstract geometric figures — elongated octahedra or tapered cylinders for bodies, spheres for heads, color-coded by side (warm golds/reds for Kauravas, cool blues/whites for Pāṇḍavas). Named warriors are taller and have distinguishing geometry (Bhīṣma gets a crown-like form, Bhīma is widest, etc.). Simple but evocative.
- **Option B**: Sprite-based — 2D illustrated cards/banners placed in 3D space. Each warrior is a flat illustrated panel with their image facing the camera (billboard technique).
- **Option C**: Silhouette-based — dark silhouette figures with glowing edges, names floating above. Moody and atmospheric.

Whatever the approach: **named warriors must be visually distinct from the generic army masses**, and the two armies must be visually distinguishable from each other by color palette.

### Chariot Detail

The chariot is the most detailed object in the scene:
- Body: ornate, with large spoked wheels
- Five white horses in a V formation, harnessed
- Kṛṣṇa: standing at front, holding reins
- Arjuna: standing behind, Gāṇḍīva bow visible
- Hanumān banner: a tall pole with an ape emblem, streaming in the wind
- The chariot should glow subtly or have a slight divine aura — it is "great" (mahati syandane) and yoked to white horses, marking it as extraordinary

---

## 5. Verse Translations for the UI

Use your best available public-domain or original translations. For academic integrity, the following approach is recommended:

- **Primary**: Use a translation that is in the public domain (e.g., based on the Ganguli, Telang, or Besant/Das translations, all pre-1928 and PD)
- **Reworked**: Lightly modernize archaic phrasing for undergraduate readability while preserving accuracy
- **Attribution**: Include a note: "English translations adapted from public domain sources. Sanskrit text per standard critical edition."

For each character hotspot, the verse panel should show:
1. Verse number (e.g., "BG 1.15")
2. Sanskrit in Devanāgarī (the full śloka or half-śloka relevant to that character)
3. IAST transliteration
4. English translation
5. A one-line gloss (e.g., "Pāñcajanya is the conch made from the bone of the demon Pañcajana, slain by Kṛṣṇa.")

### Sample Verse Entry (for data model)

```json
{
  "id": "krsna-conch",
  "character": "Kṛṣṇa",
  "verse": "1.15a",
  "devanagari": "पाञ्चजन्यं हृषीकेशो देवदत्तं धनञ्जयः",
  "iast": "pāñcajanyaṃ hṛṣīkeśo devadattaṃ dhanañjayaḥ",
  "translation": "Hṛṣīkeśa (Kṛṣṇa) blew Pāñcajanya, and Dhanañjaya (Arjuna) blew Devadatta.",
  "gloss": "Pāñcajanya is the conch born from the demon Pañcajana. Hṛṣīkeśa ('lord of the senses') and Dhanañjaya ('winner of wealth') are epithets of Kṛṣṇa and Arjuna respectively."
}
```

---

## 6. Data Architecture

### `/src/data/characters.js`

Export an array of character objects:
```js
{
  id: string,           // unique key, e.g., "bhisma"
  name: string,         // display name in IAST: "Bhīṣma"
  nameDevanagari: string, // "भीष्म"
  side: "kaurava" | "pandava" | "center",
  role: string,         // e.g., "Supreme Commander"
  position: { x, y, z }, // 3D coordinates in scene
  verses: [VerseRef],   // array of verse references
  conch: string | null, // conch name if applicable
  visualType: string,   // "commander" | "warrior" | "king" | "prince" | "group"
  description: string   // 1-2 sentence context
}
```

### `/src/data/verses.js`

Export an array of verse objects (all 47 verses of Chapter 1):
```js
{
  chapter: 1,
  verse: string,       // "1.15" or "1.15a" for half-verses
  devanagari: string,
  iast: string,
  translation: string,
  gloss: string | null,
  spatialNote: string | null  // what this verse tells us about positions
}
```

---

## 7. Spatial Layout Coordinates

Conceptual layout (top-down view, Y is up):

```
                    NORTH (Kaurava side)
                         ___
                        /   \
          Bhīṣma ●    | Droṇa ● Duryodhana ●
                       |
      Karṇa ●    Kṛpa ●    Aśvatthāmā ●
                       |
    [=== generic Kaurava soldiers ===]
                       |
  ─────────────── BATTLEFIELD LINE ───────────────
                       |
              ┌────────┼────────┐
              │   🐴🐴🐴🐴🐴   │
              │   ┌─────────┐   │
              │   │ CHARIOT │   │  ← Kṛṣṇa (front) + Arjuna (rear)
              │   └─────────┘   │     Hanumān banner ↑
              └────────┼────────┘
                       |
  ─────────────── BATTLEFIELD LINE ───────────────
                       |
    [=== generic Pāṇḍava soldiers ===]
                       |
      Dhṛṣṭadyumna ●    Bhīma ●    Yudhiṣṭhira ●
                       |
        Nakula ●  Sahadeva ●   Drupada ●
                       |
  Sātyaki ● Virāṭa ● Kāśirāja ● Abhimanyu ●
                       |
                    SOUTH (Pāṇḍava side)
```

The user's camera orbits around the chariot at center. Looking "north" they see the Kaurava army; looking "south" they see the Pāṇḍava army. Named warriors are arranged in loose arcs on their respective sides.

---

## 8. Phased Build Plan

### Phase 1: Core Scene (MVP)
- Three.js scene with ground plane, sky, atmospheric haze
- Central chariot with 5 horses (geometric/stylized)
- Kṛṣṇa and Arjuna figures on chariot
- Hanumān banner
- OrbitControls (360° rotation, zoom)
- 3–5 key warriors per side as tall geometric markers with floating name labels
- Click → verse panel with Sanskrit + translation
- Mobile-responsive

### Phase 2: Full Roster + Polish
- All named warriors from verses 1.3–1.8, 1.15–1.18
- Conch-name labels
- Generic army masses (instanced geometry or particle field)
- Atmospheric particles (dust, light rays)
- Smooth transitions and animations
- Color-coding by side

### Phase 3: Narrative Flow (Future Expansion)
- Guided "walkthrough" mode that takes you through Ch. 1 verse by verse
- Conch-blowing sequence as an animated event (Bhīṣma first, then the Pāṇḍava response)
- Arjuna's despair: visual shift (lighting darkens, Arjuna's posture changes, bow drops)
- Audio (ambient battlefield sounds, conch tones)
- Chapter 11 Viśvarūpa expansion (Brad's "future expansion" note)

### Phase 4: Pedagogical Features
- Toggle between Sanskrit / IAST / English
- Quiz mode ("Who blew the conch called Pauṇḍra?")
- Side-panel glossary of Sanskrit terms
- Kaṭha Upaniṣad intertext panel on the chariot
- Links to Brad's course materials on bradbannon.com

---

## 9. Deployment Notes

- **Hosting**: Firebase Hosting (Brad already uses this for bradbannon.com)
- **Build**: Vite → `npm run build` → `firebase deploy`
- **Route**: Deploy as a subpage, e.g., `bradbannon.com/kuruksetra/` or `bradbannon.com/theo1432/kuruksetra/`
- **Assets**: All 3D assets should be lightweight (geometric, no heavy textures). Target < 5MB total load.
- **Performance**: Use instanced meshes for generic soldiers. Lazy-load verse data. Target 60fps on mid-range laptops and smooth performance on mobile.
- **Accessibility**: Verse panel text should be readable, high-contrast. Provide a non-3D fallback or list view for screen readers.
- **Font**: Use a font that supports Devanāgarī and IAST diacriticals. Google Fonts: "Noto Sans Devanagari" for Devanāgarī, "EB Garamond" or similar serif for IAST/English to match the scholarly-but-approachable tone.

---

## 10. Academic Integrity Notes

- Every visual element must be traceable to a specific verse in BG Chapter 1
- Characters should not be given attributes from later chapters or from the broader Mahābhārata unless explicitly noted as "traditional" or "interpretive"
- The Kaṭha Upaniṣad reference (5 horses = 5 senses) should be clearly labeled as an intertextual connection, not a claim about what BG 1 literally says
- Where the text is ambiguous (e.g., exact number of horses, exact spatial arrangement), note this in the verse panel
- All Sanskrit should use standard IAST transliteration with proper diacriticals

---

## Appendix: Key Sanskrit Terms for the UI

| Term | Meaning | Context |
|------|---------|---------|
| dharmakṣetra | field of dharma | 1.1, the battlefield's sacred name |
| kurukṣetra | field of the Kurus | 1.1, the physical location |
| vyūha | battle formation / array | 1.2, how armies are arranged |
| mahāratha | great chariot-warrior | 1.4, 1.6, honorific for elite warriors |
| kapidhvaja | ape-bannered | 1.20, Arjuna's chariot emblem (Hanumān) |
| śaṅkha | conch | 1.12ff, the conch-blowing sequence |
| Gāṇḍīva | Arjuna's bow | 1.30, slips from his hand in despair |
| senayor ubhayor madhye | between both armies | 1.21, the chariot's position |
| viṣāda | despair / dejection | 1.47 colophon, "Arjunaviṣādayogaḥ" (the yoga of Arjuna's despair) |

---

*Document prepared for handoff to Claude Code. Build something worthy of the field of dharma.*
