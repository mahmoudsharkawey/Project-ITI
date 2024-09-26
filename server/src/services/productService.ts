import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const getProductById = async (id: number) => {
  return await productModel.findOne({ id });
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        id: 1,
        title: "Drawer Small Bedside Table",
        image:
          "https://images.dunelm.com/30832616.jpg?$standardplayerdefault$&img404=noimagedefault",
        price: 599.99,
        category: "bedroom",
        description: "This is a small bedside table with drawers.",
      },
      {
        id: 2,
        title: "Jayden Counter Height Bar Stool",
        image:
          "https://images.dunelm.com/30891311.jpg?$standardplayerdefault$&img404=noimagedefault",
        price: 999.99,
        category: "kitchen",
        description: "This is a counter height bar stool.",
      },
      {
        id: 3,
        title: "Harlow Flatweave Storage Double Sofa Bed",
        image:
          "https://images.dunelm.com/30910742.jpg?$standardplayerdefault$&img404=noimagedefault",
        price: 149.99,
        category: "living_room",
        description: "This is a flatweave storage double sofa bed.",
      },
      {
        id: 4,
        title: "Dining Table",
        image:
          "https://images.dunelm.com/30890245.jpg?$standardplayerdefault$&img404=noimagedefault",
        price: 399.99,
        category: "dining_room",
        description: "This is a dining table.",
      },
      {
        id: 5,
        title: "Obaby Grace Mini Cot Bed",
        image:
          "https://images.dunelm.com/30844493.jpg?$standardplayerdefault$&img404=noimagedefault",
        price: 399.99,
        category: "children_room",
        description: "This is a mini cot bed.",
      },
    ];

    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.error("cannot see database", err);
  }
};
