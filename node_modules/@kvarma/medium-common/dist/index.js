"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readValidation = exports.editValidation = exports.postValidation = exports.signinValidation = exports.signupValidation = void 0;
const zod_1 = require("zod");
exports.signupValidation = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.signinValidation = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.postValidation = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.editValidation = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional()
});
exports.readValidation = zod_1.z.object({
    id: zod_1.z.string()
});
