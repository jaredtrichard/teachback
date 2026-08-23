"""Outline-derived note bodies for the 181 SIE bites.

Prose is unpacked from the FINRA SIE Content Outline ©2024 (the PDF this
repo already cites): official bullets, parentheticals, and Knowledge-of lists.
No paid API. No invented dollar figures, holding periods, or coverage limits.
A leftover that needs a number the outline does not print is labeled stub.

Authored demo bites (B008, B010, B019) are omitted here; the compiler keeps
the shipped kit copy.
"""

# Each entry: status, in_short (3), core (list), precision (list), criteria
# criteria items are (label, keys). Feedback is compiled.

NOTES = {}


def add(bite_id, status, in_short, core, precision, criteria):
    NOTES[bite_id] = {
        "status": status,
        "inShort": in_short,
        "core": core if isinstance(core, list) else [core],
        "precision": precision,
        "criteria": [
            {"label": label, "keys": keys} for label, keys in criteria
        ],
    }


# --- 1.1.1 SEC ---
add(
    "B001",
    "outline",
    [
        "Securities regulation exists to keep the public markets fair and informed",
        "The outline splits this from the SEC’s own jurisdiction and authority",
        "High-level purpose is the mission of the regime, not one form or fee",
    ],
    "The official outline opens the exam with the high-level purpose and mission of securities regulation, then separately asks for the SEC’s definition, jurisdiction, and authority. Regulation is the reason the other three sections exist: products, trading, and the rulebook sit under a public-market mission, not a private club’s.",
    [
        "The SIE itself is framed as basic knowledge of terminology, products, market structure, regulators, and prohibited practices.",
        "Foundational acts the outline names: Securities Act of 1933, Securities Exchange Act of 1934, Investment Company Act of 1940, Investment Advisers Act of 1940.",
        "stub: a one-sentence ‘investor-protection vs capital-formation’ slogan is not printed on the outline.",
    ],
    [
        ("Names the public-market purpose", ["fair|protect|public|mission"]),
        ("Keeps purpose separate from SEC mechanics", ["sec|regulation|mission|purpose"]),
    ],
)
add(
    "B002",
    "outline",
    [
        "The SEC is the federal securities regulator",
        "Jurisdiction is the U.S. securities markets and the people in them",
        "Authority is the power to write, examine, and enforce under the federal acts",
    ],
    "Definition, jurisdiction, and authority of the SEC is its own official bullet. The Commission is not an SRO and not a banking regulator. The outline’s foundation list (’33 Act, ’34 Act, Investment Company Act, Advisers Act) is the statutory floor under that authority.",
    [
        "The SEC sits above the SROs named in the next leaf (CBOE, FINRA, MSRB).",
        "Registration of securities, brokers, and exchanges is a ’34 Act / ’33 Act theme the outline cites later under offerings.",
        "stub: exact enforcement-division org chart is not on the outline.",
    ],
    [
        ("Defines the SEC as the federal securities regulator", ["sec", "federal|jurisdiction|authority"]),
        ("Does not confuse the SEC with an SRO", ["sec"]),
    ],
)

# --- 1.1.2 SROs ---
add(
    "B003",
    "outline",
    [
        "An SRO writes and polices rules for its own market and members",
        "Purpose and mission is a separate bullet from jurisdiction and authority",
        "Self-regulatory does not mean unsupervised — the SEC still sits above",
    ],
    "The outline asks for the purpose and mission of an SRO as its own bite. An SRO is a self-regulatory organization: it makes conduct rules, examines members, and can discipline them for its market. That is why the next bullet names specific SROs rather than restating the SEC.",
    [
        "Purpose/mission here; named bodies (CBOE, FINRA, MSRB) live on the next bite.",
        "The exam also tests SRO qualification and registration in Section 4.",
        "stub: which examinations FINRA vs an exchange staff actually run is not printed here.",
    ],
    [
        ("States what an SRO is for", ["sro|self-regulatory|self regulatory", "rule|member|mission|purpose"]),
        ("Keeps SROs under the SEC, not instead of it", ["sro|sec|self"]),
    ],
)
add(
    "B004",
    "outline",
    [
        "The outline names three SROs: CBOE, FINRA, and MSRB",
        "Each SRO’s reach is its members and its market",
        "Jurisdiction and authority is the ‘who can touch whom’ bite",
    ],
    "Jurisdiction and authority of SROs is illustrated with CBOE, FINRA, and MSRB. Those are the only SRO names the outline prints in this leaf. Treat them as the official set for this bite; do not invent a fourth.",
    [
        "CBOE — options exchange SRO named in the parenthetical.",
        "FINRA — broker-dealer SRO named in the parenthetical.",
        "MSRB — municipal SRO named in the parenthetical.",
        "stub: who enforces MSRB rules day to day is not printed on this bullet.",
    ],
    [
        ("Names the outline’s three SROs", ["finra", "msrb|cboe"]),
        ("Talks jurisdiction, not just the acronym", ["jurisdiction|authority|member|market"]),
    ],
)

# --- 1.1.3 other regulators ---
add(
    "B005",
    "outline",
    [
        "Treasury / IRS sit on the ‘other regulators’ list, not under the SEC bullet",
        "The pairing is one official bullet: Department of the Treasury/IRS",
        "They are tax and fiscal, not the securities SRO",
    ],
    "The outline groups Department of the Treasury/IRS with the Fed, state regulators, SIPC, and FDIC as other regulators and agencies. The slash is the official wording: one bullet, two names. This is not the SEC and not FINRA.",
    [
        "Same leaf as NASAA, the Federal Reserve, SIPC, and FDIC.",
        "Fiscal policy (later in 1.3.1) is the congressional/Treasury side of the monetary-vs-fiscal cut.",
        "stub: which IRS form or Treasury bureau an SIE item might name is not printed here.",
    ],
    [
        ("Places Treasury/IRS among other regulators", ["treasury|irs", "tax|fiscal|regulator"]),
        ("Does not call them an SRO", ["treasury|irs"]),
    ],
)
add(
    "B006",
    "outline",
    [
        "State securities regulators are their own official bullet",
        "The outline’s example is NASAA",
        "Blue-sky shows up again under offerings and under registration in Section 4",
    ],
    "State regulators (e.g., NASAA) are listed next to Treasury/IRS and the Fed. NASAA is the only state-side name the outline prints in this leaf. State registration / blue-sky is a later official example under offerings and again under SRO registration.",
    [
        "NASAA is the North American Securities Administrators Association — the outline’s example, not a fourth federal SRO.",
        "Blue-sky laws are named later at 1.4 and 4.1.1.",
        "stub: a particular state’s notice-filing recipe is not on the outline.",
    ],
    [
        ("Names NASAA / state regulators", ["state|nasaa", "blue|regulat"]),
        ("Keeps them off the federal SRO list", ["state|nasaa"]),
    ],
)
add(
    "B007",
    "outline",
    [
        "The Federal Reserve is an ‘other regulator’ here and a whole leaf in 1.3.1",
        "This bite is who it is; open-market activity and rates live later",
        "It is not the SEC and not FDIC",
    ],
    "The Federal Reserve is named as its own other-regulator bullet. The outline comes back to the Fed in 1.3.1 for monetary vs fiscal policy, open-market activity, and the named rates (interest rate, discount rate, federal funds rate). Do not dump those tools into this bite.",
    [
        "This leaf: identity among other agencies.",
        "1.3.1: what the Fed does to business activity and market stability.",
        "stub: current target-rate numbers are not on the outline and do not belong in a note.",
    ],
    [
        ("Identifies the Fed as a regulator/agency", ["federal", "reserve"]),
        ("Leaves tools and rates to 1.3.1", ["fed|reserve|monetary|regulator"]),
    ],
)
add(
    "B009",
    "outline",
    [
        "FDIC is the bank-deposit backstop on the same leaf as SIPC",
        "The outline lists them as two bullets, not one blended fund",
        "This note does not repeat SIPC’s authored figures",
    ],
    "Federal Deposit Insurance Corporation (FDIC) is the official companion bullet to SIPC. The outline wants them as different agencies. SIPC’s authored note already draws the brokerage-vs-bank line; this bite is the bank side of that cut, without inventing a coverage number the outline does not print here.",
    [
        "FDIC sits under Other Regulators and Agencies, next to SIPC.",
        "Neither name is an SRO in the 1.1.2 parenthetical.",
        "stub: a dollar coverage figure for FDIC is not printed on this outline bullet. Do not borrow one.",
    ],
    [
        ("Places FDIC on bank deposits, not brokerage", ["fdic", "bank|deposit"]),
        ("Keeps FDIC separate from SIPC", ["fdic"]),
    ],
)

# --- 1.1.4 market participants ---
add(
    "B011",
    "outline",
    [
        "Broker-dealers are named with three examples: introducing, clearing, prime",
        "The cut is role in the trade, not ‘stockbroker’ as a personality",
        "They are not investment advisers and not municipal advisors — those are the next bullets",
    ],
    "The outline’s broker-dealer bullet is the trio introducing, clearing, and prime brokers. That is the official split for this bite. Introducing vs clearing is about who carries the customer and the trade; prime is named, not defined, on the outline.",
    [
        "Introducing, clearing, prime — the only BD types printed here.",
        "Investment advisers and municipal advisors are separate official bullets.",
        "stub: carry / omnibus mechanics and prime-broker legal definitions are not printed.",
    ],
    [
        ("Names introducing / clearing / prime", ["introducing|clearing|prime", "broker"]),
        ("Does not merge BDs into advisers", ["broker"]),
    ],
)
add(
    "B012",
    "outline",
    [
        "Investment advisers are their own official participant",
        "The Advisers Act is one of the four foundational acts on page 2",
        "This is not the broker-dealer bullet and not the municipal-advisor bullet",
    ],
    "Investment advisers sit in the market-participants list as a standalone bullet. The outline does not unpack IA vs BD standards here; it just names the role. The Investment Advisers Act of 1940 is listed in the exam’s foundation paragraph, which is as far as this mockup will go.",
    [
        "Separate from broker-dealers (introducing / clearing / prime).",
        "Separate from municipal advisors, the next bullet.",
        "stub: fiduciary vs Reg BI wording is not printed on this bullet.",
    ],
    [
        ("Names investment advisers as their own role", ["investment", "adviser|advisor"]),
        ("Does not collapse them into broker-dealers", ["adviser|advisor"]),
    ],
)
add(
    "B013",
    "outline",
    [
        "Municipal advisors are a named participant, not a nickname for underwriters",
        "They show up again under offerings (roles of participants)",
        "MSRB is the municipal SRO named in 1.1.2",
    ],
    "Municipal advisors are their own 1.1.4 bullet and are named again in 1.4’s ‘roles of participants’ example list (investment bankers, underwriting syndicate, municipal advisors). Keep the role distinct from the issuer and from the underwriter.",
    [
        "1.1.4 names the role.",
        "1.4 names municipal advisors among offering participants.",
        "stub: municipal-advisor registration trigger facts are not printed here.",
    ],
    [
        ("Names municipal advisors as a distinct role", ["municipal", "advisor|adviser"]),
        ("Does not call them the underwriter", ["municipal"]),
    ],
)
add(
    "B014",
    "outline",
    [
        "Issuers raise capital; underwriters help distribute the issue",
        "The pair is one official bullet",
        "Follow the money later in the primary-market bite to see who receives proceeds",
    ],
    "Issuers and underwriters are listed as one participant bullet. The issuer is the entity whose securities are being sold; the underwriter is on the distribution side. Types of offerings (public/private, IPO/follow-on, best efforts/firm commitment) live in 1.4, not here.",
    [
        "Primary-market proceeds go to the issuer (authored B019).",
        "Underwriting syndicate is named again under 1.4 roles.",
        "stub: spread / concession math is not on this bullet.",
    ],
    [
        ("Separates issuer from underwriter", ["issuer", "underwriter"]),
        ("Ties them to bringing an issue to market", ["issuer|underwriter|offering|capital"]),
    ],
)
add(
    "B015",
    "outline",
    [
        "Traders and market makers are one official participant bullet",
        "Market making is quoting a two-sided market; trading is taking positions",
        "They are not the transfer agent and not the depository",
    ],
    "Traders and market makers sit between underwriters and the custody/clearing names. The outline does not define either term here; it names the pair. Payments for market making appear later as a cited FINRA rule under Section 1 (FINRA 5250) — a citation, not a number.",
    [
        "Same leaf as BDs, advisers, issuers, custodians, transfer agents, DTCC/OCC.",
        "FINRA 5250 (Payments for Market Making) is on the Section 1 rule list.",
        "stub: inside-spread obligations are not printed on this bullet.",
    ],
    [
        ("Names traders and market makers", ["trader|traders", "market maker|market makers|market-maker"]),
        ("Does not mix them up with clearing names", ["trader|maker"]),
    ],
)
add(
    "B016",
    "outline",
    [
        "Custodians and trustees hold or oversee assets for someone else",
        "One official bullet, two names",
        "They are not the transfer agent and not DTCC",
    ],
    "Custodians and trustees are the safekeeping / fiduciary names on the participant list. The outline does not split their legal duties here. Transfer agents and depositories/clearing corporations are the next two bullets — keep the pile from collapsing.",
    [
        "Next bite: transfer agents.",
        "Bite after that: DTCC and OCC.",
        "stub: who is a qualified custodian under which act is not printed here.",
    ],
    [
        ("Names custodians and trustees", ["custodian", "trustee"]),
        ("Keeps them off the DTCC/transfer-agent bullets", ["custodian|trustee"]),
    ],
)
add(
    "B017",
    "outline",
    [
        "Transfer agents keep the issuer’s security-holder records",
        "Their own official bullet, not a nickname for DTCC",
        "Corporate actions later (Section 3) are why this role exists",
    ],
    "Transfer agents are named alone. They sit between custodians/trustees and the depository/clearing names. The outline does not list their functions here; corporate actions (splits, proxies, rights offerings) in 3.1.4 are the later place those functions show up.",
    [
        "Not the depository. Not the clearing corporation.",
        "3.1.4 names notices, proxies, and adjustments that run through this plumbing.",
        "stub: exact books-and-records rule number for transfer agents is not on this bullet.",
    ],
    [
        ("Names transfer agents as recordkeepers", ["transfer", "agent"]),
        ("Does not call them the depository", ["transfer"]),
    ],
)
add(
    "B018",
    "outline",
    [
        "The outline names two: DTCC and OCC",
        "Depositories and clearing corporations sit at the end of the participant list",
        "OCC also returns under listed options in 2.1.3",
    ],
    "Depositories and clearing corporations are illustrated with DTCC and OCC — the only two names the outline prints on this bullet. DTCC is the depository/clearing name; OCC is the listed-options clearer and is named again under options.",
    [
        "DTCC — Depository Trust & Clearing Corporation.",
        "OCC — Options Clearing Corporation, reused in 2.1.3.",
        "stub: which subsidiary does NSCC vs DTC is not printed here.",
    ],
    [
        ("Names DTCC and OCC", ["dtcc", "occ"]),
        ("Places them as depository / clearing", ["depositor|clearing"]),
    ],
)

