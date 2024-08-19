import request from "supertest";
import server from "../../server";

describe("POST /api/productos", () => {
  it("should create a new product", async () => {
    const response = await request(server).post("/api/productos").send({
      name: "Monitor - Testing",
      price: 75,
    });

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(200);
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");
  });
  it("should validate that the price is a number and grater than 0", async () => {
    const response = await request(server).post("/api/productos").send({
      name: "Monitor - Testing",
      price: "hola",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(4);
  });
});

describe("GET /api/productos", () => {
  it("GET a json response with products", async () => {
    const response = await request(server).get("/api/productos");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);

    expect(response.body).not.toHaveProperty("errors");
    expect(response.status).not.toBe(404);
  });
});

describe("GET /api/productos/:id", () => {
  it("should return a 404 response for a non-existen product", async () => {
    const productId = 2000;
    const response = await request(server).get(`/api/productos/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Product not found");
  });
  it("should check a valid ID", async () => {
    const response = await request(server).get("/api/productos/not-valid-url");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("ID no válido");
  });
  it("should a JSON response for a single product", async () => {
    const response = await request(server).get("/api/productos/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("product");
  });
});

describe("DELETE /api/producto/:id" , () => {
   it("should check a valid ID", async () => {
     const response = await request(server).get("/api/productos/not-valid-url");
     expect(response.status).toBe(400);
     expect(response.body).toHaveProperty("errors");
     expect(response.body.errors).toHaveLength(1);
     expect(response.body.errors[0].msg).toBe("ID no válido");
   });
})
