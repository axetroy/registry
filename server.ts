import { serve } from "https://deno.land/std@v1.0.0-rc1/http/server.ts";

const encoder = new TextEncoder();

interface Reflex {
  [source: string]: {
    repository: string;
    raw: string;
  };
}

const reflex: Reflex = {
  // prettier-ignore
  "github.com": {
    repository: "https://github.com/${owner}/${repository}",
    raw:
      "https://raw.githubusercontent.com/${owner}/${repository}/${version}/${file}",
  },
  "gitlab.com": {
    repository: "https://gitlab.com/${owner}/${repository}",
    raw: "https://gitlab.com/${owner}/${repository}/raw/${version}/${file}",
  },
  "bitbucket.org": {
    repository: "https://bitbucket.org/${owner}/${repository}",
    raw: "https://bitbucket.org/${owner}/${repository}/raw/${version}/${file}",
  },
  "gitee.com": {
    repository: "https://gitee.com/${owner}/${repository}",
    raw: "https://gitee.com/${owner}/${repository}/raw/${version}/${file}",
  },
  "coding.net": {
    repository: "https://coding.net/u/${owner}/p/${repository}",
    raw: "https://coding.net/u/${owner}/p/${repository}/raw/${version}/${file}",
  },
  "code.aliyun.com": {
    repository: "https://code.aliyun.com/${owner}/${repository}",
    raw:
      "https://code.aliyun.com/${owner}/${repository}/raw/${version}/${file}",
  },
  // prettier-ignore
  "dev.tencent.com": {
    repository: "https://dev.tencent.com/u/${owner}/p/${repository}",
    raw:
      "https://dev.tencent.com/u/${owner}/p/${repository}/git/raw/${version}/${file}",
  },
  // prettier-ignore
  "git.code.tencent.com": {
    repository: "https://git.code.tencent.com/${owner}/${repository}",
    raw:
      "https://git.code.tencent.com/${owner}/${repository}/raw/${version}/${file}",
  },
  "notabug.org": {
    repository: "https://notabug.org/${owner}/${repository}",
    raw: "https://notabug.org/${owner}/${repository}/raw/${version}/${file}",
  },
};

export interface Package {
  domain: string;
  owner: string;
  repository: string;
  version: string;
  file: string;
}

export function urlParser(url: string): Package | void {
  // /std@version/filepath.ts
  {
    const stdReg = /^\/std(@([^\/]+))?\/(.+)/;
    const matcher = url.match(stdReg);
    if (matcher) {
      const version = matcher[2] || "master";
      const file = matcher[3];
      url = `/github.com/denoland/deno_std@${version}/${file}`;
    }
  }

  const paths = url.split("/");

  paths.shift();

  if (paths.length <= 2) {
    return;
  }

  const [domain, owner, project, ...filepaths] = paths;

  let [repository, version] = project.split("@");

  if (!version) {
    version = "master";
  }

  if (domain in reflex === false) {
    return;
  }

  return {
    domain,
    owner,
    repository,
    version,
    file: filepaths.join("/"),
  };
}

export function urlGenerator(pkg: Package): string {
  const info = reflex[pkg.domain];

  const url = info.raw
    .replace(/\$\{\s*owner\s*\}/, pkg.owner)
    .replace(/\$\{\s*repository\s*\}/, pkg.repository)
    .replace(/\$\{\s*version\s*\}/, pkg.version)
    .replace(/\$\{\s*file\s*\}/, pkg.file);

  return url;
}

export function repositoryUrlGenerator(pkg: Package): string {
  const info = reflex[pkg.domain];

  const url = info.repository
    .replace(/\$\{\s*owner\s*\}/, pkg.owner)
    .replace(/\$\{\s*repository\s*\}/, pkg.repository);

  return url;
}

export function isBrowserUserAgent(userAgent: string): boolean {
  return /(webkit)|(Mozilla)|(chrome)|(safari)/i.test(userAgent);
}

const port = Deno.env.get("PORT") || "8088";
const s = serve("0.0.0.0:" + port);

for await (const req of s) {
  (async (req) => {
    const userAgent = req.headers.get("user-agent") || "";

    const u = new URL("http://localhost" + req.url);
    const isRequestByBrowser = isBrowserUserAgent(userAgent);

    if (isRequestByBrowser) {
      switch (u.pathname) {
        case "/":
          const headers = new Headers();

          const home = await Deno.open("./index.html", { read: true });

          headers.append("Content-Type", "text/html; charset=utf-8");

          await req.respond({
            status: 200,
            headers: headers,
            body: home,
          });
          break;
      }
    }

    const pkg = urlParser(req.url);

    if (!pkg) {
      await req.respond({
        status: 404,
        body: encoder.encode("404 not found"),
      });
      return;
    }

    if (isRequestByBrowser) {
      if (pkg.file === "") {
        const repositoryUrl = repositoryUrlGenerator(pkg);
        const headers = new Headers();

        headers.append("Location", repositoryUrl);

        await req.respond({ status: 302, headers: headers });
        return;
      }
    }

    const url = urlGenerator(pkg);

    const res = await fetch(url);

    const headers = res.headers;

    headers.append(
      "X-Power-By",
      "https://github.com/axetroy/registry",
    );

    await req.respond({
      status: res.status,
      headers: headers,
      body: await res.text(),
      trailers: () => res.trailer,
    });
  })(req).catch((err: Error) => {
    req.respond({ status: 500, body: encoder.encode(err.message) });
  });
}
