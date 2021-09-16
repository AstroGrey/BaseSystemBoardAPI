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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const problemEntity_1 = require("./problemEntity");
let UserEntity = class UserEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.OneToMany(() => problemEntity_1.ProblemEntity, problem => problem.author),
    __metadata("design:type", Array)
], UserEntity.prototype, "publishedProblems", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Array)
], UserEntity.prototype, "loggedProblemIds", void 0);
UserEntity = __decorate([
    typeorm_1.Entity("UserEntity")
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckVudGl0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2RhdGFiYXNlL2VudGl0aWVzL3VzZXJFbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXNGO0FBQ3RGLG1EQUFnRDtBQUdoRCxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFXLFNBQVEsb0JBQVU7Q0F5QnpDLENBQUE7QUF0Qkc7SUFEQyxnQ0FBc0IsRUFBRTs7c0NBQ2I7QUFHWjtJQURDLGdCQUFNLEVBQUU7OzZDQUNVO0FBR25CO0lBREMsZ0JBQU0sRUFBRTs7NENBQ1M7QUFHbEI7SUFEQyxnQkFBTSxFQUFFOzs0Q0FDUztBQUdsQjtJQURDLGdCQUFNLEVBQUU7O3lDQUNNO0FBR2Y7SUFEQyxnQkFBTSxFQUFFOzs0Q0FDUztBQUdsQjtJQURDLG1CQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsNkJBQWEsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7O3FEQUN0QjtBQUdwQztJQURDLGdCQUFNLEVBQUU7O29EQUNtQjtBQXhCbkIsVUFBVTtJQUR0QixnQkFBTSxDQUFDLFlBQVksQ0FBQztHQUNSLFVBQVUsQ0F5QnRCO0FBekJZLGdDQUFVIn0=