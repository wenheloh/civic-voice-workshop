export const seedData = {
  users: [
    {
      nric: "S0000001A",
      passwordHash: "scrypt$8ccb8f33544a706bcfc45cb5a9a8851c$096547e984d46801c3812a22c4481dd8944ae345b0b45f0c96cf1478b198651e77abfc37970fb46f539102a5eb3d5e9aa0253cc146adc6fbf93d42d5d05a5b8d",
      name: "Aisha Rahman",
      role: "citizen",
    },
    {
      nric: "S0000002B",
      passwordHash: "scrypt$b93a5d4d1fafb40d90abcf6d382084c9$287cf766f75dad9b64e3396d6401527b2492dc465d09a2948209e728dc80369462a290bd7bbd5e61e8e90336df4563cd354450f9800e129529bd69ec7f527c81",
      name: "Daniel Tan",
      role: "admin",
    },
  ],
  feedback: [
    {
      id: "fb-seed-1",
      nric: "S0000001A",
      name: "Aisha Rahman",
      message: "The new sheltered walkway near the library is helpful, but the lights turn off too early.",
      category: "General",
      status: "New",
      createdAt: "2026-08-29T09:14:00.000Z",
    },
  ],
};

export function freshSeed() {
  return structuredClone(seedData);
}
