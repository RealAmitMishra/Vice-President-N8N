# n8n Self‑Hosted Setup for GitHub

This repository contains a simple configuration to run a **self‑hosted** instance of the [n8n](https://github.com/n8n-io/n8n) workflow automation platform inside a Docker container.  

n8n is a flexible automation tool that lets you visually build workflows while still allowing custom code.  The project advertises **400+ official integrations** and an active community【749362174265999†L410-L430】.  If you need to automate tasks across services like GitHub, Slack, Google Sheets, databases and dozens of other SaaS tools, n8n provides a pre‑built node for many of them.  

This setup is designed to run on a GitHub‑hosted VM (for example via Codespaces or your local Docker installation) and uses a **Docker volume** to persist data.  You can adapt the time‑zone and other environment variables in the `docker-compose.yml` file to suit your needs.

## Prerequisites

* [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your host.  
* A public port (default `5678`) available if you plan to access n8n from outside the VM.

## Getting Started

1. **Clone or download** this repository.
2. Open a terminal in the repository root.
3. Create the persistent volume and start n8n using Docker Compose:

   ```bash
   # Create a Docker volume for n8n data (only needed once)
   docker volume create n8n_data

   # Start n8n in detached mode
   docker compose up -d
   ```

   These commands follow the official n8n Docker setup【299090567725224†L1549-L1579】.  A named volume called `n8n_data` is mounted into `/home/node/.n8n` inside the container to persist credentials, workflows and logs across restarts【299090567725224†L1552-L1576】.

4. Once the container is running, open `http://localhost:5678` in your browser.  The n8n editor UI should appear.

5. For production use you may want to:

   * Configure an authentication method (e.g. basic auth, SSO) using environment variables (see the [n8n docs](https://docs.n8n.io/hosting/installation/docker/)).
   * Set up HTTPS via a reverse proxy such as Nginx or Traefik.
   * Connect n8n to an external PostgreSQL database instead of the default SQLite by adding the relevant `DB_*` variables【299090567725224†L1619-L1639】.

## Customization

All configuration is handled through environment variables in `docker-compose.yml`.  Some key variables include:

| Variable | Description | Default |
|---------|-------------|---------|
| `GENERIC_TIMEZONE` | Sets the timezone used by schedule‑based nodes | `America/Chicago` |
| `TZ` | Sets the container’s system timezone | `America/Chicago` |
| `N8N_RUNNERS_ENABLED` | Enables task runners for efficient execution | `true` |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Enforces secure config file permissions | `true` |

To change the timezone or add extra variables (like database settings), edit the `environment` section of the `docker-compose.yml` file.

## Notes on GitHub Actions

If you are comparing this approach to **GitHub Actions**, it’s important to understand the difference in scope.  

* GitHub Actions is primarily a CI/CD and developer automation platform.  According to industry reports, the GitHub Marketplace offers **over 15,000 ready‑to‑use actions**【725761131815187†L260-L263】, but most of these focus on tasks like building, testing and deploying code.  
* n8n, by contrast, focuses on **business and data integrations**.  The project lists more than **400 connectors** for SaaS apps and services【749362174265999†L410-L430】 and supports custom nodes.

Use n8n when you need to automate across many apps (e.g. CRM, marketing, databases) and GitHub Actions when you need to automate your software development workflow.

## License

This repository only contains configuration files.  n8n itself is distributed under a fair‑code license【749362174265999†L410-L416】.  Refer to the upstream project for licensing details.

## Support

For help with n8n, consult the [official documentation](https://docs.n8n.io/hosting/installation/docker/) or join the [n8n community forum](https://community.n8n.io/).
