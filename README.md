# MUI X Grid Bug Demo

## Table of contents

- [Overview](#overview)
- [Technologies used](#technologies-used)
- [The bug](#the-bug)
  - [How to recreate](#how-to-recreate)
    - [Use case 1](#use-case-1)
      - [Screenshots 1](#screenshots-1)
    - [Use case 2](#use-case-2)
      - [Screenshots 2](#screenshots-2)
  - [A potential workaround](#a-potential-workaround)

## Overview

This repo is to recreate a bug I experienced with Material UI X's Data Grid.
I tried to recreate the bug with only the necessary dependencies, styles, and elements. Albeit, because I don't know what's causing the error, some things may be unrelated.

I recreated the bug with two combinations of package versions. The first tries to replicate the packages used when first encountering the error. Said combination can be found on the `main` branch. The second combination tries to use the latest package versions and can be found on the `updated-package-versions` branch.

This bug was discovered when working on a feature for work, in which case we are using Data Grid Premium. However, as I do not have a personal Premium license, this demo uses the free version. It seems both versions encounter the same error.

## Technologies used

- Firefox version `131.0.2 (64-bit)`
- Chrome version `129.0.6668.100 (Official Build) (64-bit)`
- Node version `v22.8.0`

See [app/package.json @ main branch](https://github.com/theodoremoreland/mui-x-data-grid-bug-demo/blob/main/app/package.json) and [app/package.json @ updated-package-versions branch](https://github.com/theodoremoreland/mui-x-data-grid-bug-demo/blob/updated-package-versions/app/package.json) for dependencies. The `main` branch uses package versions similar to that of which I used when first encountering the error. The `updated-package-versions` branch uses more up-to-date versions to similar effect.

Package versions of deployment:

```
    "@emotion/react": "^11.13.3",
    "@emotion/styled": "^11.13.0",
    "@mui/icons-material": "^6.1.3",
    "@mui/material": "^6.1.3",
    "@mui/x-data-grid": "^7.20.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.113",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
```

## The bug

When scrolling to the very bottom of the virtual scrollbar using a scroll wheel then decreasing the number of rows in a Data Grid via clicking a lesser page option or via programmatically deleting rows via some custom UI prompt (such as a Delete button) such that the vertical, virtual scroll bar is no longer needed, the Data Grid will throw the following error on `Chrome`:

```
Cannot set properties of null (setting 'scrollTop')
TypeError: Cannot set properties of null (setting 'scrollTop')
    at http://localhost:3000/static/js/bundle.js:49775:31
    at HTMLDivElement.<anonymous> (http://localhost:3000/static/js/bundle.js:37491:19)
```

The following error on `Firefox`:

```
scrollbar is null
./node_modules/@mui/x-data-grid/components/virtualization/GridVirtualScrollbar.js/GridVirtualScrollbar/onScrollerScroll<@http://localhost:3000/static/js/bundle.js:49775:41
./node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js/useEventCallback/<@http://localhost:3000/static/js/bundle.js:37491:19
```

_NOTE: Reproducing the error via programmatic deletion is inconsistent on Firefox (in my experience). However, the error occurs consistently in Chrome and in both browsers via decreasing page option._

This bug was actually discovered and reported by another person prior, but the thread was closed temporarily: https://github.com/mui/mui-x/issues/13301

I deployed an example where you can reproduce the bug here: https://theodoremoreland.github.io/mui-x-data-grid-bug-demo/
The code can be found here: https://github.com/theodoremoreland/mui-x-data-grid-bug-demo/tree/updated-package-versions

### How to recreate

The conditions to reproduce the bug are very conditional, if not inconsistent. For example, from what I can tell:

- Chrome and Firefox experience different behavior and even display different error messages
- Interacting with the virtual scroll bar via scroll wheel as opposed to mouse click+drag has different effects
- Moving the virtual scroll bar to the absolute bottom of the available space is often required to reproduce bug
- The UI will display the error if running on local, but it will only appear in the dev console if running via deployment build
- The syntax used to render React's root DOM node makes a difference given "react": "^18.3.1", "react-dom": "^18.3.1", and "react-scripts": "5.0.1"

#### Use case 1

_NOTE: Oddly enough, scrolling to the bottom of the grid / virtual scrollbar
by clicking and dragging the scroll bar down does not produce an error nor does scrolling close to the bottom. The error is only produced by scrolling to the absolute bottom of the scrollbar via scroll wheel in this example._

1. Open app in either Chrome or Firefox web browser
2. Click OPEN button to open Drawer component featuring two Data Grids
3. Click Grid #2 tab
4. Scroll to the absolute bottom of the data grid using **scroll wheel** (not by dragging scroll bar down with mouse)
5. Change Rows per page option to 2 instead of 100

If running the code locally, you should see an error popup in the UI. If running a deployed build, you may only see the error in the dev console.

#### Screenshots 1

<img src="https://raw.githubusercontent.com/theodoremoreland/mui-x-data-grid-bug-demo/refs/heads/main/screenshots/1.png" width="600">
<img src="https://raw.githubusercontent.com/theodoremoreland/mui-x-data-grid-bug-demo/refs/heads/main/screenshots/2.png" width="600">
<img src="https://raw.githubusercontent.com/theodoremoreland/mui-x-data-grid-bug-demo/refs/heads/main/screenshots/3.png" width="600">
<img src="https://raw.githubusercontent.com/theodoremoreland/mui-x-data-grid-bug-demo/refs/heads/main/screenshots/4.png" width="600">
<img src="https://raw.githubusercontent.com/theodoremoreland/mui-x-data-grid-bug-demo/refs/heads/main/screenshots/5.png" width="600">

#### Use case 2

_NOTE: Weirdly enough, the following steps produce an error far more often
when using Google Chrome, in my experience. It may take multiple attempts
to get the error to produce in Firefox if at all._

1. Open app in either Chrome or Firefox web browser
2. Click OPEN button to open Drawer component featuring two Data Grids
3. Click Grid #2 tab
4. Scroll to the absolute bottom of the data grid using **scroll wheel** (not by dragging scroll bar down with mouse)
5. Click the DELETE button (top right, just above Data Grid)

If running the code locally, you should see an error popup in the UI. If running a deployed build, you may only see the error in the dev console.

#### Screenshots 2

<img src="https://raw.githubusercontent.com/theodoremoreland/mui-x-data-grid-bug-demo/refs/heads/main/screenshots/1.png" width="600">
<img src="https://raw.githubusercontent.com/theodoremoreland/mui-x-data-grid-bug-demo/refs/heads/main/screenshots/2.png" width="600">
<img src="https://raw.githubusercontent.com/theodoremoreland/mui-x-data-grid-bug-demo/refs/heads/main/screenshots/3.png" width="600">
<img src="https://raw.githubusercontent.com/theodoremoreland/mui-x-data-grid-bug-demo/refs/heads/main/screenshots/6.png" width="600">
<img src="https://raw.githubusercontent.com/theodoremoreland/mui-x-data-grid-bug-demo/refs/heads/main/screenshots/7.png" width="600">

### A potential workaround

For some reason, how you render React's root DOM node can circumvent the error. For example, given "react": "^18.3.1" and "react-dom": "^18.3.1":

This does not work:

```
import React from "react";
import ReactDOM from "react-dom"; // ? This version of ReactDOM causes error
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

This does:

```
import React from 'react';
import ReactDOM from 'react-dom/client'; // ? This version of ReactDOM does not cause error
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```
