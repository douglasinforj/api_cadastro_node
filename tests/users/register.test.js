import request from "supertest";
import app from '../../app';
import { setupDatabase, teardwnDatabase } from '../../tests/setup/databaseSetup';


beforeAll(setupDatabase);
afterAll(teardwnDatabase);

describe('POST /registerUser - Registro de Usuário', () => {

    //Teste registrar usuário
    test('Deve registrar um usuário com sucesso', async () => {
        const response = await request(app)
        .post('registerUser')
        .send({
            name: 'Douglas Silva',
            email: 'douglasitpro@gmail.com',
            password: 'filhote#123'
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('id');
    });

    //Teste se vai aceitar emails duplicados
    test('Não deve registrar usuário com e-mail duplicado', async () => {
        await request(app)
        .post('/registerUser')
        .send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'secure_password123',
          });
    
        const response = await request(app)
          .post('/registerUser')
          .send({
            name: 'Duplicate User',
            email: 'johndoe@example.com',
            password: 'another_password123',
          });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Usuário já existente')

    });
});
