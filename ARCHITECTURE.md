# www.bradbannon.com — Architecture

## Overview

`www.bradbannon.com` is served by a single Cloud Run service (`gita-website`) running a
Next.js app (project: `gita-488115`, region: `us-central1`). All routing is configured in
`next.config.ts` using Next.js `redirects` and `rewrites`.

---

## Routing Table

| URL Pattern | What happens |
|-------------|-------------|
| `/` | Proxied from GCS: `gs://www.bradbannon.com/index.html` |
| `/gita/**` | Served by the Next.js app (`basePath: "/gita"`) |
| `/courses/(Sp\|Su\|Fa)NN/**` | Proxied from GCS: `gs://www.bradbannon.com/courses/...` |
| `/courses/(Sp\|Su\|Fa)NN/**/audio/**` | **Redirected** to direct `storage.googleapis.com` URL (audio files are large — don't buffer through Cloud Run) |

The semester regex `(Sp|Su|Fa)\d{2}` matches all past and future semesters (Sp26, Su26,
Fa26, Sp27, …) without any code changes.

---

## GCS Bucket: `gs://www.bradbannon.com`

All static content lives in this bucket:

```
gs://www.bradbannon.com/
├── index.html                            ← root landing page (www.bradbannon.com/)
└── courses/
    ├── Sp26/
    │   └── 1432/                         ← TH1432 The Religious Quest, Spring 2026
    │       ├── index.html
    │       ├── style.css
    │       ├── glossary.html
    │       ├── glossary.json
    │       ├── state.json                ← Mitra pipeline run state
    │       ├── 021726_1030.html          ← Feb 17 10:30 AM session
    │       ├── 012026_1200.html          ← Jan 20 12:00 PM session
    │       ├── audio/
    │       │   └── 021726_1030.m4a       ← class recording
    │       └── images/
    │           └── *.jpg                 ← chalkboard photos
    └── Sp27/ ...
```

---

## Adding a New Course / Semester

1. Create a new course YAML in `mitra-processor/courses/`:
   ```yaml
   # e.g. fa26_2210.yaml
   deploy_path: "courses/Fa26/2210"
   ```
2. **No change to `next.config.ts` needed** — the semester regex auto-matches `Fa26`.
3. Run the Mitra pipeline to generate and deploy the HTML pages.
4. Add a link to the new course in `gs://www.bradbannon.com/index.html`
   (upload updated index.html to GCS — no Next.js redeploy needed).

---

## Mitra — Automated Class Recording Processor

Cloud Run Job (`mitra-processor`) in project `gita-488115`.

Triggered manually:
```bash
gcloud run jobs execute mitra-processor \
  --args="--course=sp26_1432,--file=1432_MMDDYY_HHMM.m4a" \
  --region=us-central1 --wait
```

Add `--force` to reprocess a file that was already processed (e.g. after template changes).

Full pipeline documentation: `G:/My Drive/Mitra/mitra-processor/README.md`

---

## Cloud Run Services (project: gita-488115, region: us-central1)

| Service | Purpose |
|---------|---------|
| `gita-website` | Serves www.bradbannon.com (this app) |
| `mitra-processor` | Cloud Run **Job** — batch-processes class recordings |

---

## Deploying gita-website

```bash
cd C:\Users\BradB\gita-website
deploy.bat
```

This runs `gcloud run deploy gita-website --source .` which triggers Cloud Build to
build a Docker image and deploy it to Cloud Run. Takes ~2 minutes.

**Requires:** `GEMINI_API_KEY` set as an environment variable (used for the Gita chat feature).

---

## Domain Mapping

`www.bradbannon.com` → Cloud Run domain mapping → `gita-website` service.
DNS: `www.bradbannon.com` CNAME → `ghs.googlehosted.com`.
SSL certificate is auto-managed by Google Cloud.

---

## Future: Student Authentication

When student login is needed for `/courses/**`, the plan is to add Next.js middleware
(`middleware.ts`) that checks a session cookie for all requests matching the `/courses/`
path prefix. The middleware would redirect unauthenticated users to a login page.
The `/gita` app and the root `/` would remain public.
