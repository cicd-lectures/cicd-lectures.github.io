/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-misused-promises -- supertest forces us to use any */

import { describe, beforeAll, afterAll, beforeEach, afterEach, test } from '@jest/globals';
import { Express } from 'express';
import { Pool } from 'pg';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import request from "supertest";

import { connectDb, createSchema, dropSchema } from "./database";
import { setupApp } from "./app";
import { Vehicle } from "./model/vehicle";

const postgisImage = 'postgis/postgis:16-3.4-alpine';

jest.setTimeout(30 * 1000);

describe('vehicle server', () => {
  let app: Express;
  let dbConn: Pool;
  let container: StartedPostgreSqlContainer;

  // Avant d'exécuter la suite de tests.
  beforeAll(async () => {
    // On démare le container de base de données.
    container = await new PostgreSqlContainer(postgisImage)
      .start();

    // On établit la connection avec le dit serveur.
    dbConn = await connectDb({
      host: container.getHost(),
      port: container.getPort(),
      database: container.getDatabase(),
      user: container.getUsername(),
      password: container.getPassword(),
    });

    // On crée une instance de notre application!
    app = setupApp(dbConn);
  });

  // Après tous les tests.
  afterAll(async () => {
    // On se déconnecte du serveur de base de données.
    await dbConn.end();
    // On arrête le serveur de base de données.
    await container.stop();
  });

  // Avant chaque test...
  beforeEach(async () => {
    // On crée le schema en base de données.
    await createSchema(dbConn);
  });

  // Après chaque test...
  afterEach(async () => {
    // On détruit le schema en base de données.
    await dropSchema(dbConn);
  });

  test('GET /vehicles', async () => {
    {{- if strings.Contains (.Get "tags") "testgetbody" }}
    // Given.
    await dbConn.query(
      `INSERT INTO vehicle_server.vehicles (shortcode, battery, position) VALUES
        ('abcd', 94, ST_GeomFromText('POINT(-71.060316 48.432044)')),
        ('cdef', 20, ST_GeomFromText('POINT(-70.060316 49.432044)')),
        ('ghij', 59, ST_GeomFromText('POINT(-74.060316 49.432044)'));
      `
    );

    // When.
    const response = await request(app).get('/vehicles');

    // Then.
    expect(response.statusCode).toBe(200);
    expect(response.body.vehicles.map((v: Vehicle) => v.shortcode)).toEqual(['cdef', 'abcd', 'ghij']);
    expect(response.body.vehicles.map((v: Vehicle) => v.position)).toEqual([
      {longitude: -70.060316, latitude: 49.432044},
      {longitude: -71.060316, latitude: 48.432044},
      {longitude: -74.060316, latitude: 49.432044},
    ]);
    {{- else }}
    // Given (mise en place du test).

    // When (appel HTTP).

    // Then (validation des résultats).

    {{- end }}
  });
})
