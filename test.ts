import {
  assert,
  assertEquals
} from "https://deno.land/std@v0.79.0/testing/asserts.ts";
import { Package, urlGenerator, urlParser } from "./api/index.ts";

const { test } = Deno;

test({
  name: "UrlParser",
  fn: () => {
    const testList: [string, Package][] = [
      [
        "/std@v0.9.0/http/server.ts",
        {
          domain: "github.com",
          owner: "denoland",
          repository: "deno_std",
          version: "v0.9.0",
          file: "http/server.ts",
        },
      ],
      [
        "/std/http/server.ts",
        {
          domain: "github.com",
          owner: "denoland",
          repository: "deno_std",
          version: "master",
          file: "http/server.ts",
        },
      ],
      [
        "/github.com/denoland/deno_std@v0.9.0/http/server.ts",
        {
          domain: "github.com",
          owner: "denoland",
          repository: "deno_std",
          version: "v0.9.0",
          file: "http/server.ts",
        },
      ],
      [
        "/github.com/denoland/deno_std/http/server.ts",
        {
          domain: "github.com",
          owner: "denoland",
          repository: "deno_std",
          version: "master",
          file: "http/server.ts",
        },
      ],
    ];

    for (const [url, pkg] of testList) {
      const result = urlParser(url);
      assertEquals(result, pkg);
    }
  },
});

test({
  name: "UrlGenerator",
  fn: () => {
    const testList: [string, string][] = [
      // Github source
      [
        "/std@v0.9.0/http/server.ts",
        "https://raw.githubusercontent.com/denoland/deno_std/v0.9.0/http/server.ts",
      ],
      [
        "/std/http/server.ts",
        "https://raw.githubusercontent.com/denoland/deno_std/master/http/server.ts",
      ],
      [
        "/std@master/http/server.ts",
        "https://raw.githubusercontent.com/denoland/deno_std/master/http/server.ts",
      ],
      [
        "/github.com/denoland/deno_std/http/server.ts",
        "https://raw.githubusercontent.com/denoland/deno_std/master/http/server.ts",
      ],
      [
        "/github.com/denoland/deno_std@v0.9.0/http/server.ts",
        "https://raw.githubusercontent.com/denoland/deno_std/v0.9.0/http/server.ts",
      ],
      // Gitlab source
      [
        "/gitlab.com/owner/name/example.ts",
        "https://gitlab.com/owner/name/raw/master/example.ts",
      ],
      [
        "/gitlab.com/owner/name@v1.0.0/example.ts",
        "https://gitlab.com/owner/name/raw/v1.0.0/example.ts",
      ],
      // Bitbucket source
      [
        "/bitbucket.org/owner/name/example.ts",
        "https://bitbucket.org/owner/name/raw/master/example.ts",
      ],
      [
        "/bitbucket.org/owner/name@v1.0.0/example.ts",
        "https://bitbucket.org/owner/name/raw/v1.0.0/example.ts",
      ],
      // Gitee source
      [
        "/gitee.com/owner/name/example.ts",
        "https://gitee.com/owner/name/raw/master/example.ts",
      ],
      [
        "/gitee.com/owner/name@v1.0.0/example.ts",
        "https://gitee.com/owner/name/raw/v1.0.0/example.ts",
      ],
      // Coding.net
      [
        "/coding.net/owner/name/example.ts",
        "https://coding.net/u/owner/p/name/raw/master/example.ts",
      ],
      [
        "/coding.net/owner/name@v1.0.0/example.ts",
        "https://coding.net/u/owner/p/name/raw/v1.0.0/example.ts",
      ],
      // Aliyun code
      [
        "/code.aliyun.com/owner/name/example.ts",
        "https://code.aliyun.com/owner/name/raw/master/example.ts",
      ],
      [
        "/code.aliyun.com/owner/name@v1.0.0/example.ts",
        "https://code.aliyun.com/owner/name/raw/v1.0.0/example.ts",
      ],
      // Tencent Cloud Developer Platform
      [
        "/dev.tencent.com/owner/name/example.ts",
        "https://dev.tencent.com/u/owner/p/name/git/raw/master/example.ts",
      ],
      [
        "/dev.tencent.com/owner/name@v1.0.0/example.ts",
        "https://dev.tencent.com/u/owner/p/name/git/raw/v1.0.0/example.ts",
      ],
      // Tencent Worker Bee
      [
        "/git.code.tencent.com/owner/name/example.ts",
        "https://git.code.tencent.com/owner/name/raw/master/example.ts",
      ],
      [
        "/git.code.tencent.com/owner/name@v1.0.0/example.ts",
        "https://git.code.tencent.com/owner/name/raw/v1.0.0/example.ts",
      ],
    ];

    for (const [url, finalUrl] of testList) {
      const pkg = urlParser(url);
      assert(pkg);
      const result = urlGenerator(pkg);
      assertEquals(result, finalUrl);
    }
  },
});
