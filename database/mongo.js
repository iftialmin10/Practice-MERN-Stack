const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://iftiPlaceApi:PlAceAdminpIa@cluster0.hi8lrtj.mongodb.net/productTest?retryWrites=true&w=majority&appName=Cluster0";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };

  const client = new MongoClient(url);

  try {
    await client.connect(); // open the connection
    const db = client.db(); // get database access
    const result = await db.collection("products").insertOne(newProduct); // created new document

    res.json({
      message: "Product created",
      id: result.insertedId,
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product in the database" });
  } finally {
    await client.close();
  }
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);

  let products;

  try {
    await client.connect(); // open the connection
    const db = client.db(); // get database access
    products = await db.collection("products").find().toArray(); // fetch all products
    res.json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to retrieve products from the database" });
  } finally {
    await client.close();
  }
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
