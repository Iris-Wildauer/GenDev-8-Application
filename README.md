# CHECK24 GenDev 8

Dieses Repository enthält meinen Beitrag zur CHECK24 GenDev 8 Challenge.
Es zeigt ein technisches Konzept und einen lauffähigen Proof of Concept für moderne, produktgetriebene Home Widgets, die in einer stark dezentralisierten Systemlandschaft performant, hochverfügbar und personalisiert betrieben werden können.

Kernidee: Die Home ist Orchestrator, nicht Fachlogik-Owner. Produkte liefern personalisierte Widget-Daten über klar definierte Contracts, während ein Backend-for-Frontend (Next.js BFF) die Inhalte bündelt, cached und bei Ausfällen graceful degradiert. Dadurch werden Produktservices zuverlässig vor Home-Traffic-Spitzen geschützt, ohne die Datenaktualität unnötig zu opfern.

Der PoC zeigt:

Multi-Plattform Support: Web (Next.js/React) + Android (Jetpack Compose)
Performance-Schutz: Redis-Caching zur drastischen Reduktion externer Calls
Resilienz: Ausfall einzelner Speedboats beeinträchtigt die Home nicht
Deployment als MVP: Docker + nginx + Redis auf Hetzner, CI/CD via GitHub Actions, TLS via Let’s Encrypt
Alle Architekturentscheidungen, Trade-offs und Production-Ready-Erweiterungen sind nachvollziehbar in [Concept](CONCEPT.md) dokumentiert; die Integrationsperspektive für Produktteams ist in [Developer Guideline](DEVELOPER_GUIDELINE.md) beschrieben.

### Live Deployment

[Live Demo](https://iris-wildauer.de)

### Video
[YouTube Video](https://youtu.be/MmP_TXLsxDM)

