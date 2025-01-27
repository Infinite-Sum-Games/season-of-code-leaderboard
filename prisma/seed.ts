import prisma from "@/app/db";

async function seedDatabase() {
  // Participants data
  const participants = [
    {
      fullName: "Ritesh Koushik",
      rollNumber: "CB.EN.U4CSE22038",
      mobileNumber: "9999999998",
      username: "IAmRiteshKoushik",
      bounty: 100,
      accountActive: true,
    },
    {
      fullName: "Abhinav R",
      rollNumber: "CB.EN.U4CSE21001",
      mobileNumber: "9999999997",
      username: "Abhinav-Ark",
      bounty: 200,
      accountActive: true,
    },
    {
      fullName: "Ashwin Narayanan S",
      rollNumber: "CB.EN.U4CSE21008",
      mobileNumber: "9999999996",
      username: "Ashrockzzz2003",
      bounty: 150,
      accountActive: true,
    },
    {
      fullName: "Vijay SB",
      rollNumber: "CB.SC.U4CSE23249",
      mobileNumber: "9999999995",
      username: "vijaysb0613",
      bounty: 50,
      accountActive: true,
    },
    {
      fullName: "Kiran Rajeev KV",
      rollNumber: "CB.SC.U4CSE23624",
      mobileNumber: "9999999994",
      username: "KiranRajeev-KV",
      bounty: 50,
      accountActive: true,
    },
  ];

  // Projects data
  const projects = [
    {
      repoId: "repo1",
      webhook: "https://webhook1.example.com",
      title: "Open Source Project 1",
    },
    {
      repoId: "repo2",
      webhook: "https://webhook2.example.com",
      title: "Open Source Project 2",
    },
    {
      repoId: "repo3",
      webhook: "https://webhook3.example.com",
      title: "Open Source Project 3",
    },
  ];

  // Issues data
  const issues = [
    {
      issueId: "issue1",
      repoId: "repo1",
      url: "https://github.com/repo1/issue1",
      claimedBy: "IAmRiteshKoushik",
      issueStatus: true,
    },
    {
      issueId: "issue2",
      repoId: "repo2",
      url: "https://github.com/repo2/issue2",
      claimedBy: "Abhinav-Ark",
      issueStatus: true,
    },
    {
      issueId: "issue3",
      repoId: "repo3",
      url: "https://github.com/repo3/issue3",
      claimedBy: "Ashrockzzz2003",
      issueStatus: true,
    },
  ];

  // Solutions data
  const solutions = [
    {
      id: "solution1",
      repoId: "repo1",
      username: "IAmRiteshKoushik",
      url: "https://github.com/repo1/solution1",
    },
    {
      id: "solution2",
      repoId: "repo2",
      username: "Abhinav-Ark",
      url: "https://github.com/repo2/solution2",
    },
    {
      id: "solution3",
      repoId: "repo3",
      username: "Ashrockzzz2003",
      url: "https://github.com/repo3/solution3",
    },
    {
      id: "solution4",
      repoId: "repo1",
      username: "vijaysb0613",
      url: "https://github.com/repo1/solution4",
    },
    {
      id: "solution44",
      repoId: "repo1",
      username: "vijaysb0613",
      url: "https://github.com/repo1/solution44",
    },
    {
      id: "solution444",
      repoId: "repo1",
      username: "vijaysb0613",
      url: "https://github.com/repo1/solution444",
    },
    {
      id: "solution5",
      repoId: "repo2",
      username: "KiranRajeev-KV",
      url: "https://github.com/repo2/solution5",
    },
    {
      id: "solution55",
      repoId: "repo2",
      username: "KiranRajeev-KV",
      url: "https://github.com/repo2/solution5",
    },
  ];

  // Bounty Logs data
  const bountyLogs = [
    {
      givenBy: "admin",
      amount: 50,
      givenTo: "IAmRiteshKoushik",
      createdAt: new Date("2024-01-01T10:00:00Z"),
    },
    {
      givenBy: "admin",
      amount: 100,
      givenTo: "Abhinav-Ark",
      createdAt: new Date("2024-01-02T12:30:00Z"),
    },
    {
      givenBy: "admin",
      amount: 75,
      givenTo: "Ashrockzzz2003",
      createdAt: new Date("2024-01-03T14:45:00Z"),
    },
    {
      givenBy: "admin",
      amount: 30,
      givenTo: "vijaysb0613",
      createdAt: new Date("2024-01-04T09:00:00Z"),
    },
    {
      givenBy: "admin",
      amount: 50,
      givenTo: "KiranRajeev-KV",
      createdAt: new Date("2024-01-05T11:15:00Z"),
    },
    {
      givenBy: "admin",
      amount: 150,
      givenTo: "IAmRiteshKoushik",
      createdAt: new Date("2024-01-06T08:30:00Z"),
    },
    {
      givenBy: "admin",
      amount: 200,
      givenTo: "Abhinav-Ark",
      createdAt: new Date("2024-01-07T16:00:00Z"),
    },
  ];

  if (process.env.NODE_ENVIRONMENT === "development") {
    try {
      // Seed participants
      await prisma.participant.createMany({
        data: participants,
      });

      // Seed projects
      await prisma.project.createMany({
        data: projects,
      });

      // Seed issues
      await prisma.issue.createMany({
        data: issues,
      });

      // Seed solutions
      await prisma.solution.createMany({
        data: solutions,
      });

      // Seed bounty logs
      await prisma.bountyLog.createMany({
        data: bountyLogs,
      });

      console.log("Database seeded successfully!");
    } catch (error) {
      console.error("Error seeding database:", error);
    } finally {
      await prisma.$disconnect();
    }
  }
}

seedDatabase();