import { serve } from "https://deno.land/std@v0.11.0/http/server.ts";
import database from "./database.json";

interface OldPkg {
  url: string;
  repo: string;
}

const reflex = {
  // prettier-ignore
  "github.com": "https://raw.githubusercontent.com/${owner}/${repository}/${version}/${file}",
  // prettier-ignore
  "gitlab.com": "https://gitlab.com/${owner}/${repository}/raw/${version}/${file}",
  // prettier-ignore
  "bitbucket.org": "https://bitbucket.org/${owner}/${repository}/raw/${version}/${file}",
  // prettier-ignore
  "gitee.com": "https://gitee.com/${owner}/${repository}/raw/${version}/${file}",
  // prettier-ignore
  "coding.net": "https://coding.net/u/${owner}/p/${repository}/raw/${version}/${file}",
  // prettier-ignore
  "code.aliyun.com": "https://code.aliyun.com/${owner}/${repository}/raw/${version}/${file}"
};

export interface Package {
  domain: string;
  owner: string;
  repository: string;
  version: string;
  file: string;
}

export function urlParser(url: string): Package {
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

  // Compatible with old package manager.
  // /x/:owner/:repo/filepath.ts
  {
    const xReg = /^\/x\/([^@]+)(@([^\/]+))?\/(.+)/;
    const matcher = url.match(xReg);
    if (matcher) {
      const packageName = matcher[1];
      const version = matcher[3];
      const filepath = matcher[4];
      const pkg = database[packageName] as OldPkg;

      const u = new URL(pkg.repo);
      const [, owner, repoName] = u.pathname.split("/");
      const host = u.host;
      url = `/${host}/${owner}/${repoName}${
        version ? "@" + version : ""
      }/${filepath}`;
    }
  }

  const paths = url.split("/");

  paths.shift();

  if (paths.length <= 3) {
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
    file: filepaths.join("/")
  };
}

export function urlGenerator(pkg: Package): string {
  const urlTemplate = reflex[pkg.domain];

  const url = urlTemplate
    .replace(/\$\{\s*owner\s*\}/, pkg.owner)
    .replace(/\$\{\s*repository\s*\}/, pkg.repository)
    .replace(/\$\{\s*version\s*\}/, pkg.version)
    .replace(/\$\{\s*file\s*\}/, pkg.file);

  return url;
}

async function main() {
  const env = Deno.env();
  const port = env.PORT || "8000";
  const s = serve("0.0.0.0:" + port);

  for await (const req of s) {
    (async req => {
      const pkg = urlParser(req.url);

      if (!pkg) {
        await req.respond({ status: 404 });
        return;
      }

      const url = urlGenerator(pkg);

      const res = await fetch(url);

      await req.respond(res);
    })(req).catch((err: Error) => {
      req.respond({ status: 500, body: new TextEncoder().encode(err.message) });
    });
  }
}

if (import.meta.main) {
  main();
}
