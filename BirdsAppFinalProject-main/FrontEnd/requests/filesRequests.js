import { BASE_URL } from "@env";
import * as FileSystem from "expo-file-system";

async function post_file(uri, file_name) {
  //   const formData = new FormData(base_url);

  const base_url = BASE_URL + "bird/" + file_name;
  console.log(base_url);
  const res = await FileSystem.uploadAsync(base_url, uri, {
    method: "GET",
    //   base64: true,
    headers: { "Content-Type": "image/jpeg" },
  });
  console.log(await res.body);
   return await res.status
}

module.exports = { post_file };
