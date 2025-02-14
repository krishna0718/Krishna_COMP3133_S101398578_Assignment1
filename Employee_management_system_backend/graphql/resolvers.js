/*const User = require("../models/User");
const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const resolvers = {
  Query: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      return { token, user };
    },
    getAllEmployees: async () => await Employee.find(),
    getEmployeeById: async (_, { id }) => await Employee.findById(id),
    searchEmployeesByDesignationOrDepartment: async (_, { designation, department }) => {
      return await Employee.find({ $or: [{ designation }, { department }] });
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const user = new User({ username, email, password });
      await user.save();
      return user;
    },
    addEmployee: async (_, args) => {
      const employee = new Employee(args);
      await employee.save();
      return employee;
    },
    updateEmployee: async (_, { id, ...args }) => {
      return await Employee.findByIdAndUpdate(id, args, { new: true });
    },
    deleteEmployee: async (_, { id }) => {
      await Employee.findByIdAndDelete(id);
      return "Employee deleted successfully!";
    },
  },
};

module.exports = resolvers;




*/

















const User = require("../models/User");
const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();

const resolvers = {
  Query: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      return { token, user };
    },

    getAllEmployees: async () => await Employee.find(),

    getEmployeeById: async (_, { id }) => {
      const employee = await Employee.findById(id);
      if (!employee) throw new Error("Employee not found");
      return employee;
    },

    searchEmployeesByDesignationOrDepartment: async (_, { designation, department }) => {
      return await Employee.find({ $or: [{ designation }, { department }] });
    },
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      // ✅ Validate Input Data
      const errors = [];
      if (!username || username.length < 3) errors.push("Username must be at least 3 characters long.");
      if (!email || !/\S+@\S+\.\S+/.test(email)) errors.push("Invalid email format.");
      if (!password || password.length < 6) errors.push("Password must be at least 6 characters long.");
      if (errors.length > 0) throw new Error(errors.join(" "), "BAD_USER_INPUT");

      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists", "BAD_USER_INPUT");

      // ✅ Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      return user;
    },
    

    addEmployee: async (_, args) => {
      // ✅ Validate Employee Data
      const { first_name, last_name, email, salary, designation, department } = args;
      const errors = [];
      if (!first_name || first_name.length < 2) errors.push("First name must be at least 2 characters.");
      if (!last_name || last_name.length < 2) errors.push("Last name must be at least 2 characters.");
      if (!email || !/\S+@\S+\.\S+/.test(email)) errors.push("Invalid email format.");
      if (!designation) errors.push("Designation is required.");
      if (salary < 1000) errors.push("Salary must be at least 1000.");
      if (!department) errors.push("Department is required.");
      if (errors.length > 0) throw new Error(errors.join(" "));

      const employee = new Employee(args);
      await employee.save();
      return employee;
    },

    updateEmployee: async (_, { id, ...args }) => {
      // ✅ Ensure `updated_at` is set when updating
      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { ...args, updated_at: new Date() },
        { new: true }
      );
      if (!updatedEmployee) throw new Error("Employee not found");
      return updatedEmployee;
    },

    deleteEmployee: async (_, { id }) => {
      const employee = await Employee.findById(id);
      if (!employee) throw new Error("Employee not found");

      await Employee.findByIdAndDelete(id);
      return "Employee deleted successfully!";
    },
  },
};

module.exports = resolvers;
