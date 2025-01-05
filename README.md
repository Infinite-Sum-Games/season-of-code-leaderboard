# Winter of Code Leaderboard

This repository contains the code-base to the LIVE leaderboard for ACM@Amrita Winter of Code (season 1).

### Technical Stack
- The application is written in **Next.js** on top of **TypeScript**. The framework was chosen as it happened to be the most comfortable one at the disposal of the developers at the time of writing.
- We use a **PostgreSQL** database hosted on **NeonDB** for quick setup and serverless hosting. The database automatically scales down to an *IDLE* or *sleep* state with 5 minutes of inactivity. This allows us to save on costs.
- Interestingly, you can run a 0.25vCPU Neon Serverless Postgres instance every month, absolutely free of cost (191 hours).
- In order to interact with the database, we have written our schema in **Prisma**, which is an ORM that integrates easily with SQL and manages connection pooling by itself. It also allows us to write type-safe queries without the fear of common vulnerabilities like SQL injection.

> **Note**
> This repository does not have any `POST/` endpoint and only serves the leaderboard and individual profiles. Data mutations in the database take place through separate functions deployed on **Cloudflare Workers**. That repository has been kept private for security reasons.

### Prerequisites
Before setting up the project, ensure you have the following installed on your machine:

- **Node.js** (version 16 or higher)
- **Yarn** (version 1.22 or higher)
- **PostgreSQL or NeonDB**

### Setup Steps
Follow these steps to set up the project locally after cloning the repository:

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Create a copy of the `.env` file:

3. Set up the database:
   - Create a project in NeonDB.
   - Copy the connection string provided by NeonDB and paste it into the `DATABASE_URL` field in the `.env` file.

4. Push the database schema:
   ```bash
   npx prisma db push
   ```

5. Seed the database:
   ```bash
   npx esrun prisma/seed.ts
   ```

6. Run the development server:
   ```bash
   yarn run dev
   ```

### Contribution Guidelines
- Write descriptive git commit messages.
- Write clear descriptions in pull requests for quicker merging.

### Authors
- [Kiran Rajeev KV](https://github.com/KiranRajeev-KV)
- [Vijay SB](https://github.com/vijaysb0613)
- [Ritesh Koushik](https://github.com/IAmRiteshKoushik/)

> For any queries, please reach out to us on our socials or via email.
