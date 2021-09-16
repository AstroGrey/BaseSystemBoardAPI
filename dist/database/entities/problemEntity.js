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
exports.ProblemEntity = void 0;
const typeorm_1 = require("typeorm");
const holdEntity_1 = require("./holdEntity");
const userEntity_1 = require("./userEntity");
let ProblemEntity = class ProblemEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ProblemEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProblemEntity.prototype, "problemName", void 0);
__decorate([
    typeorm_1.ManyToOne(() => userEntity_1.UserEntity, user => user.publishedProblems),
    __metadata("design:type", userEntity_1.UserEntity)
], ProblemEntity.prototype, "author", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ProblemEntity.prototype, "problemGrade", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ProblemEntity.prototype, "holdCount", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], ProblemEntity.prototype, "isBenchmark", void 0);
__decorate([
    typeorm_1.OneToMany(() => holdEntity_1.HoldEntity, hold => hold.problem),
    __metadata("design:type", Array)
], ProblemEntity.prototype, "holdList", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ProblemEntity.prototype, "angle", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], ProblemEntity.prototype, "matching", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProblemEntity.prototype, "datePublished", void 0);
ProblemEntity = __decorate([
    typeorm_1.Entity("ProblemEntity")
], ProblemEntity);
exports.ProblemEntity = ProblemEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvYmxlbUVudGl0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2RhdGFiYXNlL2VudGl0aWVzL3Byb2JsZW1FbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXFGO0FBQ3JGLDZDQUEwQztBQUMxQyw2Q0FBMEM7QUFHMUMsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtDQWdDekIsQ0FBQTtBQTdCRztJQURDLGdDQUFzQixFQUFFOzt5Q0FDYjtBQUdaO0lBREMsZ0JBQU0sRUFBRTs7a0RBQ1k7QUFHckI7SUFEQyxtQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLHVCQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7OEJBQ25ELHVCQUFVOzZDQUFDO0FBR3BCO0lBREMsZ0JBQU0sRUFBRTs7bURBQ2E7QUFHdEI7SUFEQyxnQkFBTSxFQUFFOztnREFDVTtBQUduQjtJQURDLGdCQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUM7O2tEQUNIO0FBR3RCO0lBREMsbUJBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx1QkFBVSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7K0NBQzFCO0FBR3hCO0lBREMsZ0JBQU0sRUFBRTs7NENBQ007QUFJZjtJQURDLGdCQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUM7OytDQUNMO0FBR25CO0lBREMsZ0JBQU0sRUFBRTs7b0RBQ2M7QUEvQmQsYUFBYTtJQUR6QixnQkFBTSxDQUFDLGVBQWUsQ0FBQztHQUNYLGFBQWEsQ0FnQ3pCO0FBaENZLHNDQUFhIn0=