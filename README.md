# Namaste Node.js

- In Season 01 (Namaste_Nodejs), we will explore Node.js in depth and understand how the whole ecosystem works. We will see how JS Engine and libuv makes Node.js even more powerful.

## Monolith vs MicroServices

> **Monolith** - Single Server (Frontend, Backend, Admin, Dashboard, Emails, Analytics)

> **MicroServices** - Many Server (Frontend, Backend, Admin, Dashboard, Emails, Analytics)

| **Pros,Cons**     | **Monolith**  | **MicroServices** |
| ----------------- | :-----------: | :---------------: |
| `Dev Speed`       |    `Slow`     |      `Fast`       |
| `Code Repo`       | `Single Repo` |    `Many Repo`    |
| `Scalability`     |    `Hard`     |      `Easy`       |
| `Deployment`      |  `Very Slow`  |    `Very Fast`    |
| `Tech Stack`      | `Single Tech` |   `Multy Tech`    |
| `Infra Cost`      |     `Low`     |      `High`       |
| `Complexity`      |     `Bad`     |      `Good`       |
| `Fault Isolation` |    `Fast`     |      `Slow`       |
| `Testing`         |    `Easy`     |      `Hard`       |
| `Ownership`       |   `Single`    |      `Many`       |
| `Maintainence`    |    `Easy`     |      `Hard`       |
| `Rewamps`         |     `Bad`     |      `Good`       |
| `Debugging`       |    `Easy`     |      `Hard`       |

## Waterfall Model (SDLC - Software Development Life Cycle)

1. **Requirements** (Project Manager + Designer) \
2. .......└── **Design** (Senior Engineer, Engineering Manager)\
3. ...............└── **Development** (SDE1, SDE2 - Software Development Engineer)\
4. .........................└── **Testing** (SDET - Software Development Engineer in Test)\
5. ..................................└── **Deployment** (Dev Team, DevOps)\
6. ............................................└── **Maintainance** (Maintainers)
