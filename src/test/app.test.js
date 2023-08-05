const request = require("supertest");
const app = require('../app');

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpwZXJlekBlamVtcGxvLmNvbSIsImlhdCI6MTY5MTAyMTgxM30.Ehn69lypRkfDDJAwoNTZPvqoy2LjD5NsW8RcDWmtSVA"

describe("Pruebas CRUD de Publicaciones", () => {
        it("Código 401 al crear nueva publicacion sin token", async () => {
        const nuevoRegistro = { titulo: "tt", descripcion: "des", precio: 999, formato: "fmt", marca: "mr", tipo: "normal", imagen: "https://picsum.photos/240" }
        const { status } = await request(app)
            .post("/posts")
            .send(nuevoRegistro)
        expect(status).toBe(401);
    }) 
    it("Código 201 agrega nuevo registro exitosamente", async () => {
        const nuevoRegistro = { titulo: "tt", descripcion: "des", precio: 999, formato: "fmt", marca: "mr", tipo: "normal", imagen: "https://picsum.photos/240" }
        const { status } = await request(app)
            .post("/posts")
            .set("authorization", token)
            .send(nuevoRegistro)
        expect(status).toBe(201);
    })
    it("Código 200 comprueba 1 Arreglo al menos 1 Objeto", async () => {
        const { status, body } = await request(app)
            .get("/posts")
            .send()
        expect(status).toBe(200)
        expect(body.data).toBeInstanceOf(Array)
        expect(body.data.length).toBeGreaterThan(0)
    })
    it("Código 409 si elimina id inexistente", async () => {
        const idPorParametro = Math.floor(Math.random() * 999);
        const { status } = await request(app)
            .delete(`/posts/${idPorParametro}`)
            .set("authorization", "token")
            .send()
        expect(status).toBe(409);
    })
/*     it("Código 400 distinto id en parámetro y payload", async () => {
        const idPorParametro = Math.floor(Math.random() * 999);
        const idNuevoRegistro = Math.floor(Math.random() * 777);
        const nuevoRegistro = { idNuevoRegistro, nombre: "espresso" }
        const { status } = await request(app)
            .put(`/cafes/${idPorParametro}`)
            .send(nuevoRegistro)
        expect(status).toBe(400);
    }) */

});