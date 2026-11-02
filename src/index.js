import { createApp } from "./app.js";
import { initStore } from "./store.js";

const PORT = Number.parseInt(process.env.PORT ?? "3001", 10);

await initStore();
const app = createApp();
app.listen(PORT, () => {
  console.log(`petshop listening on http://localhost:${PORT}`);
});
