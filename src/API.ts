import axios from "axios";
import { Location } from "./mocks/db";

class API {
  async getLocations({
    page,
    location_name,
    robot_id,
    is_starred,
  }: {
    page: number;
    location_name: string;
    robot_id: string;
    is_starred: boolean;
  }) {
    let url = `/locations/${page || 1}/${location_name || "null"}/${robot_id || "null"}/${is_starred || false}`;
    const res = await axios.get(url);
    return res.data;
  }

  async getStarred() {
    const res = await axios.get("/starred_location_ids");
    return res.data;
  }

  async addStarred(starred: Location["id"][]) {
    const res = await axios.put("/starred_location_ids", { starred });
    return res.data;
  }
}

export const api = new API();
