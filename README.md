## iot-mobile

*[之前的README点这里](./docs/README.md)*

### 项目目录结构

```markdown
iot-mobile
│── .babelrc
│── .gitignore
│── build
│   │── webpack-base.js
│   │── webpack-build.js
│   └── webpack-dev.js
│── dist
│── docs
│   └── README.md
│── env
│   │── development.env
│   └── production.env
│── index.html
│── package-lock.json
│── package.json
│── public
│   │── favicon.ico
│   │── img
│   │   │── spot-selected.png
│   │   │── 不可用.png
│   │   │── 我的位置.png
│   │   │── 正常可租.png
│   │   └── 满仓.png
│   └── js
│       │── react-dom.production.min.js
│       └── react.production.min.js
│── README.md
│── src
│   │── api
│   │   └── user.ts
│   │── assets
│   │   │── demo.html
│   │   │── fonts
│   │   │   │── icomoon.eot
│   │   │   │── icomoon.svg
│   │   │   │── icomoon.ttf
│   │   │   └── icomoon.woff
│   │   │── img
│   │   │   │── checking.png
│   │   │   │── default.png
│   │   │   │── empty.png
│   │   │   │── fail.png
│   │   │   └── success.png
│   │   │── less
│   │   │   │── base.less
│   │   │   └── public.less
│   │   └── style.css
│   │── components
│   │   │── leftTimeBtn
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   │── modal
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   │── myImg
│   │   │   │── icon
│   │   │   │   └── loading.svg
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   │── myRouter
│   │   │   └── index.tsx
│   │   │── pullup
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   │── tabbar
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   │── topbar
│   │   │   │── components
│   │   │   │   └── messageIcon
│   │   │   │       │── icon
│   │   │   │       │   └── news.png
│   │   │   │       │── index.tsx
│   │   │   │       └── less
│   │   │   │           └── index.less
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   └── uploader
│   │       │── icon
│   │       │   └── loading.svg
│   │       │── index.tsx
│   │       │── less
│   │       │   └── index.less
│   │       └── README.md
│   │── d.ts
│   │── index.less
│   │── index.tsx
│   │── pages
│   │   │── 404
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   │── about
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── about.less
│   │   │── addOrEditAddress
│   │   │   │── icon
│   │   │   │   └── more.png
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   │── address
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   │── cardOrTicket
│   │   │   │── icon
│   │   │   │   └── empty.png
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   │── editNickname
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   │── editPhone
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   │── feedback
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   │── identify
│   │   │   │── img
│   │   │   │   │── border.png
│   │   │   │   └── certified.png
│   │   │   │── index.tsx
│   │   │   │── less
│   │   │   │   │── index.less
│   │   │   │   └── realName.less
│   │   │   └── realName.tsx
│   │   │── info
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   │── init
│   │   │   │── index.tsx
│   │   │   │── less
│   │   │   │   └── index.less
│   │   │   └── pages
│   │   │       │── home
│   │   │       │   │── components
│   │   │       │   │   └── card
│   │   │       │   │       │── icon
│   │   │       │   │       │   │── loading.svg
│   │   │       │   │       │   └── navigation.png
│   │   │       │   │       │── index.tsx
│   │   │       │   │       └── less
│   │   │       │   │           └── index.less
│   │   │       │   │── icon
│   │   │       │   │   │── orientation.png
│   │   │       │   │   └── scan_white.png
│   │   │       │   │── index.tsx
│   │   │       │   └── less
│   │   │       │       └── index.less
│   │   │       │── order
│   │   │       │   │── components
│   │   │       │   │   └── orderCard
│   │   │       │   │       │── index.tsx
│   │   │       │   │       └── less
│   │   │       │   │           └── index.less
│   │   │       │   │── index.tsx
│   │   │       │   └── less
│   │   │       │       └── index.less
│   │   │       └── person
│   │   │           │── icon
│   │   │           │   │── aboutus.png
│   │   │           │   │── guarantee_deposit.png
│   │   │           │   │── insurance.png
│   │   │           │   │── money.png
│   │   │           │   │── more.png
│   │   │           │   │── recharge.png
│   │   │           │   │── service_color.png
│   │   │           │   │── suggestion.png
│   │   │           │   │── voucher.png
│   │   │           │   └── wallet.png
│   │   │           │── index.tsx
│   │   │           └── less
│   │   │               └── index.less
│   │   │── message
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   │── recharge
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   │── refundCash
│   │   │   │── icon
│   │   │   │   │── card_color.png
│   │   │   │   │── card_gray.png
│   │   │   │   │── discount.png
│   │   │   │   │── insurance.png
│   │   │   │   └── spot.png
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   │── test
│   │   │   │── for.tsx
│   │   │   │── index.tsx
│   │   │   └── modal.tsx
│   │   │── transactionList
│   │   │   │── icon
│   │   │   │   │── calendar.png
│   │   │   │   └── pulldown.png
│   │   │   │── index.tsx
│   │   │   └── less
│   │   │       └── index.less
│   │   └── wallet
│   │       │── icon
│   │       │   │── more.png
│   │       │   └── 押金.png
│   │       │── index.tsx
│   │       └── less
│   │           └── index.less
│   │── router
│   │   └── index.tsx
│   │── store
│   │   │── index.ts
│   │   └── reducer
│   │       └── message.ts
│   └── utils
│       │── context.ts
│       │── request.ts
│       │── storage
│       │   │── index.js
│       │   └── keys.js
│       └── utils.ts
│── tree.log
└── tsconfig.json

```

### 开发/打包

* 打包使用 npm run buid
* 开发使用 npm run start 或 npm run dev 