# --- 1.2.1 markets ---
add(
    "B020",
    "outline",
    [
        "Secondary market: investors trade existing securities with each other",
        "The outline’s examples are electronic, OTC, and physical",
        "Proceeds do not go to the issuer — that was the primary-market bite",
    ],
    "The secondary market is named with three venue flavors: electronic, over-the-counter (OTC), and physical. Follow the money from the authored primary-market note: secondary trades move existing shares between investors.",
    [
        "Electronic, OTC, physical — the official examples.",
        "Third and fourth markets are the next two bullets, not synonyms for OTC.",
        "stub: a named exchange list is not printed on this bullet.",
    ],
    [
        ("Secondary = investors trade existing securities", ["secondary", "investor|existing|otc|electronic"]),
        ("Names electronic / OTC / physical", ["otc|electronic|physical"]),
    ],
)
add(
    "B021",
    "outline",
    [
        "The third market is its own official bullet",
        "It sits after secondary (electronic / OTC / physical) and before the fourth market",
        "The outline does not define it in a parenthetical — do not invent a venue list",
    ],
    "The third market is printed as a standalone type-of-market bullet. The outline does not add an e.g. list. This mockup will not invent one. Keep it distinct from the secondary-market venues and from the fourth market.",
    [
        "Order on the outline: primary, secondary, third, fourth.",
        "stub: ‘exchange-listed stock traded OTC’ is industry language, not printed here. Leave the definition unlabeled rather than fake a precision line.",
        "stub: named ATS / dark-pool examples are not on the outline.",
    ],
    [
        ("Treats third market as its own type", ["third", "market"]),
        ("Does not collapse it into secondary OTC", ["third"]),
    ],
)
add(
    "B022",
    "outline",
    [
        "The fourth market is its own official bullet",
        "Last of the four types-of-markets names",
        "No parenthetical on the outline — do not invent one",
    ],
    "The fourth market is the last types-of-markets bullet. Like the third market, the outline prints the name and nothing else. Keep it as its own type.",
    [
        "Primary / secondary / third / fourth is the official four-part cut.",
        "stub: institution-to-institution / ECN folklore is not printed here.",
    ],
    [
        ("Treats fourth market as its own type", ["fourth", "market"]),
        ("Keeps it last in the four-market list", ["fourth"]),
    ],
)

# --- 1.3.1 Fed impact ---
add(
    "B023",
    "outline",
    [
        "Monetary policy is the central bank; fiscal policy is taxing and spending",
        "The outline pairs them as one bullet under the Fed’s impact leaf",
        "Do not dump open-market operations into this bite — that is the next one",
    ],
    "Monetary vs. fiscal policy is the first 1.3.1 bullet. Monetary is the Federal Reserve’s side; fiscal is the Treasury / Congress side already hinted at by the Treasury/IRS bullet. The next two bites own open-market activity and the named rates.",
    [
        "Monetary — Fed. Fiscal — taxing and spending.",
        "Open market activities = next official bullet.",
        "Different rates (interest, discount, fed funds) = the bullet after that.",
    ],
    [
        ("Splits monetary from fiscal", ["monetary", "fiscal"]),
        ("Gives each side to the right actor", ["fed|reserve|treasury|congress|tax|spend"]),
    ],
)
add(
    "B024",
    "outline",
    [
        "Open-market activity is a named Fed tool on this leaf",
        "The outline asks for the impact on the economy, not a current rate print",
        "Rates themselves are the next bullet",
    ],
    "Open market activities and impact on economy is its own official bullet between monetary-vs-fiscal and the named rates. The outline does not print a buy/sell recipe here. Keep this as the activity; keep the named rates on B025.",
    [
        "This leaf is the Fed’s impact on business activity and market stability.",
        "stub: reserve-requirement or repo-facility names are not printed on this bullet.",
        "Do not quote a funds-rate target. The outline never does.",
    ],
    [
        ("Names open-market activity as a Fed tool", ["open", "market"]),
        ("Ties it to the economy, not a trivia print", ["econom|activity|fed|reserve"]),
    ],
)
add(
    "B025",
    "outline",
    [
        "The outline names three rates: interest rate, discount rate, federal funds rate",
        "They live under the Fed’s impact leaf",
        "No current prints — the names are the bite",
    ],
    "Different rates (e.g., interest rate, discount rate, federal funds rate) is the official trio. That is the whole precision this mockup will claim. Which rate is ‘the’ policy rate this year is not an outline fact.",
    [
        "Interest rate, discount rate, federal funds rate — the printed examples.",
        "Monetary vs fiscal and open-market activity are the sibling bullets.",
        "stub: which one is charged to depository institutions at the window is not printed here.",
    ],
    [
        ("Names discount and fed funds", ["discount", "federal funds|fed funds"]),
        ("Treats them as different rates", ["rate"]),
    ],
)

# --- 1.3.2 business factors ---
add(
    "B026",
    "outline",
    [
        "Financial statements exist to show the business; two examples are named",
        "Balance sheet and income statement are the outline’s e.g. list",
        "This is not the indicators bite and not the business-cycle bite",
    ],
    "Purpose of financial statements (e.g., balance sheet, income statement) is the official pairing. The outline asks for purpose, then names those two statements. It does not name the cash-flow statement here.",
    [
        "Balance sheet and income statement — the printed examples.",
        "stub: cash-flow statement, 10-K filing clocks, and ratio laundry lists are not on this bullet.",
    ],
    [
        ("Names balance sheet and income statement", ["balance", "income"]),
        ("Talks purpose, not a filing clock", ["statement|purpose|financial"]),
    ],
)
add(
    "B027",
    "outline",
    [
        "The outline’s cycle is contraction, trough, expansion, peak",
        "Four named phases, one official bullet",
        "Indicators and market-style effects are the next bites",
    ],
    "Business cycle (e.g., contraction, trough, expansion, peak) prints a four-word loop. Use those four. Do not add a fifth phase the outline did not.",
    [
        "Contraction, trough, expansion, peak — official examples.",
        "Leading / lagging / coincident / inflation live on the indicators bite.",
        "Cyclical / defensive / growth live on the market-effects bite.",
    ],
    [
        ("Names the four phases", ["contraction|trough", "expansion|peak"]),
        ("Calls it the business cycle", ["cycle|business"]),
    ],
)
add(
    "B028",
    "outline",
    [
        "Indicators: leading, lagging, coincident, plus inflation",
        "Four official examples on one bullet",
        "This is not the four-phase cycle and not Keynes vs monetarist",
    ],
    "Indicators (e.g., leading, lagging, coincident, inflation) is the official set. Inflation is printed as an indicator example, not as its own leaf. Do not invent which CPI print is ‘the’ exam item.",
    [
        "Leading, lagging, coincident, inflation — the printed list.",
        "stub: a named series (housing starts, unemployment) is not on this bullet.",
    ],
    [
        ("Names leading / lagging / coincident", ["leading", "lagging|coincident"]),
        ("Includes inflation as an outline example", ["inflation|indicator"]),
    ],
)
add(
    "B029",
    "outline",
    [
        "Bond and equity markets react differently across the cycle",
        "The outline’s style words are cyclical, defensive, growth",
        "This is the effects bite, not the statements bite",
    ],
    "Basic effects on bond and equity markets (e.g., cyclical, defensive, growth) is the official trio of style labels. The outline does not print a ‘rising-rates → bond prices’ sentence here — that relationship is its own debt-instrument bite in 2.1.2.",
    [
        "Cyclical, defensive, growth — the printed examples.",
        "Price vs interest rate for bonds is B057.",
        "stub: a sector map (airlines vs utilities) is not printed here.",
    ],
    [
        ("Names cyclical / defensive / growth", ["cyclical", "defensive|growth"]),
        ("Applies them to bond or equity markets", ["bond|equity|market"]),
    ],
)
add(
    "B030",
    "outline",
    [
        "Two official theories: Keynesian and Monetarist",
        "They sit at the end of the business-factors leaf",
        "This is not the Fed-tools bite",
    ],
    "Principal economic theories (e.g., Keynesian, Monetarist) prints exactly two names. Use those two. Do not add a third school.",
    [
        "Keynesian and Monetarist — the official examples.",
        "Monetary vs fiscal (B023) is the policy cut; this is the theory cut.",
        "stub: a named economist-quote is not required by the outline.",
    ],
    [
        ("Names Keynesian and Monetarist", ["keynes", "monetar"]),
        ("Treats them as the outline’s two theories", ["theor"]),
    ],
)

# --- 1.3.3 international ---
add(
    "B031",
    "outline",
    [
        "U.S. balance of payments is its own official international bullet",
        "It sits with GDP/GNP and exchange rates",
        "The outline does not print a surplus/deficit recipe",
    ],
    "U.S. balance of payments is the first 1.3.3 bullet. The outline names it and stops. This mockup will not invent current-account line items.",
    [
        "Sibling bullets: GDP/GNP, exchange rates.",
        "stub: current-account vs capital-account split is not printed here.",
    ],
    [
        ("Names the U.S. balance of payments", ["balance", "payment"]),
        ("Keeps it on the international leaf", ["balance|international|us|u.s"]),
    ],
)
add(
    "B032",
    "outline",
    [
        "GDP and GNP are the two official product names",
        "They share one bullet",
        "This is not the exchange-rate bite",
    ],
    "Gross domestic product (GDP), gross national product (GNP) is the official pairing. The outline wants both acronyms. It does not print the ‘within the border vs by nationals’ sentence — that sentence is industry language, so it stays out of Precision.",
    [
        "GDP and GNP — both printed.",
        "stub: the border-vs-nationality distinction is not printed on the outline. Leave it unlabeled rather than fake mastery.",
    ],
    [
        ("Names GDP and GNP", ["gdp", "gnp"]),
        ("Treats them as product measures", ["gross|product"]),
    ],
)
add(
    "B033",
    "outline",
    [
        "Exchange rates are the last international bullet",
        "The outline prints the name, not a quote or a formula",
        "Currency risk returns as a named risk type in 2.2",
    ],
    "Exchange rates is a one-line official bullet. Currency is also a named risk type later (2.2). Do not invent a strong-dollar sector map.",
    [
        "1.3.3 names the rate.",
        "2.2 names currency as a risk type.",
        "stub: bid/ask on a cable quote is not on this bullet.",
    ],
    [
        ("Names exchange rates", ["exchange", "rate"]),
        ("Leaves currency risk to 2.2", ["exchange|currency"]),
    ],
)

# --- 1.4 offerings ---
add(
    "B034",
    "outline",
    [
        "Offering participants the outline names: investment bankers, underwriting syndicate, municipal advisors",
        "Roles of participants is the first 1.4 bullet",
        "Municipal advisors were already a 1.1.4 role — here they are on a deal",
    ],
    "Roles of participants (e.g., investment bankers, underwriting syndicate, municipal advisors) is the official trio for this bite. Issuers and underwriters were named as market participants; this bullet is the offering-side cast.",
    [
        "Investment bankers, underwriting syndicate, municipal advisors — printed examples.",
        "Methods of distribution (best efforts, firm commitment) live under types of offerings.",
        "MSRB G-11 / G-32 / G-34 sit on the Section 1 rule list for primary offerings.",
    ],
    [
        ("Names bankers / syndicate / municipal advisors", ["investment banker|syndicate", "municipal"]),
        ("Puts them on an offering, not on secondary trading", ["offering|underwrit|syndicate"]),
    ],
)
add(
    "B035",
    "outline",
    [
        "Public vs private is the first official cut",
        "IPO, secondary offering, and follow-on offering is the second",
        "Methods of distribution: best efforts and firm commitment",
    ],
    "Types of offerings unpacks three nested official lists: public vs private; IPO / secondary / follow-on; and methods of distribution (e.g., best efforts, firm commitment). Those nested lines are the note. Follow-on vs secondary is already drawn in the authored primary-market bite (new shares vs existing).",
    [
        "Public vs. private securities offering.",
        "Initial public offering (IPO), secondary offering and follow-on offering.",
        "Methods of distribution (e.g., best efforts, firm commitment).",
        "Section 1 cites Regulation D, Rule 144, 144A, and 147 — names only.",
    ],
    [
        ("Splits public from private", ["public", "private"]),
        ("Names IPO / follow-on / distribution method", ["ipo|follow-on|follow on", "best efforts|firm commitment"]),
    ],
)
add(
    "B036",
    "outline",
    [
        "Shelf registrations are defined by the outline as definition + purpose",
        "They sit next to types of offerings, not inside them",
        "No cooling-off clock is printed here",
    ],
    "Shelf registrations and distributions (e.g., definition, purpose) is the official prompt. The outline wants what a shelf is for, not a day-count. Do not invent a two-year window.",
    [
        "Definition and purpose — the printed e.g.",
        "’33 Act registration sections are cited on the Section 1 rule list.",
        "stub: how long a shelf lasts is not printed on this bullet.",
    ],
    [
        ("Names shelf registration", ["shelf"]),
        ("Talks definition or purpose", ["purpose|defin|register|distribution"]),
    ],
)
add(
    "B037",
    "outline",
    [
        "Three official documents: official statement, program disclosure document, prospectus",
        "The bite is types, purpose, and delivery requirements",
        "Which document goes with which product is the point of the three names",
    ],
    "Types and purpose of offering documents and delivery requirements names official statement, program disclosure document, and prospectus. Those three are the outline’s set. Municipal fund securities later (2.1.5) are why a program disclosure document exists as a name.",
    [
        "Prospectus — the ’33 Act name (Sections 7, 10 cited on the rule list).",
        "Official statement — municipal primary disclosure (MSRB G-32 cited).",
        "Program disclosure document — the third printed example.",
        "stub: how many days after the trade a particular document must arrive is not printed here.",
    ],
    [
        ("Names prospectus and official statement", ["prospectus", "official statement"]),
        ("Includes delivery, not just the cover title", ["deliver|disclosure|document"]),
    ],
)
add(
    "B038",
    "outline",
    [
        "Filing is federal (SEC) and state (blue-sky laws)",
        "The outline pairs requirements with exemptions",
        "This is not the document-delivery bite",
    ],
    "Regulatory filing requirements and exemptions (e.g., SEC, blue-sky laws) is the official pair. Blue-sky already appeared as a state-regulator theme. Exemptions are why Regulation D / 144 / 144A / 147 are on the Section 1 citation list — names, not recipes.",
    [
        "SEC and blue-sky laws — the printed examples.",
        "Cited exemption names on the outline’s rule list: Regulation D, 144, 144A, 147.",
        "stub: accredited-investor dollar tests live on the authored investors note, not here.",
    ],
    [
        ("Names SEC and blue-sky", ["sec", "blue"]),
        ("Includes exemptions, not only filings", ["exempt|filing|requirement"]),
    ],
)

