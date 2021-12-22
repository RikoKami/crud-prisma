import express from "express";
import { allUsers, createUser, user } from "./controllers/users";
import { allGroups, groups } from "./controllers/groups";

const routes = express();

routes.get("/user/:id", user);
routes.get("/users", allUsers);
routes.post("/user", createUser);

routes.get("/groups", allGroups);
routes.get("/group/:id", groups);

module.exports = routes;
