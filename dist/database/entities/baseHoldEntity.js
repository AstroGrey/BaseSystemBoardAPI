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
exports.BaseHoldEntity = void 0;
const typeorm_1 = require("typeorm");
/* This class will handle the creation of all base holds,
their position on the board, descriptors (crimpy, slopy, pinch, etc),
and an ID to be used in the problemHoldList
*/
let BaseHoldEntity = class BaseHoldEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BaseHoldEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BaseHoldEntity.prototype, "descriptor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BaseHoldEntity.prototype, "hold", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BaseHoldEntity.prototype, "location", void 0);
BaseHoldEntity = __decorate([
    (0, typeorm_1.Entity)("BaseHoldEntity")
], BaseHoldEntity);
exports.BaseHoldEntity = BaseHoldEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZUhvbGRFbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9kYXRhYmFzZS9lbnRpdGllcy9iYXNlSG9sZEVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBK0Q7QUFFL0Q7OztFQUdFO0FBRUYsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztDQWExQixDQUFBO0FBVkc7SUFEQyxJQUFBLGdDQUFzQixHQUFFOzswQ0FDYjtBQUdaO0lBREMsSUFBQSxnQkFBTSxHQUFFOztrREFDVztBQUdwQjtJQURDLElBQUEsZ0JBQU0sR0FBRTs7NENBQ0s7QUFHZDtJQURDLElBQUEsZ0JBQU0sR0FBRTs7Z0RBQ1M7QUFaVCxjQUFjO0lBRDFCLElBQUEsZ0JBQU0sRUFBQyxnQkFBZ0IsQ0FBQztHQUNaLGNBQWMsQ0FhMUI7QUFiWSx3Q0FBYyJ9