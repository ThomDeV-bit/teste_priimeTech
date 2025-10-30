import { UserRepository } from "./user/user.repository";

export class RepositoryModule {
    static register() {
        return {
            userRepository: UserRepository,
        }
    }
}