# --- 2.1.1 equities ---
add(
    "B039",
    "outline",
    [
        "Five official equity types: common, preferred, rights, warrants, ADRs",
        "This bite is the type list; ownership / voting / convertible / Rule 144 are later",
        "Do not flatten them into ‘stock’",
    ],
    "Types of equities unpacks the outline’s nested list: common stock, preferred stock, rights, warrants, American Depositary Receipts (ADRs). Those five names are the note.",
    [
        "Common stock, preferred stock, rights, warrants, ADRs — official nested types.",
        "Ownership, voting, convertible, and Rule 144 are the Knowledge-of bullets that follow.",
        "stub: warrant vs right time-to-expiry numbers are not printed.",
    ],
    [
        ("Names common and preferred", ["common", "preferred"]),
        ("Includes rights, warrants, or ADRs", ["right|warrant|adr"]),
    ],
)
add(
    "B040",
    "outline",
    [
        "Ownership knowledge the outline names: order of liquidation, limited liability",
        "This is the equity Knowledge-of bite, not the type list",
        "Limited liability is why equity sits below debt in a liquidation story",
    ],
    "Ownership (e.g., order of liquidation, limited liability) is the first Knowledge-of bullet under equities. The outline wants those two ideas, not a full cap-stack diagram.",
    [
        "Order of liquidation and limited liability — the printed examples.",
        "stub: a numbered creditor waterfall (unpaid wages vs debentures) is not printed here.",
    ],
    [
        ("Names limited liability", ["limited", "liability"]),
        ("Names order of liquidation", ["liquidat"]),
    ],
)
add(
    "B041",
    "outline",
    [
        "Voting rights is its own equity Knowledge-of bullet",
        "The outline prints the name, not statutory vs cumulative",
        "This is not the convertible bite",
    ],
    "Voting rights stands alone under equity Knowledge of. The outline does not add an e.g. list. Common vs preferred voting is a type-list implication, not a printed rule here.",
    [
        "A Knowledge-of item next to ownership, convertible, and Rule 144.",
        "stub: cumulative vs statutory math is not printed on this bullet.",
    ],
    [
        ("Names voting rights", ["voting", "right"]),
        ("Keeps it on equity, not on debt covenants", ["voting|share|stock|equity"]),
    ],
)
add(
    "B042",
    "outline",
    [
        "Convertible is an equity Knowledge-of bullet and a debt feature later",
        "Here it sits under equities (preferred / related)",
        "The outline prints the word, not a parity formula",
    ],
    "Convertible is a one-word Knowledge-of bullet under equities. Debt instruments later have their own ‘callable and convertible features’ bite. Do not dump conversion-ratio math into this mockup.",
    [
        "Equity leaf here; debt features at B055.",
        "stub: conversion-ratio / parity numbers are not printed.",
    ],
    [
        ("Names convertible as the feature", ["convertible|conversion"]),
        ("Does not invent a formula", ["convertible|preferred|bond|equity"]),
    ],
)
add(
    "B043",
    "outline",
    [
        "Control and restrictions — the outline’s example is SEC Rule 144",
        "This is the restricted / control-person bite",
        "Rule 144 is also cited on the Section 1 offerings rule list",
    ],
    "Control and restrictions (e.g., SEC Rule 144) is the last equity Knowledge-of bullet. The only printed example is Rule 144. Do not invent holding periods or volume caps.",
    [
        "SEC Rule 144 — the official example.",
        "Section 1 already cites 144 and 144A by number.",
        "stub: six-month clocks and volume tests are not printed on this bullet.",
    ],
    [
        ("Names Rule 144", ["144"]),
        ("Talks control or restrictions", ["control|restrict"]),
    ],
)

# --- 2.1.2 debt ---
add(
    "B044",
    "outline",
    [
        "Treasury securities the outline names: bills, notes, receipts, bonds",
        "This is the type bite; auction is a later Knowledge-of item",
        "No coupon math here",
    ],
    "Treasury securities (e.g., bills, notes, receipts, bonds) is the official four-name set. Receipts are printed; do not rename them into a product the outline did not.",
    [
        "Bills, notes, receipts, bonds — official examples.",
        "Auction is its own Knowledge-of bullet (B059).",
        "stub: which maturity band is a note vs a bond is not printed here.",
    ],
    [
        ("Names bills and bonds", ["bill", "bond|note"]),
        ("Includes receipts or notes", ["receipt|note|treasury"]),
    ],
)
add(
    "B045",
    "outline",
    [
        "Agency here is illustrated with asset-backed and mortgage-backed securities",
        "The outline folds ABS/MBS into the agency bullet",
        "Prepayment risk returns as a named risk type in 2.2",
    ],
    "Agency (e.g., asset-backed and mortgage-backed securities) is the official pairing. The outline does not name a specific agency issuer on this bullet.",
    [
        "Asset-backed and mortgage-backed — the printed examples.",
        "Prepayment is a 2.2 risk type.",
        "stub: Ginnie vs Fannie/Freddie backing language is not printed here.",
    ],
    [
        ("Names asset-backed or mortgage-backed", ["asset-backed|mortgage-backed|abs|mbs"]),
        ("Places them on the agency bullet", ["agency|mortgage|asset"]),
    ],
)
add(
    "B046",
    "outline",
    [
        "Corporate bonds are their own official debt type",
        "Features (callable, convertible, ratings, coupon, par) are later Knowledge-of bites",
        "This bite is the issuer class, not the indenture",
    ],
    "Corporate bonds stand alone between agency and municipal. Everything the outline wants you to ‘know of’ about debt — maturities, income, coupon, par, yield, ratings, call/convert, price vs rate, negotiated vs competitive, auction — is a later bite.",
    [
        "Type name only on this bullet.",
        "Do not steal B055–B058 into this note.",
    ],
    [
        ("Names corporate bonds", ["corporate", "bond"]),
        ("Leaves features to the Knowledge-of bites", ["corporate|bond"]),
    ],
)
add(
    "B047",
    "outline",
    [
        "Municipal securities nest three official flavors",
        "General obligation (GO) bonds, revenue bonds, and others",
        "Others = special type bonds, taxable municipal securities, short-term obligations",
    ],
    "Municipal securities unpack into GO bonds, revenue bonds, and others (special type bonds, taxable municipal securities, short-term obligations). Those nested names are the note. Tax treatment of munis is not a separate official bite on this outline.",
    [
        "GO vs revenue is the first municipal cut.",
        "Others: special type, taxable municipal, short-term obligations.",
        "stub: a taxable-equivalent-yield formula is not printed here.",
    ],
    [
        ("Names GO and revenue", ["general obligation|go bond|go bonds", "revenue"]),
        ("Allows an ‘other’ municipal flavor", ["taxable|short-term|special|municipal"]),
    ],
)
add(
    "B048",
    "outline",
    [
        "Other debt: money market instruments, CDs, bankers’ acceptances, commercial paper",
        "This is the last type bullet before the Knowledge-of list",
        "Short-term vs long-term characteristics is a later bite — do not merge them",
    ],
    "Others (e.g., money market instruments, certificate of deposit (CD), bankers’ acceptance, commercial paper) is the official leftover type list. Use those names.",
    [
        "Money market, CD, bankers’ acceptance, commercial paper — printed examples.",
        "stub: a maximum money-market maturity in days is not printed here.",
    ],
    [
        ("Names commercial paper or bankers’ acceptances", ["commercial paper|bankers", "money market|cd|certificate"]),
        ("Keeps them on the ‘other’ debt list", ["money|paper|acceptance|cd"]),
    ],
)
add(
    "B049",
    "outline",
    [
        "Varying maturities is the first debt Knowledge-of bullet",
        "Bills vs notes vs bonds already hinted at this on the Treasury type bite",
        "No day-count is printed",
    ],
    "Varying maturities is a one-line Knowledge-of item. The outline wants the idea that debt is dated, not a schedule of official tenors.",
    [
        "Sibling Knowledge-of items: income, coupon, par, yield, ratings, call/convert, short vs long, price vs rate, negotiated vs competitive, auction.",
        "stub: 4-week / 10-year / 30-year labels are not printed here.",
    ],
    [
        ("Names maturities as the knowledge", ["matur"]),
        ("Keeps it on debt", ["bond|debt|note|bill|matur"]),
    ],
)
add(
    "B050",
    "outline",
    [
        "Debt generates income; the outline’s example is interest",
        "Dividends live under equities / investment returns, not here",
        "Coupon value is the next bite — do not steal it",
    ],
    "Generate income (e.g., interest) is the official example. Interest is the printed word. Coupon, par, and yield are the next three Knowledge-of bullets.",
    [
        "Interest — the printed example.",
        "Investment-return components (interest, dividends, gains) return in 3.1.2.",
    ],
    [
        ("Names interest as the income", ["interest"]),
        ("Puts it on debt, not on stock dividends", ["interest|income|coupon|bond"]),
    ],
)
add(
    "B051",
    "outline",
    [
        "Coupon value is its own Knowledge-of bullet",
        "It sits between ‘generate income’ and par value",
        "The outline does not print a formula",
    ],
    "Coupon value is a named debt fact. The outline does not say ‘stated annual interest on par.’ This mockup will not invent the textbook sentence as if the PDF printed it.",
    [
        "Order on the outline: income → coupon → par → yield.",
        "stub: coupon vs current-yield algebra is not printed here.",
    ],
    [
        ("Names coupon value", ["coupon"]),
        ("Leaves yield to the next bites", ["coupon|par|interest"]),
    ],
)
add(
    "B052",
    "outline",
    [
        "Par value is its own Knowledge-of bullet",
        "It sits between coupon and yield",
        "No dollar print is on the outline",
    ],
    "Par value is named, not numbered. Do not write ‘$1,000’ as if the outline printed it.",
    [
        "stub: a conventional par amount is not printed on this bullet.",
        "Price vs interest rate is a later bite (B057).",
    ],
    [
        ("Names par value", ["par"]),
        ("Does not invent a dollar amount", ["par|face|principal"]),
    ],
)
add(
    "B053",
    "outline",
    [
        "Yield is a named debt Knowledge-of bullet",
        "YTM / YTC / basis points return under investment returns in 3.1.2",
        "This bite is the product-knowledge word; that later bite is the measurement list",
    ],
    "Yield stands alone under debt Knowledge of. Section 3 later lists yield, YTM, YTC, total return, and basis points as concepts of measurement. Keep the product word here; keep the measurement list there.",
    [
        "Debt leaf here; measurement list at B118.",
        "Price vs interest rate (B057) is the related mechanics bite.",
        "stub: a yield-ordering slogan (premium vs discount) is not printed here.",
    ],
    [
        ("Names yield", ["yield"]),
        ("Does not dump the whole 3.1.2 measurement list here", ["yield"]),
    ],
)
add(
    "B054",
    "outline",
    [
        "Ratings and rating agencies are one official Knowledge-of bullet",
        "The outline does not print S&P / Moody’s / Fitch here",
        "Do not invent a BBB cutoff",
    ],
    "Ratings and rating agencies is the official pairing. No agency name and no investment-grade cutoff is printed on this bullet.",
    [
        "stub: named agencies and the investment-grade line are not printed here.",
        "Credit risk is a 2.2 risk type.",
    ],
    [
        ("Names ratings and agencies", ["rating"]),
        ("Does not invent a cutoff letter", ["rating|agency"]),
    ],
)
add(
    "B055",
    "outline",
    [
        "Two official features: callable and convertible",
        "Convertible already appeared under equities; here it is a debt feature",
        "Call risk / prepayment risk return in 2.2",
    ],
    "Callable and convertible features is the official pair on the debt Knowledge-of list. Two words. No call-price schedule.",
    [
        "Callable and convertible — both printed.",
        "2.2 names prepayment (and interest-rate / reinvestment) as risk types.",
        "stub: call-protection windows are not printed.",
    ],
    [
        ("Names callable and convertible", ["callable|call", "convertible"]),
        ("Treats them as bond features", ["feature|bond|debt|call|convert"]),
    ],
)
add(
    "B056",
    "outline",
    [
        "Short-term vs long-term characteristics is its own Knowledge-of cut",
        "Money-market names already sat on the ‘others’ type bite",
        "No day-count is printed",
    ],
    "Short-term vs. long-term characteristics is a named contrast. The outline does not print the day that divides them.",
    [
        "Type-list ‘others’ already named money-market instruments.",
        "stub: a 270-day commercial-paper line is not printed here.",
    ],
    [
        ("Splits short-term from long-term", ["short", "long"]),
        ("Keeps it on debt characteristics", ["term|matur|debt|bond"]),
    ],
)
add(
    "B057",
    "outline",
    [
        "Price and interest rate move together as a named relationship",
        "This is the official mechanics bite under debt",
        "The outline does not print ‘inverse’ — but the relationship is the bite",
    ],
    "Relationship between price and interest rate is the official wording. The outline wants that relationship named. A direction slogan is industry language; this mockup will not treat a slogan as an outline print.",
    [
        "The relationship is the Knowledge-of item.",
        "Yield (B053) is the sibling word.",
        "stub: duration / convexity names are not on this outline.",
    ],
    [
        ("Names price and interest rate together", ["price", "interest"]),
        ("Calls it a relationship", ["relation|inverse|move|bond|rate"]),
    ],
)
add(
    "B058",
    "outline",
    [
        "Two official ways to bring a deal: negotiated vs competitive",
        "Underwriters and syndicates are named on this same bullet",
        "Roles of participants in 1.4 already introduced the syndicate",
    ],
    "Negotiated vs. competitive offerings via underwriters and syndicates is the official cut. Auction is the next, separate bullet — do not merge a Treasury auction into this one.",
    [
        "Negotiated vs competitive — both printed.",
        "Via underwriters and syndicates — printed.",
        "Auction = B059.",
    ],
    [
        ("Splits negotiated from competitive", ["negotiat", "competitive"]),
        ("Mentions underwriters or syndicates", ["underwriter|syndicate"]),
    ],
)
add(
    "B059",
    "outline",
    [
        "Auction is the last debt Knowledge-of bullet",
        "It sits after negotiated vs competitive, not inside it",
        "The outline prints the word, not a bid format",
    ],
    "Auction is a one-word official item. Treasury type names (bills, notes, receipts, bonds) are the usual exam home for an auction story, but the outline does not say that sentence. Do not invent a 3-decimal bid.",
    [
        "Separate from negotiated vs competitive.",
        "stub: uniform-price / Dutch mechanics are not printed.",
    ],
    [
        ("Names auction", ["auction"]),
        ("Keeps it off the negotiated/competitive bullet", ["auction"]),
    ],
)

