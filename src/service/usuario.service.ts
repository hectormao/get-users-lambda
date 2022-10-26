import { inject, injectable } from "inversify";
import { UserNotFoundException } from "../exc/user-not-found.exception";
import TYPES from "../inversify/types";
import { UsuarioRepository } from "../repository/usuario.repository";
import { User } from "../types/types";

@injectable()
class UsuarioService {
  constructor(
    @inject(TYPES.Repository) private readonly repository: UsuarioRepository
  ) {}

  public async getUsers(filters: any): Promise<User[]> {
    const users: User[] = await this.repository.getUsers(filters);
    console.log("Users Length ... ", users.length);
    if (users.length <= 0) {
      throw new UserNotFoundException("Users not found");
    }
    return users;
  }
}

export { UsuarioService };
