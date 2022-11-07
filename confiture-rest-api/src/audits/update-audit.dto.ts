import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

import { CreateAuditDto } from './create-audit.dto';

class UpdateAuditTool {
  /**
   * @example "Firefox Developer Tools"
   */
  @IsString()
  name: string;
  /**
   * @example "Inspecter et débugguer le code d’une page web"
   */
  @IsString()
  function: string;
  /**
   * @example "https://firefox-dev.tools/"
   */
  @IsString()
  @IsUrl()
  url: string;
}

class UpdateAuditEnvironment {
  /**
   * @example "Desktop"
   */
  @IsString()
  platform: string;

  /**
   * @example "Windows"
   */
  @IsString()
  operatingSystem: string;

  /**
   * @example "11"
   */
  @IsString()
  @IsOptional()
  operatingSystemVersion: string;

  /**
   * @example "JAWS"
   */
  @IsString()
  assistiveTechnology: string;

  /**
   * @example "14.2"
   */
  @IsString()
  @IsOptional()
  assistiveTechnologyVersion: string;

  /**
   * @example "Firefox"
   */
  @IsString()
  browser: string;

  /**
   * @example "104"
   */
  @IsString()
  @IsOptional()
  browserVersion: string;
}

// class CreateAuditRecipients {
//   /**
//    * @example "Pierre Poljak"
//    */
//   @IsString()
//   name: string;

//   /**
//    * @example "ministre@government.com"
//    */
//   @IsEmail()
//   email: string;
// }

export class UpdateAuditDto extends CreateAuditDto {
  /**
   * @example "https://procedure.government.com"
   */
  @IsUrl()
  procedureUrl: string;

  /**
   * @example "Ministry of Internet"
   */
  @IsString()
  initiator: string;

  /**
   * @example "John Referent"
   */
  @IsString()
  @IsOptional()
  contactName?: string;

  /**
   * @example "accessibility@procedure.government.com"
   */
  @IsEmail()
  contactEmail: string;

  /**
   * @example "https://procedure.government.com/contact-a11y"
   */
  @IsUrl()
  contactFormUrl: string;

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateAuditRecipients)
  // recipients: CreateAuditRecipients[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAuditTool)
  @IsOptional()
  tools?: UpdateAuditTool[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAuditEnvironment)
  @IsOptional()
  environments?: UpdateAuditEnvironment[];

  /**
   * @example ["HTML", "CSS"]
   */
  @IsArray()
  @IsString({ each: true })
  technologies: string[];

  @IsString()
  notCompliantContent: string;

  @IsString()
  derogatedContent: string;

  @IsString()
  notInScopeContent: string;
}
