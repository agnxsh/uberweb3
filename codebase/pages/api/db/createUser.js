import { client } from "../../../lib/sanity";

const createUserInSanity = async (req, res) => {
  try {
    const userDoc = {
      _type: "users",
      _id: req.body.userWalletAddress,
      name: req.body.name,
      walletAddress: req.body.userWalletAddress,
    };

    await client.createIfNotExists(userDoc);
    req.status(200).send({ message: "success" });
  } catch (error) {
    req.status(500).send({ message: "error", data: error.message });
  }
};

export default createUserInSanity;
