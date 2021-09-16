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
exports.HoldEntity = void 0;
const typeorm_1 = require("typeorm");
const baseHoldEntity_1 = require("./baseHoldEntity");
const problemEntity_1 = require("./problemEntity");
let HoldEntity = class HoldEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], HoldEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], HoldEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.ManyToOne(() => baseHoldEntity_1.BaseHoldEntity),
    __metadata("design:type", baseHoldEntity_1.BaseHoldEntity)
], HoldEntity.prototype, "baseHold", void 0);
__decorate([
    typeorm_1.ManyToOne(() => problemEntity_1.ProblemEntity, problem => problem.holdList),
    __metadata("design:type", Number)
], HoldEntity.prototype, "problem", void 0);
HoldEntity = __decorate([
    typeorm_1.Entity("HoldEntity")
], HoldEntity);
exports.HoldEntity = HoldEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9sZEVudGl0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2RhdGFiYXNlL2VudGl0aWVzL2hvbGRFbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdHO0FBQ2hHLHFEQUFrRDtBQUNsRCxtREFBaUQ7QUFHakQsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVTtDQWdCdEIsQ0FBQTtBQVpHO0lBREMsZ0NBQXNCLEVBQUU7O3NDQUNiO0FBSVo7SUFEQyxnQkFBTSxFQUFFOzt3Q0FDSztBQUdkO0lBREMsbUJBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQywrQkFBYyxDQUFDOzhCQUNyQiwrQkFBYzs0Q0FBQztBQUkxQjtJQURDLG1CQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsNkJBQWEsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7OzJDQUMzQztBQWZSLFVBQVU7SUFEdEIsZ0JBQU0sQ0FBQyxZQUFZLENBQUM7R0FDUixVQUFVLENBZ0J0QjtBQWhCWSxnQ0FBVSJ9