# --- 2.1.3 options ---
add(
    "B060",
    "outline",
    [
        "Two official type cuts: puts and calls; equity vs index",
        "Everything else on this leaf is Knowledge of, not a type",
        "Do not steal strike / premium / expiration into this bite",
    ],
    "Types of options nests puts and calls, then equity vs index. Those two cuts are the official type list.",
    [
        "Puts and calls.",
        "Equity vs. index.",
        "OCC for listed options is a later Knowledge-of bullet.",
    ],
    [
        ("Names puts and calls", ["put", "call"]),
        ("Includes equity vs index", ["equity|index"]),
    ],
)
add(
    "B061",
    "outline",
    [
        "Hedging or speculation is the first options Knowledge-of bullet",
        "Two uses, one official line",
        "Strategies (long, short) are a later bite",
    ],
    "Hedging or speculation is the official pair of uses. Varying strategies (e.g., long, short) is a different Knowledge-of bullet.",
    [
        "Hedge vs speculate — this bite.",
        "Long vs short — B070.",
        "Covered vs uncovered — B067.",
    ],
    [
        ("Names hedging and speculation", ["hedg", "specul"]),
        ("Treats them as uses of options", ["option|hedg|specul"]),
    ],
)
add(
    "B062",
    "outline",
    [
        "Expiration date is a named options term",
        "American vs European (when you may exercise) is a later bite",
        "No calendar convention is printed",
    ],
    "Expiration date is a one-line Knowledge-of item. Style (American vs European) is separate.",
    [
        "stub: third-Friday folklore is not printed.",
        "American vs European = B068.",
    ],
    [
        ("Names expiration date", ["expir"]),
        ("Leaves style to American/European", ["expir|option"]),
    ],
)
add(
    "B063",
    "outline",
    [
        "Strike price is a named options term",
        "In-the-money / out-of-the-money is a later bite that uses the strike",
        "No premium math here",
    ],
    "Strike price stands alone. ITM/OTM is the later comparison to the underlying.",
    [
        "Strike here; premium next; ITM/OTM at B066.",
    ],
    [
        ("Names strike price", ["strike"]),
        ("Does not mix it up with premium", ["strike|exercise"]),
    ],
)
add(
    "B064",
    "outline",
    [
        "Premium is a named options term",
        "It is what the contract costs, not the strike",
        "The outline does not print a pricing model",
    ],
    "Premium is its own Knowledge-of bullet between strike and settlement. Do not invent Black-Scholes.",
    [
        "stub: intrinsic vs time value is not printed on this bullet.",
    ],
    [
        ("Names premium", ["premium"]),
        ("Keeps it off the strike bite", ["premium|price|option"]),
    ],
)
add(
    "B065",
    "outline",
    [
        "Settlement is underlying or cash",
        "Equity vs index (the type cut) is why both words exist",
        "OCC is the listed-options clearer, later on this leaf",
    ],
    "Underlying or cash settlement is the official pair. Index options are the usual cash-settled story; the outline does not print that sentence, so Precision stops at the two words.",
    [
        "Underlying or cash — both printed.",
        "OCC for listed options = B072.",
        "stub: which index options cash-settle is not printed here.",
    ],
    [
        ("Names underlying or cash settlement", ["cash|underlying", "settl"]),
        ("Ties it to options, not to T+1 equity trades", ["option|index|equity|settl"]),
    ],
)
add(
    "B066",
    "outline",
    [
        "In-the-money and out-of-the-money are the official moneyness words",
        "They compare spot to strike; the outline does not print ‘at the money’",
        "Do not add ATM as if the PDF listed it",
    ],
    "In-the-money, out-of-the money is the official pair (the outline’s hyphenation). At-the-money is not printed. Do not grade it as if it were.",
    [
        "ITM and OTM — printed.",
        "ATM — not printed.",
        "Strike is B063.",
    ],
    [
        ("Names in-the-money and out-of-the-money", ["in-the-money|in the money|itm", "out-of-the|out of the|otm"]),
        ("Does not invent ATM as an outline term", ["money|strike"]),
    ],
)
add(
    "B067",
    "outline",
    [
        "Covered vs uncovered is a named options contrast",
        "Long/short strategies are a different bite",
        "The outline does not print a margin recipe",
    ],
    "Covered vs. uncovered is the official pair. Long vs short lives on the strategies bullet. Do not invent a ‘covered call’ payoff table.",
    [
        "Covered vs uncovered — this bite.",
        "Long vs short — B070.",
        "stub: margin for an uncovered writer is not printed.",
    ],
    [
        ("Splits covered from uncovered", ["covered", "uncovered|naked"]),
        ("Keeps it on options", ["option|call|put|cover"]),
    ],
)
add(
    "B068",
    "outline",
    [
        "American vs European is when the holder may exercise",
        "Expiration date is a different bite (the contract ends)",
        "The outline prints the two style names, not a market list",
    ],
    "American vs. European is the official style pair. Exercise and assignment is the next bullet. Do not invent which listed equity options are which style.",
    [
        "Two style names — printed.",
        "Exercise and assignment = B069.",
        "stub: a ‘listed equity is American’ sentence is not printed here.",
    ],
    [
        ("Names American and European", ["american", "european"]),
        ("Talks exercise style, not the continent", ["exercise|style|expir|option"]),
    ],
)
add(
    "B069",
    "outline",
    [
        "Exercise and assignment is one official pair",
        "The holder exercises; the writer is assigned",
        "OCC for listed options is the next plumbing bite",
    ],
    "Exercise and assignment is the official pairing. OCC for listed options follows. The outline does not print an automatic-exercise threshold.",
    [
        "Exercise and assignment — both printed.",
        "OCC = B072.",
        "stub: a counterpart auto-ex threshold is not printed.",
    ],
    [
        ("Names exercise and assignment", ["exercise", "assign"]),
        ("Leaves OCC to its own bite", ["exercise|assign|option"]),
    ],
)
add(
    "B070",
    "outline",
    [
        "Varying strategies — the outline’s examples are long and short",
        "That is the official pair, not a named spread list",
        "Hedging vs speculation was the uses bite",
    ],
    "Varying strategies (e.g., long, short) prints two words. Do not invent straddles, spreads, or collars as if the outline listed them.",
    [
        "Long and short — official examples.",
        "Hedging or speculation = B061.",
        "stub: named multi-leg strategies are not printed.",
    ],
    [
        ("Names long and short strategies", ["long", "short"]),
        ("Calls them strategies", ["strateg|position|option"]),
    ],
)
add(
    "B071",
    "outline",
    [
        "Special disclosures — the outline’s example is the Options Disclosure Document (ODD)",
        "That name is the bite",
        "Do not invent a delivery clock",
    ],
    "Special disclosures (e.g., Options Disclosure Document (ODD)) is the official example. FINRA 2360 (Options) sits on the Section 2 rule list — a citation, not a day-count.",
    [
        "ODD — the printed example.",
        "stub: when the ODD must be delivered is not printed here.",
    ],
    [
        ("Names the ODD", ["odd|options disclosure"]),
        ("Treats it as a special disclosure", ["disclos"]),
    ],
)
add(
    "B072",
    "outline",
    [
        "OCC is named here for listed options",
        "The same OCC already appeared as a clearing corporation in 1.1.4",
        "This bite is the listed-options clearer, not DTCC",
    ],
    "Options Clearing Corporation (OCC) for listed options is the last options Knowledge-of bullet. Same name as the 1.1.4 depository/clearing example; here the outline ties it to listed options.",
    [
        "OCC for listed options — printed.",
        "DTCC is the other 1.1.4 name, not this bite.",
    ],
    [
        ("Names the OCC", ["occ"]),
        ("Ties it to listed options", ["listed|option|clear"]),
    ],
)

# --- 2.1.4 packaged products ---
add(
    "B073",
    "outline",
    [
        "Four official investment-company types: closed-end, open-end, UITs, variable contracts/annuities",
        "This bite is the type list; loads / NAV / breakpoints are later Knowledge of",
        "Variable contracts/annuities is the outline’s wording, not ‘just mutual funds’",
    ],
    "Investment companies nest types: closed-end funds, open-end funds, unit investment trusts (UITs), variable contracts/annuities. Those four names are the official type list. The Investment Company Act of 1940 is a foundational act and is cited again on the Section 2 rule list.",
    [
        "Closed-end, open-end, UITs, variable contracts/annuities — official nested types.",
        "Section 2 cites ICA Sections 3(a), 4, and 5 plus 12b-1 — names only.",
        "Variable life is not a separate type line; the outline says variable contracts/annuities.",
    ],
    [
        ("Names open-end and closed-end", ["open-end|open end", "closed-end|closed end"]),
        ("Includes UITs or variable contracts", ["uit|unit investment|variable|annuit"]),
    ],
)
add(
    "B074",
    "outline",
    [
        "Loads are a named packaged-product Knowledge-of item",
        "Sales charges are a different official bullet later on this leaf",
        "Share classes are also separate",
    ],
    "Loads stand alone. Sales charges, share classes, and 12b-1 (cited on the rule list) are nearby names. Do not invent A/B/C load schedules.",
    [
        "Loads here; sales charges at B084; share classes at B075.",
        "stub: a named percentage load is not printed.",
    ],
    [
        ("Names loads", ["load"]),
        ("Leaves sales-charge wording to its own bite", ["load|fund|sales"]),
    ],
)
add(
    "B075",
    "outline",
    [
        "Share classes are a named Knowledge-of item",
        "The outline does not print A / B / C",
        "Loads and 12b-1 live next door",
    ],
    "Share classes is a one-line official item. Do not invent the lettered class list as if the PDF printed it.",
    [
        "stub: Class A/B/C characteristics are not printed on this bullet.",
        "12b-1 is a cited ICA rule on the Section 2 list.",
    ],
    [
        ("Names share classes", ["share", "class"]),
        ("Does not invent a lettered schedule", ["class|share"]),
    ],
)
add(
    "B076",
    "outline",
    [
        "NAV is a named packaged-product term",
        "The outline prints the acronym, not a forward-pricing paragraph",
        "Net transactions are a later bite",
    ],
    "Net asset value (NAV) is the official name. Forward pricing is industry language not printed here.",
    [
        "NAV — printed.",
        "Net transactions = B082.",
        "stub: 4 p.m. forward-pricing folklore is not printed.",
    ],
    [
        ("Names NAV", ["nav|net asset"]),
        ("Keeps it on packaged products", ["nav|fund|share"]),
    ],
)
add(
    "B077",
    "outline",
    [
        "Disclosures is a named Knowledge-of item on this leaf",
        "Prospectus already appeared as an offering document in 1.4",
        "No delivery clock is printed here",
    ],
    "Disclosures is a one-word official item under packaged products. Offering-document names (prospectus, official statement, program disclosure) already live in 1.4.",
    [
        "stub: which packaged-product disclosure arrives when is not printed.",
        "Summary prospectuses are cited as SEC 431 on the Section 1 list.",
    ],
    [
        ("Names disclosures", ["disclos"]),
        ("Puts them on packaged products", ["disclos|fund|prospectus"]),
    ],
)
add(
    "B078",
    "outline",
    [
        "Costs and fees are a named Knowledge-of item",
        "Loads, sales charges, surrender charges, and 12b-1 are sibling names",
        "No expense-ratio number is printed",
    ],
    "Costs and fees is the official pairing. Do not invent a typical ER.",
    [
        "Sibling bullets: loads, sales charges, surrender charges, breakpoints, ROA, LOI.",
        "stub: a numeric expense cap is not printed.",
    ],
    [
        ("Names costs and fees", ["cost|fee"]),
        ("Leaves named charge types to their own bites", ["cost|fee|expense"]),
    ],
)
add(
    "B079",
    "outline",
    [
        "Breakpoints are a named Knowledge-of item",
        "FINRA 2342 (‘Breakpoint’ Sales) is on the Section 2 rule list",
        "ROA and LOI are the next two bullets — do not merge them",
    ],
    "Breakpoints stand alone. Right of accumulation and letter of intent are the next official names. The outline cites FINRA 2342 by title; it does not print a dollar schedule.",
    [
        "Breakpoints here; ROA = B080; LOI = B081.",
        "stub: a dollar breakpoint schedule is not printed.",
    ],
    [
        ("Names breakpoints", ["breakpoint"]),
        ("Does not invent a dollar ladder", ["breakpoint"]),
    ],
)
add(
    "B080",
    "outline",
    [
        "Right of accumulation (ROA) is a named official term",
        "It sits between breakpoints and letter of intent",
        "The outline prints the name, not the lookback",
    ],
    "Right of accumulation (ROA) is the official name. Do not invent an account-aggregation recipe.",
    [
        "ROA — printed.",
        "LOI is the next bite.",
        "stub: which accounts combine is not printed.",
    ],
    [
        ("Names ROA / right of accumulation", ["accumulation|roa"]),
        ("Keeps it next to breakpoints, not instead of them", ["right|accumul|breakpoint"]),
    ],
)
add(
    "B081",
    "outline",
    [
        "Letter of intent (LOI) is a named official term",
        "It sits after ROA",
        "The outline does not print a month-count",
    ],
    "Letter of intent (LOI) is the official name. Do not invent a 13-month window.",
    [
        "LOI — printed.",
        "stub: how many months an LOI runs is not printed.",
    ],
    [
        ("Names letter of intent / LOI", ["letter of intent|loi"]),
        ("Leaves the clock unlabeled", ["letter|intent|loi"]),
    ],
)
add(
    "B082",
    "outline",
    [
        "Net transactions are a named Knowledge-of item",
        "NAV is a different official bullet",
        "The outline prints the name, not a worked trade",
    ],
    "Net transactions stand alone next to NAV. The outline does not unpack the term.",
    [
        "stub: a worked ‘NAV with no sales charge’ sentence is not printed.",
        "Sales charges = B084.",
    ],
    [
        ("Names net transactions", ["net", "transaction"]),
        ("Does not invent a worked example", ["net"]),
    ],
)
add(
    "B083",
    "outline",
    [
        "Surrender charges are a named Knowledge-of item",
        "Variable contracts/annuities are why this word exists on this leaf",
        "No declining-CDSC table is printed",
    ],
    "Surrender charges is the official name. FINRA 2330 (deferred variable annuities) is on the Section 2 rule list — a citation, not a schedule.",
    [
        "Surrender charges — printed.",
        "Variable contracts/annuities sit on the type list.",
        "stub: a year-by-year CDSC table is not printed.",
    ],
    [
        ("Names surrender charges", ["surrender"]),
        ("Puts them on packaged / variable products", ["surrender|annuit|variable|charge"]),
    ],
)
add(
    "B084",
    "outline",
    [
        "Sales charges are a named Knowledge-of item, distinct from ‘loads’",
        "The outline lists both words",
        "No percentage is printed",
    ],
    "Sales charges is the last packaged-product Knowledge-of bullet. Loads was an earlier official word. Keep both; do not collapse them in the rubric.",
    [
        "Sales charges — printed. Loads — also printed, earlier.",
        "stub: a front-end percentage is not printed.",
    ],
    [
        ("Names sales charges", ["sales", "charge"]),
        ("Does not pretend the outline omitted ‘loads’ as a sibling", ["sales|load"]),
    ],
)

