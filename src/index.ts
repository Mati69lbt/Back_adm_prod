// instalar dependencias npm i -D typescript ts-node y npm i -D nodemon, cambiar el script de test por dev y poner este:  "dev": "nodemon --exec ts-node src/index.ts"
// crear la config del TS y luego hacer npm ts para que los archivos ts se conviertan en JS

import server from "./server";
import colors from "colors";

const port = process.env.PORT || 4000;

server.listen(4000, () => {
  console.log(colors.rainbow(`🔥 REST API en el Puerto ${port} 🚀`));
});
