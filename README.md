# CHECK24 GenDev 8

**Orchestrated Home Widgets at Scale** – Ein flexibles, produktgetriebenes Widget-System, das sich sauber in eine moderne, dezentralisierte Architektur einfügt.


## Konzept

Die Homepage orchestriert, statt monolithischer Fachlogik besitzen Produktteams ihre Widget-Daten. Ein Next.js BFF bündelt die Inhalte, cached mit Redis und degradiert graceful bei Ausfällen.

## Features

- **Multi-Plattform**: Web (Next.js/React) + Android (Jetpack Compose)
- **Performance**: Redis-Caching reduziert Backend-Load drastisch
- **Resilienz**: Einzelne Speedboat-Ausfälle beeinträchtigen die Home nicht
- **Production-Ready**: Docker, nginx, Redis auf Hetzner mit CI/CD

## Tech Stack

Frontend: Next.js 15, React 19, Jetpack Compose
Backend: Node.js, Redis
Infra: Docker, nginx, GitHub Actions

## Dokumentation

- **[CONCEPT.md](CONCEPT.md)**
- **[DEVELOPER_GUIDELINE.md](DEVELOPER_GUIDELINE.md)**

### Live Deployment

[Live Demo](https://iris-wildauer.de)

### Video
[YouTube Video](https://youtu.be/MmP_TXLsxDM)

