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

### How to setup

require `deno@0.15.0`

```bash
deno --allow-net --allow-env https://raw.githubusercontent.com/axetroy/deno_registry/master/server.ts
```

### How to use it

Use the following format to import packages

`https://denolib.herokuapp.com/{domain}/{owner}/{repository}@{version}/filepath.ts`

Or compatible with [denoland/registry](https://github.com/denoland/registry)

`https://denolib.herokuapp.com/x/{packageName}@{version}/filepath.ts`

```typescript
// Import modules in new ways
import { server } from "https://denolib.herokuapp.com/std/http/server.ts";
import github from "https://denolib.herokuapp.com/github.com/username/repository/mod.ts";
import gitlab from "https://denolib.herokuapp.com/gitlab.com/username/repository/mod.ts";
import bitbucket from "https://denolib.herokuapp.com/bitbucket.org/username/repository/mod.ts";
import gitee from "https://denolib.herokuapp.com/gitee.com/username/repository/mod.ts";
import coding from "https://denolib.herokuapp.com/coding.net/username/repository/mod.ts";

// Import modules in old ways. compatible with `denoland/registry`
import { server } from "https://denolib.herokuapp.com/x/abc/mod.ts";
import * as math from "https://denolib.herokuapp.com/x/math/mod.ts";
```

## License

The [MIT License](https://github.com/axetroy/deno_registry/blob/master/LICENSE)
