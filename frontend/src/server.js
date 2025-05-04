const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const jwt = require("jsonwebtoken");

const SECRET_KEY = "your-secret-key";
const expiresIn = "1h";

// Create db.json file with initial data
const fs = require("fs");
if (!fs.existsSync("db.json")) {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({
      users: [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        },
      ],
    })
  );
}

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Create token
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Register endpoint
server.post("/auth/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide name, email and password" });
  }

  const db = router.db;
  const users = db.get("users").value();

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password, // In a real app, hash this password!
  };

  db.get("users").push(newUser).write();

  const accessToken = createToken({ id: newUser.id, email: newUser.email });
  const user = { ...newUser };
  delete user.password; // Don't send password back to client

  res.status(201).json({ accessToken, user });
});

// Login endpoint
server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  const db = router.db;
  const user = db.get("users").find({ email, password }).value();

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const accessToken = createToken({ id: user.id, email: user.email });
  const userResponse = { ...user };
  delete userResponse.password; // Don't send password back to client

  res.status(200).json({ accessToken, user: userResponse });
});

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running on port 3001");
});
