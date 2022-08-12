import { BASE_URL } from "@env";

async function predict_bird(image_name) {
  console.log(`Got define bird for image ${image_name}`);
  const url = BASE_URL + "predict/" + image_name;
  console.log(`url = ${url}`);
  res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await res;
}

async function get_all_birds_types() {
  console.log('Get all birds types request')
  const url = BASE_URL + "types"
  const res = await fetch(url);
  return await res;
}

async function get_bird_info(bird_name) {
  console.log(`Get bird info for bird ${bird_name}`);
  const url = BASE_URL + "birdinfo/" + bird_name;
  const res = await fetch(url);
  return await res;
}

async function get_bird_image(bird_name){
  console.log(`Get bird image request for bird ${bird_name}`);
  const url = BASE_URL + "bird/" + bird_name + '.jpg';
  return url;
}

module.exports = {
  predict_bird,
  get_all_birds_types,
  get_bird_info,
  get_bird_image,
};
