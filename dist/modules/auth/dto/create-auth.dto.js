"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDTO = exports.Platform = exports.LoginRole = exports.CreateAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAuthDto {
}
exports.CreateAuthDto = CreateAuthDto;
var LoginRole;
(function (LoginRole) {
    LoginRole["CUSTOMER"] = "CUSTOMER";
    LoginRole["ADMIN"] = "DELIVERY";
})(LoginRole || (exports.LoginRole = LoginRole = {}));
var Platform;
(function (Platform) {
    Platform["ANDROID"] = "ANDROID";
    Platform["IOS"] = "IOS";
    Platform["WEB"] = "WEB";
})(Platform || (exports.Platform = Platform = {}));
class LoginDTO {
    mobile;
    deviceId;
    platform;
    role;
}
exports.LoginDTO = LoginDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mobile number must be a valid 10-digit Indian number'
    }),
    (0, class_validator_1.Matches)(/^[6-9]\d{9}$/),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "mobile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique device identifier'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "deviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: Platform
    }),
    (0, class_validator_1.IsEnum)(Platform),
    __metadata("design:type", String)
], LoginDTO.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: LoginRole,
        description: 'Role attempting login',
    }),
    (0, class_validator_1.IsEnum)(LoginRole),
    __metadata("design:type", String)
], LoginDTO.prototype, "role", void 0);
//# sourceMappingURL=create-auth.dto.js.map