import { http, HttpResponse } from "msw";

import { Location, locations } from "./db";

interface LocationsResult {
  total_count: number;
  locations: Location[];
}

export interface LocationsPathParams {
  page: string;
  location_name: string;
  robot_id: string;
  is_starred: string;
}

export const COUNT_PER_PAGE = 6;

export const handlers = [
  http.get<LocationsPathParams>(
    "/locations/:page/:location_name/:robot_id/:is_starred",
    ({ params }) => {
      // Please implement filtering feature here
      const { page, location_name, robot_id, is_starred } = params;
      const myStarred = JSON.parse(
        sessionStorage.getItem("starred_location_ids") || "[]",
      );

      let res = locations;

      if (location_name !== "null" || robot_id !== "null")
        res = locations.filter(
          (location) =>
            location.name.toLowerCase().includes(location_name.toLowerCase()) ||
            location.robot.id.toLowerCase().includes(robot_id.toLowerCase()),
        );

      if (is_starred === "true")
        res = res.filter((location) => myStarred.includes(location.id));

      const total_count = res.length;

      res = res.slice(
        (Number(page) - 1) * COUNT_PER_PAGE,
        Number(page) * COUNT_PER_PAGE,
      );

      const result: LocationsResult = {
        total_count: total_count,
        locations: res,
      };

      return HttpResponse.json(result);
    },
  ),

  http.get("/starred_location_ids", () => {
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]",
    );

    return HttpResponse.json({
      location_ids,
    });
  }),

  http.put("/starred_location_ids", async ({ request }) => {
    // console.log(request);
    if (!request.body) {
      return HttpResponse.json(
        { error_msg: "Encountered unexpected error" },
        { status: 500 },
      );
    }

    const req = await request.json();
    const starred = req?.starred;
    sessionStorage.setItem("starred_location_ids", JSON.stringify(starred));

    return HttpResponse.json(null, { status: 200 });
  }),
];
