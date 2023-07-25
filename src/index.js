const app = require("./app.js");
// WebServer Port
const PORT = process.env.PORT || 3000

// Start Server
app.listen(PORT, console.log(`Server on port: ${PORT}`))