import http from "k6/http"
import { check, sleep } from "k6"

const N = 1000

// export let options = {
//   stages: [
//     { duration: "1m", target: N }, // ramp-up to N users ( N users will keep requesting the server for 1 minute)
//     { duration: "2m", target: N }, // stay at N users
//     { duration: "1m", target: 0 }, // ramp-down
//   ],
// }

export let options = {
  vus: 10000, // Number of virtual users
  iterations: 100000, // Total number of iterations (requests)
}

export default function () {
  let res = http.get("http://localhost:1337/api/products")

  check(res, { "status was 200": (r) => r.status == 200 })
  //   sleep to simulate actual user behaviour, so every user will make 1 request per second
  sleep(1)
}

/* 
https://chatgpt.com/share/33fd0d7f-784d-4783-9a09-10566f7f4635
    test many insertion at the same time
*/