# --- 2.1.5 municipal fund securities ---
add(
    "B085",
    "outline",
    [
        "529 plans nest two official flavors: prepaid tuition and savings plans",
        "LGIPs and ABLE are sibling bullets, not 529 subtypes",
        "Owner vs beneficiary and tax advantages are later Knowledge of",
    ],
    "529 Plans nest prepaid tuition and savings plans. That is the official 529 cut. Municipal fund securities as a category, owner vs beneficiary, restricted use, tax advantages, and direct vs adviser-sold are later Knowledge-of bites.",
    [
        "Prepaid tuition and savings plans — official nested types.",
        "MSRB D-12 (definition of municipal fund securities) is on the Section 2 rule list.",
    ],
    [
        ("Names 529 plans", ["529"]),
        ("Splits prepaid tuition from savings", ["prepaid|tuition", "savings"]),
    ],
)
add(
    "B086",
    "outline",
    [
        "LGIPs are their own official municipal-fund bullet",
        "They are not a 529 subtype",
        "The outline prints the name, not a permitted-investor list",
    ],
    "Local government investment pools (LGIPs) stand alone between 529s and ABLE accounts.",
    [
        "LGIP — printed.",
        "stub: who may buy an LGIP is not printed.",
    ],
    [
        ("Names LGIPs", ["lgip|local government"]),
        ("Keeps them off the 529 type list", ["lgip|pool"]),
    ],
)
add(
    "B087",
    "outline",
    [
        "ABLE accounts are their own official municipal-fund bullet",
        "They are not a 529 subtype on this outline",
        "Restricted use of plan assets is a later Knowledge-of item that covers the leaf",
    ],
    "ABLE accounts stand alone as the third municipal-fund type name.",
    [
        "ABLE — printed.",
        "Restricted use of plan assets = B090.",
        "stub: a disability-onset age is not printed.",
    ],
    [
        ("Names ABLE accounts", ["able"]),
        ("Keeps them on municipal fund securities", ["able|municipal|account"]),
    ],
)
add(
    "B088",
    "outline",
    [
        "Municipal fund securities is the category Knowledge-of bullet",
        "529s, LGIPs, and ABLE are the type names above it",
        "MSRB D-12 is the cited definition",
    ],
    "Municipal fund securities is printed both as the leaf title and as a Knowledge-of item. The type names are 529, LGIP, and ABLE.",
    [
        "Category name — printed.",
        "MSRB D-12 — cited on the Section 2 rule list.",
    ],
    [
        ("Names municipal fund securities", ["municipal", "fund"]),
        ("Points at 529 / LGIP / ABLE as the type set", ["529|lgip|able|municipal"]),
    ],
)
add(
    "B089",
    "outline",
    [
        "Owner vs beneficiary is a named Knowledge-of cut",
        "It applies across this municipal-fund leaf",
        "The outline prints the pair, not a gift-tax recipe",
    ],
    "Owner vs. beneficiary is the official pairing. Restricted use of plan assets is the next bite.",
    [
        "Owner vs beneficiary — printed.",
        "stub: who may change a beneficiary is not printed.",
    ],
    [
        ("Splits owner from beneficiary", ["owner", "beneficiar"]),
        ("Keeps it on these plans", ["529|able|plan|account|owner"]),
    ],
)
add(
    "B090",
    "outline",
    [
        "Restricted use of plan assets is a named Knowledge-of item",
        "The outline prints the idea, not a qualified-expense list",
        "Tax advantages is the next bite — do not merge them",
    ],
    "Restricted use of plan assets is the official wording. Do not invent a tuition-vs-housing list.",
    [
        "Restricted use — printed.",
        "stub: a qualified-expense laundry list is not printed.",
    ],
    [
        ("Names restricted use of plan assets", ["restrict", "use|asset"]),
        ("Leaves the expense list unlabeled", ["restrict|qualified|plan"]),
    ],
)
add(
    "B091",
    "outline",
    [
        "Tax advantages is a named Knowledge-of item on this leaf",
        "The outline prints the idea, not a federal-vs-state matrix",
        "Restricted use was the previous bite",
    ],
    "Tax advantages stands alone. Do not invent a state-tax deduction rule.",
    [
        "Tax advantages — printed.",
        "stub: which states deduct 529 contributions is not printed.",
    ],
    [
        ("Names tax advantages", ["tax"]),
        ("Puts them on municipal fund securities", ["tax|529|able|municipal"]),
    ],
)
add(
    "B092",
    "outline",
    [
        "Direct or adviser sold is the last Knowledge-of cut on this leaf",
        "Two official channels",
        "The outline does not print a fee comparison",
    ],
    "Direct or adviser sold is the official pair. Do not invent which share class rides which channel.",
    [
        "Direct or adviser sold — both printed.",
        "stub: a fee comparison by channel is not printed.",
    ],
    [
        ("Splits direct from adviser-sold", ["direct", "adviser|advisor"]),
        ("Puts the cut on these plans", ["direct|sold|529|municipal"]),
    ],
)

# --- 2.1.6 DPPs ---
add(
    "B093",
    "outline",
    [
        "Two official DPP types: limited partnerships and tenants in common (TIC)",
        "Knowledge of (pass-through, unlisted, generally illiquid) are later bites",
        "FINRA 2310 is the cited DPP rule",
    ],
    "Types of DPPs nests limited partnerships and tenants in common (TIC). Those two names are the official type list.",
    [
        "Limited partnerships and TIC — official nested types.",
        "FINRA 2310 — cited on the Section 2 rule list.",
    ],
    [
        ("Names limited partnerships", ["limited", "partnership"]),
        ("Includes tenants in common / TIC", ["tenant|tic"]),
    ],
)
add(
    "B094",
    "outline",
    [
        "Pass-through tax treatment is a named DPP Knowledge-of item",
        "REITs later have their own ‘without double taxation’ bullet — do not merge the products",
        "The outline prints the treatment, not a K-1 recipe",
    ],
    "Pass-through tax treatment is the first DPP Knowledge-of bullet. Unlisted and generally illiquid follow.",
    [
        "Pass-through — printed.",
        "REIT tax language is B099, a different product.",
        "stub: a K-1 mechanics paragraph is not printed.",
    ],
    [
        ("Names pass-through tax treatment", ["pass-through|pass through|passthrough"]),
        ("Puts it on DPPs", ["dpp|partnership|pass"]),
    ],
)
add(
    "B095",
    "outline",
    [
        "Unlisted is a named DPP Knowledge-of item",
        "Generally illiquid is the next official word — keep them as two bites",
        "REITs have their own private / non-listed / listed type cut",
    ],
    "Unlisted stands alone under DPP Knowledge of. Illiquid is the next bullet, not a synonym the outline collapsed.",
    [
        "Unlisted — printed.",
        "Generally illiquid = B096.",
    ],
    [
        ("Names unlisted", ["unlisted"]),
        ("Puts it on DPPs", ["unlisted|dpp|partnership"]),
    ],
)
add(
    "B096",
    "outline",
    [
        "Generally illiquid is a named DPP Knowledge-of item",
        "Hedge funds reuse the same official phrase on their leaf",
        "Unlisted was the previous bite",
    ],
    "Generally illiquid is the last DPP Knowledge-of bullet. The same phrase returns under hedge funds (B103). Keep the product name in the teach-back.",
    [
        "Generally illiquid — printed.",
        "Hedge-fund illiquidity is a different leaf.",
    ],
    [
        ("Names generally illiquid", ["illiquid"]),
        ("Puts it on DPPs", ["illiquid|dpp|partnership"]),
    ],
)

# --- 2.1.7 REITs ---
add(
    "B097",
    "outline",
    [
        "Three official REIT types: private; registered, non-listed; listed",
        "Equity vs debt is a later Knowledge-of item",
        "Do not flatten them into ‘a REIT is a stock’",
    ],
    "Types of REITs nests private; registered, non-listed; and listed. Those three names are the official type list.",
    [
        "Private / registered non-listed / listed — official nested types.",
        "Equity or debt = B098.",
    ],
    [
        ("Names listed and non-listed / private", ["listed", "private|non-listed|nonlisted"]),
        ("Calls them REIT types", ["reit"]),
    ],
)
add(
    "B098",
    "outline",
    [
        "Real estate equity or debt is the official REIT Knowledge-of cut",
        "Type (private / non-listed / listed) was the previous bite",
        "The outline prints the pair, not a portfolio recipe",
    ],
    "Real estate equity or debt is the official pairing under REIT Knowledge of.",
    [
        "Equity or debt — printed.",
        "Tax-advantaged income without double taxation = B099.",
    ],
    [
        ("Splits REIT equity from REIT debt", ["equity", "debt"]),
        ("Puts the cut on REITs", ["reit|real estate"]),
    ],
)
add(
    "B099",
    "outline",
    [
        "Tax-advantaged income without double taxation is the official REIT tax line",
        "DPPs have pass-through as their own wording — do not swap the phrases",
        "The outline does not print a distribution percentage",
    ],
    "Tax-advantaged income without double taxation is the last REIT Knowledge-of bullet. Do not invent a 90% distribution test.",
    [
        "Without double taxation — printed.",
        "stub: a distribution-percentage test is not printed.",
    ],
    [
        ("Names tax-advantaged / no double taxation", ["tax", "double"]),
        ("Puts it on REITs", ["reit|real estate|tax"]),
    ],
)

# --- 2.1.8 hedge funds ---
add(
    "B100",
    "outline",
    [
        "Minimum investment is the first hedge-fund Knowledge-of item",
        "The outline prints the idea, not a dollar floor",
        "Partnership structure and private equity follow",
    ],
    "Minimum investment is a named hedge-fund fact. Do not invent an accredited-only dollar.",
    [
        "Minimum investment — printed.",
        "stub: a dollar minimum is not printed.",
        "Accredited thresholds live on the authored investors note, not here.",
    ],
    [
        ("Names minimum investment", ["minimum", "invest"]),
        ("Puts it on hedge funds", ["hedge|minimum"]),
    ],
)
add(
    "B101",
    "outline",
    [
        "Partnership structure is a named hedge-fund Knowledge-of item",
        "DPPs already used limited partnerships as a type — this is a different leaf",
        "The outline prints the structure, not a 2-and-20 recipe",
    ],
    "Partnership structure stands alone under hedge funds. Private equity is the next official word.",
    [
        "Partnership structure — printed.",
        "stub: a fee recipe is not printed.",
    ],
    [
        ("Names partnership structure", ["partnership"]),
        ("Puts it on hedge funds", ["hedge|partnership"]),
    ],
)
add(
    "B102",
    "outline",
    [
        "Private equity is a named Knowledge-of item on the hedge-fund leaf",
        "The outline places the words here, not as their own leaf",
        "Minimum investment and illiquidity sit next to it",
    ],
    "Private equity is printed under hedge-fund Knowledge of. It is not a separate 2.1.x leaf on this outline.",
    [
        "Private equity — printed on this leaf.",
        "Generally illiquid = B103.",
    ],
    [
        ("Names private equity", ["private", "equity"]),
        ("Leaves it on this leaf", ["private|hedge"]),
    ],
)
add(
    "B103",
    "outline",
    [
        "Generally illiquid is reused as official wording on this leaf",
        "DPPs already had the same phrase — name the product in the teach-back",
        "Minimum investment is part of why",
    ],
    "Generally illiquid is the last hedge-fund Knowledge-of bullet. Same official phrase as DPP B096.",
    [
        "Generally illiquid — printed.",
        "DPP illiquidity is a different bite.",
    ],
    [
        ("Names generally illiquid", ["illiquid"]),
        ("Puts it on hedge funds / private equity", ["illiquid|hedge|private"]),
    ],
)

# --- 2.1.9 ETPs ---
add(
    "B104",
    "outline",
    [
        "Two official ETP types: ETFs and ETNs",
        "Active vs passive and fee considerations are later Knowledge of",
        "Do not collapse ETNs into ETFs",
    ],
    "Types of ETPs nests exchange-traded funds (ETFs) and exchange-traded notes (ETNs). Those two names are the official type list.",
    [
        "ETFs and ETNs — official nested types.",
        "Alternative investments to mutual funds = B105.",
    ],
    [
        ("Names ETFs and ETNs", ["etf", "etn"]),
        ("Calls them ETP types", ["etp|exchange-traded|exchange traded"]),
    ],
)
add(
    "B105",
    "outline",
    [
        "Alternative investments to mutual funds is the official ETP Knowledge-of line",
        "Open-end funds already lived on the packaged-product type list",
        "Fee considerations is the next bite",
    ],
    "Alternative investments to mutual funds is how the outline frames ETPs against 2.1.4. It is a comparison Knowledge-of item, not a type name.",
    [
        "Alternative to mutual funds — printed.",
        "Active vs passive = B107.",
    ],
    [
        ("Frames ETPs against mutual funds", ["mutual fund", "alternative|etf|etp"]),
        ("Does not erase ETNs from the type list", ["etf|etn|etp|fund"]),
    ],
)
add(
    "B106",
    "outline",
    [
        "Fee considerations is a named ETP Knowledge-of item",
        "Packaged products already had costs/fees/loads — this is the ETP leaf’s word",
        "No basis-point print is on the outline",
    ],
    "Fee considerations stands alone under ETPs. Do not invent a typical ETF ER.",
    [
        "Fee considerations — printed.",
        "stub: a numeric fee is not printed.",
    ],
    [
        ("Names fee considerations", ["fee"]),
        ("Puts them on ETPs", ["fee|etf|etn|etp"]),
    ],
)
add(
    "B107",
    "outline",
    [
        "Active vs passive is the last ETP Knowledge-of cut",
        "Two official styles",
        "The outline does not print a tracking-error paragraph",
    ],
    "Active vs. passive is the official pair. That is the whole printed precision.",
    [
        "Active vs passive — printed.",
        "stub: tracking error / index-construction folklore is not printed.",
    ],
    [
        ("Splits active from passive", ["active", "passive"]),
        ("Puts the cut on ETPs", ["active|passive|etf|etp"]),
    ],
)

# --- 2.2 risks ---
add(
    "B108",
    "outline",
    [
        "Ten official risk types: capital, credit, currency, inflationary/purchasing power, interest rate/reinvestment, liquidity, market/systematic, non-systematic, political, prepayment",
        "Definition and identification is this bite; mitigation is the next",
        "Do not add a type the outline did not print",
    ],
    "Definition and Identification of Risk Types unpacks the outline’s nested list of ten names. Use those names. Mitigation strategies are the next official bullet, not this one.",
    [
        "Capital; credit; currency; inflationary/purchasing power; interest rate/reinvestment; liquidity; market/systematic; non-systematic; political; prepayment.",
        "Currency already had a home on the exchange-rate bite; prepayment sat next to agency/MBS.",
        "Do not add call risk as an eleventh printed type — the outline’s word here is prepayment.",
    ],
    [
        ("Names several official risk types", ["credit|liquidity|currency", "market|systematic|prepayment|inflation"]),
        ("Treats this as identification, not mitigation", ["risk"]),
    ],
)
add(
    "B109",
    "outline",
    [
        "Three official mitigation strategies: diversification, portfolio rebalancing, hedging",
        "This is not the ten-type identification bite",
        "Hedging already appeared as an options use",
    ],
    "Strategies for Mitigation of Risk nests diversification, portfolio rebalancing, and hedging. Those three names are the official mitigation list.",
    [
        "Diversification, portfolio rebalancing, hedging — official nested strategies.",
        "Identification of types is B108.",
    ],
    [
        ("Names diversification", ["diversif"]),
        ("Includes rebalancing or hedging", ["rebalanc|hedg"]),
    ],
)

