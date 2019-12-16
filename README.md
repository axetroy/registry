[![Build Status](https://github.com/axetroy/registry/workflows/test/badge.svg)](https://github.com/axetroy/registry/actions)

## Deno registry

This is a generic registry for importing library from everywhere.

Currently supports most of the code hosting platforms on the market.

> [Related proposal](https://github.com/denoland/registry/issues/117)

- [x] [Github](https://github.com)
- [x] [Gitlab](https://gitlab.com)
- [x] [Bitbucket](https://bitbucket.org)
- [x] [Gitee](https://gitee.com)
- [x] [Coding](https://coding.net)
- [x] [Aliyun](https://code.aliyun.com)
- [x] [Tencent Cloud Developer Platform](https://dev.tencent.com)
- [x] [Tencent Worker Bee](https://git.code.tencent.com)

### Feel the Magic

```json
{
  "imports": {
    "github.com/": "https://lib.axetroy.xyz/github.com/"
  }
}
```

```ts
// example.ts
import { get } from "github.com/axetroy/deno_process/mod.ts";

console.log("current process information: ", await get(Deno.pid));
```

Run with command line `deno run --allow-run --importmap=import_map.json example.ts`

### How to setup

require `deno@0.26.0`

```bash
deno --allow-net --allow-env https://raw.githubusercontent.com/axetroy/registry/master/server.ts
```

### How to use it

Use the following format to import packages

`https://lib.axetroy.xyz/{domain}/{owner}/{repository}@{version}/filepath.ts`

```typescript
// Import modules in new ways
import { server } from "https://lib.axetroy.xyz/std/http/server.ts";

import github from "https://lib.axetroy.xyz/github.com/username/repository/mod.ts";
import gitlab from "https://lib.axetroy.xyz/gitlab.com/username/repository/mod.ts";
import bitbucket from "https://lib.axetroy.xyz/bitbucket.org/username/repository/mod.ts";
import gitee from "https://lib.axetroy.xyz/gitee.com/username/repository/mod.ts";
import coding from "https://lib.axetroy.xyz/coding.net/username/repository/mod.ts";
```

## License

The [MIT License](LICENSE)
