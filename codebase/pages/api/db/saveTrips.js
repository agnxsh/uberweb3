import { client } from "../../../lib/sanity";

const saveTrips = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
  }
};

export default saveTrips;
