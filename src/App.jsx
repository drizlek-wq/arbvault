import React, { useState, useMemo, useEffect } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

// Deep links — real URLs when API is live; homepages as placeholders for mock mode
const BOOK_URLS = {
  "DraftKings":        "https://sportsbook.draftkings.com",
  "FanDuel":           "https://sportsbook.fanduel.com",
  "BetMGM":            "https://sports.betmgm.com",
  "Caesars":           "https://www.caesars.com/sportsbook-and-casino",
  "Fanatics":          "https://sportsbook.fanatics.com",
  "ESPN Bet":          "https://espnbet.com",
  "BetRivers":         "https://www.betrivers.com",
  "BetOnline.ag":      "https://www.betonline.ag/sportsbook",
  "Bovada":            "https://www.bovada.lv/sports",
  "MyBookie.ag":       "https://mybookie.ag/sportsbook",
  "LowVig.ag":         "https://www.lowvig.ag",
  "BetUS":             "https://www.betus.com.pa/sportsbook",
  "Hard Rock Bet":     "https://app.hardrock.bet",
  "Bally Bet":         "https://play.ballybet.com",
  "betPARX":           "https://betparx.com",
  "BetAnything":       "https://betanything.eu",
  "Fliff":             "https://www.getfliff.com",
  "ReBet":             "https://rebet.app",
  "Kalshi":            "https://kalshi.com/markets",
  "Novig":             "https://novig.com/events",
  "ProphetX":          "https://www.prophetx.co",
  "Polymarket":        "https://polymarket.com",
  "BetOpenly":         "https://app.betopenly.com",
  "PrizePicks":        "https://app.prizepicks.com",
  "Underdog Fantasy":  "https://underdogfantasy.com",
  "DraftKings Pick6":  "https://pick6.draftkings.com",
  "Betr Picks":        "https://www.betr.app/picks",
  "William Hill":      "https://www.williamhill.com",
  "Betfair Exchange":  "https://www.betfair.com/exchange/plus",
  "Betfair Sportsbook":"https://www.betfair.com",
  "Paddy Power":       "https://www.paddypower.com/sport",
  "Ladbrokes":         "https://www.ladbrokes.com/sport",
  "Sky Bet":           "https://m.skybet.com",
  "Coral":             "https://sports.coral.co.uk",
  "Bet Victor":        "https://www.betvictor.com/en-gb/sport",
  "Betway":            "https://betway.com/en/sports",
  "Betfred":           "https://www.betfred.com/sports",
  "888sport":          "https://www.888sport.com",
  "Matchbook":         "https://www.matchbook.com/betting",
  "Smarkets":          "https://smarkets.com/sport",
  "BoyleSports":       "https://boylesports.com/sports",
  "LeoVegas":          "https://www.leovegas.com/en-gb",
  "Casumo":            "https://casumo.com/en/sports",
  "Grosvenor":         "https://www.grosvenorcasinos.com/sport",
  "LiveScore Bet":     "https://www.livescorebet.com/sports",
  "Virgin Bet":        "https://www.virginbet.com/sports",
  "Unibet":            "https://www.unibet.co.uk/betting",
  "Pinnacle":          "https://www.pinnacle.com/en/sport",
  "1xBet":             "https://1xbet.com/en/sport",
  "Betsson":           "https://www.betsson.com/en/sport",
  "Marathon Bet":      "https://www.marathonbet.co.uk/en",
  "Coolbet":           "https://www.coolbet.com/en/sports",
  "NordicBet":         "https://www.nordicbet.com/en/sport",
  "Everygame":         "https://www.everygame.eu/sport",
  "GTbets":            "https://www.gtbets.ag/sports",
  "Betclic":           "https://www.betclic.com/en/sport",
  "Matchbook EU":      "https://www.matchbook.com/betting",
  "Sportsbet":         "https://www.sportsbet.com.au/betting",
  "TAB":               "https://www.tab.com.au/sports",
  "Neds":              "https://www.neds.com.au/sport",
  "Ladbrokes AU":      "https://www.ladbrokes.com.au/sport",
  "Betfair AU":        "https://www.betfair.com.au/exchange/plus",
  "Unibet AU":         "https://www.unibet.com.au/betting",
  "PointsBet AU":      "https://pointsbet.com.au/sports",
};


const BOOK_GROUPS = [
  {
    label: "🇺🇸 US — Major",
    tag: "us",
    books: [
      "DraftKings","FanDuel","BetMGM","Caesars","Fanatics",
      "ESPN Bet","BetRivers","BetOnline.ag","Bovada",
      "MyBookie.ag","LowVig.ag","BetUS",
    ]
  },
  {
    label: "🇺🇸 US — Regional",
    tag: "us2",
    books: [
      "Hard Rock Bet","Bally Bet","betPARX","BetAnything",
      "Fliff","ReBet",
    ]
  },
  {
    label: "⚡ US Exchanges",
    tag: "exchange",
    books: ["Kalshi","Novig","ProphetX","Polymarket","BetOpenly"]
  },
  {
    label: "🎯 DFS / Props",
    tag: "dfs",
    books: ["PrizePicks","Underdog Fantasy","DraftKings Pick6","Betr Picks"]
  },
  {
    label: "🇬🇧 UK",
    tag: "uk",
    books: [
      "William Hill","Betfair Exchange","Betfair Sportsbook","Paddy Power",
      "Ladbrokes","Sky Bet","Coral","Bet Victor","Betway","Betfred",
      "888sport","Matchbook","Smarkets","BoyleSports","LeoVegas",
      "Casumo","Grosvenor","LiveScore Bet","Virgin Bet","Unibet"
    ]
  },
  {
    label: "🌍 EU / Sharp",
    tag: "eu",
    books: [
      "Pinnacle","1xBet","Betsson","Marathon Bet","Coolbet",
      "NordicBet","Everygame","GTbets","Betclic","Matchbook EU",
    ]
  },
  {
    label: "🇦🇺 Australia",
    tag: "au",
    books: ["Sportsbet","TAB","Neds","Ladbrokes AU","Betfair AU","Unibet AU","PointsBet AU"]
  },
];

const ALL_BOOKS = BOOK_GROUPS.flatMap(g => g.books);

// Which books are exchanges (can't limit winners)
const EXCHANGE_BOOKS = new Set(["Kalshi","Novig","ProphetX","Polymarket","BetOpenly","Betfair Exchange","Matchbook","Smarkets","Matchbook EU","Betfair AU"]);
// Which books are considered sharp (use for devigging)
const SHARP_BOOKS = new Set(["Pinnacle","Circa","LowVig.ag","Novig","Matchbook","Matchbook EU"]);

const SPORTS = ["All Sports","NFL","NBA","MLB","NHL","Soccer","Tennis","MMA","College Football","College Basketball"];
const BET_TYPES = ["All Types","Moneyline","Spread","Total (O/U)","Player Prop","Alt Spread","Alt Total","Team Total","1st Half","Puck Line"];

// ─── Utils ────────────────────────────────────────────────────────────────────
const fmtOdds = (o) => o > 0 ? `+${o}` : `${o}`;
const toDecimal = (o) => o > 0 ? o / 100 + 1 : 100 / Math.abs(o) + 1;
const impliedProb = (o) => 1 / toDecimal(o);

function calcArb(o1, o2) {
  const ip1 = impliedProb(o1), ip2 = impliedProb(o2);
  const total = ip1 + ip2;
  const pct = (1 - total) * 100;
  return { isArb: total < 1, pct, total };
}

function calcStakes(o1, o2, bankroll) {
  // Equal-payout arb formula — stakes rounded to whole dollars
  const d1 = toDecimal(o1), d2 = toDecimal(o2);
  const targetPayout = bankroll / (1 / d1 + 1 / d2);
  const s1raw = targetPayout / d1;
  const s2raw = targetPayout / d2;
  // Round to whole dollars
  const s1 = Math.round(s1raw);
  const s2 = Math.round(s2raw);
  const totalStaked = s1 + s2;
  const payout1 = s1 * d1;
  const payout2 = s2 * d2;
  // Profit = min payout (conservative — accounts for rounding)
  const profit = Math.min(payout1, payout2) - totalStaked;
  return { s1, s2, profit, targetPayout, payout1, payout2, totalStaked };
}

// One-leg-fixed calculator — also rounds to whole dollars
function calcFromFixedLeg(fixedOdds, otherOdds, fixedStake) {
  const dFixed = toDecimal(fixedOdds);
  const dOther = toDecimal(otherOdds);
  const payout = fixedStake * dFixed;
  const otherStake = Math.round(payout / dOther); // round to whole dollar
  const totalStaked = fixedStake + otherStake;
  const profit = Math.min(payout, otherStake * dOther) - totalStaked;
  return { otherStake, payout: Math.min(payout, otherStake * dOther), profit, totalStaked };
}

// ─── API Config ──────────────────────────────────────────────────────────────
// API key is entered by the user in the setup screen — never hardcoded here
let API_KEY = "";

// Map our sport labels to The Odds API sport keys
const SPORT_API_KEYS = {
  "NFL":                "americanfootball_nfl",
  "NBA":                "basketball_nba",
  "MLB":                "baseball_mlb",
  "NHL":                "icehockey_nhl",
  "Soccer":             "soccer_epl",
  "Tennis":             "tennis_atp_french_open",
  "MMA":                "mma_mixed_martial_arts",
  "College Football":   "americanfootball_ncaaf",
  "College Basketball": "basketball_ncaab",
};

// Map The Odds API bookmaker keys to our display names
const BOOK_KEY_MAP = {
  "draftkings":       "DraftKings",
  "fanduel":          "FanDuel",
  "betmgm":           "BetMGM",
  "caesars":          "Caesars",
  "williamhill_us":   "Caesars",
  "espnbet":          "ESPN Bet",
  "betrivers":        "BetRivers",
  "betonlineag":      "BetOnline.ag",
  "bovada":           "Bovada",
  "mybookieag":       "MyBookie.ag",
  "lowvig":           "LowVig.ag",
  "betus":            "BetUS",
  "hardrockbet":      "Hard Rock Bet",
  "ballybet":         "Bally Bet",
  "betparx":          "betPARX",
  "fanatics":         "Fanatics",
  "fliff":            "Fliff",
  "pinnacle":         "Pinnacle",
  "betfair_ex_us":    "Betfair Exchange",
  "novig":            "Novig",
  "prophetx":         "ProphetX",
  "kalshi":           "Kalshi",
};

// Convert decimal odds back to American
function decimalToAmerican(d) {
  if (d >= 2) return Math.round((d - 1) * 100);
  return Math.round(-100 / (d - 1));
}

// Parse raw Odds API event into arb opportunities
function parseEventArbs(event, sport, marketType) {
  const arbs = [];
  const bookmakers = event.bookmakers || [];
  const gameTime = new Date(event.commence_time).toLocaleString("en-US", {
    month:"numeric", day:"numeric", hour:"numeric", minute:"2-digit", timeZoneName:"short"
  });
  const gameName = `${event.home_team} vs ${event.away_team}`;

  bookmakers.forEach((bm1, i) => {
    bookmakers.slice(i + 1).forEach(bm2 => {
      const book1Name = BOOK_KEY_MAP[bm1.key] || bm1.title;
      const book2Name = BOOK_KEY_MAP[bm2.key] || bm2.title;

      bm1.markets?.forEach(mkt1 => {
        if (mkt1.key !== marketType) return;
        const mkt2 = bm2.markets?.find(m => m.key === marketType);
        if (!mkt2) return;

        // For h2h (moneyline): compare each outcome across books
        if (marketType === "h2h") {
          mkt1.outcomes.forEach(out1 => {
            const oppositeOut2 = mkt2.outcomes.find(o => o.name !== out1.name);
            if (!oppositeOut2) return;
            const o1 = decimalToAmerican(out1.price);
            const o2 = decimalToAmerican(oppositeOut2.price);
            const arb = calcArb(o1, o2);
            if (arb.isArb) {
              arbs.push({
                id: `${event.id}-${bm1.key}-${bm2.key}-${out1.name}`,
                sport, game: gameName, market: "Moneyline",
                pick1: out1.name, pick2: oppositeOut2.name,
                book1: book1Name, book2: book2Name,
                odds1: o1, odds2: o2,
                arbPct: arb.pct, isArb: true,
                time: gameTime,
                commence_time: event.commence_time,
                expiresIn: Math.floor(Math.random() * 120) + 20,
              });
            }
          });
        }

        // For spreads/totals: match same point/total across books, compare prices
        if (marketType === "spreads" || marketType === "totals") {
          mkt1.outcomes.forEach(out1 => {
            const match2 = mkt2.outcomes.find(o =>
              o.name === out1.name && Math.abs((o.point||0) - (out1.point||0)) < 0.01
            );
            if (!match2) return;
            // Find the other side on each book
            const other1 = mkt1.outcomes.find(o => o.name !== out1.name && Math.abs((o.point||0) + (out1.point||0)) < 0.1);
            const other2 = mkt2.outcomes.find(o => o.name !== match2.name && Math.abs((o.point||0) + (match2.point||0)) < 0.1);
            if (!other1 || !other2) return;
            // Arb: bet out1 at bm1, other2 at bm2
            const o1 = decimalToAmerican(out1.price);
            const o2 = decimalToAmerican(other2.price);
            const arb = calcArb(o1, o2);
            if (arb.isArb) {
              const label = marketType === "totals" ? "Total (O/U)" : "Spread";
              const pt = out1.point != null ? ` ${out1.point > 0 ? "+" : ""}${out1.point}` : "";
              const pt2 = other2.point != null ? ` ${other2.point > 0 ? "+" : ""}${other2.point}` : "";
              arbs.push({
                id: `${event.id}-${bm1.key}-${bm2.key}-${out1.name}-${out1.point}`,
                sport, game: gameName, market: label,
                pick1: `${out1.name}${pt}`, pick2: `${other2.name}${pt2}`,
                book1: book1Name, book2: book2Name,
                odds1: o1, odds2: o2,
                arbPct: arb.pct, isArb: true,
                time: gameTime,
                commence_time: event.commence_time,
                expiresIn: Math.floor(Math.random() * 120) + 20,
              });
            }
          });
        }
      });
    });
  });

  return arbs;
}

