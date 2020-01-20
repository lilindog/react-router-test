## react-router-test

### 项目目录结构

```markdown
react-router-test
│── .babelrc
│── .gitignore
│── build
│   │── webpack-base.js
│   │── webpack-build.js
│   └── webpack-dev.js
│── env
│   │── development.env
│   └── production.env
│── index.html
│── package-lock.json
│── package.json
│── public
│   │── favicon.ico
│   └── js
│       │── react-dom.production.min.js
│       └── react.production.min.js
│── README.md
│── src
│   │── api
│   │   │── home.ts
│   │   └── user.ts
│   │── assets
│   │   │── demo.html
│   │   │── fonts
│   │   │   │── icomoon.eot
│   │   │   │── icomoon.svg
│   │   │   │── icomoon.ttf
│   │   │   └── icomoon.woff
│   │   │── less
│   │   │   │── base.less
│   │   │   └── public.less
│   │   └── style.css
│   │── components
│   │   └── my-router
│   │       │── index.d.ts
│   │       │── index.tsx
│   │       │── less
│   │       │   │── animation.less
│   │       │   └── index.less
│   │       └── lib
│   │           │── Events.class.js
│   │           └── History.class.js
│   │── d.ts
│   │── index.less
│   │── index.tsx
│   │── pages
│   │   │── error404.tsx
│   │   │── page1.tsx
│   │   │── page2.tsx
│   │   │── page3.tsx
│   │   │── pagex.tsx
│   │   │── pagey.tsx
│   │   └── pagez.tsx
│   │── router
│   │   └── index.tsx
│   │── store
│   │   │── index.ts
│   │   └── reducer
│   │       │── message.ts
│   │       └── user.ts
│   └── utils
│       │── context.ts
│       │── request.ts
│       │── request2.ts
│       │── storage
│       │   │── index.js
│       │   └── keys.js
│       └── utils.ts
└── tsconfig.json

```

### 开发/打包

* 打包使用 npm run buid
* 开发使用 npm run start 或 npm run dev 