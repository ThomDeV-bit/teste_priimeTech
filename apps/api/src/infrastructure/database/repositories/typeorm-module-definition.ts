import { ConfigurableModuleBuilder, Type } from "@nestjs/common";
import { IUserRepository } from "apps/api/src/domain/interfaces/IUserRepository.interface";

export interface ModuleOptions {
    userRepository: Type<IUserRepository>;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
    new ConfigurableModuleBuilder<ModuleOptions>().build();
