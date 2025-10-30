import { ConfigurableModuleBuilder, Type } from "@nestjs/common";
import { IAuditRepository } from "apps/api/src/domain/interfaces/IAuditRepository.interface";
import { IProfileRepository } from "apps/api/src/domain/interfaces/IProfileRepository.interface";
import { IUserRepository } from "apps/api/src/domain/interfaces/IUserRepository.interface";

export interface ModuleOptions {
  userRepository: Type<IUserRepository>;
  auditRepository: Type<IAuditRepository>;
  profileRepository: Type<IProfileRepository>;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<ModuleOptions>().build();