# --- 3.1.1 orders ---
add(
    "B110",
    "outline",
    [
        "Order types the outline names: market, stop, limit, GTC, discretionary vs non-discretionary, solicited vs unsolicited",
        "Capacity, long/short, and bull/bear are later bites",
        "Do not invent fill-or-kill as if the PDF listed it",
    ],
    "Types of orders prints market, stop, limit, good-til-canceled (GTC), discretionary vs. non-discretionary, and solicited vs. unsolicited. Those are the official examples. Discretionary as an account type returns in 3.2.1.",
    [
        "Market, stop, limit, GTC — printed.",
        "Discretionary vs non-discretionary; solicited vs unsolicited — printed.",
        "stub: FOK / IOC / AON names are not printed.",
    ],
    [
        ("Names market / stop / limit", ["market", "stop|limit"]),
        ("Includes GTC or solicited/discretionary", ["gtc|good-til|discretion|solicit"]),
    ],
)
add(
    "B111",
    "outline",
    [
        "Buy and sell, bid-ask is one official bullet",
        "The quote is the bid-ask; the customer is the buy or the sell",
        "Trade capacity (principal vs agency) is the next bite",
    ],
    "Buy and sell, bid-ask is the official pairing. Do not invent a tick-size table.",
    [
        "Buy/sell and bid-ask — printed.",
        "Principal vs agency = B112.",
    ],
    [
        ("Names buy/sell and bid-ask", ["buy|sell", "bid"]),
        ("Keeps it on the quote, not on capacity", ["bid|ask|buy|sell"]),
    ],
)
add(
    "B112",
    "outline",
    [
        "Trade capacity: principal or agency",
        "Two official words",
        "This is not the bid-ask bite",
    ],
    "Trade capacity (e.g., principal, agency) is the official pair. Markups vs commissions show up as a later account-type cut (fee-based vs commission) and on the Section 3 rule list (FINRA 2120) — citations, not numbers.",
    [
        "Principal and agency — printed.",
        "stub: a markup percentage is not printed.",
    ],
    [
        ("Splits principal from agency", ["principal", "agency"]),
        ("Calls it capacity", ["capacity|principal|agency"]),
    ],
)
add(
    "B113",
    "outline",
    [
        "Long and short, naked and covered is one official pairing",
        "Options already used covered vs uncovered; here it sits on the orders leaf",
        "The outline prints the words, not a locate recipe",
    ],
    "Long and short, naked and covered is the official wording. Bearish and bullish is the next bite.",
    [
        "Long/short and naked/covered — printed.",
        "stub: a Regulation SHO locate paragraph is not printed.",
    ],
    [
        ("Names long/short and naked/covered", ["long|short", "naked|covered"]),
        ("Keeps it on positions / orders", ["long|short|cover|naked"]),
    ],
)
add(
    "B114",
    "outline",
    [
        "Bearish and bullish is the last orders-and-strategies bullet",
        "It is the outlook pair, not the order-type list",
        "Long/short already carried the position words",
    ],
    "Bearish and bullish is the official pair. That is the printed precision.",
    [
        "Bearish and bullish — printed.",
        "Order types were B110.",
    ],
    [
        ("Names bearish and bullish", ["bearish", "bullish"]),
        ("Treats them as outlook / strategy", ["bear|bull"]),
    ],
)

# --- 3.1.2 returns ---
add(
    "B115",
    "outline",
    [
        "Return components the outline names: interest, dividends, realized/unrealized gains, return on capital",
        "Dividend types and payment dates are later bites",
        "Do not invent a tax-lot method here",
    ],
    "Components of return (e.g., interest, dividends, realized/unrealized gains, return on capital) is the official list. Cost basis is its own later bullet.",
    [
        "Interest, dividends, realized/unrealized gains, return on capital — printed.",
        "Cost basis = B119.",
    ],
    [
        ("Names interest or dividends plus gains", ["interest|dividend", "gain"]),
        ("Includes realized/unrealized or return on capital", ["realized|unrealized|return on capital"]),
    ],
)
add(
    "B116",
    "outline",
    [
        "Two official dividend types: cash and stock",
        "Payment dates are the next bite",
        "Do not invent a property-dividend third type",
    ],
    "Different types of dividends (e.g., cash, stock) is the official pair.",
    [
        "Cash and stock — printed.",
        "Record / ex-dividend / payable = B117.",
    ],
    [
        ("Names cash and stock dividends", ["cash", "stock"]),
        ("Calls them dividend types", ["dividend"]),
    ],
)
add(
    "B117",
    "outline",
    [
        "Three official dividend dates: record, ex-dividend, payable",
        "The outline prints the names, not a T-1 recipe",
        "Settlement time frames live on the next leaf",
    ],
    "Dividend payment dates (e.g., record date, ex-dividend date, payable date) is the official trio. Do not invent which one the market uses to adjust the price.",
    [
        "Record, ex-dividend, payable — printed.",
        "stub: the settlement-derived ex-date rule is not printed here.",
    ],
    [
        ("Names record, ex-dividend, and payable", ["record", "ex-dividend|ex dividend|ex-date", "payable"]),
        ("Treats them as dividend dates", ["dividend|date"]),
    ],
)
add(
    "B118",
    "outline",
    [
        "Measurement concepts: yield, YTM, YTC, total return, basis points",
        "Debt already had a lone ‘yield’ Knowledge-of bullet — this is the measurement list",
        "No formula is printed",
    ],
    "Concepts of measurement (e.g., yield, yield to maturity (YTM), yield to call (YTC), total return, basis points) is the official set. Do not invent an ordering slogan.",
    [
        "Yield, YTM, YTC, total return, basis points — printed.",
        "Debt-leaf yield was B053.",
        "stub: premium/discount yield ordering is not printed here.",
    ],
    [
        ("Names YTM or YTC", ["ytm|yield to maturity", "ytc|yield to call"]),
        ("Includes total return or basis points", ["total return|basis point"]),
    ],
)
add(
    "B119",
    "outline",
    [
        "Cost basis requirements is its own official bullet",
        "Corporate actions later adjust market price and cost basis",
        "The outline prints the requirement, not a FIFO/LIFO menu",
    ],
    "Cost basis requirements stands alone. 3.1.4 later asks for the impact of splits on market price and cost basis.",
    [
        "Cost basis — printed.",
        "Split impact on cost basis = B124.",
        "stub: a default lot-relief method is not printed.",
    ],
    [
        ("Names cost basis", ["cost", "basis"]),
        ("Leaves lot methods unlabeled", ["basis"]),
    ],
)
add(
    "B120",
    "outline",
    [
        "Benchmarks and indices are the last investment-returns bullet",
        "The outline prints the pair, not a named index list",
        "Do not invent the Dow as if the PDF listed it",
    ],
    "Benchmarks and indices is the official pairing. No index name is printed.",
    [
        "Benchmarks and indices — printed.",
        "stub: a named index roster is not printed.",
    ],
    [
        ("Names benchmarks and indices", ["benchmark", "index|indices"]),
        ("Does not invent a ticker list", ["benchmark|index"]),
    ],
)

# --- 3.1.3 settlement ---
add(
    "B121",
    "outline",
    [
        "Settlement time frames the outline names: T, T + 1",
        "That is the official pair — do not invent T+2 as if this edition printed it",
        "Physical vs book entry is the next bite",
    ],
    "Settlement time frames for various products (e.g., T, T + 1) prints two clocks. Use those two. The outline’s own tripwire in later editions is T+1; this ©2024 PDF already prints T and T+1.",
    [
        "T and T+1 — official examples.",
        "Physical vs book entry = B122.",
        "Do not write T+2. It is not on this outline.",
    ],
    [
        ("Names T and T+1", ["t+1|t + 1|t plus 1", "settl"]),
        ("Does not revive T+2", ["t+1|same day|t+0"]),
    ],
)
add(
    "B122",
    "outline",
    [
        "Physical vs book entry is the official settlement-form cut",
        "The outline’s e.g. is delivery and settlement",
        "Depositories (DTCC) already lived in 1.1.4",
    ],
    "Physical vs. book entry (e.g., delivery and settlement) is the official pair. Time frames were the previous bite.",
    [
        "Physical vs book entry — printed.",
        "Delivery and settlement — printed e.g.",
    ],
    [
        ("Splits physical from book entry", ["physical", "book"]),
        ("Ties it to delivery / settlement", ["deliver|settl"]),
    ],
)

# --- 3.1.4 corporate actions ---
add(
    "B123",
    "outline",
    [
        "Corporate-action types: splits, reverse splits, buybacks, tender offers, exchange offers, rights offerings, M&A",
        "Impact on price and cost basis is the next bite",
        "Do not invent a spin-off as if the PDF listed it",
    ],
    "Types of corporate actions prints splits, reverse splits, buybacks, tender offers, exchange offers, rights offerings, and mergers and acquisitions (M&A). Those are the official names.",
    [
        "Splits, reverse splits, buybacks, tenders, exchange offers, rights offerings, M&A — printed.",
        "Rights already appeared as an equity type in 2.1.1.",
    ],
    [
        ("Names splits and at least one other action", ["split", "buyback|tender|merger|rights offering|exchange offer"]),
        ("Treats them as corporate actions", ["corporate|action"]),
    ],
)
add(
    "B124",
    "outline",
    [
        "Splits and reverse splits move market price and cost basis",
        "That impact is its own official bullet",
        "The outline does not print a 2-for-1 worked example",
    ],
    "Impact of stock splits and reverse stock splits on market price and cost basis is the official wording. Cost basis requirements already lived at B119.",
    [
        "Market price and cost basis — both printed.",
        "stub: a worked 2-for-1 numeric is not printed.",
    ],
    [
        ("Names splits and reverse splits", ["split", "reverse"]),
        ("Touches market price or cost basis", ["price|basis"]),
    ],
)
add(
    "B125",
    "outline",
    [
        "Adjustments to securities subject to corporate actions is its own bullet",
        "Options already had a strike; this is the leaf-wide adjustment idea",
        "The outline prints the idea, not an OCC memo",
    ],
    "Adjustments to securities subject to corporate actions stands between split-impact and notices/deadlines.",
    [
        "Adjustments — printed.",
        "Notices and deadlines = B126.",
        "stub: a listed-options adjustment recipe is not printed.",
    ],
    [
        ("Names adjustments to securities", ["adjust"]),
        ("Ties them to corporate actions", ["corporate|split|action|adjust"]),
    ],
)
add(
    "B126",
    "outline",
    [
        "Delivery of notices and corporate action deadlines is one official bullet",
        "Proxies are the next bite — do not merge them",
        "No clock is printed",
    ],
    "Delivery of notices and corporate action deadlines is the official pairing. FINRA 2251 (forwarding of proxy and other issuer-related materials) sits on the Section 3 rule list — a citation, not a day-count.",
    [
        "Notices and deadlines — printed.",
        "Proxies = B127.",
        "stub: a numeric notice window is not printed.",
    ],
    [
        ("Names notices and deadlines", ["notice", "deadline"]),
        ("Puts them on corporate actions", ["corporate|notice|deadline"]),
    ],
)
add(
    "B127",
    "outline",
    [
        "Proxies and proxy voting is the last corporate-action bullet",
        "’34 Act Section 14 (Proxies) is on the Section 3 citation list",
        "Notices/deadlines was the previous bite",
    ],
    "Proxies and proxy voting is the official pairing. Transfer agents (1.1.4) are the plumbing; this bite is the vote.",
    [
        "Proxies and proxy voting — printed.",
        "SEC ’34 Act Section 14 — cited.",
    ],
    [
        ("Names proxies / proxy voting", ["prox"]),
        ("Puts them on corporate actions", ["prox|vote|voting"]),
    ],
)

# --- 3.2.1 account types ---
add(
    "B128",
    "outline",
    [
        "Cash is the first official account type",
        "Margin is the next bullet — keep them split",
        "The outline prints the name, not a Regulation T recipe",
    ],
    "Cash stands alone as an account type. Margin, options, discretionary, fee-based vs commission, and educational accounts follow.",
    [
        "Cash — printed.",
        "Margin = B129.",
        "Regulation T is cited later on the Section 3 list, under the margin world.",
    ],
    [
        ("Names cash accounts", ["cash"]),
        ("Keeps them off the margin bite", ["cash|account"]),
    ],
)
add(
    "B129",
    "outline",
    [
        "Margin is its own official account type",
        "FINRA 4210 and Regulation T sit on the Section 3 rule list",
        "The outline does not print a 50% initial number here",
    ],
    "Margin is a named account type. FINRA 2264 (margin disclosure statement) is also cited. Do not invent an initial-margin fraction.",
    [
        "Margin — printed.",
        "FINRA 4210, 2264, Regulation T — cited, not numbered as facts.",
        "stub: an initial-margin percentage is not printed on this bullet.",
    ],
    [
        ("Names margin accounts", ["margin"]),
        ("Does not invent a percentage", ["margin"]),
    ],
)
add(
    "B130",
    "outline",
    [
        "Options is a named account type, not just a product leaf",
        "The ODD already lived under 2.1.3 special disclosures",
        "Approval is implied by ‘account type’; the outline does not print a level list",
    ],
    "Options stands alone under account types. Product knowledge was 2.1.3; this bite is that you need the account.",
    [
        "Options — printed as an account type.",
        "ODD = B071.",
        "stub: option-approval levels are not printed.",
    ],
    [
        ("Names options accounts", ["option"]),
        ("Treats them as an account type", ["account|option"]),
    ],
)
add(
    "B131",
    "outline",
    [
        "Discretionary vs non-discretionary is an official account-type cut",
        "The same words already appeared as order types",
        "FINRA 3260 (discretionary accounts) is cited in Section 3",
    ],
    "Discretionary vs. non-discretionary is reused as an account-type bullet. Order-ticket discretionary was B110.",
    [
        "Discretionary vs non-discretionary — printed.",
        "FINRA 3260 — cited.",
    ],
    [
        ("Splits discretionary from non-discretionary", ["discretionary", "non-discretionary|nondiscretionary|non discretionary"]),
        ("Puts the cut on accounts", ["account|discretion"]),
    ],
)
add(
    "B132",
    "outline",
    [
        "Fee-based vs commission is an official account-type cut",
        "Trade capacity (principal/agency) was the trading-side sibling",
        "The outline does not print a suitability-of-fee test",
    ],
    "Fee-based vs. commission is the official pairing. Principal vs agency was B112.",
    [
        "Fee-based vs commission — printed.",
        "FINRA 2120 (commissions, mark ups and charges) is cited.",
    ],
    [
        ("Splits fee-based from commission", ["fee", "commission"]),
        ("Puts the cut on accounts", ["account|fee|commission"]),
    ],
)
add(
    "B133",
    "outline",
    [
        "Educational accounts are the last 3.2.1 type",
        "529s already lived under municipal fund securities",
        "The outline prints the account-type name, not a product recipe",
    ],
    "Educational accounts is the official type name on this leaf. Product detail for 529s is 2.1.5.",
    [
        "Educational accounts — printed.",
        "529 prepaid / savings = B085.",
    ],
    [
        ("Names educational accounts", ["education"]),
        ("Does not restated the whole 529 type list", ["education|529|account"]),
    ],
)

