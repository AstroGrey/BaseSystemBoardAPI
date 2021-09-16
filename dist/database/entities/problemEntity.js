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
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProblemEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProblemEntity.prototype, "problemName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userEntity_1.UserEntity, user => user.publishedProblems),
    __metadata("design:type", userEntity_1.UserEntity)
], ProblemEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProblemEntity.prototype, "problemGrade", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProblemEntity.prototype, "holdCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ProblemEntity.prototype, "isBenchmark", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => holdEntity_1.HoldEntity, hold => hold.problem),
    __metadata("design:type", Array)
], ProblemEntity.prototype, "holdList", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProblemEntity.prototype, "angle", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ProblemEntity.prototype, "matching", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProblemEntity.prototype, "datePublished", void 0);
ProblemEntity = __decorate([
    (0, typeorm_1.Entity)("ProblemEntity")
], ProblemEntity);
exports.ProblemEntity = ProblemEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvYmxlbUVudGl0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2RhdGFiYXNlL2VudGl0aWVzL3Byb2JsZW1FbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXFGO0FBQ3JGLDZDQUEwQztBQUMxQyw2Q0FBMEM7QUFHMUMsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtDQWdDekIsQ0FBQTtBQTdCRztJQURDLElBQUEsZ0NBQXNCLEdBQUU7O3lDQUNiO0FBR1o7SUFEQyxJQUFBLGdCQUFNLEdBQUU7O2tEQUNZO0FBR3JCO0lBREMsSUFBQSxtQkFBUyxFQUFDLEdBQUcsRUFBRSxDQUFDLHVCQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7OEJBQ25ELHVCQUFVOzZDQUFDO0FBR3BCO0lBREMsSUFBQSxnQkFBTSxHQUFFOzttREFDYTtBQUd0QjtJQURDLElBQUEsZ0JBQU0sR0FBRTs7Z0RBQ1U7QUFHbkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUM7O2tEQUNIO0FBR3RCO0lBREMsSUFBQSxtQkFBUyxFQUFDLEdBQUcsRUFBRSxDQUFDLHVCQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzsrQ0FDMUI7QUFHeEI7SUFEQyxJQUFBLGdCQUFNLEdBQUU7OzRDQUNNO0FBSWY7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUM7OytDQUNMO0FBR25CO0lBREMsSUFBQSxnQkFBTSxHQUFFOztvREFDYztBQS9CZCxhQUFhO0lBRHpCLElBQUEsZ0JBQU0sRUFBQyxlQUFlLENBQUM7R0FDWCxhQUFhLENBZ0N6QjtBQWhDWSxzQ0FBYSJ9