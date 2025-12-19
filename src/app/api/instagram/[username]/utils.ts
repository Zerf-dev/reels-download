import { RequestConfigType } from "@/types/request-config";
import { IG_GraphQLResponseDto } from "@/features/api/_dto/instagram";

import querystring from "querystring";

function generateRequestBody(username: string, after?: string) {
  const variables: any = {
    after: after || null,
    before: null,
    data: {
      count: 24,
      include_reel_media_seen_timestamp: true,
      include_relationship_info: true,
      latest_besties_reel_media: true,
      latest_reel_media: true,
    },
    first: 24,
    last: null,
    username: username,
    __relay_internal__pv__PolarisIsLoggedInrelayprovider: true,
  };

  console.log(`Variables: ${JSON.stringify(variables, null, 2)}`);

  return querystring.stringify({
    av: "17841401522432864",
    __d: "www",
    __user: "0",
    __a: "1",
    __req: "18",
    __hs: "20396.HYP:instagram_web_pkg.2.1...0",
    dpr: "2",
    __ccg: "EXCELLENT",
    __rev: "1029384238",
    __s: "86v98r:104wjm:yos1q8",
    __hsi: "7568994641539957203",
    __dyn:
      "7xeUjG1mxu1syUbFp41twWwIxu13wvoKewSAwHwNw9G2S7o2vwa24o0B-q1ew6ywaq0yE462mcw5Mx62G5UswoEcE7O2l0Fwqo31w9O1lwxwQzXwae4UaEW2G0AEco5G1Wxfxm16wUwtE1wEbUGdG1QwTU9UaQ0Lo6-3u2WE5B08-269wr86C1mgcEed6goK2O4Xxui2qi7E5y4UrwHwGwa6bBK4o16UeUG3a13AwhES5E",
    __csr:
      "gV94st1L2ffT3kJivn6PYQO4bplZkOcPHKQiuvzdQQGhd4LqzoV6DBBWiBHiAAKHjjJQS8UOGGHBh5AyWqLBxdrLCuijy9aBigWcXwwgcVVWGECnAKt3bjHGAh1OiVoycBgjjhVF9aWWCARDyUGUF4CyoC225FF8ggrAy-m78GbwNgiwce00lO904fxymi542u0j0w3QK1Zycw0jRyod9sN8HHwl84iUkweO0enw4aCw2Ri09Jw2pqx2fy9iiwzwWg-2pwBxilwMg-2fc1vwkQ0rNo7S1e80aq8i8gKu1GgoxC3F0lU0hG2EGtxkk2mU8EK0nm01HRwdZ1q0vC04-E0zq2i07B81po",
    __hsdp:
      "gfy91o2s4kykY47G9f55iWjyv198cA9BIFeB4ZaCyEsDs8zgz5NxVbrgTBzhSA1vAGN088mwrd0Boa8dO6wHyogxepyAC8DwKyo53je3y6E7q10zoa8yawfCEcpUGdwgotwFxyufg-8wg8KidxKi2q6U2iweqfw2io0C63-3u1Ow2e8kwu81T88Uc84S0A80JS3u1hw30UbU3jg3GwKyAdzo12835-0OU",
    __hblp:
      "0u9K0Cob8hx6m267EaocUrKih1q9zK487G2WcwHxR3poCex2iawLK5o8FEmyKcAx22enqx6i2fypU4y2i6FoWEy6Q3W8Dy4u3ydxm4FbgCUc40JoSA4EtDyESu7AazESfAwAxamufg-8xO6VUuxKi2q6U421hw_waqfg0Ay1fw5Gwaq2O4EdU7a0lu0U8kwu8W0HU7G0zUiwzwMyU98syoe84S3a7E0EK3u1hwqU1hE1iFonxu1fwg8a8gy40UFA5UmyAdGaxS1zwuoO6QfyU2c-3-3y1iw",
    __sjsp:
      "gfy91o2s4kykZNk8-EAYIxkKAUDMii392prajFhfiFJq79T28Q8XfNhV8B3um58720T42y",
    __comet_req: "7",
    fb_dtsg:
      "NAfuT7tBB9mA0FftQX5zfZpn0EOLhGb6C4gDSG9_Np5MHGmYYJQ7qmQ:17843708194158284:1761076040",
    jazoest: "26056",
    lsd: "Mi-bW5ftjQHDm38dQS0vM4",
    __spin_r: "1029384238",
    __spin_b: "trunk",
    __spin_t: "1762293894",
    __crn: "comet.igweb.PolarisProfilePostsTabRoute",
    fb_api_caller_class: "RelayModern",
    fb_api_req_friendly_name: "PolarisProfilePostsTabContentQuery_connection",
    server_timestamps: true,
    variables: JSON.stringify(variables),
    doc_id: "25461702053427256",
  });
}

export type GetInstagramUserPostsRequest = {
  username: string;
  after?: string;
};

export type GetInstagramUserPostsResponse = IG_GraphQLResponseDto;

export function getInstagramUserPostsGraphQL(
  data: GetInstagramUserPostsRequest,
  requestConfig?: RequestConfigType
) {
  const requestUrl = new URL("https://www.instagram.com/graphql/query");

  return fetch(requestUrl, {
    credentials: "include",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "application/x-www-form-urlencoded",
      "X-FB-Friendly-Name": "PolarisProfilePostsTabContentQuery_connection",
      "X-BLOKS-VERSION-ID":
        "0d99de0d13662a50e0958bcb112dd651f70dea02e1859073ab25f8f2a477de96",
      "X-CSRFToken": "uy8OpI1kndx4oUHjlHaUfu",
      "X-IG-App-ID": "1217981644879628",
      "X-FB-LSD": "Mi-bW5ftjQHDm38dQS0vM4",
      "X-ASBD-ID": "359341",
      "Sec-GPC": "1",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    referrer: `https://www.instagram.com/${data.username}/`,
    body: generateRequestBody(data.username, data.after),
    method: "POST",
    mode: "cors",
    ...requestConfig,
  });
}