# --- 3.2.2 registrations ---
add(
    "B134",
    "outline",
    [
        "Individual is the first official registration",
        "Joint is the next bullet",
        "The outline prints the name, not a TOD recipe",
    ],
    "Individual stands alone as a customer-account registration. The later names on this leaf are joint, corporate/institutional, trust, custodial, partnerships, and retirement.",
    [
        "Individual — printed.",
        "Joint = B135.",
        "stub: TOD / POD extras are not printed.",
    ],
    [
        ("Names individual registration", ["individual"]),
        ("Keeps it off joint / trust", ["individual|account"]),
    ],
)
add(
    "B135",
    "outline",
    [
        "Joint is its own official registration",
        "The outline does not print JTWROS vs TIC here",
        "Tenants in common as a DPP type is a different leaf",
    ],
    "Joint stands alone. Do not invent a survivorship menu.",
    [
        "Joint — printed.",
        "DPP TIC is B093, a product, not this registration.",
        "stub: JTWROS / JTIC / tenancy by the entirety names are not printed here.",
    ],
    [
        ("Names joint registration", ["joint"]),
        ("Does not invent a survivorship menu", ["joint"]),
    ],
)
add(
    "B136",
    "outline",
    [
        "Corporate/institutional is one official registration bullet",
        "Institutional investors were already a 1.1.4 category",
        "The outline prints the pairing, not a corporate-resolution recipe",
    ],
    "Corporate/institutional is the official registration name. Investor categories (retail / accredited / institutional) were authored at B010.",
    [
        "Corporate/institutional — printed.",
        "stub: which officers must sign is not printed.",
    ],
    [
        ("Names corporate/institutional registration", ["corporate|institutional"]),
        ("Treats it as an account registration", ["account|corporate|institution"]),
    ],
)
add(
    "B137",
    "outline",
    [
        "Trust registrations the outline names: revocable and irrevocable",
        "That is the official pair",
        "Custodial (UTMA) is the next bite — do not merge them",
    ],
    "Trust (e.g., revocable, irrevocable) is the official pair.",
    [
        "Revocable and irrevocable — printed.",
        "Custodial / UTMA = B138.",
    ],
    [
        ("Names revocable and irrevocable trusts", ["revocable", "irrevocable"]),
        ("Calls them trusts", ["trust"]),
    ],
)
add(
    "B138",
    "outline",
    [
        "Custodial registrations — the outline’s example is UTMA",
        "UGMA is not printed on this bullet",
        "Owner vs beneficiary on 529s was a different leaf",
    ],
    "Custodial (e.g., UTMA) prints one example. Do not add UGMA as if this edition listed it.",
    [
        "UTMA — official example.",
        "stub: UGMA is not printed on this bullet.",
        "stub: a transfer-at-age number is not printed.",
    ],
    [
        ("Names custodial / UTMA", ["custodial|utma"]),
        ("Does not invent UGMA as an outline print", ["custod|utma"]),
    ],
)
add(
    "B139",
    "outline",
    [
        "Partnerships are an official account registration",
        "Partnership as a hedge-fund or DPP structure is a product fact, not this bite",
        "The outline prints the registration name",
    ],
    "Partnerships stands alone on the registration list. Product partnership language lives on the DPP and hedge-fund leaves.",
    [
        "Partnerships — printed as a registration.",
        "DPP limited partnerships = B093.",
    ],
    [
        ("Names partnership registrations", ["partnership"]),
        ("Treats them as an account registration", ["account|partnership"]),
    ],
)
add(
    "B140",
    "outline",
    [
        "Retirement nests IRA and qualified plans, then types/characteristics, RMDs, contributions",
        "That nested list is the official retirement bite",
        "Do not invent a contribution-dollar number",
    ],
    "Retirement (e.g., individual retirement account (IRA), qualified plans) nests types and characteristics, required minimum distributions, and contributions. Those nested names are the note. No dollar figure is printed.",
    [
        "IRA and qualified plans — printed examples.",
        "Types and characteristics; required minimum distributions; contributions — nested official lines.",
        "stub: a contribution cap or RMD age is not printed.",
    ],
    [
        ("Names IRA or qualified plans", ["ira|individual retirement", "qualified"]),
        ("Includes RMDs or contributions", ["required minimum|rmd", "contribution"]),
    ],
)

# --- 3.2.3 AML ---
add(
    "B141",
    "outline",
    [
        "Definition of money laundering is its own official bullet",
        "Stages are the next bite — do not steal placement/layering here",
        "The outline prints the definition ask, not a statute quote",
    ],
    "Definition of money laundering stands alone. Stages (structuring, layering, placement) are the next official examples.",
    [
        "Definition here; stages at B142.",
        "USA PATRIOT Act sections 314 / 326 / 352 are cited on the Section 3 list — names only.",
    ],
    [
        ("Defines money laundering", ["money", "launder"]),
        ("Leaves stages to the next bite", ["launder"]),
    ],
)
add(
    "B142",
    "outline",
    [
        "Stages the outline names: structuring, layering, placement",
        "That is the official trio — do not add integration as if this PDF listed it",
        "Definition was the previous bite",
    ],
    "Stages of money laundering (e.g., structuring, layering, placement) prints three names. Use those three. A fourth textbook stage is not on this outline.",
    [
        "Structuring, layering, placement — official examples.",
        "Do not grade ‘integration’ as an outline print.",
    ],
    [
        ("Names placement and layering", ["placement", "layering"]),
        ("Includes structuring", ["structuring"]),
    ],
)
add(
    "B143",
    "outline",
    [
        "AML compliance program is a named official bullet",
        "FINRA 3310 and MSRB G-41 sit on the Section 3 rule list",
        "SAR / CTR / FinCEN / OFAC are later named pieces, not this bite",
    ],
    "AML compliance program stands alone. The next four bullets name SAR, CTR, FinCEN, and OFAC/SDNs.",
    [
        "AML compliance program — printed.",
        "FINRA 3310, MSRB G-41, USA PATRIOT 352 — cited.",
    ],
    [
        ("Names the AML compliance program", ["aml", "program|compliance"]),
        ("Leaves SAR/CTR to their bites", ["aml|launder"]),
    ],
)
add(
    "B144",
    "outline",
    [
        "SAR is a named official report",
        "The exam preamble already used SAR as a rule-based example",
        "Do not invent a dollar trigger",
    ],
    "Suspicious Activity Report (SAR) is its own bullet. The outline’s page-2 example already flagged SAR reporting requirements as rule-based knowledge. No dollar figure is printed here.",
    [
        "SAR — printed.",
        "CTR is the next, different report.",
        "stub: a SAR dollar threshold is not printed on this bullet.",
    ],
    [
        ("Names the SAR", ["sar|suspicious activity"]),
        ("Does not invent a dollar trigger", ["sar|suspicious"]),
    ],
)
add(
    "B145",
    "outline",
    [
        "CTR is a named official report, different from the SAR",
        "The outline prints the name, not a dollar trigger",
        "FinCEN is the next bite",
    ],
    "Currency Transaction Report (CTR) stands alone. Do not invent a $10,000 line as if this bullet printed it.",
    [
        "CTR — printed.",
        "stub: a CTR dollar threshold is not printed on this bullet.",
    ],
    [
        ("Names the CTR", ["ctr|currency transaction"]),
        ("Keeps it off the SAR", ["ctr|currency"]),
    ],
)
add(
    "B146",
    "outline",
    [
        "FinCEN is a named official AML name",
        "It sits between CTR and OFAC",
        "The outline prints the name, not an org chart",
    ],
    "FinCEN is its own bullet. SARs and CTRs are the neighboring report names.",
    [
        "FinCEN — printed.",
        "OFAC / SDNs = B147.",
    ],
    [
        ("Names FinCEN", ["fincen"]),
        ("Puts it on the AML leaf", ["fincen|aml|launder"]),
    ],
)
add(
    "B147",
    "outline",
    [
        "OFAC and the SDN list are one official bullet",
        "This is the sanctions name, not the SAR/CTR name",
        "The outline prints both acronyms",
    ],
    "Office of Foreign Asset Control (OFAC) and the Specially Designated Nationals and Blocked Persons (SDNs) List is the last AML bullet. Two names, one bite.",
    [
        "OFAC and SDNs — both printed.",
        "FinCEN was the previous name.",
    ],
    [
        ("Names OFAC and the SDN list", ["ofac", "sdn"]),
        ("Puts them on AML / sanctions", ["ofac|sdn|sanction|block"]),
    ],
)

# --- 3.2.4 books, records, privacy ---
add(
    "B148",
    "outline",
    [
        "Books and records retention requirements is its own official bullet",
        "SEC 17a-3 / 17a-4 and MSRB G-8 / G-9 sit on the Section 3 citation list",
        "Do not invent a six-year vs three-year table",
    ],
    "Books and records retention requirements stands alone. Confirmations, mail hold, BCP, custody, and Regulation S-P are later bullets on this leaf. Do not invent retention clocks.",
    [
        "Retention requirements — printed.",
        "17a-3, 17a-4, G-8, G-9 — cited, not unpacked.",
        "stub: a year-count table is not printed.",
    ],
    [
        ("Names retention requirements", ["retention|retain", "record|books"]),
        ("Does not invent a year table", ["record|retention"]),
    ],
)
add(
    "B149",
    "outline",
    [
        "Confirmations and account statements are one official pair",
        "FINRA 2231 / 2232 sit on the Section 3 rule list",
        "No delivery clock is printed",
    ],
    "Confirmations and account statements is the official pairing. Holding of customer mail is the next bite.",
    [
        "Confirmations and account statements — printed.",
        "FINRA 2231, 2232, SEC 10b-10 — cited.",
        "stub: a quarterly-vs-monthly rule is not printed here.",
    ],
    [
        ("Names confirmations and account statements", ["confirmation", "statement"]),
        ("Puts them on books-and-records", ["confirm|statement"]),
    ],
)
add(
    "B150",
    "outline",
    [
        "Holding of customer mail is a named official bullet",
        "FINRA 3150 is cited in Section 3",
        "The outline prints the topic, not a month cap",
    ],
    "Holding of customer mail stands alone. Do not invent how long mail may be held.",
    [
        "Holding of customer mail — printed.",
        "FINRA 3150 — cited.",
        "stub: a time limit is not printed.",
    ],
    [
        ("Names holding of customer mail", ["mail"]),
        ("Treats it as a books-and-records topic", ["mail|hold|customer"]),
    ],
)
add(
    "B151",
    "outline",
    [
        "Business continuity plans (BCP) are a named official bullet",
        "FINRA 4370 is cited in Section 3",
        "The outline prints the name, not a required-component list",
    ],
    "Business continuity plans (BCP) stands alone between mail hold and customer protection / custody.",
    [
        "BCP — printed.",
        "FINRA 4370 — cited.",
        "stub: a required-component laundry list is not printed.",
    ],
    [
        ("Names BCP", ["bcp|business continuity"]),
        ("Puts it on this compliance leaf", ["continuit|bcp"]),
    ],
)
add(
    "B152",
    "outline",
    [
        "Customer protection and custody of assets is one official bullet",
        "Custodians already lived in 1.1.4 as a participant",
        "The outline prints the pairing, not a reserve formula",
    ],
    "Customer protection and custody of assets is the official pairing. Privacy (Regulation S-P) is the next bite.",
    [
        "Customer protection and custody — printed.",
        "FINRA 4330 is cited later in Section 4’s list as well — still just a name.",
        "stub: a customer-reserve formula is not printed.",
    ],
    [
        ("Names customer protection and custody", ["protection|custody", "customer|asset"]),
        ("Keeps it off the privacy bullet", ["custody|protect"]),
    ],
)
add(
    "B153",
    "outline",
    [
        "Privacy is Regulation S-P, with four nested official lines",
        "Nonpublic personal information; confidentiality; privacy notifications; safeguard requirements",
        "That nested list is the note",
    ],
    "Privacy requirements (e.g., Regulation S-P) nests nonpublic personal information, confidentiality of information, privacy notifications, and safeguard requirements. Those four nested names plus the rule name are the official precision.",
    [
        "Regulation S-P — printed example.",
        "Nonpublic personal information; confidentiality; privacy notifications; safeguard requirements — nested official lines.",
    ],
    [
        ("Names Regulation S-P", ["s-p|s p|regulation s"]),
        ("Includes nonpublic info or notifications or safeguards", ["nonpublic|confidential|notification|safeguard"]),
    ],
)

# --- 3.2.5 communications / BI ---
add(
    "B154",
    "outline",
    [
        "Communications with the public and telemarketing nest classifications, general requirements, and the do-not-call list",
        "FINRA 2210 / 3230 and the FTC Telemarketing Sales Rule are cited",
        "Best interest / suitability is the next official bullet — do not merge them",
    ],
    "Communications with the public and telemarketing nests classifications and general requirements, plus the do-not-call list. That nested list is the note.",
    [
        "Classifications and general requirements — nested.",
        "Do-not-call list — nested.",
        "FINRA 2210, 3230, MSRB G-21 / G-39, FTC Telemarketing Sales Rule — cited.",
    ],
    [
        ("Names communications / telemarketing", ["communication|telemarket"]),
        ("Includes do-not-call or classifications", ["do-not-call|do not call|classif"]),
    ],
)
add(
    "B155",
    "outline",
    [
        "Best interest and suitability nest KYC and what constitutes a recommendation",
        "FINRA 2090 / 2111 and SEC 15l-1 (Reg BI) sit on the Section 3 list",
        "This is not the communications bullet",
    ],
    "Best interest obligations and suitability requirements nests know-your-customer (KYC) and general requirements (e.g., what constitutes a recommendation). Those nested names are the note.",
    [
        "KYC — nested official line.",
        "What constitutes a recommendation — printed e.g.",
        "FINRA 2090, 2111, SEC 15l-1 — cited.",
        "Form CRS (17a-14) is also on the Section 3 list — a name, not a form walkthrough.",
    ],
    [
        ("Names KYC or suitability / best interest", ["kyc|know-your-customer|know your customer", "suitab|best interest|recommendation"]),
        ("Includes what counts as a recommendation", ["recommend|suitab|kyc"]),
    ],
)

