// api/active.js
let activeUsers = {}; // { userId: timestamp }

export default function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const { userId, status } = req.body;

    if (status === "join") {
      activeUsers[userId] = Date.now();
      return res.status(200).json({ message: `${userId} joined`, activeUsers });
    }

    if (status === "leave") {
      delete activeUsers[userId];
      return res.status(200).json({ message: `${userId} left`, activeUsers });
    }

    return res.status(400).json({ error: "Invalid status" });
  }

  if (method === "GET") {
    return res.status(200).json({ activeUsers });
  }

  res.setHeader("Allow", ["POST", "GET"]);
  res.status(405).end(`Method ${method} Not Allowed`);
}
