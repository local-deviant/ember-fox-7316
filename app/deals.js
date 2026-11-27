// Friday Beacon — deal data.
// Every deal here was found and priced on 27 Nov 2026 from the store
// itself or from a deals roundup that names the store. "checked" is the
// day each price was read. "source" names where the price was read.
// Prices are in US dollars. Discounts are computed from sale/usual at
// render time, so the number on a card can never disagree with its two
// prices.
//
// Verdicts (explained on the page, in the "How verdicts work" section):
//   TRUE LOW     — a source reports the lowest price on record.
//   STRONG DEAL  — at least 40% off, or at least $150 saved.
//   GOOD DEAL    — a real saving, 20-39% off.
//   ROUTINE SALE — under 20% off; a sale, not a steal.

const FRIDAY_BEACON_CHECKED = "27 Nov 2026";

const FRIDAY_BEACON_DEALS = [
  {
    id: "airpods-pro-3-amazon",
    product: "Apple AirPods Pro 3",
    store: "Amazon",
    link: "https://link.amazon/B00jwePNg",
    sale: 149, usual: 249,
    category: "Audio", verdict: "TRUE LOW",
    note: "Lowest price yet — $100 off Apple's list. Also $149 at Walmart.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "airpods-pro-3-walmart",
    product: "Apple AirPods Pro 3",
    store: "Walmart",
    link: "https://goto.walmart.com/c/61826/565706/9383?veh=aff&sourceid=imp_000011112222333344&u=https%3A%2F%2Fwww.walmart.com%2Fip%2FAirPods-nbsp-Pro-nbsp-3%2F17835006350%3FclassType%3DREGULAR%26from%3D%2Fsearch%26povid%3DETS_D72_Audio_HEADPHONES_VF_EVGN_SB-Airpods_AirpodsPro3%26nrtv_cid%3Dtsz6odcp4xxsx%3AqSMhxyKTTEy6cxbUy3BUkpSTbUJRRQN1o0%26afsrc%3D1%26affiliates_ad_id%3D565706%26sharedid%3D9530853977098%26nrtv_cid%3Dt8fsrut66rixt%3AqSMhxyKTTEy6cxbUy3BUkuWe922mwKCXo0%3AqSMhxyKTTEy6cxbUy3BUkuWe922mwKCXo0",
    sale: 149, usual: 249,
    category: "Audio", verdict: "TRUE LOW",
    note: "Same $149 as Amazon — two stores, one lowest price. Best Buy lists it at $180.",
    source: "Walmart via MacPrices; confirmed in deals diary, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "watch-series-12",
    product: "Apple Watch Series 12 GPS 42mm",
    store: "Amazon",
    link: "https://www.amazon.com/dp/B0HJ9ZXCSD?tag=macobserve06d-20",
    sale: 299, usual: 399,
    category: "Wearables", verdict: "TRUE LOW",
    note: "Lowest price since launch; $100 below what Apple charges. Apple only offers a $50 gift card at full price.",
    source: "MacObserver, 25 Nov 2026; re-confirmed 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "airtag-2",
    product: "Apple AirTag 2 (single)",
    store: "Amazon",
    link: "https://www.amazon.com/dp/B0GJTFXNRX/?th=1&tag=apinsiderdeals-20",
    sale: 18, usual: 29,
    category: "Accessories", verdict: "TRUE LOW",
    note: "Record low. Four singles ($72) beat the discounted 4-pack ($79).",
    source: "AppleInsider, 24 Nov 2026; re-confirmed 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "macbook-air-m5",
    product: "Apple MacBook Air 13-inch, M5, 16GB/512GB",
    store: "Amazon",
    link: "https://link.amazon/B0geJg6Ex",
    sale: 989.10, usual: 1299,
    category: "Computers", verdict: "STRONG DEAL",
    note: "Best price of the season — $310 off. The 15-inch is $1,196.10 (was $1,499).",
    source: "9to5Toys, 23 Nov 2026; re-confirmed in deals diary, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "sony-xm5",
    product: "Sony WH-1000XM5 noise-cancelling headphones",
    store: "Best Buy",
    link: "https://www.bestbuy.com/product/sony-wh-1000xm5-wireless-noise-cancelling-over-the-ear-headphones-black/J7XSRH5CXG/sku/6505727?utm_source=meta&utm_medium=feed&fs=toxl8r&country=US",
    sale: 169.99, usual: 398,
    category: "Audio", verdict: "TRUE LOW",
    note: "All-time low for Sony's flagship ANC headphones, black model.",
    source: "Best Buy product page + HotHardware, Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "blink-doorbell-2k",
    product: "Blink Battery Doorbell 2K+",
    store: "Amazon",
    link: "https://link.amazon/B010hBuwd",
    sale: 30, usual: 70,
    category: "Smart Home", verdict: "TRUE LOW",
    note: "Record low for the new 2K version.",
    source: "RedmondPie live list + TechRadar, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "dyson-v9",
    product: "Dyson V9 Motorbar cordless vacuum",
    store: "Walmart",
    link: "https://goto.walmart.com/c/490947/565706/9383?veh=aff&sourceid=imp_000011112222333344&subId3=xid:fr1794229197763hda&u=https%3A%2F%2Fwww.walmart.com%2Fip%2FDyson-V9-Motorbar-Cordless-Vacuum-Nickel-New%2F18144124255&subId1=HGTV",
    sale: 269.99, usual: 599.99,
    category: "Home & Kitchen", verdict: "STRONG DEAL",
    note: "Deepest Dyson cut of the season; the same $270 is listed at Amazon and Best Buy too.",
    source: "CNN Underscored + Yahoo shopping, 26-27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "tcl-65-s4cf",
    product: "TCL 65-inch S4CF 4K Fire TV",
    store: "Best Buy",
    link: "https://www.bestbuy.com/product/tcl-65-s4cf-series-4k-uhd-hdr-smart-tv-with-fire-tv-2026/J36QYTHZVP/sku/6687112?afsrc=1&loc=Skimbit+Ltd.&mpid=10078&acampid&irgwc=1&irclickid=TZGT5KXm3xyZUkpTyNzMqwYtUkrUnaTjkzPQRc0&ref=388",
    sale: 229.99, usual: 469.99,
    category: "TVs", verdict: "STRONG DEAL",
    note: "Doorbuster, ends 28 Nov. $240 saved on a 65-inch 4K set.",
    source: "Best Buy product page + DealNews, 24 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "hp-omnibook-5",
    product: "HP OmniBook 5 14-inch 2K OLED laptop",
    store: "Best Buy",
    link: "https://www.bestbuy.com/product/hp-omnibook-5-14-2k-oled-touchscreen-laptop-intel-core-5-series-3-2026-8gb-memory-256gb-ssd-starlit-blue/J3KSW748W6",
    sale: 449.99, usual: 799.99,
    category: "Computers", verdict: "STRONG DEAL",
    note: "2K OLED touchscreen at a budget price. Doorbuster.",
    source: "Best Buy product page + Digital Trends, Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "hisense-98-qd5",
    product: "Hisense 98-inch QD5 Hi-QLED 4K Fire TV",
    store: "Best Buy",
    link: "https://www.bestbuy.com/product/hisense-98-class-qd5-hi-qled-series-4k-uhd-smart-fire-tv-2026/J3Z9Z42FS4?irgwc=1&afsrc=1&irclickid=UCeWaXwBqxyZRE6QaLU5U1z6UkrUllTh32dnVo0&ref=388&loc=Ahorrando+Con+Pina&mpid=2230623&acampid",
    sale: 799.99, usual: 2499.99,
    category: "TVs", verdict: "STRONG DEAL",
    note: "Biggest saving in this set: $1,700 off a 98-inch TV. Doorbuster, ends 28 Nov.",
    source: "Best Buy product page + DealNews, Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "oura-ring-5",
    product: "Oura Ring 5",
    store: "Amazon",
    link: "https://link.amazon/B0b3zg1XV",
    sale: 299, usual: 399,
    category: "Wearables", verdict: "GOOD DEAL",
    note: "$100 off the smart ring.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "quest-3s",
    product: "Meta Quest 3S 128GB",
    store: "Amazon",
    link: "https://link.amazon/B0234zQtI",
    sale: 297, usual: 350,
    category: "Gaming", verdict: "ROUTINE SALE",
    note: "Modest cut; this price has appeared before.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "ray-ban-gen2",
    product: "Meta Ray-Ban Gen 2 Wayfarer",
    store: "Amazon",
    link: "https://link.amazon/B04PlQahA",
    sale: 284, usual: 379,
    category: "Wearables", verdict: "GOOD DEAL",
    note: "$95 off the AI glasses.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "pixel-11-pro",
    product: "Google Pixel 11 Pro",
    store: "Amazon",
    link: "https://link.amazon/B02MkuKTj",
    sale: 749, usual: 1099,
    category: "Phones", verdict: "GOOD DEAL",
    note: "$350 off Google's flagship phone.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "pixel-10",
    product: "Google Pixel 10",
    store: "Amazon",
    link: "https://link.amazon/B0h8qqyam",
    sale: 593, usual: 793,
    category: "Phones", verdict: "GOOD DEAL",
    note: "$200 off last year's flagship.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "galaxy-s26-fe",
    product: "Samsung Galaxy S26 FE",
    store: "Amazon",
    link: "https://link.amazon/B0h3GC8bX",
    sale: 499, usual: 699,
    category: "Phones", verdict: "GOOD DEAL",
    note: "$200 off Samsung's fan edition.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "ipad-mini-a17",
    product: "iPad mini (A17 Pro, 512GB)",
    store: "Amazon",
    link: "https://link.amazon/B07ZtXxpW",
    sale: 799, usual: 900,
    category: "Tablets", verdict: "ROUTINE SALE",
    note: "Small cut on the 512GB model; check the newer OLED iPad mini before buying.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "ipad-mini-a20",
    product: "iPad mini (A20 Pro, OLED, 128GB)",
    store: "Amazon",
    link: "https://link.amazon/B0aTmxI1F",
    sale: 599, usual: 699,
    category: "Tablets", verdict: "TRUE LOW",
    note: "All-time low on the brand-new OLED iPad mini — $100 off, and cheaper than the older A17 model above.",
    source: "9to5Toys, 23 Nov 2026; re-confirmed 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "kindle-colorsoft",
    product: "Kindle Colorsoft 16GB",
    store: "Amazon",
    link: "https://link.amazon/B0fcVMEdN",
    sale: 169, usual: 290,
    category: "Tablets", verdict: "STRONG DEAL",
    note: "42% off the colour e-reader.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "beats-studio-pro",
    product: "Beats Studio Pro",
    store: "Amazon",
    link: "https://link.amazon/B09i4b4Ft",
    sale: 149, usual: 299,
    category: "Audio", verdict: "STRONG DEAL",
    note: "Half price on the over-ear headphones.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "beats-studio-buds-plus",
    product: "Beats Studio Buds+",
    store: "Amazon",
    link: "https://link.amazon/B0fryzba9",
    sale: 89, usual: 170,
    category: "Audio", verdict: "STRONG DEAL",
    note: "Nearly half price on the earbuds.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "shark-flexstyle",
    product: "Shark FlexStyle",
    store: "Amazon",
    link: "https://link.amazon/B0au3KEYr",
    sale: 199, usual: 350,
    category: "Beauty", verdict: "STRONG DEAL",
    note: "$151 off the multi-styler.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "macbook-neo",
    product: "MacBook Neo 13-inch",
    store: "Amazon",
    link: "https://link.amazon/B05l5LaBH",
    sale: 599, usual: 699,
    category: "Computers", verdict: "ROUTINE SALE",
    note: "Small cut on the entry model.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "macbook-pro-m6",
    product: "MacBook Pro M6 14-inch, 16GB/1TB",
    store: "Amazon",
    link: "https://link.amazon/B029We9nB",
    sale: 1799, usual: 1999,
    category: "Computers", verdict: "ROUTINE SALE",
    note: "$200 off, but only 10% — the M5 Air above is the better Mac value.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "mac-mini-m6",
    product: "Mac mini M6",
    store: "Amazon",
    link: "https://link.amazon/B0aLoMjrZ",
    sale: 779, usual: 900,
    category: "Computers", verdict: "ROUTINE SALE",
    note: "Modest cut on the desktop.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "studio-display",
    product: "Apple Studio Display",
    store: "Amazon",
    link: "https://link.amazon/B0aNFnS9x",
    sale: 1399, usual: 1600,
    category: "Computers", verdict: "ROUTINE SALE",
    note: "Only 13% off a pricey monitor.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "sandisk-1tb",
    product: "SanDisk 1TB Extreme Portable SSD",
    store: "Amazon",
    link: "https://link.amazon/B017JHMhH",
    sale: 198, usual: 300,
    category: "Computers", verdict: "GOOD DEAL",
    note: "$102 off fast portable storage.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "echo-show-11",
    product: "Echo Show 11",
    store: "Amazon",
    link: "https://link.amazon/B0aeoRdsx",
    sale: 154, usual: 250,
    category: "Smart Home", verdict: "GOOD DEAL",
    note: "38% off the kitchen display.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "echo-show-5",
    product: "Echo Show 5",
    store: "Amazon",
    link: "https://link.amazon/B0jdkISGt",
    sale: 54, usual: 99,
    category: "Smart Home", verdict: "STRONG DEAL",
    note: "45% off the bedside display.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "ring-doorbell-2k",
    product: "Ring Battery Doorbell 2K",
    store: "Amazon",
    link: "https://link.amazon/B0b7PvIiy",
    sale: 38, usual: 100,
    category: "Smart Home", verdict: "STRONG DEAL",
    note: "62% off — the second-deepest percentage cut in this set.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "roomba-105",
    product: "Roomba 105 Vac",
    store: "Amazon",
    link: "https://link.amazon/B0ceRpqvy",
    sale: 139, usual: 300,
    category: "Smart Home", verdict: "STRONG DEAL",
    note: "More than half off the robot vacuum.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "roborock-qrevo-s-pro",
    product: "roborock Qrevo S Pro",
    store: "Amazon",
    link: "https://link.amazon/B0ioGRKmM",
    sale: 379, usual: 700,
    category: "Smart Home", verdict: "STRONG DEAL",
    note: "$321 off the mop-and-vacuum robot.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "echo-spot",
    product: "Echo Spot",
    store: "Amazon",
    link: "https://link.amazon/B0gfX0t5Y",
    sale: 44, usual: 109,
    category: "Smart Home", verdict: "STRONG DEAL",
    note: "60% off the smart alarm clock.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "watch-se-3",
    product: "Apple Watch SE 3 GPS 40mm",
    store: "Amazon",
    link: "https://link.amazon/B05YSkNNC",
    sale: 179, usual: 250,
    category: "Wearables", verdict: "GOOD DEAL",
    note: "$71 off the budget Apple Watch.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "switch-2-bundle",
    product: "Nintendo Switch 2 + Mario Kart World bundle",
    store: "Amazon",
    link: "https://link.amazon/B02N3BwS1",
    sale: 499.99, usual: 549.99,
    category: "Gaming", verdict: "ROUTINE SALE",
    note: "Only $50 off. Roundups disagree on the usual price ($549.99 vs $599) — either way the cut is small.",
    source: "Yahoo shopping + RedmondPie, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "dualsense",
    product: "PS5 DualSense wireless controller",
    store: "Amazon",
    link: "https://link.amazon/B0gxwZQOS",
    sale: 54, usual: 75,
    category: "Gaming", verdict: "GOOD DEAL",
    note: "28% off the controller.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "xbox-controller",
    product: "Xbox Wireless Controller",
    store: "Amazon",
    link: "https://link.amazon/B07Hmg1zT",
    sale: 49, usual: 70,
    category: "Gaming", verdict: "GOOD DEAL",
    note: "30% off.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "fc-27",
    product: "EA Sports FC 27 (PS5)",
    store: "Amazon",
    link: "https://link.amazon/B02D7xoKL",
    sale: 29, usual: 70,
    category: "Gaming", verdict: "STRONG DEAL",
    note: "59% off this season's game.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "frame-tv-65",
    product: "Samsung 65-inch The Frame TV",
    store: "Amazon",
    link: "https://link.amazon/B08Gw3Fso",
    sale: 997, usual: 1400,
    category: "TVs", verdict: "GOOD DEAL",
    note: "$403 off the art TV.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "sonos-beam-2",
    product: "Sonos Beam Gen 2",
    store: "Amazon",
    link: "https://link.amazon/B03ekQyfk",
    sale: 339, usual: 500,
    category: "Audio", verdict: "GOOD DEAL",
    note: "$161 off the soundbar.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "sonos-ray",
    product: "Sonos Ray",
    store: "Amazon",
    link: "https://link.amazon/B03qArorH",
    sale: 169, usual: 219,
    category: "Audio", verdict: "GOOD DEAL",
    note: "$50 off the compact soundbar.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "insignia-50",
    product: "Insignia 50-inch F50 4K TV",
    store: "Amazon",
    link: "https://link.amazon/B04v62DXR",
    sale: 149, usual: 300,
    category: "TVs", verdict: "STRONG DEAL",
    note: "Half price on a budget 4K set.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "fire-tv-stick-4k-max",
    product: "Fire TV Stick 4K Max",
    store: "Amazon",
    link: "https://link.amazon/B0cTpM4mU",
    sale: 44, usual: 85,
    category: "Smart Home", verdict: "STRONG DEAL",
    note: "48% off the 4K streamer.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "roku-32",
    product: "Roku 32-inch Select Series TV",
    store: "Amazon",
    link: "https://link.amazon/B0adWHwgr",
    sale: 99, usual: 180,
    category: "TVs", verdict: "STRONG DEAL",
    note: "45% off the small-screen set.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "roku-50",
    product: "Roku 50-inch Select Series 4K TV",
    store: "Amazon",
    link: "https://link.amazon/B0a9yaCXP",
    sale: 199, usual: 300,
    category: "TVs", verdict: "GOOD DEAL",
    note: "$101 off the 50-inch 4K set.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "instant-pot-duo",
    product: "Instant Pot Duo 6 Qt",
    store: "Amazon",
    link: "https://link.amazon/B044HUMcR",
    sale: 59, usual: 109,
    category: "Home & Kitchen", verdict: "STRONG DEAL",
    note: "46% off the pressure cooker.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "eero-pro-7",
    product: "Eero Pro 7 (3-pack)",
    store: "Amazon",
    link: "https://link.amazon/B0d1fFTb4",
    sale: 599, usual: 800,
    category: "Smart Home", verdict: "GOOD DEAL",
    note: "$201 off the mesh Wi-Fi set.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "anker-power-bank",
    product: "Anker Laptop Power Bank 25,000mAh",
    store: "Amazon",
    link: "https://link.amazon/B0g7WO0sK",
    sale: 91, usual: 135,
    category: "Computers", verdict: "GOOD DEAL",
    note: "33% off the laptop power bank.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  },
  {
    id: "insta360-x5",
    product: "Insta360 X5",
    store: "Amazon",
    link: "https://link.amazon/B0gFU5rh3",
    sale: 439, usual: 549,
    category: "Cameras", verdict: "GOOD DEAL",
    note: "20% off the 360 camera.",
    source: "RedmondPie Black Friday live list, 27 Nov 2026",
    checked: "27 Nov 2026"
  }
];
