/**
 * SCARLET EXPOSED - Interactive Scripts
 * Handles Evidence Lightbox, Multi-level Zoom, Filtering, and Clipboard
 */

// Comprehensive Evidence Dataset
const evidenceData = [
  {
    id: 0,
    badge: "EXHIBIT #02",
    title: "Panic Order: 'DONT SHOW SUPERMACY IMGUI'",
    image: "assets/images/evidence-01-dont-show-supremacy.png",
    timestamp: "07.09.2026 23:08",
    category: "imgui",
    transcript: `! Scarlet (07.09.2026 23:08):
DONT SHOW SUPERMACY IMGUI
@尺モK U 尺卂尺モ`,
    analysis: "Scarlet desperately warns the streamer not to expose the menu interface on stream. This confirms the cheat software is built on or directly utilizing the public 'Supremacy ImGui' base, debunking marketing claims of custom in-house software."
  },
  {
    id: 1,
    badge: "EXHIBIT #01 • SMOKING GUN",
    title: "Gateway Fraud: Money Motion Rejection & Fake Domain Scheme",
    image: "assets/images/evidence-02-payment-gateway-fraud.png",
    timestamp: "09.09.2026 00:50",
    category: "fraud",
    transcript: `! Scarlet (09.09.2026 00:49):
i need
ur
help

尺モK U 尺卂尺モ (09.09.2026 00:49):
yw wassup

! Scarlet (09.09.2026 00:50):
i want payment gatewway
like
card to crypto
i applied to money motion
ovgc
but got rejected
do you have any old website
whos domain is like 3-4 months old
i wanna fake that website bussiness
and collect payments from scarlet like this
can we do like this
no?`,
    analysis: "Definitive proof of merchant fraud. After official rejection by card-to-crypto merchant processors (Money Motion / OVGC), Scarlet asks to acquire an aged 3-4 month old domain to construct a fake front-business to illegally collect payments for Scarlet."
  },
  {
    id: 2,
    badge: "EXHIBIT #05",
    title: "Account Handouts to Secure Loyalty",
    image: "assets/images/evidence-03-account-offer.png",
    timestamp: "08.09.2026 19:13",
    category: "threats",
    transcript: `尺モK U 尺卂尺モ (08.09.2026 19:13):
dw

! Scarlet (08.09.2026 19:13):
if u need acc u can lmk

尺モK U 尺卂尺モ (08.09.2026 19:13):
[Cat/Bunny meme image]

! Scarlet (08.09.2026 19:13):
🙂`,
    analysis: "Scarlet offers free accounts to streamer Rekurare to maintain loyalty and encourage uninterrupted promotion of the software."
  },
  {
    id: 3,
    badge: "EXHIBIT #04",
    title: "Streamer Ultimatum: 'Disconnect in 1 Min'",
    image: "assets/images/evidence-04-streamer-threat.png",
    timestamp: "06.09.2026 23:50",
    category: "threats",
    transcript: `尺モK U 尺卂尺モ (06.09.2026 23:50):
this xit is retard

! Scarlet (06.09.2026 23:50):
[NOVA badge]
ask ur frd to remove the tag
otherwise disconnect in 1 min
waiting 1 min

[Attached stream status:
 Sentryx NOVA LIVE
 尺モK U 尺卂尺モ LIVE]`,
    analysis: "Scarlet aggressively enforces streamer compliance, issuing a strict 60-second disconnection threat over competitor or unapproved tags visible during live streams."
  },
  {
    id: 4,
    badge: "EXHIBIT #03 • CREDENTIALS",
    title: "MEDIAKEY Handout & Dashboard Link (sckmd.xyz)",
    image: "assets/images/evidence-05-media-key-sckmd.png",
    timestamp: "07.09.2026 00:01",
    category: "keys",
    transcript: `! Scarlet (06.09.2026 23:56):
i will give u private emu to stream should i?
yh its okay
i told him dw

尺モK U 尺卂尺モ (06.09.2026 23:58):
fair enough
u mean the smd?

! Scarlet (07.09.2026 00:00):
yes
smd
i mean u can promote in vc 🙂
by going live

尺モK U 尺卂尺モ (07.09.2026 00:01):
ye i get what ur about to saying id love to do that if u want

! Scarlet (07.09.2026 00:01):
MEDIAKEY-76F1AB55874EDBBC
MEDIA KEY

[Scarlet pinned a message]
! Scarlet (07.09.2026 00:02):
https://sckmd.xyz/dashboard`,
    analysis: "Scarlet provides a private emulator build ('private emu' / 'smd') to stream live in Discord Voice Channels, delivering credentials (MEDIAKEY-76F1AB55874EDBBC) and pointing to the management dashboard at https://sckmd.xyz/dashboard."
  },
  {
    id: 5,
    badge: "EXHIBIT #06 • BUSTED & BANNED 💀",
    title: "The Downfall: scarletvqc.dev Nuked by Lovable Trust & Safety",
    image: "assets/images/evidence-06-banned-takedown.png",
    timestamp: "SEPTEMBER 2026 • TERMINATED",
    category: "takedown",
    transcript: `URL: scarletvqc.dev/blocked

Website Takedown Notice
This website has been taken down by Lovable's Trust & Safety team.
If you see suspicious sites on the *.lovable.app domain that attempt to steal data, impersonate others, or distribute malware, please report them immediately at lovable.dev/abuse.

[Button: Learn about Lovable]
Lovable`,
    analysis: "The ultimate humiliation: After attempting to evade Money Motion and OVGC payment processor bans by spinning up a fake domain (scarletvqc.dev), Lovable's Trust & Safety team intervened immediately, terminating and nuking the site for data theft, impersonation, and malware distribution."
  }
];

