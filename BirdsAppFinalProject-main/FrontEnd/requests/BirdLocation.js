// import { BASE_URL } from "@env"
// const base_url = BASE_URL + "birdinfo/";


// const addBirdLocation = async (bird) => {
//   console.log("BIRD_LOCATION: " + JSON.stringify(bird));
//   const url = base_url + bird.bird_id; /// BIRD_ID
//   console.log(`url = ${url}`);
//   const requestOptions = {
//     /* POST */
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       bird_name: bird.bird_name,
//       bird_family: bird.bird_family,
//       image_path: bird.image_path,
//       bird_info: bird.bird_info,
//       lat: bird.lat,
//       lng: bird.lng,
//     }),
//     /* GET */
//   };

//   let res = await fetch(url, requestOptions);
//     // .then((response) => response.json())
//     // .then((json) => {
//     //   return json;
//     // })
//     // .catch((error) => {
//     //   console.error(error);
//     // });

//   console.log(`res = ${res.status}`);
//   console.log(`body = ${res.body}`);
//   console.log(res.json());
//   return res;
// };






// module.exports = { addBirdLocation };

