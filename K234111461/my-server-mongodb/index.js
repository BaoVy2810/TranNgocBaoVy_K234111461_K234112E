const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = 4000;
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());
app.use("/static", express.static(path.join(__dirname, "public")));

const client = new MongoClient("mongodb://127.0.0.1:27017");
let database;
let categoryCollection, productCollection, employeeCollection;
let customerCollection, orderCollection, orderDetailsCollection;

client.connect().then(() => {
  database = client.db("PandaStore");
  categoryCollection = database.collection("Category");
  productCollection = database.collection("Product");
  employeeCollection = database.collection("Employee");
  customerCollection = database.collection("Customer");
  orderCollection = database.collection("Order");
  orderDetailsCollection = database.collection("OrderDetails");
  console.log("Connected to PandaStore database");
});

// ========== Q1: Database Design ==========
// Collections: Category, Product, Employee, Customer, Order, OrderDetails
// Use POST /api/seed to insert sample documents (5+ per collection)

// ========== Q2-Q5: CRUD APIs ==========

// ---- CATEGORY ----
// Q2: CREATE - POST
app.post("/api/categories", async (req, res) => {
  try {
    const result = await categoryCollection.insertOne(req.body);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Q3: READ - GET (all + by id)
app.get("/api/categories", async (req, res) => {
  try {
    const list = await categoryCollection.find({}).toArray();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/categories/:id", async (req, res) => {
  try {
    const doc = await categoryCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Q4: UPDATE - PUT
app.put("/api/categories/:id", async (req, res) => {
  try {
    const result = await categoryCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Q5: DELETE
app.delete("/api/categories/:id", async (req, res) => {
  try {
    const result = await categoryCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- PRODUCT ----
app.post("/api/products", async (req, res) => {
  try {
    const result = await productCollection.insertOne(req.body);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const list = await productCollection.find({}).toArray();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const doc = await productCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const result = await productCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const result = await productCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- EMPLOYEE ----
app.post("/api/employees", async (req, res) => {
  try {
    const result = await employeeCollection.insertOne(req.body);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/employees", async (req, res) => {
  try {
    const list = await employeeCollection.find({}).toArray();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/employees/:id", async (req, res) => {
  try {
    const doc = await employeeCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/employees/:id", async (req, res) => {
  try {
    const result = await employeeCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/employees/:id", async (req, res) => {
  try {
    const result = await employeeCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- CUSTOMER ----
app.post("/api/customers", async (req, res) => {
  try {
    const result = await customerCollection.insertOne(req.body);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/customers", async (req, res) => {
  try {
    const list = await customerCollection.find({}).toArray();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/customers/:id", async (req, res) => {
  try {
    const doc = await customerCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/customers/:id", async (req, res) => {
  try {
    const result = await customerCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/customers/:id", async (req, res) => {
  try {
    const result = await customerCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- ORDER ----
app.post("/api/orders", async (req, res) => {
  try {
    const result = await orderCollection.insertOne(req.body);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const list = await orderCollection.find({}).toArray();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/orders/:id", async (req, res) => {
  try {
    const doc = await orderCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/orders/:id", async (req, res) => {
  try {
    const result = await orderCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/orders/:id", async (req, res) => {
  try {
    const result = await orderCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- ORDER DETAILS ----
app.post("/api/orderdetails", async (req, res) => {
  try {
    const result = await orderDetailsCollection.insertOne(req.body);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/orderdetails", async (req, res) => {
  try {
    const list = await orderDetailsCollection.find({}).toArray();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/orderdetails/:id", async (req, res) => {
  try {
    const doc = await orderDetailsCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/orderdetails/:id", async (req, res) => {
  try {
    const result = await orderDetailsCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/orderdetails/:id", async (req, res) => {
  try {
    const result = await orderDetailsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== Q7: Display all products ==========

// ========== Q8: Search products by price (và model, made-by) ==========
app.get("/api/products/search/filter", async (req, res) => {
  try {
    const { minPrice, maxPrice, model, madeBy } = req.query;
    const filter = {};
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (model) filter.model = { $regex: model, $options: "i" };
    if (madeBy) filter.madeBy = { $regex: madeBy, $options: "i" };
    const list = await productCollection.find(filter).toArray();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== Q9-Q10: Cart / Order - Login required, Add to cart, Update cart, Payment ==========
// Q9: Add product to Current Cart (Order + OrderDetails)
app.post("/api/cart/add", async (req, res) => {
  try {
    const { customerId, productId, quantity } = req.body;
    if (!customerId || !productId || !quantity)
      return res.status(400).json({ error: "customerId, productId, quantity required" });
    const product = await productCollection.findOne({ _id: new ObjectId(productId) });
    if (!product) return res.status(404).json({ error: "Product not found" });
    let order = await orderCollection.findOne({
      customerId: new ObjectId(customerId),
      status: "pending",
    });
    if (!order) {
      const ins = await orderCollection.insertOne({
        customerId: new ObjectId(customerId),
        orderDate: new Date(),
        status: "pending",
        totalAmount: 0,
      });
      order = { _id: ins.insertedId, customerId: new ObjectId(customerId), status: "pending", totalAmount: 0 };
    }
    const od = await orderDetailsCollection.findOne({
      orderId: order._id,
      productId: new ObjectId(productId),
    });
    const qty = Number(quantity);
    if (od) {
      await orderDetailsCollection.updateOne(
        { _id: od._id },
        { $set: { quantity: od.quantity + qty } }
      );
    } else {
      await orderDetailsCollection.insertOne({
        orderId: order._id,
        productId: new ObjectId(productId),
        quantity: qty,
        price: product.price,
      });
    }
    res.json({ success: true, message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Q10: Get Current Cart (for logged-in customer)
app.get("/api/cart/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;
    const order = await orderCollection.findOne({
      customerId: new ObjectId(customerId),
      status: "pending",
    });
    if (!order) return res.json({ order: null, details: [] });
    const details = await orderDetailsCollection
      .aggregate([
        { $match: { orderId: order._id } },
        {
          $lookup: {
            from: "Product",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
      ])
      .toArray();
    res.json({ order, details });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Q10: Update cart - change quantity
app.put("/api/cart/item/:orderDetailId", async (req, res) => {
  try {
    const { quantity } = req.body;
    const result = await orderDetailsCollection.updateOne(
      { _id: new ObjectId(req.params.orderDetailId) },
      { $set: { quantity: Number(quantity) } }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Q10: Remove item from cart
app.delete("/api/cart/item/:orderDetailId", async (req, res) => {
  try {
    const result = await orderDetailsCollection.deleteOne({
      _id: new ObjectId(req.params.orderDetailId),
    });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Q10: Payment - finish cart
app.post("/api/cart/payment/:orderId", async (req, res) => {
  try {
    const details = await orderDetailsCollection
      .find({ orderId: new ObjectId(req.params.orderId) })
      .toArray();
    let total = 0;
    for (const d of details) {
      total += (d.price || 0) * (d.quantity || 0);
    }
    await orderCollection.updateOne(
      { _id: new ObjectId(req.params.orderId) },
      { $set: { status: "paid", totalAmount: total, paidDate: new Date() } }
    );
    res.json({ success: true, totalAmount: total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== Q11: Revenue Statistics (Employee only) ==========
app.get("/api/revenue", async (req, res) => {
  try {
    const { year } = req.query;
    const match = { status: "paid" };
    if (year) {
      match.orderDate = {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${Number(year) + 1}-01-01`),
      };
    }
    const result = await orderCollection.aggregate([
      { $match: match },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" }, count: { $sum: 1 } } },
    ]).toArray();
    const revenue = result[0]?.totalRevenue || 0;
    const count = result[0]?.count || 0;
    res.json({ revenue, orderCount: count, year: year || "all" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Revenue by year
app.get("/api/revenue/by-year", async (req, res) => {
  try {
    const list = await orderCollection.aggregate([
      { $match: { status: "paid" } },
      {
        $group: {
          _id: { $year: "$orderDate" },
          totalRevenue: { $sum: "$totalAmount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]).toArray();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== Q12: VIP Customers (Employee only) ==========
app.get("/api/vip-customers", async (req, res) => {
  try {
    const n = parseInt(req.query.n) || 10;
    const list = await orderCollection.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: "$customerId", totalSpent: { $sum: "$totalAmount" }, orderCount: { $sum: 1 } } },
      { $sort: { totalSpent: -1 } },
      { $limit: n },
      {
        $lookup: {
          from: "Customer",
          localField: "_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      { $unwind: "$customer" },
      {
        $project: {
          name: "$customer.name",
          email: "$customer.email",
          totalSpent: 1,
          orderCount: 1,
        },
      },
    ]).toArray();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== Q13: Auth - Login (Customer or Employee), Welcome X, Logout ==========
app.post("/api/auth/login/customer", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await customerCollection.findOne({ email, password });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: "customer",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/auth/login/employee", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await employeeCollection.findOne({ email, password });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: "employee",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== Q1: Seed sample data (5+ documents per collection) ==========
app.post("/api/seed", async (req, res) => {
  try {
    const categories = [
      { name: "Fashion", description: "Clothing and accessories" },
      { name: "Electronics", description: "Electronic devices" },
      { name: "Home", description: "Home and garden" },
      { name: "Sports", description: "Sports and outdoor" },
      { name: "Beauty", description: "Beauty products" },
    ];
    const products = [
      { name: "Panda T-Shirt", price: 199000, model: "PT-001", madeBy: "Vietnam", categoryId: null },
      { name: "Panda Hoodie", price: 450000, model: "PH-001", madeBy: "Vietnam", categoryId: null },
      { name: "Panda Cap", price: 120000, model: "PC-001", madeBy: "China", categoryId: null },
      { name: "Panda Mug", price: 89000, model: "PM-001", madeBy: "Vietnam", categoryId: null },
      { name: "Panda Keychain", price: 49000, model: "PK-001", madeBy: "Japan", categoryId: null },
    ];
    const employees = [
      { name: "Employee A", email: "emp1@pandastore.com", password: "123", phone: "0901111111" },
      { name: "Employee B", email: "emp2@pandastore.com", password: "123", phone: "0902222222" },
      { name: "Employee C", email: "emp3@pandastore.com", password: "123", phone: "0903333333" },
      { name: "Employee D", email: "emp4@pandastore.com", password: "123", phone: "0904444444" },
      { name: "Employee E", email: "emp5@pandastore.com", password: "123", phone: "0905555555" },
    ];
    const customers = [
      { name: "Customer A", email: "cus1@gmail.com", password: "123", phone: "0911111111", address: "HCM" },
      { name: "Customer B", email: "cus2@gmail.com", password: "123", phone: "0912222222", address: "HN" },
      { name: "Customer C", email: "cus3@gmail.com", password: "123", phone: "0913333333", address: "DN" },
      { name: "Customer D", email: "cus4@gmail.com", password: "123", phone: "0914444444", address: "CT" },
      { name: "Customer E", email: "cus5@gmail.com", password: "123", phone: "0915555555", address: "HP" },
    ];

    await categoryCollection.deleteMany({});
    await productCollection.deleteMany({});
    await employeeCollection.deleteMany({});
    await customerCollection.deleteMany({});
    await orderCollection.deleteMany({});
    await orderDetailsCollection.deleteMany({});

    const catResult = await categoryCollection.insertMany(categories);
    const catIds = Object.values(catResult.insertedIds);
    products.forEach((p, i) => (p.categoryId = catIds[i % catIds.length]));
    const prodResult = await productCollection.insertMany(products);
    const prodIds = Object.values(prodResult.insertedIds);
    await employeeCollection.insertMany(employees);
    const custResult = await customerCollection.insertMany(customers);
    const custIds = Object.values(custResult.insertedIds);

    const orderDocs = [];
    for (let i = 0; i < 5; i++) {
      orderDocs.push({
        customerId: custIds[i],
        orderDate: new Date(2025, i, 1),
        status: i < 3 ? "paid" : "pending",
        totalAmount: (i + 1) * 100000,
      });
    }
    const ordResult = await orderCollection.insertMany(orderDocs);
    const ordIds = Object.values(ordResult.insertedIds);

    const odDocs = [];
    for (let i = 0; i < 5; i++) {
      odDocs.push({
        orderId: ordIds[i],
        productId: prodIds[i],
        quantity: i + 1,
        price: products[i].price,
      });
    }
    await orderDetailsCollection.insertMany(odDocs);

    res.json({ success: true, message: "Seed data inserted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("The Panda Store - RESTful API (NodeJS + ExpressJS + MongoDB)");
});

// Start server
app.listen(port, () => {
  console.log(`Panda Store Server listening on port ${port}`);
});
