## Deno registry

This is a generic registry for importing library from everywhere.

Currently supports most of the code hosting platforms on the market.

- [x] [Github](https://github.com)
- [x] [Gitlab](https://gitlab.com)
- [x] [Bitbucket](https://bitbucket.org)
- [x] [Gitee](https://gitee.com)
- [x] [Coding](https://coding.net)
- [x] [Aliyun](https://code.aliyun.com)
- [x] [Tencent Cloud Developer Platform](https://dev.tencent.com)
- [x] [Tencent Worker Bee](https://git.code.tencent.com)

### How to setup

require `deno@0.11.0`

```bash
deno --allow-net --allow-env https://raw.githubusercontent.com/axetroy/deno_registry/master/server.ts
```

### How to use it

Use the following format to import packages

`http://localhost/{domain}/{owner}/{repository}@{version}/filepath.ts`

Or compatible with [denoland/registry](https://github.com/denoland/registry)

`http://localhost/x/{packageName}@{version}/filepath.ts`

```typescript
// Import modules in new ways
import { server } from "http://localhost/std/http/server.ts";
import github from "http://localhost/github.com/username/repository/mod.ts";
import gitlab from "http://localhost/gitlab.com/username/repository/mod.ts";
import bitbucket from "http://localhost/bitbucket.org/username/repository/mod.ts";
import gitee from "http://localhost/gitee.com/username/repository/mod.ts";
import coding from "http://localhost/coding.net/username/repository/mod.ts";

// Import modules in old ways. compatible with `denoland/registry`
import { server } from "http://localhost/x/abc/mod.ts";
import * as math from "http://localhost/x/math/mod.ts";
```

## License

The [MIT License](https://github.com/axetroy/deno_registry/blob/master/LICENSE)