// ─── Mock fallback (used when API is blocked in sandbox) ─────────────────────
function genMockArbs() {
  const raw = [
    { sport:"NFL",  game:"Ravens vs Steelers",    market:"Moneyline",   pick1:"Ravens ML",      pick2:"Steelers ML",    book1:"DraftKings", book2:"FanDuel",    odds1:-138, odds2:+155, commence_time:"2026-06-04T02:16:24Z" },
    { sport:"NFL",  game:"Chiefs vs Bills",        market:"Spread",      pick1:"Chiefs -2.5",    pick2:"Bills +2.5",     book1:"BetMGM",     book2:"Caesars",    odds1:-108, odds2:+115, commence_time:"2026-06-04T02:16:24Z" },
    { sport:"NBA",  game:"Lakers vs Celtics",      market:"Total (O/U)", pick1:"Over 224.5",     pick2:"Under 224.5",    book1:"DraftKings", book2:"ESPN Bet",   odds1:-108, odds2:+112, commence_time:"2026-06-04T02:16:24Z" },
    { sport:"NBA",  game:"Warriors vs Nuggets",    market:"Moneyline",   pick1:"Warriors ML",    pick2:"Nuggets ML",     book1:"FanDuel",    book2:"Betway",     odds1:+105, odds2:-105, commence_time:"2026-06-04T02:16:24Z" },
    { sport:"MLB",  game:"Dodgers vs Padres",      market:"Moneyline",   pick1:"Dodgers ML",     pick2:"Padres ML",      book1:"DraftKings", book2:"BetMGM",     odds1:-162, odds2:+175, commence_time:"2026-06-04T02:16:24Z" },
    { sport:"NHL",  game:"Bruins vs Rangers",      market:"Puck Line",   pick1:"Bruins -1.5",    pick2:"Rangers +1.5",   book1:"Kalshi",     book2:"FanDuel",    odds1:+190, odds2:-175, commence_time:"2026-06-04T02:16:24Z" },
    { sport:"Soccer",game:"Liverpool vs Chelsea",  market:"Moneyline",   pick1:"Liverpool ML",   pick2:"Chelsea ML",     book1:"Caesars",    book2:"Betway",     odds1:-112, odds2:+122, commence_time:"2026-06-04T02:16:24Z" },
    { sport:"NFL",  game:"49ers vs Cowboys",       market:"Spread",      pick1:"49ers -3",       pick2:"Cowboys +3",     book1:"Hard Rock Bet",book2:"Fanatics", odds1:-106, odds2:+113, commence_time:"2026-06-05T02:16:24Z" },
    { sport:"NBA",  game:"Heat vs Knicks",         market:"Moneyline",   pick1:"Heat ML",        pick2:"Knicks ML",      book1:"Caesars",    book2:"Hard Rock Bet",odds1:+148,odds2:-140, commence_time:"2026-06-05T02:16:24Z" },
    { sport:"MLB",  game:"Yankees vs Red Sox",     market:"Total (O/U)", pick1:"Over 8.5",       pick2:"Under 8.5",      book1:"BetMGM",     book2:"Fanatics",   odds1:-110, odds2:+118, commence_time:"2026-06-05T02:16:24Z" },
    { sport:"NHL",  game:"Maple Leafs vs Senators",market:"Moneyline",   pick1:"Leafs ML",       pick2:"Senators ML",    book1:"DraftKings", book2:"Novig",      odds1:-145, odds2:+162, commence_time:"2026-06-05T02:16:24Z" },
    { sport:"Soccer",game:"Man City vs Arsenal",   market:"Moneyline",   pick1:"Man City ML",    pick2:"Arsenal ML",     book1:"BetMGM",     book2:"Hard Rock Bet",odds1:-120,odds2:+132, commence_time:"2026-06-05T02:16:24Z" },
    { sport:"NFL",  game:"Packers vs Bears",       market:"Moneyline",   pick1:"Packers ML",     pick2:"Bears ML",       book1:"Pinnacle",   book2:"BetMGM",     odds1:-148, odds2:+165, commence_time:"2026-06-06T02:16:24Z" },
    { sport:"NBA",  game:"Clippers vs Suns",       market:"Spread",      pick1:"Clippers -1",    pick2:"Suns +1",        book1:"BetOnline.ag",book2:"FanDuel",   odds1:-108, odds2:+116, commence_time:"2026-06-06T02:16:24Z" },
    { sport:"Tennis",game:"Alcaraz vs Sinner",     market:"Moneyline",   pick1:"Alcaraz ML",     pick2:"Sinner ML",      book1:"DraftKings", book2:"FanDuel",    odds1:-130, odds2:+145, commence_time:"2026-06-06T02:16:24Z" },
    { sport:"MMA",  game:"Jones vs Aspinall",      market:"Moneyline",   pick1:"Jones ML",       pick2:"Aspinall ML",    book1:"BetMGM",     book2:"ESPN Bet",   odds1:-155, odds2:+172, commence_time:"2026-06-07T02:16:24Z" },
    { sport:"College Football",game:"Ohio St vs Michigan",market:"Spread",pick1:"Ohio St -7",   pick2:"Michigan +7",    book1:"Pinnacle",   book2:"ESPN Bet",   odds1:-104, odds2:+112, commence_time:"2026-06-07T02:16:24Z" },
    { sport:"Soccer",game:"Bayern vs Dortmund",    market:"Total (O/U)", pick1:"Over 2.5",       pick2:"Under 2.5",      book1:"Novig",      book2:"Caesars",    odds1:-108, odds2:+116, commence_time:"2026-06-09T02:16:24Z" },
    { sport:"NHL",  game:"Oilers vs Canucks",      market:"Puck Line",   pick1:"Oilers -1.5",    pick2:"Canucks +1.5",   book1:"LowVig.ag",  book2:"Caesars",    odds1:+170, odds2:-158, commence_time:"2026-06-09T02:16:24Z" },
    { sport:"MLB",  game:"Cubs vs Cardinals",      market:"Moneyline",   pick1:"Cubs ML",        pick2:"Cardinals ML",   book1:"Betway",     book2:"BetMGM",     odds1:-125, odds2:+140, commence_time:"2026-06-09T02:16:24Z" },
  ];
  return raw.map((r,i) => {
    const arb = calcArb(r.odds1, r.odds2);
    const ct = new Date(r.commence_time);
    const timeStr = ct.toLocaleString("en-US",{month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",timeZoneName:"short"});
    return { ...r, id:i+1, arbPct:arb.pct, isArb:arb.isArb, time:timeStr, expiresIn:Math.floor(Math.random()*180)+10 };
  }).filter(r => r.isArb).sort((a,b) => b.arbPct - a.arbPct);
}

// ─── Credit-optimized API config ─────────────────────────────────────────────
// COST FORMULA: credits per call = num_markets × num_regions
// MINIMUM COST:  1 market (h2h) × 1 region (us) = 1 credit per sport
// We fetch sports one at a time so user can cancel early and save credits

// Only sports currently in season — edit this list to control credit spend
const ACTIVE_SPORTS = {
  "MLB":   "baseball_mlb",
  "NBA":   "basketball_nba",
  "NHL":   "icehockey_nhl",
  "NFL":   "americanfootball_nfl",
  "Soccer":"soccer_epl",
};

// Credit cost lookup — used to show user before they refresh
const CREDIT_COST = {
  "h2h":              { us: 1, us_ex: 1, us_and_ex: 2 },
  "h2h,spreads":      { us: 2, us_ex: 2, us_and_ex: 4 },
  "h2h,spreads,totals":{ us: 3, us_ex: 3, us_and_ex: 6 },
};

function estimateCost(markets, includeExchange) {
  const mktKey = markets;
  const regionKey = includeExchange ? "us_and_ex" : "us";
  const perSport = (CREDIT_COST[mktKey] || CREDIT_COST["h2h"])[regionKey] || 1;
  return perSport * Object.keys(ACTIVE_SPORTS).length;
}

async function fetchLiveArbs(selectedBooks, markets = "h2h", includeExchange = false) {
  const allArbs = [];
  const remainingRef = { value: null };

  // Only US region by default — adding us_ex costs double
  const regions = includeExchange ? "us,us_ex" : "us";

  // Build bookmaker filter from selected books
  const reverseMap = Object.fromEntries(
    Object.entries(BOOK_KEY_MAP).map(([k,v]) => [v,k])
  );
  const bookKeys = [...new Set(
    selectedBooks.map(b => reverseMap[b]).filter(Boolean)
  )].join(",");

  for (const [sportLabel, sportKey] of Object.entries(ACTIVE_SPORTS)) {
    try {
      const params = new URLSearchParams({
        apiKey: API_KEY,
        regions,
        markets,
        oddsFormat: "decimal",
        ...(bookKeys ? { bookmakers: bookKeys } : {}),
      });
      const url = `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?${params}`;
      const res = await fetch(url);

      // Always read credits even on error
      const rem = res.headers.get("x-requests-remaining");
      if (rem) remainingRef.value = parseInt(rem);

      if (!res.ok) {
        console.warn(`[${sportLabel}] API ${res.status}`);
        continue;
      }

      const events = await res.json();
      events.forEach(event => {
        markets.split(",").forEach(mktType => {
          allArbs.push(...parseEventArbs(event, sportLabel, mktType.trim()));
        });
      });
    } catch(e) {
      console.warn(`[${sportLabel}] fetch error:`, e.message);
    }
  }

  return {
    arbs: allArbs.sort((a,b) => b.arbPct - a.arbPct),
    creditsRemaining: remainingRef.value,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BookSelector({ selected, onChange }) {
  const allSelected = selected.length === ALL_BOOKS.length;
  const toggle = (b) => onChange(selected.includes(b) ? selected.filter(x => x !== b) : [...selected, b]);
  const toggleGroup = (books) => {
    const allOn = books.every(b => selected.includes(b));
    if (allOn) onChange(selected.filter(x => !books.includes(x)));
    else onChange([...new Set([...selected, ...books])]);
  };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <span style={{ fontSize:10, color:"#666", fontFamily:"monospace", letterSpacing:2 }}>BOOKS</span>
        <button onClick={() => onChange(allSelected ? [] : [...ALL_BOOKS])} style={{
          fontSize:9, color:"#f0c040", background:"transparent", border:"1px solid rgba(240,192,64,0.2)",
          borderRadius:4, padding:"2px 8px", cursor:"pointer", fontFamily:"monospace", letterSpacing:1
        }}>{allSelected ? "NONE" : "ALL"}</button>
      </div>

      {BOOK_GROUPS.map(group => {
        const allGroupOn = group.books.every(b => selected.includes(b));
        const someGroupOn = group.books.some(b => selected.includes(b));
        return (
          <div key={group.label} style={{ marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
              <span style={{ fontSize:9, color: group.tag === "exchange" ? "#64c8ff" : group.tag === "eu" ? "#b888ff" : "#555",
                fontFamily:"monospace", letterSpacing:1.5 }}>{group.label}</span>
              <button onClick={() => toggleGroup(group.books)} style={{
                fontSize:8, color: allGroupOn ? "#f0c040" : someGroupOn ? "#888" : "#444",
                background:"transparent", border:"none", cursor:"pointer", fontFamily:"monospace"
              }}>{allGroupOn ? "✓ ALL" : someGroupOn ? "SOME" : "ADD"}</button>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
              {group.books.map(b => {
                const on = selected.includes(b);
                const isExchange = EXCHANGE_BOOKS.has(b);
                const isSharp = SHARP_BOOKS.has(b);
                let accentColor = on ? (isExchange ? "#64c8ff" : isSharp ? "#b888ff" : "#f0c040") : "#333";
                let bgColor = on ? (isExchange ? "rgba(100,200,255,0.1)" : isSharp ? "rgba(184,136,255,0.1)" : "rgba(240,192,64,0.08)") : "rgba(255,255,255,0.02)";
                let borderColor = on ? (isExchange ? "rgba(100,200,255,0.35)" : isSharp ? "rgba(184,136,255,0.35)" : "rgba(240,192,64,0.3)") : "rgba(255,255,255,0.06)";
                return (
                  <button key={b} onClick={() => toggle(b)} style={{
                    padding:"3px 8px", borderRadius:4, fontSize:10, fontFamily:"monospace",
                    cursor:"pointer", transition:"all 0.12s", fontWeight: on ? 700 : 400,
                    background: bgColor, border:`1px solid ${borderColor}`, color: accentColor,
                    whiteSpace:"nowrap"
                  }}>
                    {b}
                    {isExchange && " ⚡"}
                    {isSharp && !isExchange && " 🔪"}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div style={{ marginTop:8, padding:"8px 10px", background:"rgba(255,255,255,0.02)", borderRadius:6, fontSize:9, color:"#333", fontFamily:"monospace", lineHeight:1.8 }}>
        ⚡ = exchange · no limits<br/>
        🔪 = sharp book · use for devigging<br/>
        <span style={{ color:"#444" }}>{selected.length} of {ALL_BOOKS.length} books active</span>
      </div>
    </div>
  );
}

function FilterBar({ sport, setSport, betType, setBetType, minPct, setMinPct, maxPct, setMaxPct, bankroll, setBankroll, sortBy, setSortBy, dateFilter, setDateFilter, customFrom, setCustomFrom, customTo, setCustomTo }) {
  const selectStyle = {
    background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)",
    borderRadius:8, color:"#ccc", padding:"8px 12px", fontSize:12,
    fontFamily:"monospace", outline:"none", cursor:"pointer",
    appearance:"none", minWidth:140
  };
  const inputStyle = { ...selectStyle, minWidth:90 };

  const today = new Date().toISOString().split("T")[0];

  const dateButtons = [
    { id:"all",    label:"All Games" },
    { id:"today",  label:"Today" },
    { id:"tomorrow", label:"Tomorrow" },
    { id:"week",   label:"Next 7 Days" },
    { id:"custom", label:"Custom Range" },
  ];

  return (
    <div style={{
      background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)",
      borderRadius:12, marginBottom:16, overflow:"hidden"
    }}>
      {/* Date filter row */}
      <div style={{ padding:"12px 20px", borderBottom:"1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
        <div style={{ fontSize:9, color:"#444", fontFamily:"monospace", letterSpacing:2, marginRight:4, whiteSpace:"nowrap" }}>GAME DATE</div>
        {dateButtons.map(btn => (
          <button key={btn.id} onClick={() => setDateFilter(btn.id)} style={{
            padding:"5px 14px", borderRadius:20, fontSize:11, fontFamily:"monospace",
            fontWeight: dateFilter===btn.id ? 700 : 400, cursor:"pointer",
            background: dateFilter===btn.id ? "rgba(240,192,64,0.15)" : "transparent",
            border:`1px solid ${dateFilter===btn.id ? "rgba(240,192,64,0.5)" : "rgba(255,255,255,0.08)"}`,
            color: dateFilter===btn.id ? "#f0c040" : "#444",
            transition:"all 0.15s"
          }}>{btn.label}</button>
        ))}
        {/* Custom date inputs */}
        {dateFilter === "custom" && (
          <div style={{ display:"flex", alignItems:"center", gap:6, marginLeft:4 }}>
            <input type="date" value={customFrom} onChange={e => setCustomFrom(e.target.value)}
              min={today}
              style={{ ...inputStyle, minWidth:130, color:"#ccc", colorScheme:"dark" }} />
            <span style={{ color:"#444", fontSize:11, fontFamily:"monospace" }}>to</span>
            <input type="date" value={customTo} onChange={e => setCustomTo(e.target.value)}
              min={customFrom || today}
              style={{ ...inputStyle, minWidth:130, color:"#ccc", colorScheme:"dark" }} />
          </div>
        )}
      </div>

      {/* Main filters row */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:10, alignItems:"flex-end", padding:"12px 20px" }}>
        <div>
          <div style={{ fontSize:9, color:"#444", fontFamily:"monospace", letterSpacing:2, marginBottom:5 }}>SPORT</div>
          <select value={sport} onChange={e => setSport(e.target.value)} style={selectStyle}>
            {SPORTS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <div style={{ fontSize:9, color:"#444", fontFamily:"monospace", letterSpacing:2, marginBottom:5 }}>BET TYPE</div>
          <select value={betType} onChange={e => setBetType(e.target.value)} style={selectStyle}>
            {BET_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <div style={{ fontSize:9, color:"#444", fontFamily:"monospace", letterSpacing:2, marginBottom:5 }}>MIN ARB %</div>
          <input type="number" value={minPct} onChange={e => setMinPct(e.target.value)} placeholder="0" min="0" max="20" step="0.5" style={inputStyle} />
        </div>
        <div>
          <div style={{ fontSize:9, color:"#444", fontFamily:"monospace", letterSpacing:2, marginBottom:5 }}>MAX ARB %</div>
          <input type="number" value={maxPct} onChange={e => setMaxPct(e.target.value)} placeholder="20" min="0" max="20" step="0.5" style={inputStyle} />
        </div>
        <div>
          <div style={{ fontSize:9, color:"#444", fontFamily:"monospace", letterSpacing:2, marginBottom:5 }}>BANKROLL ($)</div>
          <input type="number" value={bankroll} onChange={e => setBankroll(e.target.value)} placeholder="200" style={inputStyle} />
        </div>
        <div>
          <div style={{ fontSize:9, color:"#444", fontFamily:"monospace", letterSpacing:2, marginBottom:5 }}>SORT BY</div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={selectStyle}>
            <option value="pct">% Profit (High→Low)</option>
            <option value="profit">$ Profit (High→Low)</option>
            <option value="time">Game Time</option>
            <option value="expires">Expiring Soon</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function Countdown({ seconds }) {
  const [s, setS] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => setS(p => Math.max(0, p - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const urgent = s < 30;
  const m = Math.floor(s / 60), sec = s % 60;
  return (
    <span style={{ color: urgent ? "#ff6666" : s < 90 ? "#f0c040" : "#555", fontFamily:"monospace", fontSize:11, animation: urgent ? "pulse 1s infinite" : "none" }}>
      {s === 0 ? "EXPIRED" : `${m}:${sec.toString().padStart(2,"0")}`}
    </span>
  );
}

function ArbCardDetail({ arb, defaultS1, defaultS2, defaultProfit, onLog, isSelected, onSelect, leg1WagerTax, leg2WagerTax }) {
  // Three stake modes: "total" = split bankroll, "leg1" = fix leg 1, "leg2" = fix leg 2
  const [mode, setMode] = useState("total");
  const [customStake, setCustomStake] = useState("");

  const d1 = toDecimal(arb.odds1);
  const d2 = toDecimal(arb.odds2);

  // Derive all values from the mode + custom input
  const calc = useMemo(() => {
    const val = Math.round(parseFloat(customStake)); // always whole dollars
    if (mode === "total") {
      return { s1: defaultS1, s2: defaultS2, profit: defaultProfit,
               payout: Math.min(defaultS1 * d1, defaultS2 * d2),
               totalStaked: defaultS1 + defaultS2 };
    }
    if (!val || val <= 0) return null;
    if (mode === "leg1") {
      const { otherStake, payout, profit, totalStaked } = calcFromFixedLeg(arb.odds1, arb.odds2, val);
      return { s1: val, s2: otherStake, profit, payout, totalStaked };
    }
    if (mode === "leg2") {
      const { otherStake, payout, profit, totalStaked } = calcFromFixedLeg(arb.odds2, arb.odds1, val);
      return { s1: otherStake, s2: val, profit, payout, totalStaked };
    }
    return null;
  }, [mode, customStake, defaultS1, defaultS2, defaultProfit, d1, d2]);

  // Per-wager excise tax from book config (passed via props)
  const leg1Tax = parseFloat(leg1WagerTax) || 0;
  const leg2Tax = parseFloat(leg2WagerTax) || 0;
  const totalWagerTax = leg1Tax + leg2Tax;
  const netProfit = calc ? calc.profit - totalWagerTax : 0;
  const isValidCalc = calc && calc.profit > 0;

  const inputStyle = {
    background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.15)",
    borderRadius:7, color:"#fff", padding:"8px 12px", fontSize:15,
    fontFamily:"monospace", outline:"none", width:"100%", fontWeight:700,
  };

  const modeBtn = (m, label, col) => (
    <button onClick={() => { setMode(m); setCustomStake(""); }} style={{
      flex:1, padding:"7px 10px", borderRadius:7, border:`1px solid ${mode===m ? col : "rgba(255,255,255,0.08)"}`,
      background: mode===m ? `rgba(${col === "#f0c040" ? "240,192,64" : col === "#64c8ff" ? "100,200,255" : "125,255,136"},0.1)` : "transparent",
      color: mode===m ? col : "#444",
      fontWeight:700, fontSize:10, cursor:"pointer", fontFamily:"monospace",
      letterSpacing:0.5, transition:"all 0.15s"
    }}>{label}</button>
  );

  return (
    <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", padding:"16px 18px", background:"rgba(0,0,0,0.2)" }}>

      {/* Mode selector */}
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:9, color:"#444", fontFamily:"monospace", letterSpacing:2, marginBottom:8 }}>STAKE MODE</div>
        <div style={{ display:"flex", gap:6 }}>
          {modeBtn("total", "⚖ SPLIT BANKROLL", "#7dff88")}
          {modeBtn("leg1",  `📌 FIX LEG 1 (${arb.book1})`, "#f0c040")}
          {modeBtn("leg2",  `📌 FIX LEG 2 (${arb.book2})`, "#64c8ff")}
        </div>
      </div>

      {/* Custom stake input for leg modes */}
      {/* Window duration detail tip */}
      {(() => {
        const w = getWindowEstimate(arb);
        return (
          <div style={{
            display:"flex", alignItems:"flex-start", gap:10, marginBottom:14,
            padding:"10px 14px", borderRadius:8,
            background:`rgba(${w.color === "#7dff88" ? "125,255,136" : w.color === "#f0c040" ? "240,192,64" : w.color === "#ff8866" ? "255,136,102" : "255,102,102"},0.05)`,
            border:`1px solid ${w.color}22`
          }}>
            <div style={{ fontSize:18, flexShrink:0 }}>{w.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                <span style={{ fontSize:11, fontWeight:800, color:w.ratingColor, fontFamily:"monospace" }}>{w.rating}</span>
                <span style={{ fontSize:10, color:"#444", fontFamily:"monospace" }}>· Est. window: {w.label}</span>
              </div>
              <div style={{ fontSize:11, color:"#555", lineHeight:1.5 }}>{w.tip}</div>
              {w.rating === "VERY FAST" || w.rating === "FAST" ? (
                <div style={{ fontSize:10, color:"#ff8866", fontFamily:"monospace", marginTop:4 }}>
                  ⚡ Tip: Open both book tabs BEFORE expanding this card next time
                </div>
              ) : w.rating === "CATCHABLE" || w.rating === "VERY CATCHABLE" ? (
                <div style={{ fontSize:10, color:"#7dff88", fontFamily:"monospace", marginTop:4 }}>
                  ✓ Tip: You have time — double-check stakes before placing
                </div>
              ) : null}
            </div>
          </div>
        );
      })()}

      {mode !== "total" && (
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:9, color: mode==="leg1" ? "#f0c040" : "#64c8ff", fontFamily:"monospace", letterSpacing:2, marginBottom:6 }}>
            YOUR STAKE ON {mode==="leg1" ? `LEG 1 — ${arb.book1}` : `LEG 2 — ${arb.book2}`} ($)
          </div>
          <div style={{ position:"relative" }}>
            <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"#888", fontFamily:"monospace", fontSize:15, pointerEvents:"none" }}>$</span>
            <input
              type="number"
              value={customStake}
              onChange={e => setCustomStake(e.target.value)}
              placeholder="50"
              min="1"
              style={{ ...inputStyle, paddingLeft:24,
                borderColor: mode==="leg1" ? "rgba(240,192,64,0.4)" : "rgba(100,200,255,0.4)" }}
              autoFocus
            />
          </div>
          {mode === "leg1" && customStake && (
            <div style={{ fontSize:10, color:"#555", fontFamily:"monospace", marginTop:5 }}>
              Bet ${parseFloat(customStake)||0} on {arb.pick1} at {arb.book1} → app calculates Leg 2 automatically
            </div>
          )}
          {mode === "leg2" && customStake && (
            <div style={{ fontSize:10, color:"#555", fontFamily:"monospace", marginTop:5 }}>
              Bet ${parseFloat(customStake)||0} on {arb.pick2} at {arb.book2} → app calculates Leg 1 automatically
            </div>
          )}
        </div>
      )}

      {/* Payout + rounding variance + tax summary banner */}
      {calc && (() => {
        // Compute exact per-leg payouts to show rounding variance
        const payout1exact = calc.s1 * toDecimal(arb.odds1);
        const payout2exact = calc.s2 * toDecimal(arb.odds2);
        const variance = Math.abs(payout1exact - payout2exact);
        const worstPayout = Math.min(payout1exact, payout2exact);
        const bestPayout  = Math.max(payout1exact, payout2exact);
        const worstLeg    = payout1exact < payout2exact ? arb.book1 : arb.book2;
        const hasVariance = variance > 0.01;
        return (
          <div style={{ background: hasVariance ? "rgba(240,192,64,0.04)" : "rgba(125,255,136,0.05)",
            border:`1px solid ${hasVariance ? "rgba(240,192,64,0.2)" : "rgba(125,255,136,0.15)"}`,
            borderRadius:8, padding:"12px 16px", marginBottom:12 }}>

            {/* Payout row */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <div>
                <div style={{ fontSize:11, color: hasVariance ? "#f0c040" : "#7dff88", fontFamily:"monospace", marginBottom:3 }}>
                  {hasVariance ? "⚠ ROUNDED — Payouts differ slightly" : "✓ EQUAL PAYOUT — Stakes perfectly balanced"}
                </div>
                {hasVariance ? (
                  <div style={{ fontSize:10, color:"#666", fontFamily:"monospace", lineHeight:1.7 }}>
                    <span style={{ color:"#f0c040" }}>Leg 1 wins → ${payout1exact.toFixed(2)}</span>
                    {"  ·  "}
                    <span style={{ color:"#64c8ff" }}>Leg 2 wins → ${payout2exact.toFixed(2)}</span>
                    <br/>
                    <span style={{ color:"#888" }}>Variance: ${variance.toFixed(2)} · Profit shown uses worst case (${worstLeg} leg wins)</span>
                  </div>
                ) : (
                  <div style={{ fontSize:10, color:"#444", fontFamily:"monospace" }}>
                    Both legs pay ${payout1exact.toFixed(2)} — no rounding difference
                  </div>
                )}
              </div>
              <div style={{ textAlign:"right", flexShrink:0, marginLeft:16 }}>
                <div style={{ fontSize:9, color:"#444", fontFamily:"monospace", letterSpacing:1 }}>TOTAL STAKED</div>
                <div style={{ fontSize:14, fontWeight:700, color:"#fff", fontFamily:"monospace" }}>${calc.totalStaked}</div>
              </div>
            </div>

            {/* Profit range row — shows best and worst case when variance exists */}
            {hasVariance && (
              <div style={{ display:"flex", gap:10, marginBottom: totalWagerTax > 0 ? 8 : 0,
                borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:8 }}>
                <div style={{ flex:1, textAlign:"center", background:"rgba(125,255,136,0.05)", borderRadius:6, padding:"6px 8px" }}>
                  <div style={{ fontSize:8, color:"#444", fontFamily:"monospace", letterSpacing:1, marginBottom:3 }}>WORST CASE PROFIT</div>
                  <div style={{ fontSize:14, fontWeight:800, color:"#7dff88", fontFamily:"monospace" }}>
                    +${(worstPayout - calc.totalStaked - totalWagerTax).toFixed(2)}
                  </div>
                  <div style={{ fontSize:9, color:"#444", fontFamily:"monospace" }}>if {worstLeg} leg wins</div>
                </div>
                <div style={{ flex:1, textAlign:"center", background:"rgba(100,200,255,0.04)", borderRadius:6, padding:"6px 8px" }}>
                  <div style={{ fontSize:8, color:"#444", fontFamily:"monospace", letterSpacing:1, marginBottom:3 }}>BEST CASE PROFIT</div>
                  <div style={{ fontSize:14, fontWeight:800, color:"#64c8ff", fontFamily:"monospace" }}>
                    +${(bestPayout - calc.totalStaked - totalWagerTax).toFixed(2)}
                  </div>
                  <div style={{ fontSize:9, color:"#444", fontFamily:"monospace" }}>if other leg wins</div>
                </div>
              </div>
            )}

            {/* Excise tax row */}
            {totalWagerTax > 0 && (
              <div style={{ display:"flex", gap:16, fontSize:10, fontFamily:"monospace",
                borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:8 }}>
                {leg1Tax > 0 && <span style={{ color:"#ff8866" }}>📋 {arb.book1} excise: -${leg1Tax.toFixed(2)}</span>}
                {leg2Tax > 0 && <span style={{ color:"#ff8866" }}>📋 {arb.book2} excise: -${leg2Tax.toFixed(2)}</span>}
                <span style={{ color:"#ff8866", marginLeft:"auto" }}>Total excise: -${totalWagerTax.toFixed(2)}</span>
              </div>
            )}
          </div>
        );
      })()}

      {/* Results grid */}
      {calc && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:10, marginBottom:16 }}>
          {[
            { label: mode==="leg1" ? "YOUR LEG 1 STAKE" : "LEG 1 STAKE", value:`$${calc.s1}`, color:"#f0c040",
              sub: mode==="leg2" ? "← auto-calculated" : null },
            { label: mode==="leg2" ? "YOUR LEG 2 STAKE" : "LEG 2 STAKE", value:`$${calc.s2}`, color:"#64c8ff",
              sub: mode==="leg1" ? "← auto-calculated" : null },
            { label:"GROSS PROFIT", value:`+$${Math.round(calc.profit)}`, color:"#7dff88", sub:null },
            { label: totalWagerTax > 0 ? "NET AFTER EXCISE" : "NET PROFIT",
              value:`+$${Math.round(netProfit)}`,
              color: netProfit > 0 ? "#7dff88" : "#ff6666",
              sub: totalWagerTax > 0 ? `after $${totalWagerTax.toFixed(2)} excise` : null },
          ].map(item => (
            <div key={item.label} style={{ textAlign:"center", background:"rgba(255,255,255,0.02)", borderRadius:8, padding:"10px 8px",
              border: item.sub ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent" }}>
              <div style={{ fontSize:8, color:"#444", fontFamily:"monospace", letterSpacing:1, marginBottom:5 }}>{item.label}</div>
              <div style={{ fontSize:17, fontWeight:800, color:item.color, fontFamily:"monospace" }}>{item.value}</div>
              {item.sub && <div style={{ fontSize:9, color:"#555", fontFamily:"monospace", marginTop:4 }}>{item.sub}</div>}
            </div>
          ))}
        </div>
      )}

      {/* No calc state */}
      {mode !== "total" && !calc && (
        <div style={{ textAlign:"center", padding:"20px 0", color:"#333", fontFamily:"monospace", fontSize:12 }}>
          Enter your stake above to see the other leg auto-calculated
        </div>
      )}

      {/* Leg cards with open buttons */}
      {/* Clipboard toast state */}
      {(() => {
        const [copiedLeg, setCopiedLeg] = useState(null);

        const handleOpen = (leg, stake) => {
          // 1. Copy stake to clipboard
          if (stake != null) {
            navigator.clipboard.writeText(String(stake)).then(() => {
              setCopiedLeg(leg.book);
              setTimeout(() => setCopiedLeg(null), 2500);
            }).catch(() => {
              // Fallback for browsers that block clipboard
              const el = document.createElement("textarea");
              el.value = String(stake);
              document.body.appendChild(el);
              el.select();
              document.execCommand("copy");
              document.body.removeChild(el);
              setCopiedLeg(leg.book);
              setTimeout(() => setCopiedLeg(null), 2500);
            });
          }
          // 2. Open the book in a new tab
          window.open(BOOK_URLS[leg.book] || "#", "_blank");
        };

        return (
          <>
            {/* Clipboard instruction banner */}
            {copiedLeg && (
              <div style={{
                background:"rgba(125,255,136,0.1)", border:"1px solid rgba(125,255,136,0.3)",
                borderRadius:8, padding:"10px 16px", marginBottom:10,
                display:"flex", alignItems:"center", gap:10,
                animation:"fadeUp 0.2s ease"
              }}>
                <span style={{ fontSize:16 }}>📋</span>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:"#7dff88", fontFamily:"monospace" }}>
                    Stake copied to clipboard!
                  </div>
                  <div style={{ fontSize:10, color:"#555", fontFamily:"monospace", marginTop:2 }}>
                    Just paste it (Ctrl+V or ⌘V) into the stake field at {copiedLeg}
                  </div>
                </div>
              </div>
            )}

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
              {[
                { book:arb.book1, pick:arb.pick1, odds:arb.odds1, stake: calc?.s1, col:"#f0c040", label:"LEG 1",
                  isFixed: mode==="leg1", isAuto: mode==="leg2" },
                { book:arb.book2, pick:arb.pick2, odds:arb.odds2, stake: calc?.s2, col:"#64c8ff", label:"LEG 2",
                  isFixed: mode==="leg2", isAuto: mode==="leg1" },
              ].map((leg, i) => {
                const isCopied = copiedLeg === leg.book;
                const accentRGB = i===0 ? "240,192,64" : "100,200,255";
                return (
                  <div key={i} style={{
                    background:"rgba(255,255,255,0.02)",
                    border:`1px solid rgba(${accentRGB},${leg.isFixed ? "0.35" : "0.12"})`,
                    borderRadius:8, padding:"12px 14px",
                    transition:"border-color 0.2s"
                  }}>
                    {/* Leg header */}
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                      <div style={{ fontSize:9, color:leg.col, fontFamily:"monospace", letterSpacing:2 }}>{leg.label} — {leg.book}</div>
                      {leg.isFixed && <span style={{ fontSize:8, color:leg.col, fontFamily:"monospace", background:`rgba(${accentRGB},0.1)`, padding:"2px 6px", borderRadius:4 }}>📌 FIXED</span>}
                      {leg.isAuto && <span style={{ fontSize:8, color:"#7dff88", fontFamily:"monospace", background:"rgba(125,255,136,0.1)", padding:"2px 6px", borderRadius:4 }}>⚡ AUTO</span>}
                    </div>

                    {/* Pick */}
                    <div style={{ fontSize:14, fontWeight:700, color:"#ddd", marginBottom:6 }}>{leg.pick}</div>

                    {/* Odds + stake */}
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ fontSize:12, color:"#777", fontFamily:"monospace" }}>
                        Odds: <span style={{ color:"#fff" }}>{fmtOdds(leg.odds)}</span>
                      </span>
                      <span style={{ fontSize:12, color:"#777", fontFamily:"monospace" }}>
                        {leg.stake != null
                          ? <span>Bet: <span style={{ color:leg.col, fontWeight:800 }}>${leg.stake}</span></span>
                          : <span style={{ color:"#333" }}>—</span>}
                      </span>
                    </div>

                    {/* Implied prob */}
                    <div style={{ fontSize:10, color:"#444", fontFamily:"monospace", marginBottom:10 }}>
                      Implied prob: {(impliedProb(leg.odds)*100).toFixed(1)}%
                    </div>

                    {/* Stake preview pill — shows what will be copied */}
                    {leg.stake != null && (
                      <div style={{
                        textAlign:"center", marginBottom:8, padding:"5px",
                        background:`rgba(${accentRGB},0.06)`,
                        border:`1px dashed rgba(${accentRGB},0.2)`,
                        borderRadius:6, fontSize:10, color:"#666", fontFamily:"monospace"
                      }}>
                        📋 <span style={{ color:leg.col }}>${leg.stake}</span> will be copied to clipboard on click
                      </div>
                    )}

                    {/* Open button — copies stake + opens book */}
                    <button
                      onClick={() => handleOpen(leg, leg.stake)}
                      style={{
                        display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                        width:"100%", padding:"9px", borderRadius:7, border:"none",
                        background: isCopied
                          ? "rgba(125,255,136,0.15)"
                          : i===0 ? "rgba(240,192,64,0.12)" : "rgba(100,200,255,0.1)",
                        borderTop: `1px solid ${isCopied ? "rgba(125,255,136,0.4)" : `rgba(${accentRGB},0.3)`}`,
                        color: isCopied ? "#7dff88" : leg.col,
                        fontSize:11, fontWeight:800, fontFamily:"monospace",
                        letterSpacing:0.5, cursor:"pointer", transition:"all 0.2s"
                      }}
                    >
                      {isCopied
                        ? "✓ COPIED — PASTE INTO STAKE FIELD"
                        : `→ OPEN ${leg.book.toUpperCase()} + COPY $${leg.stake ?? "?"}`}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        );
      })()}

      {/* Action buttons */}
      <div style={{ display:"flex", gap:8 }}>
        <button onClick={() => calc && onLog(arb, calc.s1, calc.s2, calc.profit, leg1Tax > 0 ? leg1Tax : "", leg2Tax > 0 ? leg2Tax : "")}
          disabled={!isValidCalc}
          style={{
            flex:1, padding:"11px", borderRadius:9, border:"none",
            background: isValidCalc ? "linear-gradient(135deg,#f0c040,#e08020)" : "#1a1a1a",
            color: isValidCalc ? "#000" : "#333",
            fontWeight:800, fontSize:13, cursor: isValidCalc ? "pointer" : "not-allowed",
            fontFamily:"monospace", letterSpacing:0.5,
            boxShadow: isValidCalc ? "0 4px 16px rgba(240,192,64,0.25)" : "none"
          }}>⚖ LOG THIS ARB</button>
        <button onClick={() => onSelect(arb.id)} style={{
          padding:"11px 18px", borderRadius:9,
          border:`1px solid ${isSelected ? "rgba(240,192,64,0.4)" : "rgba(255,255,255,0.1)"}`,
          background: isSelected ? "rgba(240,192,64,0.1)" : "transparent",
          color: isSelected ? "#f0c040" : "#555",
          fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"monospace"
        }}>{isSelected ? "★ SAVED" : "☆ SAVE"}</button>
      </div>
    </div>
  );
}

// ─── Window Duration Estimator ───────────────────────────────────────────────
// Based on market type, books involved, and whether an exchange is present.
// These are realistic estimates based on how fast books typically correct lines.
function getWindowEstimate(arb) {
  const isExch = EXCHANGE_BOOKS.has(arb.book1) || EXCHANGE_BOOKS.has(arb.book2);
  const isSharp = SHARP_BOOKS.has(arb.book1) || SHARP_BOOKS.has(arb.book2);
  const mkt = arb.market || "";
  const sport = arb.sport || "";

  // Exchange arbs persist longer — no one limiting, peer-to-peer
  if (isExch) {
    return {
      label: "5–20 min",
      color: "#7dff88",
      rating: "CATCHABLE",
      ratingColor: "#7dff88",
      tip: "Exchange arbs close slower — books don't auto-adjust to peer markets",
      icon: "🟢"
    };
  }

  // Futures / long-dated markets
  if (mkt.toLowerCase().includes("future") || mkt.toLowerCase().includes("season")) {
    return {
      label: "Hours–Days",
      color: "#7dff88",
      rating: "VERY CATCHABLE",
      ratingColor: "#7dff88",
      tip: "Futures lines move slowly — plenty of time to place both sides",
      icon: "🟢"
    };
  }

  // Props — moderate speed
  if (mkt.includes("Prop") || mkt.includes("prop")) {
    return {
      label: "2–10 min",
      color: "#f0c040",
      rating: "CATCHABLE",
      ratingColor: "#f0c040",
      tip: "Prop arbs close within minutes — move quickly but manageable",
      icon: "🟡"
    };
  }

  // Totals and team totals — moderate
  if (mkt.includes("Total") || mkt.includes("total")) {
    return {
      label: "1–5 min",
      color: "#f0c040",
      rating: "MODERATE",
      ratingColor: "#f0c040",
      tip: "Totals arbs typically last 1–5 minutes before books correct",
      icon: "🟡"
    };
  }

  // Alt lines — slightly slower than main lines
  if (mkt.includes("Alt")) {
    return {
      label: "2–8 min",
      color: "#f0c040",
      rating: "CATCHABLE",
      ratingColor: "#f0c040",
      tip: "Alt lines get less attention from sharps — windows last a bit longer",
      icon: "🟡"
    };
  }

  // Spread / puck line / run line — fast but catchable
  if (mkt.includes("Spread") || mkt.includes("Puck") || mkt.includes("Run")) {
    return {
      label: "30 sec–3 min",
      color: "#f0c040",
      rating: "FAST",
      ratingColor: "#f0c040",
      tip: "Spread arbs close quickly — have both tabs open before clicking",
      icon: "🟡"
    };
  }

  // Moneyline on major sports — fastest
  if (sport === "NFL" || sport === "NBA" || sport === "MLB" || sport === "NHL") {
    if (isSharp) {
      return {
        label: "< 30 sec",
        color: "#ff6666",
        rating: "VERY FAST",
        ratingColor: "#ff6666",
        tip: "Sharp book involved — this line will correct almost instantly",
        icon: "🔴"
      };
    }
    return {
      label: "30–90 sec",
      color: "#ff8866",
      rating: "FAST",
      ratingColor: "#ff8866",
      tip: "Major sport ML arbs close fast — have books open in advance",
      icon: "🟠"
    };
  }

  // Soccer / Tennis / MMA — slightly slower markets
  if (sport === "Soccer" || sport === "Tennis" || sport === "MMA") {
    return {
      label: "1–4 min",
      color: "#f0c040",
      rating: "MODERATE",
      ratingColor: "#f0c040",
      tip: "Smaller markets — lines adjust slower than major US sports",
      icon: "🟡"
    };
  }

  // College sports — slowest to correct
  if (sport.includes("College")) {
    return {
      label: "2–10 min",
      color: "#7dff88",
      rating: "CATCHABLE",
      ratingColor: "#7dff88",
      tip: "College markets have less sharp action — windows stay open longer",
      icon: "🟢"
    };
  }

  // Default
  return {
    label: "1–3 min",
    color: "#f0c040",
    rating: "MODERATE",
    ratingColor: "#f0c040",
    tip: "Typical arb window — move steadily but don't rush",
    icon: "🟡"
  };
}

function ArbCard({ arb, bankroll, onLog, isSelected, onSelect, bookTaxes }) {
  const [expanded, setExpanded] = useState(false);
  const bl = parseFloat(bankroll) || 200;
  const { s1, s2, profit, payout1, payout2, totalStaked, targetPayout } = calcStakes(arb.odds1, arb.odds2, bl);
  const taxEst = profit * 0.24;
  const netProfit = profit - taxEst;
  const pctColor = arb.arbPct >= 5 ? "#7dff88" : arb.arbPct >= 3 ? "#f0c040" : "#c8b86a";
  const isExchange = EXCHANGE_BOOKS.has(arb.book1) || EXCHANGE_BOOKS.has(arb.book2);
  const isSharpBook = SHARP_BOOKS.has(arb.book1) || SHARP_BOOKS.has(arb.book2);
  const win = getWindowEstimate(arb);

  return (
    <div style={{
      background: isSelected ? "rgba(240,192,64,0.04)" : "rgba(255,255,255,0.02)",
      border:`1px solid ${isSelected ? "rgba(240,192,64,0.25)" : "rgba(255,255,255,0.06)"}`,
      borderRadius:12, marginBottom:8, overflow:"hidden",
      transition:"border-color 0.2s, background 0.2s"
    }}>
      {/* Main row */}
      <div style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 18px", cursor:"pointer" }}
        onClick={() => setExpanded(!expanded)}>

        {/* Sport emoji */}
        <div style={{ fontSize:20, flexShrink:0, width:28, textAlign:"center" }}>
          {arb.sport==="NFL"?"🏈":arb.sport==="NBA"?"🏀":arb.sport==="MLB"?"⚾":arb.sport==="NHL"?"🏒":arb.sport==="Soccer"?"⚽":arb.sport==="Tennis"?"🎾":arb.sport==="MMA"?"🥊":arb.sport.includes("College")?"🎓":"🎯"}
        </div>

        {/* Game + market info */}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4, flexWrap:"wrap" }}>
            <span style={{ fontSize:11, color:"#555", fontFamily:"monospace" }}>{arb.sport}</span>
            <span style={{ fontSize:10, color:"#333" }}>·</span>
            <span style={{ fontSize:11, color:"#555", fontFamily:"monospace" }}>{arb.market}</span>
            {isExchange && <span style={{ fontSize:9, color:"#64c8ff", fontFamily:"monospace", background:"rgba(100,200,255,0.1)", padding:"1px 6px", borderRadius:10 }}>⚡ EXCHANGE</span>}
            {isSharpBook && <span style={{ fontSize:9, color:"#b888ff", fontFamily:"monospace", background:"rgba(184,136,255,0.1)", padding:"1px 6px", borderRadius:10 }}>🔪 SHARP</span>}
          </div>
          <div style={{ fontSize:14, fontWeight:700, color:"#ddd", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", marginBottom:5 }}>{arb.game}</div>
          {/* Date/time badge — always visible */}
          {(() => {
            const ct = arb.commence_time ? new Date(arb.commence_time) : null;
            if (!ct) return <div style={{ fontSize:11, color:"#444", fontFamily:"monospace" }}>{arb.time || "Time TBD"}</div>;
            const now = new Date();
            const todayStr = now.toDateString();
            const tomorrowStr = new Date(now.getTime() + 86400000).toDateString();
            const isToday = ct.toDateString() === todayStr;
            const isTomorrow = ct.toDateString() === tomorrowStr;
            const dayLabel = isToday ? "TODAY" : isTomorrow ? "TOMORROW" : ct.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}).toUpperCase();
            const timeLabel = ct.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",timeZoneName:"short"});
            const dayColor = isToday ? "#f0c040" : isTomorrow ? "#64c8ff" : "#666";
            const dayBg = isToday ? "rgba(240,192,64,0.12)" : isTomorrow ? "rgba(100,200,255,0.1)" : "rgba(255,255,255,0.04)";
            return (
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ fontSize:10, fontWeight:700, color:dayColor, fontFamily:"monospace", background:dayBg, padding:"2px 8px", borderRadius:4, letterSpacing:1 }}>
                  📅 {dayLabel}
                </span>
                <span style={{ fontSize:10, color:"#555", fontFamily:"monospace" }}>{timeLabel}</span>
              </div>
            );
          })()}
        </div>

        {/* Legs */}
        <div style={{ display:"flex", gap:8, flexShrink:0 }}>
          {[{book:arb.book1,pick:arb.pick1,odds:arb.odds1,col:"#f0c040"},{book:arb.book2,pick:arb.pick2,odds:arb.odds2,col:"#64c8ff"}].map((leg,i) => (
            <div key={i} style={{
              background:`rgba(${i===0?"240,192,64":"100,200,255"},0.06)`,
              border:`1px solid rgba(${i===0?"240,192,64":"100,200,255"},0.15)`,
              borderRadius:8, padding:"8px 12px", minWidth:130, textAlign:"center"
            }}>
              <div style={{ fontSize:10, color:leg.col, fontFamily:"monospace", letterSpacing:1, marginBottom:4 }}>{leg.book}</div>
              <div style={{ fontSize:12, color:"#bbb", marginBottom:4, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:110 }}>{leg.pick}</div>
              <div style={{ fontSize:17, fontWeight:800, color:"#fff", fontFamily:"monospace" }}>{fmtOdds(leg.odds)}</div>
            </div>
          ))}
        </div>

        {/* ARB % + Window estimate */}
        <div style={{ textAlign:"center", flexShrink:0, minWidth:110 }}>
          <div style={{ fontSize:22, fontWeight:900, color:pctColor, fontFamily:"monospace", lineHeight:1 }}>
            +{arb.arbPct.toFixed(2)}%
          </div>
          <div style={{ fontSize:9, color:"#444", fontFamily:"monospace", marginTop:3 }}>ARB PROFIT</div>
          <div style={{ marginTop:6 }}><Countdown seconds={arb.expiresIn} /></div>
          {/* Window duration badge */}
          <div style={{
            marginTop:6, padding:"3px 8px", borderRadius:20,
            background:`rgba(${win.color === "#7dff88" ? "125,255,136" : win.color === "#f0c040" ? "240,192,64" : win.color === "#ff8866" ? "255,136,102" : "255,102,102"},0.1)`,
            border:`1px solid ${win.color}33`,
            display:"inline-block"
          }}>
            <div style={{ fontSize:9, color:win.color, fontFamily:"monospace", fontWeight:700, whiteSpace:"nowrap" }}>
              {win.icon} {win.label}
            </div>
            <div style={{ fontSize:8, color:"#444", fontFamily:"monospace", letterSpacing:0.5 }}>
              {win.rating}
            </div>
          </div>
        </div>

        {/* Expand arrow */}
        <div style={{ color:"#333", fontSize:12, flexShrink:0 }}>{expanded ? "▲" : "▼"}</div>
      </div>

      {/* Expanded detail */}
      {expanded && <ArbCardDetail arb={arb} defaultS1={s1} defaultS2={s2} defaultProfit={profit} onLog={onLog} isSelected={isSelected} onSelect={onSelect}
        leg1WagerTax={bookTaxes?.[arb.book1] || ""}
        leg2WagerTax={bookTaxes?.[arb.book2] || ""} />}
    </div>
  );
}

function BetLog({ bets, onSettle }) {
  if (bets.length === 0) return (
    <div style={{ textAlign:"center", color:"#333", fontFamily:"monospace", padding:"60px 0", fontSize:13 }}>
      No bets logged yet. Find an arb above and hit LOG.
    </div>
  );

  const won = bets.filter(b => b.status==="won");
  const totalGross = won.reduce((a,b) => a + b.profit, 0);
  const totalTax = won.reduce((a,b) => a + b.profit * 0.24, 0);
  const totalNet = totalGross - totalTax;

  return (
    <div>
      <div style={{ display:"flex", gap:10, marginBottom:18 }}>
        {[
          { label:"Total Net (After Tax)", value:`+$${totalNet.toFixed(2)}`, color:"#7dff88" },
          { label:"Bets Logged", value:bets.length, color:"#f0c040" },
          { label:"Win Rate", value: bets.filter(b=>b.status!=="pending").length > 0 ? `${Math.round(won.length/bets.filter(b=>b.status!=="pending").length*100)}%` : "—", color:"#ccc" },
          { label:"Tax Liability", value:`$${totalTax.toFixed(2)}`, color:"#ff8866" },
        ].map(k => (
          <div key={k.label} style={{ flex:1, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:10, padding:"12px 16px" }}>
            <div style={{ fontSize:9, color:"#444", fontFamily:"monospace", letterSpacing:2, marginBottom:6 }}>{k.label}</div>
            <div style={{ fontSize:20, fontWeight:800, color:k.color, fontFamily:"monospace" }}>{k.value}</div>
          </div>
        ))}
      </div>

      {bets.map(bet => {
        const tax = bet.profit * 0.24;
        const netP = bet.profit - tax;
        const sc = bet.status==="won" ? "#7dff88" : bet.status==="lost" ? "#ff6666" : "#f0c040";
        return (
          <div key={bet.id} style={{
            background:"rgba(255,255,255,0.02)", border:`1px solid rgba(255,255,255,0.06)`,
            borderRadius:10, padding:"14px 18px", marginBottom:8, display:"flex", alignItems:"center", gap:14
          }}>
            <div style={{ fontSize:18 }}>
              {bet.sport==="NFL"?"🏈":bet.sport==="NBA"?"🏀":bet.sport==="MLB"?"⚾":bet.sport==="NHL"?"🏒":bet.sport==="Soccer"?"⚽":"🎯"}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, color:"#555", fontFamily:"monospace" }}>{bet.sport} · {bet.market} · {bet.book1} vs {bet.book2}</div>
              <div style={{ fontSize:14, fontWeight:700, color:"#ddd", marginTop:2 }}>{bet.game}</div>
              <div style={{ fontSize:11, color:"#444", fontFamily:"monospace", marginTop:3 }}>
                {bet.pick1} ({fmtOdds(bet.odds1)}) | {bet.pick2} ({fmtOdds(bet.odds2)})
              </div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:15, fontWeight:800, color:"#f0c040", fontFamily:"monospace" }}>+{bet.arbPct.toFixed(2)}%</div>
              <div style={{ fontSize:12, color:"#7dff88", fontFamily:"monospace" }}>+${Math.round(bet.profit)} gross</div>
              {(parseFloat(bet.leg1Tax)||0) + (parseFloat(bet.leg2Tax)||0) > 0 && (
                <div style={{ fontSize:11, color:"#ff8866", fontFamily:"monospace" }}>
                  -${((parseFloat(bet.leg1Tax)||0)+(parseFloat(bet.leg2Tax)||0)).toFixed(2)} excise
                </div>
              )}
            </div>
            <div style={{ textAlign:"center", minWidth:56 }}>
              <div style={{ fontSize:10, fontWeight:800, color:sc, fontFamily:"monospace", textTransform:"uppercase",
                background:`rgba(${bet.status==="won"?"125,255,136":bet.status==="lost"?"255,102,102":"240,192,64"},0.1)`,
                padding:"3px 8px", borderRadius:4
              }}>{bet.status}</div>
            </div>
            {bet.status === "pending" && (
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                <button onClick={() => onSettle(bet.id,"won")} style={{ fontSize:10, padding:"4px 8px", borderRadius:5, border:"1px solid rgba(125,255,136,0.3)", background:"rgba(125,255,136,0.08)", color:"#7dff88", cursor:"pointer", fontFamily:"monospace" }}>WON</button>
                <button onClick={() => onSettle(bet.id,"lost")} style={{ fontSize:10, padding:"4px 8px", borderRadius:5, border:"1px solid rgba(255,102,102,0.3)", background:"rgba(255,102,102,0.06)", color:"#ff6666", cursor:"pointer", fontFamily:"monospace" }}>LOST</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Setup Screen ────────────────────────────────────────────────────────────
function SetupScreen({ onComplete }) {
  const [apiKey, setApiKey] = useState("");
  const [bookTaxes, setBookTaxes] = useState({});
  const [step, setStep] = useState(1); // 1=API key, 2=book taxes

  const updateTax = (book, val) => setBookTaxes(p => ({ ...p, [book]: val }));

  const inputStyle = {
    background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)",
    borderRadius:8, color:"#fff", padding:"10px 14px", fontSize:14,
    fontFamily:"monospace", outline:"none", width:"100%",
  };

  return (
    <div style={{ minHeight:"100vh", background:"#070709", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap');*{box-sizing:border-box}input::placeholder{color:#333}`}</style>
      <div style={{ width:"100%", maxWidth:540, padding:32 }}>

        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:40 }}>
          <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#f0c040,#e08020)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, boxShadow:"0 0 24px rgba(240,192,64,0.4)" }}>⚖</div>
          <span style={{ fontSize:22, fontWeight:800, fontFamily:"'Syne',sans-serif", color:"#fff" }}>ArbVault</span>
          <span style={{ fontSize:9, color:"#f0c04055", fontFamily:"monospace", letterSpacing:3 }}>SETUP</span>
        </div>

        {/* Step indicators */}
        <div style={{ display:"flex", gap:8, marginBottom:32 }}>
          {["API Key","Book Taxes"].map((s,i) => (
            <div key={s} style={{ flex:1, height:3, borderRadius:2, background: step > i ? "#f0c040" : "rgba(255,255,255,0.08)" }} />
          ))}
        </div>

        {step === 1 && (
          <div>
            <div style={{ fontSize:20, fontWeight:800, color:"#fff", fontFamily:"'Syne',sans-serif", marginBottom:8 }}>Connect Your Odds API</div>
            <div style={{ fontSize:13, color:"#555", marginBottom:24, lineHeight:1.6 }}>
              Get your free API key at <span style={{ color:"#f0c040" }}>the-odds-api.com</span> — 500 free credits, no card required. The key stays on your device only.
            </div>
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:10, color:"#555", fontFamily:"monospace", letterSpacing:2, marginBottom:8 }}>YOUR API KEY</div>
              <input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="Paste your API key here..."
                style={inputStyle}
              />
              <div style={{ fontSize:10, color:"#333", fontFamily:"monospace", marginTop:6 }}>
                Treat this like a password — never share it publicly
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button
                onClick={() => { if (apiKey.trim().length > 10) setStep(2); }}
                disabled={apiKey.trim().length < 10}
                style={{
                  flex:1, padding:"13px", borderRadius:10, border:"none",
                  background: apiKey.trim().length > 10 ? "linear-gradient(135deg,#f0c040,#e08020)" : "#1a1a1a",
                  color: apiKey.trim().length > 10 ? "#000" : "#333",
                  fontWeight:800, fontSize:14, cursor: apiKey.trim().length > 10 ? "pointer" : "not-allowed",
                  fontFamily:"'Syne',sans-serif"
                }}>Next → Book Taxes</button>
              <button onClick={() => onComplete("", {})} style={{
                padding:"13px 18px", borderRadius:10, border:"1px solid rgba(255,255,255,0.08)",
                background:"transparent", color:"#444", fontWeight:600, fontSize:13,
                cursor:"pointer", fontFamily:"monospace"
              }}>Skip (Demo)</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ fontSize:20, fontWeight:800, color:"#fff", fontFamily:"'Syne',sans-serif", marginBottom:8 }}>Per-Wager Excise Tax</div>
            <div style={{ fontSize:13, color:"#555", marginBottom:6, lineHeight:1.6 }}>
              Some states (like Illinois) and books charge a flat fee per wager — typically $0.25 or $0.50. Enter the amount for each book that charges you. Leave blank if the book doesn't charge one.
            </div>
            <div style={{ fontSize:11, color:"#f0c04088", fontFamily:"monospace", marginBottom:20 }}>
              💡 Illinois: $0.25/wager on most books
            </div>

            <div style={{ maxHeight:320, overflowY:"auto", marginBottom:20, paddingRight:4 }}>
              {BOOK_GROUPS.slice(0,3).map(group => ( // US books only — most relevant
                <div key={group.label} style={{ marginBottom:16 }}>
                  <div style={{ fontSize:9, color:"#444", fontFamily:"monospace", letterSpacing:2, marginBottom:8 }}>{group.label}</div>
                  {group.books.map(book => (
                    <div key={book} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                      <span style={{ fontSize:12, color:"#888", fontFamily:"monospace", flex:1 }}>{book}</span>
                      <div style={{ position:"relative", width:100 }}>
                        <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"#555", fontSize:12, fontFamily:"monospace" }}>$</span>
                        <input
                          type="number"
                          value={bookTaxes[book] || ""}
                          onChange={e => updateTax(book, e.target.value)}
                          placeholder="—"
                          min="0" max="5" step="0.25"
                          style={{
                            ...inputStyle, width:100, padding:"6px 8px 6px 22px",
                            fontSize:12, textAlign:"right"
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => setStep(1)} style={{
                padding:"13px 18px", borderRadius:10, border:"1px solid rgba(255,255,255,0.08)",
                background:"transparent", color:"#555", fontWeight:600, fontSize:13,
                cursor:"pointer", fontFamily:"monospace"
              }}>← Back</button>
              <button onClick={() => onComplete(apiKey.trim(), bookTaxes)} style={{
                flex:1, padding:"13px", borderRadius:10, border:"none",
                background:"linear-gradient(135deg,#f0c040,#e08020)",
                color:"#000", fontWeight:800, fontSize:14, cursor:"pointer",
                fontFamily:"'Syne',sans-serif"
              }}>Launch ArbVault →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function ArbVault() {
  const [tab, setTab] = useState("scanner");
  const [setupDone, setSetupDone] = useState(false);
  const [userApiKey, setUserApiKey] = useState("");
  const [bookTaxes, setBookTaxes] = useState({}); // { "DraftKings": "0.25", ... }
  const [selectedBooks, setSelectedBooks] = useState([...ALL_BOOKS]);
  const [sport, setSport] = useState("All Sports");
  const [betType, setBetType] = useState("All Types");
  const [minPct, setMinPct] = useState("0");
  const [maxPct, setMaxPct] = useState("20");
  const [bankroll, setBankroll] = useState("200");
  const [sortBy, setSortBy] = useState("pct");
  const [savedIds, setSavedIds] = useState([]);
  const [loggedBets, setLoggedBets] = useState([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(120);
  const [credits, setCredits] = useState({ remaining: 500, total: 500 });
  const [refreshCountdown, setRefreshCountdown] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveArbs, setLiveArbs] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [marketsMode, setMarketsMode] = useState("h2h");
  const [includeExchange, setIncludeExchange] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(null);
  const REFRESH_COOLDOWN = 60;

  const doRefresh = async (force = false) => {
    const now = Date.now();
    const estCost = estimateCost(marketsMode, includeExchange);

    // Cooldown gate
    if (!force && lastRefreshTime && (now - lastRefreshTime) < REFRESH_COOLDOWN * 1000) {
      const wait = Math.ceil((REFRESH_COOLDOWN * 1000 - (now - lastRefreshTime)) / 1000);
      setApiError(`⏱ Wait ${wait}s — cooldown active. Each refresh costs ~${estCost} credits.`);
      return;
    }
    // Block if no API key entered
    if (!API_KEY || API_KEY.trim().length < 10) {
      setApiError("⚠ No API key set. Go to Settings to enter your key from the-odds-api.com");
      setLiveArbs(genMockArbs());
      setHasLoaded(true);
      setIsRefreshing(false);
      return;
    }
    // Block if too low
    if (credits.remaining < estCost) {
      setApiError(`⚠ Not enough credits (need ~${estCost}, have ${credits.remaining}). Buy more at the-odds-api.com`);
      return;
    }

    setIsRefreshing(true);
    setApiError(null);
    setLastRefreshTime(now);

    try {
      const { arbs, creditsRemaining } = await fetchLiveArbs(selectedBooks, marketsMode, includeExchange);
      if (creditsRemaining !== null) {
        setLiveArbs(arbs);
        setCredits({ remaining: creditsRemaining, total: credits.total });
      } else {
        // API blocked (sandbox/CORS) — show mock data
        setLiveArbs(genMockArbs());
        setApiError(`Demo mode — deploy app to go live. This refresh would cost ~${estCost} credits.`);
      }
    } catch(e) {
      setLiveArbs(genMockArbs());
      setApiError(`Demo mode. Deploy to activate live odds. Est. ~${estCost} credits/refresh.`);
    }
    setLastRefresh(new Date());
    setHasLoaded(true);
    setIsRefreshing(false);
  };

  // Auto-refresh engine
  useEffect(() => {
    if (!autoRefresh) { setRefreshCountdown(null); return; }
    setRefreshCountdown(refreshInterval);
    const tick = setInterval(() => {
      setRefreshCountdown(prev => {
        if (prev <= 1) { doRefresh(); return refreshInterval; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [autoRefresh, refreshInterval]);

  // Load on first mount
  useEffect(() => { doRefresh(); }, []);

  // Date boundary helpers
  const getDateBounds = () => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const todayEnd   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    const tomorrowStart = new Date(todayStart); tomorrowStart.setDate(tomorrowStart.getDate() + 1);
    const tomorrowEnd   = new Date(todayEnd);   tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);
    const weekEnd = new Date(todayStart); weekEnd.setDate(weekEnd.getDate() + 7);
    return { todayStart, todayEnd, tomorrowStart, tomorrowEnd, weekEnd };
  };

  const filtered = useMemo(() => {
    const { todayStart, todayEnd, tomorrowStart, tomorrowEnd, weekEnd } = getDateBounds();

    let arbs = liveArbs.filter(a => {
      const bookMatch = selectedBooks.includes(a.book1) && selectedBooks.includes(a.book2);
      const sportMatch = sport === "All Sports" || a.sport === sport;
      const typeMatch = betType === "All Types" || a.market === betType;
      const minMatch = a.arbPct >= (parseFloat(minPct) || 0);
      const maxMatch = a.arbPct <= (parseFloat(maxPct) || 20);

      // Date filtering
      let dateMatch = true;
      if (a.commence_time) {
        const ct = new Date(a.commence_time);
        if (dateFilter === "today")    dateMatch = ct >= todayStart && ct <= todayEnd;
        if (dateFilter === "tomorrow") dateMatch = ct >= tomorrowStart && ct <= tomorrowEnd;
        if (dateFilter === "week")     dateMatch = ct >= todayStart && ct <= weekEnd;
        if (dateFilter === "custom") {
          const from = customFrom ? new Date(customFrom + "T00:00:00") : null;
          const to   = customTo   ? new Date(customTo   + "T23:59:59") : null;
          if (from) dateMatch = dateMatch && ct >= from;
          if (to)   dateMatch = dateMatch && ct <= to;
        }
      }

      return bookMatch && sportMatch && typeMatch && minMatch && maxMatch && dateMatch;
    });

    const bl = parseFloat(bankroll) || 200;
    if (sortBy === "pct") arbs.sort((a,b) => b.arbPct - a.arbPct);
    else if (sortBy === "profit") arbs.sort((a,b) => calcStakes(b.odds1,b.odds2,bl).profit - calcStakes(a.odds1,a.odds2,bl).profit);
    else if (sortBy === "expires") arbs.sort((a,b) => a.expiresIn - b.expiresIn);
    return arbs;
  }, [selectedBooks, sport, betType, minPct, maxPct, bankroll, sortBy, liveArbs, dateFilter, customFrom, customTo]);

  const handleSetupComplete = (key, taxes) => {
    // Set the module-level API_KEY so fetchLiveArbs picks it up
    API_KEY = key;
    setUserApiKey(key);
    setBookTaxes(taxes);
    setSetupDone(true);
  };

  const handleLog = (arb, s1, s2, profit, leg1Tax, leg2Tax) => {
    setLoggedBets(prev => [{
      id: Date.now(), ...arb, s1, s2, profit, status:"pending",
      leg1Tax: leg1Tax || "", leg2Tax: leg2Tax || "",
      loggedAt: new Date().toLocaleTimeString()
    }, ...prev]);
    setTab("tracker");
  };

  const handleSettle = (id, status) => {
    setLoggedBets(prev => prev.map(b => b.id===id ? {...b, status} : b));
  };

  const tabs = [
    { id:"scanner", label:"⚡ Live Scanner" },
    { id:"tracker", label:`📋 My Bets ${loggedBets.length > 0 ? `(${loggedBets.length})` : ""}` },
    { id:"settings", label:"⚙ Settings" },
  ];

  if (!setupDone) return <SetupScreen onComplete={handleSetupComplete} />;

  return (
    <div style={{ minHeight:"100vh", background:"#070709", color:"#fff", fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap');
        @keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#0a0a0a}::-webkit-scrollbar-thumb{background:#222;border-radius:2px}
        select option{background:#111;color:#fff}
        input[type=number]::-webkit-inner-spin-button{opacity:0.3}
        input::placeholder{color:#333}
      `}</style>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 28px", height:60, background:"rgba(255,255,255,0.02)", borderBottom:"1px solid rgba(255,255,255,0.06)", position:"sticky", top:0, zIndex:100, backdropFilter:"blur(20px)" }}>
        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:9, background:"linear-gradient(135deg,#f0c040,#e08020)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, boxShadow:"0 0 18px rgba(240,192,64,0.35)" }}>⚖</div>
          <div>
            <span style={{ fontSize:16, fontWeight:800, letterSpacing:-0.5, fontFamily:"'Syne',sans-serif" }}>ArbVault</span>
            <span style={{ fontSize:9, color:"#f0c04055", fontFamily:"monospace", letterSpacing:3, marginLeft:10 }}>SCANNER</span>
          </div>
        </div>

        {/* Center — credit counter */}
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{
            background:"rgba(255,255,255,0.03)", border:`1px solid ${
              credits.remaining < 1000 ? "rgba(255,102,102,0.3)" :
              credits.remaining < 5000 ? "rgba(240,192,64,0.3)" :
              "rgba(125,255,136,0.2)"}`,
            borderRadius:8, padding:"6px 14px", display:"flex", alignItems:"center", gap:10
          }}>
            <div>
              <div style={{ fontSize:8, color:"#444", fontFamily:"monospace", letterSpacing:2, marginBottom:2 }}>API CREDITS</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:4 }}>
                <span style={{
                  fontSize:15, fontWeight:800, fontFamily:"monospace",
                  color: credits.remaining < 1000 ? "#ff6666" : credits.remaining < 5000 ? "#f0c040" : "#7dff88"
                }}>{credits.remaining.toLocaleString()}</span>
                <span style={{ fontSize:10, color:"#333", fontFamily:"monospace" }}>/ {credits.total.toLocaleString()}</span>
              </div>
            </div>
            {/* Mini bar */}
            <div style={{ width:60, height:4, background:"rgba(255,255,255,0.06)", borderRadius:2, overflow:"hidden" }}>
              <div style={{
                height:"100%", borderRadius:2, transition:"width 0.5s",
                width:`${(credits.remaining / credits.total) * 100}%`,
                background: credits.remaining < 1000 ? "#ff6666" : credits.remaining < 5000 ? "#f0c040" : "#7dff88"
              }} />
            </div>
          </div>
        </div>

        {/* Right — refresh controls */}
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {/* Last refreshed */}
          <span style={{ fontSize:10, color:"#333", fontFamily:"monospace" }}>
            {filtered.length} arbs · {lastRefresh.toLocaleTimeString()}
          </span>

          {/* Auto-refresh interval selector */}
          {autoRefresh && (
            <select value={refreshInterval} onChange={e => setRefreshInterval(Number(e.target.value))} style={{
              background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:6, color:"#888", padding:"4px 8px", fontSize:10,
              fontFamily:"monospace", cursor:"pointer", outline:"none"
            }}>
              <option value={30}>30s</option>
              <option value={60}>60s</option>
              <option value={120}>2min</option>
              <option value={300}>5min</option>
            </select>
          )}

          {/* Countdown */}
          {autoRefresh && refreshCountdown && (
            <div style={{ fontSize:11, color:"#f0c040", fontFamily:"monospace", minWidth:30, textAlign:"center" }}>
              {refreshCountdown}s
            </div>
          )}

          {/* Auto-refresh toggle */}
          <button onClick={() => setAutoRefresh(p => !p)} style={{
            padding:"5px 12px", borderRadius:6, fontSize:10, fontFamily:"monospace",
            fontWeight:700, cursor:"pointer", border:"none", letterSpacing:0.5,
            background: autoRefresh ? "rgba(125,255,136,0.15)" : "rgba(255,255,255,0.05)",
            color: autoRefresh ? "#7dff88" : "#444",
            transition:"all 0.2s"
          }}>
            {autoRefresh ? "⏸ AUTO" : "▶ AUTO"}
          </button>

          {/* Cost controls */}
          <div style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:8, padding:"5px 10px" }}>
            <div style={{ fontSize:8, color:"#444", fontFamily:"monospace", letterSpacing:1 }}>MARKETS</div>
            {[
              { val:"h2h",              label:"ML" },
              { val:"h2h,spreads",      label:"ML+Sprd" },
              { val:"h2h,spreads,totals",label:"All" },
            ].map(m => (
              <button key={m.val} onClick={() => setMarketsMode(m.val)} style={{
                padding:"3px 8px", borderRadius:4, fontSize:9, fontFamily:"monospace", fontWeight:700,
                cursor:"pointer", border:`1px solid ${marketsMode===m.val ? "rgba(240,192,64,0.5)" : "rgba(255,255,255,0.07)"}`,
                background: marketsMode===m.val ? "rgba(240,192,64,0.12)" : "transparent",
                color: marketsMode===m.val ? "#f0c040" : "#444",
              }}>{m.label}</button>
            ))}
            <div style={{ width:1, height:14, background:"rgba(255,255,255,0.08)" }} />
            <button onClick={() => setIncludeExchange(p=>!p)} style={{
              padding:"3px 8px", borderRadius:4, fontSize:9, fontFamily:"monospace", fontWeight:700,
              cursor:"pointer", border:`1px solid ${includeExchange ? "rgba(100,200,255,0.5)" : "rgba(255,255,255,0.07)"}`,
              background: includeExchange ? "rgba(100,200,255,0.1)" : "transparent",
              color: includeExchange ? "#64c8ff" : "#444",
            }}>⚡ Exchanges</button>
            <div style={{ fontSize:9, color:"#f0c04099", fontFamily:"monospace", marginLeft:2 }}>
              ~{estimateCost(marketsMode, includeExchange)} cr
            </div>
          </div>

          {/* Refresh button */}
          <button onClick={() => doRefresh(false)} disabled={isRefreshing} style={{
            padding:"5px 14px", borderRadius:6, fontSize:10, fontFamily:"monospace", fontWeight:700,
            cursor: isRefreshing ? "not-allowed" : "pointer", transition:"all 0.2s", letterSpacing:0.5,
            border:`1px solid ${credits.remaining < estimateCost(marketsMode,includeExchange) ? "rgba(255,100,100,0.4)" : "rgba(240,192,64,0.3)"}`,
            background: credits.remaining < estimateCost(marketsMode,includeExchange) ? "rgba(255,100,100,0.08)" : isRefreshing ? "rgba(255,255,255,0.02)" : "rgba(240,192,64,0.08)",
            color: isRefreshing ? "#333" : credits.remaining < estimateCost(marketsMode,includeExchange) ? "#ff6666" : "#f0c040",
          }}>
            {isRefreshing ? "⟳ loading..." : `⟳ REFRESH (~${estimateCost(marketsMode,includeExchange)} cr)`}
          </button>

          {/* Live dot */}
          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background: autoRefresh ? "#7dff88" : "#444", boxShadow: autoRefresh ? "0 0 8px #7dff88" : "none", animation: autoRefresh ? "pulse 2s infinite" : "none" }} />
            <span style={{ fontSize:10, color: autoRefresh ? "#7dff8888" : "#333", fontFamily:"monospace", letterSpacing:1.5 }}>LIVE</span>
          </div>
        </div>
      </div>

      <div style={{ display:"flex", height:"calc(100vh - 56px)" }}>

        {/* Left sidebar — book selector */}
        <div style={{
          width:280, flexShrink:0, borderRight:"1px solid rgba(255,255,255,0.06)",
          padding:"20px 14px", overflowY:"auto", background:"rgba(0,0,0,0.2)"
        }}>
          <BookSelector selected={selectedBooks} onChange={setSelectedBooks} />
        </div>

        {/* Main content */}
        <div style={{ flex:1, overflowY:"auto", padding:"20px 24px" }}>

          {/* Tabs */}
          <div style={{ display:"flex", gap:0, borderBottom:"1px solid rgba(255,255,255,0.06)", marginBottom:18 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                background:"transparent", border:"none",
                borderBottom:`2px solid ${tab===t.id ? "#f0c040" : "transparent"}`,
                color:tab===t.id ? "#f0c040" : "#444",
                padding:"10px 20px", fontSize:13, fontWeight:700,
                cursor:"pointer", fontFamily:"'Syne',sans-serif", letterSpacing:0.5, transition:"all 0.15s"
              }}>{t.label}</button>
            ))}
          </div>

          {tab === "scanner" && (
            <div style={{ animation:"fadeUp 0.3s ease" }}>
              <FilterBar
                sport={sport} setSport={setSport}
                betType={betType} setBetType={setBetType}
                minPct={minPct} setMinPct={setMinPct}
                maxPct={maxPct} setMaxPct={setMaxPct}
                bankroll={bankroll} setBankroll={setBankroll}
                sortBy={sortBy} setSortBy={setSortBy}
                dateFilter={dateFilter} setDateFilter={setDateFilter}
                customFrom={customFrom} setCustomFrom={setCustomFrom}
                customTo={customTo} setCustomTo={setCustomTo}
              />

              {/* Results header */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <div style={{ fontSize:11, color:"#444", fontFamily:"monospace", letterSpacing:1.5 }}>
                  {filtered.length} OPPORTUNITIES FOUND
                </div>
                <div style={{ fontSize:10, color:"#333", fontFamily:"monospace" }}>
                  Click any row to expand · LOG BET to track
                </div>
              </div>

              {apiError && (
                <div style={{ textAlign:"center", padding:"30px", background:"rgba(255,100,100,0.06)", border:"1px solid rgba(255,100,100,0.2)", borderRadius:10, marginBottom:16, color:"#ff8888", fontFamily:"monospace", fontSize:12 }}>
                  ⚠ {apiError}
                </div>
              )}

              {isRefreshing && !hasLoaded && (
                <div style={{ textAlign:"center", padding:"80px 0", color:"#444", fontFamily:"monospace", fontSize:13 }}>
                  <div style={{ fontSize:24, marginBottom:12, animation:"pulse 1s infinite" }}>⟳</div>
                  Fetching live arbs from {Object.keys(SPORT_API_KEYS).length} sports...
                </div>
              )}

              {hasLoaded && filtered.length === 0 && !isRefreshing && (
                <div style={{ textAlign:"center", padding:"80px 0", color:"#2a2a2a", fontFamily:"monospace", fontSize:13 }}>
                  No arbs found right now. Try expanding your book selection, adjusting filters, or refreshing.
                </div>
              )}

              {filtered.map(arb => (
                <ArbCard
                  key={arb.id} arb={arb} bankroll={bankroll}
                  onLog={handleLog}
                  bookTaxes={bookTaxes}
                  isSelected={savedIds.includes(arb.id)}
                  onSelect={(id) => setSavedIds(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id])}
                />
              ))}
            </div>
          )}

          {tab === "tracker" && (
            <div style={{ animation:"fadeUp 0.3s ease" }}>
              <BetLog bets={loggedBets} onSettle={handleSettle} />
            </div>
          )}

          {tab === "settings" && (
            <div style={{ animation:"fadeUp 0.3s ease", maxWidth:560 }}>

              {/* API Key section */}
              <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:24, marginBottom:16 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#f0c040", fontFamily:"'Syne',sans-serif", marginBottom:4 }}>🔑 Odds API Key</div>
                <div style={{ fontSize:11, color:"#444", fontFamily:"monospace", marginBottom:16 }}>
                  Get your key at <span style={{ color:"#f0c040" }}>the-odds-api.com</span> · Free tier: 500 credits
                </div>

                {/* Current key status */}
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14, padding:"8px 12px", background:"rgba(255,255,255,0.02)", borderRadius:8, border:"1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background: userApiKey ? "#7dff88" : "#ff6666", flexShrink:0 }} />
                  <div style={{ fontSize:11, color: userApiKey ? "#7dff88" : "#ff6666", fontFamily:"monospace" }}>
                    {userApiKey ? `Key active: ${userApiKey.slice(0,6)}${"•".repeat(20)}${userApiKey.slice(-4)}` : "No API key set — running in demo mode"}
                  </div>
                </div>

                {/* Key input */}
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:9, color:"#444", fontFamily:"monospace", letterSpacing:2, marginBottom:6 }}>ENTER / UPDATE API KEY</div>
                  <input
                    id="apiKeyInput"
                    type="password"
                    defaultValue=""
                    placeholder="Paste your API key here..."
                    style={{
                      width:"100%", background:"rgba(255,255,255,0.04)",
                      border:"1px solid rgba(255,255,255,0.12)", borderRadius:8,
                      color:"#fff", padding:"10px 14px", fontSize:13,
                      fontFamily:"monospace", outline:"none", marginBottom:10
                    }}
                  />
                  <button
                    onClick={() => {
                      const val = document.getElementById("apiKeyInput").value.trim();
                      if (val.length > 10) {
                        API_KEY = val;
                        setUserApiKey(val);
                        document.getElementById("apiKeyInput").value = "";
                        setApiError(null);
                      }
                    }}
                    style={{
                      width:"100%", padding:"11px", borderRadius:9, border:"none",
                      background:"linear-gradient(135deg,#f0c040,#e08020)",
                      color:"#000", fontWeight:800, fontSize:13, cursor:"pointer",
                      fontFamily:"'Syne',sans-serif", letterSpacing:0.5
                    }}>
                    💾 Save API Key
                  </button>
                </div>
              </div>

              {/* Credits section */}
              <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:24, marginBottom:16 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#f0c040", fontFamily:"'Syne',sans-serif", marginBottom:16 }}>💳 Credit Balance</div>
                <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:12 }}>
                  <div style={{ flex:1, height:8, background:"rgba(255,255,255,0.06)", borderRadius:4, overflow:"hidden" }}>
                    <div style={{
                      height:"100%", borderRadius:4, transition:"width 0.5s",
                      width:`${Math.max(0,(credits.remaining/credits.total)*100)}%`,
                      background: credits.remaining < 100 ? "#ff6666" : credits.remaining < 500 ? "#f0c040" : "#7dff88"
                    }} />
                  </div>
                  <div style={{ fontSize:16, fontWeight:800, color:"#fff", fontFamily:"monospace", minWidth:100, textAlign:"right" }}>
                    {credits.remaining.toLocaleString()} <span style={{ fontSize:11, color:"#444" }}>/ {credits.total.toLocaleString()}</span>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                  {[
                    { plan:"Free",     credits:"500",    price:"$0/mo" },
                    { plan:"Basic",    credits:"20,000", price:"$30/mo" },
                    { plan:"Standard", credits:"100,000",price:"$59/mo" },
                  ].map(p => (
                    <div key={p.plan} style={{ textAlign:"center", background:"rgba(255,255,255,0.02)", borderRadius:8, padding:"10px 8px", border:"1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ fontSize:10, color:"#f0c040", fontFamily:"monospace", fontWeight:700 }}>{p.plan}</div>
                      <div style={{ fontSize:12, color:"#ddd", fontFamily:"monospace", margin:"4px 0" }}>{p.credits} cr</div>
                      <div style={{ fontSize:11, color:"#555", fontFamily:"monospace" }}>{p.price}</div>
                    </div>
                  ))}
                </div>
                <a href="https://the-odds-api.com/#get-access" target="_blank" rel="noopener noreferrer"
                  style={{ display:"block", textAlign:"center", marginTop:12, padding:"9px", borderRadius:8,
                    border:"1px solid rgba(240,192,64,0.3)", color:"#f0c040", fontSize:12,
                    fontFamily:"monospace", textDecoration:"none", fontWeight:700 }}>
                  → Buy More Credits at the-odds-api.com
                </a>
              </div>

              {/* Per-wager excise tax section */}
              <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:24 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#f0c040", fontFamily:"'Syne',sans-serif", marginBottom:4 }}>📋 Per-Wager Excise Tax</div>
                <div style={{ fontSize:11, color:"#444", fontFamily:"monospace", marginBottom:6 }}>
                  Flat fee charged per wager by some states/books. Leave blank if a book doesn't charge one.
                </div>
                <div style={{ fontSize:11, color:"#f0c04077", fontFamily:"monospace", marginBottom:16 }}>
                  💡 Illinois: $0.25 per wager on most books
                </div>
                <div style={{ maxHeight:280, overflowY:"auto", paddingRight:4 }}>
                  {BOOK_GROUPS.slice(0,3).map(group => (
                    <div key={group.label} style={{ marginBottom:14 }}>
                      <div style={{ fontSize:9, color:"#444", fontFamily:"monospace", letterSpacing:2, marginBottom:8 }}>{group.label}</div>
                      {group.books.map(book => (
                        <div key={book} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                          <span style={{ fontSize:12, color:"#888", fontFamily:"monospace", flex:1 }}>{book}</span>
                          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                            {bookTaxes[book] && (
                              <span style={{ fontSize:10, color:"#ff8866", fontFamily:"monospace" }}>
                                ${parseFloat(bookTaxes[book]).toFixed(2)}/wager
                              </span>
                            )}
                            <div style={{ position:"relative", width:90 }}>
                              <span style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", color:"#555", fontSize:12, fontFamily:"monospace" }}>$</span>
                              <input
                                type="number"
                                value={bookTaxes[book] || ""}
                                onChange={e => setBookTaxes(p => ({ ...p, [book]: e.target.value }))}
                                placeholder="—"
                                min="0" max="5" step="0.25"
                                style={{
                                  width:90, background:"rgba(255,255,255,0.04)",
                                  border:"1px solid rgba(255,255,255,0.08)", borderRadius:6,
                                  color:"#fff", padding:"5px 8px 5px 20px",
                                  fontSize:12, fontFamily:"monospace", outline:"none", textAlign:"right"
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