let currentEvidenceIndex = 0;
let currentZoomLevel = 1; // 1 = 100%, 1.5 = 150%, 2 = 200%

// Lightbox Elements
const lightbox = document.getElementById("lightbox");
const lightboxBadge = document.getElementById("lightbox-badge");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxImg = document.getElementById("lightbox-img");
const imgWrapper = document.getElementById("img-wrapper");
const lightboxTranscript = document.getElementById("lightbox-transcript");
const lightboxAnalysis = document.getElementById("lightbox-analysis");
const lightboxRawBtn = document.getElementById("lightbox-raw-btn");
const zoomLevelText = document.getElementById("zoom-level-text");

/**
 * Opens Lightbox for specific evidence index
 */
function openLightbox(index) {
  if (index < 0 || index >= evidenceData.length) return;
  currentEvidenceIndex = index;
  currentZoomLevel = 1;
  updateZoomClass();

  const item = evidenceData[index];
  lightboxBadge.textContent = item.badge;
  lightboxTitle.textContent = item.title;
  lightboxImg.src = item.image;
  lightboxImg.alt = item.title;
  lightboxTranscript.textContent = item.transcript;
  lightboxAnalysis.textContent = item.analysis;
  lightboxRawBtn.href = item.image;

  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

/**
 * Closes Lightbox
 */
function closeLightbox() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  currentZoomLevel = 1;
  updateZoomClass();
}

/**
 * Navigate to next evidence
 */
function nextEvidence() {
  currentEvidenceIndex = (currentEvidenceIndex + 1) % evidenceData.length;
  openLightbox(currentEvidenceIndex);
}

/**
 * Navigate to previous evidence
 */
function prevEvidence() {
  currentEvidenceIndex = (currentEvidenceIndex - 1 + evidenceData.length) % evidenceData.length;
  openLightbox(currentEvidenceIndex);
}

/**
 * Toggle Image Zoom (100% -> 150% -> 200% -> 100%)
 */
function toggleZoom() {
  if (currentZoomLevel === 1) {
    currentZoomLevel = 1.5;
  } else if (currentZoomLevel === 1.5) {
    currentZoomLevel = 2;
  } else {
    currentZoomLevel = 1;
  }
  updateZoomClass();
}

function updateZoomClass() {
  imgWrapper.classList.remove("zoomed-15", "zoomed-20");
  if (currentZoomLevel === 1.5) {
    imgWrapper.classList.add("zoomed-15");
    zoomLevelText.textContent = "150%";
  } else if (currentZoomLevel === 2) {
    imgWrapper.classList.add("zoomed-20");
    zoomLevelText.textContent = "200%";
  } else {
    zoomLevelText.textContent = "100%";
  }
}

// Keyboard Navigation for Lightbox
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextEvidence();
  if (e.key === "ArrowLeft") prevEvidence();
});

// Category Filter Handling
const filterButtons = document.querySelectorAll(".filter-btn");
const evidenceCards = document.querySelectorAll(".evidence-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    evidenceCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/**
 * Copy to Clipboard with Toast feedback
 */
function copyText(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied: ${text}`);
    if (btnElement) {
      const originalText = btnElement.innerHTML;
      btnElement.innerHTML = `✓ Copied`;
      setTimeout(() => {
        btnElement.innerHTML = originalText;
      }, 2000);
    }
  }).catch(() => {
    // Fallback prompt if clipboard API is blocked
    prompt("Copy text manually:", text);
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}
