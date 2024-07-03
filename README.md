
# MYSILOAM TELECHAT DOCTOR NEXT APP BOILERPLATE #



This README would normally document for using Next App Boilerplate for MySiloam Telechat Doctor.



### What is this boilerplate for? ###



* Frontend Web Chat for Doctor



### What includes on this boilerplate ###



* Commitlint : for commit message linter. please refer [this link](https://www.conventionalcommits.org/en/v1.0.0/) before you commit  😘



    git commit -m "feat(telechat-ui): initalize"


* Axios : for http request purpose

* clsx : for constructing `className` strings conditionally

* js-cookie : JavaScript API for handling cookies

* saas : styling using scss file

* husky : improves your commits and more 🐶  _woof!_

* lint-staged : Run linters against staged git files and don't let 💩 slip into your code base!

* redux-toolkit : for state management purpose



### How To Use Redux ###


* Create Type, Actions, and Reducers

* Add new reducers in Store file

* Import `useAppDispatch` to dispatch a reducer action
* Import `useAppSelector` to get value from reducer

example :

    import { useAppDispatch, useAppSelector } from  "@/redux/hooks";
    import { setExampleAction } from  "@/redux/actions";
    const  dispatch = useAppDispatch();
    const { exampleValue } = useAppSelector(state  =>  state.example.exampleOne)
    dispatch(setExampleAction(false))


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

