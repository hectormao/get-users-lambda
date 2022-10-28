import "reflect-metadata";
import { Container } from "inversify";
import { describe, it } from "mocha";
import { UsuarioRepository } from "../../../src/repository/usuario.repository";
import { anything, instance, mock, when } from "ts-mockito";
import { User } from "../../../src/types/types";
import TYPES from "../../../src/inversify/types";
import { UsuarioService } from "../../../src/service/usuario.service";
import { expect } from "chai";

describe("Unit Tests for Usuario Service", async () => {
  it("Get Users Test returning a valid array", async () => {
    const testContainer: Container = new Container();
    const mockRepository = mock(UsuarioRepository);
    when(mockRepository.getUsers(anything())).thenResolve([
      {} as User,
      {} as User,
      {} as User,
    ]);
    const repository = instance(mockRepository);
    testContainer
      .bind<UsuarioRepository>(TYPES.Repository)
      .toConstantValue(repository);
    testContainer.bind<UsuarioService>(TYPES.Service).to(UsuarioService);

    const sut: UsuarioService = testContainer.get(TYPES.Service);
    const result: User[] = await sut.getUsers({});

    expect(result).to.be.an("array");
    expect(result).to.have.lengthOf(3);
  });

  it("Get Users Test returning an empty array", async () => {
    const testContainer: Container = new Container();
    const mockRepository = mock(UsuarioRepository);
    when(mockRepository.getUsers(anything())).thenResolve([]);
    const repository = instance(mockRepository);
    testContainer
      .bind<UsuarioRepository>(TYPES.Repository)
      .toConstantValue(repository);
    testContainer.bind<UsuarioService>(TYPES.Service).to(UsuarioService);

    const sut: UsuarioService = testContainer.get(TYPES.Service);
    try {
      await sut.getUsers({});
      expect.fail("Test must raise an exception");
    } catch (error: any) {
      expect(error.message).to.be.equals("Users not found");
    }
  });
});
