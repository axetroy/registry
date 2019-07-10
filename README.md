## Deno registry

This is a generic registry for importing library from everywhere.

Currently supports most of the code hosting platforms on the market.

- [x] [Github](https://github.com)
- [x] [Gitlab](https://gitlab.com)
- [x] [Bitbucket](https://bitbucket.org)
- [x] [Gitee](https://gitee.com)
- [x] [Coding](https://coding.net)
- [x] [Aliyun](https://code.aliyun.com)

### How to setup

require `deno@0.11.0`

```bash
deno --allow-net --allow-env https://raw.githubusercontent.com/axetroy/deno_registry/master/server.ts
```

### How to use it

Use the following format to import packages

`https://{domain}/{owner}/{repository}@{version}/filepath.ts`

```typescript
// import deno_std
import { server } from "http://localhost:8000/std@v0.9.0/http/server.ts";
// import from Github
import github from "http://localhost:8000/github.com/username/repository/mod.ts";
// import from Gitlab
import gitlab from "http://localhost:8000/gitlab.com/username/repository/mod.ts";
// import from Bitbucket
import bitbucket from "http://localhost:8000/bitbucket.org/username/repository/mod.ts";
// import from Gitee
import gitee from "http://localhost:8000/gitee.com/username/repository/mod.ts";
// import from Coding
import coding from "http://localhost:8000/coding.net/username/repository/mod.ts";
```

## License

The [MIT License](https://github.com/axetroy/deno_registry/blob/master/LICENSE)