# --- 3.3 prohibited ---
add(
    "B156",
    "outline",
    [
        "Definition of market manipulation is its own official bullet",
        "The type list is the next bite — do not steal pump-and-dump here",
        "’34 Act Section 10 / 10b-5 sit on the citation list",
    ],
    "Definition of market manipulation stands alone. Types (rumors, pump and dump, front running, and the rest) are the next official examples.",
    [
        "Definition here; types at B157.",
        "FINRA 2020 and the 10b series are cited in Section 3.",
    ],
    [
        ("Defines market manipulation", ["manipul"]),
        ("Leaves named types to the next bite", ["manipul|market"]),
    ],
)
add(
    "B157",
    "outline",
    [
        "Official manipulation types: market rumors, pump and dump, front running, excessive trading, marking the close, marking the open, backing away, freeriding",
        "That list is the bite — do not add a type the outline did not print",
        "Front running of block transactions is also a cited FINRA rule name",
    ],
    "Types of market manipulation prints eight examples: market rumors, pump and dump, front running, excessive trading, marking the close, marking the open, backing away, freeriding. Use those names.",
    [
        "The eight printed examples are the official set.",
        "FINRA 5270 (front running of block transactions) is cited.",
        "Do not add spoofing as if this PDF listed it.",
    ],
    [
        ("Names several official types", ["pump", "front run|frontrun|front-run|marking the close|freerid|backing away"]),
        ("Treats them as manipulation types", ["manipul|rumor|pump|front"]),
    ],
)
add(
    "B158",
    "outline",
    [
        "Definition of insider trading is its own official bullet",
        "Material nonpublic information is the next definition",
        "ITSFEA is cited at the end of Section 3",
    ],
    "Definition of insider trading stands alone. MNPI, involved parties, and penalties are the next three bullets.",
    [
        "Definition here; MNPI at B159.",
        "ITSFEA; ’34 Act 20A / 21A; 10b5-1 / 10b5-2 — cited.",
    ],
    [
        ("Defines insider trading", ["insider", "trad"]),
        ("Leaves MNPI to the next bite", ["insider"]),
    ],
)
add(
    "B159",
    "outline",
    [
        "Material nonpublic information is its own official definition",
        "Insider trading was the previous definition",
        "The outline prints the phrase, not a court test",
    ],
    "Definition of material nonpublic information is the official wording. Involved parties and penalties follow.",
    [
        "MNPI — printed as a definition bullet.",
        "10b5-1 / 10b5-2 — cited.",
        "stub: a particular Supreme Court name is not printed.",
    ],
    [
        ("Names material nonpublic information", ["material", "nonpublic|non-public|non public"]),
        ("Puts it next to insider trading", ["insider|mnpi|material"]),
    ],
)
add(
    "B160",
    "outline",
    [
        "Identifying involved parties is its own official insider-trading bullet",
        "The outline prints the task, not a tipper/tippee diagram",
        "Penalties are the next bite",
    ],
    "Identifying involved parties stands alone between MNPI and penalties. Do not invent a named-case roster.",
    [
        "Involved parties — printed.",
        "stub: tipper/tippee vocabulary is not printed on this bullet.",
    ],
    [
        ("Names involved parties", ["involved|tipper|tippee|party|parties"]),
        ("Puts them on insider trading", ["insider|party|parties"]),
    ],
)
add(
    "B161",
    "outline",
    [
        "Penalties the outline names: fines, expulsion, incarceration",
        "Three official examples",
        "Do not invent a dollar multiple",
    ],
    "Penalties (e.g., fines, expulsion, incarceration) is the official trio. That is the printed precision.",
    [
        "Fines, expulsion, incarceration — official examples.",
        "’34 Act 21A (civil penalties) is cited — a name, not a number.",
        "stub: a treble-damages figure is not printed.",
    ],
    [
        ("Names fines and incarceration or expulsion", ["fine", "incarcer|expulsion|jail|prison"]),
        ("Treats them as insider-trading penalties", ["penalt|fine|insider"]),
    ],
)
add(
    "B162",
    "outline",
    [
        "Associated persons face IPO purchase restrictions",
        "FINRA 5130 is cited in Section 3",
        "The outline prints the restriction, not a family-member roster",
    ],
    "Restrictions preventing associated persons from purchasing initial public offerings (IPOs) is the first ‘other prohibited activities’ bullet. IPOs as an offering type already lived in 1.4.",
    [
        "IPO purchase restrictions — printed.",
        "FINRA 5130 — cited.",
        "stub: a restricted-person family list is not printed.",
    ],
    [
        ("Names IPO purchase restrictions", ["ipo", "restrict|associated|purchase"]),
        ("Puts them on associated persons", ["associated|ipo"]),
    ],
)
add(
    "B163",
    "outline",
    [
        "Manipulative, deceptive or other fraudulent devices is an official catch-all",
        "FINRA 2020 uses almost the same title",
        "Specific manipulation types already lived at B157",
    ],
    "Use of manipulative, deceptive or other fraudulent devices is the official wording. It sits next to the named manipulation list, not instead of it.",
    [
        "Manipulative, deceptive, fraudulent devices — printed.",
        "FINRA 2020; SEC 10b-5 / 15c1-2 — cited.",
    ],
    [
        ("Names manipulative / deceptive / fraudulent devices", ["manipul|deceptive|fraudulent"]),
        ("Treats it as a prohibited-activity catch-all", ["device|fraud|deceptive|manipul"]),
    ],
)
add(
    "B164",
    "outline",
    [
        "Improper use of customers’ securities or funds nests borrowing and sharing in accounts",
        "FINRA 2150 / 3240 sit on the Section 3 list",
        "Those two nested lines are the note",
    ],
    "Improper use of customers’ securities or funds nests borrowing from customers and sharing in customer accounts. Those nested names are the official precision.",
    [
        "Borrowing from customers — nested.",
        "Sharing in customer accounts — nested.",
        "FINRA 2150, 3240 — cited.",
    ],
    [
        ("Names improper use of customer funds/securities", ["improper|borrow|sharing", "customer"]),
        ("Includes borrowing or sharing", ["borrow|sharing|share in"]),
    ],
)
add(
    "B165",
    "outline",
    [
        "Financial exploitation of seniors is its own official bullet",
        "FINRA 2165 is cited (specified adults)",
        "The outline prints the topic, not an age number",
    ],
    "Financial exploitation of seniors stands alone. Do not invent a statutory age as if this bullet printed it.",
    [
        "Financial exploitation of seniors — printed.",
        "FINRA 2165 — cited as specified adults.",
        "stub: an age cutoff is not printed on this bullet.",
    ],
    [
        ("Names financial exploitation of seniors", ["exploit", "senior|specified adult|elder"]),
        ("Does not invent an age", ["exploit|senior"]),
    ],
)
add(
    "B166",
    "outline",
    [
        "Unregistered persons: no commissions, no soliciting customers, no taking orders",
        "Those two nested prohibitions are the official precision",
        "FINRA 2040 is cited",
    ],
    "Activities of unregistered persons nests prohibition against paying commissions to unregistered persons, and prohibition against solicitation of customers and taking orders. Those nested lines are the note. Section 4 later defines registered vs non-registered.",
    [
        "No commissions to unregistered persons — nested.",
        "No soliciting customers / taking orders — nested.",
        "FINRA 2040 — cited.",
    ],
    [
        ("Names unregistered-person limits", ["unregistered"]),
        ("Includes commissions or soliciting / taking orders", ["commission|solicit|order"]),
    ],
)
add(
    "B167",
    "outline",
    [
        "Falsifying or withholding documents nests signatures of convenience and responding to regulatory requests",
        "Those two nested lines are the official precision",
        "Books-and-records falsifying is the next, separate bullet",
    ],
    "Falsifying or withholding documents nests signatures of convenience and responding to regulatory requests. The next bullet is prohibited activities related to maintenance of books and records — keep them split.",
    [
        "Signatures of convenience — nested.",
        "Responding to regulatory requests — nested.",
        "Books-and-records falsifying = B168.",
    ],
    [
        ("Names falsifying or withholding documents", ["falsif|withhold", "document|signature"]),
        ("Includes signatures of convenience or regulatory requests", ["signature of convenience|signatures of convenience|regulatory request"]),
    ],
)
add(
    "B168",
    "outline",
    [
        "Books-and-records prohibited acts: falsifying records and improper maintenance/retention",
        "Retention requirements already lived at B148 as the affirmative duty",
        "This bite is the prohibition",
    ],
    "Prohibited activities related to maintenance of books and records (e.g., falsifying records and improper maintenance/retention of records) is the last 3.3.3 bullet. B148 was the retention requirement; this is the violation.",
    [
        "Falsifying records; improper maintenance/retention — official examples.",
        "17a-3 / 17a-4 remain the cited record rules.",
    ],
    [
        ("Names falsifying or improper retention", ["falsif", "retention|maintenance|record"]),
        ("Puts it on books and records", ["record|books"]),
    ],
)

# --- 4.1.1 registration / CE ---
add(
    "B169",
    "outline",
    [
        "SRO qualification nests registered vs non-registered, permitted activities, ineligibility, background checks, fingerprinting, statutory disqualification, failing to register",
        "That nested list is the official bite",
        "State / blue-sky and CE are the next two bullets",
    ],
    "SRO qualification and registration requirements nests: definition of registered vs. non-registered person; permitted activities of each; ineligibility for membership or association; background checks; fingerprinting; statutory disqualification; failing to register an associated person. Those nested lines are the note.",
    [
        "Registered vs non-registered; permitted activities; ineligibility; background checks; fingerprinting; statutory disqualification; failing to register — nested official lines.",
        "’34 Act 3(a)(39) and SEC 17f-2 (fingerprinting) are cited.",
        "stub: a Form U4 walkthrough lives on B172, not here.",
    ],
    [
        ("Splits registered from non-registered", ["registered", "non-registered|nonregistered|unregistered"]),
        ("Includes fingerprinting or statutory disqualification", ["fingerprint|statutory disqualif|background"]),
    ],
)
add(
    "B170",
    "outline",
    [
        "State registration requirements — the outline’s example is blue-sky laws",
        "Blue-sky already appeared under offerings (1.4) and state regulators (NASAA)",
        "This bite is the associated-person / state cut",
    ],
    "State registration requirements (e.g., blue-sky laws) is the official pairing on the registration leaf. NASAA was the 1.1.3 example; 1.4 used blue-sky as a filing/exemption example.",
    [
        "Blue-sky laws — official example.",
        "NASAA = B006. Offerings exemptions = B038.",
    ],
    [
        ("Names state / blue-sky registration", ["state|blue-sky|blue sky", "regist"]),
        ("Puts it on associated persons, not only on offerings", ["state|blue"]),
    ],
)
add(
    "B171",
    "outline",
    [
        "CE nests two official elements: Firm Element and Regulatory Element",
        "FINRA 1240 is cited",
        "Do not invent a day-count or a CE window",
    ],
    "Continuing Education (CE) requirement nests Firm Element and Regulatory Element. Those two names are the official precision.",
    [
        "Firm Element and Regulatory Element — nested official lines.",
        "FINRA 1240 — cited.",
        "stub: a calendar window is not printed.",
    ],
    [
        ("Names Firm Element and Regulatory Element", ["firm element", "regulatory element"]),
        ("Calls it continuing education", ["continuing education|ce "]),
    ],
)

# --- 4.2.1 employee conduct ---
add(
    "B172",
    "outline",
    [
        "Form U4 and Form U5 — purpose and when to update",
        "The exam preamble already used Form U4 as a rule-based example",
        "Misleading filings are the next bite — do not steal the penalty here",
    ],
    "Form U4 and Form U5 (e.g., purpose, when to update forms) is the official prompt. The outline’s page-2 example already flagged U4 filing requirements as rule-based knowledge.",
    [
        "Purpose and when to update — printed e.g.",
        "FINRA 2263 (arbitration disclosure on U4) is cited.",
        "Consequences of misleading / omitting = B173.",
    ],
    [
        ("Names Form U4 and Form U5", ["u4", "u5"]),
        ("Includes purpose or when to update", ["purpose|update"]),
    ],
)
add(
    "B173",
    "outline",
    [
        "Filing misleading information or omitting information has consequences",
        "FINRA 1122 is cited (filing of misleading information)",
        "This is not the U4-purpose bite",
    ],
    "Consequences of filing misleading information or omitting information stands alone between the U4/U5 purpose bite and customer complaints.",
    [
        "Misleading or omitting — printed.",
        "FINRA 1122 — cited.",
        "stub: a named sanction schedule is not printed.",
    ],
    [
        ("Names misleading or omitting filings", ["misleading|omit", "filing|form|u4|u5"]),
        ("Talks consequences", ["consequence|disciplin|sanction|penalt"]),
    ],
)
add(
    "B174",
    "outline",
    [
        "Customer complaints are a named official conduct bullet",
        "FINRA 4513 (written customer complaints) is cited",
        "The outline prints the topic, not a 30-day clock",
    ],
    "Customer complaints stands alone on the employee-conduct leaf. Potential red flags is the next bite.",
    [
        "Customer complaints — printed.",
        "FINRA 4513 — cited.",
        "stub: a written-complaint clock is not printed.",
    ],
    [
        ("Names customer complaints", ["complaint"]),
        ("Puts them on employee conduct", ["complaint|customer"]),
    ],
)
add(
    "B175",
    "outline",
    [
        "Potential red flags is the last employee-conduct bullet",
        "The outline prints the topic, not a checklist",
        "Reportable events (OBA, PST, gifts) are the next leaf",
    ],
    "Potential red flags stands alone. Do not invent a numbered checklist as if the PDF printed one.",
    [
        "Potential red flags — printed.",
        "Reportable events start at B176.",
        "stub: a canned red-flag roster is not printed.",
    ],
    [
        ("Names potential red flags", ["red flag"]),
        ("Puts them on employee conduct", ["red flag|conduct"]),
    ],
)

# --- 4.2.2 reportable events ---
add(
    "B176",
    "outline",
    [
        "Outside business activities are a named reportable event",
        "FINRA 3270 is cited",
        "Private securities transactions are the next, different bullet",
    ],
    "Outside business activities is the first reportable-event bullet. Private securities transactions follow as their own official name.",
    [
        "Outside business activities — printed.",
        "FINRA 3270 — cited.",
        "PST = B177.",
    ],
    [
        ("Names outside business activities", ["outside", "business"]),
        ("Keeps them off private securities transactions", ["outside|oba"]),
    ],
)
add(
    "B177",
    "outline",
    [
        "Private securities transactions are a named reportable event",
        "FINRA 3280 is cited",
        "OBA was the previous bite — keep the names straight",
    ],
    "Private securities transactions stands alone next to outside business activities. Two official names, two bites.",
    [
        "Private securities transactions — printed.",
        "FINRA 3280 — cited.",
    ],
    [
        ("Names private securities transactions", ["private", "securities", "transaction"]),
        ("Keeps them off OBA", ["private|pst"]),
    ],
)
add(
    "B178",
    "outline",
    [
        "Political contributions must be reported; exceeding dollar thresholds has consequences",
        "MSRB G-37 is cited",
        "The outline does not print the dollar figure — leave it stub",
    ],
    "Reporting of political contributions and consequences for exceeding dollar contribution thresholds is the official wording. A dollar number is not printed. Do not invent one.",
    [
        "Reporting and consequences for exceeding thresholds — printed.",
        "MSRB G-37 — cited.",
        "stub: the dollar contribution threshold is not printed on this bullet.",
    ],
    [
        ("Names political contributions", ["political", "contribution"]),
        ("Includes reporting or exceeding thresholds", ["report|threshold|exceed"]),
    ],
)
add(
    "B179",
    "outline",
    [
        "Gifts, gratuities, and non-cash compensation have dollar and value limits",
        "FINRA 3220 and MSRB G-20 are cited; several non-cash-compensation rule slices are also listed",
        "The outline does not print the dollar figure — leave it stub",
    ],
    "Dollar and value limits for gifts and gratuities and non-cash compensation is the official wording. Business entertainment is the next, separate bullet. Do not invent a $100 line.",
    [
        "Gifts, gratuities, non-cash compensation — printed.",
        "FINRA 3220, 2310(c), 2320(g)(4), 2341(l)(5), 5110(h); MSRB G-20 — cited.",
        "stub: the dollar/value number is not printed on this bullet.",
    ],
    [
        ("Names gifts / gratuities / non-cash compensation", ["gift|gratuit", "non-cash|noncash|non cash"]),
        ("Talks limits without inventing a number", ["limit|value|dollar"]),
    ],
)
add(
    "B180",
    "outline",
    [
        "Business entertainment is its own official reportable-event bullet",
        "It sits next to gifts and gratuities, not inside that bullet",
        "The outline prints the name, not a meal-cap",
    ],
    "Business entertainment stands alone after the gifts/gratuities/non-cash-compensation bullet. Keep the names split.",
    [
        "Business entertainment — printed.",
        "Gifts/gratuities = B179.",
        "stub: a per-person entertainment cap is not printed.",
    ],
    [
        ("Names business entertainment", ["entertainment"]),
        ("Keeps it off the gifts bullet", ["entertainment|business"]),
    ],
)
add(
    "B181",
    "outline",
    [
        "Reportable personal events: felony, financial-related misdemeanors, liens, bankruptcy",
        "Those four official names are the bite",
        "Statutory disqualification already lived under 4.1.1",
    ],
    "Felony, financial-related misdemeanors, liens, bankruptcy is the last official reportable-event list. Form U4/U5 (B172) is where updates live; this bite is the event names.",
    [
        "Felony; financial-related misdemeanors; liens; bankruptcy — printed.",
        "Statutory disqualification was nested under B169.",
        "FINRA 4530 (reporting requirements) is cited.",
    ],
    [
        ("Names felony or financial misdemeanors", ["felony", "misdemeanor"]),
        ("Includes liens or bankruptcy", ["lien|bankruptcy"]),
    ],
)

assert len(NOTES) == 178, len(NOTES)
